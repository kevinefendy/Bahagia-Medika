'use client';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Calendar, Megaphone } from 'lucide-react';
import Breadcrumb from '@/components/ui/Breadcrumb';
import Badge from '@/components/ui/Badge';
import { newsService } from '@/lib/services/newsService';
import type { NewsItem } from '@/types/news';

const typeLabels: Record<string, string> = { event: 'Event', pengumuman: 'Pengumuman', program: 'Program Kesehatan', 'kerja-sama': 'Kerja Sama', prestasi: 'Prestasi' };

export default function BeritaDetailPage() {
  const params = useParams();
  const [news, setNews] = useState<NewsItem | null>(null);

  useEffect(() => {
    if (params.slug) {
      newsService.getBySlug(params.slug as string).then((n) => setNews(n || null));
    }
  }, [params.slug]);

  if (!news) {
    return <div className="max-w-4xl mx-auto px-4 py-12"><div className="skeleton h-96 rounded-xl" /></div>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Breadcrumb items={[{ label: 'Berita', href: '/berita' }, { label: news.title }]} />
      <div className="mt-6 bg-white rounded-xl border border-[var(--color-border)] p-6 md:p-8">
        <div className="flex items-center gap-2 mb-3">
          <Badge variant="warning" label={typeLabels[news.type] || news.type} />
          <span className="flex items-center gap-1 text-xs text-[var(--color-text-secondary)]">
            <Calendar className="h-3 w-3" />
            {new Date(news.publishedAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
          </span>
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-[var(--color-text-primary)] mb-6">{news.title}</h1>
        {news.featuredImage ? (
          <img src={news.featuredImage} alt={news.title} className="h-64 w-full object-cover rounded-xl mb-6" />
        ) : (
          <div className="h-64 bg-[var(--color-warning-light)] rounded-xl flex items-center justify-center mb-6">
            <Megaphone className="h-14 w-14 text-[var(--color-primary)] opacity-40" />
          </div>
        )}
        <div className="text-[var(--color-text-secondary)] whitespace-pre-line">{news.content}</div>
      </div>
    </div>
  );
}
