'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  AlertTriangle,
  Stethoscope,
  MessageSquare,
  ShieldCheck,
  PhoneCall,
  ArrowRight,
  Clock,
  CheckCircle2,
  ChevronRight,
  Activity,
  Zap,
} from 'lucide-react';

interface Pathway {
  id: string;
  badge: string;
  badgeColor: string;
  accentColor: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  category: string;
  summary: string;
  urgency: 'Tinggi (Segera)' | 'Terjadwal' | 'Fleksibel Online' | 'Berkala';
  turnaroundTime: string;
  keyIndicators: string[];
  protocol: string;
  primaryAction: {
    label: string;
    href: string;
    isPhone?: boolean;
  };
  secondaryAction?: {
    label: string;
    href: string;
  };
}

const PATHWAYS: Pathway[] = [
  {
    id: 'kritis',
    badge: 'Prioritas Tertinggi (Cito)',
    badgeColor: 'bg-red-50 text-red-600 border-red-200 ring-1 ring-red-500/20',
    accentColor: 'border-red-500/80 hover:border-red-500 shadow-red-500/5',
    icon: AlertTriangle,
    title: 'Jalur Gawat Darurat & Trauma (IGD)',
    category: 'Gawat Darurat 24 Jam',
    summary: 'Penanganan langsung tanpa antrean untuk kondisi klinis yang mengancam fungsi organ vital atau keselamatan jiwa.',
    urgency: 'Tinggi (Segera)',
    turnaroundTime: '< 3 Menit Triage Dokter',
    keyIndicators: [
      'Nyeri dada menjalar ke lengan, punggung, atau rahang',
      'Sesak napas parah atau penurunan saturasi oksigen tiba-tiba',
      'Tanda defisit neurologis stroke: wajah perot, bicara pelo, lemas separuh tubuh',
      'Perdarahan masif tak henti, cedera kepala berat, atau kejang berulang',
    ],
    protocol: 'Kesiapan tim trauma & resusitasi ACLS 24 jam dengan CT-Scan dan kamar bedah darurat siaga penuh.',
    primaryAction: {
      label: 'Telepon Darurat IGD (021) 1234-9999',
      href: 'tel:02112349999',
      isPhone: true,
    },
    secondaryAction: {
      label: 'Alur Armada Ambulans',
      href: '/fasilitas',
    },
  },
  {
    id: 'spesialis',
    badge: 'Konsultasi Komprehensif',
    badgeColor: 'bg-teal-50 text-teal-700 border-teal-200 ring-1 ring-teal-500/20',
    accentColor: 'border-[var(--color-primary)] hover:border-[var(--color-primary-dark)] shadow-teal-500/5',
    icon: Stethoscope,
    title: 'Jalur Poliklinik Dokter Spesialis',
    category: 'Rawat Jalan Ahli',
    summary: 'Konsultasi terfokus dengan dokter spesialis & subspesialis berpengalaman untuk diagnosis mendalam dan terapi terarah.',
    urgency: 'Terjadwal',
    turnaroundTime: 'Sesuai Jam Reservasi',
    keyIndicators: [
      'Gejala penyakit berlangsung lebih dari 3 hari tanpa perbaikan',
      'Kontrol rutin kelainan kronis (diabetes, hipertensi, jantung, rematik)',
      'Konsultasi perencanaan tindakan operasi terencana (elektif)',
      'Keluhan spesifik organ: mata, THT, saraf, kandungan, anak, ortopedi',
    ],
    protocol: 'Reservasi digital terjadwal, rekam medis langsung terintegrasi, dan diagnostik penunjang dalam satu gedung.',
    primaryAction: {
      label: 'Cari Dokter & Pilih Jadwal',
      href: '/dokter',
    },
    secondaryAction: {
      label: 'Lihat Seluruh Layanan',
      href: '/layanan',
    },
  },
  {
    id: 'telecare',
    badge: 'Solusi Digital Instan',
    badgeColor: 'bg-blue-50 text-blue-700 border-blue-200 ring-1 ring-blue-500/20',
    accentColor: 'border-blue-400 hover:border-blue-500 shadow-blue-500/5',
    icon: MessageSquare,
    title: 'Jalur Konsultasi Awal (Medika Care)',
    category: 'Skrining & Chat Gejala',
    summary: 'Asisten interaktif cerdas dan tim perawat siaga untuk memilah gejala awal tanpa perlu keluar rumah.',
    urgency: 'Fleksibel Online',
    turnaroundTime: 'Instan 24 Jam',
    keyIndicators: [
      'Bingung menentukan poliklinik atau spesialisasi yang tepat',
      'Gejala ringan awal: demam hari pertama, flu, batuk, atau ruam kulit ringan',
      'Ingin mengetahui persiapan sebelum tes darah atau puasa diagnostik',
      'Informasi ketersediaan obat rutin dan jam operasional poli',
    ],
    protocol: 'Sistem cerdas menyaring keluhan dan merekomendasikan langkah medis paling aman dalam hitungan detik.',
    primaryAction: {
      label: 'Mulai Chat Tanya Gejala',
      href: '/dashboard/chat',
    },
    secondaryAction: {
      label: 'Masuk Portal Pasien',
      href: '/dashboard',
    },
  },
  {
    id: 'mcu',
    badge: 'Proteksi Jangka Panjang',
    badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200 ring-1 ring-emerald-500/20',
    accentColor: 'border-emerald-500 hover:border-emerald-600 shadow-emerald-500/5',
    icon: ShieldCheck,
    title: 'Jalur Preventif & Medical Check-Up',
    category: 'Pencegahan & Wellness',
    summary: 'Evaluasi kesehatan menyeluruh untuk mendeteksi potensi penyakit sejak dini sebelum timbul keluhan klinis.',
    urgency: 'Berkala',
    turnaroundTime: 'Hasil Hari yang Sama',
    keyIndicators: [
      'Pemeriksaan kesehatan berkala tahunan (Annual Wellness Screening)',
      'Paket skrining kardiovaskular, sindrom metabolik, dan profil lipid',
      'Pemeriksaan pra-nikah (Premarital Checkup) atau persyaratan karier',
      'Skrining fungsi hati, ginjal, dan penanda tumor dini',
    ],
    protocol: 'Lounge MCU terpisah yang privat dan nyaman, dilengkapi konsultasi dokter umum serta dokter spesialis gizi.',
    primaryAction: {
      label: 'Lihat Pilihan Paket MCU',
      href: '/layanan',
    },
    secondaryAction: {
      label: 'Jadwal Dokter MCU',
      href: '/jadwal',
    },
  },
];

