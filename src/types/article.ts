export interface Article {
  id: string;
  slug: string;
  title: string;
  category: 'Kesehatan' | 'Tips' | 'Nutrisi' | 'Anak' | 'Jantung' | 'Mental Health' | 'Gaya Hidup';
  author: string;
  publishedAt: string;
  featuredImage: string;
  content: string;
  relatedArticleIds: string[];
  isPublished: boolean;
}
