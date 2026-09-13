import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type {
  PatientVitals,
  PatientMedicalRecord,
  PrescriptionItem,
  LabResultItem,
  LiveQueueTicket,
} from '@/types/patientRecord';

interface PatientRecordState {
  vitals: PatientVitals;
  medicalRecord: PatientMedicalRecord;
  prescriptions: PrescriptionItem[];
  labResults: LabResultItem[];
  activeQueue: LiveQueueTicket | null;
  // Actions
  updateVitals: (vitals: Partial<PatientVitals>) => void;
  updateMedicalRecord: (record: Partial<PatientMedicalRecord>) => void;
  toggleMedicationTaken: (prescriptionId: string) => void;
  requestRefill: (prescriptionId: string) => boolean;
  addPrescription: (item: PrescriptionItem) => void;
  dismissQueue: () => void;
}

const INITIAL_VITALS: PatientVitals = {
  bloodPressure: '118/78 mmHg',
  bloodPressureStatus: 'Normal',
  heartRate: 72,
  heartRateStatus: 'Normal',
  bloodSugar: 92,
  bloodSugarStatus: 'Normal',
  bmi: 22.1,
  bmiCategory: 'Ideal',
  weightKg: 64,
  heightCm: 170,
  lastCheckedDate: '2026-09-10',
};

const INITIAL_MEDICAL_RECORD: PatientMedicalRecord = {
  rmNumber: 'BM-2026-88910',
  nik: '3171021405960002',
  bloodType: 'O+',
  allergies: {
    medications: ['Penisilin (Reaksi: Eritema / Ruam Kulit)'],
    foods: ['Seafood / Kerang & Udang'],
    others: ['Debu dingin (Rhinitis alergi ringan)'],
  },
  chronicConditions: ['Riwayat Gastritis / Dispepsia Fungsional'],
  insurance: {
    type: 'BPJS Kesehatan',
    providerName: 'BPJS Kesehatan RI (Mandiri Kelas 1)',
    cardNumber: '0001892837461',
    classType: 'Kelas 1 Faskes Primer Bahagia Medika',
    status: 'Aktif',
  },
  emergencyContact: {
    name: 'Rina Santoso',
    relationship: 'Istri',
    phoneNumber: '0813-9876-5432',
  },
};

const INITIAL_PRESCRIPTIONS: PrescriptionItem[] = [
  {
    id: 'rx-001',
    code: 'RX-2026-09-001',
    medicineName: 'Cefixime Trihydrate 200 mg',
    form: 'Kapsul',
    dosage: '200 mg',
    frequency: '2x sehari (Tiap 12 jam)',
    instruction: 'Diminum setelah makan sampai habis sesuai anjuran',
    durationDays: 5,
    remainingDays: 3,
    prescribedDate: '2026-09-12',
    doctorName: 'Dr. Dewi Anggraini, Sp.JP',
    doctorSpecialization: 'Jantung & Pembuluh Darah',
    pharmacyStatus: 'Siap Diambil',
    pickupLocation: 'Loket Farmasi B (Lantai 1 - Sayap Barat)',
    takenToday: false,
    notes: 'Habiskan antibiotik untuk mencegah resistensi kuman.',
  },
  {
    id: 'rx-002',
    code: 'RX-2026-09-002',
    medicineName: 'Lansoprazole 30 mg',
    form: 'Kapsul',
    dosage: '30 mg',
    frequency: '1x sehari (Pagi)',
    instruction: 'Diminum 30-60 menit sebelum sarapan pagi',
    durationDays: 14,
    remainingDays: 6,
    prescribedDate: '2026-09-05',
    doctorName: 'Dr. Amelia Putri, Sp.An',
    doctorSpecialization: 'Penyakit Dalam / Pediatri',
    pharmacyStatus: 'Selesai',
    pickupLocation: 'Sudah Diambil',
    takenToday: true,
    notes: 'Meredakan asam lambung dan nyeri ulu hati.',
  },
  {
    id: 'rx-003',
    code: 'RX-2026-08-003',
    medicineName: 'Atorvastatin Calcium 20 mg',
    form: 'Tablet',
    dosage: '20 mg',
    frequency: '1x sehari (Malam hari)',
    instruction: 'Diminum pada malam hari sebelum tidur',
    durationDays: 30,
    remainingDays: 18,
    prescribedDate: '2026-08-30',
    doctorName: 'Dr. Dewi Anggraini, Sp.JP',
    doctorSpecialization: 'Jantung & Pembuluh Darah',
    pharmacyStatus: 'Selesai',
    pickupLocation: 'Sudah Diambil',
    takenToday: false,
    notes: 'Menjaga kadar kolesterol LDL tetap optimal.',
  },
];

