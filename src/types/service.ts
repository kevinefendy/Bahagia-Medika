export interface Service {
  id: string;
  slug: string;
  name: string;
  icon: string;
  imageUrl?: string;
  category: 'Rawat Jalan' | 'Rawat Inap' | 'Penunjang Medis';
  shortDescription: string;
  description: string;
  benefits: string[];
  relatedDoctorIds: string[];
  facilityIds: string[];
  faq: { question: string; answer: string }[];
}
