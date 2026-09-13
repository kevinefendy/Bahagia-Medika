import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { Service } from '@/types/service';

interface ServiceCardProps {
  service: Service;
  variant?: 'default' | 'compact';
}

export default function ServiceCard({ service, variant = 'default' }: ServiceCardProps) {
  const image = service.imageUrl || 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&auto=format&fit=crop&q=80';

  if (variant === 'compact') {
    return (
      <Link
        href={`/layanan/${service.slug}`}
        className="flex items-center gap-3 p-3 rounded-xl border border-slate-200 hover:border-[var(--color-primary)]/40 hover:shadow-md transition-all bg-white group"
      >
        <div className="h-12 w-12 rounded-xl overflow-hidden shrink-0 relative bg-slate-100">
          <img src={image} alt={service.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-bold text-slate-900 group-hover:text-[var(--color-primary)] transition-colors truncate">
            {service.name}
          </p>
          <p className="text-xs text-teal-700 font-medium">{service.category}</p>
        </div>
      </Link>
    );
  }

  return (
    <div className="group relative flex flex-col justify-between bg-white rounded-2xl border border-slate-200/90 hover:border-[var(--color-primary)]/40 shadow-xs hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden h-full">
      {/* Clickable Header & Image & Info */}
      <Link href={`/layanan/${service.slug}`} className="block flex-1">
        {/* Service Photo */}
        <div className="relative w-full aspect-[16/10] overflow-hidden bg-slate-100">
          <img
            src={image}
            alt={service.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        {/* Service Category & Title */}
        <div className="p-5 sm:p-6 pb-2">
          <p className="text-xs sm:text-sm font-semibold text-teal-700 tracking-wide uppercase">
            {service.category}
          </p>

          <h3 className="mt-2 text-xl sm:text-2xl font-black text-slate-900 group-hover:text-[var(--color-primary)] transition-colors leading-snug">
            {service.name}
          </h3>

          <p className="mt-2 text-sm text-slate-500 line-clamp-2 leading-relaxed">
            {service.shortDescription}
          </p>
        </div>
      </Link>

      {/* Clean Single Action Button */}
      <div className="p-5 sm:p-6 pt-3">
        <Link
          href={`/layanan/${service.slug}`}
          className="w-full py-3 px-4 rounded-xl bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer"
        >
          <span>Lihat Detail Layanan</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
}