const INITIAL_LAB_RESULTS: LabResultItem[] = [
  {
    id: 'lab-001',
    testCode: 'LAB-2026-0908-01',
    title: 'Pemeriksaan Hematologi Lengkap & Laju Endap Darah',
    category: 'Hematologi',
    testDate: '2026-09-08',
    doctorName: 'Dr. Dewi Anggraini, Sp.JP',
    doctorSpecialization: 'Kardiologi & Vaskular',
    analystName: 'Apt. Sarah Maulida, S.Tr.Kes',
    status: 'Normal',
    summary: 'Semua komponen seluler darah tepi berada dalam rentang normal dan stabil.',
    parameters: [
      { parameter: 'Hemoglobin (Hb)', value: '14.8', unit: 'g/dL', normalRange: '13.2 - 17.3', status: 'Normal' },
      { parameter: 'Leukosit (WBC)', value: '6.800', unit: '/uL', normalRange: '4.500 - 11.000', status: 'Normal' },
      { parameter: 'Trombosit (PLT)', value: '245.000', unit: '/uL', normalRange: '150.000 - 450.000', status: 'Normal' },
      { parameter: 'Hematokrit (Ht)', value: '44.2', unit: '%', normalRange: '40.0 - 52.0', status: 'Normal' },
      { parameter: 'Eritrosit (RBC)', value: '4.95', unit: '10^6/uL', normalRange: '4.3 - 5.9', status: 'Normal' },
      { parameter: 'Laju Endap Darah (LED)', value: '12', unit: 'mm/jam', normalRange: '0 - 15', status: 'Normal' },
    ],
    conclusion: 'Hasil hematologi rutin dalam batas fisiologis normal. Tidak ada tanda anemia atau infeksi akut.',
    recommendations: 'Pertahankan asupan nutrisi seimbang dan hidrasi cairan minimal 2 liter per hari.',
    pdfDownloadName: 'Hasil_Lab_Hematologi_KevinSantoso_08Sep2026.pdf',
  },
  {
    id: 'lab-002',
    testCode: 'LAB-2026-0908-02',
    title: 'Profil Lipid Darah Lengkap & Glukosa Puasa',
    category: 'Kimia Darah',
    testDate: '2026-09-08',
    doctorName: 'Dr. Dewi Anggraini, Sp.JP',
    doctorSpecialization: 'Kardiologi & Vaskular',
    analystName: 'Apt. Sarah Maulida, S.Tr.Kes',
    status: 'Perlu Perhatian',
    summary: 'Kolesterol Total dan LDL sedikit di atas batas rujukan optimal. Glukosa puasa normal.',
    parameters: [
      { parameter: 'Kolesterol Total', value: '215', unit: 'mg/dL', normalRange: '< 200', status: 'Tinggi' },
      { parameter: 'HDL Kolesterol (Baik)', value: '54', unit: 'mg/dL', normalRange: '> 40', status: 'Normal' },
      { parameter: 'LDL Kolesterol (Jahat)', value: '138', unit: 'mg/dL', normalRange: '< 100', status: 'Tinggi' },
      { parameter: 'Trigliserida', value: '128', unit: 'mg/dL', normalRange: '< 150', status: 'Normal' },
      { parameter: 'Glukosa Darah Puasa (GDP)', value: '92', unit: 'mg/dL', normalRange: '70 - 100', status: 'Normal' },
      { parameter: 'HbA1c', value: '5.4', unit: '%', normalRange: '< 5.7', status: 'Normal' },
    ],
    conclusion: 'Hiperkolesterolemia ringan terisolasi dengan rasio HDL yang protektif. Profil metabolik gula darah sangat baik.',
    recommendations: 'Lanjutkan terapi Atorvastatin 20mg malam hari, kurangi konsumsi makanan tinggi lemak jenuh & gorengan, serta olahraga kardio rutin 30 menit 3x/minggu.',
    pdfDownloadName: 'Hasil_Lab_ProfilLipid_KevinSantoso_08Sep2026.pdf',
  },
  {
    id: 'lab-003',
    testCode: 'RAD-2026-0820-09',
    title: 'Rontgen Thorax PA Digital (Foto Rontgen Dada)',
    category: 'Radiologi',
    testDate: '2026-08-20',
    doctorName: 'Dr. Toni Lesmana, Sp.OT',
    doctorSpecialization: 'Ortopedi & Traumatologi',
    analystName: 'dr. Hendra Kurniawan, Sp.Rad',
    status: 'Normal',
    summary: 'Cor dan pulmo dalam batas normal tanpa tanda kardiomegali atau kalsifikasi aktif.',
    parameters: [
      { parameter: 'Cor (Jantung)', value: 'CTR < 50%', unit: '', normalRange: '< 50% (Normal)', status: 'Normal' },
      { parameter: 'Pulmo (Paru-paru)', value: 'Corakan bronkovaskuler normal', unit: '', normalRange: 'Normal simetris', status: 'Normal' },
      { parameter: 'Sinus Kostofrenikus', value: 'Kedua sudut lancip tajam', unit: '', normalRange: 'Lancip / Tajam', status: 'Normal' },
      { parameter: 'Diafragma', value: 'Kubah licin reguler', unit: '', normalRange: 'Licin melengkung', status: 'Normal' },
      { parameter: 'Tulang & Jaringan Lunak', value: 'Struktur intak utuh', unit: '', normalRange: 'Intak tanpa lesi', status: 'Normal' },
    ],
    conclusion: 'Foto Thorax PA tidak memperlihatkan kelainan kardiopulmonal aktif. Jantung dan paru sehat.',
    recommendations: 'Evaluasi berkala setiap tahun atau jika ada keluhan batuk persisten lebih dari 2 minggu.',
    pdfDownloadName: 'Hasil_Radiologi_ThoraxPA_KevinSantoso_20Agu2026.pdf',
  },
];

