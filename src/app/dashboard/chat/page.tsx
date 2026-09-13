'use client';
import { useState, useRef, useEffect, useCallback } from 'react';
import { Send } from 'lucide-react';
import Tabs from '@/components/ui/Tabs';
import { useChatStore } from '@/lib/store/useChatStore';

const TABS = [
  { id: 'assistant', label: 'Medika Care' },
  { id: 'customer-service', label: 'Customer Service' },
];

function TypingIndicator() {
  return (
    <div className="flex items-center gap-1 px-4 py-2">
      <div className="h-2 w-2 rounded-full bg-[var(--color-text-secondary)] typing-dot" />
      <div className="h-2 w-2 rounded-full bg-[var(--color-text-secondary)] typing-dot" />
      <div className="h-2 w-2 rounded-full bg-[var(--color-text-secondary)] typing-dot" />
    </div>
  );
}

const CS_RESPONSES: Record<string, string> = {
  reschedule: 'Untuk mereschedule appointment, silakan buka menu Appointment di Dashboard, pilih appointment yang ingin diubah, lalu klik tombol "Reschedule".',
  batal: 'Untuk membatalkan appointment, buka menu Appointment, pilih appointment, lalu klik "Batalkan".',
  default: 'Terima kasih atas pesan Anda. Tim kami akan segera membantu. Sementara itu, apakah ada informasi appointment yang ingin Anda ketahui?',
};

export default function ChatPage() {
  const [activeTab, setActiveTab] = useState('assistant');
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { conversations, addConversation, sendMessage, addBotResponse } = useChatStore();

  const assistantConv = conversations.find(c => c.channel === 'assistant');
  const csConv = conversations.find(c => c.channel === 'customer-service');
  const activeConversation = activeTab === 'assistant' ? assistantConv : csConv;

  const createId = () => {
    return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 9)}`;
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeConversation?.messages]);

  const startCSConversation = useCallback(() => {
    if (!csConv) {
      const id = createId();
      addConversation({
        id,
        channel: 'customer-service',
        title: 'Customer Service',
        status: 'active',
        messages: [{
          id: createId(),
          sender: 'agent',
          type: 'text',
          text: 'Halo, saya tim Customer Service Bahagia Medika. Ada yang bisa saya bantu terkait appointment Anda?',
          timestamp: new Date().toISOString(),
        }],
        updatedAt: new Date().toISOString(),
      });
    }
  }, [csConv, addConversation]);

  useEffect(() => {
    if (activeTab === 'customer-service' && !csConv) {
      startCSConversation();
    }
  }, [activeTab, csConv, startCSConversation]);

  const handleSend = async () => {
    const text = input.trim();
    if (!text || !activeConversation) return;

    const convId = activeConversation.id;
    const sender = activeTab === 'assistant' ? 'user' : 'user';

    sendMessage(convId, {
      id: createId(),
      sender,
      type: 'text',
      text,
      timestamp: new Date().toISOString(),
    });
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      let responseText = CS_RESPONSES.default;
      const lower = text.toLowerCase();
      if (lower.includes('reschedule') || lower.includes('ubah jadwal')) responseText = CS_RESPONSES.reschedule;
      else if (lower.includes('batal') || lower.includes('cancel')) responseText = CS_RESPONSES.batal;

      addBotResponse(convId, {
        id: createId(),
        sender: 'agent',
        type: 'text',
        text: responseText,
        timestamp: new Date().toISOString(),
      });
      setIsTyping(false);
    }, 2000);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-[var(--color-text-primary)] mb-4">Chat</h1>
      <Tabs tabs={TABS} activeTab={activeTab} onChange={setActiveTab} />

      <div className="mt-4 bg-white rounded-xl border border-[var(--color-border)] flex flex-col h-[calc(100dvh-270px)] md:h-[calc(100vh-250px)] min-h-[380px] shadow-2xs">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {activeConversation?.messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[75%] rounded-2xl px-4 py-2 ${
                msg.sender === 'user'
                  ? 'bg-[var(--color-primary)] text-white rounded-br-sm'
                  : 'bg-[var(--color-surface)] text-[var(--color-text-primary)] rounded-bl-sm'
              }`}>
                <p className="text-sm">{msg.text}</p>
              </div>
            </div>
          ))}
          {isTyping && <TypingIndicator />}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="border-t border-[var(--color-border)] p-3">
          <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Ketik pesan..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 px-3 py-2 text-sm border border-[var(--color-border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-opacity-30"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className="p-2 bg-[var(--color-primary)] text-white rounded-lg disabled:opacity-40 hover:bg-[var(--color-primary-dark)] transition-colors"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
