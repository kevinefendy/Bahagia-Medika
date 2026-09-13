import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Doctor } from '@/types/doctor';
import type { Service } from '@/types/service';
import type { PatientInfo } from '@/types/appointment';

interface BookingFlowState {
  currentStep: number;
  selectedService: Service | null;
  selectedDoctor: Doctor | null;
  selectedDate: string | null;
  selectedTime: string | null;
  patientInfo: PatientInfo | null;
  setStep: (step: number) => void;
  setService: (service: Service) => void;
  setDoctor: (doctor: Doctor) => void;
  setDate: (date: string) => void;
  setTime: (time: string) => void;
  setPatientInfo: (info: PatientInfo) => void;
  reset: () => void;
  prefillDoctor: (doctor: Doctor, service?: Service) => void;
}

const initialState = {
  currentStep: 1,
  selectedService: null,
  selectedDoctor: null,
  selectedDate: null,
  selectedTime: null,
  patientInfo: null,
};

export const useBookingFlowStore = create<BookingFlowState>()(
  persist(
    (set) => ({
      ...initialState,
      setStep: (step) => set({ currentStep: step }),
      setService: (service) => set({ selectedService: service }),
      setDoctor: (doctor) => set({ selectedDoctor: doctor }),
      setDate: (date) => set({ selectedDate: date }),
      setTime: (time) => set({ selectedTime: time }),
      setPatientInfo: (info) => set({ patientInfo: info }),
      reset: () => set(initialState),
      prefillDoctor: (doctor, service) =>
        set({
          selectedDoctor: doctor,
          selectedService: service || null,
          currentStep: service ? 3 : 2,
        }),
    }),
    { name: 'bahagia-medika-booking' }
  )
);
