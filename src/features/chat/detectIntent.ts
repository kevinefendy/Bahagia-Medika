import { doctorService } from '@/lib/services/doctorService';
import { serviceService } from '@/lib/services/serviceService';
import { hospitalService } from '@/lib/services/hospitalService';
import type { Doctor } from '@/types/doctor';
import type { Service } from '@/types/service';

export type IntentType =
  | 'emergency'
  | 'symptom-triage'
  | 'search-doctor'
  | 'search-service'
  | 'check-schedule'
  | 'book-appointment'
  | 'cost-and-insurance'
  | 'bed-availability'
  | 'lab-and-mcu'
  | 'contact-cs'
  | 'hospital-info'
  | 'menu'
  | 'fallback';

export interface DetectedIntent {
  type: IntentType;
  symptomCategory?:
    | 'emergency'
    | 'cardio'
    | 'pediatric'
    | 'internal'
    | 'obgyn'
    | 'surgery_ortho'
    | 'skin'
    | 'eye'
    | 'ent'
    | 'dental'
    | 'neuro'
    | 'general';
  params?: Record<string, string>;
}

export interface BotResponse {
  text: string;
  doctors?: Doctor[];
  services?: Service[];
  quickReplies?: string[];
  isEmergency?: boolean;
  triageLevel?: 'CITO' | 'URGENT' | 'ROUTINE' | 'INFO';
  triageTitle?: string;
}

// 1. Emergency Keywords
const EMERGENCY_KEYWORDS = [
  'sesak napas berat',
  'sesak parah',
  'nyeri dada menjalar',
  'serangan jantung',
  'tidak sadar',
  'pingsan',
  'hilang kesadaran',
  'kejang',
  'muntah darah',
  'batuk darah',
  'stroke',
  'bicara pelo',
  'wajah perot',
  'lumpuh separuh',
  'perdarahan hebat',
  'perdarahan masif',
  'kecelakaan berat',
  'kritis',
  'darurat',
  'keracunan',
  'bibir biru',
  'tersedak',
];

// 2. Specialty & Clinical Symptom Keyword Groups
const SYMPTOM_PATTERNS = [
  {
    category: 'cardio' as const,
    specialty: 'Jantung',
    keywords: [
      'jantung', 'nyeri dada', 'dada kiri', 'dada sesak', 'berdebar',
      'palpitasi', 'aritmia', 'kateterisasi', 'pasang ring', 'ekg',
      'tekanan darah tinggi darurat',
    ],
  },
  {
    category: 'pediatric' as const,
    specialty: 'Anak',
    keywords: [
      'anak', 'bayi', 'balita', 'pediatri', 'tumbuh kembang', 'anak demam',
      'anak panas', 'bayi panas', 'batuk pilek anak', 'anak muntah',
      'kejang demam', 'imunisasi', 'vaksin anak', 'campak', 'stunting',
    ],
  },
  {
    category: 'obgyn' as const,
    specialty: 'Kandungan',
    keywords: [
      'hamil', 'kehamilan', 'kandungan', 'usg', 'usg 4d', 'obgyn', 'spog',
      'melahirkan', 'persalinan', 'sesar', 'eracs', 'haid', 'menstruasi',
      'keputihan', 'promil', 'program hamil', 'flek darah', 'kontrasepsi', 'kb',
    ],
  },
  {
    category: 'internal' as const,
    specialty: 'Penyakit Dalam',
    keywords: [
      'demam', 'panas', 'menggigil', 'dbd', 'demam berdarah', 'tifoid',
      'tipes', 'lambung', 'gerd', 'maag', 'mual', 'muntah', 'perut perih',
      'perut sakit', 'diare', 'mencret', 'asam lambung', 'diabetes',
      'gula darah', 'asam urat', 'kolesterol', 'tensi', 'hipertensi',
      'ginjal', 'hati', 'hepatitis',
    ],
  },
  {
    category: 'surgery_ortho' as const,
    specialty: 'Bedah',
    keywords: [
      'usus buntu', 'apendisitis', 'operasi', 'bedah', 'laparoskopi',
      'patah tulang', 'fraktur', 'tulang', 'sendi', 'keseleo', 'terkilir',
      'saraf kejepit', 'nyeri pinggang', 'lutut', 'ligamen', 'hernia',
      'ambeien', 'wasir', 'benjolan',
    ],
  },
  {
    category: 'neuro' as const,
    specialty: 'Saraf',
    keywords: [
      'pusing', 'sakit kepala', 'vertigo', 'migrain', 'kesemutan',
      'kebas', 'saraf', 'stroke ringan', 'tremor', 'susah tidur parah',
    ],
  },
  {
    category: 'skin' as const,
    specialty: 'Kulit & Kelamin',
    keywords: [
      'gatal', 'kulit', 'alergi kulit', 'ruam', 'bentol', 'biduran',
      'jerawat', 'eksim', 'dermatitis', 'jamur kulit', 'kudis',
    ],
  },
  {
    category: 'eye' as const,
    specialty: 'Mata',
    keywords: [
      'mata', 'mata merah', 'katarak', 'mata minus', 'rabun', 'buram',
      'glaukoma', 'belekan', 'lasik', 'mata kering',
    ],
  },
  {
    category: 'ent' as const,
    specialty: 'THT',
    keywords: [
      'telinga', 'hidung', 'tenggorokan', 'tht', 'amandel', 'sinusitis',
      'radang tenggorokan', 'telinga berdenging', 'hidung tersumbat', 'polip',
    ],
  },
  {
    category: 'dental' as const,
    specialty: 'Gigi',
    keywords: [
      'gigi', 'sakit gigi', 'gigi berlubang', 'gusi bengkak', 'cabut gigi',
      'gigi bungsu', 'scaling', 'tambal gigi', 'behel',
    ],
  },
];

