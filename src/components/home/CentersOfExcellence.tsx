'use client';

import Link from 'next/link';
import { ShieldCheck, HeartPulse, Baby, Sparkles, Activity, ArrowRight } from 'lucide-react';

const CENTERS = [
  {
    title: 'Pusat Jantung & Vaskular Terpadu',
    subtitle: 'Cardiovascular Center',
    desc: 'Layanan terintegrasi Cath Lab (Kateterisasi Jantung), intervensi koroner perkutan, serta deteksi dini aritmia dan iskemia.',
    icon: HeartPulse,
    badge: 'Siaga 24 Jam',
    stat: '99.4%',
    statLabel: 'Tingkat Keberhasilan Prosedur',
    image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&auto=format&fit=crop&q=80',
    href: '/layanan',
  },
  {
    title: 'Pusat Kesehatan Ibu & Anak (PKIA)',
    subtitle: 'Maternal, Neonatal & Pediatric Center',
    desc: 'Fasilitas persalinan komprehensif, klinik fertilitas terpadu, serta unit perawatan intensif NICU & PICU Level 3.',
    icon: Baby,
    badge: 'Fasilitas Ramah Anak',
    stat: '15.000+',
    statLabel: 'Kelahiran Aman & Selamat',
    image: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=800&auto=format&fit=crop&q=80',
    href: '/layanan',
  },
  {
    title: 'Pusat Bedah Minimal Invasif',
    subtitle: 'Minimally Invasive & Laparoscopic Surgery',
    desc: 'Teknik bedah modern dengan instrumen mikro dan luka sayatan minimal, meminimalkan rasa nyeri dan mempercepat masa rawat pulang.',
    icon: Sparkles,
    badge: 'Teknologi Terkini',
    stat: '3x Lebih Cepat',
    statLabel: 'Waktu Masa Pemulihan Pasien',
    image: 'https://images.unsplash.com/photo-1551076805-e1869033e561?w=800&auto=format&fit=crop&q=80',
    href: '/layanan',
  },
  {
    title: 'Pusat Diagnostik & Radiologi Presisi',
    subtitle: 'Advanced Imaging & Multi-Slice CT',
    desc: 'Didukung multi-slice CT-Scan, USG 4D Doppler, serta laboratorium patologi klinik otomatis dengan hasil cepat dan terhubung rekam medis digital.',
    icon: Activity,
    badge: 'Presisi Digital',
    stat: '< 45 Menit',
    statLabel: 'Rata-rata Waktu Hasil Cito',
    image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?w=800&auto=format&fit=crop&q=80',
    href: '/layanan',
  },
];

const ACCREDITATIONS = [
  { label: 'Akreditasi Paripurna KARS', desc: 'Standar Mutu Pelayanan Tertinggi KARS Bintang Lima' },
  { label: 'Terintegrasi SATUSEHAT', desc: 'Koneksi Rekam Medis Elektronik Kemenkes RI' },
  { label: 'ISO 9001:2015 Terverifikasi', desc: 'Sistem Manajemen Mutu Pelayanan Pasien' },
  { label: 'Standar Pengendalian Infeksi PPI', desc: 'Protokol Kebersihan & Sterilisasi Terpadu' },
];

export default function CentersOfExcellence() {
  return (
    <section className="w-full bg-[var(--color-surface)] py-16 sm:py-24 border-y border-[var(--color-border)]/70">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div className="max-w-2xl">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[var(--color-text-primary)]">
              Pusat Layanan Unggulan
            </h2>
            <p className="text-sm sm:text-base text-[var(--color-text-secondary)] mt-2">
              Pelayanan medis terpadu dengan teknologi mutakhir dan tim dokter spesialis konsultan.
            </p>
          </div>

          <Link
            href="/layanan"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-primary)] hover:text-[var(--color-primary-dark)] group"
          >
            <span>Lihat Semua Layanan Klinis</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* 4 Center Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-14">
          {CENTERS.map((center) => {
            const Icon = center.icon;
            return (
              <div
                key={center.title}
                className="group relative flex flex-col sm:flex-row bg-white rounded-2xl border border-[var(--color-border)] overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 h-full"
              >
                {/* Image side */}
                <div className="sm:w-2/5 h-48 sm:h-auto relative overflow-hidden bg-gray-100 shrink-0">
                  <img
                    src={center.image}
                    alt={center.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs text-[11px] font-bold text-[var(--color-primary)] px-2.5 py-1 rounded-full shadow-xs border border-[var(--color-border)]/50">
                    {center.badge}
                  </div>
                </div>

                {/* Content side */}
                <div className="sm:w-3/5 p-5 sm:p-6 flex flex-col justify-between flex-1">
                  <div>
                    <div className="w-9 h-9 rounded-lg bg-[var(--color-primary-light)] text-[var(--color-primary)] flex items-center justify-center mb-3">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-semibold text-[var(--color-primary)] tracking-wide uppercase block">
                      {center.subtitle}
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-[var(--color-text-primary)] group-hover:text-[var(--color-primary)] transition-colors mt-0.5 mb-2 leading-snug min-h-[48px] flex items-center">
                      {center.title}
                    </h3>
                    <p className="text-xs sm:text-[13px] text-[var(--color-text-secondary)] leading-relaxed mb-4 min-h-[52px] line-clamp-3">
                      {center.desc}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[var(--color-border)]/50 flex items-center justify-between">
                    <div>
                      <p className="text-base font-extrabold text-[var(--color-text-primary)] leading-none">
                        {center.stat}
                      </p>
                      <p className="text-[10px] text-[var(--color-text-secondary)] mt-0.5">
                        {center.statLabel}
                      </p>
                    </div>

                    <Link
                      href={center.href}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-[var(--color-primary)] group-hover:underline"
                    >
                      <span>Detail</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Accreditations Trust Strip */}
        <div className="bg-white rounded-2xl border border-[var(--color-border)] p-6 sm:p-8 shadow-xs">
          <div className="text-center mb-6">
            <h3 className="text-xs font-bold uppercase tracking-widest text-[var(--color-text-secondary)]">
              Jaminan Mutu & Akreditasi Rumah Sakit
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {ACCREDITATIONS.map((acc) => (
              <div key={acc.label} className="flex items-start gap-3 p-3 rounded-xl bg-[var(--color-surface)]/50">
                <ShieldCheck className="w-5 h-5 text-[var(--color-success)] shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-bold text-[var(--color-text-primary)]">{acc.label}</p>
                  <p className="text-[11px] text-[var(--color-text-secondary)] mt-0.5 leading-relaxed">{acc.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
