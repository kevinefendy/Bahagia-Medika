'use client';
import { useState, useEffect } from 'react';
import { serviceService } from '@/lib/services/serviceService';
import { ServiceCard } from '@/components/cards';
import { CardSkeleton } from '@/components/ui/Skeleton';
import type { Service } from '@/types/service';
import { cn } from '@/lib/utils/cn';

const CATEGORIES = ['Semua', 'Rawat Jalan', 'Rawat Inap', 'Penunjang Medis'];

export default function LayananPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('Semua');

  useEffect(() => {
    serviceService.getAll().then((data) => {
      setServices(data);
      setLoading(false);
    });
  }, []);

  const filtered = category === 'Semua' ? services : services.filter(s => s.category === category);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl md:text-3xl font-bold text-[var(--color-text-primary)] mb-2">Layanan Kami</h1>
      <p className="text-[var(--color-text-secondary)] mb-6">Pelayanan kesehatan lengkap untuk Anda dan keluarga</p>

      <div className="flex flex-wrap gap-2 mb-8">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={cn(
              'px-4 py-2 rounded-full text-sm border transition-colors',
              category === cat
                ? 'bg-[var(--color-primary)] text-white border-[var(--color-primary)]'
                : 'border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-[var(--color-primary)]'
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading ? (
          Array.from({ length: 6 }).map((_, i) => <CardSkeleton key={i} />)
        ) : (
          filtered.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))
        )}
      </div>
    </div>
  );
}
