import type { Doctor } from './doctor';
import type { Service } from './service';

export type ChatChannel = 'assistant' | 'customer-service';
export type ChatMessageType = 'text' | 'doctor-card' | 'service-card' | 'schedule-card' | 'emergency-card';
export type ChatSender = 'user' | 'bot' | 'agent';

export interface ChatMessage {
  id: string;
  sender: ChatSender;
  type: ChatMessageType;
  text?: string;
  payload?: {
    doctors?: Doctor[];
    services?: Service[];
    schedule?: { day: string; slots: string[] };
  };
  quickReplies?: string[];
  timestamp: string;
}

export interface ChatConversation {
  id: string;
  channel: ChatChannel;
  title: string;
  status: 'active' | 'waiting' | 'closed';
  messages: ChatMessage[];
  updatedAt: string;
}
