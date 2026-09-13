'use client';

import type { Facility } from '@/types/facility';
import { Camera, ChevronRight } from 'lucide-react';

interface FacilityCardProps {
  facility: Facility;
  onClick?: () => void;
}

export default function FacilityCard({ facility, onClick }: FacilityCardProps) {
  const photoCount = facility.imageUrls ? facility.imageUrls.length : 0;
  const primaryImage = facility.imageUrls && facility.imageUrls.length > 0
    ? facility.imageUrls[0]
    : 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&auto=format&fit=crop&q=80';

  return (
    <button
      onClick={onClick}
      type="button"
      className="group block w-full text-left rounded-2xl overflow-hidden border border-[var(--color-border)] hover:border-[var(--color-primary)]/40 hover:shadow-xl transition-all duration-300 bg-white cursor-pointer hover:-translate-y-1"
    >
      <div className="h-52 bg-[var(--color-surface)] overflow-hidden relative">
        <img
          src={primaryImage}
          alt={facility.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
          {facility.category && (
            <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-xs text-[var(--color-primary)] shadow-xs border border-white/40">
              {facility.category}
            </span>
          )}
          {photoCount > 1 && (
            <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-xs text-white flex items-center gap-1 ml-auto">
              <Camera className="w-3 h-3" />
              <span>{photoCount} Foto</span>
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
          <span className="group-hover:underline">Lihat Galeri Fasilitas</span>
          <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </div>
      </div>
    </button>
  );
}
