export type AppointmentStatus = 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled';

export interface Appointment {
  id: string;
  patientId?: string;
  doctorId: string;
  doctorName: string;
  doctorSpecialization: string;
  serviceId: string;
  serviceName: string;
  date: string;
  time: string;
  location: string;
  status: AppointmentStatus;
  patient: PatientInfo;
  createdAt: string;
  updatedAt: string;
}

export interface PatientInfo {
  fullName: string;
  email: string;
  phoneNumber: string;
  birthDate?: string;
  address?: string;
  complaint?: string;
}
