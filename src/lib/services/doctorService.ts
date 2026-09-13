import doctorsData from '@/data/doctors.json';
import type { Doctor } from '@/types/doctor';

const simulateDelay = <T,>(data: T, ms = 500): Promise<T> =>
  new Promise((resolve) => setTimeout(() => resolve(data), ms));

export interface DoctorFilters {
  specializationId?: string;
  day?: string;
  search?: string;
  availableToday?: boolean;
}

export const doctorService = {
  async getAll(filters?: DoctorFilters): Promise<Doctor[]> {
    let result = doctorsData as Doctor[];
    if (filters?.specializationId) {
      result = result.filter((d) => d.specializationId === filters.specializationId);
    }
    if (filters?.day) {
      result = result.filter((d) => d.schedules.some((s) => s.day === filters.day));
    }
    if (filters?.search) {
      const q = filters.search.toLowerCase();
      result = result.filter(
        (d) =>
          d.name.toLowerCase().includes(q) ||
          d.specializationName.toLowerCase().includes(q)
      );
    }
    if (filters?.availableToday) {
      const today = new Date().toLocaleDateString('id-ID', { weekday: 'long' });
      result = result.filter((d) => d.schedules.some((s) => s.day === today));
    }
    return simulateDelay(result);
  },

  async getBySlug(slug: string): Promise<Doctor | undefined> {
    return simulateDelay((doctorsData as Doctor[]).find((d) => d.slug === slug));
  },

  async getById(id: string): Promise<Doctor | undefined> {
    return simulateDelay((doctorsData as Doctor[]).find((d) => d.id === id));
  },

  async getFeatured(limit: number = 4): Promise<Doctor[]> {
    const doctors = (doctorsData as Doctor[]).filter((d) => d.isActive).slice(0, limit);
    return simulateDelay(doctors, 300);
  },
};
