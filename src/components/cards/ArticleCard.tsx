import Link from 'next/link';
import { Calendar, FileText } from 'lucide-react';
import type { Article } from '@/types/article';
import Badge from '@/components/ui/Badge';

interface ArticleCardProps {
  article: Article;
  variant?: 'default' | 'featured';
}

export default function ArticleCard({ article, variant = 'default' }: ArticleCardProps) {
  if (variant === 'featured') {
    return (
      <Link
        href={`/artikel/${article.slug}`}
        className="group block rounded-2xl overflow-hidden border border-[var(--color-border)] hover:border-[var(--color-primary)]/40 bg-white smooth-card"
      >
        <div className="h-52 bg-[var(--color-surface)] overflow-hidden relative">
          {article.featuredImage ? (
            <img
              src={article.featuredImage}
              alt={article.title}
              className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            />
          ) : (
            <div className="h-full w-full flex items-center justify-center bg-[var(--color-primary-light)]">
              <FileText className="h-10 w-10 text-[var(--color-primary)] opacity-40" />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-30 transition-opacity duration-300" />
        </div>
        <div className="p-5">
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="info" label={article.category} />
            <span className="flex items-center gap-1 text-xs text-[var(--color-text-secondary)]">
              <Calendar className="h-3 w-3" />
              {new Date(article.publishedAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
            </span>
          </div>
          <h3 className="font-bold text-lg text-[var(--color-text-primary)] group-hover:text-[var(--color-primary)] transition-colors duration-200 line-clamp-2 mb-2">
            {article.title}
          </h3>
          <p className="text-sm text-[var(--color-text-secondary)] line-clamp-2 leading-relaxed">{article.content.slice(0, 150)}...</p>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={`/artikel/${article.slug}`}
      className="group block rounded-2xl overflow-hidden border border-[var(--color-border)] hover:border-[var(--color-primary)]/40 bg-white smooth-card"
    >
      <div className="h-44 bg-[var(--color-surface)] overflow-hidden relative">
        {article.featuredImage ? (
          <img
            src={article.featuredImage}
            alt={article.title}
            className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          />
        ) : (
          <div className="h-full w-full flex items-center justify-center bg-[var(--color-primary-light)]">
            <FileText className="h-8 w-8 text-[var(--color-primary)] opacity-40" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-30 transition-opacity duration-300" />
      </div>
      <div className="p-5">
        <div className="flex items-center gap-2 mb-2">
          <Badge variant="info" label={article.category} />
        </div>
        <h3 className="font-bold text-[var(--color-text-primary)] group-hover:text-[var(--color-primary)] transition-colors duration-200 line-clamp-2 mb-1.5">
          {article.title}
        </h3>
        <p className="text-xs text-[var(--color-text-secondary)]">
          {new Date(article.publishedAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
        </p>
      </div>
    </Link>
  );
}
