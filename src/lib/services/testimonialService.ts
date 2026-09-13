import testimonialsData from '@/data/testimonials.json';
import type { Testimonial } from '@/types/testimonial';

const simulateDelay = <T,>(data: T, ms = 300): Promise<T> =>
  new Promise((resolve) => setTimeout(() => resolve(data), ms));

export const testimonialService = {
  async getAll(): Promise<Testimonial[]> {
    return simulateDelay(testimonialsData as Testimonial[]);
  },
};
