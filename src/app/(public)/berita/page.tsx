'use client';
import { useState, useEffect } from 'react';
import { newsService } from '@/lib/services/newsService';
import { NewsCard } from '@/components/cards';
import Pagination from '@/components/ui/Pagination';
import type { NewsItem } from '@/types/news';
import { cn } from '@/lib/utils/cn';

const TYPES = ['Semua', 'Event', 'Pengumuman', 'Program', 'Kerja Sama', 'Prestasi'];
const TYPE_MAP: Record<string, string> = { Event: 'event', Pengumuman: 'pengumuman', Program: 'program', 'Kerja Sama': 'kerja-sama', Prestasi: 'prestasi' };
const ITEMS_PER_PAGE = 6;

export default function BeritaPage() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [type, setType] = useState('Semua');
  const [page, setPage] = useState(1);

  useEffect(() => {
    newsService.getAll().then(setNews);
  }, []);

  const filtered = type === 'Semua' ? news : news.filter(n => n.type === TYPE_MAP[type]);
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-2">Berita & Pengumuman</h1>
      <p className="text-slate-500 mb-8 max-w-2xl">Pembaruan kegiatan medis, program layanan, dan informasi resmi RS Bahagia Medika</p>
      <div className="flex flex-wrap gap-2 mb-8">
        {TYPES.map(t => (
          <button key={t} onClick={() => { setType(t); setPage(1); }}
            className={cn('px-4 py-2 rounded-full text-sm border transition-colors cursor-pointer',
              type === t ? 'bg-[var(--color-primary)] text-white border-[var(--color-primary)] font-semibold' : 'border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-[var(--color-primary)] bg-white'
            )}>{t}</button>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {paginated.map(n => <NewsCard key={n.id} news={n} />)}
      </div>
      <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
    </div>
  );
}
