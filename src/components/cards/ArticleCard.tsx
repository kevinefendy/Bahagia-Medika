import Link from 'next/link';
import { Calendar, FileText, ArrowRight } from 'lucide-react';
import type { Article } from '@/types/article';

interface ArticleCardProps {
  article: Article;
  variant?: 'default' | 'featured';
}

export default function ArticleCard({ article, variant = 'default' }: ArticleCardProps) {
  if (variant === 'featured') {
    return (
      <div className="group relative flex flex-col md:flex-row bg-white rounded-2xl border border-slate-200/90 hover:border-[var(--color-primary)]/40 shadow-xs hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden">
        {/* Photo Section */}
        <Link href={`/artikel/${article.slug}`} className="md:w-1/2 aspect-[16/10] md:aspect-auto overflow-hidden bg-slate-100 block relative">
          {article.featuredImage ? (
            <img
              src={article.featuredImage}
              alt={article.title}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="h-full w-full flex items-center justify-center bg-[var(--color-primary-light)]">
              <FileText className="h-10 w-10 text-[var(--color-primary)] opacity-40" />
            </div>
          )}
        </Link>

        {/* Content Section */}
        <div className="p-6 md:p-8 md:w-1/2 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-2 text-xs mb-2">
              <span className="font-semibold text-teal-700 tracking-wide uppercase">
                {article.category}
              </span>
              <span className="flex items-center gap-1.5 text-slate-400 font-medium">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                {new Date(article.publishedAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
              </span>
            </div>

            <Link href={`/artikel/${article.slug}`} className="block">
              <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-slate-900 group-hover:text-[var(--color-primary)] transition-colors leading-snug">
                {article.title}
              </h3>
            </Link>

            <p className="mt-3 text-sm sm:text-base text-slate-500 line-clamp-3 leading-relaxed">
              {article.content.slice(0, 180)}...
            </p>
          </div>

          <div className="pt-6">
            <Link
              href={`/artikel/${article.slug}`}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white font-bold text-sm shadow-xs transition-colors cursor-pointer"
            >
              <span>Baca Artikel Lengkap</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="group relative flex flex-col justify-between bg-white rounded-2xl border border-slate-200/90 hover:border-[var(--color-primary)]/40 shadow-xs hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden h-full">
      {/* Clickable Header & Image & Info */}
      <Link href={`/artikel/${article.slug}`} className="block flex-1">
        {/* Article Photo */}
        <div className="relative w-full aspect-[16/10] overflow-hidden bg-slate-100">
          {article.featuredImage ? (
            <img
              src={article.featuredImage}
              alt={article.title}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="h-full w-full flex items-center justify-center bg-[var(--color-primary-light)]">
              <FileText className="h-10 w-10 text-[var(--color-primary)] opacity-40" />
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 pb-2">
          <div className="flex items-center justify-between gap-2 text-xs">
            <span className="font-semibold text-teal-700 tracking-wide uppercase">
              {article.category}
            </span>
            <span className="flex items-center gap-1.5 text-slate-400 font-medium">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              {new Date(article.publishedAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
            </span>
          </div>

          <h3 className="mt-2 text-xl sm:text-2xl font-black text-slate-900 group-hover:text-[var(--color-primary)] transition-colors leading-snug line-clamp-2">
            {article.title}
          </h3>

          <p className="mt-2 text-sm text-slate-500 line-clamp-2 leading-relaxed">
            {article.content.slice(0, 120)}...
          </p>
        </div>
      </Link>

      {/* Clean Single Action Button */}
      <div className="p-5 sm:p-6 pt-3">
        <Link
          href={`/artikel/${article.slug}`}
          className="w-full py-3 px-4 rounded-xl bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer"
        >
          <span>Baca Artikel Medis</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
}
