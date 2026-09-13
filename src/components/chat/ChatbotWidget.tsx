'use client';
import { useState, useRef, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { MessageCircle, X, Send, Plus } from 'lucide-react';
import { useUIStore } from '@/lib/store/useUIStore';
import { useChatStore } from '@/lib/store/useChatStore';
import { detectIntent, buildResponse } from '@/features/chat/detectIntent';
import type { ChatMessage, ChatConversation } from '@/types/chat';
import type { Doctor } from '@/types/doctor';
import type { Service } from '@/types/service';
import Link from 'next/link';

function TypingIndicator() {
  return (
    <div className="flex items-center gap-1 px-4 py-2">
      <div className="h-2 w-2 rounded-full bg-[var(--color-text-secondary)] typing-dot" />
      <div className="h-2 w-2 rounded-full bg-[var(--color-text-secondary)] typing-dot" />
      <div className="h-2 w-2 rounded-full bg-[var(--color-text-secondary)] typing-dot" />
    </div>
  );
}

function DoctorCardMini({ doctor }: { doctor: Doctor }) {
  return (
    <div className="border border-[var(--color-border)] rounded-lg p-3 max-w-[280px]">
      <p className="font-medium text-sm">{doctor.name}</p>
      <p className="text-xs text-[var(--color-text-secondary)]">{doctor.specializationName}</p>
      <div className="flex gap-2 mt-2">
        <Link href={`/dokter/${doctor.slug}`} className="text-xs text-[var(--color-primary)] hover:underline">Lihat Profil</Link>
        <Link href={`/buat-janji?doctorId=${doctor.id}`} className="text-xs text-[var(--color-primary)] hover:underline">Buat Janji</Link>
      </div>
    </div>
  );
}

function ServiceCardMini({ service }: { service: Service }) {
  return (
    <div className="border border-[var(--color-border)] rounded-lg p-3 max-w-[280px]">
      <p className="font-medium text-sm">{service.name}</p>
      <p className="text-xs text-[var(--color-text-secondary)] line-clamp-1">{service.shortDescription}</p>
      <Link href={`/layanan/${service.slug}`} className="text-xs text-[var(--color-primary)] hover:underline mt-1 inline-block">Lihat Detail</Link>
    </div>
  );
}

export default function ChatbotWidget() {
  const router = useRouter();
  const { isChatWidgetOpen, toggleChatWidget } = useUIStore();
  const { conversations, activeConversationId, addConversation, sendMessage, addBotResponse } = useChatStore();
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const activeConversation = conversations.find(c => c.id === activeConversationId);

  const createId = () => {
    return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 9)}`;
  };

  const startNewConversation = useCallback(() => {
    const id = createId();
    const conversation: ChatConversation = {
      id,
      channel: 'assistant',
      title: 'Percakapan Baru',
      status: 'active',
      messages: [{
        id: createId(),
        sender: 'bot',
        type: 'text',
        text: 'Halo, ada yang bisa saya bantu? Saya Medika Care, asisten virtual RS Bahagia Medika Jakarta.',
        quickReplies: ['Cari Dokter', 'Cari Layanan', 'Buat Janji', 'Hubungi Customer Service', 'Cek Jadwal', 'Info Rumah Sakit'],
        timestamp: new Date().toISOString(),
      }],
      updatedAt: new Date().toISOString(),
    };
    addConversation(conversation);
  }, [addConversation]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeConversation?.messages]);

  useEffect(() => {
    if (isChatWidgetOpen) {
      inputRef.current?.focus();
      if (!activeConversationId) {
        startNewConversation();
      }
    }
  }, [isChatWidgetOpen, activeConversationId, startNewConversation]);

  const handleSend = async (text?: string) => {
    const messageText = text || input.trim();
    if (!messageText || !activeConversationId) return;

    const userMsg: ChatMessage = {
      id: createId(),
      sender: 'user',
      type: 'text',
      text: messageText,
      timestamp: new Date().toISOString(),
    };

    sendMessage(activeConversationId, userMsg);
    setInput('');
    setIsTyping(true);

    const intent = detectIntent(messageText);
    const response = await buildResponse(intent);

    setTimeout(async () => {
      const botMsg: ChatMessage = {
        id: createId(),
        sender: 'bot',
        type: response.isEmergency ? 'emergency-card' : response.doctors ? 'doctor-card' : response.services ? 'service-card' : 'text',
        text: response.text,
        payload: {
          doctors: response.doctors,
          services: response.services,
        },
        quickReplies: response.quickReplies,
        timestamp: new Date().toISOString(),
      };
      addBotResponse(activeConversationId, botMsg);
      setIsTyping(false);
    }, 1000);
  };

  const handleQuickReply = (reply: string) => {
    // Only route to another page if the user explicitly clicked a navigation CTA
    if (reply === 'Buka Halaman Dokter' || reply === 'Lihat Semua Dokter' || reply === 'Buka Direktori Dokter') {
      router.push('/dokter');
      return;
    }
    if (reply === 'Buka Halaman Layanan' || reply === 'Lihat Semua Layanan' || reply === 'Buka Daftar Layanan') {
      router.push('/layanan');
      return;
    }
    if (reply === 'Buka Formulir Buat Janji' || reply === 'Buat Janji Sekarang' || reply === 'Reservasi Sekarang') {
      router.push('/buat-janji');
      return;
    }
    if (reply === 'Buka Halaman Jadwal' || reply === 'Lihat Jadwal Lengkap') {
      router.push('/jadwal');
      return;
    }
    if (reply === 'Buka Live Chat Petugas') {
      router.push('/dashboard/chat');
      return;
    }
    if (reply === 'Telepon Front Office' || reply === 'Hubungi Telepon CS') {
      // eslint-disable-next-line react-hooks/immutability
      window.location.href = 'tel:02112345678';
      return;
    }
    if (reply === 'Hubungi IGD' || reply === 'Hubungi IGD 24 Jam') {
      // eslint-disable-next-line react-hooks/immutability
      window.location.href = 'tel:02112349999';
      return;
    }

    // Default: 'Cari Dokter', 'Cari Layanan', 'Buat Janji', 'Hubungi Customer Service'
    // are sent to the chatbot directly to display informative responses and guided CTAs without redirecting.
    handleSend(reply);
  };

  return (
    <>
      {/* Floating Button */}
      {!isChatWidgetOpen && (
        <button
          onClick={toggleChatWidget}
          className="fixed bottom-20 md:bottom-6 right-4 z-50 h-14 w-14 rounded-full bg-[var(--color-primary)] text-white shadow-xl hover:bg-[var(--color-primary-dark)] transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center animate-pulse-ring cursor-pointer group"
          aria-label="Buka Asisten Medika Care"
        >
          <MessageCircle className="h-6 w-6 transition-transform duration-200 group-hover:scale-110" />
        </button>
      )}

      {/* Chat Widget */}
      {isChatWidgetOpen && (
        <div className="fixed bottom-0 right-0 md:bottom-6 md:right-4 z-50 w-full md:w-[380px] h-[85vh] md:h-[560px] bg-white md:rounded-2xl shadow-2xl border border-[var(--color-border)] flex flex-col animate-scale-in overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3.5 border-b border-[var(--color-border)] bg-[var(--color-primary)] text-white md:rounded-t-2xl">
            <div className="flex items-center gap-2.5">
              <div className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center">
                <MessageCircle className="h-4 w-4" />
              </div>
              <div>
                <p className="font-bold text-sm">Medika Care</p>
                <p className="text-xs text-teal-200 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Online 24 Jam
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button onClick={startNewConversation} className="p-1.5 hover:bg-white/10 rounded-lg transition-colors cursor-pointer" title="Percakapan Baru">
                <Plus className="h-4 w-4" />
              </button>
              <button onClick={toggleChatWidget} className="p-1.5 hover:bg-white/10 rounded-lg transition-colors cursor-pointer" title="Tutup">
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {activeConversation?.messages.map((msg) => (
              <div key={msg.id} className="animate-fade-in-up">
                {msg.sender === 'user' ? (
                  <div className="flex justify-end">
                    <div className="bg-[var(--color-primary)] text-white rounded-2xl rounded-br-sm px-4 py-2.5 max-w-[80%] shadow-xs">
                      <p className="text-sm">{msg.text}</p>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col gap-2 max-w-[85%]">
                    <div className="bg-[var(--color-surface)] rounded-2xl rounded-bl-sm px-4 py-2.5 shadow-xs">
                      <p className="text-sm text-[var(--color-text-primary)] whitespace-pre-line leading-relaxed">{msg.text}</p>
                    </div>
                    {msg.type === 'doctor-card' && msg.payload?.doctors?.map(d => (
                      <DoctorCardMini key={d.id} doctor={d} />
                    ))}
                    {msg.type === 'service-card' && msg.payload?.services?.map(s => (
                      <ServiceCardMini key={s.id} service={s} />
                    ))}
                    {msg.type === 'emergency-card' && (
                      <div className="border-2 border-[var(--color-error)] rounded-xl p-3 bg-red-50/50">
                        <p className="text-sm font-medium text-[var(--color-error)] mb-2">Apakah Anda membutuhkan bantuan darurat?</p>
                        <a href="tel:02112349999" className="inline-block px-4 py-2 bg-[var(--color-error)] hover:bg-red-700 text-white text-sm font-bold rounded-lg transition-colors">Hubungi IGD</a>
                      </div>
                    )}
                    {msg.quickReplies && (
                      <div className="flex flex-wrap gap-1.5 mt-1">
                        {msg.quickReplies.map((qr) => (
                          <button
                            key={qr}
                            onClick={() => handleQuickReply(qr)}
                            className="px-3 py-1.5 text-xs font-medium border border-[var(--color-primary)] text-[var(--color-primary)] rounded-full hover:bg-[var(--color-primary-light)] transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer"
                          >
                            {qr}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
            {isTyping && <TypingIndicator />}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="border-t border-[var(--color-border)] p-3 bg-slate-50/50">
            <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="flex items-center gap-2">
              <input
                ref={inputRef}
                type="text"
                placeholder="Ketik pesan..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 px-3.5 py-2 text-sm border border-[var(--color-border)] rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition-all"
              />
              <button
                type="submit"
                disabled={!input.trim()}
                className="p-2.5 bg-[var(--color-primary)] text-white rounded-xl disabled:opacity-40 hover:bg-[var(--color-primary-dark)] transition-all active:scale-95 cursor-pointer"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
