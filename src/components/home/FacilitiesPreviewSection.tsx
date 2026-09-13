'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { facilityService } from '@/lib/services/facilityService';
import type { Facility } from '@/types/facility';
import { FacilityCard } from '@/components/cards';
import { CardSkeleton } from '@/components/ui/Skeleton';

export default function FacilitiesPreviewSection() {
  const [facilities, setFacilities] = useState<Facility[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    facilityService.getAll().then((data) => {
      setFacilities(data.slice(0, 6));
      setLoading(false);
    });
  }, []);

  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-16 sm:py-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
        <div>
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
        {loading
          ? Array.from({ length: 6 }).map((_, i) => <CardSkeleton key={i} />)
          : facilities.map((facility) => (
              <FacilityCard key={facility.id} facility={facility} href="/fasilitas" />
            ))}
      </div>
    </section>
  );
}
