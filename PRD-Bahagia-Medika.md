# PRODUCT REQUIREMENTS DOCUMENT (PRD)
## Bahagia Medika — Digital Healthcare Platform

**Nama Produk:** Bahagia Medika
**Smart Care Assistant:** Medika Care
**Versi Dokumen:** 1.0 — Full Digital Healthcare Platform (Front-End Prototype)
**Tanggal:** 11 September 2026
**Status:** In Development
**Disusun untuk:** Tim Front-End Developer (React/Next.js)
**Scope:** 100% Front-End — mock data, local state, simulated interaction, no backend

> Dokumen ini mendeskripsikan secara lengkap seluruh aspek produk Bahagia Medika berdasarkan implementasi aktual codebase — mencakup arsitektur, routing, komponen, fitur, data model, design system, dan acceptance criteria.

---

# DAFTAR ISI

1. [Product Overview](#1-product-overview)
2. [Product Vision](#2-product-vision)
3. [Problem Statement](#3-problem-statement)
4. [Goals & Success Metrics](#4-goals--success-metrics)
5. [Target Users & Personas](#5-target-users--personas)
6. [User Roles & Permission Matrix](#6-user-roles--permission-matrix)
7. [User Stories](#7-user-stories)
8. [User Journey Map](#8-user-journey-map)
9. [Sitemap & Information Architecture](#9-sitemap--information-architecture)
10. [Tech Stack & Architecture](#10-tech-stack--architecture)
11. [Folder Structure](#11-folder-structure)
12. [Routing & Page List](#12-routing--page-list)
13. [Page Requirements — Public Pages](#13-page-requirements--public-pages)
14. [Page Requirements — Auth Pages](#14-page-requirements--auth-pages)
15. [Page Requirements — Patient Dashboard](#15-page-requirements--patient-dashboard)
16. [Page Requirements — Admin Dashboard](#16-page-requirements--admin-dashboard)
17. [Feature Requirements — Smart Care Assistant (Chatbot)](#17-feature-requirements--smart-care-assistant-chatbot)
18. [Feature Requirements — Appointment Booking System](#18-feature-requirements--appointment-booking-system)
19. [Feature Requirements — Customer Service Chat](#19-feature-requirements--customer-service-chat)
20. [Component System](#20-component-system)
21. [Design System & Visual Identity](#21-design-system--visual-identity)
22. [Mock Data & Type Definitions](#22-mock-data--type-definitions)
23. [State Management](#23-state-management)
24. [UX Requirements](#24-ux-requirements)
25. [Accessibility & SEO](#25-accessibility--seo)
26. [Performance & Loading States](#26-performance--loading-states)
27. [Animation & Motion System](#27-animation--motion-system)
28. [MVP Definition & Development Priority](#28-mvp-definition--development-priority)
29. [Acceptance Criteria](#29-acceptance-criteria)
30. [Development Roadmap](#30-development-roadmap)

Lampiran A — Aturan Konten & Batasan Medis
Lampiran B — Simulated Authentication
Lampiran C — Catatan Orisinalitas Desain

---

# 1. PRODUCT OVERVIEW

**Bahagia Medika** adalah **prototype front-end** dari platform kesehatan digital untuk rumah sakit fiktif, yang dirancang agar terasa seperti aplikasi rumah sakit modern sungguhan — bukan sekadar company profile statis.

Platform ini menggabungkan:

| Modul | Deskripsi |
|---|---|
| **Website Informasi RS** | Profil rumah sakit, daftar dokter, layanan, fasilitas, artikel kesehatan, berita, dan halaman kontak |
| **Medika Care (Chatbot)** | Smart care assistant — chatbot navigasi & informasi berbasis mock response yang muncul sebagai widget global |
| **Customer Service Chat** | Simulasi kanal komunikasi pasien ↔ CS agent, tersedia di dashboard pasien |
| **Appointment Booking** | Alur booking multi-step end-to-end dengan pemilihan layanan, dokter, jadwal, dan data pasien |
| **Patient Dashboard** | Area personal pasien: janji temu, riwayat, chat, notifikasi, dan profil |
| **Admin Dashboard** | Panel pengelolaan konten & data operasional: manajemen dokter, layanan, artikel, pasien, jadwal, appointment, dan settings |

**Seluruh data, autentikasi, dan interaksi backend disimulasikan sepenuhnya di sisi client** menggunakan mock data (JSON), React/Zustand state, dan `localStorage`. Tidak ada server, API, atau database sungguhan — namun arsitektur data & komponen dirancang **API-ready**.

---

# 2. PRODUCT VISION

> **"Menghadirkan pengalaman digital rumah sakit yang terasa hidup, dapat dipercaya, dan mudah digunakan — di mana pasien merasa dibantu, bukan sekadar membaca informasi."**

| Pilar | Deskripsi |
|---|---|
| **Guided, bukan sekadar informatif** | Pengguna dipandu via Medika Care chatbot & CTA yang jelas menuju tindakan yang mereka butuhkan |
| **Personal, bukan generik** | Pasien yang login memiliki ruang personal (dashboard) yang mencerminkan riwayat & kebutuhannya |
| **Tenang & terpercaya, bukan ramai** | Visual healthcare yang bersih, whitespace cukup, palet warna teal/biru-hijau yang menenangkan |

---

# 3. PROBLEM STATEMENT

### Masalah yang Dihadapi Pasien

| # | Masalah | Dampak |
|---|---|---|
| 1 | Website RS kebanyakan hanya company profile statis | Pasien kesulitan melakukan aksi (booking, cari dokter) secara mandiri |
| 2 | Informasi jadwal dokter tidak terstruktur | Pasien harus menelepon atau datang langsung untuk bertanya |
| 3 | Tidak ada panduan navigasi cerdas | Pasien bingung harus mulai dari mana, terutama pengguna baru |
| 4 | Tidak ada area personal untuk pasien | Pasien tidak bisa melacak riwayat kunjungan atau janji temu |
| 5 | Komunikasi dengan RS terbatas | Pasien hanya bisa menghubungi via telepon pada jam kerja |

### Masalah yang Dihadapi Admin RS

| # | Masalah | Dampak |
|---|---|---|
| 1 | Pengelolaan konten website manual | Update informasi lambat dan rentan kesalahan |
| 2 | Tidak ada dashboard operasional digital | Sulit memantau statistik appointment, pasien, dan dokter secara real-time |

---

# 4. GOALS & SUCCESS METRICS

### Product Goals

| Goal | Deskripsi |
|---|---|
| G1 | Menjadi website RS yang memungkinkan aksi mandiri (booking, cari dokter, chat) |
| G2 | Memberikan pengalaman guided browsing via smart assistant |
| G3 | Menyediakan area personal bagi pasien (dashboard) |
| G4 | Menyediakan admin panel operasional bagi pengelola RS |
| G5 | Membangun prototype dengan arsitektur API-ready |

### Success Metrics (Front-End Prototype)

| Metric | Target |
|---|---|
| Semua halaman publik terrender dengan benar | 100% |
| Alur booking end-to-end berfungsi | Dari pemilihan layanan hingga konfirmasi |
| Chatbot merespons keyword utama | Minimal 10 intent keyword |
| Dashboard pasien & admin fully navigable | Semua menu fungsional |
| Responsive di mobile, tablet, desktop | ≥ 3 breakpoint |
| Loading state & empty state tercover | Di semua halaman yang memuat data |

---

# 5. TARGET USERS & PERSONAS

### Persona 1: Pasien / Pengunjung Umum

| Atribut | Detail |
|---|---|
| **Nama Fiktif** | Sari Ramadhani |
| **Usia** | 28 tahun |
| **Pekerjaan** | Karyawan swasta |
| **Goal** | Mencari dokter spesialis, membuat janji temu secara online, membaca info kesehatan |
| **Pain Point** | Tidak punya waktu menelepon RS, ingin segalanya bisa dilakukan online |
| **Tech Savviness** | Menengah — familiar dengan e-commerce & social media |

### Persona 2: Admin / Pengelola RS

| Atribut | Detail |
|---|---|
| **Nama Fiktif** | Budi Prasetyo |
| **Usia** | 35 tahun |
| **Pekerjaan** | Staff IT / Humas RS |
| **Goal** | Mengelola konten website, memantau appointment, mengelola data dokter |
| **Pain Point** | Sistem lama berbasis spreadsheet, tidak ada dashboard terpusat |
| **Tech Savviness** | Tinggi — terbiasa dengan CMS & admin panel |

---

# 6. USER ROLES & PERMISSION MATRIX

| Fitur | Guest (Publik) | Patient (Login) | Admin (Login) |
|---|---|---|---|
| Lihat halaman publik | ✅ | ✅ | ✅ |
| Cari & filter dokter | ✅ | ✅ | ✅ |
| Lihat detail dokter | ✅ | ✅ | ✅ |
| Lihat layanan & fasilitas | ✅ | ✅ | ✅ |
| Baca artikel & berita | ✅ | ✅ | ✅ |
| Gunakan chatbot (Medika Care) | ✅ | ✅ | ✅ |
| Buat janji temu | ✅ | ✅ | — |
| Akses Patient Dashboard | — | ✅ | — |
| Lihat riwayat appointment | — | ✅ | — |
| Chat customer service | — | ✅ | — |
| Kelola notifikasi | — | ✅ | — |
| Edit profil | — | ✅ | — |
| Akses Admin Dashboard | — | — | ✅ |
| CRUD dokter, layanan, artikel | — | — | ✅ |
| Kelola appointment & pasien | — | — | ✅ |
| Lihat statistik operasional | — | — | ✅ |
| Pengaturan sistem | — | — | ✅ |

### Simulated Auth

| Role | Email | Password |
|---|---|---|
| Patient | `pasien@bahagiamedika.co.id` | `password123` |
| Admin | `admin@bahagiamedika.co.id` | `admin123` |

Login disimulasikan via `localStorage` — tidak ada backend authentication.

---

# 7. USER STORIES

### Guest / Pasien

| ID | Story | Priority |
|---|---|---|
| US-01 | Sebagai pengunjung, saya ingin melihat informasi rumah sakit sehingga saya tahu profil dan keunggulannya | P0 |
| US-02 | Sebagai pengunjung, saya ingin mencari dokter berdasarkan spesialisasi sehingga saya bisa menemukan dokter yang sesuai | P0 |
| US-03 | Sebagai pengunjung, saya ingin melihat jadwal dokter sehingga saya bisa datang di waktu yang tepat | P0 |
| US-04 | Sebagai pengunjung, saya ingin membuat janji temu online sehingga saya tidak perlu menelepon | P0 |
| US-05 | Sebagai pengunjung, saya ingin bertanya via chatbot sehingga saya mendapat jawaban cepat | P0 |
| US-06 | Sebagai pengunjung, saya ingin melihat layanan yang tersedia sehingga saya tahu pilihan perawatan | P0 |
| US-07 | Sebagai pengunjung, saya ingin melihat fasilitas RS sehingga saya tahu kualitas infrastrukturnya | P1 |
| US-08 | Sebagai pengunjung, saya ingin membaca artikel kesehatan sehingga saya bisa meningkatkan pengetahuan | P1 |
| US-09 | Sebagai pengunjung, saya ingin membaca berita RS sehingga saya up-to-date | P1 |
| US-10 | Sebagai pasien, saya ingin melihat riwayat appointment saya di dashboard | P0 |
| US-11 | Sebagai pasien, saya ingin chat dengan CS untuk bantuan lebih lanjut | P1 |
| US-12 | Sebagai pasien, saya ingin menerima notifikasi tentang appointment saya | P1 |
| US-13 | Sebagai pasien, saya ingin mengelola profil saya | P1 |

### Admin

| ID | Story | Priority |
|---|---|---|
| US-20 | Sebagai admin, saya ingin melihat statistik dashboard operasional | P0 |
| US-21 | Sebagai admin, saya ingin mengelola data dokter (CRUD) | P0 |
| US-22 | Sebagai admin, saya ingin mengelola layanan RS | P0 |
| US-23 | Sebagai admin, saya ingin mengelola appointment pasien | P0 |
| US-24 | Sebagai admin, saya ingin mengelola konten artikel | P1 |
| US-25 | Sebagai admin, saya ingin mengelola konten berita | P1 |
| US-26 | Sebagai admin, saya ingin mengelola data fasilitas | P1 |
| US-27 | Sebagai admin, saya ingin mengelola jadwal dokter | P1 |
| US-28 | Sebagai admin, saya ingin membalas chat CS pasien | P1 |
| US-29 | Sebagai admin, saya ingin mengelola data pasien | P2 |
| US-30 | Sebagai admin, saya ingin mengubah pengaturan sistem | P2 |

---

# 8. USER JOURNEY MAP

### Journey 1: Pasien Mencari Dokter & Membuat Janji Temu

```
Landing Page → Klik "Cari Dokter" / Search Bar
     ↓
Halaman Dokter → Filter spesialisasi → Pilih Dokter
     ↓
Detail Dokter → Lihat jadwal, bio, pendidikan
     ↓
Klik "Buat Janji" → Halaman Buat Janji
     ↓
Step 1: Pilih Layanan → Step 2: Pilih Dokter → Step 3: Pilih Jadwal/Waktu
     ↓
Step 4: Isi Data Pasien → Step 5: Konfirmasi → Booking Berhasil
     ↓
(Jika login) → Dashboard → Lihat Appointment → Detail Appointment
```

### Journey 2: Pasien Bertanya via Chatbot

```
Halaman Manapun → Klik ikon chatbot (floating widget kanan bawah)
     ↓
Chat window terbuka → Pesan sapaan otomatis + quick replies
     ↓
User mengetik pertanyaan (e.g. "dokter anak")
     ↓
Bot merespons dengan informasi + card dokter/layanan terkait
     ↓
User klik card → navigasi ke halaman detail dokter/layanan
```

### Journey 3: Admin Mengelola Data

```
Login sebagai Admin → Admin Dashboard
     ↓
Sidebar navigasi → Pilih menu (Dokter/Layanan/Appointment/dll)
     ↓
Lihat tabel data → Tambah/Edit/Hapus → Konfirmasi → Data terupdate
```

---

# 9. SITEMAP & INFORMATION ARCHITECTURE

```
Bahagia Medika
├── 🏠 Beranda (/)
├── 📋 Tentang Kami (/tentang)
├── 👨‍⚕️ Dokter (/dokter)
│   └── Detail Dokter (/dokter/[slug])
├── 🏥 Layanan (/layanan)
│   └── Detail Layanan (/layanan/[slug])
├── 🏢 Fasilitas (/fasilitas)
├── 📅 Jadwal Dokter (/jadwal)
├── 📝 Buat Janji (/buat-janji)
├── 📰 Artikel Kesehatan (/artikel)
│   └── Detail Artikel (/artikel/[slug])
├── 📢 Berita (/berita)
│   └── Detail Berita (/berita/[slug])
├── 📞 Kontak (/kontak)
├── 🔑 Auth
│   ├── Login (/login)
│   └── Register (/register)
├── 👤 Patient Dashboard (/dashboard) — [Protected: patient]
│   ├── Overview (/dashboard)
│   ├── Appointment (/dashboard/appointment)
│   │   └── Detail (/dashboard/appointment/[id])
│   ├── Riwayat (/dashboard/riwayat)
│   ├── Chat CS (/dashboard/chat)
│   ├── Notifikasi (/dashboard/notification)
│   └── Profil (/dashboard/profile)
└── ⚙️ Admin Dashboard (/admin) — [Protected: admin]
    ├── Overview (/admin)
    ├── Appointment (/admin/appointment)
    ├── Dokter (/admin/dokter)
    ├── Layanan (/admin/layanan)
    ├── Jadwal (/admin/jadwal)
    ├── Fasilitas (/admin/fasilitas)
    ├── Artikel (/admin/artikel)
    ├── Berita (/admin/berita)
    ├── Chat CS (/admin/chat)
    ├── Pasien (/admin/pasien)
    └── Settings (/admin/settings)
```

---

# 10. TECH STACK & ARCHITECTURE

| Layer | Teknologi | Versi | Keterangan |
|---|---|---|---|
| Framework | Next.js (App Router) | 16.3.4 | Server components + client components |
| UI Library | React | 19.2.8 | Latest React with hooks |
| Language | TypeScript | 5.x | Strict type safety |
| Styling | Tailwind CSS | 4.x | Utility-first CSS via PostCSS |
| State Management | Zustand | 5.0.15 | Lightweight global state |
| Icons | Lucide React | 1.43.0 | Consistent icon library |
| Validation | Zod | 4.5.4 | Schema validation untuk forms |
| Font | Poppins | — | Google Fonts, di-load via `next/font` |
| Utility | clsx + tailwind-merge | — | Conditional className merging |

### Architecture Pattern

```
┌──────────────────────────────────────────────────────┐
│                    App (Next.js 16)                   │
│  ┌────────────────────────────────────────────────┐  │
│  │              Route Groups                       │  │
│  │  (public) │ (auth) │ dashboard │ admin          │  │
│  └────────────────────────────────────────────────┘  │
│  ┌──────────┐ ┌──────────┐ ┌────────────────────┐   │
│  │Components│ │ Features │ │     Lib            │   │
│  │  ├─ui    │ │  └─chat  │ │  ├─services (mock) │   │
│  │  ├─cards │ │          │ │  ├─store (zustand)  │   │
│  │  ├─layout│ │          │ │  └─utils            │   │
│  │  ├─chat  │ │          │ │                      │   │
│  │  └─auth  │ │          │ │                      │   │
│  └──────────┘ └──────────┘ └────────────────────┘   │
│  ┌──────────┐ ┌──────────┐                           │
│  │  Types   │ │   Data   │ ← JSON mock files         │
│  │ (*.ts)   │ │ (*.json) │                           │
│  └──────────┘ └──────────┘                           │
└──────────────────────────────────────────────────────┘
```

**Key architectural decisions:**
- **Route Groups**: `(public)` untuk halaman umum dengan Navbar/Footer, `(auth)` untuk login/register tanpa Navbar
- **Protected Routes**: `dashboard/` dilindungi oleh `ProtectedRoute` dengan role `patient`, `admin/` dengan role `admin`
- **Service Layer**: Semua data diakses melalui service functions (e.g., `doctorService`, `serviceService`) yang membaca dari JSON — siap diganti API
- **Layout Composition**: `PublicLayout` (TopBar + Navbar + Footer), `DashboardShell`, `AdminShell`

---

# 11. FOLDER STRUCTURE

```
src/
├── app/
│   ├── (auth)/
│   │   ├── layout.tsx
│   │   ├── login/page.tsx
│   │   └── register/page.tsx
│   ├── (public)/
│   │   ├── layout.tsx                  ← TopBar + Navbar + Footer
│   │   ├── page.tsx                    ← Homepage / Beranda
│   │   ├── tentang/page.tsx
│   │   ├── dokter/page.tsx
│   │   ├── dokter/[slug]/page.tsx
│   │   ├── layanan/page.tsx
│   │   ├── layanan/[slug]/page.tsx
│   │   ├── fasilitas/page.tsx
│   │   ├── jadwal/page.tsx
│   │   ├── buat-janji/page.tsx
│   │   ├── artikel/page.tsx
│   │   ├── artikel/[slug]/page.tsx
│   │   ├── berita/page.tsx
│   │   ├── berita/[slug]/page.tsx
│   │   └── kontak/page.tsx
│   ├── dashboard/
│   │   ├── layout.tsx                  ← ProtectedRoute(patient) + DashboardShell
│   │   ├── page.tsx
│   │   ├── appointment/page.tsx
│   │   ├── appointment/[id]/page.tsx
│   │   ├── riwayat/page.tsx
│   │   ├── chat/page.tsx
│   │   ├── notification/page.tsx
│   │   └── profile/page.tsx
│   ├── admin/
│   │   ├── layout.tsx                  ← ProtectedRoute(admin) + AdminShell
│   │   ├── page.tsx                    ← Admin Overview / Stats
│   │   ├── appointment/page.tsx
│   │   ├── dokter/page.tsx
│   │   ├── layanan/page.tsx
│   │   ├── jadwal/page.tsx
│   │   ├── fasilitas/page.tsx
│   │   ├── artikel/page.tsx
│   │   ├── berita/page.tsx
│   │   ├── chat/page.tsx
│   │   ├── pasien/page.tsx
│   │   └── settings/page.tsx
│   ├── globals.css                     ← Design tokens + animations
│   ├── layout.tsx                      ← Root layout (Poppins font, ChatbotWidget, Toast)
│   └── favicon.ico
├── components/
│   ├── auth/
│   │   └── ProtectedRoute.tsx
│   ├── cards/
│   │   ├── index.ts
│   │   ├── AppointmentCard.tsx
│   │   ├── ArticleCard.tsx
│   │   ├── DoctorCard.tsx
│   │   ├── FacilityCard.tsx
│   │   ├── NewsCard.tsx
│   │   ├── NotificationCard.tsx
│   │   ├── ServiceCard.tsx
│   │   └── TestimonialCard.tsx
│   ├── chat/
│   │   └── ChatbotWidget.tsx           ← Global floating chatbot
│   ├── layout/
│   │   ├── TopBar.tsx
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   ├── DashboardShell.tsx
│   │   └── AdminShell.tsx
│   └── ui/
│       ├── Button.tsx
│       ├── Modal.tsx
│       ├── Skeleton.tsx
│       └── Toast.tsx
├── features/
│   └── chat/                           ← Chat feature logic
├── data/
│   ├── doctors.json                    ← 10+ dokter dummy
│   ├── services.json                   ← 10+ layanan medis
│   ├── facilities.json                 ← 6 fasilitas RS
│   ├── specializations.json            ← 10 spesialisasi
│   ├── articles.json                   ← Artikel kesehatan
│   ├── news.json                       ← Berita RS
│   ├── testimonials.json               ← Testimoni pasien
│   └── hospitalInfo.json               ← Info umum RS
├── lib/
│   ├── services/                       ← Service layer (mock data access)
│   ├── store/                          ← Zustand stores
│   └── utils/                          ← Utility functions
└── types/
    ├── index.ts                        ← Re-exports all types
    ├── doctor.ts
    ├── service.ts
    ├── facility.ts
    ├── appointment.ts
    ├── user.ts
    ├── chat.ts
    ├── notification.ts
    ├── article.ts
    ├── news.ts
    ├── testimonial.ts
    ├── hospital.ts
    └── admin.ts
```

---

# 12. ROUTING & PAGE LIST

### Route Group: `(public)` — Halaman Publik

| Route | Page | Deskripsi |
|---|---|---|
| `/` | Homepage | Hero, quick actions, layanan unggulan, dokter, chatbot CTA, tentang, artikel, berita, testimoni, emergency CTA, lokasi |
| `/tentang` | Tentang Kami | Profil RS, visi misi, sejarah, tim |
| `/dokter` | Daftar Dokter | Grid dokter dengan filter spesialisasi & search |
| `/dokter/[slug]` | Detail Dokter | Bio, pendidikan, jadwal praktik, layanan terkait |
| `/layanan` | Daftar Layanan | Grid layanan per kategori (Rawat Jalan, Rawat Inap, Penunjang Medis) |
| `/layanan/[slug]` | Detail Layanan | Deskripsi, benefit, FAQ, dokter terkait |
| `/fasilitas` | Fasilitas | Gallery fasilitas RS dengan gambar & deskripsi |
| `/jadwal` | Jadwal Dokter | Tabel jadwal seluruh dokter per hari |
| `/buat-janji` | Buat Janji | Multi-step form booking appointment |
| `/artikel` | Daftar Artikel | Grid artikel kesehatan |
| `/artikel/[slug]` | Detail Artikel | Konten lengkap artikel |
| `/berita` | Daftar Berita | Grid berita RS |
| `/berita/[slug]` | Detail Berita | Konten lengkap berita |
| `/kontak` | Kontak | Info kontak, form kontak, peta lokasi |

### Route Group: `(auth)` — Autentikasi

| Route | Page | Deskripsi |
|---|---|---|
| `/login` | Login | Form login (simulated auth) |
| `/register` | Register | Form registrasi pasien baru |

### Route Group: `dashboard` — Patient Dashboard (Protected: patient)

| Route | Page | Deskripsi |
|---|---|---|
| `/dashboard` | Overview | Ringkasan: appointment terbaru, notifikasi, quick stats |
| `/dashboard/appointment` | Appointment List | Daftar semua appointment pasien |
| `/dashboard/appointment/[id]` | Appointment Detail | Detail satu appointment: status, dokter, waktu |
| `/dashboard/riwayat` | Riwayat | History kunjungan yang sudah selesai |
| `/dashboard/chat` | Chat CS | Simulasi customer service chat |
| `/dashboard/notification` | Notifikasi | Daftar notifikasi (appointment reminder, update) |
| `/dashboard/profile` | Profil | View/edit data pribadi pasien |

### Route Group: `admin` — Admin Dashboard (Protected: admin)

| Route | Page | Deskripsi |
|---|---|---|
| `/admin` | Overview | Dashboard stats: total pasien, appointment hari ini, dokter aktif, grafik 7 hari |
| `/admin/appointment` | Kelola Appointment | Tabel appointment + aksi ubah status |
| `/admin/dokter` | Kelola Dokter | CRUD data dokter |
| `/admin/layanan` | Kelola Layanan | CRUD data layanan |
| `/admin/jadwal` | Kelola Jadwal | Manage jadwal dokter |
| `/admin/fasilitas` | Kelola Fasilitas | CRUD data fasilitas |
| `/admin/artikel` | Kelola Artikel | CRUD konten artikel |
| `/admin/berita` | Kelola Berita | CRUD konten berita |
| `/admin/chat` | Chat CS (Admin) | Lihat & balas chat dari pasien |
| `/admin/pasien` | Kelola Pasien | Daftar pasien terdaftar |
| `/admin/settings` | Pengaturan | Settings RS: info umum, jam operasional |

---

# 13. PAGE REQUIREMENTS — PUBLIC PAGES

### 13.1 Homepage (`/`)

**Sections (top-to-bottom):**

1. **Hero Section**
   - Background: `--color-primary` (#285F75) dengan decorative circles
   - Badge: "Layanan Kesehatan Terpercaya"
   - Headline: "Kesehatan Anda, Prioritas Kami"
   - Subtext: Deskripsi Bahagia Medika
   - Search bar: Cari dokter/layanan → redirect ke `/dokter?search=...`
   - CTA: "Buat Janji" (secondary button) + "Pelajari Lebih Lanjut"
   - Hero image (Unsplash) + floating stat card "25+ Tahun Melayani"
   - Scroll indicator di bottom

2. **Quick Actions Bar** (floating, -mt-7 overlap hero)
   - 6 icon shortcuts: Cari Dokter, Buat Janji, Jadwal, Layanan, Fasilitas, Kontak
   - Hover effect: icon background berubah, ring glow

3. **Mengapa Memilih Kami**
   - 4 cards: Terpercaya, Peduli, Berpengalaman, Komunitas
   - Masing-masing dengan icon, title, description
   - Hover: lift + bg change

4. **Stats Band**
   - Full-width primary bg
   - 4 statistik: 25+ Tahun, 120+ Dokter, 30+ Layanan, 50K+ Pasien

5. **Layanan Unggulan**
   - Grid 3 kolom (6 items) dari `serviceService.getFeatured(6)`
   - ServiceCard component
   - Loading: CardSkeleton

6. **Dokter Spesialis Kami**
   - Grid 4 kolom dari `doctorService.getFeatured(4)`
   - DoctorCard component
   - Background: `--color-surface`

7. **Medika Care Banner**
   - Gradient CTA banner untuk chatbot
   - Animated floating icon + "Mulai Chat"

8. **Tentang Kami Section**
   - Image + floating stat "50K+ Pasien Bahagia"
   - Checklist: Pelayanan 24 jam, Dokter berpengalaman, Fasilitas modern, Biaya terjangkau

9. **Artikel Kesehatan** — 3 featured articles
10. **Berita Terbaru** — 3 featured news
11. **Testimoni** — Grid 3 testimonial cards
12. **Emergency CTA** — Red banner dengan nomor IGD (021) 1234-9999
13. **Lokasi** — Image + info kontak grid (Telepon, IGD, Email, Jam Operasional)

### 13.2 Halaman Dokter (`/dokter`)

- **Search bar** di atas
- **Filter** berdasarkan spesialisasi (10 spesialisasi dari `specializations.json`)
- **Grid** DoctorCard responsive (1/2/4 kolom)
- **Empty state** jika tidak ada hasil

### 13.3 Detail Dokter (`/dokter/[slug]`)

- Foto, nama, spesialisasi
- Bio, pendidikan, pengalaman, bahasa
- Jadwal praktik (tabel hari + jam)
- Lokasi praktik
- Layanan terkait
- CTA: "Buat Janji dengan Dokter Ini"

### 13.4 Halaman Layanan (`/layanan`)

- Kategori tab: Rawat Jalan, Rawat Inap, Penunjang Medis
- Grid ServiceCard

### 13.5 Detail Layanan (`/layanan/[slug]`)

- Deskripsi lengkap
- Benefit list
- FAQ accordion
- Dokter terkait
- Fasilitas terkait

### 13.6 Buat Janji (`/buat-janji`)

→ Lihat §18 (Appointment Booking System)

### 13.7 Halaman Lain

| Halaman | Konten Utama |
|---|---|
| `/fasilitas` | Grid FacilityCard dengan galeri gambar per fasilitas |
| `/jadwal` | Tabel jadwal semua dokter, filter per hari/spesialisasi |
| `/artikel` | Grid ArticleCard, masing-masing dengan thumbnail, judul, excerpt, tanggal |
| `/artikel/[slug]` | Konten artikel lengkap, metadata, related articles |
| `/berita` | Grid NewsCard |
| `/berita/[slug]` | Konten berita lengkap |
| `/kontak` | Form kontak, info alamat/telepon/email, peta/gambar lokasi |
| `/tentang` | Profil RS, visi misi, sejarah, keunggulan |

---

# 14. PAGE REQUIREMENTS — AUTH PAGES

### 14.1 Login (`/login`)

- Form: Email + Password
- Simulated authentication via localStorage
- Preset credentials (lihat §6)
- Redirect ke `/dashboard` (patient) atau `/admin` (admin) setelah login
- Link ke register

### 14.2 Register (`/register`)

- Form: Nama Lengkap, Email, No. HP, Tanggal Lahir, Password, Konfirmasi Password
- Validasi via Zod schema
- Simulated: simpan ke localStorage
- Redirect ke login setelah berhasil

---

# 15. PAGE REQUIREMENTS — PATIENT DASHBOARD

### Layout: `DashboardShell`

- **Sidebar navigation** (collapsible di mobile):
  - Overview, Appointment, Riwayat, Chat CS, Notifikasi, Profil
- **Header**: Nama pasien, avatar, logout button
- **Content area**: Halaman aktif

### 15.1 Overview (`/dashboard`)

- Greeting: "Selamat datang, [Nama Pasien]"
- Quick stats: Appointment aktif, total kunjungan, notifikasi baru
- Appointment terbaru (AppointmentCard)
- Quick actions: Buat Janji, Chat CS

### 15.2 Appointment (`/dashboard/appointment`)

- Daftar semua appointment pasien
- Filter by status: Pending, Confirmed, Completed, Cancelled
- AppointmentCard dengan status badge berwarna

### 15.3 Appointment Detail (`/dashboard/appointment/[id]`)

- Info lengkap: dokter, layanan, tanggal, waktu, lokasi
- Status timeline
- Aksi: Batalkan (jika status Pending/Confirmed)

### 15.4 Riwayat (`/dashboard/riwayat`)

- Appointment yang sudah Completed
- Timeline view

### 15.5 Chat CS (`/dashboard/chat`)

- Chat interface real-time (simulated)
- Input message + send button
- Status: waiting / active / closed

### 15.6 Notifikasi (`/dashboard/notification`)

- List NotificationCard
- Tipe: appointment reminder, status update, info umum
- Mark as read

### 15.7 Profil (`/dashboard/profile`)

- View mode: tampilkan data user
- Edit mode: form edit profil
- Fields: Nama, Email, No. HP, Tanggal Lahir, Alamat, Avatar

---

# 16. PAGE REQUIREMENTS — ADMIN DASHBOARD

### Layout: `AdminShell`

- **Sidebar navigation** dengan menu lengkap
- **Header**: Nama admin, avatar, logout

### 16.1 Overview (`/admin`)

- **Stats cards**: Total Pasien, Appointment Hari Ini, Dokter Aktif, Appointment Pending
- **Chart**: Appointment 7 hari terakhir (`appointmentsLast7Days`)
- Quick action buttons

### 16.2 Halaman CRUD (Pattern Umum)

Semua halaman admin CRUD mengikuti pattern yang sama:

| Elemen | Deskripsi |
|---|---|
| Header | Judul + tombol "Tambah Baru" |
| Search/Filter | Input search + filter dropdown |
| Tabel Data | Kolom-kolom relevan + aksi (Edit, Hapus) |
| Modal Form | Form tambah/edit data (via Modal component) |
| Konfirmasi Hapus | Modal konfirmasi sebelum hapus |
| Toast | Feedback setelah aksi berhasil/gagal |
| Empty State | Pesan jika belum ada data |
| Pagination | Jika data banyak |

### Halaman CRUD Spesifik

| Route | Data Managed | Kolom Utama |
|---|---|---|
| `/admin/dokter` | Dokter | Nama, Spesialisasi, Jadwal, Status |
| `/admin/layanan` | Layanan | Nama, Kategori, Deskripsi |
| `/admin/fasilitas` | Fasilitas | Nama, Gambar, Deskripsi |
| `/admin/jadwal` | Jadwal Dokter | Dokter, Hari, Jam Mulai, Jam Selesai |
| `/admin/artikel` | Artikel | Judul, Kategori, Tanggal, Status |
| `/admin/berita` | Berita | Judul, Tanggal, Status |
| `/admin/pasien` | Pasien | Nama, Email, No. HP, Tanggal Daftar |
| `/admin/appointment` | Appointment | Pasien, Dokter, Tanggal, Status + Ubah Status |
| `/admin/chat` | Chat CS | Pasien, Status Chat, Last Message |
| `/admin/settings` | Settings RS | Nama RS, Alamat, Telepon, Jam Operasional |

---

# 17. FEATURE REQUIREMENTS — SMART CARE ASSISTANT (CHATBOT)

### 17.1 Overview

**Nama:** Medika Care
**Komponen:** `ChatbotWidget` — widget floating di kanan bawah, tersedia di **semua halaman** (dimount di root layout)

### 17.2 Behavior

| Aspek | Detail |
|---|---|
| **Trigger** | Floating button (MessageCircle icon) di kanan bawah |
| **Initial state** | Collapsed (hanya tombol terlihat) |
| **On open** | Chat window muncul dengan pesan sapaan + quick reply buttons |
| **Close** | Tombol X atau klik di luar area chat |
| **Posisi** | Fixed, bottom-right, z-index tinggi |

### 17.3 Chat Features

- **Text input** + send button
- **Quick replies** — tombol shortcut yang bisa diklik
- **Rich responses** — bot bisa mengirim:
  - Text biasa
  - Doctor cards (dengan data dari mock)
  - Service cards
  - Schedule cards
  - Emergency cards
- **Typing indicator** — animasi dots saat bot "mengetik"
- **Auto-scroll** ke message terbaru

### 17.4 Intent Recognition (Mock)

Chatbot menggunakan keyword matching sederhana:

| Keyword/Intent | Respons |
|---|---|
| dokter, cari dokter | List dokter terkait + DoctorCard |
| jadwal | Info jadwal + ScheduleCard |
| layanan, klinik | List layanan + ServiceCard |
| appointment, janji | Panduan buat janji + link ke /buat-janji |
| igd, darurat, emergency | EmergencyCard + nomor IGD |
| jam, operasional, buka | Info jam operasional RS |
| alamat, lokasi | Info alamat + link ke /kontak |
| halo, hi, hai | Sapaan + quick replies |

### 17.5 Batasan

- **Bukan** alat diagnosis medis
- **Tidak** memberikan saran pengobatan
- Selalu menyarankan konsultasi langsung dengan dokter untuk keluhan medis
- Lihat Lampiran A untuk batasan konten medis

---

# 18. FEATURE REQUIREMENTS — APPOINTMENT BOOKING SYSTEM

### 18.1 Overview

Halaman `/buat-janji` — alur booking **multi-step** end-to-end.

### 18.2 Steps

| Step | Nama | Input |
|---|---|---|
| 1 | Pilih Layanan | Dropdown/card layanan dari services.json |
| 2 | Pilih Dokter | List dokter yang terkait layanan terpilih |
| 3 | Pilih Jadwal | Kalender + time slot dari jadwal dokter terpilih |
| 4 | Data Pasien | Form: Nama, Email, No. HP, Tanggal Lahir, Alamat, Keluhan |
| 5 | Konfirmasi | Review semua data → Submit |

### 18.3 Data Model

```typescript
interface Appointment {
  id: string;
  patientId?: string;
  doctorId: string;
  doctorName: string;
  doctorSpecialization: string;
  serviceId: string;
  serviceName: string;
  date: string;           // YYYY-MM-DD
  time: string;           // HH:mm
  location: string;
  status: 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled';
  patient: PatientInfo;
  createdAt: string;
  updatedAt: string;
}

interface PatientInfo {
  fullName: string;
  email: string;
  phoneNumber: string;
  birthDate?: string;
  address?: string;
  complaint?: string;
}
```

### 18.4 Validation

- Validasi via **Zod** schema
- Setiap step harus valid sebelum lanjut ke step berikutnya
- Email format validation
- Phone number format validation
- Required fields enforcement

### 18.5 Post-Booking

- Appointment disimpan ke localStorage
- Jika user login: muncul di dashboard
- Tampilkan halaman konfirmasi sukses
- Toast notification

---

# 19. FEATURE REQUIREMENTS — CUSTOMER SERVICE CHAT

### 19.1 Overview

Simulasi chat langsung antara pasien dan CS agent, tersedia di:
- `/dashboard/chat` (sisi pasien)
- `/admin/chat` (sisi admin)

### 19.2 Data Model

```typescript
type ChatChannel = 'assistant' | 'customer-service';
type ChatMessageType = 'text' | 'doctor-card' | 'service-card' | 'schedule-card' | 'emergency-card';
type ChatSender = 'user' | 'bot' | 'agent';

interface ChatMessage {
  id: string;
  sender: ChatSender;
  type: ChatMessageType;
  text?: string;
  payload?: {
    doctors?: Doctor[];
    services?: Service[];
    schedule?: { day: string; slots: string[] };
  };
  quickReplies?: string[];
  timestamp: string;
}

interface ChatConversation {
  id: string;
  channel: ChatChannel;
  title: string;
  status: 'active' | 'waiting' | 'closed';
  messages: ChatMessage[];
  updatedAt: string;
}
```

### 19.3 Simulated Behavior

- Pasien mengirim pesan → status "waiting"
- Setelah delay (simulasi), agent auto-reply
- Admin bisa melihat daftar semua chat dan membalas

---

# 20. COMPONENT SYSTEM

### 20.1 UI Primitives (`components/ui/`)

| Component | Deskripsi |
|---|---|
| `Button` | Primary, secondary, ghost, danger variants. Sizes: sm, md, lg. Support icon + text |
| `Modal` | Overlay modal dengan backdrop. Header, body, footer. Close on backdrop click / X |
| `Skeleton` | Loading placeholder. `CardSkeleton` untuk card grid loading |
| `Toast` | Notification toast. Success, error, warning, info. Auto-dismiss. Managed globally via `ToastContainer` |

### 20.2 Card Components (`components/cards/`)

| Component | Props | Digunakan di |
|---|---|---|
| `DoctorCard` | `doctor: Doctor` | Homepage, Dokter list |
| `ServiceCard` | `service: Service` | Homepage, Layanan list |
| `ArticleCard` | `article: Article` | Homepage, Artikel list |
| `NewsCard` | `news: NewsItem` | Homepage, Berita list |
| `FacilityCard` | `facility: Facility` | Fasilitas page |
| `TestimonialCard` | `testimonial: Testimonial` | Homepage |
| `AppointmentCard` | `appointment: Appointment` | Dashboard |
| `NotificationCard` | `notification: Notification` | Dashboard |

### 20.3 Layout Components (`components/layout/`)

| Component | Deskripsi |
|---|---|
| `TopBar` | Bar tipis di atas Navbar — info kontak, jam operasional, social links |
| `Navbar` | Navigation bar utama — logo, menu links, CTA, mobile hamburger |
| `Footer` | Footer global — link kolom, info RS, social, copyright |
| `DashboardShell` | Sidebar + header + content area untuk patient dashboard |
| `AdminShell` | Sidebar + header + content area untuk admin dashboard |

### 20.4 Auth Components (`components/auth/`)

| Component | Deskripsi |
|---|---|
| `ProtectedRoute` | Wrapper yang cek auth state. Props: `role: 'patient' \| 'admin'`. Redirect ke `/login` jika belum login |

### 20.5 Chat Components (`components/chat/`)

| Component | Deskripsi |
|---|---|
| `ChatbotWidget` | Floating chatbot widget — trigger button + chat window + message list + input |

---

# 21. DESIGN SYSTEM & VISUAL IDENTITY

### 21.1 Color Palette

| Token | Hex | Penggunaan |
|---|---|---|
| `--color-primary` | `#285F75` | Teal gelap — header, CTA utama, accent |
| `--color-primary-dark` | `#18313D` | Teal sangat gelap — text heading |
| `--color-primary-light` | `#EAF4F6` | Teal terang — surface, bg card |
| `--color-secondary` | `#78AFC0` | Biru langit — secondary accent, gradient |
| `--color-secondary-light` | `#DCEEF3` | Biru sangat terang — hover state |
| `--color-background` | `#FFFFFF` | Background utama |
| `--color-surface` | `#EAF4F6` | Background section alternating |
| `--color-border` | `#C8D1D5` | Border cards, divider |
| `--color-text-primary` | `#18313D` | Text utama (dark teal) |
| `--color-text-secondary` | `#52768A` | Text secondary/muted |
| `--color-success` | `#2E9E7B` | Hijau — status confirmed, badge positif |
| `--color-success-light` | `#E6F5F0` | Hijau terang — bg badge |
| `--color-warning` | `#D9A21B` | Kuning — status pending |
| `--color-warning-light` | `#FDF6E3` | Kuning terang — bg badge |
| `--color-error` | `#C94B4B` | Merah — error, danger, emergency |
| `--color-error-light` | `#FBECEC` | Merah terang — bg badge |

### 21.2 Typography

| Elemen | Font | Weight | Keterangan |
|---|---|---|---|
| Body | Poppins | 400 (Regular) | Default text |
| Body Strong | Poppins | 500 (Medium) | Labels, nav items |
| Heading | Poppins | 600-700 (SemiBold/Bold) | Section titles |
| Hero | Poppins | 700-800 (Bold/ExtraBold) | Hero headline |
| Small | Poppins | 300 (Light) | Captions, footnotes |

Font loaded via `next/font/google` dengan `display: 'swap'` dan CSS variable `--font-poppins`.

### 21.3 Spacing & Layout

- **Max content width:** `max-w-7xl` (80rem / 1280px)
- **Section padding:** `py-20` (5rem) vertical, `px-4` horizontal
- **Card gap:** `gap-5` (1.25rem)
- **Border radius:** `rounded-xl` (0.75rem) untuk cards, `rounded-2xl` (1rem) untuk sections besar
- **Container:** `mx-auto` centered

### 21.4 Iconography

Menggunakan **Lucide React** secara konsisten. Ukuran standar:
- Small: `h-4 w-4`
- Medium: `h-5 w-5`
- Large: `h-6 w-6` atau `h-7 w-7`
- Hero: `h-8 w-8`

### 21.5 Shadow & Elevation

| Level | Tailwind Class | Penggunaan |
|---|---|---|
| Subtle | `shadow-md` | Cards biasa |
| Medium | `shadow-lg` | Quick actions bar, floating elements |
| High | `shadow-xl`, `shadow-2xl` | Hero image, floating stat cards |

---

# 22. MOCK DATA & TYPE DEFINITIONS

### 22.1 Data Files

| File | Jumlah Records | Deskripsi |
|---|---|---|
| `doctors.json` | 10+ | Dokter lengkap dengan jadwal, bio, spesialisasi |
| `services.json` | 10+ | Layanan medis dengan deskripsi, benefit, FAQ |
| `facilities.json` | 6 | Fasilitas RS dengan galeri gambar |
| `specializations.json` | 10 | Spesialisasi dokter (Anak, Jantung, Kandungan, dll) |
| `articles.json` | 5+ | Artikel kesehatan edukatif |
| `news.json` | 3+ | Berita RS terbaru |
| `testimonials.json` | 3+ | Testimoni pasien |
| `hospitalInfo.json` | 1 | Info umum RS (nama, alamat, telepon, stats) |

### 22.2 Type Definitions (Summary)

```typescript
// User & Auth
interface AuthUser {
  id: string; role: 'patient' | 'admin';
  name: string; email: string; phoneNumber?: string;
  birthDate?: string; address?: string; avatarUrl?: string;
}

// Doctor
interface Doctor {
  id: string; slug: string; name: string; photoUrl: string;
  specializationId: string; specializationName: string;
  education: string[]; experienceYears: number; languages?: string[];
  bio: string; location: string; isActive: boolean;
  schedules: DoctorSchedule[]; relatedServiceIds: string[];
}

interface DoctorSchedule {
  id: string;
  day: 'Senin' | 'Selasa' | 'Rabu' | 'Kamis' | 'Jumat' | 'Sabtu' | 'Minggu';
  startTime: string; endTime: string;
  location: string; slotDurationMinutes: number;
}

// Service
interface Service {
  id: string; slug: string; name: string; icon: string;
  category: 'Rawat Jalan' | 'Rawat Inap' | 'Penunjang Medis';
  shortDescription: string; description: string; benefits: string[];
  relatedDoctorIds: string[]; facilityIds: string[];
  faq: { question: string; answer: string }[];
}

// Appointment
type AppointmentStatus = 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled';
interface Appointment {
  id: string; patientId?: string; doctorId: string;
  doctorName: string; doctorSpecialization: string;
  serviceId: string; serviceName: string;
  date: string; time: string; location: string;
  status: AppointmentStatus; patient: PatientInfo;
  createdAt: string; updatedAt: string;
}

// Chat
type ChatChannel = 'assistant' | 'customer-service';
type ChatMessageType = 'text' | 'doctor-card' | 'service-card' | 'schedule-card' | 'emergency-card';
interface ChatMessage {
  id: string; sender: 'user' | 'bot' | 'agent';
  type: ChatMessageType; text?: string;
  payload?: { doctors?: Doctor[]; services?: Service[];
              schedule?: { day: string; slots: string[] } };
  quickReplies?: string[]; timestamp: string;
}

// Admin
interface AdminStats {
  totalPatients: number; appointmentsToday: number;
  activeDoctors: number; pendingAppointments: number;
  appointmentsLast7Days: { date: string; count: number }[];
}
```

### 22.3 Service Layer Pattern

Semua data diakses melalui service functions, contoh:

```typescript
// lib/services/doctorService.ts
export const doctorService = {
  getAll: () => Promise<Doctor[]>,
  getBySlug: (slug: string) => Promise<Doctor | null>,
  getFeatured: (limit: number) => Promise<Doctor[]>,
  getBySpecialization: (specId: string) => Promise<Doctor[]>,
  search: (query: string) => Promise<Doctor[]>,
};
```

Pattern ini memastikan **penggantian mock → real API hanya perlu mengganti implementasi service**, tanpa mengubah komponen.

---

# 23. STATE MANAGEMENT

### 23.1 Zustand Stores

| Store | State | Penggunaan |
|---|---|---|
| `authStore` | `user`, `isAuthenticated`, `login()`, `logout()`, `register()` | Auth state global |
| `appointmentStore` | `appointments[]`, `addAppointment()`, `updateStatus()`, `getByPatient()` | Data appointment |
| `chatStore` | `conversations[]`, `activeConversation`, `sendMessage()`, `addBotReply()` | Chat state |
| `notificationStore` | `notifications[]`, `addNotification()`, `markAsRead()`, `unreadCount` | Notifikasi |
| `toastStore` | `toasts[]`, `addToast()`, `removeToast()` | Toast notifications |

### 23.2 Local Component State

- Form inputs: `useState` lokal
- Loading/error states: `useState` lokal
- UI toggles (sidebar open, modal open): `useState` lokal
- Filtered/sorted data: `useMemo` / `useState`

### 23.3 Data Persistence

- Auth state → `localStorage`
- Appointments → `localStorage`
- Notifications → `localStorage`
- Chat history → `localStorage`
- Profile edits → `localStorage`

---

# 24. UX REQUIREMENTS

### 24.1 Navigation

- **TopBar**: Selalu visible di halaman publik — info telepon, email, jam operasional
- **Navbar**: Sticky top — logo, menu, search icon, CTA "Buat Janji", profile/login
- **Footer**: Info lengkap RS, link navigasi, social media, copyright
- **Breadcrumb**: Di halaman detail (dokter, layanan, artikel, berita)
- **Sidebar**: Di dashboard pasien & admin — collapsible di mobile

### 24.2 Mobile Responsiveness

| Breakpoint | Kolom Grid | Navbar | Sidebar |
|---|---|---|---|
| Mobile (`<768px`) | 1 kolom | Hamburger menu | Hidden, toggle overlay |
| Tablet (`768-1024px`) | 2 kolom | Compact menu | Collapsed icons |
| Desktop (`>1024px`) | 3-4 kolom | Full menu | Full sidebar |

### 24.3 Interaction Patterns

- **Hover states** pada semua interactive elements
- **Focus visible** outline untuk keyboard navigation
- **Smooth scroll** (`scroll-behavior: smooth`)
- **Click feedback** pada buttons
- **Toast** untuk aksi berhasil/gagal
- **Modal** untuk konfirmasi destruktif (hapus data)
- **Skeleton loading** saat data dimuat

---

# 25. ACCESSIBILITY & SEO

### 25.1 Accessibility (A11y)

| Aspek | Implementasi |
|---|---|
| Semantic HTML | `<header>`, `<main>`, `<nav>`, `<footer>`, `<section>` |
| Focus management | `focus-visible` outline 2px solid primary |
| Alt text | Semua `<img>` memiliki alt text deskriptif |
| Color contrast | Primary text (#18313D) on white = WCAG AA compliant |
| Keyboard nav | Semua interactive elements focusable via Tab |
| ARIA labels | Pada icon-only buttons dan decorative elements |
| Language | `<html lang="id">` |
| Font scaling | rem-based sizing |

### 25.2 SEO

| Aspek | Implementasi |
|---|---|
| Metadata | `next/metadata` dengan title template, description, keywords |
| Title template | `%s \| Bahagia Medika` |
| Open Graph | `og:type`, `og:locale`, `og:site_name` |
| Structured data | Semantic headings hierarchy (h1 → h2 → h3) |
| Slug-based URLs | `/dokter/dr-amelia-putri`, `/layanan/klinik-anak` |
| Sitemap ready | Routing structure supports sitemap generation |

---

# 26. PERFORMANCE & LOADING STATES

### 26.1 Performance Optimizations

| Aspek | Implementasi |
|---|---|
| Font loading | `next/font` with `display: 'swap'` — no FOIT |
| Image optimization | Unsplash URLs dengan `w=` dan `fit=crop` params |
| Code splitting | Next.js App Router automatic per-route splitting |
| CSS optimization | Tailwind CSS — utility-first, tree-shaking |
| Lazy loading | Intersection Observer untuk animated sections |

### 26.2 Loading States

| State | Komponen | Behavior |
|---|---|---|
| Initial load | `CardSkeleton` | Shimmer animation placeholder |
| Data fetching | Skeleton grid | Jumlah skeleton = expected items |
| Button loading | Disabled + spinner | Saat submit form |
| Page transition | — | Next.js built-in |

### 26.3 Empty States

| Konteks | Pesan |
|---|---|
| Pencarian tanpa hasil | "Tidak ada dokter/layanan yang cocok dengan pencarian Anda" |
| Belum ada appointment | "Anda belum memiliki janji temu. Buat janji sekarang!" |
| Belum ada notifikasi | "Tidak ada notifikasi baru" |
| Belum ada chat | "Belum ada percakapan" |

### 26.4 Error States

| Konteks | Behavior |
|---|---|
| Data gagal dimuat | Retry button + error message |
| Form validation error | Inline error di bawah field + red border |
| Auth error | Toast error + pesan di form |
| 404 | Custom not-found page |

---

# 27. ANIMATION & MOTION SYSTEM

### 27.1 CSS Animations (Defined in `globals.css`)

| Animation | Class | Durasi | Penggunaan |
|---|---|---|---|
| Fade In | `.animate-fade-in` | 0.5s | General appear |
| Fade In Up | `.animate-fade-in-up` | 0.6s | Section scroll reveal |
| Fade In Down | `.animate-fade-in-down` | 0.5s | Dropdown, toast |
| Slide In Left | `.animate-slide-in-left` | 0.5s | Sidebar items |
| Slide In Right | `.animate-slide-in-right` | 0.5s | Chat messages |
| Scale In | `.animate-scale-in` | 0.3s | Modals, tooltips |
| Float | `.animate-float` | 3s infinite | Decorative floating elements |
| Pulse Glow | `.animate-pulse-glow` | 2s infinite | CTA attention |
| Gradient Shift | `.animate-gradient` | 4s infinite | Gradient banner |
| Shimmer | `.skeleton` | 1.2s infinite | Loading skeletons |

### 27.2 Interaction Animations

| Effect | Class | Behavior |
|---|---|---|
| Hover Lift | `.hover-lift` | `translateY(-2px)` + shadow on hover |
| Hover Glow | `.hover-glow` | Ring shadow on hover |
| Stagger Children | `.stagger-children` | Delay 80ms per child (up to 8) |
| Typing Indicator | `.typing-dot` | Bouncing dots (3x, staggered) |

### 27.3 Scroll-Triggered Animation

`AnimatedSection` component menggunakan `IntersectionObserver` (threshold: 0.1) untuk trigger `.animate-fade-in-up` saat section masuk viewport. Mendukung `delay` prop untuk stagger antar section.

---

# 28. MVP DEFINITION & DEVELOPMENT PRIORITY

### P0 — Must Have (MVP Core)

| # | Feature |
|---|---|
| 1 | Homepage dengan semua sections |
| 2 | Halaman Daftar Dokter + Detail Dokter |
| 3 | Halaman Daftar Layanan + Detail Layanan |
| 4 | Booking Appointment (multi-step flow) |
| 5 | Chatbot Widget (Medika Care) dengan keyword matching |
| 6 | Login/Register (simulated auth) |
| 7 | Patient Dashboard: Overview + Appointment list |
| 8 | Admin Dashboard: Overview + Manage Appointment |
| 9 | Responsive layout (mobile + desktop) |
| 10 | Design system: colors, typography, components |

### P1 — Should Have

| # | Feature |
|---|---|
| 1 | Halaman Fasilitas |
| 2 | Halaman Jadwal Dokter |
| 3 | Halaman Artikel + Detail |
| 4 | Halaman Berita + Detail |
| 5 | Halaman Tentang & Kontak |
| 6 | Dashboard: Riwayat, Chat CS, Notifikasi, Profil |
| 7 | Admin: CRUD Dokter, Layanan |
| 8 | Admin: Chat CS (view & reply) |
| 9 | Skeleton loading & empty states |
| 10 | Animation system |

### P2 — Nice to Have

| # | Feature |
|---|---|
| 1 | Admin: CRUD Artikel, Berita, Fasilitas |
| 2 | Admin: Kelola Pasien |
| 3 | Admin: Settings RS |
| 4 | Admin: Kelola Jadwal |
| 5 | Advanced chatbot intents |
| 6 | Testimonial section |
| 7 | Emergency CTA section |
| 8 | Location section |
| 9 | Dark mode (future) |

---

# 29. ACCEPTANCE CRITERIA

### 29.1 Kriteria Umum

| # | Kriteria | Status |
|---|---|---|
| AC-01 | Semua halaman publik accessible tanpa login | ☐ |
| AC-02 | Dashboard pasien hanya accessible setelah login sebagai patient | ☐ |
| AC-03 | Dashboard admin hanya accessible setelah login sebagai admin | ☐ |
| AC-04 | Redirect ke /login jika akses protected route tanpa auth | ☐ |
| AC-05 | Chatbot widget muncul di semua halaman | ☐ |
| AC-06 | Toast muncul di semua halaman (mounted di root) | ☐ |
| AC-07 | Responsive di 3 breakpoint (mobile, tablet, desktop) | ☐ |
| AC-08 | Semua link navigasi berfungsi | ☐ |
| AC-09 | Tidak ada console error di production | ☐ |

### 29.2 Kriteria Per Fitur

**Booking Appointment:**

| # | Kriteria |
|---|---|
| AC-B01 | User bisa memilih layanan dari daftar |
| AC-B02 | Dokter yang ditampilkan sesuai layanan terpilih |
| AC-B03 | Time slot sesuai jadwal dokter terpilih |
| AC-B04 | Form validasi error muncul saat field kosong |
| AC-B05 | Summary review menampilkan semua data yang diisi |
| AC-B06 | Appointment tersimpan di localStorage setelah submit |
| AC-B07 | Appointment muncul di dashboard pasien |

**Chatbot:**

| # | Kriteria |
|---|---|
| AC-C01 | Widget bisa dibuka dan ditutup |
| AC-C02 | Pesan sapaan muncul saat pertama dibuka |
| AC-C03 | Quick replies berfungsi (klik → kirim pesan) |
| AC-C04 | Bot merespons keyword "dokter" dengan doctor cards |
| AC-C05 | Bot merespons keyword "layanan" dengan service cards |
| AC-C06 | Bot merespons keyword "darurat" dengan emergency info |
| AC-C07 | Typing indicator muncul sebelum bot reply |
| AC-C08 | Chat auto-scroll ke pesan terbaru |

**Admin Dashboard:**

| # | Kriteria |
|---|---|
| AC-A01 | Stats card menampilkan data yang benar |
| AC-A02 | Grafik appointment 7 hari terrender |
| AC-A03 | Tabel data bisa di-search dan filter |
| AC-A04 | Modal form tambah/edit muncul dan berfungsi |
| AC-A05 | Konfirmasi hapus muncul sebelum delete |
| AC-A06 | Toast muncul setelah CRUD action |

---

# 30. DEVELOPMENT ROADMAP

### Phase 1: Foundation (Week 1-2)

- [x] Project setup (Next.js 16 + TypeScript + Tailwind 4)
- [x] Design system (colors, typography, globals.css)
- [x] Root layout (font, chatbot widget, toast container)
- [x] Type definitions (semua interfaces)
- [x] Mock data files (JSON)
- [x] Service layer pattern
- [x] UI primitives (Button, Modal, Skeleton, Toast)
- [x] Layout components (TopBar, Navbar, Footer)

### Phase 2: Public Pages (Week 2-4)

- [ ] Homepage (semua 13 sections)
- [ ] Halaman Dokter + Detail
- [ ] Halaman Layanan + Detail
- [ ] Halaman Fasilitas
- [ ] Halaman Jadwal
- [ ] Halaman Artikel + Detail
- [ ] Halaman Berita + Detail
- [ ] Halaman Tentang & Kontak
- [ ] Card components (semua 8 cards)

### Phase 3: Core Features (Week 4-6)

- [ ] Appointment Booking System (multi-step)
- [ ] Chatbot Widget (Medika Care)
- [ ] Simulated Auth (login/register)
- [ ] Zustand stores
- [ ] ProtectedRoute component

### Phase 4: Dashboards (Week 6-8)

- [ ] Patient Dashboard shell + overview
- [ ] Patient: Appointment list + detail
- [ ] Patient: Riwayat, Chat CS, Notifikasi, Profil
- [ ] Admin Dashboard shell + overview
- [ ] Admin: CRUD pages (semua 10 halaman)

### Phase 5: Polish (Week 8-10)

- [ ] Animation system lengkap
- [ ] Loading states (skeleton) di semua halaman
- [ ] Empty states & error states
- [ ] Responsive fine-tuning
- [ ] Accessibility audit
- [ ] SEO optimization
- [ ] Final testing & bug fixing

---

# LAMPIRAN A — ATURAN KONTEN & BATASAN MEDIS

### Batasan Konten

1. **Tidak boleh** memberikan diagnosis medis atau saran pengobatan spesifik
2. **Tidak boleh** menyebutkan harga layanan medis (karena bisa berubah dan sensitif)
3. **Tidak boleh** mengklaim hasil pengobatan tertentu
4. Semua konten medis bersifat **edukatif umum**, bukan pengganti konsultasi dokter
5. Chatbot harus selalu menyarankan **"Silakan konsultasikan langsung dengan dokter kami"** untuk pertanyaan medis spesifik

### Konten yang Diperbolehkan

- Informasi umum tentang spesialisasi dan layanan
- Jadwal praktik dokter
- Profil dan pendidikan dokter
- Artikel kesehatan edukatif (pencegahan, gaya hidup sehat)
- Informasi fasilitas dan kontak RS

---

# LAMPIRAN B — SIMULATED AUTHENTICATION

### Flow

```
1. User mengisi form login (email + password)
2. Frontend mencocokkan dengan preset credentials
3. Jika cocok: simpan user object ke localStorage + zustand store
4. Set isAuthenticated = true
5. Redirect ke dashboard sesuai role
6. Pada page refresh: cek localStorage, restore state
7. Logout: hapus dari localStorage + zustand, redirect ke /
```

### Preset Accounts

| Role | Email | Password | Name |
|---|---|---|---|
| Patient | `pasien@bahagiamedika.co.id` | `password123` | Sari Ramadhani |
| Admin | `admin@bahagiamedika.co.id` | `admin123` | Admin Bahagia Medika |

### ProtectedRoute Logic

```
if (!isAuthenticated) → redirect('/login')
if (isAuthenticated && user.role !== requiredRole) → redirect('/')
if (isAuthenticated && user.role === requiredRole) → render children
```

---

# LAMPIRAN C — CATATAN ORISINALITAS DESAIN

### Identitas Visual Bahagia Medika

- **Nama "Bahagia Medika"** — menggabungkan makna "kebahagiaan" dan "medis", mencerminkan pendekatan pelayanan yang mengutamakan kenyamanan pasien
- **Palet Teal** (#285F75) — dipilih karena asosiasinya dengan ketenangan, kepercayaan, dan kebersihan di konteks healthcare
- **Font Poppins** — geometric sans-serif yang friendly namun tetap profesional
- **Medika Care** — nama chatbot yang menyatukan identitas RS ("Medika") dengan misi peduli ("Care")
- **Tagline**: "Kesehatan Anda, Prioritas Kami"
- **Key Stats**: 25+ tahun, 120+ dokter, 30+ layanan, 50K+ pasien

---

> **Dokumen ini bersifat living document dan akan diperbarui seiring perkembangan produk.**
>
> **Terakhir diperbarui:** 11 September 2026
