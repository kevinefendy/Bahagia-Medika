'use client';

import { useState, useEffect } from 'react';
import { facilityService } from '@/lib/services/facilityService';
import { FacilityCard } from '@/components/cards';
import Modal from '@/components/ui/Modal';
import type { Facility } from '@/types/facility';
import { Sparkles, CheckCircle2, Phone, CalendarCheck } from 'lucide-react';
import Link from 'next/link';

const CATEGORIES = [
  'Semua Fasilitas',
  'Gawat Darurat',
  'Rawat Inap',
  'Tindakan Medis',
  'Diagnostik',
  'Ibu & Anak',
  'Rehabilitasi',
  'Penunjang Medis',
];

export default function FasilitasPage() {
  const [facilities, setFacilities] = useState<Facility[]>([]);
  const [selected, setSelected] = useState<Facility | null>(null);
  const [activeImageIdx, setActiveImageIdx] = useState<number>(0);
  const [activeCategory, setActiveCategory] = useState<string>('Semua Fasilitas');

  useEffect(() => {
    facilityService.getAll().then(setFacilities);
  }, []);

  const filteredFacilities = facilities.filter((f) => {
    if (activeCategory === 'Semua Fasilitas') return true;
    return f.category?.toLowerCase() === activeCategory.toLowerCase();
  });

  const handleOpenModal = (f: Facility) => {
    setSelected(f);
    setActiveImageIdx(0);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 sm:py-16">
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--color-primary-light)] border border-[var(--color-secondary)]/30 text-xs font-semibold text-[var(--color-primary)] mb-3">
          <Sparkles className="w-3.5 h-3.5 text-[var(--color-primary)]" />
          <span>Infrastruktur & Teknologi Medis</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[var(--color-text-primary)] tracking-tight mb-3">
          Fasilitas Medis Modern & Terintegrasi
        </h1>
        <p className="text-sm sm:text-base text-[var(--color-text-secondary)] leading-relaxed">
          Dirancang untuk memberikan kenyamanan maksimal bagi pasien dan keluarga, didukung peralatan diagnostik dan terapeutik generasi mutakhir berstandar mutu internasional.
        </p>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${
              activeCategory === cat
                ? 'bg-[var(--color-primary)] text-white shadow-sm'
                : 'bg-white text-[var(--color-text-secondary)] border border-[var(--color-border)] hover:bg-[var(--color-surface)]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Facilities Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredFacilities.map((f) => (
          <FacilityCard key={f.id} facility={f} onClick={() => handleOpenModal(f)} />
        ))}
      </div>

      {/* Detail Gallery Modal */}
      <Modal
        isOpen={!!selected}
        onClose={() => setSelected(null)}
        title={selected?.name || 'Detail Fasilitas'}
        size="lg"
      >
        {selected && (
          <div className="space-y-5">
            {/* Active Big Image */}
            <div className="h-64 sm:h-80 w-full rounded-2xl overflow-hidden bg-gray-100 relative shadow-inner">
              <img
                src={
                  selected.imageUrls && selected.imageUrls.length > 0
                    ? selected.imageUrls[activeImageIdx]
                    : 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&auto=format&fit=crop&q=80'
                }
                alt={`${selected.name} ${activeImageIdx + 1}`}
                className="w-full h-full object-cover transition-all duration-300"
              />
              {selected.category && (
                <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-xs text-white text-xs font-bold px-3 py-1 rounded-full">
                  {selected.category}
                </div>
              )}
            </div>

            {/* Thumbnail Selectors */}
            {selected.imageUrls && selected.imageUrls.length > 1 && (
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                {selected.imageUrls.map((url, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setActiveImageIdx(i)}
                    className={`relative w-20 h-16 rounded-xl overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                      activeImageIdx === i
                        ? 'border-[var(--color-primary)] ring-2 ring-[var(--color-primary)]/20 scale-105'
                        : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={url} alt={`Thumbnail ${i + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Description & Standard */}
            <div className="bg-[var(--color-surface)]/70 rounded-2xl p-5 border border-[var(--color-border)]/60">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--color-primary)] mb-2 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[var(--color-success)]" />
                Spesifikasi & Standar Pelayanan
              </h4>
              <p className="text-xs sm:text-sm text-[var(--color-text-secondary)] leading-relaxed">
                {selected.description}
              </p>
            </div>

            {/* Quick Action in Modal */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
              <a
                href="tel:02112349999"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-[var(--color-error)] text-[var(--color-error)] hover:bg-red-50 text-xs font-bold transition-colors"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Info & Hotline IGD 24 Jam</span>
              </a>

              <Link
                href="/buat-janji"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white text-xs font-bold shadow-md transition-colors"
              >
                <CalendarCheck className="w-3.5 h-3.5" />
                <span>Reservasi Layanan</span>
              </Link>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
