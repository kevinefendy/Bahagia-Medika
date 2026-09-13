'use client';
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Search, X, SlidersHorizontal } from 'lucide-react';
import Button from '@/components/ui/Button';
import { DoctorCard } from '@/components/cards';
import { DoctorCardSkeleton } from '@/components/ui/Skeleton';
import EmptyState from '@/components/ui/EmptyState';
import { doctorService } from '@/lib/services/doctorService';
import { specializationService } from '@/lib/services/specializationService';
import type { Doctor } from '@/types/doctor';
import type { Specialization } from '@/types/doctor';
import { cn } from '@/lib/utils/cn';

const DAYS = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'];

function DokterContent() {
  const searchParams = useSearchParams();
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [specializations, setSpecializations] = useState<Specialization[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [selectedSpec, setSelectedSpec] = useState<string[]>([]);
  const [selectedDay, setSelectedDay] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    specializationService.getAll().then(setSpecializations);
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLoading(true);
    const filters: Record<string, string> = {};
    if (selectedSpec.length === 1) filters.specializationId = selectedSpec[0];
    if (selectedDay.length === 1) filters.day = selectedDay[0];
    if (search) filters.search = search;

    doctorService.getAll(filters).then((data) => {
      let result = data;
      if (selectedSpec.length > 1) {
        result = result.filter(d => selectedSpec.includes(d.specializationId));
      }
      if (selectedDay.length > 1) {
        result = result.filter(d => d.schedules.some(s => selectedDay.includes(s.day)));
      }
      setDoctors(result);
      setLoading(false);
    });
  }, [search, selectedSpec, selectedDay]);

  const toggleSpec = (id: string) => {
    setSelectedSpec(prev => prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]);
  };

  const toggleDay = (day: string) => {
    setSelectedDay(prev => prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]);
  };

  const resetFilters = () => {
    setSearch('');
    setSelectedSpec([]);
    setSelectedDay([]);
  };

  const hasFilters = search || selectedSpec.length > 0 || selectedDay.length > 0;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-[var(--color-text-primary)] mb-2">Cari Dokter</h1>
        <p className="text-[var(--color-text-secondary)]">Temukan dokter spesialis yang sesuai dengan kebutuhan Anda</p>
      </div>

      {/* Search Bar */}
      <div className="flex items-center gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[var(--color-text-secondary)]" />
          <input
            type="text"
            placeholder="Cari nama dokter atau spesialisasi..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-3 border border-[var(--color-border)] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)] transition-all"
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-[var(--color-surface)]"
            >
              <X className="h-4 w-4 text-[var(--color-text-secondary)]" />
            </button>
          )}
        </div>
        <Button
          variant="outline"
          onClick={() => setShowFilters(!showFilters)}
          className={cn(showFilters && 'border-[var(--color-primary)] bg-[var(--color-primary-light)]')}
        >
          <SlidersHorizontal className="h-4 w-4" />
          <span className="hidden sm:inline">Filter</span>
          {(selectedSpec.length > 0 || selectedDay.length > 0) && (
            <span className="h-5 w-5 rounded-full bg-[var(--color-primary)] text-white text-xs flex items-center justify-center">
              {selectedSpec.length + selectedDay.length}
            </span>
          )}
        </Button>
      </div>

      {/* Filters */}
      {showFilters && (
        <div className="bg-[var(--color-surface)] rounded-xl p-5 mb-6 space-y-4">
          <div>
            <p className="text-sm font-medium mb-2.5">Spesialisasi</p>
            <div className="flex flex-wrap gap-2">
              {specializations.map((spec) => (
                <button
                  key={spec.id}
                  onClick={() => toggleSpec(spec.id)}
                  className={cn(
                    'px-3 py-1.5 rounded-full text-sm border transition-all',
                    selectedSpec.includes(spec.id)
                      ? 'bg-[var(--color-primary)] text-white border-[var(--color-primary)] shadow-sm'
                      : 'border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]'
                  )}
                >
                  {spec.name}
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className="text-sm font-medium mb-2.5">Hari Praktik</p>
            <div className="flex flex-wrap gap-2">
              {DAYS.map((day) => (
                <button
                  key={day}
                  onClick={() => toggleDay(day)}
                  className={cn(
                    'px-3 py-1.5 rounded-full text-sm border transition-all',
                    selectedDay.includes(day)
                      ? 'bg-[var(--color-primary)] text-white border-[var(--color-primary)] shadow-sm'
                      : 'border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]'
                  )}
                >
                  {day}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Active Filter Chips */}
      {hasFilters && (
        <div className="flex items-center gap-2 mb-6 flex-wrap">
          <span className="text-sm text-[var(--color-text-secondary)]">Filter aktif:</span>
          {selectedSpec.map(id => {
            const spec = specializations.find(s => s.id === id);
            return spec ? (
              <button
                key={id}
                onClick={() => toggleSpec(id)}
                className="inline-flex items-center gap-1 px-2.5 py-1 bg-[var(--color-primary-light)] text-[var(--color-primary)] text-xs font-medium rounded-full hover:bg-[var(--color-primary)]/20 transition-colors"
              >
                {spec.name}
                <X className="h-3 w-3" />
              </button>
            ) : null;
          })}
          {selectedDay.map(day => (
            <button
              key={day}
              onClick={() => toggleDay(day)}
              className="inline-flex items-center gap-1 px-2.5 py-1 bg-[var(--color-primary-light)] text-[var(--color-primary)] text-xs font-medium rounded-full hover:bg-[var(--color-primary)]/20 transition-colors"
            >
              {day}
              <X className="h-3 w-3" />
            </button>
          ))}
          {search && (
            <button
              onClick={() => setSearch('')}
              className="inline-flex items-center gap-1 px-2.5 py-1 bg-[var(--color-primary-light)] text-[var(--color-primary)] text-xs font-medium rounded-full hover:bg-[var(--color-primary)]/20 transition-colors"
            >
              &quot;{search}&quot;
              <X className="h-3 w-3" />
            </button>
          )}
          <button
            onClick={resetFilters}
            className="text-xs text-[var(--color-text-secondary)] hover:text-[var(--color-error)] transition-colors underline"
          >
            Reset semua
          </button>
        </div>
      )}

      {/* Results Count */}
      {!loading && (
        <p className="text-sm text-[var(--color-text-secondary)] mb-4">
          Menampilkan <span className="font-semibold text-[var(--color-text-primary)]">{doctors.length}</span> dokter
        </p>
      )}

      {/* Results Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {Array.from({ length: 6 }).map((_, i) => <DoctorCardSkeleton key={i} />)}
        </div>
      ) : doctors.length === 0 ? (
        <EmptyState
          title="Tidak ada dokter ditemukan"
          description="Coba ubah filter pencarian atau reset semua filter"
          ctaLabel="Reset Filter"
          onCtaClick={resetFilters}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {doctors.map((doctor) => (
            <DoctorCard key={doctor.id} doctor={doctor} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function DokterPage() {
  return (
    <Suspense fallback={
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="skeleton h-8 w-48 mb-4" />
        <div className="skeleton h-12 w-full mb-6" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="skeleton h-64 rounded-xl" />
          ))}
        </div>
      </div>
    }>
      <DokterContent />
    </Suspense>
  );
}
