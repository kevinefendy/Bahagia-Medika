'use client';

import Link from 'next/link';
import { Stethoscope, CalendarCheck, Building2, UserCheck, ArrowUpRight, Phone, ShieldCheck, MessageCircle } from 'lucide-react';

const ACTION_PILLARS = [
  {
    title: 'Dokter Spesialis',
    desc: 'Temukan profil, keahlian, dan jadwal praktik 120+ dokter spesialis & subspesialis.',
    href: '/dokter',
    badge: '120+ Spesialis',
    icon: Stethoscope,
    gradient: 'from-[#285F75]/10 to-[#78AFC0]/10',
    iconBg: 'bg-[#285F75] text-white',
    hoverBorder: 'hover:border-[#285F75]',
  },
  {
    title: 'Jadwal & Janji Temu',
    desc: 'Atur jadwal konsultasi rawat jalan lebih praktis, cepat, dan terkonfirmasi otomatis.',
    href: '/buat-janji',
    badge: 'Reservasi Cepat',
    icon: CalendarCheck,
    gradient: 'from-[#2E9E7B]/10 to-[#285F75]/10',
    iconBg: 'bg-[#2E9E7B] text-white',
    hoverBorder: 'hover:border-[#2E9E7B]',
  },
  {
    title: 'Layanan & Fasilitas',
    desc: 'Eksplorasi layanan poliklinik, kamar rawat inap, ICU/NICU, hingga diagnostik canggih.',
    href: '/layanan',
    badge: 'Fasilitas Terpadu',
    icon: Building2,
    gradient: 'from-[#78AFC0]/10 to-[#285F75]/10',
    iconBg: 'bg-[#18313D] text-white',
    hoverBorder: 'hover:border-[#18313D]',
  },
  {
    title: 'Portal Pasien MyMedika',
    desc: 'Pantau rekam medis elektronik, status antrean digital, dan riwayat pemeriksaan Anda.',
    href: '/dashboard',
    badge: 'Digital Portal',
    icon: UserCheck,
    gradient: 'from-[#D9A21B]/10 to-[#285F75]/10',
    iconBg: 'bg-[#285F75] text-white',
    hoverBorder: 'hover:border-[#285F75]',
  },
];

export default function QuickAccessHub() {
  return (
    <section className="relative z-20 max-w-7xl mx-auto px-4 -mt-8 sm:-mt-10 mb-12">
      {/* 4 Pilar Kartu Akses Pasien */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {ACTION_PILLARS.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.title}
              href={item.href}
              className={`group relative flex flex-col justify-between p-5 sm:p-6 bg-white rounded-2xl border border-[var(--color-border)] shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ${item.hoverBorder}`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-sm transition-transform duration-300 group-hover:scale-110 ${item.iconBg}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-[11px] font-semibold tracking-wide uppercase px-2.5 py-1 rounded-full bg-[var(--color-surface)] text-[var(--color-primary)] border border-[var(--color-border)]/60">
                    {item.badge}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-[var(--color-text-primary)] group-hover:text-[var(--color-primary)] transition-colors mb-2 flex items-center justify-between">
                  <span>{item.title}</span>
                </h3>
                <p className="text-xs sm:text-[13px] text-[var(--color-text-secondary)] leading-relaxed mb-4">
                  {item.desc}
                </p>
              </div>

              <div className="pt-3 border-t border-[var(--color-border)]/50 flex items-center justify-between text-xs font-semibold text-[var(--color-primary)]">
                <span className="group-hover:underline">Akses Layanan</span>
                <div className="w-7 h-7 rounded-full bg-[var(--color-surface)] flex items-center justify-center group-hover:bg-[var(--color-primary)] group-hover:text-white transition-all duration-200">
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Baris Pintasan Cepat Edukasi & Bantuan */}
      <div className="mt-4 bg-white/90 backdrop-blur-md rounded-xl border border-[var(--color-border)] p-3 sm:p-4 shadow-sm flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex flex-wrap items-center gap-3 sm:gap-6 text-[var(--color-text-secondary)]">
          <span className="font-semibold text-[var(--color-text-primary)] flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[var(--color-success)] animate-pulse" />
            Layanan Siaga:
          </span>
          <a
            href="tel:02112349999"
            className="inline-flex items-center gap-1.5 font-medium text-[var(--color-error)] hover:underline"
          >
            <Phone className="w-3.5 h-3.5" />
            IGD & Ambulans: (021) 1234-9999
          </a>
          <span className="hidden sm:inline-block text-gray-300">|</span>
          <Link
            href="/layanan#bpjs"
            className="inline-flex items-center gap-1.5 font-medium text-[var(--color-text-primary)] hover:text-[var(--color-primary)] transition-colors"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-[var(--color-primary)]" />
            Menerima BPJS Kesehatan & 50+ Asuransi
          </Link>
        </div>

        <Link
          href="/dashboard/chat"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 font-semibold text-[var(--color-primary)] hover:text-[var(--color-primary-dark)] px-3 py-2 sm:py-1 rounded-lg bg-[var(--color-primary-light)] transition-colors text-center"
        >
          <MessageCircle className="w-3.5 h-3.5" />
          <span>Tanya Gejala (Medika Care)</span>
        </Link>
      </div>
    </section>
  );
}
