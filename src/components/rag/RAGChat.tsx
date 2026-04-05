import { useState, useRef, useEffect, useCallback } from 'react';
import { Send, FileText, AlertCircle, Loader2, MessageSquare, Sparkles } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';
import { useLanguage } from '../../i18n/index';
import { useUI } from '../../i18n/useUI';

// Worker URL — update after deploying the Cloudflare Worker
const WORKER_URL = 'https://etcs-rag.interlazas.workers.dev';

interface Source {
  document: string;
  source: string;
  page: number;
  score: number;
  excerpt: string;
}

interface Message {
  role: 'user' | 'assistant';
  content: string;
  sources?: Source[];
  error?: boolean;
}

export default function RAGChat() {
  const { theme } = useTheme();
  const { language } = useLanguage();
  const ui = useUI();
  const dark = theme === 'dark';

  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(scrollToBottom, [messages, scrollToBottom]);

  const sendQuestion = async (question: string) => {
    if (!question.trim() || loading) return;

    setMessages((prev) => [...prev, { role: 'user', content: question }]);
    setInput('');
    setLoading(true);

    try {
      const resp = await fetch(`${WORKER_URL}/query`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question, language }),
      });

      if (!resp.ok) {
        throw new Error(`HTTP ${resp.status}`);
      }

      const data = await resp.json();
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: data.answer,
          sources: data.sources,
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: ui.ragError, error: true },
      ]);
    } finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendQuestion(input);
  };

  const suggestions = [ui.ragSuggestion1, ui.ragSuggestion2, ui.ragSuggestion3];

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className={`shrink-0 px-6 py-4 border-b ${
        dark ? 'border-slate-800' : 'border-slate-200'
      }`}>
        <div className="max-w-3xl mx-auto">
          <h1 className={`text-lg font-semibold flex items-center gap-2 ${
            dark ? 'text-slate-100' : 'text-slate-800'
          }`}>
            <MessageSquare className="w-5 h-5 text-blue-500" />
            {ui.ragTitle}
          </h1>
          <p className={`text-sm mt-1 ${dark ? 'text-slate-400' : 'text-slate-500'}`}>
            {ui.ragSubtitle}
          </p>
        </div>
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

          {messages.map((msg, i) => (
            <ChatMessage key={i} message={msg} dark={dark} ui={ui} />
          ))}

          {loading && (
            <div className={`flex items-center gap-2 text-sm ${
              dark ? 'text-slate-400' : 'text-slate-500'
            }`}>
              <Loader2 className="w-4 h-4 animate-spin" />
              {ui.ragThinking}
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Disclaimer */}
      <div className={`shrink-0 text-center text-xs px-4 py-1 ${
        dark ? 'text-slate-600' : 'text-slate-400'
      }`}>
        {ui.ragDisclaimer}
      </div>

      {/* Input */}
      <div className={`shrink-0 border-t px-6 py-3 ${
        dark ? 'border-slate-800 bg-slate-900/50' : 'border-slate-200 bg-slate-50/50'
      }`}>
        <form onSubmit={handleSubmit} className="max-w-3xl mx-auto flex gap-2">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={ui.ragPlaceholder}
            disabled={loading}
            className={`flex-1 px-4 py-2.5 rounded-lg text-sm border outline-none transition-colors ${
              dark
                ? 'bg-slate-800 border-slate-700 text-slate-200 placeholder:text-slate-500 focus:border-blue-500'
                : 'bg-white border-slate-300 text-slate-800 placeholder:text-slate-400 focus:border-blue-500'
            } ${loading ? 'opacity-50' : ''}`}
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className={`px-4 py-2.5 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors cursor-pointer ${
              loading || !input.trim()
                ? dark
                  ? 'bg-slate-800 text-slate-600'
                  : 'bg-slate-100 text-slate-400'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            <Send className="w-4 h-4" />
            {ui.ragSend}
          </button>
        </form>
      </div>
    </div>
  );
}

function EmptyState({ dark, suggestions, trySuggestions, onSuggestion }: {
  dark: boolean;
  suggestions: string[];
  trySuggestions: string;
  onSuggestion: (q: string) => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-16 gap-6">
      <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${
        dark ? 'bg-blue-500/10' : 'bg-blue-50'
      }`}>
        <Sparkles className={`w-8 h-8 ${dark ? 'text-blue-400' : 'text-blue-500'}`} />
      </div>
      <div className="text-center">
        <p className={`text-sm ${dark ? 'text-slate-400' : 'text-slate-500'}`}>
          {trySuggestions}
        </p>
      </div>
      <div className="flex flex-col gap-2 w-full max-w-md">
        {suggestions.map((q, i) => (
          <button
            key={i}
            onClick={() => onSuggestion(q)}
            className={`text-left px-4 py-3 rounded-lg text-sm border transition-colors cursor-pointer ${
              dark
                ? 'border-slate-700 hover:bg-slate-800 text-slate-300'
                : 'border-slate-200 hover:bg-slate-50 text-slate-600'
            }`}
          >
            {q}
          </button>
        ))}
      </div>
    </div>
  );
}

function ChatMessage({ message, dark, ui }: {
  message: Message;
  dark: boolean;
  ui: { ragSources: string; ragPage: string; ragRelevance: string };
}) {
  const isUser = message.role === 'user';

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`max-w-[85%] rounded-xl px-4 py-3 ${
        isUser
          ? 'bg-blue-600 text-white'
          : message.error
            ? dark ? 'bg-red-900/30 border border-red-800' : 'bg-red-50 border border-red-200'
            : dark ? 'bg-slate-800 border border-slate-700' : 'bg-white border border-slate-200'
      }`}>
        {/* Message text */}
        <div className={`text-sm whitespace-pre-wrap leading-relaxed ${
          isUser
            ? 'text-white'
            : message.error
              ? dark ? 'text-red-300' : 'text-red-700'
              : dark ? 'text-slate-200' : 'text-slate-700'
        }`}>
          {message.error && <AlertCircle className="w-4 h-4 inline mr-1.5 -mt-0.5" />}
          {message.content}
        </div>

        {/* Sources */}
        {message.sources && message.sources.length > 0 && (
          <div className={`mt-3 pt-3 border-t ${
            dark ? 'border-slate-700' : 'border-slate-200'
          }`}>
            <p className={`text-xs font-medium mb-2 ${
              dark ? 'text-slate-400' : 'text-slate-500'
            }`}>
              <FileText className="w-3 h-3 inline mr-1 -mt-0.5" />
              {ui.ragSources}
            </p>
            <div className="space-y-1.5">
              {message.sources.map((src, i) => (
                <div
                  key={i}
                  className={`text-xs rounded px-2.5 py-1.5 ${
                    dark ? 'bg-slate-900 text-slate-400' : 'bg-slate-50 text-slate-500'
                  }`}
                >
                  <span className={`font-medium ${
                    dark ? 'text-slate-300' : 'text-slate-600'
                  }`}>
                    {src.document}
                  </span>
                  {src.page > 0 && <span> — {ui.ragPage} {src.page}</span>}
                  <span className="ml-2 opacity-60">
                    ({ui.ragRelevance}: {Math.round(src.score * 100)}%)
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
