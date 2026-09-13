'use client';

import { useState, useEffect, Suspense, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  Search,
  X,
  Calendar,
  CheckCircle2,
  Phone,
  MessageCircle,
  Clock,
  ShieldCheck,
  Building2,
  Filter,
} from 'lucide-react';
import Button from '@/components/ui/Button';
import { DoctorCard } from '@/components/cards';
import { DoctorCardSkeleton } from '@/components/ui/Skeleton';
import EmptyState from '@/components/ui/EmptyState';
import { doctorService } from '@/lib/services/doctorService';
import { specializationService } from '@/lib/services/specializationService';
import type { Doctor } from '@/types/doctor';
import type { Specialization } from '@/types/doctor';
import { cn } from '@/lib/utils/cn';

const DAYS = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];

function DokterContent() {
  const searchParams = useSearchParams();
  const [allDoctors, setAllDoctors] = useState<Doctor[]>([]);
  const [specializations, setSpecializations] = useState<Specialization[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [activeSpecId, setActiveSpecId] = useState<string>(searchParams.get('specializationId') || 'all');
  const [selectedDay, setSelectedDay] = useState<string>('all');

  useEffect(() => {
    Promise.all([
      doctorService.getAll(),
      specializationService.getAll(),
    ]).then(([docList, specList]) => {
      setAllDoctors(docList);
      setSpecializations(specList);
      setLoading(false);
    });
  }, []);

  // Filter doctors with memoization for snappy live search and tab switching
  const filteredDoctors = useMemo(() => {
    let list = allDoctors;

    // Filter by Specialization Tab
    if (activeSpecId !== 'all') {
      list = list.filter((doc) => doc.specializationId === activeSpecId);
    }

    // Filter by Day
    if (selectedDay !== 'all') {
      list = list.filter((doc) =>
        doc.schedules.some((s) => s.day.toLowerCase() === selectedDay.toLowerCase())
      );
    }

    // Filter by Search Query (Name, specialization name, bio, education, location)
    if (search.trim()) {
      const q = search.toLowerCase().trim();
      list = list.filter(
        (doc) =>
          doc.name.toLowerCase().includes(q) ||
          doc.specializationName.toLowerCase().includes(q) ||
          doc.bio.toLowerCase().includes(q) ||
          doc.location.toLowerCase().includes(q) ||
          doc.education.some((edu) => edu.toLowerCase().includes(q))
      );
    }

    return list;
  }, [allDoctors, activeSpecId, selectedDay, search]);

  const resetFilters = () => {
    setSearch('');
    setActiveSpecId('all');
    setSelectedDay('all');
  };

  const hasActiveFilters = search.trim() !== '' || activeSpecId !== 'all' || selectedDay !== 'all';

  return (
    <div className="bg-slate-50/40 min-h-screen">
      {/* 1. Header Banner: Simple, dignified, and authoritative */}
      <div className="bg-gradient-to-b from-white via-slate-50/70 to-slate-100/50 border-b border-slate-200/80 pt-10 pb-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[var(--color-primary)] bg-[var(--color-primary-light)] px-3.5 py-1 rounded-full mb-3.5 border border-teal-200/60 shadow-2xs">
              <ShieldCheck className="w-3.5 h-3.5 text-teal-700" />
              <span>Direktori Dokter Spesialis Resmi</span>
            </span>

            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Para Dokter Spesialis & Konsultan Berpengalaman
            </h1>

            <p className="text-sm sm:text-base text-slate-600 mt-3.5 leading-relaxed max-w-2xl mx-auto">
              Dokter konsultan terpercaya RS Bahagia Medika dengan rekam jejak klinis teruji, jadwal praktik teratur, serta komunikasi ramah dan informatif untuk kenyamanan seluruh anggota keluarga.
            </p>

            {/* Three Key Trust Badges */}
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 mt-6 pt-4 border-t border-slate-200/70 text-xs sm:text-sm font-semibold text-slate-700">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>120+ Dokter Spesialis</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Jadwal Pasti & Tepat Waktu</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>BPJS & 50+ Asuransi Mitra</span>
              </div>
            </div>
          </div>

          {/* Patient Support & WhatsApp Assistance Card (Multi-generational helper) */}
          <div className="mt-8 max-w-2xl mx-auto bg-white rounded-2xl border border-teal-100 p-4 sm:p-5 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3.5 text-center sm:text-left">
              <div className="w-11 h-11 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center shrink-0 border border-teal-100">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900">Perlu Bantuan Memilih Dokter?</p>
                <p className="text-xs text-slate-500">Staf Patient Care Coordinator siap membantu reservasi dan jadwal.</p>
              </div>
            </div>
            <a
              href="https://wa.me/6281234567890?text=Halo%20RS%20Bahagia%20Medika,%20saya%20ingin%20berkonsultasi%20mengenai%20jadwal%20dokter"
              target="_blank"
              rel="noreferrer"
              className="shrink-0 w-full sm:w-auto px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors shadow-xs"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Layanan Pasien</span>
            </a>
          </div>
        </div>
      </div>

      {/* 2. Sticky/Prominent Poliklinik Specialty Tabs (Modeled after ST Wasir Center) */}
      <div className="bg-white border-b border-slate-200 sticky top-16 z-30 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 pt-0.5">
            <button
              type="button"
              onClick={() => setActiveSpecId('all')}
              className={cn(
                'px-4 py-2 rounded-xl text-xs sm:text-sm font-bold shrink-0 transition-all cursor-pointer',
                activeSpecId === 'all'
                  ? 'bg-[var(--color-primary)] text-white shadow-sm'
                  : 'bg-slate-100/80 text-slate-700 hover:bg-slate-200/80 border border-slate-200/60'
              )}
            >
              Semua Dokter ({allDoctors.length})
            </button>

            {specializations.map((spec) => {
              const count = allDoctors.filter((d) => d.specializationId === spec.id).length;
              const isActive = activeSpecId === spec.id;
              return (
                <button
                  key={spec.id}
                  type="button"
                  onClick={() => setActiveSpecId(spec.id)}
                  className={cn(
                    'px-4 py-2 rounded-xl text-xs sm:text-sm font-bold shrink-0 transition-all cursor-pointer flex items-center gap-1.5',
                    isActive
                      ? 'bg-[var(--color-primary)] text-white shadow-sm'
                      : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200/80'
                  )}
                >
                  <span>Spesialis {spec.name}</span>
                  <span
                    className={cn(
                      'text-[11px] px-1.5 py-0.2 rounded-md font-semibold',
                      isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'
                    )}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 3. Main Directory Content Area */}
      <div className="max-w-7xl mx-auto px-4 py-8 sm:py-10">
        {/* Search Bar & Day Filter Controls */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-6 mb-8 shadow-xs space-y-4">
          <div className="flex flex-col md:flex-row items-stretch md:items-center gap-4">
            {/* Search input */}
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
              <input
                type="text"
                placeholder="Ketik nama dokter, spesialisasi, atau keluhan (contoh: Amelia, Jantung, Vaksinasi)..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-11 pr-10 py-3 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)] focus:bg-white transition-all placeholder:text-slate-400"
              />
              {search && (
                <button
                  type="button"
                  onClick={() => setSearch('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-200 transition-colors"
                  aria-label="Bersihkan pencarian"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            {/* Quick Day Filter Selector */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 shrink-0">
              <span className="text-xs font-semibold text-slate-500 mr-1 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-teal-700" />
                <span>Hari Praktik:</span>
              </span>
              <button
                type="button"
                onClick={() => setSelectedDay('all')}
                className={cn(
                  'px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors shrink-0 cursor-pointer',
                  selectedDay === 'all'
                    ? 'bg-teal-700 text-white font-bold'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                )}
              >
                Semua
              </button>
              {DAYS.map((d) => (
                <button
                  key={d}
                  type="button"
                  onClick={() => setSelectedDay(selectedDay === d ? 'all' : d)}
                  className={cn(
                    'px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-colors shrink-0 cursor-pointer',
                    selectedDay === d
                      ? 'bg-teal-700 text-white font-bold'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  )}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>

          {/* Active Filter Chips & Clear */}
          {hasActiveFilters && (
            <div className="flex items-center justify-between gap-2 pt-3 border-t border-slate-100 flex-wrap text-xs">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-slate-400 font-medium">Filter diterapkan:</span>

                {activeSpecId !== 'all' && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-teal-50 text-teal-800 border border-teal-200 font-semibold">
                    Spesialis: {specializations.find((s) => s.id === activeSpecId)?.name}
                    <button type="button" onClick={() => setActiveSpecId('all')} className="hover:text-red-500">
                      <X className="w-3 h-3 ml-0.5" />
                    </button>
                  </span>
                )}

                {selectedDay !== 'all' && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-teal-50 text-teal-800 border border-teal-200 font-semibold">
                    Hari: {selectedDay}
                    <button type="button" onClick={() => setSelectedDay('all')} className="hover:text-red-500">
                      <X className="w-3 h-3 ml-0.5" />
                    </button>
                  </span>
                )}

                {search.trim() && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 border border-slate-200 font-semibold">
                    Kata Kunci: &quot;{search}&quot;
                    <button type="button" onClick={() => setSearch('')} className="hover:text-red-500">
                      <X className="w-3 h-3 ml-0.5" />
                    </button>
                  </span>
                )}
              </div>

              <button
                type="button"
                onClick={resetFilters}
                className="text-teal-700 hover:text-teal-900 font-bold hover:underline cursor-pointer"
              >
                Reset Semua Filter
              </button>
            </div>
          )}
        </div>

        {/* Results Counter */}
        {!loading && (
          <div className="flex items-center justify-between mb-6 text-sm">
            <p className="text-slate-600">
              Menampilkan{' '}
              <strong className="text-slate-900 font-bold">{filteredDoctors.length}</strong> dokter spesialis aktif
            </p>
            {activeSpecId !== 'all' && (
              <span className="text-xs text-slate-500 hidden sm:inline">
                Poliklinik {specializations.find((s) => s.id === activeSpecId)?.name}
              </span>
            )}
          </div>
        )}

        {/* 4. Doctors Cards Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <DoctorCardSkeleton key={i} />
            ))}
          </div>
        ) : filteredDoctors.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-10 text-center">
            <EmptyState
              title="Dokter Tidak Ditemukan"
              description="Tidak ada dokter spesialis yang sesuai dengan kriteria filter atau pencarian Anda."
              ctaLabel="Tampilkan Semua Dokter"
              onCtaClick={resetFilters}
            />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDoctors.map((doctor) => (
              <DoctorCard key={doctor.id} doctor={doctor} />
            ))}
          </div>
        )}

        {/* 5. Bottom Informational Reassurance Strip */}
        <div className="mt-16 bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h3 className="text-lg sm:text-xl font-bold text-slate-900">
              Kenyamanan & Kemudahan Layanan Pasien RS Bahagia Medika
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Kami memastikan setiap tahapan mulai dari pendaftaran hingga konsultasi berjalan mudah bagi semua generasi.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs sm:text-sm">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center shrink-0 font-bold">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 mb-1">Reservasi Online Mandiri</h4>
                <p className="text-slate-600 leading-relaxed text-xs">
                  Pilih dokter, hari, dan jam praktik secara instan dengan bukti pendaftaran digital tanpa perlu antre fisik di loket.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center shrink-0 font-bold">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 mb-1">Poliklinik Terpadu & Terarah</h4>
                <p className="text-slate-600 leading-relaxed text-xs">
                  Setiap poliklinik dilengkapi ruang tunggu nyaman berhawa sejuk, penunjuk arah jelas, dan staf admisi siaga.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center shrink-0 font-bold">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 mb-1">Dukungan Asuransi & BPJS</h4>
                <p className="text-slate-600 leading-relaxed text-xs">
                  Proses klaim administrasi cashless dengan lebih dari 50 perusahaan asuransi rekanan dan rujukan BPJS Kesehatan.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function DokterPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="skeleton h-10 w-64 mb-4" />
          <div className="skeleton h-12 w-full mb-8" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="skeleton h-80 rounded-2xl" />
            ))}
          </div>
        </div>
      }
    >
      <DokterContent />
    </Suspense>
  );
}
