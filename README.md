# RS Bahagia Medika Jakarta

> Platform digital rumah sakit modern — dari landing page sinematik hingga portal pasien & panel admin yang lengkap.

---

## Tentang Proyek

**RS Bahagia Medika** adalah website rumah sakit berbasis Next.js yang dirancang untuk memberikan pengalaman digital yang profesional dan humanis. Website ini menggabungkan informasi publik rumah sakit, sistem pemesanan janji dokter online, portal pasien, dan panel manajemen admin dalam satu platform terpadu ahli.

Dibangun dengan pendekatan **mobile-first**, **fully responsive**, dan tanpa satu emoji pun — semua ikon menggunakan Lucide SVG untuk konsistensi visual yang bersih.

---

## Fitur Utama

### Halaman Publik
- **Hero Sinematik** — Player video 4 scene otomatis (Ambulans, IGD, Kamar Bedah, CT-Scan) via YouTube embed dengan kontrol Play/Pause, Mute, dan scene switcher
- **Layanan Unggulan** — Direktori layanan medis dengan halaman detail masing-masing
- **Direktori Dokter** — Profil dokter lengkap dengan jadwal praktik, spesialisasi, dan rating
- **Estimasi Biaya** — Kalkulator estimasi biaya tindakan medis
- **Ketersediaan Kamar** — Live tracker ketersediaan tempat tidur (SIRANAP)
- **Jadwal Praktik** — Halaman jadwal semua dokter
- **Fasilitas RS** — Galeri dan deskripsi fasilitas rumah sakit
- **Artikel & Berita** — Konten edukasi kesehatan dan berita RS
- **Kontak & Tentang** — Informasi kontak, lokasi, dan profil RS

### Sistem Autentikasi
- Login multi-role: **Pasien** dan **Admin**
- Setelah login pasien → redirect ke homepage dengan status *"Akses Penuh"*
- Halaman yang memerlukan login (e.g. Buat Janji) otomatis redirect ke login dengan notifikasi kontekstual
- Navbar adaptif: tampilan berbeda untuk tamu, pasien, dan admin

### Buat Janji Dokter (Pasien)
- Flow multi-langkah: Pilih Layanan → Pilih Dokter → Pilih Tanggal → Pilih Jam → Konfirmasi
- Slot waktu otomatis berdasarkan jadwal dokter (Sesi Pagi / Sesi Siang & Sore)
- Indikator slot: Tersedia / Penuh / Dipilih
- Kalender dengan disable hari di luar jadwal dokter
- Kartu info jadwal dokter (hari praktik, jam, lokasi)

### Portal Pasien (`/dashboard`)
- Overview: Kartu digital pasien, jadwal antrian hari ini, resep aktif
- **Janji Temu** — Daftar semua janji, detail, reschedule, batalkan
- **Riwayat Medis** — Rekam medis digital
- **Hasil Lab** — Hasil pemeriksaan laboratorium
- **Resep Obat** — Resep aktif dan riwayat resep
- **Notifikasi** — Pusat notifikasi pasien
- **Chat** — Chatbot asisten kesehatan berbasis intent detection
- **Profil** — Edit data diri pasien

### Panel Admin (`/admin`)
- Dashboard ringkasan (pasien hari ini, janji masuk, dll.)
- Manajemen **Dokter** — CRUD data dokter dan jadwal
- Manajemen **Layanan** — CRUD layanan medis
- Manajemen **Pasien** — Data dan riwayat pasien
- Manajemen **Appointment** — Approve/tolak/reschedule janji
- Manajemen **Fasilitas**, **Artikel**, **Berita**
- **Chat Admin** — Monitoring percakapan chatbot
- **Pengaturan** — Konfigurasi sistem RS

---

## Tech Stack

