import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { ChatConversation, ChatMessage } from '@/types/chat';

interface ChatState {
  conversations: ChatConversation[];
  activeConversationId: string | null;
  setActiveConversation: (id: string | null) => void;
  addConversation: (conversation: ChatConversation) => void;
  sendMessage: (conversationId: string, message: ChatMessage) => void;
  addBotResponse: (conversationId: string, message: ChatMessage) => void;
  clearHistory: (conversationId: string) => void;
  getActiveConversation: () => ChatConversation | undefined;
}

export const useChatStore = create<ChatState>()(
  persist(
    (set, get) => ({
      conversations: [],
      activeConversationId: null,
      setActiveConversation: (id) => set({ activeConversationId: id }),
      addConversation: (conversation) =>
        set((state) => ({
          conversations: [conversation, ...state.conversations],
          activeConversationId: conversation.id,
        })),
      sendMessage: (conversationId, message) =>
        set((state) => ({
          conversations: state.conversations.map((c) =>
            c.id === conversationId
              ? {
                  ...c,
                  messages: [...c.messages, message],
                  updatedAt: new Date().toISOString(),
                }
              : c
          ),
        })),
      addBotResponse: (conversationId, message) =>
        set((state) => ({
          conversations: state.conversations.map((c) =>
            c.id === conversationId
              ? {
                  ...c,
                  messages: [...c.messages, message],
                  updatedAt: new Date().toISOString(),
                }
              : c
          ),
        })),
      clearHistory: (conversationId) =>
        set((state) => ({
          conversations: state.conversations.map((c) =>
            c.id === conversationId ? { ...c, messages: [] } : c
          ),
        })),
      getActiveConversation: () => {
        const state = get();
        return state.conversations.find((c) => c.id === state.activeConversationId);
      },
    }),
    { name: 'bahagia-medika-chat' }
  )
);
