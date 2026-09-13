'use client';
import { useState, useRef, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { MessageCircle, X, Send, Plus, PhoneCall, Stethoscope, ChevronRight, ShieldAlert, AlertTriangle, AlertCircle, Info } from 'lucide-react';
import { useUIStore } from '@/lib/store/useUIStore';
import { useChatStore } from '@/lib/store/useChatStore';
import { detectIntent, buildResponse } from '@/features/chat/detectIntent';
import type { ChatMessage, ChatConversation } from '@/types/chat';
import type { Doctor } from '@/types/doctor';
import type { Service } from '@/types/service';
import Link from 'next/link';

function TypingIndicator() {
  return (
    <div className="flex items-center gap-1 px-4 py-2.5 bg-gray-100 rounded-2xl rounded-bl-sm w-fit">
      <div className="h-2 w-2 rounded-full bg-[var(--color-primary)] opacity-60 animate-bounce" style={{ animationDelay: '0ms' }} />
      <div className="h-2 w-2 rounded-full bg-[var(--color-primary)] opacity-80 animate-bounce" style={{ animationDelay: '150ms' }} />
      <div className="h-2 w-2 rounded-full bg-[var(--color-primary)] animate-bounce" style={{ animationDelay: '300ms' }} />
    </div>
  );
}

function DoctorCardMini({ doctor }: { doctor: Doctor }) {
  return (
    <div className="border border-[var(--color-border)] bg-white rounded-xl p-3 shadow-2xs hover:shadow-md transition-all flex items-center gap-3">
      <div className="w-12 h-12 rounded-xl overflow-hidden bg-gray-100 shrink-0 border border-gray-100">
        <img
          src={doctor.photoUrl || 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200&h=200&fit=crop&crop=face'}
          alt={doctor.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-bold text-xs text-[var(--color-text-primary)] truncate">{doctor.name}</p>
        <p className="text-[11px] font-medium text-[var(--color-primary)]">{doctor.specializationName}</p>
        <div className="flex items-center gap-2 mt-1.5">
          <Link
            href={`/buat-janji?doctorId=${doctor.id}`}
            className="text-[11px] font-bold px-2.5 py-1 rounded-lg bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-dark)] transition-colors inline-block"
          >
            Buat Janji
          </Link>
          <Link
            href={`/dokter/${doctor.slug}`}
            className="text-[11px] font-semibold text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors"
          >
            Profil
          </Link>
        </div>
      </div>
    </div>
  );
}

function ServiceCardMini({ service }: { service: Service }) {
  return (
    <div className="border border-[var(--color-border)] bg-white rounded-xl p-3 shadow-2xs hover:shadow-md transition-all">
      <div className="flex items-center justify-between gap-2 mb-1">
        <p className="font-bold text-xs text-[var(--color-text-primary)] truncate">{service.name}</p>
        <span className="text-[10px] font-semibold text-[var(--color-primary)] bg-[var(--color-primary-light)] px-1.5 py-0.5 rounded shrink-0">
          {service.category}
        </span>
      </div>
      <p className="text-[11px] text-[var(--color-text-secondary)] line-clamp-2 leading-relaxed mb-2">
        {service.shortDescription}
      </p>
      <Link
        href={`/layanan/${service.slug}`}
        className="text-[11px] font-bold text-[var(--color-primary)] hover:underline inline-flex items-center gap-1"
      >
        <span>Lihat Detail Layanan</span>
        <ChevronRight className="w-3 h-3" />
      </Link>
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
        text: 'Halo! Saya Medika Care, asisten klinis virtual RS Bahagia Medika Jakarta.\n\nAda yang bisa saya bantu hari ini? Anda dapat mengetik keluhan kesehatan Anda (misal: "anak demam tinggi", "dada sesak", "nyeri lambung perih"), bertanya seputar dokter spesialis, atau mengecek perkiraan biaya tindakan.',
        quickReplies: [
          'Tanya Gejala & Triase',
          'Cari Dokter Spesialis',
          'Estimasi Biaya Tindakan',
          'Ketersediaan Kamar Rawat',
          'Cek Jadwal Praktik',
          'Hubungi Customer Care',
        ],
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
          triageLevel: response.triageLevel,
          triageTitle: response.triageTitle,
        },
        quickReplies: response.quickReplies,
        timestamp: new Date().toISOString(),
      };
      addBotResponse(activeConversationId, botMsg);
      setIsTyping(false);
    }, 750);
  };

  const handleQuickReply = (reply: string) => {
    // Direct navigation actions
    if (reply === 'Buka Halaman Dokter' || reply === 'Lihat Semua Dokter' || reply === 'Buka Direktori Dokter' || reply === 'Buka Halaman Direktori Dokter') {
      router.push('/dokter');
      return;
    }
    if (reply === 'Buka Halaman Layanan' || reply === 'Lihat Semua Layanan' || reply === 'Buka Semua Layanan Medis' || reply === 'Buka Halaman Layanan Laboratorium') {
      router.push('/layanan');
      return;
    }
    if (reply === 'Buka Formulir Buat Janji' || reply === 'Buat Janji Sekarang' || reply === 'Reservasi Sekarang') {
      router.push('/buat-janji');
      return;
    }
    if (reply === 'Buka Halaman Jadwal' || reply === 'Lihat Jadwal Lengkap' || reply === 'Buka Halaman Jadwal Dokter' || reply === 'Cek Jadwal Praktik Lengkap') {
      router.push('/jadwal');
      return;
    }
    if (reply === 'Buka Kalkulator Biaya Tindakan' || reply === 'Kalkulator Biaya Tindakan') {
      router.push('/estimasi-biaya');
      return;
    }
    if (reply === 'Buka Halaman Ketersediaan Kamar' || reply === 'Cek Ketersediaan Kamar Rawat') {
      router.push('/ketersediaan-kamar');
      return;
    }
    if (reply === 'Buka Live Chat Petugas') {
      router.push('/dashboard/chat');
      return;
    }
    if (reply === 'Alur Armada Ambulans') {
      router.push('/fasilitas');
      return;
    }
    if (reply === 'Hubungi Admisi Rawat Inap' || reply === 'Hubungi Tim Billing CS') {
      router.push('/kontak');
      return;
    }
    if (reply === 'Telepon Front Office' || reply === 'Hubungi Telepon CS') {
      window.location.assign('tel:02112345678');
      return;
    }
    if (reply === 'Hubungi IGD' || reply === 'Hubungi IGD 24 Jam') {
      window.location.assign('tel:02112349999');
      return;
    }

    handleSend(reply);
  };

  return (
    <>
      {/* Floating Button - safely positioned above mobile bottom navigation (z-40) */}
      {!isChatWidgetOpen && (
        <button
          onClick={toggleChatWidget}
          className="fixed bottom-20 md:bottom-6 right-4 z-40 h-14 w-14 rounded-full bg-[var(--color-primary)] text-white shadow-xl hover:bg-[var(--color-primary-dark)] transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center cursor-pointer group"
          aria-label="Buka Asisten Medika Care"
        >
          <div className="relative">
            <MessageCircle className="h-6 w-6 transition-transform duration-200 group-hover:scale-110" />
            <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-emerald-400 ring-2 ring-[var(--color-primary)] animate-pulse" />
          </div>
        </button>
      )}

      {/* Chat Widget Modal Sheet */}
      {isChatWidgetOpen && (
        <div className="fixed inset-x-0 bottom-0 top-14 md:inset-auto md:bottom-6 md:right-4 z-50 w-full md:w-[420px] md:h-[620px] bg-white rounded-t-3xl md:rounded-2xl shadow-2xl border border-[var(--color-border)] flex flex-col animate-scale-in overflow-hidden">
          {/* Header */}
          <div className="px-4 py-3 bg-gradient-to-r from-[#18313D] via-[var(--color-primary)] to-[#214F60] text-white border-b border-teal-600/30">
            {/* Mobile Sheet Drag Handle */}
            <div className="w-10 h-1 bg-white/30 rounded-full mx-auto mb-2 md:hidden" />

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="h-9 w-9 rounded-xl bg-white/15 border border-white/20 flex items-center justify-center text-teal-200">
                  <Stethoscope className="h-5 w-5" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <p className="font-black text-sm tracking-tight text-white">Medika Care</p>
                    <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-teal-400/20 text-teal-200 border border-teal-400/30">
                      AI Triage
                    </span>
                  </div>
                  <p className="text-[11px] text-teal-200/90 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Asisten Medis Virtual 24 Jam
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={startNewConversation}
                  className="p-1.5 hover:bg-white/15 rounded-lg transition-colors cursor-pointer text-white/90 hover:text-white"
                  title="Percakapan Baru"
                >
                  <Plus className="h-4 w-4" />
                </button>
                <button
                  onClick={toggleChatWidget}
                  className="p-1.5 hover:bg-white/15 rounded-lg transition-colors cursor-pointer text-white/90 hover:text-white"
                  title="Tutup Asisten"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/40">
            {activeConversation?.messages.map((msg) => (
              <div key={msg.id} className="animate-fade-in-up">
                {msg.sender === 'user' ? (
                  <div className="flex justify-end">
                    <div className="bg-[var(--color-primary)] text-white rounded-2xl rounded-br-sm px-4 py-2.5 max-w-[85%] shadow-xs">
                      <p className="text-xs sm:text-sm leading-relaxed">{msg.text}</p>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col gap-2.5 max-w-[90%]">
                    {/* Triage Level Banner if present */}
                    {msg.payload?.triageTitle && (
                      <div className={`px-3 py-1.5 rounded-xl text-[11px] font-bold border flex items-center gap-1.5 ${
                        msg.payload.triageLevel === 'CITO'
                          ? 'bg-red-50 text-red-700 border-red-200 animate-pulse'
                          : msg.payload.triageLevel === 'URGENT'
                          ? 'bg-amber-50 text-amber-800 border-amber-200'
                          : msg.payload.triageLevel === 'ROUTINE'
                          ? 'bg-teal-50 text-teal-800 border-teal-200'
                          : 'bg-blue-50 text-blue-800 border-blue-200'
                      }`}>
                        {msg.payload.triageLevel === 'CITO' ? (
                          <AlertTriangle className="w-3.5 h-3.5 text-red-600 shrink-0" />
                        ) : msg.payload.triageLevel === 'URGENT' ? (
                          <AlertCircle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                        ) : msg.payload.triageLevel === 'ROUTINE' ? (
                          <Stethoscope className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                        ) : (
                          <Info className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                        )}
                        <span>{msg.payload.triageTitle}</span>
                      </div>
                    )}

                    {/* Bot Message Body */}
                    <div className="bg-white rounded-2xl rounded-bl-sm px-4 py-3 shadow-xs border border-gray-100">
                      <p className="text-xs sm:text-sm text-[var(--color-text-primary)] whitespace-pre-line leading-relaxed font-normal">
                        {msg.text}
                      </p>
                    </div>

                    {/* Doctors Cards */}
                    {msg.payload?.doctors && msg.payload.doctors.length > 0 && (
                      <div className="space-y-2">
                        {msg.payload.doctors.map((d) => (
                          <DoctorCardMini key={d.id} doctor={d} />
                        ))}
                      </div>
                    )}

                    {/* Services Cards */}
                    {msg.payload?.services && msg.payload.services.length > 0 && (
                      <div className="space-y-2">
                        {msg.payload.services.map((s) => (
                          <ServiceCardMini key={s.id} service={s} />
                        ))}
                      </div>
                    )}

                    {/* Emergency Direct Card */}
                    {(msg.type === 'emergency-card' || msg.payload?.triageLevel === 'CITO') && (
                      <div className="border-2 border-rose-500 rounded-2xl p-4 bg-rose-50/70 shadow-sm space-y-2.5">
                        <div className="flex items-center gap-2 text-rose-800 font-extrabold text-xs">
                          <ShieldAlert className="w-4 h-4 text-rose-600 shrink-0" />
                          <span>Instalasi Gawat Darurat (IGD) Siaga Penuh</span>
                        </div>
                        <p className="text-[11px] text-rose-900 leading-snug">
                          Dokter jaga spesialis emergensi, perawat ACLS, dan ambulans siaga 24 jam di RS Bahagia Medika.
                        </p>
                        <a
                          href="tel:02112349999"
                          className="inline-flex items-center justify-center gap-2 w-full px-4 py-2.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-black rounded-xl transition-all shadow-md"
                        >
                          <PhoneCall className="w-4 h-4" />
                          <span>Telepon IGD: (021) 1234-9999</span>
                        </a>
                      </div>
                    )}

                    {/* Quick Replies Buttons */}
                    {msg.quickReplies && msg.quickReplies.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-0.5">
                        {msg.quickReplies.map((qr) => (
                          <button
                            key={qr}
                            type="button"
                            onClick={() => handleQuickReply(qr)}
                            className="px-2.5 py-1 text-[11px] font-semibold border border-teal-600/40 text-[var(--color-primary)] bg-white rounded-full hover:bg-[var(--color-primary-light)] transition-all duration-150 hover:scale-105 active:scale-95 cursor-pointer shadow-2xs"
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

          {/* Input Footer */}
          <div className="border-t border-[var(--color-border)] p-3 bg-white">
            <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="flex items-center gap-2">
              <input
                ref={inputRef}
                type="text"
                placeholder="Ketik keluhan atau pertanyaan Anda..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 px-3.5 py-2.5 text-xs sm:text-sm border border-[var(--color-border)] rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition-all"
              />
              <button
                type="submit"
                disabled={!input.trim()}
                className="p-2.5 bg-[var(--color-primary)] text-white rounded-xl disabled:opacity-40 hover:bg-[var(--color-primary-dark)] transition-all active:scale-95 cursor-pointer shadow-xs shrink-0"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
            <p className="text-[10px] text-gray-400 text-center mt-2">
              Panduan klinis awal &bull; RS Bahagia Medika Jakarta Terakreditasi KARS Paripurna
            </p>
          </div>
        </div>
      )}
    </>
  );
}