const COST_KEYWORDS = [
  'biaya', 'tarif', 'harga', 'perkiraan biaya', 'estimasi', 'paket melahirkan',
  'biaya sesar', 'biaya operasi', 'bpjs', 'asuransi', 'cashless', 'klaim',
  'cicilan', 'bayar mandiri', 'gratis bpjs',
];

const BED_KEYWORDS = [
  'kamar', 'kamar rawat', 'tempat tidur', 'ranjang', 'bed', 'siranap',
  'ketersediaan kamar', 'icu', 'nicu', 'picu', 'vvip', 'vip', 'kelas 1',
  'kelas 2', 'kelas 3', 'ruang isolasi',
];

const LAB_KEYWORDS = [
  'cek darah', 'tes lab', 'laboratorium', 'mcu', 'medical check up',
  'rontgen', 'radiologi', 'ct scan', 'ct-scan', 'skrining', 'urine',
];

const CS_KEYWORDS = [
  'customer service', 'cs', 'hubungi cs', 'bantuan cs', 'telepon rs',
  'kontak rs', 'hubungi kami', 'live chat', 'kontak customer', 'chat cs',
  'bicara petugas', 'operator', 'call center', 'whatsapp cs',
];

const SCHEDULE_KEYWORDS = [
  'jadwal', 'jam praktik', 'jam buka', 'cek jadwal', 'jadwal dokter',
  'operasional poli', 'sesi praktik',
];

const BOOK_KEYWORDS = [
  'buat janji', 'booking', 'reservasi', 'daftar periksa', 'daftar berobat',
  'konsultasi', 'daftar janji', 'antrean dokter',
];

const INFO_KEYWORDS = [
  'alamat', 'lokasi', 'telepon', 'nomor telepon', 'jam kunjungan',
  'info rumah sakit', 'profil rs', 'akreditasi', 'arah maps', 'fasilitas',
];

const MENU_KEYWORDS = [
  'menu', 'kembali ke menu', 'menu utama', 'halo', 'hai', 'pilihan',
  'bantuan', 'start', 'mulai',
];

export function detectIntent(message: string): DetectedIntent {
  const lower = message.toLowerCase().trim();

  // 1. Emergency
  if (EMERGENCY_KEYWORDS.some((k) => lower.includes(k))) {
    return { type: 'emergency', symptomCategory: 'emergency' };
  }

  // 2. Specific Symptoms & Clinical Triage
  for (const group of SYMPTOM_PATTERNS) {
    if (group.keywords.some((k) => lower.includes(k))) {
      return {
        type: 'symptom-triage',
        symptomCategory: group.category,
        params: {
          specialization: group.specialty,
          query: lower,
        },
      };
    }
  }

  // 3. Cost, Insurance & BPJS
  if (COST_KEYWORDS.some((k) => lower.includes(k))) {
    return { type: 'cost-and-insurance' };
  }

  // 4. Bed & Room Availability
  if (BED_KEYWORDS.some((k) => lower.includes(k))) {
    return { type: 'bed-availability' };
  }

  // 5. Lab & MCU
  if (LAB_KEYWORDS.some((k) => lower.includes(k))) {
    return { type: 'lab-and-mcu' };
  }

  // 6. Customer Care & Kontak
  if (CS_KEYWORDS.some((k) => lower.includes(k))) {
    return { type: 'contact-cs' };
  }

  // 7. Schedule
  if (SCHEDULE_KEYWORDS.some((k) => lower.includes(k))) {
    return { type: 'check-schedule' };
  }

  // 8. Book Appointment
  if (BOOK_KEYWORDS.some((k) => lower.includes(k))) {
    return { type: 'book-appointment' };
  }

  // 9. Hospital Profile & General Info
  if (INFO_KEYWORDS.some((k) => lower.includes(k))) {
    return { type: 'hospital-info' };
  }

  // 10. Menu
  if (MENU_KEYWORDS.some((k) => lower === k || lower.includes('kembali ke menu') || lower.includes('menu utama'))) {
    return { type: 'menu' };
  }

  return { type: 'fallback' };
}

