import newsData from '@/data/news.json';
import type { NewsItem } from '@/types/news';

const simulateDelay = <T,>(data: T, ms = 500): Promise<T> =>
  new Promise((resolve) => setTimeout(() => resolve(data), ms));

export const newsService = {
  async getAll(type?: string): Promise<NewsItem[]> {
    type RawNews = Partial<NewsItem> & { imageUrl?: string; date?: string; slug: string; type: string; isPublished?: boolean };
    let result = (newsData as RawNews[]).map((n) => ({
      ...n,
      publishedAt: n.publishedAt || n.date || new Date().toISOString(),
      featuredImage: n.imageUrl || n.featuredImage || '',
      isPublished: n.isPublished !== undefined ? n.isPublished : true,
    })) as NewsItem[];
    if (type) {
      result = result.filter((n) => n.type === type);
    }
    return simulateDelay(result.filter((n) => n.isPublished));
  },

  async getBySlug(slug: string): Promise<NewsItem | undefined> {
    type RawNews = Partial<NewsItem> & { imageUrl?: string; date?: string; slug: string; isPublished?: boolean };
    const all = (newsData as RawNews[]).map((n) => ({
      ...n,
      publishedAt: n.publishedAt || n.date || new Date().toISOString(),
      featuredImage: n.imageUrl || n.featuredImage || '',
      isPublished: n.isPublished !== undefined ? n.isPublished : true,
    })) as NewsItem[];
    return simulateDelay(all.find((n) => n.slug === slug));
  },

  async getFeatured(limit: number = 3): Promise<NewsItem[]> {
    type RawNews = Partial<NewsItem> & { imageUrl?: string; date?: string; isPublished?: boolean };
    const all = (newsData as RawNews[]).map((n) => ({
      ...n,
      publishedAt: n.publishedAt || n.date || new Date().toISOString(),
      featuredImage: n.imageUrl || n.featuredImage || '',
      isPublished: n.isPublished !== undefined ? n.isPublished : true,
    })) as NewsItem[];
    return simulateDelay(
      all.filter((n) => n.isPublished).slice(0, limit),
      300
    );
  },
};
