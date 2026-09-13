import hospitalData from '@/data/hospitalInfo.json';
import type { HospitalInfo } from '@/types/hospital';

const simulateDelay = <T,>(data: T, ms = 300): Promise<T> =>
  new Promise((resolve) => setTimeout(() => resolve(data), ms));

export const hospitalService = {
  async getInfo(): Promise<HospitalInfo> {
    return simulateDelay(hospitalData as HospitalInfo);
  },
};
