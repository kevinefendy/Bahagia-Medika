import servicesData from '@/data/services.json';
import type { Service } from '@/types/service';

const simulateDelay = <T,>(data: T, ms = 500): Promise<T> =>
  new Promise((resolve) => setTimeout(() => resolve(data), ms));

export const serviceService = {
  async getAll(): Promise<Service[]> {
    return simulateDelay(servicesData as Service[]);
  },

  async getBySlug(slug: string): Promise<Service | undefined> {
    return simulateDelay((servicesData as Service[]).find((s) => s.slug === slug));
  },

  async getById(id: string): Promise<Service | undefined> {
    return simulateDelay((servicesData as Service[]).find((s) => s.id === id));
  },

  async getFeatured(limit: number = 6): Promise<Service[]> {
    return simulateDelay((servicesData as Service[]).slice(0, limit), 300);
  },

  async getByCategory(category: string): Promise<Service[]> {
    return simulateDelay(
      (servicesData as Service[]).filter((s) => s.category === category)
    );
  },
};
