import { doctorService } from './doctorService';
import { serviceService } from './serviceService';
import { articleService } from './articleService';
import { newsService } from './newsService';
import type { Doctor } from '@/types/doctor';
import type { Service } from '@/types/service';
import type { Article } from '@/types/article';
import type { NewsItem } from '@/types/news';

export interface SearchResult {
  doctors: Doctor[];
  services: Service[];
  articles: Article[];
  news: NewsItem[];
}

export const searchService = {
  async search(query: string): Promise<SearchResult> {
    const q = query.toLowerCase();
    const [doctors, services, articles, news] = await Promise.all([
      doctorService.getAll({ search: query }),
      serviceService.getAll(),
      articleService.getAll(),
      newsService.getAll(),
    ]);

    return {
      doctors: doctors.filter(
        (d) =>
          d.name.toLowerCase().includes(q) ||
          d.specializationName.toLowerCase().includes(q)
      ),
      services: services.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.shortDescription.toLowerCase().includes(q)
      ),
      articles: articles.filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          a.category.toLowerCase().includes(q)
      ),
      news: news.filter((n) => n.title.toLowerCase().includes(q)),
    };
  },
};
