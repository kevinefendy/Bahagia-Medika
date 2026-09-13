'use client';

import Link from 'next/link';
import { CreditCard, Shield, FileSpreadsheet, Building2, HelpCircle, BadgeCheck, ArrowRight, CheckCircle2 } from 'lucide-react';

const BILLING_FEATURES = [
  {
    icon: FileSpreadsheet,
    title: 'Estimasi Biaya Perawatan',
    desc: 'Perkiraan transparan rincian biaya tindakan, kamar rawat inap, hingga paket persalinan sebelum prosedur dilakukan.',
    linkText: 'Pelajari estimasi biaya',
    href: '/estimasi-biaya',
  },
  {
    icon: Shield,
    title: 'Penjaminan BPJS Kesehatan',
    desc: 'Menerima rujukan berjenjang dari FKTP / Puskesmas dengan sistem registrasi terintegrasi Mobile JKN BPJS.',
    linkText: 'Alur pendaftaran BPJS',
    href: '/layanan#bpjs',
  },
  {
    icon: Building2,
    title: '50+ Asuransi Swasta Rekanan',
    desc: 'Fasilitas klaim nontunai (cashless) dengan mitra asuransi ternama seperti Prudential, Allianz, AIA, AdMedika, dan lainnya.',
    linkText: 'Lihat daftar mitra asuransi',
    href: '/layanan#asuransi',
  },
  {
    icon: CreditCard,
    title: 'Pembayaran Digital & Instan',
    desc: 'Kemudahan transaksi administrasi melalui Virtual Account multi-bank, QRIS, dan debit/kredit tanpa perlu antre lama di kasir.',
    linkText: 'Metode pembayaran',
    href: '/kontak',
  },
  {
    icon: BadgeCheck,
    title: 'Fasilitas Cicilan Fleksibel',
    desc: 'Pilihan skema cicilan 0% bekerja sama dengan berbagai bank mitra untuk membantu kenyamanan perencanaan anggaran Anda.',
    linkText: 'Pelajari program cicilan',
    href: '/kontak',
  },
  {
    icon: HelpCircle,
    title: 'Konseling Administrasi Pasien',
    desc: 'Tim representatif keuangan kami siap membantu Anda memahami rincian tagihan, berkas klaim, dan hak penjaminan Anda.',
    linkText: 'Hubungi tim billing',
    href: '/kontak',
  },
];

const POPULAR_INSURANCES = [
  'BPJS Kesehatan',
  'AdMedika',
  'Prudential',
  'Allianz',
  'AIA Financial',
  'Sinarmas MSIG',
  'Manulife',
  'Sequis Life',
  'Great Eastern',
  'Mandiri Inhealth',
];

export default function BillingAndInsuranceSection() {
  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-16 sm:py-20">
      {/* Title */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <p className="text-xs sm:text-sm font-semibold text-[var(--color-primary)] tracking-wider uppercase mb-2">
          Administrasi & Penjaminan Pasien
        </p>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[var(--color-text-primary)] mb-3">
          Bantuan Pembayaran & Administrasi Tagihan
        </h2>
        <p className="text-sm sm:text-base text-[var(--color-text-secondary)] leading-relaxed">
          Kesehatan Anda adalah prioritas utama kami. RS Bahagia Medika menjunjung tinggi kejujuran tarif, kepastian estimasi pembiayaan, serta kemudahan klaim asuransi maupun BPJS Kesehatan.
        </p>
      </div>

      {/* Grid of 6 Billing Features */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {BILLING_FEATURES.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.title}
              className="p-6 rounded-2xl bg-white border border-[var(--color-border)] hover:border-[var(--color-primary)]/40 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <div className="w-11 h-11 rounded-xl bg-[var(--color-primary-light)] text-[var(--color-primary)] flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-[var(--color-text-primary)] mb-2">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-[13px] text-[var(--color-text-secondary)] leading-relaxed mb-5">
                  {item.desc}
                </p>
              </div>

              <Link
                href={item.href}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--color-primary)] hover:text-[var(--color-primary-dark)] transition-colors pt-3 border-t border-[var(--color-border)]/50 group"
              >
                <span>{item.linkText}</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          );
        })}
      </div>

      {/* Insurance Partners Strip */}
      <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl p-6 sm:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-md">
            <h4 className="text-base font-bold text-[var(--color-text-primary)] mb-1 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-[var(--color-success)]" />
              Mitra Penjaminan Resmi
            </h4>
            <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
              Kami bekerjasama langsung dengan jaringan asuransi nasional dan multinasional untuk mempermudah proses administrasi klaim Anda.
            </p>
          </div>

          <div className="flex-1 flex flex-wrap items-center gap-2 lg:justify-end">
            {POPULAR_INSURANCES.map((partner) => (
              <span
                key={partner}
                className="text-xs font-medium px-3 py-1.5 rounded-lg bg-white border border-[var(--color-border)] text-[var(--color-text-primary)] shadow-2xs"
              >
                {partner}
              </span>
            ))}
            <Link
              href="/layanan#asuransi"
              className="text-xs font-semibold text-[var(--color-primary)] hover:underline px-2 py-1"
            >
              +40 Lainnya
            </Link>
          </div>
        </div>
      </div>

      {/* Patient Facility Guidance Callout (Inspired by premier hospital standard) */}
      <div className="mt-8 bg-slate-50 border border-slate-200/90 rounded-2xl p-6 sm:p-10 text-center shadow-2xs">
        <h3 className="text-lg sm:text-2xl font-bold text-[var(--color-text-primary)] mb-2.5">
          Merasa Kurang Sehat? Panduan Memilih Fasilitas Perawatan
        </h3>
        <p className="text-xs sm:text-sm text-[var(--color-text-secondary)] max-w-2xl mx-auto mb-6 leading-relaxed">
          Memutuskan apakah Anda memerlukan konsultasi dokter umum, poliklinik spesialis, atau Instalasi Gawat Darurat (IGD) dapat membingungkan. Tim medis kami siap memandu Anda menentukan fasilitas yang tepat sesuai kondisi Anda.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/dashboard/chat"
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white text-xs sm:text-sm font-semibold rounded-xl transition-all shadow-xs"
          >
            <span>Panduan Triase & Tanya Gejala</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <a
            href="tel:02112349999"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-white hover:bg-gray-100 border border-[var(--color-border)] text-rose-700 text-xs sm:text-sm font-semibold rounded-xl transition-colors"
          >
            <span>IGD Darurat 24 Jam: (021) 1234-9999</span>
          </a>
        </div>
      </div>
    </section>
  );
}
