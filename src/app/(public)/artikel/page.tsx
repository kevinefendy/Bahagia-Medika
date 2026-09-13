'use client';
import { useState, useEffect } from 'react';
import { articleService } from '@/lib/services/articleService';
import { ArticleCard } from '@/components/cards';
import Pagination from '@/components/ui/Pagination';
import type { Article } from '@/types/article';
import { cn } from '@/lib/utils/cn';

const CATEGORIES = ['Semua', 'Kesehatan', 'Tips', 'Nutrisi', 'Anak', 'Jantung', 'Mental Health', 'Gaya Hidup'];
const ITEMS_PER_PAGE = 6;

export default function ArtikelPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [category, setCategory] = useState('Semua');
  const [page, setPage] = useState(1);

  useEffect(() => {
    articleService.getAll().then(setArticles);
  }, []);

  const filtered = category === 'Semua' ? articles : articles.filter(a => a.category === category);
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-2">Artikel Kesehatan</h1>
      <p className="text-slate-500 mb-8 max-w-2xl">Informasi dan edukasi kesehatan terpercaya yang ditinjau langsung oleh dokter spesialis RS Bahagia Medika</p>
      <div className="flex flex-wrap gap-2 mb-8">
        {CATEGORIES.map(cat => (
          <button key={cat} onClick={() => { setCategory(cat); setPage(1); }}
            className={cn('px-4 py-2 rounded-full text-sm border transition-colors cursor-pointer',
              category === cat ? 'bg-[var(--color-primary)] text-white border-[var(--color-primary)] font-semibold' : 'border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-[var(--color-primary)] bg-white'
            )}>{cat}</button>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {paginated.map(a => <ArticleCard key={a.id} article={a} />)}
      </div>
      <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
    </div>
  );
}
