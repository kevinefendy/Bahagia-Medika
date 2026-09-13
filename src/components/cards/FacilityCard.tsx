'use client';

import Link from 'next/link';
import { Camera, ArrowRight } from 'lucide-react';
import type { Facility } from '@/types/facility';

interface FacilityCardProps {
  facility: Facility;
  onClick?: () => void;
  href?: string;
}

export default function FacilityCard({ facility, onClick, href }: FacilityCardProps) {
  const photoCount = facility.imageUrls ? facility.imageUrls.length : 0;
  const primaryImage =
    facility.imageUrls && facility.imageUrls.length > 0
      ? facility.imageUrls[0]
      : 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&auto=format&fit=crop&q=80';

  const cardInner = (
    <>
      <div className="flex-1">
        {/* Photo Container */}
        <div className="relative w-full aspect-[16/10] overflow-hidden bg-slate-100">
          <img
            src={primaryImage}
            alt={facility.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />

          {photoCount > 1 && (
            <div className="absolute bottom-3 right-3 bg-slate-900/70 backdrop-blur-md text-white text-xs font-semibold px-2.5 py-1 rounded-lg flex items-center gap-1.5 shadow-sm">
              <Camera className="w-3.5 h-3.5" />
              <span>{photoCount} Foto</span>
            </div>
          )}
        </div>

        {/* Info */}
        <div className="p-5 sm:p-6 pb-2">
          <p className="text-xs sm:text-sm font-semibold text-teal-700 tracking-wide uppercase">
            {facility.category || 'Fasilitas Unggulan'}
          </p>

          <h3 className="mt-2 text-xl sm:text-2xl font-black text-slate-900 group-hover:text-[var(--color-primary)] transition-colors leading-snug line-clamp-1">
            {facility.name}
          </h3>

          <p className="mt-2 text-sm text-slate-500 line-clamp-2 leading-relaxed">
            {facility.description}
          </p>
        </div>
      </div>

      {/* Single Clean Action Button */}
      <div className="p-5 sm:p-6 pt-3">
        <div className="w-full py-3 px-4 rounded-xl bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-xs transition-colors">
          <span>Lihat Galeri Fasilitas</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </div>
      </div>
    </>
  );

  const containerClasses =
    'group relative flex flex-col justify-between bg-white rounded-2xl border border-slate-200/90 hover:border-[var(--color-primary)]/40 shadow-xs hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden h-full text-left cursor-pointer w-full';

  if (onClick) {
    return (
      <button type="button" onClick={onClick} className={containerClasses}>
        {cardInner}
      </button>
    );
  }

  if (href) {
    return (
      <Link href={href} className={containerClasses}>
        {cardInner}
      </Link>
    );
  }

  return (
    <Link href="/fasilitas" className={containerClasses}>
      {cardInner}
    </Link>
  );
}