export default function CareTriageGuide() {
  const [activePathwayId, setActivePathwayId] = useState<string>('kritis');
  const activePathway = PATHWAYS.find((p) => p.id === activePathwayId) || PATHWAYS[0];

  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-16 sm:py-24">
      {/* Header Baru */}
      <div className="mb-10">
        <div className="max-w-2xl">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[var(--color-text-primary)] tracking-tight leading-tight">
            Panduan Jalur Layanan Medis
          </h2>
          <p className="mt-2 text-sm sm:text-base text-[var(--color-text-secondary)] leading-relaxed">
            Pilih jalur perawatan yang sesuai kebutuhan klinis Anda untuk penanganan cepat, terarah, dan optimal.
          </p>
        </div>
      </div>

      {/* 4 Bento Pathway Cards Selector */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {PATHWAYS.map((pathway) => {
          const Icon = pathway.icon;
          const isSelected = activePathwayId === pathway.id;

          return (
            <button
              key={pathway.id}
              type="button"
              onClick={() => setActivePathwayId(pathway.id)}
              className={`text-left p-5 rounded-2xl border transition-all duration-300 relative overflow-hidden flex flex-col justify-between h-full cursor-pointer ${
                isSelected
                  ? 'bg-white border-2 border-[var(--color-primary)] shadow-lg ring-4 ring-[var(--color-primary)]/10 -translate-y-1'
                  : 'bg-white/70 hover:bg-white border-[var(--color-border)] hover:border-[var(--color-primary)]/40 hover:shadow-md'
              }`}
            >
              {isSelected && (
                <span className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-[var(--color-primary)]/15 to-transparent rounded-bl-full pointer-events-none" />
              )}

              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-transform ${
                      isSelected
                        ? 'bg-[var(--color-primary)] text-white scale-105 shadow-sm'
                        : 'bg-[var(--color-surface)] text-[var(--color-primary)]'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-[var(--color-text-primary)] leading-snug min-h-[44px] flex items-center">
                    {pathway.title}
                  </h3>
                </div>

                <p className="text-xs text-[var(--color-text-secondary)] line-clamp-2 leading-relaxed min-h-[36px]">
                  {pathway.summary}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-[var(--color-border)]/50 flex items-center justify-between text-xs font-semibold">
                <span className={isSelected ? 'text-[var(--color-primary)]' : 'text-[var(--color-text-secondary)]'}>
                  {isSelected ? 'Jalur Aktif Dipilih' : 'Pilih Jalur Ini'}
                </span>
                <ChevronRight
                  className={`w-4 h-4 transition-transform ${
                    isSelected ? 'translate-x-1 text-[var(--color-primary)]' : 'text-gray-400'
                  }`}
                />
              </div>
            </button>
          );
        })}
      </div>

      {/* Expanded Interactive Detail Panel for the Selected Pathway */}
      <div key={activePathway.id} className="bg-white rounded-3xl border-2 border-[var(--color-primary)]/20 p-6 sm:p-8 lg:p-10 shadow-lg relative overflow-hidden animate-fade-in">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 border-b border-[var(--color-border)]">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-[var(--color-primary-light)] text-[var(--color-primary)] flex items-center justify-center shrink-0 shadow-sm border border-[var(--color-secondary)]/20">
              <activePathway.icon className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap mb-1 text-xs font-medium text-[var(--color-text-secondary)]">
                <Clock className="w-3.5 h-3.5" /> Waktu Tanggap: <strong className="text-[var(--color-text-primary)]">{activePathway.turnaroundTime}</strong>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-[var(--color-text-primary)]">
                {activePathway.title}
              </h3>
              <p className="text-xs sm:text-sm text-[var(--color-text-secondary)] mt-1 max-w-2xl">
                {activePathway.summary}
              </p>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
            {activePathway.primaryAction.isPhone ? (
              <a
                href={activePathway.primaryAction.href}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[var(--color-error)] hover:bg-red-700 text-white font-bold text-sm shadow-md transition-all hover:scale-[1.02]"
              >
                <PhoneCall className="w-4 h-4 animate-bounce" />
                <span>{activePathway.primaryAction.label}</span>
              </a>
            ) : (
              <Link
                href={activePathway.primaryAction.href}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white font-bold text-sm shadow-md transition-all hover:scale-[1.02]"
              >
                <span>{activePathway.primaryAction.label}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            )}

            {activePathway.secondaryAction && (
              <Link
                href={activePathway.secondaryAction.href}
                className="inline-flex items-center justify-center gap-1.5 px-4 py-3.5 rounded-xl border border-[var(--color-border)] text-xs font-semibold text-[var(--color-text-primary)] hover:bg-[var(--color-surface)] transition-colors"
              >
                <span>{activePathway.secondaryAction.label}</span>
              </Link>
            )}
          </div>
        </div>

        {/* Grid 2 Kolom: Indikasi & Standar Klinis */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-8 items-start">
          <div className="lg:col-span-7">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-[var(--color-text-secondary)] mb-4 flex items-center gap-2">
              <Activity className="w-4 h-4 text-[var(--color-primary)]" />
              Karakteristik & Gejala yang Memerlukan Jalur Ini:
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {activePathway.keyIndicators.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2.5 p-3.5 rounded-xl bg-[var(--color-surface)]/60 border border-[var(--color-border)]/60"
                >
                  <CheckCircle2 className="w-4 h-4 text-[var(--color-primary)] shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-[13px] text-[var(--color-text-primary)] leading-relaxed">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 bg-gradient-to-br from-[var(--color-surface)] to-white rounded-2xl p-6 border border-[var(--color-border)]">
            <div className="flex items-center gap-2 mb-2 text-xs font-bold text-[var(--color-primary)] uppercase tracking-wider">
              <Zap className="w-4 h-4 text-[var(--color-primary)]" />
              Standar Operasional Klinis Kami
            </div>
            <p className="text-xs sm:text-[13px] text-[var(--color-text-secondary)] leading-relaxed mb-4">
              {activePathway.protocol}
            </p>
            <div className="pt-3 border-t border-[var(--color-border)]/60 flex items-center justify-between text-xs font-medium text-[var(--color-text-primary)]">
              <span>Akreditasi Mutu Paripurna KARS</span>
              <span className="text-emerald-600 font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Terverifikasi
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
