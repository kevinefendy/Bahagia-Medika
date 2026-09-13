export interface HospitalInfo {
  name: string;
  address: string;
  phone: string;
  emergencyPhone: string;
  whatsapp?: string;
  email: string;
  operationalHours: string;
  mapEmbedUrl?: string;
  stats: {
    yearsOfService: number;
    doctorCount: number;
    serviceCount: number;
    patientCount: number;
  };
}