export async function buildResponse(intent: DetectedIntent): Promise<BotResponse> {
  const allDoctors = await doctorService.getAll();
  const allServices = await serviceService.getAll();

  switch (intent.type) {
    case 'emergency': {
      return {
        triageLevel: 'CITO',
        triageTitle: 'GAWAT DARURAT (CITO) — SEGERA KE IGD',
        text: `PERINGATAN KEDARURATAN (CITO):

Kondisi klinis ini berisiko mengancam keselamatan jiwa. Segera ambil tindakan:
1. Langsung menuju IGD RS Bahagia Medika (Lobi Barat, Siaga 24 Jam).
2. Atau hubungi armada ambulans darurat via tombol di bawah.
3. Pertahankan posisi nyaman; jangan berikan makan/minum bila sesak atau penurunan kesadaran.

Hotline IGD Siaga: (021) 1234-9999 / (021) 7890-9999`,
        isEmergency: true,
        quickReplies: ['Hubungi IGD 24 Jam', 'Alur Armada Ambulans', 'Buka Direktori Dokter', 'Kembali ke Menu'],
      };
    }

    case 'symptom-triage': {
      const spec = intent.params?.specialization || '';
      const cat = intent.symptomCategory;

      let filteredDoctors = allDoctors.filter((d) =>
        d.specializationName.toLowerCase().includes(spec.toLowerCase())
      );
      if (filteredDoctors.length === 0) {
        filteredDoctors = allDoctors.slice(0, 3);
      }

      if (cat === 'cardio') {
        return {
          triageLevel: 'URGENT',
          triageTitle: 'KLINIK SPESIALIS JANTUNG & PEMBULUH DARAH (SP.JP)',
          text: `Analisis Triase Medika Care:

• Indikasi: Keluhan pada area dada atau irama jantung memerlukan evaluasi EKG dan enzim jantung.
• Pertolongan Mandiri: Istirahat posisi setengah duduk, hindari aktivitas fisik, kafein, dan rokok.
• Tanda Bahaya: Nyeri dada menjalar ke leher/lengan kiri disertai keringat dingin — segera ke IGD 24 Jam.

Dokter Spesialis Jantung:`,
          doctors: filteredDoctors.slice(0, 2),
          quickReplies: ['Buat Janji Dokter Jantung', 'Hubungi IGD 24 Jam', 'Estimasi Biaya Kateterisasi', 'Kembali ke Menu'],
        };
      }

      if (cat === 'pediatric') {
        return {
          triageLevel: 'URGENT',
          triageTitle: 'KLINIK KESEHATAN ANAK & PEDIATRI (SP.A)',
          text: `Analisis Triase Medika Care (Pediatri):

• Indikasi: Gejala demam, batuk, atau muntah pada anak memerlukan pemantauan hidrasi ketat.
• Perawatan di Rumah: Ukur suhu berkala (normal 36.5°C - 37.5°C), kompres hangat lipatan tubuh, cukupi cairan oralit/ASI.
• Tanda Bahaya: Anak lemas tidak responsif, muntah terus-menerus, atau kejang — segera bawa ke IGD.

Dokter Spesialis Anak:`,
          doctors: filteredDoctors.slice(0, 2),
          quickReplies: ['Buat Janji Dokter Anak', 'Jadwal Imunisasi & Vaksin', 'Hubungi IGD 24 Jam', 'Kembali ke Menu'],
        };
      }

      if (cat === 'obgyn') {
        return {
          triageLevel: 'ROUTINE',
          triageTitle: 'KLINIK KEBIDANAN & KANDUNGAN (SP.OG)',
          text: `Analisis Triase Medika Care (Maternal Care):

• Indikasi: Konsultasi kesehatan reproduksi, perencanaan kehamilan (promil), atau kontrol rutin kehamilan (USG 4D & metode ERACS).
• Anjuran Klinis: Catat hari pertama haid terakhir (HPHT), konsumsi asam folat dan zat besi teratur.

Dokter Spesialis Kandungan:`,
          doctors: filteredDoctors.slice(0, 2),
          quickReplies: ['Buat Janji Dokter Kandungan', 'Paket Persalinan ERACS', 'Cek Jadwal Praktik', 'Kembali ke Menu'],
        };
      }

      if (cat === 'internal') {
        return {
          triageLevel: 'ROUTINE',
          triageTitle: 'KLINIK PENYAKIT DALAM (SP.PD)',
          text: `Analisis Triase Medika Care:

• Indikasi: Keluhan demam, maag/GERD, diare, hipertensi, atau gula darah.
• Penanganan Awal: Makan porsi kecil sering (hindari pedas/asam), cukupi hidrasi 2 liter/hari.
• Tanda Bahaya: Demam >3 hari atau muncul bintik merah memerlukan tes darah skrining DBD/Tifoid di lab.

Dokter Spesialis Penyakit Dalam:`,
          doctors: filteredDoctors.slice(0, 2),
          quickReplies: ['Buat Janji Penyakit Dalam', 'Cek Lab & Darah Lengkap', 'Estimasi Biaya Rawat Inap', 'Kembali ke Menu'],
        };
      }

      if (cat === 'surgery_ortho') {
        return {
          triageLevel: 'ROUTINE',
          triageTitle: 'KLINIK SPESIALIS BEDAH & ORTOPEDI',
          text: `Analisis Triase Medika Care:

• Indikasi: Cedera persendian/tulang, benjolan/hernia, atau nyeri perut kanan bawah.
• Anjuran: Pada cedera akut terapkan R.I.C.E (Istirahat, kompres dingin, balut tekan, tinggikan). Jangan dipijat sebelum evaluasi rontgen.

Dokter Spesialis Bedah & Ortopedi:`,
          doctors: filteredDoctors.slice(0, 2),
          quickReplies: ['Buat Janji Dokter Bedah', 'Fasilitas Kamar Operasi', 'Hubungi IGD 24 Jam', 'Kembali ke Menu'],
        };
      }

      // Other specialties (Skin, Eye, Dental, ENT, Neuro)
      return {
        triageLevel: 'ROUTINE',
        triageTitle: `POLIKLINIK SPESIALIS ${spec.toUpperCase()}`,
        text: `Rekomendasi Triase Medika Care:

Berdasarkan keluhan Anda, disarankan berkonsultasi dengan Dokter Spesialis ${spec} RS Bahagia Medika untuk pemeriksaan langsung dan diagnosis definitif.

Dokter Spesialis Terkait:`,
        doctors: filteredDoctors.slice(0, 2),
        quickReplies: [
          `Buat Janji Spesialis ${spec}`,
          'Lihat Jadwal Praktik',
          'Tanya Biaya Tindakan',
          'Kembali ke Menu',
        ],
      };
    }

    case 'cost-and-insurance': {
      return {
        triageLevel: 'INFO',
        triageTitle: 'TARIF LAYANAN MEDIS & ASURANSI',
        text: `Informasi Tarif & Penjaminan RS Bahagia Medika:

• BPJS Kesehatan:
  Melayani rujukan FKTP/Puskesmas dan IGD 24 jam darurat tanpa rujukan.

• Paket Prosedur Terencana (Transparan):
  - Persalinan Sesar ERACS: Rp 12.500.000 – Rp 29.500.000
  - Persalinan Normal: Rp 5.500.000 – Rp 14.500.000
  - Operasi Laparoskopi Usus Buntu: Rp 10.500.000 – Rp 24.000.000
  - Operasi Katarak Phacoemulsifikasi: Mulai Rp 6.500.000
  - Kateterisasi Jantung & Stent (PCI): Mulai Rp 19.500.000

• 50+ Asuransi Rekanan Swasta (Cashless):
  Prudential, Allianz, AIA, AdMedika, Sinarmas, Manulife, Sequis, Mandiri Inhealth.`,
        quickReplies: [
          'Buka Kalkulator Biaya Tindakan',
          'Cek Ketersediaan Kamar Rawat',
          'Hubungi Tim Billing CS',
          'Kembali ke Menu',
        ],
      };
    }

    case 'bed-availability': {
      return {
        triageLevel: 'INFO',
        triageTitle: 'KETERSEDIAAN TEMPAT TIDUR (SIRANAP KEMENKES)',
        text: `Ketersediaan Tempat Tidur Rawat Inap (Real-time):

• VVIP Suite (1 Pasien): 3 Bed (Rp 2.500.000/hari)
• VIP Deluxe (1 Pasien): 7 Bed (Rp 1.450.000/hari)
• Kelas 1 (2 Pasien): 12 Bed (Rp 750.000/hari)
• Kelas 2 (4 Pasien): 15 Bed (Rp 450.000/hari)
• Kelas 3 Standar BPJS: 18 Bed (Ditanggung BPJS)
• ICU / NICU / PICU / Isolasi: 11 Bed Siaga

Total 66 tempat tidur siap pakai. Petugas admisi siaga 24 jam.`,
        quickReplies: [
          'Buka Halaman Ketersediaan Kamar',
          'Hubungi Admisi Rawat Inap',
          'Estimasi Biaya Tindakan',
          'Kembali ke Menu',
        ],
      };
    }

    case 'lab-and-mcu': {
      return {
        triageLevel: 'INFO',
        triageTitle: 'LABORATORIUM & MEDICAL CHECK-UP (MCU)',
        text: `Layanan Laboratorium & Paket MCU Terpadu:

• Laboratorium Patologi 24 Jam:
  Darah lengkap, profil lipid/kolesterol, tes gula darah (GDP/HbA1c), fungsi ginjal & hati, serologi DBD/Tifoid.

• Petunjuk Pengambilan Darah:
  Puasa makan 10-12 jam sebelum pemeriksaan (air putih tetap diperbolehkan).

• Pilihan Paket MCU:
  Paket Silver (Dasar), Gold (Kardiovaskular), Platinum (Eksekutif), dan Pra-Nikah.`,
        quickReplies: [
          'Buka Halaman Layanan Laboratorium',
          'Lihat Jadwal Praktik',
          'Buat Janji Pemeriksaan',
          'Kembali ke Menu',
        ],
      };
    }

    case 'search-doctor': {
      const spec = intent.params?.specialization?.toLowerCase() || '';
      let filtered = allDoctors;
      if (spec) {
        filtered = allDoctors.filter((d) =>
          d.specializationName.toLowerCase().includes(spec) ||
          d.name.toLowerCase().includes(spec)
        );
      }

      return {
        triageLevel: 'INFO',
        triageTitle: 'TIM DOKTER SPESIALIS KONSULTAN',
        text: `RS Bahagia Medika didukung 120+ dokter spesialis & subspesialis konsultan terakreditasi IDI.

Poliklinik buka Senin – Sabtu dengan 3 sesi (Pagi 08.00-12.00, Siang 13.00-17.00, Malam 18.00-21.00). Rekomendasi dokter tersedia:`,
        doctors: filtered.slice(0, 3),
        quickReplies: [
          'Buka Formulir Buat Janji',
          'Buka Halaman Direktori Dokter',
          'Cek Jadwal Praktik Lengkap',
          'Kembali ke Menu',
        ],
      };
    }

    case 'search-service': {
      const query = intent.params?.query?.toLowerCase() || '';
      let services = allServices;
      if (query) {
        const f = allServices.filter((s) =>
          s.name.toLowerCase().includes(query) ||
          s.shortDescription.toLowerCase().includes(query) ||
          s.category.toLowerCase().includes(query)
        );
        if (f.length > 0) services = f;
      }

      return {
        triageLevel: 'INFO',
        triageTitle: 'UNIT LAYANAN MEDIS KOMPREHENSIF',
        text: `Fasilitas & Unit Pelayanan RS Bahagia Medika:

• IGD & Trauma Center 24 Jam
• Cath Lab & Pusat Jantung Vaskular
• Kamar Bedah Sentral (Laminar Air Flow)
• Radiologi Digital & CT-Scan Multi-Slice
• Rawat Inap Kelas 3 hingga VVIP Suite & ICU/NICU
• Laboratorium & Farmasi Sentral 24 Jam

Seluruh unit terintegrasi dengan Rekam Medis Elektronik SATUSEHAT Kemenkes RI.`,
        services: services.slice(0, 3),
        quickReplies: [
          'Buka Semua Layanan Medis',
          'Buka Formulir Buat Janji',
          'Kalkulator Biaya Tindakan',
          'Kembali ke Menu',
        ],
      };
    }

    case 'book-appointment': {
      return {
        triageLevel: 'INFO',
        triageTitle: 'PANDUAN RESERVASI & JADWAL DOKTER',
        text: `Alur Reservasi Konsultasi Poliklinik:

1. Pilih poliklinik dan dokter spesialis tujuan.
2. Tentukan tanggal dan jam praktik dokter.
3. Masukkan data pasien (No. Rekam Medis atau NIK).
4. Pilih metode pembayaran: Mandiri (Umum), Asuransi Cashless, atau BPJS.
5. Dapatkan e-voucher antrean digital resmi via sistem dan WhatsApp.`,
        quickReplies: [
          'Buka Formulir Buat Janji',
          'Cari Dokter Spesialis',
          'Cek Jadwal Praktik',
          'Kembali ke Menu',
        ],
      };
    }

    case 'contact-cs': {
      return {
        triageLevel: 'INFO',
        triageTitle: 'LAYANAN KONTAK & BANTUAN RESMI',
        text: `Kontak Resmi RS Bahagia Medika:

• Hotline IGD 24 Jam: (021) 1234-9999 / (021) 7890-9999
• Front Office & Informasi: (021) 1234-5678
• WhatsApp Pasien: 0812-3456-7890 (07.00 - 21.00 WIB)
• Poliklinik: Senin - Sabtu (08.00 - 21.00 WIB)
• Alamat: Jl. Bahagia Sehat No. 88, Cilandak, Jakarta Selatan`,
        quickReplies: [
          'Telepon Front Office',
          'Hubungi IGD 24 Jam',
          'Buka Live Chat Petugas',
          'Kembali ke Menu',
        ],
      };
    }

    case 'check-schedule': {
      return {
        triageLevel: 'INFO',
        triageTitle: 'JADWAL PRAKTIK POLIKLINIK RAWAT JALAN',
        text: `Jadwal Pelayanan Poliklinik Spesialis:

Poliklinik melayani Senin – Sabtu dalam 3 sesi:
• Sesi Pagi: 08.00 - 12.00 WIB
• Sesi Siang: 13.00 - 17.00 WIB
• Sesi Malam: 18.00 - 21.00 WIB

Hari Minggu & Libur Nasional poliklinik reguler tutup. IGD & Trauma Center tetap siaga 24 jam nonstop.`,
        quickReplies: [
          'Buka Halaman Jadwal Dokter',
          'Cari Dokter Tertentu',
          'Buka Formulir Buat Janji',
          'Kembali ke Menu',
        ],
      };
    }

    case 'hospital-info': {
      const info = await hospitalService.getInfo();
      return {
        triageLevel: 'INFO',
        triageTitle: 'PROFIL RS BAHAGIA MEDIKA',
        text: `Profil Resmi RS Bahagia Medika:

• Akreditasi: Paripurna Bintang Lima (KARS & Kemenkes RI)
• Alamat: ${info.address}
• Akses Transportasi: 15 menit dari Stasiun MRT Fatmawati
• Fasilitas: 84 Tempat Tidur, 6 Kamar Bedah Laminar Flow, Cath Lab, CT-Scan 24 Jam
• Call Center: ${info.phone}
• IGD 24 Jam: ${info.emergencyPhone}`,
        quickReplies: [
          'Cari Dokter Spesialis',
          'Cari Layanan Medis',
          'Kalkulator Biaya Tindakan',
          'Kembali ke Menu',
        ],
      };
    }

    case 'menu':
    default: {
      return {
        triageLevel: 'INFO',
        triageTitle: 'ASISTEN VIRTUAL MEDIKA CARE',
        text: `Halo! Saya Medika Care, asisten virtual RS Bahagia Medika.

Layanan yang dapat kami bantu:
1. Triase & Konsultasi Gejala Awal
2. Rekomendasi Dokter Spesialis & Jadwal
3. Estimasi Biaya Tindakan & Kamar Rawat
4. Alur Reservasi Konsultasi Online

Silakan pilih opsi di bawah atau ketik langsung keluhan Anda:`,
        quickReplies: [
          'Tanya Gejala & Triase',
          'Cari Dokter Spesialis',
          'Estimasi Biaya Tindakan',
          'Ketersediaan Kamar Rawat',
          'Cek Jadwal Praktik',
          'Hubungi Customer Care',
        ],
      };
    }
  }
}
