import { doctorService } from '@/lib/services/doctorService';
import { serviceService } from '@/lib/services/serviceService';
import { hospitalService } from '@/lib/services/hospitalService';
import type { Doctor } from '@/types/doctor';
import type { Service } from '@/types/service';

export type IntentType =
  | 'search-doctor'
  | 'search-service'
  | 'check-schedule'
  | 'book-appointment'
  | 'contact-cs'
  | 'hospital-info'
  | 'emergency'
  | 'medical-condition'
  | 'menu'
  | 'fallback';

export interface DetectedIntent {
  type: IntentType;
  params?: Record<string, string>;
}

const EMERGENCY_KEYWORDS = [
  'sesak napas',
  'kecelakaan',
  'pingsan',
  'darurat',
  'tidak sadar',
  'berdarah',
  'muntah darah',
  'kritis',
  'serangan jantung',
];

const MEDICAL_KEYWORDS = [
  'saya sakit',
  'gejala',
  'kenapa saya',
  'apakah saya',
  'diagnosa',
  'penyakit saya',
  'keluhan',
];

const CS_KEYWORDS = [
  'customer service',
  'cs',
  'hubungi cs',
  'bantuan cs',
  'telepon rs',
  'kontak rs',
  'hubungi kami',
  'live chat',
  'kontak customer',
  'chat cs',
  'bicara petugas',
  'bicara operator',
];

const DOCTOR_KEYWORDS = [
  'dokter',
  'cari dokter',
  'spesialis',
  'rekomendasi dokter',
  'bantu cari dokter',
];

const SERVICE_KEYWORDS = [
  'layanan',
  'service',
  'fasilitas',
  'klinik',
  'ruangan',
  'poli',
  'cari layanan',
  'bantu cari layanan',
];

const SCHEDULE_KEYWORDS = [
  'jadwal',
  'jam praktik',
  'jam buka',
  'cek jadwal',
  'jadwal dokter',
];

const BOOK_KEYWORDS = [
  'buat janji',
  'booking',
  'reservasi',
  'daftar periksa',
  'daftar berobat',
  'konsultasi',
  'daftar janji',
];

const INFO_KEYWORDS = [
  'alamat',
  'lokasi',
  'telepon',
  'nomor',
  'operasional',
  'info rumah sakit',
  'profil rs',
];

const MENU_KEYWORDS = [
  'menu',
  'kembali ke menu',
  'menu utama',
  'halo',
  'hai',
  'pilihan',
];

export function detectIntent(message: string): DetectedIntent {
  const lower = message.toLowerCase().trim();

  if (EMERGENCY_KEYWORDS.some((k) => lower.includes(k))) {
    return { type: 'emergency' };
  }

  if (CS_KEYWORDS.some((k) => lower.includes(k))) {
    return { type: 'contact-cs' };
  }

  if (MENU_KEYWORDS.some((k) => lower === k || lower.includes('kembali ke menu') || lower.includes('menu utama'))) {
    return { type: 'menu' };
  }

  if (MEDICAL_KEYWORDS.some((k) => lower.includes(k))) {
    return { type: 'medical-condition' };
  }

  if (DOCTOR_KEYWORDS.some((k) => lower.includes(k))) {
    let spec = '';
    if (lower.includes('anak')) spec = 'anak';
    else if (lower.includes('jantung')) spec = 'jantung';
    else if (lower.includes('penyakit dalam')) spec = 'penyakit dalam';
    else if (lower.includes('bedah')) spec = 'bedah';
    else if (lower.includes('kandungan') || lower.includes('kebidanan')) spec = 'kandungan';
    else if (lower.includes('mata')) spec = 'mata';
    else if (lower.includes('gigi')) spec = 'gigi';
    else if (lower.includes('saraf')) spec = 'saraf';
    else {
      spec = lower.match(/dokter\s+(\w+)/)?.[1] || '';
    }
    return { type: 'search-doctor', params: { specialization: spec } };
  }

  if (SERVICE_KEYWORDS.some((k) => lower.includes(k))) {
    let query = '';
    if (lower.includes('darurat') || lower.includes('igd') || lower.includes('ambulans')) query = 'darurat';
    else if (lower.includes('rawat inap') || lower.includes('kamar') || lower.includes('icu')) query = 'inap';
    else if (lower.includes('bedah') || lower.includes('operasi')) query = 'bedah';
    else if (lower.includes('radiologi') || lower.includes('ct-scan') || lower.includes('lab')) query = 'radiologi';
    return { type: 'search-service', params: { query } };
  }

  if (SCHEDULE_KEYWORDS.some((k) => lower.includes(k))) {
    return { type: 'check-schedule' };
  }

  if (BOOK_KEYWORDS.some((k) => lower.includes(k))) {
    return { type: 'book-appointment' };
  }

  if (INFO_KEYWORDS.some((k) => lower.includes(k))) {
    return { type: 'hospital-info' };
  }

  return { type: 'fallback' };
}

