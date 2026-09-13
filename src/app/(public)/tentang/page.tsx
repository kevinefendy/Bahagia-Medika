import Link from 'next/link';
import { ShieldCheck, Heart, Users, Award, CheckCircle2, ArrowRight } from 'lucide-react';
import Button from '@/components/ui/Button';

export default function TentangPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-10 sm:py-16">
      {/* Hero Section with Photo */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-16">
        <div className="lg:col-span-7">
          <span className="text-xs font-bold text-[var(--color-primary)] uppercase tracking-wider px-3 py-1 rounded-full bg-[var(--color-primary-light)] border border-[var(--color-secondary)]/30 mb-3 inline-block">
            Tentang Bahagia Medika
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[var(--color-text-primary)] tracking-tight leading-tight mb-4">
            Dedikasi Terbaik untuk Keselamatan dan Pemulihan Anda
          </h1>
          <p className="text-sm sm:text-base text-[var(--color-text-secondary)] leading-relaxed mb-6">
            Berdiri sejak tahun 2001 di jantung Jakarta Selatan, Rumah Sakit Bahagia Medika terus berinovasi memadukan keahlian klinis para dokter spesialis terbaik dengan teknologi kedokteran mutakhir serta pelayanan yang hangat dan penuh kepedulian.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <Link href="/dokter">
              <Button variant="primary" size="md">
                Temui Tim Dokter <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link href="/fasilitas">
              <Button variant="outline" size="md">
                Jelajahi Fasilitas
              </Button>
            </Link>
          </div>
        </div>

        <div className="lg:col-span-5 relative">
          <div className="h-80 sm:h-96 rounded-3xl overflow-hidden shadow-xl border border-[var(--color-border)] relative">
            <img
              src="https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=800&auto=format&fit=crop&q=80"
              alt="Gedung Rumah Sakit Bahagia Medika"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <p className="font-bold text-sm">Gedung Utama Bahagia Medika</p>
              <p className="text-xs text-white/80">Jl. Kesehatan No. 123, Jakarta Selatan</p>
            </div>
          </div>
        </div>
      </div>

      {/* 3 Photo Grid Showcase */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        <div className="rounded-2xl overflow-hidden border border-[var(--color-border)] shadow-xs bg-white">
          <div className="h-48 overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1551076805-e1869033e561?w=800&auto=format&fit=crop&q=80"
              alt="Teknologi Operasi Presisi"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div className="p-5">
            <h3 className="font-bold text-base text-[var(--color-text-primary)] mb-1">Teknologi Terkini</h3>
            <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
              Dilengkapi instrumen bedah laparoskopi, CT-Scan 128-Slice, dan sistem monitoring pasien canggih.
            </p>
          </div>
        </div>

        <div className="rounded-2xl overflow-hidden border border-[var(--color-border)] shadow-xs bg-white">
          <div className="h-48 overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=800&auto=format&fit=crop&q=80"
              alt="Pelayanan Penuh Kasih"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div className="p-5">
            <h3 className="font-bold text-base text-[var(--color-text-primary)] mb-1">Pelayanan Humanis</h3>
            <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
              Memprioritaskan kenyamanan emosional dan psikologis pasien serta keluarga selama masa perawatan.
            </p>
          </div>
        </div>

        <div className="rounded-2xl overflow-hidden border border-[var(--color-border)] shadow-xs bg-white">
          <div className="h-48 overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&auto=format&fit=crop&q=80"
              alt="Tim Dokter Spesialis Berpengalaman"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div className="p-5">
            <h3 className="font-bold text-base text-[var(--color-text-primary)] mb-1">Dokter Ahli Multidisiplin</h3>
            <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
              Lebih dari 120 dokter spesialis dan subspesialis dari berbagai bidang ilmu kedokteran ternama.
            </p>
          </div>
        </div>
      </div>

      {/* Visi & Misi */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        <div className="p-8 rounded-3xl bg-[var(--color-surface)] border border-[var(--color-border)]">
          <div className="w-12 h-12 rounded-xl bg-[var(--color-primary)] text-white flex items-center justify-center mb-4 shadow-sm">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-[var(--color-text-primary)] mb-3">Visi Kami</h2>
          <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
            Menjadi pusat rujukan pelayanan kesehatan terdepan di Indonesia yang berstandar internasional, mengutamakan keselamatan pasien, dan terus berinovasi dalam teknologi serta pendidikan medis berkelanjutan.
          </p>
        </div>

        <div className="p-8 rounded-3xl bg-white border border-[var(--color-border)] shadow-xs">
          <div className="w-12 h-12 rounded-xl bg-[var(--color-secondary)] text-white flex items-center justify-center mb-4 shadow-sm">
            <Heart className="w-6 h-6" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-[var(--color-text-primary)] mb-3">Misi Kami</h2>
          <ul className="space-y-2.5 text-xs sm:text-sm text-[var(--color-text-secondary)]">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-[var(--color-success)] shrink-0 mt-0.5" />
              <span>Menyediakan layanan medis komprehensif berstandar akreditasi paripurna.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-[var(--color-success)] shrink-0 mt-0.5" />
              <span>Mengembangkan talenta medis dan tenaga kesehatan profesional secara berkesinambungan.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-[var(--color-success)] shrink-0 mt-0.5" />
              <span>Mengintegrasikan digitalisasi rekam medis dan sistem antrean cerdas tanpa jeda.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-[var(--color-success)] shrink-0 mt-0.5" />
              <span>Menjamin transparansi pembiayaan dan kemitraan luas dengan BPJS serta asuransi.</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Statistik Prestasi */}
      <div className="bg-[var(--color-primary)] text-white rounded-3xl p-8 sm:p-12">
        <div className="text-center max-w-xl mx-auto mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold mb-2">Pencapaian & Kepercayaan Publik</h2>
          <p className="text-xs sm:text-sm text-white/80">Angka yang mencerminkan dedikasi kami selama lebih dari dua dekade</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-xs">
            <p className="text-3xl sm:text-4xl font-black">25+</p>
            <p className="text-xs text-white/80 mt-1">Tahun Pengalaman</p>
          </div>
          <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-xs">
            <p className="text-3xl sm:text-4xl font-black">120+</p>
            <p className="text-xs text-white/80 mt-1">Dokter Spesialis</p>
          </div>
          <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-xs">
            <p className="text-3xl sm:text-4xl font-black">30+</p>
            <p className="text-xs text-white/80 mt-1">Layanan Medis</p>
          </div>
          <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-xs">
            <p className="text-3xl sm:text-4xl font-black">50K+</p>
            <p className="text-xs text-white/80 mt-1">Pasien Bahagia</p>
          </div>
        </div>
      </div>
    </div>
  );
}
