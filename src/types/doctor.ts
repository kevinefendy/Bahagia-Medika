export interface Doctor {
  id: string;
  slug: string;
  name: string;
  photoUrl: string;
  specializationId: string;
  specializationName: string;
  education: string[];
  experienceYears: number;
  languages?: string[];
  bio: string;
  location: string;
  isActive: boolean;
  schedules: DoctorSchedule[];
  relatedServiceIds: string[];
}

export interface DoctorSchedule {
  id: string;
  day: 'Senin' | 'Selasa' | 'Rabu' | 'Kamis' | 'Jumat' | 'Sabtu' | 'Minggu';
  startTime: string;
  endTime: string;
  location: string;
  slotDurationMinutes: number;
}

export interface Specialization {
  id: string;
  name: string;
  icon: string;
}
