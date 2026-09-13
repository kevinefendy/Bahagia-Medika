import { Star } from 'lucide-react';
import type { Testimonial } from '@/types/testimonial';

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export default function TestimonialCard({ testimonial }: TestimonialCardProps) {
  const avatar = testimonial.avatarUrl || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=face';

  return (
    <div className="rounded-2xl border border-[var(--color-border)] p-6 bg-white smooth-card hover:border-[var(--color-primary)]/40 flex flex-col justify-between">
      <div>
        <div className="flex items-center gap-1 mb-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`h-4 w-4 transition-transform duration-200 hover:scale-110 ${i < testimonial.rating ? 'fill-[var(--color-warning)] text-[var(--color-warning)]' : 'text-[var(--color-border)]'}`}
            />
          ))}
        </div>
        <p className="text-xs sm:text-sm text-[var(--color-text-secondary)] italic leading-relaxed mb-6">
          &ldquo;{testimonial.message}&rdquo;
        </p>
      </div>

      <div className="flex items-center gap-3 pt-4 border-t border-[var(--color-border)]/50">
        <img
          src={avatar}
          alt={testimonial.patientName}
          className="w-11 h-11 rounded-full object-cover border border-[var(--color-border)] shadow-2xs shrink-0 transition-transform duration-300 hover:scale-105"
        />
        <div className="min-w-0">
          <p className="text-sm font-bold text-[var(--color-text-primary)] truncate">
            {testimonial.patientName}
          </p>
          {testimonial.service && (
            <p className="text-xs text-[var(--color-text-secondary)] truncate">
              Pasien {testimonial.service}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
