export interface PatientVitals {
  bloodPressure: string;
  bloodPressureStatus: 'Normal' | 'Prahipertensi' | 'Hipertensi';
  heartRate: number;
  heartRateStatus: 'Normal' | 'Tinggi' | 'Rendah';
  bloodSugar: number;
  bloodSugarStatus: 'Normal' | 'Perlu Perhatian';
  bmi: number;
  bmiCategory: 'Ideal' | 'Kurang' | 'Berlebih';
  weightKg: number;
  heightCm: number;
  lastCheckedDate: string;
}

export interface PatientMedicalRecord {
  rmNumber: string; // e.g. "BM-2026-88910"
  nik: string;
  bloodType: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  allergies: {
    medications: string[];
    foods: string[];
    others: string[];
  };
  chronicConditions: string[];
  insurance: {
    type: 'BPJS Kesehatan' | 'Asuransi Swasta' | 'Mandiri / Umum';
    providerName: string;
    cardNumber: string;
    classType: string;
    status: 'Aktif' | 'Tidak Aktif';
  };
  emergencyContact: {
    name: string;
    relationship: string;
    phoneNumber: string;
  };
}

export interface PrescriptionItem {
  id: string;
  code: string;
  medicineName: string;
  form: 'Tablet' | 'Kapsul' | 'Sirup' | 'Salep' | 'Injeksi';
  dosage: string; // e.g. "500 mg"
  frequency: string; // e.g. "3x sehari (Tiap 8 jam)"
  instruction: string; // e.g. "Sesudah makan, habiskan sesuai anjuran dokter"
  durationDays: number;
  remainingDays: number;
  prescribedDate: string;
  doctorName: string;
  doctorSpecialization: string;
  pharmacyStatus: 'Resep Diterima' | 'Sedang Diracik' | 'Siap Diambil' | 'Selesai';
  pickupLocation: string; // e.g. "Loket Farmasi B (Lantai 1)"
  takenToday: boolean;
  notes?: string;
}

export interface LabResultParameter {
  parameter: string;
  value: string;
  unit: string;
  normalRange: string;
  status: 'Normal' | 'Tinggi' | 'Rendah';
}

export interface LabResultItem {
  id: string;
  testCode: string;
  title: string;
  category: 'Hematologi' | 'Kimia Darah' | 'Radiologi' | 'Urinalisis' | 'Jantung';
  testDate: string;
  doctorName: string;
  doctorSpecialization: string;
  analystName: string;
  status: 'Normal' | 'Perlu Perhatian';
  summary: string;
  parameters: LabResultParameter[];
  conclusion: string;
  recommendations?: string;
  pdfDownloadName: string;
}

export interface LiveQueueTicket {
  ticketNumber: string; // e.g. "A-14"
  polyName: string;
  roomNumber: string;
  floor: string;
  doctorName: string;
  currentCallingNumber: string;
  estimatedCallTime: string;
  patientsAhead: number;
  status: 'Menunggu' | 'Sedang Berjalan' | 'Selesai';
  appointmentId: string;
  qrCodeToken: string;
}
