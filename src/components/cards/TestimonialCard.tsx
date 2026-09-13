import { Star, CheckCircle2 } from 'lucide-react';
import type { Testimonial } from '@/types/testimonial';

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export default function TestimonialCard({ testimonial }: TestimonialCardProps) {
  const avatar =
    testimonial.avatarUrl ||
    'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=face';

  return (
    <div className="group relative flex flex-col justify-between bg-white rounded-2xl border border-slate-200/90 hover:border-teal-500/40 shadow-xs hover:shadow-xl transition-all duration-300 hover:-translate-y-1 p-6 sm:p-7 h-full">
      <div>
        {/* Rating Stars & Verified Badge */}
        <div className="flex items-center justify-between gap-2 mb-4">
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < testimonial.rating
                    ? 'fill-amber-400 text-amber-400'
                    : 'text-slate-200'
                }`}
              />
            ))}
          </div>

          <span className="text-[11px] font-bold text-teal-700 bg-teal-50/80 px-2.5 py-1 rounded-full border border-teal-100/80 flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" />
            <span>Terverifikasi</span>
          </span>
        </div>

        {/* Testimonial Message */}
        <p className="text-slate-700 text-sm sm:text-base leading-relaxed font-normal mb-6">
          &ldquo;{testimonial.message}&rdquo;
        </p>
      </div>

      {/* Patient Profile Footer */}
      <div className="flex items-center gap-3.5 pt-4 border-t border-slate-100 mt-auto">
        <img
          src={avatar}
          alt={testimonial.patientName}
          className="w-12 h-12 rounded-full object-cover border-2 border-slate-100 shadow-xs shrink-0"
        />
        <div className="min-w-0">
          <p className="text-base font-bold text-slate-900 leading-snug truncate">
            {testimonial.patientName}
          </p>
          <p className="text-xs sm:text-sm text-teal-700 font-medium truncate mt-0.5">
            {testimonial.service ? `Pasien ${testimonial.service}` : 'Pasien Rawat Bahagia Medika'}
          </p>
        </div>
      </div>
    </div>
  );
}
