'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Building2, ArrowRight, Camera, ChevronRight } from 'lucide-react';
import { facilityService } from '@/lib/services/facilityService';
import type { Facility } from '@/types/facility';

export default function FacilitiesPreviewSection() {
  const [facilities, setFacilities] = useState<Facility[]>([]);

  useEffect(() => {
    facilityService.getAll().then((data) => setFacilities(data.slice(0, 6)));
  }, []);

  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-16 sm:py-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--color-primary-light)] border border-[var(--color-secondary)]/30 text-xs font-semibold text-[var(--color-primary)] mb-3">
            <Building2 className="w-3.5 h-3.5 text-[var(--color-primary)]" />
            <span>Fasilitas Rumah Sakit</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[var(--color-text-primary)]">
            Infrastruktur Medis & Ruang Perawatan Modern
          </h2>
          <p className="text-sm sm:text-base text-[var(--color-text-secondary)] mt-2 max-w-2xl leading-relaxed">
            Menghadirkan lingkungan penyembuhan yang steril, nyaman, dan dilengkapi instrumen medis generasi mutakhir untuk keselamatan dan kenyamanan setiap pasien.
          </p>
        </div>

        <Link
          href="/fasilitas"
          className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-primary)] hover:text-[var(--color-primary-dark)] group shrink-0"
        >
          <span>Lihat Seluruh Fasilitas (12)</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

      {/* 6 Featured Facility Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {facilities.map((facility) => {
          const primaryImage = facility.imageUrls && facility.imageUrls.length > 0
            ? facility.imageUrls[0]
            : 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&auto=format&fit=crop&q=80';
          const count = facility.imageUrls ? facility.imageUrls.length : 0;

          return (
            <Link
              key={facility.id}
              href="/fasilitas"
              className="group block rounded-2xl overflow-hidden bg-white border border-[var(--color-border)] hover:border-[var(--color-primary)]/40 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="h-48 sm:h-52 overflow-hidden relative bg-gray-100">
                <img
                  src={primaryImage}
                  alt={facility.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                  {facility.category && (
                    <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-xs text-[var(--color-primary)] shadow-xs">
                      {facility.category}
                    </span>
                  )}
                  {count > 1 && (
                    <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-xs text-white flex items-center gap-1 ml-auto">
                      <Camera className="w-3 h-3" />
                      <span>{count} Foto</span>
                    </span>
                  )}
                </div>
              </div>

              <div className="p-5">
                <h3 className="font-bold text-base sm:text-lg text-[var(--color-text-primary)] group-hover:text-[var(--color-primary)] transition-colors mb-2 line-clamp-1">
                  {facility.name}
                </h3>
                <p className="text-xs sm:text-[13px] text-[var(--color-text-secondary)] line-clamp-2 leading-relaxed mb-4">
                  {facility.description}
                </p>

                <div className="pt-3 border-t border-[var(--color-border)]/60 flex items-center justify-between text-xs font-semibold text-[var(--color-primary)]">
                  <span className="group-hover:underline">Eksplorasi Fasilitas</span>
                  <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
