import specializationsData from '@/data/specializations.json';
import type { Specialization } from '@/types/doctor';

const simulateDelay = <T,>(data: T, ms = 300): Promise<T> =>
  new Promise((resolve) => setTimeout(() => resolve(data), ms));

export const specializationService = {
  async getAll(): Promise<Specialization[]> {
    return simulateDelay(specializationsData as Specialization[]);
  },

  async getById(id: string): Promise<Specialization | undefined> {
    return simulateDelay((specializationsData as Specialization[]).find((s) => s.id === id));
  },
};
