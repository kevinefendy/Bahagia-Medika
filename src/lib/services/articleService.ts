import articlesData from '@/data/articles.json';
import type { Article } from '@/types/article';

const simulateDelay = <T,>(data: T, ms = 500): Promise<T> =>
  new Promise((resolve) => setTimeout(() => resolve(data), ms));

export const articleService = {
  async getAll(category?: string): Promise<Article[]> {
    type RawArticle = Partial<Article> & { imageUrl?: string; slug: string; category: string; isPublished?: boolean };
    let result = (articlesData as RawArticle[]).map((a) => ({
      ...a,
      featuredImage: a.imageUrl || a.featuredImage || '',
      relatedArticleIds: a.relatedArticleIds || [],
      isPublished: a.isPublished !== undefined ? a.isPublished : true,
    })) as Article[];
    if (category) {
      result = result.filter((a) => a.category === category);
    }
    return simulateDelay(result.filter((a) => a.isPublished));
  },

  async getBySlug(slug: string): Promise<Article | undefined> {
    type RawArticle = Partial<Article> & { imageUrl?: string; slug: string; isPublished?: boolean };
    const all = (articlesData as RawArticle[]).map((a) => ({
      ...a,
      featuredImage: a.imageUrl || a.featuredImage || '',
      relatedArticleIds: a.relatedArticleIds || [],
      isPublished: a.isPublished !== undefined ? a.isPublished : true,
    })) as Article[];
    return simulateDelay(all.find((a) => a.slug === slug));
  },

  async getFeatured(limit: number = 3): Promise<Article[]> {
    type RawArticle = Partial<Article> & { imageUrl?: string; isPublished?: boolean };
    const all = (articlesData as RawArticle[]).map((a) => ({
      ...a,
      featuredImage: a.imageUrl || a.featuredImage || '',
      relatedArticleIds: a.relatedArticleIds || [],
      isPublished: a.isPublished !== undefined ? a.isPublished : true,
    })) as Article[];
    return simulateDelay(
      all.filter((a) => a.isPublished).slice(0, limit),
      300
    );
  },
};
