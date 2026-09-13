'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Search,
  Stethoscope,
  Calendar,
  Clock,
  Phone,
  PhoneCall,
  ArrowRight,
  MessageCircle,
  Shield,
  ShieldCheck,
  Heart,
  HeartPulse,
  Award,
  Users,
  CheckCircle2,
  Building2,
  Activity,
  MapPin,
  ExternalLink,
  Sparkles,
  FileText,
  BadgeCheck,
} from 'lucide-react';
import Button from '@/components/ui/Button';
import CinematicHero from '@/components/layout/CinematicHero';
import {
  QuickAccessHub,
  CareTriageGuide,
  BillingAndInsuranceSection,
  CentersOfExcellence,
  FacilitiesPreviewSection,
} from '@/components/home';
import { LiveBedTracker, TreatmentCostEstimator } from '@/components/features';
import { DoctorCard } from '@/components/cards';
import { ServiceCard } from '@/components/cards';
import { ArticleCard } from '@/components/cards';
import { NewsCard } from '@/components/cards';
import { TestimonialCard } from '@/components/cards';
import { CardSkeleton } from '@/components/ui/Skeleton';
import { doctorService } from '@/lib/services/doctorService';
import { serviceService } from '@/lib/services/serviceService';
import { articleService } from '@/lib/services/articleService';
import { newsService } from '@/lib/services/newsService';
import { testimonialService } from '@/lib/services/testimonialService';
import { useAuthStore } from '@/lib/store/useAuthStore';
import type { Doctor } from '@/types/doctor';
import type { Service } from '@/types/service';
import type { Article } from '@/types/article';
import type { NewsItem } from '@/types/news';
import type { Testimonial } from '@/types/testimonial';

const CLINICAL_STANDARDS = [
  {
    icon: ShieldCheck,
    title: 'Akreditasi KARS Paripurna',
    desc: 'Tingkat kelulusan mutu tertinggi dari Komisi Akreditasi Rumah Sakit dan Kementerian Kesehatan RI.',
  },
  {
    icon: Activity,
    title: 'Ruang Operasi Bertekanan Positif',
    desc: 'Sistem tata udara steril HEPA Filter 99.97% dengan aliran laminar untuk mencegah risiko infeksi pasca operasi.',
  },
  {
    icon: Clock,
    title: 'Waktu Tanggap Triage < 5 Menit',
    desc: 'Kesiapan tim gawat darurat bersertifikasi ATLS/ACLS menangani kondisi kritis tanpa antrean administrasi.',
  },
  {
    icon: Building2,
    title: 'Rekam Medis Terintegrasi SATUSEHAT',
    desc: 'Data riwayat pemeriksaan, laboratorium, dan resep pasien terenkripsi aman serta tersinkronisasi nasional.',
  },
];

function AnimatedSection({
  children,
  className = '',
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            el.classList.add('animate-fade-in-up');
            el.style.opacity = '1';
          }, delay);
          observer.unobserve(el);
        }
      },
      { threshold: 0.1 }
    );
    el.style.opacity = '0';
    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