| Kategori | Teknologi |
|----------|-----------|
| Framework | [Next.js 16](https://nextjs.org) (App Router) |
| Bahasa | TypeScript 5 |
| Styling | Tailwind CSS v4 |
| State Management | [Zustand](https://zustand-demo.pmnd.rs) v5 |
| Validasi | [Zod](https://zod.dev) v4 |
| Icon | [Lucide React](https://lucide.dev) |
| Utility | clsx, tailwind-merge |
| Runtime | React 19 |

---

## Struktur Proyek

```
src/
├── app/
│   ├── (public)/          # Halaman publik (landing, dokter, layanan, dll.)
│   │   ├── page.tsx           # Homepage + Hero Sinematik
│   │   ├── buat-janji/        # Booking janji dokter (auth required)
│   │   ├── dokter/            # Direktori & profil dokter
│   │   ├── layanan/           # Layanan medis
│   │   ├── estimasi-biaya/    # Kalkulator biaya
│   │   ├── ketersediaan-kamar/ # Live bed tracker
│   │   ├── fasilitas/         # Fasilitas RS
│   │   ├── jadwal/            # Jadwal praktik dokter
│   │   ├── artikel/           # Artikel kesehatan
│   │   ├── berita/            # Berita RS
│   │   ├── tentang/           # Profil RS
│   │   └── kontak/            # Kontak & lokasi
│   ├── (auth)/            # Halaman autentikasi
│   │   ├── login/             # Login multi-role
│   │   └── register/          # Registrasi pasien
│   ├── dashboard/         # Portal pasien (protected)
│   │   ├── appointment/       # Manajemen janji temu
│   │   ├── riwayat/           # Riwayat medis
│   │   ├── hasil-lab/         # Hasil laboratorium
│   │   ├── resep-obat/        # Resep obat
│   │   ├── chat/              # Chatbot
│   │   ├── notification/      # Notifikasi
│   │   └── profile/           # Profil pasien
│   └── admin/             # Panel admin (protected)
│       ├── dokter/            # Manajemen dokter
│       ├── layanan/           # Manajemen layanan
│       ├── pasien/            # Manajemen pasien
│       ├── appointment/       # Manajemen janji
│       ├── fasilitas/         # Manajemen fasilitas
│       ├── artikel/           # Manajemen artikel
│       ├── berita/            # Manajemen berita
│       ├── jadwal/            # Manajemen jadwal
│       ├── chat/              # Monitoring chatbot
│       └── settings/          # Pengaturan sistem
├── components/
│   ├── layout/            # Navbar, Footer, Hero, Sidebar, Shell
│   ├── ui/                # Design system (Button, Input, Modal, dll.)
│   ├── cards/             # Kartu: Dokter, Layanan, Artikel, dll.
│   ├── home/              # Seksi homepage
│   ├── dashboard/         # Widget portal pasien
│   ├── features/          # Fitur standalone (BedTracker, CostEstimator)
│   ├── chat/              # ChatbotWidget
│   ├── auth/              # ProtectedRoute
│   └── common/            # Utilitas umum (BrowserErrorFilter, dll.)
├── lib/
│   ├── store/             # Zustand stores (auth, appointment, chat, dll.)
│   ├── services/          # Service layer (dokter, layanan, artikel, dll.)
│   └── utils/             # Helper functions (cn, format)
├── data/                  # JSON mock data (dokter, layanan, fasilitas, dll.)
├── features/
│   └── chat/              # Intent detection engine chatbot
└── types/                 # TypeScript type definitions
```

---

## Memulai Proyek

### Prasyarat
- Node.js 18+
- npm / yarn / pnpm

### Instalasi

```bash
# Clone repository
git clone https://github.com/kevinefendy/Bahagia-Medika.git
cd Bahagia-Medika

# Install dependensi
npm install

# Jalankan development server
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser.

### Build Produksi

```bash
npm run build
npm start
```

---

## Akun Demo

| Role | Email | Password |
|------|-------|----------|
| Admin | `admin@bahagiamedika.id` | `admin123` |
| Pasien | `pasien@email.com` | `pasien123` |

> Data autentikasi disimpan di Zustand dengan localStorage persistence. Tidak ada koneksi ke backend nyata.

---

## Halaman & Route

| Route | Deskripsi | Akses |
|-------|-----------|-------|
| `/` | Homepage + Hero Video | Publik |
| `/dokter` | Direktori dokter | Publik |
| `/dokter/[slug]` | Profil dokter | Publik |
| `/layanan` | Daftar layanan medis | Publik |
| `/layanan/[slug]` | Detail layanan | Publik |
| `/buat-janji` | Booking janji dokter | **Login required** |
| `/estimasi-biaya` | Estimasi biaya tindakan | Publik |
| `/ketersediaan-kamar` | Ketersediaan tempat tidur | Publik |
| `/jadwal` | Jadwal praktik dokter | Publik |
| `/fasilitas` | Fasilitas rumah sakit | Publik |
| `/artikel` | Artikel kesehatan | Publik |
| `/berita` | Berita RS | Publik |
| `/tentang` | Profil RS | Publik |
| `/kontak` | Kontak & lokasi | Publik |
| `/login` | Login multi-role | Tamu |
| `/register` | Registrasi pasien | Tamu |
| `/dashboard` | Portal pasien | **Pasien** |
| `/dashboard/appointment` | Manajemen janji pasien | **Pasien** |
| `/dashboard/riwayat` | Riwayat medis | **Pasien** |
| `/dashboard/hasil-lab` | Hasil laboratorium | **Pasien** |
| `/dashboard/resep-obat` | Resep obat | **Pasien** |
| `/dashboard/chat` | Chatbot asisten | **Pasien** |
| `/admin` | Dashboard admin | **Admin** |
| `/admin/dokter` | Manajemen dokter | **Admin** |
| `/admin/layanan` | Manajemen layanan | **Admin** |
| `/admin/pasien` | Manajemen pasien | **Admin** |
| `/admin/appointment` | Manajemen janji | **Admin** |

---

## Zustand Stores

| Store | Fungsi |
|-------|--------|
| `useAuthStore` | State autentikasi (user, role, login, logout) |
| `useAppointmentStore` | Data janji temu pasien |
| `useBookingFlowStore` | State flow buat janji (multi-step) |
| `useChatStore` | Riwayat percakapan chatbot |
| `usePatientRecordStore` | Data rekam medis & hasil lab |
| `useNotificationStore` | Notifikasi in-app |
| `useProfileStore` | Data profil pasien |
| `useUIStore` | State UI global (modal, drawer, dll.) |

---

## Desain & UX

- **Responsive** — Mobile (320px+), Tablet (768px+), Desktop (1024px+)
- **Icon-first** — Semua ikon menggunakan Lucide React, nol emoji
- **Color system** — Teal/blue primary dengan aksen amber untuk notifikasi
- **Loading states** — Skeleton loading di setiap halaman data
- **Error states** — Komponen `ErrorState` dan `EmptyState` yang konsisten
- **Dark-friendly** — Kontras warna mempertimbangkan aksesibilitas

---

## Lisensi

Proyek ini dibuat untuk keperluan portofolio dan demonstrasi. Semua data yang ditampilkan adalah fiktif.

---

<div align="center">
  Dibuat dengan sepenuh hati oleh <a href="https://github.com/kevinefendy">Kevin Efendy</a>
</div>
