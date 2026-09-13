import Link from 'next/link';
import { Baby, HeartPulse, HeartHandshake, ScanFace, Eye, Smile, Siren, Scan, FlaskConical, ArrowRight } from 'lucide-react';
import type { Service } from '@/types/service';

const iconMap: Record<string, React.ElementType> = {
  baby: Baby,
  'heart-pulse': HeartPulse,
  'heart-handshake': HeartHandshake,
  'scan-face': ScanFace,
  eye: Eye,
  smile: Smile,
  siren: Siren,
  scan: Scan,
  'flask-conical': FlaskConical,
};

interface ServiceCardProps {
  service: Service;
  variant?: 'default' | 'compact';
}

export default function ServiceCard({ service, variant = 'default' }: ServiceCardProps) {
  const Icon = iconMap[service.icon] || HeartPulse;
  const image = service.imageUrl || 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&auto=format&fit=crop&q=80';

  if (variant === 'compact') {
    return (
      <Link
        href={`/layanan/${service.slug}`}
        className="flex items-center gap-3 p-3 rounded-xl border border-[var(--color-border)] hover:border-[var(--color-primary)]/40 hover:shadow-md transition-all bg-white group"
      >
        <div className="h-12 w-12 rounded-xl overflow-hidden shrink-0 relative">
          <img src={image} alt={service.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-bold text-[var(--color-text-primary)] group-hover:text-[var(--color-primary)] transition-colors truncate">
            {service.name}
          </p>
          <p className="text-xs text-[var(--color-text-secondary)]">{service.category}</p>
        </div>
      </Link>
    );
  }

  return (
    <div className="rounded-2xl border border-[var(--color-border)] overflow-hidden hover:border-[var(--color-primary)]/40 hover:shadow-xl transition-all duration-300 bg-white group flex flex-col justify-between hover:-translate-y-1">
      <div>
        {/* Photo with Overlay Badge */}
        <div className="h-44 sm:h-48 overflow-hidden relative bg-gray-100">
          <img
            src={image}
            alt={service.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

          {/* Floating Icon */}
          <div className="absolute bottom-3 left-3 w-11 h-11 rounded-xl bg-white/95 backdrop-blur-xs text-[var(--color-primary)] flex items-center justify-center shadow-md">
            <Icon className="w-6 h-6" />
          </div>

          {/* Category Pill */}
          <div className="absolute top-3 right-3 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-white/95 backdrop-blur-xs text-[var(--color-primary)] shadow-xs">
            {service.category}
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          <h3 className="font-bold text-base sm:text-lg text-[var(--color-text-primary)] group-hover:text-[var(--color-primary)] transition-colors mb-2">
            {service.name}
          </h3>
          <p className="text-xs sm:text-[13px] text-[var(--color-text-secondary)] line-clamp-2 leading-relaxed mb-4">
            {service.shortDescription}
          </p>
        </div>
      </div>

      <div className="px-5 pb-5 pt-0">
        <div className="pt-3 border-t border-[var(--color-border)]/50 flex items-center justify-between">
          <Link
            href={`/layanan/${service.slug}`}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[var(--color-primary)] hover:text-[var(--color-primary-dark)] group-hover:underline"
          >
            <span>Detail Pelayanan</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
          <span className="text-[10px] font-semibold text-[var(--color-text-secondary)] bg-[var(--color-surface)] px-2 py-0.5 rounded-md">
            Dokter Spesialis
          </span>
        </div>
      </div>
    </div>
  );
}