export async function buildResponse(intent: DetectedIntent): Promise<{
  text: string;
  doctors?: Doctor[];
  services?: Service[];
  quickReplies?: string[];
  isEmergency?: boolean;
}> {
  switch (intent.type) {
    case 'emergency': {
      return {
        text: 'Kondisi ini terindikasi membutuhkan tindakan medis darurat segera. Tim triage IGD RS Bahagia Medika Jakarta siaga 24 jam dengan fasilitas resusitasi dan armada ambulans cepat.',
        isEmergency: true,
        quickReplies: ['Hubungi IGD 24 Jam', 'Kembali ke Menu'],
      };
    }

    case 'medical-condition': {
      return {
        text: 'Sebagai asisten virtual, saya tidak dapat memberikan diagnosis klinis. Untuk keluhan yang Anda rasakan, disarankan berkonsultasi langsung dengan dokter spesialis di RS Bahagia Medika Jakarta agar mendapatkan pemeriksaan dan penanganan yang tepat.\n\nApakah Anda ingin saya bantu mencarikan dokter spesialis yang sesuai?',
        quickReplies: ['Cari Dokter', 'Cek Jadwal Praktik', 'Buat Janji', 'Kembali ke Menu'],
      };
    }

    case 'search-doctor': {
      const specialization = intent.params?.specialization?.toLowerCase() || '';
      const doctors = await doctorService.getAll();
      if (specialization) {
        const filtered = doctors.filter((d) =>
          d.specializationName.toLowerCase().includes(specialization) ||
          d.name.toLowerCase().includes(specialization)
        );
        if (filtered.length > 0) {
          return {
            text: `Informasi Dokter Spesialis ${specialization.toUpperCase()} RS Bahagia Medika Jakarta:\n\nBerikut dokter spesialis yang tersedia untuk konsultasi dan pemeriksaan:`,
            doctors: filtered.slice(0, 3),
            quickReplies: [
              'Buka Formulir Buat Janji',
              'Buka Halaman Dokter',
              'Cari Layanan',
              'Kembali ke Menu',
            ],
          };
        }
      }

      return {
        text: `Informasi Dokter Spesialis RS Bahagia Medika Jakarta:\n\nRS Bahagia Medika didukung lebih dari 30 dokter spesialis dan subspesialis bersertifikasi IDI dengan standar akreditasi KARS Paripurna. Layanan poliklinik mencakup Spesialis Anak, Penyakit Dalam, Jantung & Pembuluh Darah, Bedah Umum & Ortopedi, Kebidanan & Kandungan, Radiologi, serta THT dan Mata.\n\nApakah Anda ingin dibantu mencari dokter spesialis tertentu atau ingin membuka direktori dokter lengkap?`,
        doctors: doctors.slice(0, 3),
        quickReplies: [
          'Bantu Cari Spesialis Anak',
          'Bantu Cari Dokter Jantung',
          'Bantu Cari Penyakit Dalam',
          'Buka Halaman Dokter',
          'Buka Formulir Buat Janji',
          'Kembali ke Menu',
        ],
      };
    }

    case 'search-service': {
      const query = intent.params?.query?.toLowerCase() || '';
      let services = await serviceService.getAll();
      if (query) {
        const filtered = services.filter((s) =>
          s.name.toLowerCase().includes(query) ||
          s.shortDescription.toLowerCase().includes(query) ||
          s.category.toLowerCase().includes(query)
        );
        if (filtered.length > 0) {
          services = filtered;
        }
      }

      return {
        text: `Informasi Fasilitas & Layanan RS Bahagia Medika Jakarta:\n\nKami menyediakan layanan perawatan komprehensif:\n• Instalasi Gawat Darurat (IGD) & Ambulans 24 Jam\n• Kamar Operasi & Fasilitas Bedah Modern\n• Radiologi Digital & Fasilitas Multi-slice CT-Scan\n• Rawat Inap Berstandar Kelas 1 hingga VVIP & ICU/HCU\n• Laboratorium Patologi Klinis 24 Jam\n• Poliklinik Rawat Jalan & Farmasi 24 Jam\n\nApakah Anda ingin dibantu mencari layanan medis yang spesifik atau ingin melihat seluruh layanan?`,
        services: services.slice(0, 3),
        quickReplies: [
          'Bantu Cari Kamar Bedah',
          'Bantu Cari Rawat Inap',
          'Buka Halaman Layanan',
          'Buka Formulir Buat Janji',
          'Kembali ke Menu',
        ],
      };
    }

    case 'book-appointment': {
      return {
        text: `Informasi Reservasi & Pembuatan Janji Temu Dokter:\n\nProsedur reservasi konsultasi di RS Bahagia Medika Jakarta:\n1. Pilih poliklinik dan dokter spesialis tujuan.\n2. Tentukan tanggal konsultasi dan sesi jam praktik yang tersedia.\n3. Masukkan data pasien (No. Rekam Medis untuk pasien lama, atau NIK untuk pasien baru).\n4. Pilih metode pembayaran (Pribadi/Mandiri, Asuransi Rekanan, atau BPJS Kesehatan).\n5. Dapatkan nomor antrean digital resmi serta notifikasi jadwal via WhatsApp/SMS.\n\nApakah Anda ingin dibantu membuat janji temu sekarang?`,
        quickReplies: [
          'Buka Formulir Buat Janji',
          'Cari Dokter Dulu',
          'Cek Jadwal Praktik',
          'Hubungi Customer Service',
          'Kembali ke Menu',
        ],
      };
    }

    case 'contact-cs': {
      return {
        text: `Informasi Customer Care & Kontak RS Bahagia Medika Jakarta:\n\nTim Customer Care kami siap membantu pertanyaan informasi pendaftaran, perkiraan biaya tindakan, asuransi rekanan, serta administrasi:\n• Telepon Front Office: (021) 1234-5678\n• WhatsApp Customer Care: 0812-3456-7890\n• Jam Operasional CS: Setiap Hari (07.00 - 21.00 WIB)\n• Lokasi: Front Office Lobby Utama Lantai 1\n• Khusus Kegawatdaruratan (IGD 24 Jam): (021) 1234-9999\n\nApakah Anda ingin dibantu menghubungkan ke live chat petugas atau informasi kontak lainnya?`,
        quickReplies: [
          'Buka Live Chat Petugas',
          'Telepon Front Office',
          'Hubungi IGD 24 Jam',
          'Kembali ke Menu',
        ],
      };
    }

    case 'check-schedule': {
      return {
        text: `Informasi Jadwal Praktik Poliklinik RS Bahagia Medika Jakarta:\n\nPoliklinik beroperasi setiap hari Senin hingga Sabtu dengan 3 sesi pelayanan:\n• Sesi Pagi: 08.00 - 12.00 WIB\n• Sesi Siang: 13.00 - 17.00 WIB\n• Sesi Malam: 18.00 - 21.00 WIB\n\nJadwal dokter spesialis dapat disesuaikan dengan ketersediaan kuota harian. Apakah Anda ingin dibantu mencari jadwal dokter tertentu?`,
        quickReplies: [
          'Buka Halaman Jadwal',
          'Cari Dokter',
          'Buka Formulir Buat Janji',
          'Kembali ke Menu',
        ],
      };
    }

    case 'hospital-info': {
      const info = await hospitalService.getInfo();
      return {
        text: `Informasi Umum RS Bahagia Medika Jakarta:\n• Alamat: ${info.address}\n• Telepon: ${info.phone}\n• IGD 24 Jam: ${info.emergencyPhone}\n• Jam Operasional: ${info.operationalHours}\n• Akreditasi: Paripurna (KARS & Kemenkes RI)\n\nApakah ada hal lain yang ingin dibantu?`,
        quickReplies: [
          'Cari Dokter',
          'Cari Layanan',
          'Buat Janji',
          'Hubungi Customer Service',
          'Kembali ke Menu',
        ],
      };
    }

    case 'menu':
    default: {
      return {
        text: `Halo, saya Medika Care, asisten virtual RS Bahagia Medika Jakarta. Saya siap membantu Anda menemukan informasi seputar rumah sakit kami:\n\nSilakan pilih topik bantuan yang Anda butuhkan:`,
        quickReplies: [
          'Cari Dokter',
          'Cari Layanan',
          'Buat Janji',
          'Hubungi Customer Service',
          'Cek Jadwal',
          'Info Rumah Sakit',
        ],
      };
    }
  }
}
