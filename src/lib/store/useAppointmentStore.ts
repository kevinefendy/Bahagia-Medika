import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Appointment, AppointmentStatus } from '@/types/appointment';
import { generateId } from '@/lib/utils/format';

interface AppointmentState {
  appointments: Appointment[];
  createAppointment: (data: Omit<Appointment, 'id' | 'createdAt' | 'updatedAt' | 'status'>) => Appointment;
  updateStatus: (id: string, status: AppointmentStatus) => void;
  reschedule: (id: string, date: string, time: string) => void;
  cancel: (id: string) => void;
  getByPatientId: (patientId: string) => Appointment[];
  getById: (id: string) => Appointment | undefined;
}

const INITIAL_APPOINTMENTS: Appointment[] = [
  {
    id: 'APT-2026-9901',
    patientId: 'usr-patient-001',
    doctorId: 'doc-003',
    doctorName: 'Dr. Dewi Anggraini, Sp.JP',
    doctorSpecialization: 'Jantung & Vaskular',
    serviceId: 'srv-002',
    serviceName: 'Kardiologi & Vaskular',
    date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    time: '10:00',
    location: 'Gedung Utama Lt.3 (Poli Jantung Ruang 204)',
    status: 'Confirmed',
    patient: {
      fullName: 'Kevin Santoso',
      email: 'user@example.com',
      phoneNumber: '08123456789',
      birthDate: '1996-05-14',
      address: 'Jl. Contoh No. 10, Jakarta',
      complaint: 'Pemeriksaan rutin evaluasi tekanan darah dan hasil profil lipid',
    },
    createdAt: new Date(Date.now() - 172800000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'APT-2026-8742',
    patientId: 'usr-patient-001',
    doctorId: 'doc-001',
    doctorName: 'Dr. Amelia Putri, Sp.An',
    doctorSpecialization: 'Pediatri & Umum',
    serviceId: 'srv-001',
    serviceName: 'Kesehatan Anak & Keluarga',
    date: '2026-08-25',
    time: '11:00',
    location: 'Gedung Utama Lt.2 (Poli Anak Ruang 102)',
    status: 'Completed',
    patient: {
      fullName: 'Kevin Santoso',
      email: 'user@example.com',
      phoneNumber: '08123456789',
      birthDate: '1996-05-14',
      address: 'Jl. Contoh No. 10, Jakarta',
      complaint: 'Konsultasi imunisasi influenza tahunan dan vitamin',
    },
    createdAt: '2026-08-20T08:30:00.000Z',
    updatedAt: '2026-08-25T12:00:00.000Z',
  },
  {
    id: 'APT-2026-7619',
    patientId: 'usr-patient-001',
    doctorId: 'doc-010',
    doctorName: 'Dr. Toni Lesmana, Sp.OT',
    doctorSpecialization: 'Ortopedi & Traumatologi',
    serviceId: 'srv-005',
    serviceName: 'Ortopedi & Traumatologi',
    date: '2026-07-15',
    time: '14:30',
    location: 'Gedung Bedah Terpadu Lt.2',
    status: 'Cancelled',
    patient: {
      fullName: 'Kevin Santoso',
      email: 'user@example.com',
      phoneNumber: '08123456789',
      birthDate: '1996-05-14',
      address: 'Jl. Contoh No. 10, Jakarta',
      complaint: 'Nyeri pergelangan kaki pasca olahraga ringan',
    },
    createdAt: '2026-07-10T10:00:00.000Z',
    updatedAt: '2026-07-14T15:00:00.000Z',
  },
];

export const useAppointmentStore = create<AppointmentState>()(
  persist(
    (set, get) => ({
      appointments: INITIAL_APPOINTMENTS,
      createAppointment: (data) => {
        const newAppointment: Appointment = {
          ...data,
          id: generateId('APT'),
          status: 'Confirmed',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        set((state) => ({ appointments: [...state.appointments, newAppointment] }));
        return newAppointment;
      },
      updateStatus: (id, status) =>
        set((state) => ({
          appointments: state.appointments.map((a) =>
            a.id === id ? { ...a, status, updatedAt: new Date().toISOString() } : a
          ),
        })),
      reschedule: (id, date, time) =>
        set((state) => ({
          appointments: state.appointments.map((a) =>
            a.id === id ? { ...a, date, time, updatedAt: new Date().toISOString() } : a
          ),
        })),
      cancel: (id) => get().updateStatus(id, 'Cancelled'),
      getByPatientId: (patientId) => get().appointments.filter((a) => a.patientId === patientId),
      getById: (id) => get().appointments.find((a) => a.id === id),
    }),
    { name: 'bahagia-medika-appointments' }
  )
);