const INITIAL_QUEUE: LiveQueueTicket = {
  ticketNumber: 'A-14',
  polyName: 'Poli Spesialis Jantung & Pembuluh Darah',
  roomNumber: 'Ruang 204 (Klinik Eksekutif)',
  floor: 'Lantai 2 - Sayap Medika Timur',
  doctorName: 'Dr. Dewi Anggraini, Sp.JP',
  currentCallingNumber: 'A-11',
  estimatedCallTime: '10:30 WIB',
  patientsAhead: 3,
  status: 'Sedang Berjalan',
  appointmentId: 'APT-2026-9901',
  qrCodeToken: 'BM-CHECKIN-A14-20260913',
};

export const usePatientRecordStore = create<PatientRecordState>()(
  persist(
    (set) => ({
      vitals: INITIAL_VITALS,
      medicalRecord: INITIAL_MEDICAL_RECORD,
      prescriptions: INITIAL_PRESCRIPTIONS,
      labResults: INITIAL_LAB_RESULTS,
      activeQueue: INITIAL_QUEUE,

      updateVitals: (newVitals) =>
        set((state) => ({ vitals: { ...state.vitals, ...newVitals } })),

      updateMedicalRecord: (newRecord) =>
        set((state) => ({ medicalRecord: { ...state.medicalRecord, ...newRecord } })),

      toggleMedicationTaken: (prescriptionId) =>
        set((state) => ({
          prescriptions: state.prescriptions.map((item) =>
            item.id === prescriptionId ? { ...item, takenToday: !item.takenToday } : item
          ),
        })),

      requestRefill: (prescriptionId) => {
        let success = false;
        set((state) => {
          const target = state.prescriptions.find((p) => p.id === prescriptionId);
          if (target) {
            success = true;
            return {
              prescriptions: state.prescriptions.map((item) =>
                item.id === prescriptionId
                  ? { ...item, pharmacyStatus: 'Sedang Diracik', pickupLocation: 'Loket Farmasi B (Lantai 1)' }
                  : item
              ),
            };
          }
          return state;
        });
        return success;
      },

      addPrescription: (item) =>
        set((state) => ({ prescriptions: [item, ...state.prescriptions] })),

      dismissQueue: () => set({ activeQueue: null }),
    }),
    { name: 'bahagia-medika-patient-records' }
  )
);
