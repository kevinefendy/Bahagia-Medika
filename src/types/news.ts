export type NewsType = 'event' | 'pengumuman' | 'program' | 'kerja-sama' | 'prestasi';

export interface NewsItem {
  id: string;
  slug: string;
  title: string;
  type: NewsType;
  publishedAt: string;
  featuredImage: string;
  content: string;
  isPublished: boolean;
}
