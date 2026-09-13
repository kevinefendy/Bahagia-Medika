import Link from 'next/link';
import { Calendar, Megaphone } from 'lucide-react';
import type { NewsItem } from '@/types/news';
import Badge from '@/components/ui/Badge';

const typeLabels: Record<string, string> = {
  event: 'Event',
  pengumuman: 'Pengumuman',
  program: 'Program Kesehatan',
  'kerja-sama': 'Kerja Sama',
  prestasi: 'Prestasi',
};

interface NewsCardProps {
  news: NewsItem;
}

export default function NewsCard({ news }: NewsCardProps) {
  return (
    <Link
      href={`/berita/${news.slug}`}
      className="group block rounded-2xl overflow-hidden border border-[var(--color-border)] hover:border-[var(--color-primary)]/40 bg-white smooth-card"
    >
      <div className="h-44 bg-[var(--color-surface)] overflow-hidden relative">
        {news.featuredImage ? (
          <img
            src={news.featuredImage}
            alt={news.title}
            className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          />
        ) : (
          <div className="h-full w-full flex items-center justify-center bg-[var(--color-warning-light)]">
            <Megaphone className="h-8 w-8 text-[var(--color-primary)] opacity-40" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-30 transition-opacity duration-300" />
      </div>
      <div className="p-5">
        <div className="flex items-center gap-2 mb-2">
          <Badge variant="warning" label={typeLabels[news.type] || news.type} />
        </div>
        <h3 className="font-bold text-[var(--color-text-primary)] group-hover:text-[var(--color-primary)] transition-colors duration-200 line-clamp-2 mb-1.5">
          {news.title}
        </h3>
        <p className="flex items-center gap-1.5 text-xs text-[var(--color-text-secondary)]">
          <Calendar className="h-3.5 w-3.5" />
          {new Date(news.publishedAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
        </p>
      </div>
    </Link>
  );
}
