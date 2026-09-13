'use client';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Calendar, User, FileText } from 'lucide-react';
import Breadcrumb from '@/components/ui/Breadcrumb';
import Badge from '@/components/ui/Badge';
import { articleService } from '@/lib/services/articleService';
import type { Article } from '@/types/article';

export default function ArtikelDetailPage() {
  const params = useParams();
  const [article, setArticle] = useState<Article | null>(null);

  useEffect(() => {
    if (params.slug) {
      articleService.getBySlug(params.slug as string).then((a) => setArticle(a || null));
    }
  }, [params.slug]);

  if (!article) {
    return <div className="max-w-3xl mx-auto px-4 py-8"><div className="skeleton h-8 w-48 mb-4" /><div className="skeleton h-64 w-full" /></div>;
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <Breadcrumb items={[{ label: 'Artikel', href: '/artikel' }, { label: article.title }]} />
      <div className="mt-6">
        <div className="flex items-center gap-2 mb-3">
          <Badge variant="info" label={article.category} />
          <span className="flex items-center gap-1 text-xs text-[var(--color-text-secondary)]">
            <Calendar className="h-3 w-3" />
            {new Date(article.publishedAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
          </span>
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-[var(--color-text-primary)] mb-4">{article.title}</h1>
        <div className="flex items-center gap-2 text-sm text-[var(--color-text-secondary)] mb-6">
          <User className="h-4 w-4" />
          <span>{article.author}</span>
        </div>
        {article.featuredImage ? (
          <img src={article.featuredImage} alt={article.title} className="h-64 w-full object-cover rounded-xl mb-6" />
        ) : (
          <div className="h-64 bg-[var(--color-primary-light)] rounded-xl flex items-center justify-center mb-6">
            <FileText className="h-14 w-14 text-[var(--color-primary)] opacity-40" />
          </div>
        )}
        <div className="prose max-w-none text-[var(--color-text-secondary)]">
          <p className="whitespace-pre-line">{article.content}</p>
        </div>
      </div>
    </div>
  );
}
