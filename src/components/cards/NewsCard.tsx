import Link from 'next/link';
import { Calendar, Megaphone, ArrowRight } from 'lucide-react';
import type { NewsItem } from '@/types/news';

const typeLabels: Record<string, string> = {
  event: 'Event Medis',
  pengumuman: 'Pengumuman Resmi',
  program: 'Program Kesehatan',
  'kerja-sama': 'Kemitraan Medis',
  prestasi: 'Penghargaan & Prestasi',
};

interface NewsCardProps {
  news: NewsItem;
}

export default function NewsCard({ news }: NewsCardProps) {
  return (
    <div className="group relative flex flex-col justify-between bg-white rounded-2xl border border-slate-200/90 hover:border-[var(--color-primary)]/40 shadow-xs hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden h-full">
      {/* Clickable Header & Image & Info */}
      <Link href={`/berita/${news.slug}`} className="block flex-1">
        {/* News Photo */}
        <div className="relative w-full aspect-[16/10] overflow-hidden bg-slate-100">
          {news.featuredImage ? (
            <img
              src={news.featuredImage}
              alt={news.title}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="h-full w-full flex items-center justify-center bg-[var(--color-warning-light)]">
              <Megaphone className="h-10 w-10 text-[var(--color-primary)] opacity-40" />
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 pb-2">
          <div className="flex items-center justify-between gap-2 text-xs">
            <span className="font-semibold text-teal-700 tracking-wide uppercase">
              {typeLabels[news.type] || news.type}
            </span>
            <span className="flex items-center gap-1.5 text-slate-400 font-medium">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              {new Date(news.publishedAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
            </span>
          </div>

          <h3 className="mt-2 text-xl sm:text-2xl font-black text-slate-900 group-hover:text-[var(--color-primary)] transition-colors leading-snug line-clamp-2">
            {news.title}
          </h3>

          <p className="mt-2 text-sm text-slate-500 line-clamp-2 leading-relaxed">
            {news.content.slice(0, 120)}...
          </p>
        </div>
      </Link>

      {/* Clean Single Action Button */}
      <div className="p-5 sm:p-6 pt-3">
        <Link
          href={`/berita/${news.slug}`}
          className="w-full py-3 px-4 rounded-xl bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer"
        >
          <span>Baca Berita Lengkap</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
}
