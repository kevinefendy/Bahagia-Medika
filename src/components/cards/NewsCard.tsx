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
    <Link href={`/berita/${news.slug}`} className="block rounded-xl overflow-hidden border border-[var(--color-border)] hover:shadow-md transition-all bg-white">
      <div className="h-40 bg-[var(--color-surface)] overflow-hidden">
        {news.featuredImage ? (
          <img src={news.featuredImage} alt={news.title} className="h-full w-full object-cover" />
        ) : (
          <div className="h-full w-full flex items-center justify-center bg-[var(--color-warning-light)]">
            <Megaphone className="h-8 w-8 text-[var(--color-primary)] opacity-40" />
          </div>
        )}
      </div>
      <div className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <Badge variant="warning" label={typeLabels[news.type] || news.type} />
        </div>
        <h3 className="font-semibold text-[var(--color-text-primary)] line-clamp-2 mb-1">{news.title}</h3>
        <p className="flex items-center gap-1 text-xs text-[var(--color-text-secondary)]">
          <Calendar className="h-3 w-3" />
          {new Date(news.publishedAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
        </p>
      </div>
    </Link>
  );
}
