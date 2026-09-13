import facilitiesData from '@/data/facilities.json';
import type { Facility } from '@/types/facility';

const simulateDelay = <T,>(data: T, ms = 500): Promise<T> =>
  new Promise((resolve) => setTimeout(() => resolve(data), ms));

export const facilityService = {
  async getAll(): Promise<Facility[]> {
    return simulateDelay(facilitiesData as Facility[]);
  },

  async getById(id: string): Promise<Facility | undefined> {
    return simulateDelay((facilitiesData as Facility[]).find((f) => f.id === id));
  },
};
