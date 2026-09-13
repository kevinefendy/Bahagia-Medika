'use client';
import { useState, useRef, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import {
  Send,
  MessageCircle,
  PhoneCall,
  Calendar,
  Sparkles,
  Stethoscope,
  ShieldCheck,
  ShieldAlert,
  Headphones,
  ChevronRight,
  Info,
  AlertTriangle,
  AlertCircle,
} from 'lucide-react';
import Link from 'next/link';
import Tabs from '@/components/ui/Tabs';
import { useChatStore } from '@/lib/store/useChatStore';
import { detectIntent, buildResponse } from '@/features/chat/detectIntent';
import type { ChatMessage, ChatConversation } from '@/types/chat';
import type { Doctor } from '@/types/doctor';
import type { Service } from '@/types/service';

const TABS = [
  { id: 'assistant', label: 'Medika Care (AI Triage & Konsultasi)' },
  { id: 'customer-service', label: 'Customer Care Pasien' },
];

const PROMPT_SUGGESTIONS = [
  'Demam tinggi & pusing sudah 3 hari',
  'Dada sesak & jantung berdebar',
  'Konsultasi tumbuh kembang balita',
  'Estimasi biaya persalinan sesar ERACS',
  'Ketersediaan tempat tidur rawat inap',
  'Jadwal praktik dokter spesialis jantung',
];

function TypingIndicator() {
  return (
    <div className="flex items-center gap-1 px-4 py-2.5 bg-gray-100 rounded-2xl rounded-bl-sm w-fit">
      <div className="h-2 w-2 rounded-full bg-[var(--color-primary)] opacity-60 animate-bounce" style={{ animationDelay: '0ms' }} />
      <div className="h-2 w-2 rounded-full bg-[var(--color-primary)] opacity-80 animate-bounce" style={{ animationDelay: '150ms' }} />
      <div className="h-2 w-2 rounded-full bg-[var(--color-primary)] animate-bounce" style={{ animationDelay: '300ms' }} />
    </div>
  );
}

function DoctorCardInline({ doctor }: { doctor: Doctor }) {
  return (
    <div className="border border-[var(--color-border)] bg-white rounded-xl p-3.5 shadow-2xs hover:shadow-md transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-xl overflow-hidden bg-gray-100 shrink-0 border border-gray-100">
          <img
            src={doctor.photoUrl || 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200&h=200&fit=crop&crop=face'}
            alt={doctor.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <p className="font-bold text-xs sm:text-sm text-[var(--color-text-primary)]">{doctor.name}</p>
          <p className="text-xs font-semibold text-[var(--color-primary)]">{doctor.specializationName} &bull; {doctor.location}</p>
          <p className="text-[11px] text-gray-500 mt-0.5">Pengalaman {doctor.experienceYears} tahun</p>
        </div>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        <Link
          href={`/buat-janji?doctorId=${doctor.id}`}
          className="text-xs font-bold px-3 py-1.5 rounded-lg bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-dark)] transition-colors flex items-center gap-1 shadow-2xs"
        >
          <Calendar className="w-3.5 h-3.5" />
          <span>Buat Janji</span>
        </Link>
        <Link
          href={`/dokter/${doctor.slug}`}
          className="text-xs font-semibold px-2.5 py-1.5 rounded-lg border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:bg-gray-50 transition-colors"
        >
          Profil
        </Link>
      </div>
    </div>
  );
}

function ServiceCardInline({ service }: { service: Service }) {
  return (
    <div className="border border-[var(--color-border)] bg-white rounded-xl p-3.5 shadow-2xs hover:shadow-md transition-all">
      <div className="flex items-center justify-between gap-2 mb-1">
        <p className="font-bold text-xs sm:text-sm text-[var(--color-text-primary)]">{service.name}</p>
        <span className="text-[10px] font-semibold text-[var(--color-primary)] bg-[var(--color-primary-light)] px-2 py-0.5 rounded-full shrink-0">
          {service.category}
        </span>
      </div>
      <p className="text-xs text-[var(--color-text-secondary)] line-clamp-2 leading-relaxed mb-2">
        {service.shortDescription}
      </p>
      <Link
        href={`/layanan/${service.slug}`}
        className="text-xs font-bold text-[var(--color-primary)] hover:underline inline-flex items-center gap-1"
      >
        <span>Lihat Rincian Fasilitas & Tarif</span>
        <ChevronRight className="w-3.5 h-3.5" />
      </Link>
    </div>
  );
}

const CS_SMART_RESPONSES = (query: string): string => {
  const lower = query.toLowerCase();
  if (lower.includes('reschedule') || lower.includes('ubah jadwal') || lower.includes('ganti tanggal')) {
    return `Untuk mengubah jadwal (Reschedule) janji temu dokter:\n\n1. Buka menu Appointment di sidebar kiri Dashboard Anda.\n2. Pilih janji temu yang berstatus "Dikonfirmasi".\n3. Klik tombol "Reschedule" dan tentukan tanggal/jam praktik baru yang tersedia.\n4. Sistem akan otomatis memperbarui tiket antrean digital Anda tanpa biaya tambahan.\n\nJika jadwal dokter berhalangan mendadak, tim Front Office kami juga akan menghubungi Anda via WhatsApp.`;
  }
  if (lower.includes('batal') || lower.includes('cancel') || lower.includes('batalkan')) {
    return `Untuk membatalkan reservasi janji temu:\n\n1. Buka menu Appointment di Dashboard Pasien.\n2. Pilih janji temu terkait, lalu pilih opsi "Batalkan Appointment".\n3. Harap melakukan pembatalan minimal 2 jam sebelum sesi praktik dimulai agar kuota dapat dialokasikan untuk pasien darurat lainnya.\n\nApakah ada hal lain yang dapat kami bantu?`;
  }
  if (lower.includes('bpjs') || lower.includes('rujukan') || lower.includes('jkn')) {
    return `Ketentuan Pelayanan Pasien BPJS Kesehatan di RS Bahagia Medika:\n\n• Pasien Poliklinik Rawat Jalan: Wajib membawa Surat Rujukan aktif dari Puskesmas/FKTP Faskes 1, KTP/Kartu Keluarga, dan Kartu BPJS/Aplikasi Mobile JKN.\n• Pasien Gawat Darurat (IGD): Langsung dilayani 24 Jam di Lobi Barat tanpa memerlukan surat rujukan, dijamin penuh sesuai indikasi medis.\n• Layanan Farmasi & Lab BPJS: Seluruh obat formularium nasional (Fornas) dan pemeriksaan lab rujukan ditanggung tanpa biaya tambahan.`;
  }
  if (lower.includes('asuransi') || lower.includes('klaim') || lower.includes('cashless')) {
    return `Layanan Klaim Asuransi Swasta Rekanan (Cashless):\n\nRS Bahagia Medika bekerja sama dengan 50+ asuransi swasta utama (Prudential, Allianz, AIA, AdMedika, Sinarmas, Manulife, Mandiri Inhealth, dll).\n\nSilakan tunjukkan kartu asuransi fisik atau digital di loket admisi Lobi Utama. Tim representatif billing kami siap membantu penerbitan Surat Jaminan (Guarantee Letter) dalam waktu < 20 menit.`;
  }
  return `Terima kasih telah menghubungi Customer Care RS Bahagia Medika Jakarta.\n\nTim representatif kami siap mendampingi kebutuhan informasi Anda:\n• Telepon Front Office: (021) 1234-5678\n• WhatsApp Customer Care: 0812-3456-7890 (07.00 - 21.00 WIB)\n• Lokasi Kasir & Admisi: Lobi Utama Lantai 1\n• IGD 24 Jam: (021) 1234-9999\n\nSilakan sampaikan pertanyaan spesifik Anda seputar pendaftaran, berkas klaim, atau perubahan jadwal dokter.`;
};

export default function ChatPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('assistant');
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { conversations, addConversation, sendMessage, addBotResponse } = useChatStore();

  const assistantConv = conversations.find((c) => c.channel === 'assistant');
  const csConv = conversations.find((c) => c.channel === 'customer-service');
  const activeConversation = activeTab === 'assistant' ? assistantConv : csConv;

  const createId = () => {
    return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 9)}`;
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeConversation?.messages]);

  // Initialize Assistant conversation if empty
  useEffect(() => {
    if (!assistantConv) {
      const id = createId();
      addConversation({
        id,
        channel: 'assistant',
        title: 'Medika Care AI',
        status: 'active',
        messages: [
          {
            id: createId(),
            sender: 'bot',
            type: 'text',
            text: 'Halo! Saya Medika Care, asisten cerdas RS Bahagia Medika Jakarta.\n\nSaya siap memandu triase klinis gejala Anda, memberikan rekomendasi dokter spesialis yang tepat, serta informasi perkiraan biaya tindakan dan ketersediaan kamar rawat inap.\n\nApa keluhan atau informasi yang Anda butuhkan hari ini?',
            quickReplies: [
              'Tanya Gejala & Triase',
              'Cari Dokter Spesialis',
              'Estimasi Biaya Tindakan',
              'Ketersediaan Kamar Rawat',
              'Cek Jadwal Praktik',
              'Hubungi Customer Care',
            ],
            timestamp: new Date().toISOString(),
          },
        ],
        updatedAt: new Date().toISOString(),
      });
    }
  }, [assistantConv, addConversation]);

  const startCSConversation = useCallback(() => {
    if (!csConv) {
      const id = createId();
      addConversation({
        id,
        channel: 'customer-service',
        title: 'Customer Service',
        status: 'active',
        messages: [
          {
            id: createId(),
            sender: 'agent',
            type: 'text',
            text: 'Selamat datang di Layanan Customer Care RS Bahagia Medika Jakarta.\n\nPetugas kami siap membantu informasi administrasi pendaftaran, perubahan/pembatalan jadwal janji temu, penjaminan BPJS Kesehatan, serta klaim asuransi rekanan.\n\nAda yang dapat kami bantu?',
            quickReplies: [
              'Reschedule Jadwal Dokter',
              'Pembatalan Appointment',
              'Alur Rujukan BPJS',
              'Klaim Asuransi Cashless',
              'Telepon Front Office',
            ],
            timestamp: new Date().toISOString(),
          },
        ],
        updatedAt: new Date().toISOString(),
      });
    }
  }, [csConv, addConversation]);

  useEffect(() => {
    if (activeTab === 'customer-service' && !csConv) {
      startCSConversation();
    }
  }, [activeTab, csConv, startCSConversation]);

  const handleSend = async (customText?: string) => {
    const text = customText || input.trim();
    if (!text || !activeConversation) return;

    const convId = activeConversation.id;

    sendMessage(convId, {
      id: createId(),
      sender: 'user',
      type: 'text',
      text,
      timestamp: new Date().toISOString(),
    });
    setInput('');
    setIsTyping(true);

    if (activeTab === 'assistant') {
      // AI Triage & Medical Intent Detection
      const intent = detectIntent(text);
      const response = await buildResponse(intent);

      setTimeout(() => {
        const botMsg: ChatMessage = {
          id: createId(),
          sender: 'bot',
          type: response.isEmergency
            ? 'emergency-card'
            : response.doctors
            ? 'doctor-card'
            : response.services
            ? 'service-card'
            : 'text',
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
        addBotResponse(convId, botMsg);
        setIsTyping(false);
      }, 750);
    } else {
      // Customer Service Tab
      const responseText = CS_SMART_RESPONSES(text);
      setTimeout(() => {
        addBotResponse(convId, {
          id: createId(),
          sender: 'agent',
          type: 'text',
          text: responseText,
          quickReplies: [
            'Reschedule Jadwal Dokter',
            'Alur Rujukan BPJS',
            'Klaim Asuransi Cashless',
            'Telepon Front Office',
          ],
          timestamp: new Date().toISOString(),
        });
        setIsTyping(false);
      }, 800);
    }
  };

  const handleQuickAction = (reply: string) => {
    if (reply === 'Telepon Front Office') {
      window.location.assign('tel:02112345678');
      return;
    }
    if (reply === 'Hubungi IGD 24 Jam' || reply === 'Hubungi IGD') {
      window.location.assign('tel:02112349999');
      return;
    }
    if (reply === 'Buka Formulir Buat Janji' || reply === 'Buat Janji Sekarang') {
      router.push('/buat-janji');
      return;
    }
    if (reply === 'Buka Halaman Dokter' || reply === 'Buka Direktori Dokter' || reply === 'Buka Halaman Direktori Dokter') {
      router.push('/dokter');
      return;
    }
    if (reply === 'Buka Kalkulator Biaya Tindakan' || reply === 'Estimasi Biaya Tindakan') {
      router.push('/estimasi-biaya');
      return;
    }
    if (reply === 'Buka Halaman Ketersediaan Kamar' || reply === 'Ketersediaan Kamar Rawat') {
      router.push('/ketersediaan-kamar');
      return;
    }
    if (reply === 'Buka Halaman Jadwal Dokter' || reply === 'Cek Jadwal Praktik') {
      router.push('/jadwal');
      return;
    }

    handleSend(reply);
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-5 rounded-2xl border border-[var(--color-border)] shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-black text-[var(--color-text-primary)]">
              Pusat Komunikasi & Konsultasi Pasien
            </h1>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
              Online 24 Jam
            </span>
          </div>
          <p className="text-xs sm:text-sm text-[var(--color-text-secondary)] mt-1">
            Panduan triase klinis cerdas Medika Care dan layanan informasi petugas customer care terintegrasi.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Link
            href="/buat-janji"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white text-xs font-bold transition-colors shadow-2xs"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Buat Janji Dokter</span>
          </Link>
          <a
            href="tel:02112349999"
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs font-bold transition-colors"
          >
            <PhoneCall className="w-3.5 h-3.5 text-rose-600" />
            <span>IGD 24 Jam</span>
          </a>
        </div>
      </div>

      {/* Tabs */}
      <Tabs tabs={TABS} activeTab={activeTab} onChange={setActiveTab} />

      {/* Suggestion Prompts Strip for Assistant */}
      {activeTab === 'assistant' && (
        <div className="bg-gradient-to-r from-teal-50 via-white to-blue-50 p-3 rounded-2xl border border-teal-100 flex items-center gap-2 overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-1.5 text-xs font-bold text-[var(--color-primary)] shrink-0 pl-1">
            <Sparkles className="w-3.5 h-3.5 text-teal-600" />
            <span>Pintasan Pertanyaan:</span>
          </div>
          <div className="flex items-center gap-2">
            {PROMPT_SUGGESTIONS.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => handleSend(item)}
                className="px-3 py-1 text-xs font-medium bg-white hover:bg-teal-50 text-gray-700 hover:text-[var(--color-primary)] rounded-full border border-teal-200/80 shadow-2xs whitespace-nowrap transition-colors cursor-pointer"
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Main Chat Stage */}
      <div className="bg-white rounded-2xl border border-[var(--color-border)] flex flex-col h-[calc(100vh-320px)] min-h-[460px] shadow-sm overflow-hidden">
        {/* Chat Stage Info Header */}
        <div className="px-5 py-3.5 bg-slate-50 border-b border-[var(--color-border)] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-white ${
              activeTab === 'assistant' ? 'bg-[var(--color-primary)]' : 'bg-slate-700'
            }`}>
              {activeTab === 'assistant' ? (
                <Stethoscope className="w-4 h-4" />
              ) : (
                <Headphones className="w-4 h-4" />
              )}
            </div>
            <div>
              <p className="text-xs sm:text-sm font-bold text-[var(--color-text-primary)]">
                {activeTab === 'assistant' ? 'Medika Care AI Triage Engine' : 'Petugas Customer Service RS Bahagia Medika'}
              </p>
              <p className="text-[11px] text-[var(--color-text-secondary)]">
                {activeTab === 'assistant'
                  ? 'Asisten penapisan klinis berstandar Kemenkes RI'
                  : 'Pelayanan administrasi, jadwal poli, dan penjaminan'}
              </p>
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-xs text-emerald-700 font-semibold bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Sistem Terkoneksi</span>
          </div>
        </div>

        {/* Messages Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-slate-50/40">
          {activeConversation?.messages.map((msg) => (
            <div key={msg.id} className="animate-fade-in-up">
              {msg.sender === 'user' ? (
                <div className="flex justify-end">
                  <div className="bg-[var(--color-primary)] text-white rounded-2xl rounded-br-sm px-4 py-3 max-w-[85%] sm:max-w-[70%] shadow-xs">
                    <p className="text-xs sm:text-sm leading-relaxed">{msg.text}</p>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col gap-2.5 max-w-[92%] sm:max-w-[80%]">
                  {/* Triage Banner */}
                  {msg.payload?.triageTitle && (
                    <div
                      className={`px-3.5 py-2 rounded-xl text-xs font-bold border flex items-center gap-2 ${
                        msg.payload.triageLevel === 'CITO'
                          ? 'bg-rose-50 text-rose-800 border-rose-200 animate-pulse'
                          : msg.payload.triageLevel === 'URGENT'
                          ? 'bg-amber-50 text-amber-800 border-amber-200'
                          : msg.payload.triageLevel === 'ROUTINE'
                          ? 'bg-teal-50 text-teal-800 border-teal-200'
                          : 'bg-blue-50 text-blue-800 border-blue-200'
                      }`}
                    >
                      {msg.payload.triageLevel === 'CITO' ? (
                        <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
                      ) : msg.payload.triageLevel === 'URGENT' ? (
                        <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                      ) : msg.payload.triageLevel === 'ROUTINE' ? (
                        <Stethoscope className="w-4 h-4 text-teal-600 shrink-0" />
                      ) : (
                        <Info className="w-4 h-4 text-blue-600 shrink-0" />
                      )}
                      <span>{msg.payload.triageTitle}</span>
                    </div>
                  )}

                  {/* Message Bubble */}
                  <div className="bg-white rounded-2xl rounded-bl-sm p-4 sm:p-5 shadow-xs border border-[var(--color-border)]/70">
                    <p className="text-xs sm:text-sm text-[var(--color-text-primary)] whitespace-pre-line leading-relaxed">
                      {msg.text}
                    </p>
                  </div>

                  {/* Doctors Cards */}
                  {msg.payload?.doctors && msg.payload.doctors.length > 0 && (
                    <div className="space-y-2 pt-1">
                      {msg.payload.doctors.map((d) => (
                        <DoctorCardInline key={d.id} doctor={d} />
                      ))}
                    </div>
                  )}

                  {/* Services Cards */}
                  {msg.payload?.services && msg.payload.services.length > 0 && (
                    <div className="space-y-2 pt-1">
                      {msg.payload.services.map((s) => (
                        <ServiceCardInline key={s.id} service={s} />
                      ))}
                    </div>
                  )}

                  {/* Emergency CITO Card */}
                  {(msg.type === 'emergency-card' || msg.payload?.triageLevel === 'CITO') && (
                    <div className="border-2 border-rose-500 rounded-2xl p-4 bg-rose-50/80 shadow-sm space-y-3">
                      <div className="flex items-center gap-2 text-rose-800 font-extrabold text-sm">
                        <ShieldAlert className="w-5 h-5 text-rose-600 shrink-0" />
                        <span>Kedaruratan Medis CITO Terdeteksi</span>
                      </div>
                      <p className="text-xs text-rose-900 leading-relaxed">
                        Segera hubungi tim darurat atau bawa pasien ke IGD RS Bahagia Medika Jakarta (Lobi Barat). Jalur resusitasi dan dokter jaga spesialis siaga penuh 24 jam.
                      </p>
                      <div className="flex flex-wrap gap-2 pt-1">
                        <a
                          href="tel:02112349999"
                          className="inline-flex items-center gap-2 px-5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-black rounded-xl transition-all shadow-md"
                        >
                          <PhoneCall className="w-4 h-4" />
                          <span>Hubungi IGD: (021) 1234-9999</span>
                        </a>
                        <Link
                          href="/fasilitas"
                          className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-white text-rose-800 font-bold text-xs rounded-xl border border-rose-300 hover:bg-rose-50 transition-colors"
                        >
                          <span>Petunjuk Lobi IGD</span>
                        </Link>
                      </div>
                    </div>
                  )}

                  {/* Quick Action Chips */}
                  {msg.quickReplies && msg.quickReplies.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-1">
                      {msg.quickReplies.map((qr) => (
                        <button
                          key={qr}
                          type="button"
                          onClick={() => handleQuickAction(qr)}
                          className="px-3 py-1.5 text-xs font-semibold border border-teal-600/30 text-[var(--color-primary)] bg-white rounded-full hover:bg-[var(--color-primary-light)] transition-all duration-150 hover:scale-105 active:scale-95 cursor-pointer shadow-2xs"
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

        {/* Input Bar */}
        <div className="border-t border-[var(--color-border)] p-3 sm:p-4 bg-white">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              placeholder={
                activeTab === 'assistant'
                  ? 'Ketik keluhan medis Anda (contoh: "anak demam tinggi", "dada nyeri", "asam lambung perih")...'
                  : 'Ketik pertanyaan administrasi, reschedule, atau klaim asuransi...'
              }
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 px-4 py-2.5 sm:py-3 text-xs sm:text-sm border border-[var(--color-border)] rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition-all"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className="px-5 py-2.5 sm:py-3 bg-[var(--color-primary)] text-white font-bold text-xs sm:text-sm rounded-xl disabled:opacity-40 hover:bg-[var(--color-primary-dark)] transition-all active:scale-95 flex items-center gap-2 cursor-pointer shadow-xs shrink-0"
            >
              <span>Kirim</span>
              <Send className="h-4 w-4" />
            </button>
          </form>

          <p className="text-[11px] text-gray-400 text-center mt-2">
            Medika Care memberikan triase awal berbasis algoritma klinis. Bukan pengganti pemeriksaan medis definitif dokter.
          </p>
        </div>
      </div>
    </div>
  );
}
