import { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  Send, FileText, AlertCircle, Loader2, Sparkles, Square,
  ThumbsUp, ThumbsDown, ChevronDown, ChevronUp, Trash2,
} from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';
import { useLanguage } from '../../i18n/index';
import { useUI } from '../../i18n/useUI';
import { useAppContext } from '../../hooks/useAppContext';
import { useErtmsLevel } from '../../hooks/useErtmsLevel';
import { useChatTrigger } from '../../hooks/useChatTrigger';
import { useTranslatedModes, useTranslatedTransitions } from '../../i18n/useTranslatedData';

const WORKER_URL = 'https://etcs-rag.interlazas.workers.dev';

// ─── Types ──────────────────────────────────────────────────────────

interface Source {
  document: string;
  source: string;
  page: number;
  score: number;
  excerpt: string;
}

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  sources?: Source[];
  questionId?: string;
  feedback?: 'up' | 'down' | null;
  isStreaming?: boolean;
  error?: boolean;
}

// ─── Main Component ─────────────────────────────────────────────────

export default function RAGChat() {
  const { theme } = useTheme();
  const { language } = useLanguage();
  const ui = useUI();
  const dark = theme === 'dark';

  const { activeTab, selectedMode, selectedModeName, selectedTransitionId, selectedTransitionFrom, selectedTransitionTo } = useAppContext();
  const { ertmsLevel } = useErtmsLevel();
  const { pendingQuestion, clearPending } = useChatTrigger();

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const abortRef = useRef<AbortController | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const processedRef = useRef<string | null>(null);

  // Auto-scroll — use a short delay so DOM has time to render thumbs/sources after streaming ends
  useEffect(() => {
    const timer = setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 50);
    return () => clearTimeout(timer);
  }, [messages]);

  // Focus input
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Consume triggered question from "Ask about this" buttons
  useEffect(() => {
    if (pendingQuestion && pendingQuestion !== processedRef.current) {
      processedRef.current = pendingQuestion;
      clearPending();
      sendQuestion(pendingQuestion);
    }
  }, [pendingQuestion, clearPending]);

  // ─── Send Question (with streaming) ─────────────────────────────

  const sendQuestion = useCallback(async (question: string) => {
    if (!question.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: crypto.randomUUID(),
      role: 'user',
      content: question.trim(),
    };

    const assistantId = crypto.randomUUID();
    const assistantMsg: ChatMessage = {
      id: assistantId,
      role: 'assistant',
      content: '',
      sources: [],
      isStreaming: true,
    };

    setMessages(prev => [...prev, userMsg, assistantMsg]);
    setInput('');
    setIsLoading(true);

    // Build conversation history
    const history = messages
      .filter(m => m.role === 'user' || (m.role === 'assistant' && m.content && !m.error))
      .map(m => ({ role: m.role, content: m.content }));

    // Build app context
    const appContext: Record<string, string | undefined> = {
      activeTab,
      selectedMode: selectedMode ?? undefined,
      selectedModeName: selectedModeName ?? undefined,
      selectedTransition: selectedTransitionId ?? undefined,
      selectedTransitionFrom: selectedTransitionFrom ?? undefined,
      selectedTransitionTo: selectedTransitionTo ?? undefined,
      ertmsLevel,
    };

    const abortController = new AbortController();
    abortRef.current = abortController;

    try {
      const response = await fetch(`${WORKER_URL}/query/stream`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: question.trim(),
          language: language !== 'en' ? language : undefined,
          history,
          appContext,
        }),
        signal: abortController.signal,
      });

      if (!response.ok) {
        const errBody = await response.json().catch(() => null) as { error?: string } | null;
        throw new Error(errBody?.error ?? `HTTP ${response.status}`);
      }

      const reader = response.body?.getReader();
      if (!reader) throw new Error('No response body');

      const decoder = new TextDecoder();
      let buffer = '';
      let fullContent = '';
      let sources: Source[] = [];
      let questionId = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() ?? '';

        let eventType = '';
        for (const line of lines) {
          if (line.startsWith('event: ')) {
            eventType = line.slice(7).trim();
          } else if (line.startsWith('data: ')) {
            const data = line.slice(6);
            if (data === '[DONE]') continue;

            try {
              const parsed = JSON.parse(data);
              if (eventType === 'metadata') {
                sources = parsed.sources ?? [];
                questionId = parsed.questionId ?? '';
                eventType = '';
              } else if (eventType === 'error') {
                fullContent += `\n\n**Error:** ${parsed.error}`;
                eventType = '';
              } else if (parsed.response !== undefined) {
                fullContent += parsed.response;
              }
            } catch {
              // Not JSON, skip
            }
          } else if (line === '') {
            eventType = '';
          }
        }

        setMessages(prev =>
          prev.map(m =>
            m.id === assistantId
              ? { ...m, content: fullContent, sources, questionId, isStreaming: true }
              : m
          )
        );
      }

      setMessages(prev =>
        prev.map(m =>
          m.id === assistantId
            ? { ...m, content: fullContent || ui.ragNoAnswer, sources, questionId, isStreaming: false, feedback: null }
            : m
        )
      );
    } catch (err) {
      if ((err as Error).name === 'AbortError') return;
      const errorMsg = err instanceof Error ? err.message : 'Unknown error';
      setMessages(prev =>
        prev.map(m =>
          m.id === assistantId
            ? { ...m, content: errorMsg, isStreaming: false, error: true }
            : m
        )
      );
    } finally {
      setIsLoading(false);
      abortRef.current = null;
      inputRef.current?.focus();
    }
  }, [messages, isLoading, activeTab, selectedMode, selectedModeName, selectedTransitionId, selectedTransitionFrom, selectedTransitionTo, ertmsLevel, language, ui.ragNoAnswer]);

  const stopStreaming = useCallback(() => {
    abortRef.current?.abort();
    setIsLoading(false);
  }, []);

  // ─── Feedback ───────────────────────────────────────────────────

  const submitFeedback = useCallback(async (messageId: string, rating: 'up' | 'down') => {
    const msg = messages.find(m => m.id === messageId);
    if (!msg?.questionId) return;

    const idx = messages.findIndex(m => m.id === messageId);
    const userMsg = idx > 0 ? messages[idx - 1] : null;

    setMessages(prev =>
      prev.map(m => m.id === messageId ? { ...m, feedback: rating } : m)
    );

    try {
      await fetch(`${WORKER_URL}/feedback`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          questionId: msg.questionId,
          question: userMsg?.content ?? '',
          answer: msg.content,
          rating,
        }),
      });
    } catch {
      // Feedback is best-effort
    }
  }, [messages]);

  const clearChat = useCallback(() => setMessages([]), []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendQuestion(input);
  };

  // ─── Dynamic Suggestions ────────────────────────────────────────

  const suggestions = useDynamicSuggestions();

  // ─── Render ─────────────────────────────────────────────────────

  return (
    <div className="h-full flex flex-col">

      {/* Search bar */}
      <div className={`shrink-0 px-6 py-3 border-b ${
        dark ? 'border-slate-700 bg-slate-800' : 'border-slate-300 bg-slate-100'
      }`}>
        <form onSubmit={handleSubmit} className="max-w-3xl mx-auto flex gap-2">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={ui.ragPlaceholder}
            disabled={isLoading}
            className={`flex-1 px-4 py-2.5 rounded-lg text-sm border outline-none transition-colors shadow-sm ${
              dark
                ? 'bg-slate-900 border-slate-600 text-slate-100 placeholder:text-slate-400 focus:border-blue-400 focus:ring-1 focus:ring-blue-400'
                : 'bg-white border-slate-400 text-slate-900 placeholder:text-slate-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500'
            } ${isLoading ? 'opacity-50' : ''}`}
          />
          {isLoading ? (
            <button
              type="button"
              onClick={stopStreaming}
              className="px-4 py-2.5 rounded-lg text-sm font-semibold flex items-center gap-2 bg-red-600 text-white hover:bg-red-700 cursor-pointer shadow-sm shrink-0"
            >
              <Square className="w-3.5 h-3.5" fill="white" />
              Stop
            </button>
          ) : (
            <button
              type="submit"
              disabled={!input.trim()}
              className={`px-4 py-2.5 rounded-lg text-sm font-semibold flex items-center gap-2 transition-colors shrink-0 ${
                !input.trim()
                  ? dark ? 'bg-slate-600 text-slate-200 cursor-not-allowed' : 'bg-slate-400 text-slate-100 cursor-not-allowed'
                  : 'bg-blue-700 text-white hover:bg-blue-800 cursor-pointer shadow-sm'
              }`}
            >
              <Send className="w-4 h-4" />
              {ui.ragSend}
            </button>
          )}
          {messages.length > 0 && (
            <button
              type="button"
              onClick={clearChat}
              className={`px-3 py-2.5 rounded-lg text-sm transition-colors shrink-0 ${
                dark
                  ? 'text-slate-400 hover:text-slate-200 hover:bg-slate-700'
                  : 'text-slate-400 hover:text-slate-600 hover:bg-slate-200'
              }`}
              title="Clear chat"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </form>
      </div>

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto px-6 py-4">
        <div className="max-w-3xl mx-auto space-y-4">
          {messages.length === 0 && (
            <EmptyState
              dark={dark}
              suggestions={suggestions}
              trySuggestions={ui.ragTrySuggestions}
              onSuggestion={sendQuestion}
            />
          )}

          {messages.map((msg) => (
            <MessageBubble
              key={msg.id}
              message={msg}
              dark={dark}
              ui={ui}
              onFeedback={submitFeedback}
            />
          ))}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Footer */}
      <div className={`shrink-0 border-t px-6 py-3 ${dark ? 'border-slate-700' : 'border-slate-200'}`}>
        <div className="max-w-3xl mx-auto">
          <p className={`text-xs font-medium ${dark ? 'text-slate-400' : 'text-slate-600'}`}>
            {ui.ragTitle}
          </p>
          <p className={`text-xs mt-0.5 ${dark ? 'text-slate-500' : 'text-slate-400'}`}>
            {ui.ragSubtitle} — {ui.ragDisclaimer}
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── Dynamic Suggestions ────────────────────────────────────────────

function useDynamicSuggestions(): string[] {
  const { activeTab, selectedMode, selectedModeName, selectedTransitionFrom, selectedTransitionTo } = useAppContext();
  const { ertmsLevel } = useErtmsLevel();
  const modes = useTranslatedModes();
  const transitions = useTranslatedTransitions();
  const ui = useUI();

  return useMemo(() => {
    if (selectedMode && selectedModeName) {
      const outgoing = transitions.filter(t => t.from === selectedMode && !t.isUniversal);
      const randomTarget = outgoing.length > 0 ? outgoing[0] : null;
      const targetMode = randomTarget ? modes.find(m => m.id === randomTarget.to) : null;

      return [
        `What are the conditions for entering ${selectedModeName} mode?`,
        `What is the driver's responsibility in ${selectedMode} mode?`,
        targetMode
          ? `How does the transition from ${selectedMode} to ${targetMode.abbreviation} work?`
          : `What ETCS levels support ${selectedMode} mode?`,
      ];
    }

    if (selectedTransitionFrom && selectedTransitionTo) {
      return [
        `What are the conditions for the ${selectedTransitionFrom} → ${selectedTransitionTo} transition?`,
        `Is the ${selectedTransitionFrom} → ${selectedTransitionTo} transition automatic or manual?`,
        `What happens if the ${selectedTransitionFrom} → ${selectedTransitionTo} transition fails?`,
      ];
    }

    if (activeTab === 'ato') {
      return [
        'How does ATO interact with ETCS Full Supervision?',
        'What are the Grades of Automation (GoA 1-4)?',
        'What is the ATO journey profile?',
      ];
    }

    if (activeTab === 'levels') {
      return [
        `What changes between ERTMS Level ${ertmsLevel} and the other levels?`,
        'How do level transitions work during a journey?',
        'What is the role of Eurobalises in Level 1?',
      ];
    }

    // Default
    return [ui.ragSuggestion1, ui.ragSuggestion2, ui.ragSuggestion3];
  }, [activeTab, selectedMode, selectedModeName, selectedTransitionFrom, selectedTransitionTo, ertmsLevel, modes, transitions, ui]);
}

// ─── Empty State ────────────────────────────────────────────────────

function EmptyState({ dark, suggestions, trySuggestions, onSuggestion }: {
  dark: boolean;
  suggestions: string[];
  trySuggestions: string;
  onSuggestion: (q: string) => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-16 gap-6">
      <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${
        dark ? 'bg-blue-500/10' : 'bg-blue-100'
      }`}>
        <Sparkles className={`w-8 h-8 ${dark ? 'text-blue-400' : 'text-blue-600'}`} />
      </div>
      <p className={`text-sm font-medium ${dark ? 'text-slate-300' : 'text-slate-700'}`}>
        {trySuggestions}
      </p>
      <div className="flex flex-col gap-2 w-full max-w-md">
        {suggestions.map((q, i) => (
          <button
            key={i}
            onClick={() => onSuggestion(q)}
            className={`text-left px-4 py-3 rounded-lg text-sm border transition-colors cursor-pointer ${
              dark
                ? 'border-slate-600 hover:bg-slate-800 text-slate-300'
                : 'border-slate-300 hover:bg-blue-50 text-slate-700 bg-white'
            }`}
          >
            {q}
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── Message Bubble ─────────────────────────────────────────────────

function MessageBubble({ message, dark, ui, onFeedback }: {
  message: ChatMessage;
  dark: boolean;
  ui: ReturnType<typeof useUI>;
  onFeedback: (id: string, rating: 'up' | 'down') => void;
}) {
  const isUser = message.role === 'user';

  return (
    <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}>
      <div className={`max-w-[85%] rounded-xl px-4 py-3 ${
        isUser
          ? 'bg-blue-600 text-white'
          : message.error
            ? dark ? 'bg-red-900/30 border border-red-700' : 'bg-red-50 border border-red-300'
            : dark ? 'bg-slate-800 border border-slate-600' : 'bg-white border border-slate-300 shadow-sm'
      }`}>
        {message.error ? (
          <div className={`text-sm leading-relaxed ${dark ? 'text-red-300' : 'text-red-700'}`}>
            <AlertCircle className="w-4 h-4 inline mr-1.5 -mt-0.5" />
            {message.content}
          </div>
        ) : isUser ? (
          <p className="text-sm leading-relaxed text-white">{message.content}</p>
        ) : (
          <AssistantContent message={message} dark={dark} />
        )}
      </div>

      {/* Feedback + source count for completed assistant messages */}
      {!isUser && !message.isStreaming && message.content && !message.error && (
        <div className="flex items-center gap-2 mt-1 ml-1">
          {message.questionId && (
            <div className="flex items-center gap-0.5">
              <button
                onClick={() => onFeedback(message.id, 'up')}
                className={`p-1 rounded transition-colors ${
                  message.feedback === 'up'
                    ? 'text-green-500'
                    : dark ? 'text-slate-600 hover:text-slate-400' : 'text-slate-300 hover:text-slate-500'
                }`}
                title="Helpful"
              >
                <ThumbsUp size={12} fill={message.feedback === 'up' ? 'currentColor' : 'none'} />
              </button>
              <button
                onClick={() => onFeedback(message.id, 'down')}
                className={`p-1 rounded transition-colors ${
                  message.feedback === 'down'
                    ? 'text-red-500'
                    : dark ? 'text-slate-600 hover:text-slate-400' : 'text-slate-300 hover:text-slate-500'
                }`}
                title="Not helpful"
              >
                <ThumbsDown size={12} fill={message.feedback === 'down' ? 'currentColor' : 'none'} />
              </button>
            </div>
          )}
        </div>
      )}

      {/* Expandable sources */}
      {!isUser && !message.isStreaming && message.sources && message.sources.length > 0 && (
        <ExpandableSources sources={message.sources} dark={dark} ui={ui} />
      )}
    </div>
  );
}

// ─── Assistant Content ──────────────────────────────────────────────

function AssistantContent({ message, dark }: { message: ChatMessage; dark: boolean }) {
  if (message.isStreaming && !message.content) {
    return (
      <div className={`flex items-center gap-2 text-sm ${dark ? 'text-slate-400' : 'text-slate-500'}`}>
        <Loader2 className="w-4 h-4 animate-spin" />
        Searching specifications...
      </div>
    );
  }

  const lines = message.content.split('\n');
  return (
    <div className={`text-sm leading-relaxed ${dark ? 'text-slate-200' : 'text-slate-800'}`}>
      {lines.map((line, i) => {
        const trimmed = line.trim();
        if (!trimmed) return <div key={i} className="h-2" />;

        // Bold headers
        if (/^\*\*[^*]+\*\*$/.test(trimmed)) {
          const text = trimmed.replace(/\*\*/g, '');
          return (
            <p key={i} className={`font-semibold mt-3 first:mt-0 ${dark ? 'text-slate-100' : 'text-slate-900'}`}>
              {text}
            </p>
          );
        }

        // Bullet points
        if (trimmed.startsWith('- ') || trimmed.startsWith('* ') || trimmed.startsWith('• ')) {
          return (
            <p key={i} className="pl-4 relative mt-1">
              <span className="absolute left-1 top-0">{'•'}</span>
              {renderBold(trimmed.slice(2))}
            </p>
          );
        }

        return <p key={i} className={i > 0 ? 'mt-2' : ''}>{renderBold(trimmed)}</p>;
      })}
      {message.isStreaming && (
        <span className={`inline-block w-1.5 h-3.5 animate-pulse ml-0.5 ${dark ? 'bg-blue-400' : 'bg-blue-500'}`} />
      )}
    </div>
  );
}

function renderBold(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i} className="font-semibold">{part.slice(2, -2)}</strong>;
    }
    return <span key={i}>{part}</span>;
  });
}

// ─── Expandable Sources ─────────────────────────────────────────────

function ExpandableSources({ sources, dark, ui }: { sources: Source[]; dark: boolean; ui: ReturnType<typeof useUI> }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const uniqueSources = useMemo(() => {
    const seen = new Set<string>();
    return sources.filter(s => {
      const key = `${s.document}:${s.page}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }, [sources]);

  return (
    <div className="mt-1.5 ml-1 max-w-[85%]">
      <button
        onClick={() => setIsExpanded(prev => !prev)}
        className={`flex items-center gap-1.5 text-xs transition-colors ${
          dark ? 'text-slate-500 hover:text-slate-300' : 'text-slate-400 hover:text-slate-600'
        }`}
      >
        <FileText size={12} />
        <span>{ui.ragSources} ({uniqueSources.length})</span>
        {isExpanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="overflow-hidden"
          >
            <div className="mt-2 space-y-1.5">
              {uniqueSources.map((src, i) => (
                <SourceCard key={i} source={src} dark={dark} ui={ui} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function SourceCard({ source, dark, ui }: { source: Source; dark: boolean; ui: ReturnType<typeof useUI> }) {
  const [showExcerpt, setShowExcerpt] = useState(false);

  return (
    <div
      onClick={() => setShowExcerpt(prev => !prev)}
      className={`rounded-lg px-3 py-2 text-xs border cursor-pointer transition-colors ${
        dark
          ? 'bg-slate-800/80 border-slate-700 hover:border-slate-600'
          : 'bg-slate-50 border-slate-200 hover:border-slate-300'
      }`}
    >
      <div className="flex items-center justify-between gap-2">
        <div>
          <span className={`font-semibold ${dark ? 'text-slate-200' : 'text-slate-800'}`}>
            {source.document}
          </span>
          {source.page > 0 && (
            <span className={dark ? 'text-slate-400' : 'text-slate-500'}> — {ui.ragPage} {source.page}</span>
          )}
          <span className={`ml-2 ${dark ? 'text-slate-500' : 'text-slate-400'}`}>
            ({ui.ragRelevance}: {Math.round(source.score * 100)}%)
          </span>
        </div>
        {showExcerpt ? <ChevronUp size={10} className="shrink-0" /> : <ChevronDown size={10} className="shrink-0" />}
      </div>

      <AnimatePresence>
        {showExcerpt && source.excerpt && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.1 }}
            className="overflow-hidden"
          >
            <p className={`mt-2 pt-2 text-[11px] leading-relaxed border-t ${
              dark ? 'text-slate-400 border-slate-700' : 'text-slate-500 border-slate-200'
            }`}>
              {source.excerpt}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
