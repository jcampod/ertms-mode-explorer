import { createContext, useContext, useState, useCallback } from 'react';

interface ChatTriggerContextValue {
  pendingQuestion: string | null;
  triggerChat: (question: string) => void;
  clearPending: () => void;
}

export const ChatTriggerContext = createContext<ChatTriggerContextValue>({
  pendingQuestion: null,
  triggerChat: () => {},
  clearPending: () => {},
});

export function useChatTrigger() {
  return useContext(ChatTriggerContext);
}

export function useChatTriggerProvider() {
  const [pendingQuestion, setPendingQuestion] = useState<string | null>(null);

  const triggerChat = useCallback((question: string) => {
    setPendingQuestion(question);
  }, []);

  const clearPending = useCallback(() => {
    setPendingQuestion(null);
  }, []);

  return { pendingQuestion, triggerChat, clearPending };
}