export default function HomePage() {
  const router = useRouter();
  const { user, isAuthenticated } = useAuthStore();
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [articles, setArticles] = useState<Article[]>([]);
  const [news, setNews] = useState<NewsItem[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      doctorService.getFeatured(4),
      serviceService.getFeatured(6),
      articleService.getFeatured(3),
      newsService.getFeatured(3),
    ]).then(([d, s, a, n]) => {
      setDoctors(d);
      setServices(s);
      setArticles(a);
      setNews(n);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    testimonialService.getAll().then(setTestimonials);
  }, []);

  return (
    <div className="bg-slate-50/50">
      {/* Patient Verified Full Access Status Bar */}
      {isAuthenticated && user && (
        <div className="bg-gradient-to-r from-[#0F232B] via-[var(--color-primary)] to-[#18313D] text-white border-b border-teal-500/20 py-2.5 px-4 shadow-sm animate-fade-in">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2.5 text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="font-bold text-teal-200">Akses Penuh Layanan Aktif:</span>
                <span className="text-white">
                  Selamat datang, <strong>{user.name}</strong> ({user.role === 'admin' ? 'Administrator' : 'Pasien Terverifikasi'})
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2.5 shrink-0">
              <Link
                href="/buat-janji"
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-teal-400/20 hover:bg-teal-400/30 text-teal-100 font-bold border border-teal-400/30 transition-colors"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Buat Janji Konsultasi</span>
              </Link>
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white font-semibold transition-colors"
              >
                <Users className="w-3.5 h-3.5" />
                <span>Portal Pasien</span>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* 1. Executive Medical Hero Section */}
      <CinematicHero />

      {/* 2. Quick Access Gateway (4 Pillars of Immediate Patient Care) */}
      <QuickAccessHub />

      {/* 3. Smart Care Pathway Navigator (Triage Decision Matrix) */}
      <CareTriageGuide />

      {/* 4. Centers of Excellence & Clinical Innovations */}
      <CentersOfExcellence />

      {/* 5. Tim Dokter Spesialis Konsultan */}
      <section className="bg-white border-y border-[var(--color-border)] py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--color-primary-light)] text-[var(--color-primary)] text-xs font-semibold mb-2">
                <Stethoscope className="w-3.5 h-3.5" />
                <span>Tenaga Medis Berpengalaman</span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[var(--color-text-primary)] tracking-tight">
                Tim Dokter Spesialis & Subspesialis
              </h2>
              <p className="text-sm sm:text-base text-[var(--color-text-secondary)] mt-2 max-w-xl">
                Dokter konsultan lulusan fakultas kedokteran terkemuka dan anggota organisasi profesi resmi dengan rekam jejak klinis terpercaya.
              </p>
            </div>

            <Link
              href="/dokter"
              className="inline-flex items-center gap-2 text-sm font-bold text-[var(--color-primary)] hover:text-[var(--color-primary-dark)] group shrink-0"
            >
              <span>Lihat Semua Dokter (120+)</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {loading
              ? Array.from({ length: 4 }).map((_, i) => <CardSkeleton key={i} />)
              : doctors.map((doctor) => <DoctorCard key={doctor.id} doctor={doctor} />)}
          </div>
        </div>
      </section>

      {/* 6. Layanan Medis Terpadu */}
      <AnimatedSection className="max-w-7xl mx-auto px-4 py-16 sm:py-24" delay={50}>
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--color-primary-light)] text-[var(--color-primary)] text-xs font-semibold mb-2">
              <Building2 className="w-3.5 h-3.5" />
              <span>Poliklinik & Unit Penunjang</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[var(--color-text-primary)] tracking-tight">
              Layanan Medis Komprehensif
            </h2>
            <p className="text-sm sm:text-base text-[var(--color-text-secondary)] mt-2 max-w-xl">
              Mulai dari perawatan kesehatan primer, poliklinik rawat jalan ahli, hingga prosedur bedah lanjutan berteknologi mutakhir.
            </p>
          </div>

          <Link
            href="/layanan"
            className="inline-flex items-center gap-2 text-sm font-bold text-[var(--color-primary)] hover:text-[var(--color-primary-dark)] group shrink-0"
          >
            <span>Eksplorasi Seluruh Layanan</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading
            ? Array.from({ length: 6 }).map((_, i) => <CardSkeleton key={i} />)
            : services.map((service) => <ServiceCard key={service.id} service={service} />)}
        </div>
      </AnimatedSection>

      {/* 7. Transparansi Pasien: Kalkulator Biaya & Ketersediaan Kamar */}
      <div className="bg-gradient-to-b from-white via-slate-50 to-white py-10 border-y border-[var(--color-border)]">
        <TreatmentCostEstimator />
        <BillingAndInsuranceSection />
        <LiveBedTracker />
      </div>

      {/* 8. Fasilitas Rumah Sakit Modern */}
      <FacilitiesPreviewSection />

      {/* 9. Standar Tata Kelola Klinis & Mutu Rumah Sakit (Replacing generic AI Why Choose Us) */}
      <section className="bg-[var(--color-primary)] text-white py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-[#98D2E1] block mb-2">
              Tata Kelola Klinis & Mutu Rumah Sakit
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight">
              Standar Keselamatan Pasien Berbasis Bukti Ilmiah
            </h2>
            <p className="text-sm sm:text-base text-white/80 mt-3 leading-relaxed">
              Kami menerapkan standar kendali mutu pelayanan medis berjenjang untuk memastikan setiap diagnosis, tindakan operatif, dan terapi obat berlangsung dengan tingkat presisi dan keamanan tertinggi.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {CLINICAL_STANDARDS.map((item) => (
              <div
                key={item.title}
                className="p-6 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-xs flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center mb-4 text-[#98D2E1]">
                    <item.icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-base text-white mb-2 leading-snug">{item.title}</h3>
                  <p className="text-xs sm:text-[13px] text-white/80 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Institutional Stats Strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-14 pt-10 border-t border-white/15 text-center">
            <div>
              <p className="text-3xl sm:text-4xl font-black text-white font-mono">120+</p>
              <p className="text-xs text-white/70 mt-1 uppercase font-semibold">Dokter Spesialis & Konsultan</p>
            </div>
            <div>
              <p className="text-3xl sm:text-4xl font-black text-white font-mono">250</p>
              <p className="text-xs text-white/70 mt-1 uppercase font-semibold">Tempat Tidur Perawatan</p>
            </div>
            <div>
              <p className="text-3xl sm:text-4xl font-black text-white font-mono">6 Unit</p>
              <p className="text-xs text-white/70 mt-1 uppercase font-semibold">Kamar Bedah Laminar Flow</p>
            </div>
            <div>
              <p className="text-3xl sm:text-4xl font-black text-white font-mono">24 Jam</p>
              <p className="text-xs text-white/70 mt-1 uppercase font-semibold">Instalasi Laboratorium & Radiologi</p>
            </div>
          </div>
        </div>
      </section>

      {/* 10. Tentang Rumah Sakit & Kampus Medis */}
      <AnimatedSection className="max-w-7xl mx-auto px-4 py-16 sm:py-24" delay={100}>
        <div className="grid md:grid-cols-12 gap-10 lg:gap-14 items-center">
          <div className="md:col-span-6 relative">
            <div className="rounded-3xl overflow-hidden shadow-xl border-2 border-white">
              <img
                src="https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=900&auto=format&fit=crop&q=80"
                alt="Gedung Utama RS Bahagia Medika Jakarta"
                className="w-full h-96 sm:h-[440px] object-cover"
              />
            </div>
            <div className="absolute -bottom-5 -right-4 sm:bottom-6 sm:-right-6 bg-white p-4 rounded-2xl shadow-xl border border-gray-100 max-w-[220px]">
              <div className="flex items-center gap-2 text-emerald-700 font-bold text-xs mb-1">
                <CheckCircle2 className="w-4 h-4" />
                <span>Terakreditasi Paripurna</span>
              </div>
              <p className="text-[11px] text-gray-500 leading-snug">
                Standar Kementerian Kesehatan Republik Indonesia dan KARS Bintang 5.
              </p>
            </div>
          </div>

          <div className="md:col-span-6 space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-primary)] bg-[var(--color-primary-light)] px-3 py-1 rounded-full">
                Profil Institusi
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[var(--color-text-primary)] mt-3 leading-tight">
                Pusat Rujukan Medis Terpadu & Terpercaya di Jakarta Selatan.
              </h2>
            </div>

            <p className="text-xs sm:text-sm text-[var(--color-text-secondary)] leading-relaxed">
              Sejak didirikan, RS Bahagia Medika berkomitmen menghadirkan layanan kesehatan yang berorientasi penuh pada keselamatan dan kesembuhan pasien (*patient-centered care*). Kami memadukan fasilitas diagnostik modern, ruang perawatan berkonsep *healing architecture*, serta tim klinis multidisiplin yang berdedikasi.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              {[
                { title: 'Instalasi Gawat Darurat Siaga 24 Jam', desc: 'Respon cepat dokter jaga & tim trauma center' },
                { title: 'Laboratorium & Radiologi Sentral', desc: 'Hasil tes darah & CT-Scan terintegrasi digital' },
                { title: 'Kamar Bedah Sentral Bertekanan Positif', desc: 'Teknologi laparoskopi & bedah minimal invasif' },
                { title: 'Akses BPJS & 50+ Asuransi Mitra', desc: 'Fasilitas klaim administrasi cashless dan transparan' },
              ].map((point) => (
                <div key={point.title} className="p-3.5 rounded-xl bg-white border border-[var(--color-border)]">
                  <div className="flex items-center gap-2 font-bold text-xs text-[var(--color-text-primary)] mb-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>{point.title}</span>
                  </div>
                  <p className="text-[11px] text-[var(--color-text-secondary)] pl-5">{point.desc}</p>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <Link href="/tentang">
                <Button variant="primary" size="lg" className="text-xs sm:text-sm font-bold">
                  <span>Profil Lengkap & Struktur Medis</span>
                  <ArrowRight className="w-4 h-4 ml-1.5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* 11. Medika Care Telehealth Portal Banner */}
      <AnimatedSection className="max-w-7xl mx-auto px-4 py-8" delay={100}>
        <div className="bg-gradient-to-r from-[#18313D] via-[#214F60] to-[#285F75] rounded-3xl p-8 sm:p-12 text-white shadow-lg border border-white/10 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="max-w-2xl space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#98D2E1] bg-white/10 px-3 py-1 rounded-full border border-white/15 inline-block">
              Konsultasi Gejala Awal Online
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Medika Care: Panduan Kesehatan Cerdas 24 Jam
            </h3>
            <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
              Bingung menentukan poliklinik atau ingin mengetahui anjuran persiapan sebelum tes darah? Asisten interaktif Medika Care siap membantu memilah keluhan klinis Anda secara instan dari rumah.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0 w-full sm:w-auto">
            <Link href="/dashboard/chat" className="w-full sm:w-auto">
              <button
                type="button"
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white text-[#18313D] font-bold text-xs sm:text-sm hover:bg-teal-50 transition-colors shadow-sm flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4 text-[var(--color-primary)]" />
                <span>Mulai Konsultasi Online</span>
              </button>
            </Link>
            <Link href="/dashboard" className="w-full sm:w-auto">
              <button
                type="button"
                className="w-full sm:w-auto px-5 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs sm:text-sm transition-colors text-center"
              >
                Masuk Portal Pasien
              </button>
            </Link>
          </div>
        </div>
      </AnimatedSection>

      {/* 12. Testimoni Pasien Terverifikasi */}
      <AnimatedSection className="bg-white border-y border-[var(--color-border)] py-16 sm:py-24" delay={100}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-primary)] bg-[var(--color-primary-light)] px-3 py-1 rounded-full">
              Pengalaman Pasien
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[var(--color-text-primary)] mt-3">
              Kisah Pemulihan & Pengalaman Klinis
            </h2>
            <p className="text-sm sm:text-base text-[var(--color-text-secondary)] mt-2">
              Ulasan nyata dari pasien rawat jalan, rawat inap, dan tindakan terencana di RS Bahagia Medika.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <TestimonialCard key={t.id} testimonial={t} />
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* 13. Edukasi & Publikasi Medis Terkini */}
      <section className="max-w-7xl mx-auto px-4 py-16 sm:py-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-primary)] bg-[var(--color-primary-light)] px-3 py-1 rounded-full">
              Edukasi Kesehatan
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[var(--color-text-primary)] mt-2 tracking-tight">
              Artikel & Wawasan Medis Terkini
            </h2>
            <p className="text-sm sm:text-base text-[var(--color-text-secondary)] mt-1 max-w-xl">
              Informasi pencegahan penyakit dan tips hidup sehat yang ditinjau langsung oleh dokter spesialis.
            </p>
          </div>

          <Link
            href="/artikel"
            className="inline-flex items-center gap-2 text-sm font-bold text-[var(--color-primary)] hover:text-[var(--color-primary-dark)] group shrink-0"
          >
            <span>Lihat Semua Artikel</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {loading
            ? Array.from({ length: 3 }).map((_, i) => <CardSkeleton key={i} />)
            : articles.map((article) => <ArticleCard key={article.id} article={article} />)}
        </div>
      </section>

      {/* 14. Berita & Informasi Rumah Sakit */}
      <section className="bg-white border-t border-[var(--color-border)] py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-primary)] bg-[var(--color-primary-light)] px-3 py-1 rounded-full">
                Kabar Institusi
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[var(--color-text-primary)] mt-2 tracking-tight">
                Berita & Agenda Rumah Sakit
              </h2>
              <p className="text-sm sm:text-base text-[var(--color-text-secondary)] mt-1 max-w-xl">
                Pembaruan fasilitas medis, seminar kesehatan publik, dan prestasi institusional terkini.
              </p>
            </div>

            <Link
              href="/berita"
              className="inline-flex items-center gap-2 text-sm font-bold text-[var(--color-primary)] hover:text-[var(--color-primary-dark)] group shrink-0"
            >
              <span>Lihat Semua Berita</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {loading
              ? Array.from({ length: 3 }).map((_, i) => <CardSkeleton key={i} />)
              : news.map((item) => <NewsCard key={item.id} news={item} />)}
          </div>
        </div>
      </section>

      {/* 15. Emergency Hotline & Evakuasi Medis Strip */}
      <section className="relative bg-gradient-to-r from-rose-700 via-rose-800 to-[#18313D] text-white py-14 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-2 max-w-2xl text-center md:text-left">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 text-xs font-bold uppercase tracking-wider text-rose-100">
              <span className="w-2 h-2 rounded-full bg-white animate-ping" />
              Instalasi Gawat Darurat & Trauma Center 24 Jam
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight">
              Keadaan Darurat Medis? Kami Siap Melayani 24/7
            </h2>
            <p className="text-xs sm:text-sm text-rose-100/90 leading-relaxed">
              Tim dokter jaga IGD, perawat resusitasi bersertifikasi ACLS/ATLS, armada ambulans ICU, dan kamar operasi darurat siap siaga penuh.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0 w-full sm:w-auto">
            <a
              href="tel:02178909999"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl bg-white text-rose-800 font-extrabold text-xs sm:text-base shadow-lg hover:bg-rose-50 transition-all text-center"
            >
              <PhoneCall className="w-5 h-5 text-rose-700" />
              <span>(021) 7890-9999</span>
            </a>
            <a
              href="tel:119"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-4 rounded-xl bg-rose-900/60 border border-white/20 text-white font-bold text-xs sm:text-sm hover:bg-rose-900 transition-colors text-center"
            >
              <span>Hotline Darurat 119</span>
            </a>
          </div>
        </div>
      </section>

      {/* 16. Kampus Medis, Lokasi & Akses Pasien */}
      <section className="max-w-7xl mx-auto px-4 py-16 sm:py-24">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-primary)] bg-[var(--color-primary-light)] px-3 py-1 rounded-full">
            Lokasi & Akses
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[var(--color-text-primary)] mt-3">
            Kunjungi Kampus Medis Kami
          </h2>
          <p className="text-sm text-[var(--color-text-secondary)] mt-2">
            Terletak strategis di koridor kesehatan Jakarta Selatan dengan akses transportasi publik dan parkir luas.
          </p>
        </div>

        <div className="grid md:grid-cols-12 gap-8 items-stretch">
          <div className="md:col-span-6 rounded-3xl overflow-hidden border border-[var(--color-border)] shadow-sm bg-gray-100 min-h-[300px]">
            <img
              src="https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=800&auto=format&fit=crop&q=80"
              alt="Lokasi Gedung Rumah Sakit Bahagia Medika"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="md:col-span-6 flex flex-col justify-between bg-white rounded-3xl border border-[var(--color-border)] p-6 sm:p-8 shadow-xs">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-[var(--color-primary)] mb-2 uppercase">
                <Building2 className="w-4 h-4" />
                <span>Kampus Medis Terpadu</span>
              </div>
              <h3 className="text-xl font-bold text-[var(--color-text-primary)]">
                RS Bahagia Medika Jakarta
              </h3>
              <p className="text-xs sm:text-sm text-[var(--color-text-secondary)] mt-1 leading-relaxed">
                Jl. Bahagia Sehat No. 88, Cilandak, Jakarta Selatan, DKI Jakarta 12430
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-6 text-xs">
                <div className="p-3.5 bg-gray-50 rounded-xl border border-gray-100">
                  <p className="text-gray-500 text-[11px] font-semibold">Pintu Masuk IGD 24 Jam:</p>
                  <p className="font-bold text-gray-800 mt-0.5">Lobi Barat (Drop-off Cepat)</p>
                </div>
                <div className="p-3.5 bg-gray-50 rounded-xl border border-gray-100">
                  <p className="text-gray-500 text-[11px] font-semibold">Poli Rawat Jalan & Kiosk:</p>
                  <p className="font-bold text-gray-800 mt-0.5">Lobi Utama Gedung A</p>
                </div>
                <div className="p-3.5 bg-gray-50 rounded-xl border border-gray-100">
                  <p className="text-gray-500 text-[11px] font-semibold">Akses MRT / TransJakarta:</p>
                  <p className="font-bold text-gray-800 mt-0.5">15 Menit dari Stasiun Fatmawati</p>
                </div>
                <div className="p-3.5 bg-gray-50 rounded-xl border border-gray-100">
                  <p className="text-gray-500 text-[11px] font-semibold">Fasilitas Parkir & Valet:</p>
                  <p className="font-bold text-gray-800 mt-0.5">Basement 1-3 & Layanan Valet</p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-100 flex flex-wrap items-center justify-between gap-3">
              <div className="text-xs text-gray-500">
                Call Center: <strong className="text-gray-800">(021) 7890-1234</strong>
              </div>
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-[var(--color-primary)] bg-[var(--color-primary-light)] hover:bg-teal-100 transition-colors"
              >
                <span>Buka Petunjuk Arah Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
