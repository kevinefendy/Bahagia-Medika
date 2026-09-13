export interface Testimonial {
  id: string;
  patientName: string;
  message: string;
  rating: number;
  avatarUrl?: string;
  service?: string;
  date?: string;
  doctorName?: string;
}
