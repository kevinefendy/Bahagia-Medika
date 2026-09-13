# PRODUCT REQUIREMENTS DOCUMENT (PRD)
## RS Nareva — Digital Healthcare Platform (Front-End Prototype)

**Nama Produk Fiktif:** RS Nareva
**Smart Care Assistant:** Nareva Care
**Versi Dokumen:** 2.0 — Full Digital Healthcare Platform (Front-End Only)
**Status:** Ready for Development (Front-End Prototype)
**Disusun untuk:** Tim Front-End Developer (React/Next.js)
**Scope:** 100% Front-End — mock data, local state, simulated interaction, no backend

> Dokumen ini ditulis selengkap dan sedetail mungkin agar dapat langsung dieksekusi oleh tim front-end tanpa ambiguitas — mencakup arsitektur data, state, routing, komponen, dan acceptance criteria di level implementasi, namun tetap murni front-end (tanpa backend/API/DB sungguhan).

---

# DAFTAR ISI

1. Product Overview
2. Product Vision
3. Problem Statement
4. Goals & Success Metrics
5. Target Users & Personas
6. User Roles & Permission Matrix
7. User Stories
8. User Journey Map
9. Sitemap
10. Information Architecture
11. Page List
12. Page Requirements
13. Feature Requirements (Global)
14. Smart Care Assistant (Chatbot)
15. Chat UI Components
16. Customer Service Chat (Simulasi)
17. Appointment UI (Booking Flow)
18. Patient Dashboard
19. Admin Dashboard
20. Component System
21. Design System
22. Responsive Design
23. Mock Data & Type Definitions
24. Frontend State Management
25. Routing
26. Folder Structure
27. UX Requirements
28. Accessibility
29. SEO
30. Performance
31. Loading State
32. Empty State
33. Error State
34. Modal System
35. Toast System
36. Global Search
37. Filter System
38. Animation & Motion
39. User Flow Utama
40. MVP Definition
41. Development Priority (P0/P1/P2)
42. Acceptance Criteria
43. Development Roadmap

Lampiran A — Aturan Konten & Batasan Medis
Lampiran B — Simulated Authentication
Lampiran C — Catatan Orisinalitas Desain

---

# 1. PRODUCT OVERVIEW

RS Nareva Digital Healthcare Platform adalah **prototype front-end** dari sebuah platform kesehatan digital rumah sakit fiktif, yang dirancang agar terasa seperti aplikasi rumah sakit modern sungguhan — bukan sekadar company profile statis.

Platform ini menggabungkan:

- **Website informasi rumah sakit** (dokter, layanan, fasilitas, artikel, berita, kontak).
- **Smart Care Assistant ("Nareva Care")** — chatbot navigasi & informasi berbasis mock response.
- **Simulasi Customer Service Chat** — kanal komunikasi manusia-ke-manusia yang disimulasikan.
- **Appointment Booking System** — alur booking multi-step end-to-end dengan dummy data.
- **Patient Dashboard** — area personal pasien (appointment, riwayat, chat, notifikasi, profil).
- **Admin Dashboard** — panel pengelolaan konten & data operasional (simulasi CRUD, tanpa backend).

Seluruh data, autentikasi, dan interaksi backend **disimulasikan sepenuhnya di sisi client** menggunakan mock data, React state, dan `localStorage` — tanpa server, API, atau database sungguhan. Namun arsitektur data & komponen dirancang **API-ready**, sehingga penggantian mock service dengan API nyata di masa depan tidak memerlukan perombakan struktur UI.

---

# 2. PRODUCT VISION

> **"Menghadirkan pengalaman digital rumah sakit yang terasa hidup, dapat dipercaya, dan mudah digunakan — di mana pasien merasa dibantu, bukan sekadar membaca informasi."**

Visi produk diterjemahkan menjadi 3 pilar pengalaman:

| Pilar | Deskripsi |
|---|---|
| **Guided, bukan sekadar informatif** | Pengguna dipandu (via Smart Care Assistant & CTA yang jelas) menuju tindakan yang mereka butuhkan, bukan dibiarkan mencari sendiri di antara banyak menu. |
| **Personal, bukan generik** | Pasien yang login memiliki ruang personal (dashboard) yang mencerminkan riwayat & kebutuhannya. |
| **Tenang & terpercaya, bukan ramai** | Visual healthcare yang bersih, whitespace cukup, tanpa elemen dekoratif berlebihan — sesuai konteks kesehatan yang sensitif. |

Produk ini **bukan** aplikasi diagnosis atau rekam medis — batasannya jelas didefinisikan di §14.2 dan Lampiran A.

---

# 3. PROBLEM STATEMENT

| Masalah Pengguna | Dampak | Solusi di Produk Ini |
|---|---|---|
| Pasien bingung harus mulai dari mana (dokter? layanan? IGD?) | Pasien menutup website tanpa tindakan | Smart Care Assistant sebagai "pemandu" percakapan sejak halaman pertama |
| Proses booking di website RS pada umumnya terasa panjang & membingungkan | Pasien memilih menelepon/datang langsung | Appointment flow 5–7 langkah dengan progress indicator yang jelas |
| Tidak ada tempat untuk melihat status/riwayat janji temu | Pasien lupa jadwal, datang di waktu salah | Patient Dashboard dengan Upcoming, History, Notification |
| Pertanyaan sederhana (jam operasional, lokasi klinik anak) harus mencari manual | Waktu tunggu jawaban lama, frustrasi | Chatbot quick-reply & FAQ-driven navigation |
| Tim rumah sakit kesulitan mengelola konten (dokter, jadwal, artikel) tanpa developer | Informasi di website menjadi usang | Admin Dashboard dengan CRUD simulasi yang siap dipetakan ke API nyata |

---

# 4. GOALS & SUCCESS METRICS

Karena produk ini adalah **prototype front-end tanpa backend/analytics sungguhan**, metrik keberhasilan bersifat **demonstrable capability** (dapat didemonstrasikan secara fungsional di browser), bukan metrik bisnis kuantitatif.

| # | Goal | Kriteria Terukur (Demonstrable) |
|---|------|-----------------------------------|
| G1 | User dapat menemukan & booking dokter tanpa bantuan eksternal | Flow Homepage → Dokter → Detail → Booking → Success dapat diselesaikan < 7 langkah |
| G2 | Smart Care Assistant dapat memandu navigasi | Chatbot dapat merespons minimal 6 skenario intent umum (§14) dengan mock response yang relevan |
| G3 | Pasien memiliki ruang personal yang persisten selama sesi | Data appointment/notifikasi/profil tersimpan di `localStorage` dan tetap ada setelah refresh |
| G4 | Admin dapat mensimulasikan pengelolaan konten | CRUD dokter/layanan/artikel/berita berhasil mengubah state UI tanpa reload/backend |
| G5 | Pengalaman mobile setara dengan desktop | Semua flow inti (booking, chat, dashboard) dapat diselesaikan 100% di viewport mobile |
| G6 | Struktur siap-API | Seluruh akses data melalui service layer (§24), bukan hardcode di komponen |

---

# 5. TARGET USERS & PERSONAS

### 5.1 Persona 1 — "Kevin" (Pasien Baru, Guest → Login)
- Usia 29 tahun, belum pernah ke RS Nareva.
- Butuh: dokter anak untuk keponakannya, tidak tahu jadwal, ingin booking cepat via HP.
- Perilaku: lebih suka bertanya ke chatbot daripada scroll banyak halaman.

### 5.2 Persona 2 — "Ibu Rina" (Keluarga Pasien, usia 45+)
- Kurang familiar dengan aplikasi kompleks.
- Butuh: teks besar, CTA jelas, tidak banyak istilah teknis.
- Perilaku: menelepon jika bingung — sehingga nomor telepon & IGD harus selalu terlihat.

### 5.3 Persona 3 — "Andi" (Pasien Lama, sudah Login)
- Sudah pernah booking sebelumnya, punya riwayat kunjungan.
- Butuh: reschedule cepat, melihat status appointment, chat dengan CS bila ada kendala.

### 5.4 Persona 4 — "Admin Sari" (Staf Rumah Sakit)
- Bertugas mengelola data dokter, jadwal, dan konten artikel/berita.
- Butuh: interface tabel yang jelas, form yang sederhana, tanpa perlu paham kode.

---

# 6. USER ROLES & PERMISSION MATRIX

> Catatan: Karena tidak ada backend, seluruh "permission" di bawah ini adalah **simulasi client-side** (route guard berbasis state login lokal) — bukan kontrol keamanan sungguhan. Tujuannya murni untuk mendemonstrasikan UX role-based.

| Fitur / Halaman | Guest | Patient (Login) | Admin (Login) |
|---|:---:|:---:|:---:|
| Homepage, Layanan, Dokter, Fasilitas, Artikel, Berita, Kontak | ✅ | ✅ | ✅ (opsional) |
| Smart Care Assistant (chatbot) | ✅ | ✅ | ❌ (tidak relevan) |
| Buat Janji (booking) | ✅ (harus isi data manual) | ✅ (data profil bisa auto-fill) | ❌ |
| Dashboard Pasien (`/dashboard/*`) | ❌ (redirect ke `/login`) | ✅ | ❌ |
| Customer Service Chat | ✅ (sebagai guest chat) | ✅ (dengan histori) | Dilihat via Admin Chat |
| Admin Dashboard (`/admin/*`) | ❌ | ❌ | ✅ |

Redirect rule (simulasi):
- Guest mengakses `/dashboard/*` → redirect ke `/login?redirect=/dashboard/...`
- Non-admin mengakses `/admin/*` → redirect ke `/login` atau tampilkan halaman 403 (mock).
- Setelah login sukses → redirect sesuai role (`patient` → `/dashboard`, `admin` → `/admin`).

---

# 7. USER STORIES

### 7.1 Guest
- Sebagai **pengunjung**, saya ingin melihat daftar dokter spesialis anak, agar saya bisa memilih dokter yang sesuai untuk keponakan saya.
- Sebagai **pengunjung**, saya ingin bertanya ke chatbot "cari dokter jantung", agar saya tidak perlu membuka halaman filter manual.
- Sebagai **pengunjung**, saya ingin melihat jam operasional & nomor IGD tanpa login, agar saya bisa segera menghubungi saat darurat.
- Sebagai **pengunjung**, saya ingin membuat janji temu tanpa harus registrasi akun terlebih dahulu, agar prosesnya cepat.
- Sebagai **pengunjung**, saya ingin membaca artikel kesehatan tentang nutrisi anak, agar saya mendapat informasi terpercaya.

### 7.2 Patient (Login)
- Sebagai **pasien**, saya ingin melihat appointment saya yang akan datang di dashboard, agar saya tidak lupa jadwal.
- Sebagai **pasien**, saya ingin mengubah jadwal (reschedule) appointment saya, agar saya tidak perlu membatalkan lalu booking ulang.
- Sebagai **pasien**, saya ingin membatalkan appointment dengan konfirmasi yang jelas, agar tidak salah klik.
- Sebagai **pasien**, saya ingin chat dengan Customer Service jika appointment saya bermasalah, agar mendapat bantuan cepat.
- Sebagai **pasien**, saya ingin melihat notifikasi pengingat H-1 sebelum appointment, agar saya siap datang tepat waktu.
- Sebagai **pasien**, saya ingin mengedit profil saya (nomor telepon, alamat), agar data saya selalu akurat.

### 7.3 Admin
- Sebagai **admin**, saya ingin melihat ringkasan statistik (total pasien, appointment hari ini), agar saya tahu kondisi operasional sekilas.
- Sebagai **admin**, saya ingin menambah/mengedit data dokter beserta jadwalnya, agar informasi dokter selalu up to date.
- Sebagai **admin**, saya ingin melihat & memfilter daftar appointment berdasarkan status, agar saya bisa menindaklanjuti yang pending.
- Sebagai **admin**, saya ingin mempublikasikan artikel/berita baru, agar konten edukasi selalu segar.
- Sebagai **admin**, saya ingin melihat daftar percakapan pasien dengan Customer Service, agar saya bisa memantau kualitas layanan.

---

# 8. USER JOURNEY MAP

### 8.1 Journey — Pasien Baru Membuat Janji (Guest → Success)

| Tahap | Aktivitas | Touchpoint | Emosi Target | Kebutuhan UI |
|---|---|---|---|---|
| Awareness | Membuka homepage dari pencarian Google/rekomendasi | Homepage | Ingin tahu, sedikit khawatir | Hero jelas, trust signal (statistik, akreditasi) |
| Consideration | Mencari dokter yang sesuai | `/dokter` atau Chatbot | Perlu kepastian | Filter jelas, jadwal terlihat langsung di card |
| Decision | Memilih dokter & jadwal | Detail Dokter | Yakin | CTA "Buat Janji" menonjol, jadwal real-time (dummy) |
| Action | Mengisi form booking | `/buat-janji` | Fokus, tidak boleh bingung | Stepper jelas, validasi ramah, sticky CTA di mobile |
| Confirmation | Melihat ringkasan & konfirmasi | Review step | Perlu kepastian ulang | Ringkasan lengkap, tombol Edit tersedia |
| Success & Retention | Melihat detail appointment, diarahkan ke dashboard/login | Success Page → Dashboard | Lega, dipercaya | Appointment ID, CTA lanjutan jelas |

### 8.2 Journey — Pasien Menggunakan Smart Care Assistant

| Tahap | Aktivitas | Emosi | Kebutuhan UI |
|---|---|---|---|
| Trigger | Klik floating button "💬 Tanya Nareva Care" | Penasaran | Widget terbuka cepat, non-intrusive |
| Greeting | Membaca sapaan & quick reply | Nyaman | Pilihan quick reply jelas, tidak perlu mengetik dulu |
| Query | Mengetik/klik kebutuhan | Terbantu | Respons cepat, tipe konten sesuai (DoctorCard, dsb.) |
| Guidance | Menerima rekomendasi & CTA | Yakin | CTA langsung menuju halaman terkait |
| Escalation (opsional) | Bertanya hal di luar batas chatbot (kondisi medis pribadi) | Perlu kepastian manusia | Respons umum + arahan konsultasi dokter/CS |

### 8.3 Journey — Admin Mengelola Data Dokter

| Tahap | Aktivitas | Kebutuhan UI |
|---|---|---|
| Login | Masuk ke `/admin` | Form sederhana, redirect otomatis ke dashboard |
| Navigasi | Membuka menu "Dokter" di sidebar | Sidebar jelas, active state |
| Aksi | Melihat tabel, klik "Tambah Dokter" | Modal form dengan validasi |
| Konfirmasi | Submit data baru | Toast sukses, tabel ter-update instan (state lokal) |

---

# 9. SITEMAP

```
PUBLIC
/
├── /tentang
├── /layanan
│   └── /layanan/[slug]
├── /dokter
│   └── /dokter/[slug]
├── /jadwal                        (Jadwal Dokter — tabel/kalender ringkas lintas dokter)
├── /fasilitas
├── /artikel
│   └── /artikel/[slug]
├── /berita
│   └── /berita/[slug]
├── /kontak
└── /buat-janji

AUTH (Simulated)
├── /login
└── /register

PATIENT (Protected — simulasi)
/dashboard
├── /dashboard                     (Overview)
├── /dashboard/appointment
│   └── /dashboard/appointment/[id]
├── /dashboard/riwayat
├── /dashboard/chat
│   ├── /dashboard/chat/assistant  (Nareva Care)
│   └── /dashboard/chat/cs         (Customer Service)
├── /dashboard/notification
└── /dashboard/profile

ADMIN (Protected — simulasi)
/admin
├── /admin                         (Overview/Statistik)
├── /admin/dokter
│   └── /admin/dokter/[id]         (Edit)
├── /admin/jadwal
├── /admin/layanan
│   └── /admin/layanan/[id]
├── /admin/appointment
│   └── /admin/appointment/[id]
├── /admin/pasien
│   └── /admin/pasien/[id]
├── /admin/chat
│   └── /admin/chat/[conversationId]
├── /admin/artikel
│   └── /admin/artikel/[id]
├── /admin/berita
│   └── /admin/berita/[id]
├── /admin/fasilitas
│   └── /admin/fasilitas/[id]
└── /admin/settings
```

Global overlay (muncul di semua halaman publik & dashboard pasien, kecuali admin):
- **Smart Care Assistant Widget** (floating button)
- **Emergency Access** (banner/floating button "Hubungi IGD")
- **Search Overlay** (trigger dari navbar)
- **Toast Container**
- **Modal Root**

---

# 10. INFORMATION ARCHITECTURE

Arsitektur informasi dibagi menjadi 4 layer akses:

```
Layer 1 — PUBLIC (tanpa login)
  Fokus: Trust, Discovery, Navigasi cepat ke booking

Layer 2 — CONVERSATIONAL (Smart Care + CS Chat)
  Fokus: Alternatif navigasi non-linear, guidance personal
  Tersedia di Layer 1 & 3 (floating, tidak menghalangi konten utama)

Layer 3 — PATIENT AREA (login diperlukan)
  Fokus: Personalisasi, status, riwayat, manajemen appointment

Layer 4 — ADMIN AREA (login admin diperlukan)
  Fokus: Operasional & pengelolaan konten (CRUD simulasi)
```

Prinsip navigasi:
1. **Semua jalan menuju booking** — dari homepage, dokter, layanan, maupun chatbot, CTA "Buat Janji" selalu dapat dijangkau ≤ 2 klik.
2. **Chatbot sebagai jalan pintas, bukan pengganti** — seluruh kemampuan chatbot juga tersedia via navigasi biasa (tidak ada fitur yang HANYA bisa diakses via chatbot).
3. **Dashboard & Admin terpisah total secara layout** — dashboard pasien memakai shell "sidebar + topbar konsumen", admin memakai shell "sidebar + topbar operasional" yang secara visual dapat dibedakan (lihat §21).

---

# 11. PAGE LIST

| # | Halaman | Route | Akses | Prioritas |
|---|---|---|---|---|
| 1 | Homepage | `/` | Semua | P0 |
| 2 | Tentang Kami | `/tentang` | Semua | P1 |
| 3 | Layanan | `/layanan` | Semua | P0 |
| 4 | Detail Layanan | `/layanan/[slug]` | Semua | P1 |
| 5 | Dokter | `/dokter` | Semua | P0 |
| 6 | Detail Dokter | `/dokter/[slug]` | Semua | P0 |
| 7 | Jadwal Dokter | `/jadwal` | Semua | P1 |
| 8 | Fasilitas | `/fasilitas` | Semua | P1 |
| 9 | Artikel | `/artikel` | Semua | P1 |
| 10 | Detail Artikel | `/artikel/[slug]` | Semua | P1 |
| 11 | Berita | `/berita` | Semua | P1 |
| 12 | Detail Berita | `/berita/[slug]` | Semua | P1 |
| 13 | Kontak | `/kontak` | Semua | P0 |
| 14 | Buat Janji | `/buat-janji` | Semua | P0 |
| 15 | Login | `/login` | Guest | P0 |
| 16 | Register | `/register` | Guest | P0 |
| 17 | Dashboard Overview | `/dashboard` | Patient | P0 |
| 18 | Dashboard Appointment | `/dashboard/appointment` | Patient | P0 |
| 19 | Dashboard Appointment Detail | `/dashboard/appointment/[id]` | Patient | P0 |
| 20 | Dashboard Riwayat | `/dashboard/riwayat` | Patient | P1 |
| 21 | Dashboard Chat | `/dashboard/chat` | Patient | P0 |
| 22 | Dashboard Notification | `/dashboard/notification` | Patient | P1 |
| 23 | Dashboard Profile | `/dashboard/profile` | Patient | P1 |
| 24 | Admin Overview | `/admin` | Admin | P1 |
| 25 | Admin Dokter | `/admin/dokter` | Admin | P1 |
| 26 | Admin Jadwal | `/admin/jadwal` | Admin | P1 |
| 27 | Admin Layanan | `/admin/layanan` | Admin | P2 |
| 28 | Admin Appointment | `/admin/appointment` | Admin | P1 |
| 29 | Admin Pasien | `/admin/pasien` | Admin | P2 |
| 30 | Admin Chat | `/admin/chat` | Admin | P1 |
| 31 | Admin Artikel | `/admin/artikel` | Admin | P2 |
| 32 | Admin Berita | `/admin/berita` | Admin | P2 |
| 33 | Admin Fasilitas | `/admin/fasilitas` | Admin | P2 |
| 34 | Admin Settings | `/admin/settings` | Admin | P2 |


---

# 12. PAGE REQUIREMENTS

Setiap halaman dijelaskan dalam format: **Tujuan → Struktur Konten → Interaksi → State → Acceptance Note singkat.** Acceptance criteria lengkap per fitur besar ada di §42.

## 12.1 Homepage (`/`) — P0

**Tujuan:** Titik masuk utama; membangun trust dalam 3 detik pertama & mengarahkan ke 3 aksi utama (cari dokter, buat janji, tanya Nareva Care).

**Struktur (urut top-to-bottom):**
1. Top Bar tipis — jam operasional & nomor IGD (selalu terlihat, non-sticky, hilang saat scroll di mobile untuk hemat ruang).
2. Navbar (sticky on scroll — lihat §13.1).
3. Hero — headline, subheadline, Smart Care input bar, CTA utama & sekunder.
4. Quick Actions — 6 shortcut (Cari Dokter, Buat Janji, Jadwal Dokter, Layanan, Fasilitas, Kontak).
5. Smart Care Assistant highlight — banner kecil memperkenalkan chatbot bagi user yang belum sadar fiturnya ada.
6. Layanan Unggulan — 4–6 `ServiceCard`.
7. Cari Dokter — search bar + 3–4 `DoctorCard` unggulan.
8. Jadwal Dokter Hari Ini — list ringkas dokter yang praktik hari ini (dummy tanggal berjalan).
9. Fasilitas — grid visual 4–6 item.
10. Tentang Rumah Sakit — ringkasan singkat + statistik (20+ tahun, 100+ dokter, dst).
11. Artikel Kesehatan — 3 `ArticleCard` terbaru.
12. Berita — 3 `NewsCard` terbaru.
13. Testimoni — carousel 3–5 testimoni.
14. Emergency CTA — banner mencolok namun tidak "menakut-nakuti", CTA "Hubungi IGD".
15. Lokasi — peta placeholder + alamat singkat.
16. Footer.

**Interaksi:**
- Smart Care input di hero: mengetik lalu Enter → membuka widget chatbot dengan pesan tersebut sebagai first message.
- Semua card di section homepage bersifat preview (maks. jumlah tetap) — "Lihat Semua" mengarah ke halaman penuh (`/dokter`, `/layanan`, dst).

**State:** loading skeleton untuk section Dokter/Layanan/Artikel/Berita (simulasi delay 300–800ms), tidak ada empty state di homepage (data unggulan selalu di-hardcode dari mock terkurasi).

## 12.2 Tentang Kami (`/tentang`) — P1

Section: Profil, Sejarah (timeline sederhana), Visi, Misi, Nilai (grid ikon+teks), Keunggulan, Statistik (4 angka besar: tahun berdiri, jumlah dokter, jumlah layanan, jumlah pasien — dummy), Sertifikasi/Akreditasi (badge grid).

## 12.3 Layanan (`/layanan`) — P0

- Search by nama layanan.
- Filter kategori (opsional: Rawat Jalan, Rawat Inap, Penunjang Medis).
- Grid `ServiceCard` (icon, nama, deskripsi singkat, CTA "Lihat Detail").
- State: loading skeleton, empty ("Layanan tidak ditemukan."), error dengan tombol retry.

## 12.4 Detail Layanan (`/layanan/[slug]`) — P1

Hero (nama + gambar), Deskripsi, Keunggulan (bullet/grid), Fasilitas terkait (`FacilityCard` mini), Dokter terkait (`DoctorCard` mini, max 3 + "Lihat Semua"), FAQ (`Accordion`), CTA sticky "Buat Janji" (mobile: sticky bottom bar).

## 12.5 Dokter (`/dokter`) — P0

- **Search**: nama dokter (debounced, 300ms).
- **Filter**: Spesialisasi (multi-select chip), Hari Praktik (chip), Lokasi/Cabang (select), Ketersediaan (toggle "Tersedia Hari Ini").
- **Sort**: Nama A-Z, Paling Relevan (default), Jadwal Terdekat.
- Grid `DoctorCard` responsive (4 kolom desktop → 1 kolom mobile).
- Pagination atau "Muat Lebih Banyak" (infinite load sederhana, mock).
- State: skeleton (6 card placeholder), empty (`EmptyState` dengan CTA "Reset Filter"), error (`ErrorState` retry).

## 12.6 Detail Dokter (`/dokter/[slug]`) — P0

Breadcrumb (`Beranda / Dokter / [Nama]`), Foto besar, Nama & gelar, Spesialisasi (badge), Pendidikan (list), Pengalaman (tahun + ringkasan), **Jadwal Praktik** (tabel per hari dengan jam & lokasi, hari tanpa jadwal ditandai abu-abu "Tidak Praktik"), Lokasi Praktik (alamat cabang), Layanan Terkait (chip/list link ke `/layanan/[slug]`), FAQ singkat (opsional), CTA utama "Buat Janji" (sticky di mobile), CTA sekunder "Tanya Nareva Care tentang dokter ini" (membuka chatbot dengan context dokter).

**Batasan konten:** tidak menampilkan ulasan pasien individual dengan nama lengkap asli/foto pasien (gunakan rating agregat + testimoni anonim bila diperlukan). Tidak ada data medis sensitif.

## 12.7 Jadwal Dokter (`/jadwal`) — P1

Tampilan tabel/kalender ringkas lintas dokter — kolom hari (Senin–Minggu), baris dokter, sel berisi jam praktik atau "-". Filter spesialisasi. Klik jam → membuka Detail Dokter dengan hari tersebut ter-highlight. Berguna sebagai halaman "at a glance" tanpa perlu membuka satu-satu detail dokter.

## 12.8 Fasilitas (`/fasilitas`) — P1

Grid galeri (2–3 kolom desktop, 1 kolom mobile): gambar, nama, deskripsi singkat. Klik card → modal/lightbox dengan galeri gambar tambahan (dummy, 2–3 foto) + deskripsi lebih panjang.

## 12.9 Artikel (`/artikel`) — P1

Search, filter kategori (chip: Kesehatan, Tips, Nutrisi, Anak, Jantung, Mental Health, Gaya Hidup), 1 Featured Article (card besar), grid `ArticleCard`, Pagination (page number, bukan infinite scroll — agar konsisten dengan konten edukasi yang dibaca serius).

## 12.10 Detail Artikel (`/artikel/[slug]`) — P1

Judul, author (nama + badge "Tim Redaksi Kesehatan" — bukan klaim dokter spesifik kecuali memang ditulis dummy dokter), tanggal, kategori, featured image, isi artikel (rich text mock), Related Articles (3 card), Share button (copy link + share ke WhatsApp mock).

## 12.11 Berita (`/berita`) — P1

Filter tipe (Event, Pengumuman, Program Kesehatan, Kerja Sama, Prestasi), grid `NewsCard`, pagination.

## 12.12 Detail Berita (`/berita/[slug]`) — P1

Struktur sama seperti Detail Artikel, tanpa kategori kesehatan (pakai tipe berita).

## 12.13 Kontak (`/kontak`) — P0

Alamat, telepon, email, WhatsApp (tombol `wa.me` mock), jam operasional, IGD (badge "24 Jam" mencolok warna emergency), map placeholder (`<div>` bergambar peta statis atau iframe placeholder), Form Kontak (Nama, Email, No. Telepon, Subjek, Pesan). Submit → validasi client → simulasi delay 800ms → tampilkan pesan sukses inline **dan** toast "Pesan berhasil dikirim." → reset form.

## 12.14 Buat Janji (`/buat-janji`) — P0

Lihat detail lengkap di §17 (Appointment UI).

## 12.15 Login (`/login`) — P0

Logo, headline "Selamat Datang Kembali", Input Email, Input Password (toggle show/hide), CTA "Masuk", link "Lupa Password?" (mock — tampilkan modal info "Fitur ini akan tersedia setelah integrasi backend."), link ke `/register`.

**Simulated credential** (lihat Lampiran B): `user@example.com` / `password123` → role `patient`. `admin@example.com` / `admin123` → role `admin`.

State: loading (button spinner saat submit), error ("Email atau password salah.") jika kredensial tidak cocok dummy.

## 12.16 Register (`/register`) — P0

Form: Nama, Email, No. Telepon, Password, Confirm Password. Validasi: email format, password ≥ 8 karakter, confirm password match. Submit → simulasi delay → toast "Akun berhasil dibuat." → redirect ke `/login` (atau langsung ke `/dashboard` sesuai keputusan tim, PRD merekomendasikan **redirect ke `/login`** agar flow autentikasi tetap konsisten & dapat didemonstrasikan dua kali).

## 12.17 Dashboard Overview (`/dashboard`) — P0

Lihat detail di §18.1

## 12.18 Dashboard Appointment (`/dashboard/appointment`) — P0

Lihat detail di §18.2

## 12.19 Dashboard Appointment Detail (`/dashboard/appointment/[id]`) — P0

Lihat detail di §18.3

## 12.20 Dashboard Riwayat (`/dashboard/riwayat`) — P1

List appointment dengan status `Completed` atau `Cancelled` (histori). Setiap item dapat diklik untuk melihat detail (read-only, tanpa aksi reschedule/cancel). Filter rentang tanggal (opsional P2).

## 12.21 Dashboard Chat (`/dashboard/chat`) — P0

Lihat detail di §16

## 12.22 Dashboard Notification (`/dashboard/notification`) — P1

Lihat detail di §18.5

## 12.23 Dashboard Profile (`/dashboard/profile`) — P1

Lihat detail di §18.6

## 12.24–12.34 Admin Pages

Lihat detail lengkap di §19 (Admin Dashboard).

---

# 13. FEATURE REQUIREMENTS (GLOBAL)

## 13.1 Navbar

**Desktop (≥1024px):**
```
[Logo]   Beranda  Tentang  Layanan  Dokter  Fasilitas  Informasi ▾  Kontak      [🔍] [Buat Janji] [Login]
```
- "Informasi ▾" adalah dropdown berisi: Artikel, Berita, Jadwal Dokter.
- Jika user sudah login (patient): tombol `[Login]` diganti `[Avatar ▾]` dengan dropdown (Dashboard, Notification badge, Logout).
- Jika user login sebagai admin: navbar publik tetap tampil, namun avatar dropdown menampilkan tautan "Masuk ke Admin Panel".

**Tablet (768–1023px):** menu utama dipadatkan menjadi ikon + label pendek, "Informasi" & "Fasilitas" masuk ke dropdown "Lainnya". CTA "Buat Janji" tetap solid & terlihat.

**Mobile (<768px):**
```
[Logo]                              [🔍] [☰]
```
- Klik `☰` membuka **drawer full-height** dari kanan berisi: seluruh menu (accordion untuk "Informasi"), CTA "Buat Janji" (full width, di atas), tombol Login/Avatar, dan Emergency contact di bagian paling bawah drawer (selalu terlihat tanpa scroll jika memungkinkan).

**Scroll behavior:** navbar sticky top; setelah scroll > 80px, tinggi navbar mengecil (`py-4` → `py-2`), shadow muncul (`shadow-sm`), Top Bar (jam operasional) disembunyikan (mobile) atau tetap ada tapi lebih tipis (desktop).

**Menu dibuka (mobile):** body scroll di-lock, overlay gelap transparan di belakang drawer, drawer dapat ditutup via tombol X, tap overlay, atau tombol back (opsional).

## 13.2 Emergency Access (Global)

- **Desktop:** disematkan di Top Bar & Navbar (teks + nomor telepon, `tel:` link).
- **Mobile:** floating action button warna `--color-error`, posisi kanan-bawah (di atas Smart Care widget bila keduanya aktif — lihat aturan stacking di §13.4), ikon telepon, dapat di-tap untuk membuka mini-sheet: "Butuh bantuan darurat? [Hubungi IGD] [Batal]".
- Emergency **tidak boleh** menutupi CTA utama halaman (booking, submit form) — gunakan posisi offset & z-index terkelola.

## 13.3 Global Search

- Trigger: ikon 🔍 di navbar (semua breakpoint) → membuka **Search Overlay** full-screen (mobile) atau modal terpusat (desktop).
- Input dengan debounce 300ms, hasil dikelompokkan per kategori: **Dokter, Layanan, Artikel, Berita, Fasilitas** (maks. 3 hasil per kategori + "Lihat semua hasil untuk '...'").
- State: idle (menampilkan "Pencarian Populer": chip seperti "dokter anak", "jam operasional", "IGD"), loading (skeleton per kategori), hasil ditemukan, empty ("Tidak ditemukan hasil untuk \"...\". Coba kata kunci lain atau tanya Nareva Care.") — empty state secara sengaja mengarahkan ke chatbot sebagai fallback.

## 13.4 Widget Stacking Rule (Floating Elements)

Untuk menghindari tumpang tindih antar elemen floating di mobile:

| Prioritas Posisi (kanan-bawah, dari bawah ke atas) | Elemen |
|---|---|
| 1 (paling bawah) | Sticky CTA halaman (jika ada, mis. "Buat Janji" di Detail Dokter) |
| 2 | Emergency Button |
| 3 | Smart Care Assistant Button |

Jarak antar elemen minimal 12px. Jika sticky CTA halaman aktif, Smart Care & Emergency button digeser ke atas (bukan ditumpuk/hilang).

## 13.5 Footer

Kolom: Tentang Singkat + Logo, Navigasi Cepat (Layanan, Dokter, Fasilitas), Informasi (Artikel, Berita, Karir — dummy), Kontak (alamat, telepon, email, sosial media icon), Copyright + link Kebijakan Privasi/Syarat Ketentuan (halaman dummy sederhana, P2). Mobile: setiap kolom menjadi accordion collapsible untuk menghemat ruang scroll.

---

# 14. SMART CARE ASSISTANT (CHATBOT "NAREVA CARE")

## 14.1 Tujuan & Prinsip Desain

Nareva Care adalah **asisten navigasi & informasi**, bukan asisten medis. Prinsip desain:

1. **Guided, bukan open-ended AI** — respons berbasis intent matching sederhana (keyword/rule-based mock), bukan LLM sungguhan (karena front-end only). Namun UX-nya harus terasa natural.
2. **Selalu punya jalan keluar (fallback)** — jika intent tidak dikenali, chatbot menawarkan quick reply umum + opsi "Hubungi Customer Service".
3. **Transparan soal batasannya** — chatbot secara eksplisit menyatakan diri sebagai asisten navigasi, bukan pengganti dokter (lihat §14.2).

## 14.2 Batasan & Guardrail (WAJIB)

Chatbot **TIDAK BOLEH**:
- Memberikan diagnosis atau menyebut kemungkinan penyakit tertentu berdasarkan gejala yang disebutkan user.
- Merekomendasikan obat, dosis, atau kombinasi obat.
- Menyatakan "Anda kemungkinan menderita X" dalam bentuk apa pun.
- Menggantikan keputusan klinis dokter.

**Alur guardrail (mock, berbasis keyword detection sederhana):**

| Kategori Input User | Contoh Kata Kunci (mock detection) | Respons Chatbot |
|---|---|---|
| Pertanyaan navigasi/informasi umum | "dokter", "jadwal", "layanan", "lokasi", "buat janji" | Diproses normal via intent matching (§14.4) |
| Pertanyaan kondisi medis pribadi | "saya sakit", "gejala", "kenapa saya", "apakah saya" | Respons umum: *"Saya tidak dapat memberikan diagnosis. Untuk keluhan kesehatan yang Anda alami, sebaiknya konsultasikan langsung dengan dokter kami."* + CTA `[Cari Dokter]` `[Buat Janji]` |
| Indikasi darurat | "sesak napas", "kecelakaan", "pingsan", "darurat", "tidak sadar" | Menampilkan **Emergency Card** (lihat §15.4) segera, tanpa basa-basi tambahan: *"Ini terdengar seperti kondisi darurat. Segera hubungi IGD kami."* + CTA `[Hubungi IGD]` |
| Di luar topik rumah sakit | pertanyaan acak tidak relevan | *"Maaf, saya hanya dapat membantu seputar informasi dan layanan RS Nareva. Ada yang bisa saya bantu terkait dokter, layanan, atau janji temu?"* |

> Guardrail ini disimulasikan di front-end dengan pencocokan keyword sederhana pada fungsi `detectIntent(message: string)`. Untuk versi produksi dengan AI sungguhan, guardrail ini harus diperkuat di sisi backend/model — namun **desain UX-nya (bagaimana batasan ditampilkan ke user) sudah final dan tidak berubah.**

## 14.3 Entry Point

1. **Floating Button** — tersedia di semua halaman publik & dashboard pasien (tidak di admin). Label: `💬 Tanya Nareva Care`. Badge notifikasi kecil muncul sekali di kunjungan pertama ("Baru!") lalu hilang setelah widget pernah dibuka (disimpan di `localStorage`).
2. **Hero Input** (Homepage) — mengetik di Smart Care input bar hero langsung membuka widget dengan pesan pertama.
3. **Contextual Trigger** — tombol "Tanya Nareva Care tentang dokter ini" di Detail Dokter → membuka widget dengan context (nama dokter) sudah ter-load, pesan pembuka otomatis: *"Anda sedang melihat profil Dr. [Nama]. Ada yang ingin ditanyakan?"*

## 14.4 Intent yang Didukung (Mock Intent Matching)

| # | Intent | Contoh Trigger User | Respons & UI |
|---|---|---|---|
| 1 | Cari Dokter | "cari dokter anak", "dokter jantung", klik quick reply `[Cari Dokter]` | Teks singkat + 2–3 `DoctorCard` (filter mock sesuai spesialisasi terdeteksi) + quick reply `[Lihat Semua Dokter]` |
| 2 | Cari Layanan | "layanan MCU", "ada radiologi?" | Teks + `ServiceCard` terkait + CTA `[Lihat Detail]` |
| 3 | Cek Jadwal | "jadwal dr. Siti", "jam praktik hari senin" | `ScheduleCard` menampilkan slot hari terkait |
| 4 | Buat Janji | "mau buat janji", klik `[Buat Janji]` | Teks konfirmasi + tombol yang mengarahkan ke `/buat-janji` (atau memulai mini-flow booking di dalam chat — opsional P2, lihat §14.6) |
| 5 | Info Fasilitas | "ada ruang VIP?", "fasilitas apa saja" | Teks + `FacilityCard` ringkas |
| 6 | Info Rumah Sakit | "jam operasional", "alamat RS", "nomor telepon" | Teks jawaban langsung dari `HospitalInfo` mock |
| 7 | Emergency | lihat §14.2 | `EmergencyCard` |
| 8 | Kondisi medis pribadi | lihat §14.2 | Respons umum + arahan |
| 9 | Tidak dikenali (fallback) | input acak | Respons fallback + quick reply umum |

## 14.5 Struktur Percakapan (Contoh Skrip)

```
User   : Saya ingin mencari dokter anak.
Nareva : Tentu, berikut beberapa dokter spesialis anak yang tersedia:
         [DoctorCard: Dr. Amelia Putri — Spesialis Anak — Senin-Jumat 09.00-14.00]
         [DoctorCard: Dr. Bagus Santoso — Spesialis Anak — Selasa & Kamis 13.00-17.00]
         Ingin melihat dokter lainnya atau langsung membuat janji?
         [Lihat Semua Dokter Anak]  [Buat Janji dengan Dr. Amelia]

User   : Buat janji dengan Dr. Amelia
Nareva : Baik, saya arahkan Anda ke halaman Buat Janji dengan Dr. Amelia Putri sudah terpilih.
         [Lanjutkan ke Buat Janji →]
```

## 14.6 Deep-link ke Booking dari Chat (Handoff, bukan mini-flow penuh — P1)

Untuk MVP, chatbot **tidak** menjalankan seluruh 7-step booking di dalam jendela chat (kompleksitas UI chat terbatas). Sebagai gantinya, chatbot melakukan **handoff terarah**: begitu user memilih dokter di dalam chat, klik CTA akan membuka `/buat-janji` dengan **state awal ter-prefill** (spesialisasi & dokter sudah terpilih, langsung ke Step 3: Pilih Tanggal). Ini menjaga kompleksitas UI tetap rendah namun tetap terasa "pintar".

> P2 (opsional pengembangan lanjutan): mini-flow pemilihan tanggal & jam langsung di dalam chat menggunakan `ScheduleCard` interaktif tanpa berpindah halaman.

## 14.7 Quick Reply

Quick reply berubah kontekstual sesuai tahap percakapan:

- **Awal (belum ada context):** `[Cari Dokter]` `[Cari Layanan]` `[Cek Jadwal]` `[Buat Janji]` `[Lokasi Rumah Sakit]` `[Kontak]`
- **Setelah menampilkan DoctorCard:** `[Lihat Semua Dokter]` `[Buat Janji]` `[Cari Spesialisasi Lain]`
- **Setelah Emergency Card:** `[Hubungi IGD]` `[Kembali ke Menu]`
- **Fallback:** `[Cari Dokter]` `[Hubungi Customer Service]`

## 14.8 Chat History (Nareva Care)

- Disimpan per sesi di `localStorage` key `nareva_chat_history`.
- User dapat: melanjutkan percakapan sebelumnya (auto-load saat widget dibuka), memulai percakapan baru (tombol "+ Percakapan Baru" — mengarsipkan histori lama), menghapus riwayat (`Hapus Riwayat Chat` di menu widget, dengan modal konfirmasi).
- Riwayat ditampilkan sebagai list percakapan di **Dashboard Chat** (`/dashboard/chat`) khusus untuk user yang login; untuk guest, riwayat hanya tersedia dalam sesi browser (localStorage), tanpa daftar percakapan multi-sesi.


---

# 15. CHAT UI COMPONENTS

## 15.1 ChatbotWidget (Floating)

**Desktop:**
```
┌─────────────────────────────────┐
│ ● Nareva Care              ×    │   <- header: avatar/icon, nama, status "online" (mock), close
├─────────────────────────────────┤
│  [ChatWindow — scrollable]      │
│                                  │
│  Halo! 👋 Ada yang bisa saya    │
│  bantu?                         │
│                                  │
│  [Cari Dokter] [Cari Layanan]   │
│  [Cek Jadwal]  [Buat Janji]     │
│                                  │
├─────────────────────────────────┤
│ [ChatInput] Ketik pertanyaan… ➤ │
└─────────────────────────────────┘
```
Dimensi: 380×560px, posisi fixed kanan-bawah, elevasi shadow tinggi, animasi muncul `scale+fade` 200ms.

**Mobile:** full-screen sheet (slide up dari bawah) atau bottom-sheet 85% tinggi layar dengan handle drag-to-dismiss di atas. Header tetap ada dengan tombol close (X) — bukan hanya swipe, agar accessible.

## 15.2 ChatWindow & ChatBubble

- Bubble user: rata kanan, warna `--color-primary` (teks putih).
- Bubble bot: rata kiri, warna `--color-surface` (teks `--color-text-primary`), avatar kecil Nareva Care di samping bubble pertama tiap grup pesan.
- **Typing indicator**: 3 dot animasi muncul 500–1000ms sebelum bot merespons (simulasi "berpikir"), agar interaksi terasa hidup bukan instan-robotic.
- Auto-scroll ke bawah setiap pesan baru muncul, kecuali user sedang scroll ke atas membaca histori (deteksi scroll position untuk tidak memaksa auto-scroll).

## 15.3 Rich Message Types (dirender di dalam ChatWindow)

### a. Text Message
Bubble teks biasa, mendukung line-break & emoji.

### b. Doctor Card (dalam chat)
```
┌───────────────────────────┐
│ [Foto]  Dr. Nama Dokter    │
│         Spesialis Anak     │
│         Senin-Jumat        │
│         09.00-14.00        │
│  [Lihat Profil][Buat Janji]│
└───────────────────────────┘
```
Versi ringkas dari `DoctorCard` biasa, dioptimalkan untuk lebar chat (280–320px).

### c. Service Card (dalam chat)
Icon, nama layanan, deskripsi 1 baris, tombol `[Lihat Detail]`.

### d. Schedule Card (dalam chat)
```
┌───────────────────────────┐
│ Jadwal Dr. Nama — Senin    │
│ [09.00] [10.00] [11.00]    │
│ (slot penuh: abu-abu,      │
│  disabled)                 │
└───────────────────────────┘
```
Klik salah satu jam → handoff ke `/buat-janji` dengan tanggal & jam ter-prefill.

### e. Emergency Card
```
┌───────────────────────────┐
│  ⚠ Apakah Anda membutuhkan │
│    bantuan darurat?        │
│                            │
│   [ Hubungi IGD ]          │  <- warna --color-error, solid
└───────────────────────────┘
```

## 15.4 ChatInput

- Textarea auto-grow (maks 4 baris sebelum scroll internal).
- Tombol kirim (➤) disabled saat input kosong.
- Sticky di bagian bawah widget/sheet — **wajib selalu terlihat tanpa perlu scroll**, khususnya di mobile (lihat §22.6).
- Enter untuk kirim (desktop), tombol kirim eksplisit di mobile (agar tidak konflik dengan keyboard newline).

## 15.5 QuickReply Component

Baris tombol pill/chip di bawah pesan bot, horizontal-scrollable jika jumlah opsi banyak (mobile), wrap ke baris baru (desktop).

---

# 16. CUSTOMER SERVICE CHAT (SIMULASI)

## 16.1 Tujuan

Menyediakan **kanal eskalasi manusia** yang terasa nyata — untuk kasus yang tidak bisa diselesaikan Nareva Care (mis. komplain, pertanyaan spesifik appointment). Sepenuhnya simulasi (mock response terjadwal), tidak ada agent sungguhan.

## 16.2 Entry Point

- Tombol `[Hubungi Customer Service]` di dalam ChatbotWidget (muncul sebagai quick reply fallback, atau opsi menu widget "☰ → Hubungi Customer Service").
- Menu "Chat" di Dashboard Pasien (`/dashboard/chat`) — tab terpisah "Nareva Care" vs "Customer Service".

## 16.3 Layout (Desktop — dalam Dashboard)

```
┌─────────────────┬─────────────────────────┐
│ Percakapan       │ Customer Service         │
│                 │  ● Online (mock)          │
│ ● Appointment    ├─────────────────────────┤
│   Support        │                         │
│   2 min lalu     │  [ChatWindow]           │
│                 │                         │
│ ○ Pertanyaan     │  Halo Kevin, ada yang   │
│   Layanan        │  bisa kami bantu terkait│
│   Selesai        │  appointment Anda?      │
│                 │                         │
│                 ├─────────────────────────┤
│                 │ Ketik pesan…        ➤  │
└─────────────────┴─────────────────────────┘
```

Mobile: layout 1 kolom — list percakapan → tap → full-screen chat view dengan tombol back.

## 16.4 Mock Response Behavior

- Response CS disimulasikan dengan delay lebih lama dari chatbot (1.5–3 detik) + typing indicator, untuk membedakan kesan "manusia mengetik" vs "bot instan".
- Skrip mock terbatas namun kontekstual: jika conversation context = "Appointment Support" dan user menyebut kata "reschedule"/"batal", respons mock mengarahkan ke `/dashboard/appointment` dengan instruksi langkahnya.
- Jika tidak ada pola yang cocok, respons default CS: *"Terima kasih atas pesan Anda. Tim kami akan segera membantu. Sementara itu, apakah ada informasi appointment yang ingin Anda ketahui?"*

## 16.5 Status Badge

- Conversation list menampilkan status: `Aktif` (dot hijau), `Selesai` (dot abu-abu), `Menunggu` (dot kuning) — murni dekoratif/mock untuk kesan realistis.

## 16.6 Guest Access

Guest (belum login) tetap dapat memulai CS chat dari widget floating (tanpa histori tersimpan lintas sesi kecuali via `localStorage` sesi berjalan). Saat guest mencoba membuka `/dashboard/chat` secara langsung → redirect ke `/login`.

---

# 17. APPOINTMENT UI (BOOKING FLOW)

## 17.1 Struktur Multi-Step

```
01 Layanan → 02 Dokter → 03 Tanggal → 04 Jadwal → 05 Data Pasien → 06 Review → 07 Success
```

Progress indicator horizontal di desktop (nomor + label, step aktif ter-highlight `--color-primary`, step selesai bercentang ✓, step belum aktif abu-abu). Di mobile, progress indicator disederhanakan menjadi progress bar tipis + label step aktif saja (mis. "Langkah 3 dari 7 — Pilih Tanggal") untuk menghemat ruang vertikal.

> Catatan: bila user datang dari Detail Dokter (CTA "Buat Janji"), Step 1–2 (Layanan & Dokter) sudah ter-prefill dan ditampilkan sebagai ringkasan collapsed yang bisa diklik untuk diubah — user langsung diarahkan ke Step 3.

## 17.2 Step 1 — Pilih Layanan

Grid `ServiceCard` versi seleksi (radio-style card, border highlight saat dipilih). Tombol "Lanjutkan" aktif setelah 1 layanan dipilih.

## 17.3 Step 2 — Pilih Dokter

List `DoctorCard` versi seleksi, difilter otomatis berdasarkan layanan/spesialisasi dari Step 1. Search dokter tetap tersedia dalam step ini. Empty state jika tidak ada dokter untuk layanan tsb: *"Belum ada dokter tersedia untuk layanan ini. Silakan hubungi Customer Service."* + CTA chat CS.

## 17.4 Step 3 — Pilih Tanggal

`DatePicker` kalender bulanan. Tanggal tanpa jadwal dokter dinonaktifkan (abu-abu, tidak dapat diklik). Tanggal di masa lalu otomatis disabled. Tanggal terpilih ter-highlight `--color-primary`.

## 17.5 Step 4 — Pilih Jadwal

Grid `TimeSlot` (chip jam, mis. `09.00`, `09.30`, `10.00`...) berdasarkan jadwal dokter & tanggal terpilih. Slot yang sudah penuh (mock, ditentukan acak/preset di dummy data) ditampilkan **disabled + strikethrough** dengan tooltip "Slot penuh". Slot terpilih ter-highlight solid.

## 17.6 Step 5 — Data Pasien

Form: Nama Lengkap, Email, Nomor Telepon, Tanggal Lahir (`DatePicker`), Alamat (textarea), Keluhan Singkat (opsional, textarea, dengan helper text: *"Bukan untuk diagnosis — hanya membantu dokter mempersiapkan konsultasi."*).

- Jika user sudah login: field Nama/Email/No. Telepon **auto-filled** dari profil (§18.6), tetap dapat diedit untuk kasus booking-kan orang lain (mis. keluarga).
- Validasi realtime (on blur): format email, format no. telepon (angka only, 9–13 digit), field wajib tidak boleh kosong.

## 17.7 Step 6 — Review

```
Ringkasan Appointment
──────────────────────
Layanan     : Klinik Anak
Dokter      : Dr. Amelia Putri
Tanggal     : 12 Oktober 2026
Jam         : 10.00
Lokasi      : RS Nareva — Gedung Utama Lt.2

Data Pasien
──────────────────────
Nama        : Kevin Santoso
No. Telepon : 08123456789

[Edit]                  [Konfirmasi Appointment]
```

Tombol "Edit" pada tiap section ringkasan membawa user kembali ke step terkait tanpa mereset data step lainnya.

## 17.8 Step 7 — Success

```
        ✓
  Appointment Berhasil Dibuat

  Dr. Amelia Putri
  Spesialis Anak

  12 Oktober 2026 · 10.00
  RS Nareva — Gedung Utama Lt.2

  Nomor Referensi: APT-000123

  [Lihat Detail Appointment]   [Kembali ke Beranda]
```

- Nomor referensi format mock: `APT-` + 6 digit acak/incremental.
- Appointment baru otomatis masuk ke `appointmentState` (§24) dengan status `Confirmed`, dan muncul di Dashboard (jika user login) atau tersimpan di `localStorage` terasosiasi dengan device (guest, tanpa akun) — untuk guest, tampilkan catatan: *"Simpan nomor referensi ini. Login/daftar akun agar appointment tersimpan otomatis di Dashboard Anda."* + CTA `[Buat Akun]`.

## 17.9 State Global Flow

| State | Trigger | Tampilan |
|---|---|---|
| Loading (antar step) | Simulasi fetch dokter/jadwal tersedia (300–600ms) | Skeleton pada elemen yang dimuat (grid dokter/slot) |
| Error | Simulasi gagal (mis. tombol "Simulasikan Error" di dev mode, atau random rare-case) | `ErrorState` inline dengan tombol "Coba Lagi", data step sebelumnya tidak hilang |
| Validasi Gagal | Submit form Step 5 dengan field kosong/salah | Border merah pada field terkait + pesan error di bawah field, fokus otomatis ke field error pertama |
| Berhasil | Submit Step 6 | Transisi ke Step 7 + toast "Appointment berhasil dibuat." |

## 17.10 Mobile Considerations (lihat juga §22.5)

- Sticky bottom bar berisi tombol "Lanjutkan"/"Kembali" di setiap step (bukan di dalam scroll area), agar dapat digunakan satu tangan.
- Step indicator ringkas di atas (progress bar + label), tidak memakan lebih dari 48px tinggi.
- Touch target minimal 44×44px untuk semua elemen pilihan (card layanan, dokter, tanggal, slot jam).


---

# 18. PATIENT DASHBOARD

## 18.0 Shell Layout

**Desktop:**
```
┌──────────────┬────────────────────────────────────┐
│ Sidebar      │ Topbar: [Search] [🔔 3] [Avatar ▾]  │
│              ├────────────────────────────────────┤
│ ⌂ Overview   │                                     │
│ 📅 Appointment│         [Page Content]              │
│ 🕘 Riwayat    │                                     │
│ 💬 Chat       │                                     │
│ 🔔 Notification│                                    │
│ 👤 Profile    │                                     │
│              │                                     │
│ [Logout]     │                                     │
└──────────────┴────────────────────────────────────┘
```
Sidebar collapsible (ikon-only mode) opsional P2. Active menu item ter-highlight background `--color-surface` + border-left `--color-primary`.

**Mobile:** Sidebar → **Bottom Navigation** (5 item: Home, Appointment, Chat, Notification, Profile — "Riwayat" dipindah ke dalam halaman Appointment sebagai tab). Topbar mobile hanya menampilkan logo kecil + ikon notifikasi + avatar.

## 18.1 Dashboard Overview (`/dashboard`)

**Greeting:** "Selamat datang, {nama_user}." + tanggal hari ini.

**Upcoming Appointment Card** (jika ada appointment dengan status `Confirmed`/`Pending` dan tanggal ≥ hari ini, ambil yang paling dekat):
```
┌─────────────────────────────┐
│ Appointment Berikutnya       │
│                             │
│ Dr. Amelia Putri            │
│ Spesialis Anak              │
│                             │
│ 12 Oktober 2026 · 10.00      │
│                             │
│ [Lihat Detail]              │
└─────────────────────────────┘
```
Jika tidak ada upcoming appointment → `EmptyState`: *"Belum ada appointment mendatang."* + CTA `[Buat Janji]`.

**Quick Actions:** `[Buat Janji]` `[Cari Dokter]` `[Chat]` `[Riwayat]` — grid 2×2 (mobile) / 4 kolom (desktop).

**Notifikasi Terbaru:** 3 notifikasi terakhir (ringkas), link "Lihat Semua" → `/dashboard/notification`.

## 18.2 Dashboard Appointment (`/dashboard/appointment`)

Tab: `Upcoming` | `History` | `Cancelled` (tab "History" ini beririsan dengan halaman `/dashboard/riwayat` — untuk MVP, `/dashboard/riwayat` dapat berupa alias/redirect ke tab History di halaman ini, agar tidak duplikasi logika).

`AppointmentCard` per item:
```
┌─────────────────────────────────────┐
│ Dr. Amelia Putri        [Confirmed] │
│ Klinik Anak                         │
│ 12 Oktober 2026 · 10.00              │
│                    [Lihat Detail →] │
└─────────────────────────────────────┘
```
Badge status berwarna: `Confirmed` (hijau), `Pending` (kuning), `Completed` (biru/netral), `Cancelled` (merah/abu-abu strikethrough).

State: loading skeleton (3 card), empty per tab (mis. tab Upcoming kosong → *"Belum ada appointment mendatang."* + CTA Buat Janji).

## 18.3 Dashboard Appointment Detail (`/dashboard/appointment/[id]`)

Tampilkan seluruh info (dokter, layanan, tanggal, jam, lokasi, appointment ID, status, data pasien yang didaftarkan). Tombol aksi (hanya aktif jika status `Confirmed`/`Pending` dan tanggal belum lewat):

- **Reschedule** → membuka **Modal Reschedule** (§18.4).
- **Cancel** → membuka **Modal Konfirmasi Cancel** (§18.4).
- **Chat Support** → membuka Customer Service chat dengan context appointment ini otomatis ter-attach (conversation title = "Appointment #APT-000123").

Jika status `Completed`/`Cancelled`: tombol aksi disembunyikan, tampilkan label read-only + (untuk Completed, opsional P2) tombol "Buat Janji Ulang" yang membawa data dokter+layanan yang sama ke flow booking baru.

## 18.4 Reschedule & Cancel Modal

**Reschedule Modal:**
```
┌─────────────────────────────┐
│ Ubah Jadwal              ×  │
├─────────────────────────────┤
│ Tanggal                     │
│ [ 12 Oktober 2026  ▾ ]      │
│                             │
│ Pilih Waktu                 │
│ [09.00] [10.00] [11.00]     │
│                             │
│        [Batalkan] [Simpan]  │
└─────────────────────────────┘
```
Simpan → validasi slot tersedia (mock) → update `appointmentState` → tutup modal → toast "Jadwal berhasil diubah." → card/detail ter-refresh otomatis (reactive state, bukan reload halaman).

**Cancel Modal:**
```
┌─────────────────────────────┐
│ Batalkan Appointment?    ×  │
├─────────────────────────────┤
│ Apakah Anda yakin ingin      │
│ membatalkan appointment ini? │
│ Tindakan ini tidak dapat     │
│ dibatalkan.                  │
│                              │
│         [Tidak] [Ya, Batalkan]│
└─────────────────────────────┘
```
Konfirmasi → status berubah menjadi `Cancelled` → toast "Appointment dibatalkan." → pindah otomatis ke tab Cancelled/History.

## 18.5 Dashboard Notification (`/dashboard/notification`)

List `NotificationCard`, dikelompokkan berdasarkan tanggal (Hari Ini, Kemarin, Lebih Lama). Jenis notifikasi (dengan ikon berbeda): `Appointment` (konfirmasi/perubahan), `Reminder` (H-1 pengingat), `Chat` (pesan baru dari CS), `Informasi` (pengumuman umum RS).

```
🔔 Reminder                     • (unread dot)
Appointment Anda besok pukul 10.00
bersama Dr. Amelia Putri.
2 jam yang lalu
```

- Unread: background sedikit ter-highlight + dot biru; klik → mark as read (update state) + background normal.
- Klik notifikasi tipe Appointment/Reminder → navigasi ke `/dashboard/appointment/[id]` terkait.
- Tombol "Tandai Semua Dibaca" di header halaman.
- Empty state: *"Belum ada notifikasi."*

**Notification Badge di Navbar/Topbar:** menampilkan jumlah unread (`🔔 3`), realtime terhadap `notificationState` (§24).

## 18.6 Dashboard Profile (`/dashboard/profile`)

Tampilan read-mode:
```
[Foto Profil (placeholder avatar)]
Kevin Santoso
kevin@example.com

Nomor Telepon : 08123456789
Tanggal Lahir : 14 Mei 1996
Alamat        : Jl. Contoh No. 10, Jakarta

[Edit Profile]
```
Klik "Edit Profile" → form inline (bukan modal, karena field cukup banyak) dengan tombol `[Batal]` `[Simpan Perubahan]`. Foto profil: upload mock (`<input type="file">` hanya preview lokal via `URL.createObjectURL`, tidak benar-benar diunggah ke server manapun — cukup disimpan sebagai base64/dataURL di `localStorage` untuk simulasi persistensi).

Simpan → validasi dasar (email format, no telepon numeric) → toast "Profil berhasil diperbarui." → update `profileState` + `localStorage`, field auto-fill di form booking (§17.6) ikut ter-update.


---

# 19. ADMIN DASHBOARD

> Seluruh operasi Create/Update/Delete di Admin Dashboard adalah **simulasi murni** — mengubah `adminState` (in-memory + `localStorage`) dan **tidak** mengirim data ke server manapun. Tujuannya mendemonstrasikan UX pengelolaan konten, bukan membangun CMS sungguhan.

## 19.0 Shell Layout

```
┌──────────────┬────────────────────────────────────┐
│ ADMIN         │ Topbar: RS Nareva Admin  [Avatar ▾]│
│──────────────┤────────────────────────────────────┤
│ Dashboard     │                                     │
│ Dokter        │         [Page Content]              │
│ Jadwal        │                                     │
│ Layanan       │                                     │
│ Appointment   │                                     │
│ Pasien        │                                     │
│ Chat          │                                     │
│ Artikel       │                                     │
│ Berita        │                                     │
│ Fasilitas     │                                     │
│ Settings      │                                     │
│ [Logout]      │                                     │
└──────────────┴────────────────────────────────────┘
```
Secara visual dibedakan dari Patient Dashboard: warna sidebar lebih gelap/netral (mis. `--color-text-primary` sebagai background sidebar dengan teks terang), untuk menegaskan konteks "back-office" vs "consumer-facing". Mobile: sidebar → drawer (bukan bottom nav — karena admin adalah tools operasional, bukan konsumsi kasual).

## 19.1 Admin Overview (`/admin`)

**Statistic Cards** (grid 4 kolom desktop / 2×2 mobile):
```
Total Pasien        Appointment Hari Ini
1,245                84

Dokter Aktif         Appointment Pending
120                  15
```
Di bawahnya: **Grafik mini** (opsional, gunakan `recharts` — bar chart "Appointment 7 Hari Terakhir", data dummy statis) + **Tabel Appointment Terbaru** (5 baris terakhir, link "Lihat Semua" → `/admin/appointment`).

## 19.2 Admin Dokter (`/admin/dokter`)

**DataTable:**
| Foto | Nama | Spesialisasi | Jadwal (ringkas) | Status | Aksi |
|---|---|---|---|---|---|
| 🖼 | Dr. Amelia Putri | Anak | Sen-Jum 09-14 | Aktif | 👁 ✏️ 🗑 |

- Search nama dokter, filter spesialisasi, filter status (Aktif/Nonaktif).
- Tombol **"+ Tambah Dokter"** → membuka **Modal Form Dokter** (Nama, Foto/upload mock, Spesialisasi (select), Pendidikan (dynamic list input, tombol "+ Tambah"), Pengalaman (tahun), Jadwal (form berulang: hari + jam mulai + jam selesai + lokasi, dengan tombol "+ Tambah Jadwal"), Status (toggle Aktif/Nonaktif)).
- Aksi **View** (ikon mata) → buka halaman/drawer detail read-only.
- Aksi **Edit** (ikon pensil) → modal form sama dengan Tambah, ter-prefill data existing.
- Aksi **Delete** (ikon tempat sampah) → modal konfirmasi ("Hapus data Dr. [Nama]? Tindakan ini tidak dapat dibatalkan.") → hapus dari `adminState.doctors` → toast "Dokter berhasil dihapus."
- Submit Tambah/Edit → validasi field wajib → toast sukses ("Dokter berhasil ditambahkan."/"Data dokter berhasil diperbarui.") → tabel ter-update reaktif tanpa reload.

## 19.3 Admin Jadwal (`/admin/jadwal`)

Tampilan tabel matrix: baris = dokter, kolom = hari (Senin–Minggu), sel = jam praktik atau tombol "+ Tambah" jika kosong.
```
Dokter          Senin      Selasa   Rabu      Kamis   Jumat
Dr. Amelia      09-14      -        09-14     -        09-14
Dr. Bagus       -          13-17    -         13-17    -
```
Klik sel berisi jadwal → popover kecil dengan opsi **Edit** (ubah jam) / **Hapus** / **Toggle Ketersediaan** (mis. menandai cuti pada tanggal tertentu — override sementara, opsional P2). Klik sel kosong ("+ Tambah") → modal tambah jadwal cepat (pilih jam mulai-selesai, lokasi).

## 19.4 Admin Layanan (`/admin/layanan`) — P2

DataTable serupa (Icon, Nama, Kategori, Jumlah Dokter Terkait, Status Publish, Aksi). Modal form: Nama, Icon (pilih dari set ikon tersedia), Deskripsi Singkat, Deskripsi Lengkap (textarea/rich text sederhana), Keunggulan (dynamic list), Dokter Terkait (multi-select), FAQ (dynamic list pertanyaan+jawaban).

## 19.5 Admin Appointment (`/admin/appointment`)

DataTable:
| ID | Pasien | Dokter | Layanan | Tanggal | Jam | Status | Aksi |
|---|---|---|---|---|---|---|---|
| APT-000123 | Kevin Santoso | Dr. Amelia Putri | Klinik Anak | 12 Okt 2026 | 10.00 | Confirmed | Edit |

- Filter: Tanggal (range), Dokter (select), Status (chip multi-select), Layanan (select).
- Search nama pasien.
- Aksi **Edit Status** → dropdown inline atau modal kecil untuk mengubah status (`Pending → Confirmed → Completed`, atau `→ Cancelled`), dengan aturan transisi wajar (tidak bisa langsung dari `Cancelled` ke `Completed`).
- Klik baris → buka detail appointment (read-only card serupa tampilan pasien, ditambah info admin: catatan internal/opsional).

## 19.6 Admin Pasien (`/admin/pasien`) — P2

DataTable: Nama, Email, No. Telepon, Jumlah Appointment, Status Akun (Aktif). **Tidak menampilkan data medis/keluhan** — sesuai prinsip privasi yang berlaku di seluruh dokumen ini. Klik baris → detail ringkas + daftar appointment pasien tsb (read-only).

## 19.7 Admin Chat (`/admin/chat`)

Layout mirip Customer Service pasien tapi dari sisi admin:
```
┌─────────────────┬─────────────────────────┐
│ Percakapan        │ Kevin Santoso            │
│                  │ Appointment #APT-000123  │
│ Kevin — 2 mnt lalu ├─────────────────────────┤
│ "appointment      │  Kevin: Bisa saya ubah   │
│  question"        │  jadwal appointment saya?│
│                  │                          │
│ Andi — 5 mnt lalu  │  [Balas sebagai Admin]   │
│ "schedule question"├─────────────────────────┤
│                  │ Ketik balasan…       kirim│
│ Rina — 10 mnt lalu │                         │
│ "service question" │                         │
└─────────────────┴─────────────────────────┘
```
Admin dapat mengetik balasan (masuk ke `chatState` pasien terkait secara mock). Untuk MVP cukup memperbarui state lokal admin; sinkronisasi lintas-tab (mis. via `BroadcastChannel`) adalah enhancement opsional P2.

## 19.8 Admin Content Management — Artikel, Berita, Fasilitas

Pola UI **konsisten** untuk ketiganya (agar development efisien — reuse 1 komponen `ContentManagerTable` + `ContentFormModal` dikonfigurasi per tipe):

**List:** DataTable (Judul/Nama, Kategori/Tipe, Tanggal, Status Publish [Published/Draft], Aksi: Edit/Delete/Toggle Publish).

**Form (Create/Edit):** Judul, Kategori (select, khusus Artikel & Berita), Featured Image (upload mock/preview), Isi Konten (textarea besar — rich text editor sungguhan **opsional P2**, untuk MVP textarea polos sudah cukup), Status Publish (toggle).

**Aksi Toggle Publish:** langsung dari tabel (switch kecil), tanpa perlu masuk form — perubahan status instan dengan toast konfirmasi.

## 19.9 Admin Settings (`/admin/settings`) — P2

Halaman sederhana: info akun admin (nama, email, ganti password — mock, tidak benar-benar mengubah apa pun secara fungsional selain toast "Password berhasil diubah."), preferensi tampilan (opsional dark mode toggle — P2, lihat §41).

---

# 20. COMPONENT SYSTEM

## 20.1 Layout Components

| Component | Fungsi & Catatan Implementasi |
|---|---|
| `Navbar` | Navigasi publik, sticky, search trigger, avatar/login state, emergency contact |
| `Footer` | Info kontak, navigasi cepat, sosial media, copyright |
| `Sidebar` | Digunakan di Patient Dashboard & Admin (variant `patient` / `admin` beda styling) |
| `BottomNavigation` | Navigasi mobile khusus Patient Dashboard |
| `TopBar` | Bar tipis jam operasional & IGD (homepage/publik) |
| `AdminTopbar` | Topbar khusus admin (judul halaman + avatar) |

## 20.2 UI Primitives

| Component | Props Kunci | Catatan |
|---|---|---|
| `Button` | `variant` (primary/secondary/outline/destructive/emergency/text), `size`, `isLoading`, `disabled`, `leftIcon`/`rightIcon` | Loading state menampilkan spinner inline menggantikan/menyamping label |
| `Input` | `label`, `placeholder`, `error`, `helperText`, `type` | Label selalu tampil (tidak hanya placeholder — lihat §56 dokumen sebelumnya / §27) |
| `Select` | `options`, `value`, `onChange`, `error` | Native `<select>` di-styling ulang, atau custom dropdown untuk konsistensi visual |
| `Textarea` | serupa `Input` + `rows`, `maxLength` (dengan counter) | |
| `DatePicker` | `selectedDate`, `disabledDates[]`, `minDate`, `maxDate` | Dipakai di Buat Janji & Profile (tanggal lahir) & Reschedule |
| `TimeSlot` | `slots: {time, available}[]`, `selected`, `onSelect` | Grid chip, disabled state untuk slot penuh |
| `Badge` | `variant` (status warna), `label` | Dipakai untuk status appointment, publish/draft, dsb. |
| `Toast` | `type` (success/error/info), `message`, `duration` | Lihat §35 |
| `Modal` | `isOpen`, `onClose`, `title`, `children`, `size` | Lihat §34 |
| `Drawer` | `isOpen`, `onClose`, `side` (left/right/bottom) | Dipakai untuk mobile navbar drawer & admin mobile sidebar |
| `Breadcrumb` | `items: {label, href}[]` | Dipakai di Detail Dokter/Layanan/Artikel |
| `Pagination` | `currentPage`, `totalPages`, `onPageChange` | Dipakai di Artikel/Berita |
| `Tabs` | `tabs[]`, `activeTab`, `onChange` | Dipakai di Dashboard Appointment, Customer Service |
| `Skeleton` | `variant` (text/card/circle), `count` | Dasar untuk semua `*Skeleton` |
| `EmptyState` | `title`, `description`, `ctaLabel`, `onCtaClick`, `illustration` | Reusable di semua list kosong |
| `ErrorState` | `message`, `onRetry` | Reusable di semua fetch gagal (mock) |
| `Accordion` | `items[]` | Dipakai untuk FAQ & footer mobile |
| `Tooltip` | `content`, `children` | Dipakai untuk slot penuh, ikon aksi tabel admin |

## 20.3 Domain Cards

| Component | Fungsi |
|---|---|
| `DoctorCard` | Preview dokter (grid/list & varian ringkas untuk chat/booking) |
| `ServiceCard` | Preview layanan |
| `ArticleCard` | Preview artikel |
| `NewsCard` | Preview berita |
| `FacilityCard` | Preview fasilitas |
| `AppointmentCard` | Preview appointment (dashboard pasien & admin) |
| `ScheduleCard` | Menampilkan slot jadwal (dipakai di chat & Detail Dokter) |
| `NotificationCard` | Item notifikasi |
| `TestimonialCard` | Kutipan testimoni |

## 20.4 Chat Components

| Component | Fungsi |
|---|---|
| `ChatbotWidget` | Container floating Nareva Care |
| `ChatWindow` | Area scroll berisi bubble & rich message |
| `ChatBubble` | Bubble teks user/bot |
| `ChatInput` | Input + tombol kirim, sticky |
| `TypingIndicator` | Animasi 3-dot |
| `QuickReply` | Baris tombol pilihan cepat |
| `RecommendationCard` | Wrapper generik untuk Doctor/Service/Schedule/Emergency Card di dalam chat |

## 20.5 Data & Admin Components

| Component | Fungsi |
|---|---|
| `DataTable` | Tabel generik (sort, search, pagination, row actions) — dipakai di seluruh halaman admin |
| `ContentFormModal` | Form generik CRUD (dikonfigurasi per entitas: dokter/layanan/artikel/dst.) |
| `StatCard` | Kartu statistik angka besar (Admin Overview) |
| `FilterBar` | Kombinasi search + filter chip/select, dipakai di Dokter/Layanan/Artikel/Admin tables |

## 20.6 Component Interaction Contract (Contoh)

```typescript
// components/cards/DoctorCard.tsx
interface DoctorCardProps {
  doctor: Doctor;
  variant?: 'default' | 'compact' | 'selectable';
  isSelected?: boolean;
  onSelect?: (doctorId: string) => void;
  onViewProfile?: (slug: string) => void;
  onBookAppointment?: (doctorId: string) => void;
}
```
Kontrak serupa berlaku untuk seluruh Domain Card — props data (`doctor`, `service`, dst.) + callback aksi, tanpa logika fetching di dalam komponen presentational (fetching dilakukan di level page/hook, lihat §24).

---

# 21. DESIGN SYSTEM

## 21.1 Prinsip Visual

Style: **Clean, modern, professional, trustworthy, friendly, calm** — "Premium Healthcare", bukan corporate kaku, bukan childish, bukan ramai gradient/animasi.

## 21.2 Warna

| Token | Nama | Contoh Hex | Penggunaan |
|---|---|---|---|
| `--color-primary` | Medical Blue | #1D63D1 | CTA utama, link, ikon aktif, elemen brand |
| `--color-primary-dark` | Medical Blue Dark | #14468F | Hover state primary button |
| `--color-secondary` | Healthcare Green | #16A38A | Aksen sekunder, badge sukses ringan, highlight Smart Care |
| `--color-background` | White | #FFFFFF | Latar utama |
| `--color-surface` | Light Gray | #F4F6F8 | Card, section alternatif, bubble chat bot |
| `--color-border` | Border Gray | #E3E7EB | Border card/input |
| `--color-text-primary` | Dark Gray | #1A2027 | Heading & body text |
| `--color-text-secondary` | Mid Gray | #5B6470 | Sub-teks, caption, placeholder |
| `--color-success` | Green | #1E9E5A | Konfirmasi, status Confirmed/Completed |
| `--color-warning` | Amber | #D68A1D | Status Pending, peringatan non-kritis |
| `--color-error` | Red | #D83A3A | Error, destructive action, Emergency, status Cancelled |

> Warna merah **hanya** dipakai untuk emergency/error/destructive — tidak dipakai sebagai warna dekoratif di tempat lain, agar makna visualnya tetap kuat (lihat §52 requirement asli).

## 21.3 Tipografi

- Font: sans-serif humanis modern (mis. **Inter** atau **Plus Jakarta Sans**).
- Skala: `Display` 44px/1.2, `H1` 36px/1.25, `H2` 28px/1.3, `H3` 22px/1.35, `H4` 18px/1.4, `Body` 16px/1.5, `Caption` 14px/1.5, `Label` 13px/1.4 (uppercase, letter-spacing 0.02em untuk label form/status kecil).
- Mobile scale-down: `Display`→32px, `H1`→28px, `H2`→22px, sisanya tetap (menjaga keterbacaan).

## 21.4 Spacing, Radius, Shadow

- **Spacing scale:** 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64px.
- **Border radius:** `sm` 8px (input, button), `md` 12px (card standar), `lg` 16px (modal, chat widget), `full` (avatar, chip, badge pill).
- **Shadow:** `sm` `0 1px 2px rgba(16,24,32,.06)` (card default), `md` `0 4px 12px rgba(16,24,32,.08)` (card hover, dropdown), `lg` `0 12px 32px rgba(16,24,32,.14)` (modal, chatbot widget).

## 21.5 Button System

| Variant | Penggunaan | Contoh Label |
|---|---|---|
| Primary (solid) | Aksi utama halaman | "Buat Janji" |
| Secondary (solid lebih ringan / outline kuat) | Aksi penting non-utama | "Lihat Profil" |
| Outline | Aksi tersier | "Pelajari Lebih Lanjut" |
| Destructive | Aksi menghapus/membatalkan | "Batalkan" |
| Emergency | Kontak darurat | "Hubungi IGD" (selalu `--color-error`, tidak pernah dipakai untuk aksi lain) |
| Text/Link | Aksi ringan dalam teks | "Lihat Semua" |

Setiap varian wajib memiliki state: `default`, `hover`, `active`, `disabled` (opacity 40% + cursor not-allowed), `loading` (spinner + label tetap terbaca atau disamarkan sesuai lebar tombol).

## 21.6 Form System

Wajib: `label` selalu terlihat (tidak mengandalkan placeholder saja), `placeholder` sebagai contoh format, `helperText` opsional di bawah input, state `error` (border merah + pesan di bawah), `success` (border hijau tipis, dipakai opsional untuk validasi realtime positif), `disabled` (background abu-abu, tidak dapat difokus), `focus` (ring 2px `--color-primary` opacity 30%).

## 21.7 Icon Style

Icon set: **Lucide Icons** (stroke-based, konsisten ketebalan 1.5–2px), ukuran standar 20px (inline) / 24px (tombol besar/quick action) / 32–40px (empty state illustration sederhana).


---

# 22. RESPONSIVE DESIGN

## 22.1 Breakpoints

Mengikuti default Tailwind: `sm` 640px, `md` 768px, `lg` 1024px, `xl` 1280px. Prioritas pengembangan: **mobile-first** — style dasar ditulis untuk mobile, breakpoint `md:`/`lg:` menambahkan layout desktop.

## 22.2 Navbar & Footer

Lihat detail perilaku di §13.1 & §13.5.

## 22.3 Grid & Card

| Konten | Mobile | Tablet | Desktop |
|---|---|---|---|
| Grid Dokter/Layanan/Fasilitas | 1 kolom | 2 kolom | 3–4 kolom |
| Grid Artikel/Berita | 1 kolom | 2 kolom | 3 kolom |
| Admin DataTable | Card list (kolom disusun vertikal per baris) | Tabel horizontal-scroll | Tabel penuh |

## 22.4 Dashboard (Patient & Admin)

Lihat §18.0 & §19.0 — sidebar → bottom navigation (patient) / drawer (admin).

## 22.5 Appointment (Mobile)

Lihat §17.10 — sticky bottom action bar, step indicator ringkas, touch target besar.

## 22.6 Chat (Mobile)

Lihat §15.1 — full-screen sheet, ChatInput selalu sticky di bawah tanpa perlu scroll (gunakan `position: sticky` di dalam flex container, bukan `fixed` murni agar tidak tertutup keyboard virtual — gunakan `visualViewport` API bila diperlukan untuk menyesuaikan tinggi saat keyboard muncul).

## 22.7 Form (Umum)

Mobile: seluruh input full-width, 1 kolom. Desktop: field pendek (mis. Tanggal Lahir + No. Telepon) dapat disusun 2 kolom untuk menghemat scroll.

## 22.8 Typography

Lihat §21.3 — skala mengecil di mobile namun tetap ≥16px untuk body (persyaratan accessibility, §28).

## 22.9 Floating CTA

Lihat aturan stacking di §13.4.

---

# 23. MOCK DATA & TYPE DEFINITIONS

Seluruh entitas didefinisikan sebagai TypeScript interface di `types/`, dan datanya disimpan sebagai file JSON/TS statis di `data/`. Akses selalu melalui `lib/services/*.ts` (async mock, lihat §24.4) — **komponen tidak pernah mengimpor file `data/*.json` secara langsung.**

## 23.1 Doctor & Schedule

```typescript
// types/doctor.ts
export interface Doctor {
  id: string;
  slug: string;
  name: string;
  photoUrl: string;
  specializationId: string;
  specializationName: string; // denormalized untuk kemudahan render
  education: string[];
  experienceYears: number;
  languages?: string[];
  bio: string;
  location: string;          // cabang/gedung
  isActive: boolean;
  schedules: DoctorSchedule[];
  relatedServiceIds: string[];
}

export interface DoctorSchedule {
  id: string;
  day: 'Senin' | 'Selasa' | 'Rabu' | 'Kamis' | 'Jumat' | 'Sabtu' | 'Minggu';
  startTime: string;   // "09:00"
  endTime: string;     // "14:00"
  location: string;
  slotDurationMinutes: number; // dipakai untuk generate TimeSlot, mis. 30
}

export interface Specialization {
  id: string;
  name: string;
  icon: string;
}
```

## 23.2 Service & Facility

```typescript
// types/service.ts
export interface Service {
  id: string;
  slug: string;
  name: string;
  icon: string;
  category: 'Rawat Jalan' | 'Rawat Inap' | 'Penunjang Medis';
  shortDescription: string;
  description: string;
  benefits: string[];
  relatedDoctorIds: string[];
  facilityIds: string[];
  faq: { question: string; answer: string }[];
}

// types/facility.ts
export interface Facility {
  id: string;
  name: string;
  imageUrls: string[];
  description: string;
}
```

## 23.3 Appointment & Patient

```typescript
// types/appointment.ts
export type AppointmentStatus = 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled';

export interface Appointment {
  id: string;              // "APT-000123"
  patientId?: string;      // undefined jika guest (belum login)
  doctorId: string;
  doctorName: string;
  doctorSpecialization: string;
  serviceId: string;
  serviceName: string;
  date: string;            // ISO date "2026-10-12"
  time: string;            // "10:00"
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

// types/user.ts
export type UserRole = 'patient' | 'admin';

export interface AuthUser {
  id: string;
  role: UserRole;
  name: string;
  email: string;
  phoneNumber?: string;
  birthDate?: string;
  address?: string;
  avatarUrl?: string;
}
```

## 23.4 Content — Article, News, Testimonial

```typescript
// types/article.ts
export interface Article {
  id: string;
  slug: string;
  title: string;
  category: 'Kesehatan' | 'Tips' | 'Nutrisi' | 'Anak' | 'Jantung' | 'Mental Health' | 'Gaya Hidup';
  author: string;
  publishedAt: string;
  featuredImage: string;
  content: string;
  relatedArticleIds: string[];
  isPublished: boolean;
}

// types/news.ts
export type NewsType = 'event' | 'pengumuman' | 'program' | 'kerja-sama' | 'prestasi';

export interface NewsItem {
  id: string;
  slug: string;
  title: string;
  type: NewsType;
  publishedAt: string;
  featuredImage: string;
  content: string;
  isPublished: boolean;
}

// types/testimonial.ts
export interface Testimonial {
  id: string;
  patientName: string; // dummy/inisial, bukan data pasien asli
  message: string;
  rating: number; // 1-5
}
```

## 23.5 Chat & Notification

```typescript
// types/chat.ts
export type ChatChannel = 'assistant' | 'customer-service';
export type ChatMessageType = 'text' | 'doctor-card' | 'service-card' | 'schedule-card' | 'emergency-card';
export type ChatSender = 'user' | 'bot' | 'agent';

export interface ChatMessage {
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

export interface ChatConversation {
  id: string;
  channel: ChatChannel;
  title: string;             // mis. "Appointment Support"
  status: 'active' | 'waiting' | 'closed';
  messages: ChatMessage[];
  updatedAt: string;
}

// types/notification.ts
export type NotificationType = 'appointment' | 'reminder' | 'chat' | 'informasi';

export interface AppNotification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  isRead: boolean;
  relatedAppointmentId?: string;
  createdAt: string;
}
```

## 23.6 Hospital Info & Admin Stats

```typescript
// types/hospital.ts
export interface HospitalInfo {
  name: string;             // "RS Nareva"
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

// types/admin.ts
export interface AdminStats {
  totalPatients: number;
  appointmentsToday: number;
  activeDoctors: number;
  pendingAppointments: number;
  appointmentsLast7Days: { date: string; count: number }[];
}
```


---

# 24. FRONTEND STATE MANAGEMENT

## 24.1 Prinsip

- State dibagi menjadi **Server-like State** (data yang "seolah" dari API — dokter, layanan, artikel, dst., diakses via service layer & caching sederhana) dan **Client State** (UI state — modal terbuka, filter aktif, step booking saat ini).
- Untuk skala prototype ini, **tidak perlu Redux**. Gunakan **Zustand** untuk state lintas-komponen yang butuh persistensi (auth, appointment, chat, notification, admin) dan **React state/Context lokal** untuk state UI sesaat (modal, form step).
- Store yang perlu bertahan lintas refresh browser di-`persist` ke `localStorage` (via middleware `zustand/middleware persist`).

## 24.2 Daftar Store

| Store | Persist? | Isi Utama |
|---|---|---|
| `useAuthStore` | ✅ | `user: AuthUser \| null`, `isAuthenticated`, `login()`, `logout()`, `register()` |
| `useAppointmentStore` | ✅ | `appointments: Appointment[]`, `createAppointment()`, `updateAppointment()`, `cancelAppointment()`, `rescheduleAppointment()` |
| `useBookingFlowStore` | ❌ (session only, boleh persist opsional agar user tidak kehilangan progres bila reload di tengah flow) | `currentStep`, `selectedService`, `selectedDoctor`, `selectedDate`, `selectedTime`, `patientInfo`, `reset()` |
| `useChatStore` | ✅ | `conversations: ChatConversation[]`, `activeConversationId`, `sendMessage()`, `addBotResponse()`, `clearHistory()` |
| `useNotificationStore` | ✅ | `notifications: AppNotification[]`, `markAsRead()`, `markAllAsRead()`, `unreadCount` (derived) |
| `useProfileStore` | ✅ | mirror dari `useAuthStore.user` untuk field yang dapat diedit, `updateProfile()` |
| `useAdminStore` | ✅ | `doctors`, `services`, `articles`, `news`, `facilities`, `appointments` (shared reference dengan `useAppointmentStore` di dunia nyata, namun untuk prototype dapat berupa store terpisah yang di-seed dari sumber sama) + method CRUD masing-masing |
| `useUIStore` | ❌ | `isSearchOpen`, `isChatWidgetOpen`, `activeModal`, `toasts[]` |

## 24.3 Contoh Definisi Store

```typescript
// lib/store/useAppointmentStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Appointment, AppointmentStatus } from '@/types/appointment';

interface AppointmentState {
  appointments: Appointment[];
  createAppointment: (data: Omit<Appointment, 'id' | 'createdAt' | 'updatedAt' | 'status'>) => Appointment;
  updateStatus: (id: string, status: AppointmentStatus) => void;
  reschedule: (id: string, date: string, time: string) => void;
  cancel: (id: string) => void;
  getByPatientId: (patientId: string) => Appointment[];
}

export const useAppointmentStore = create<AppointmentState>()(
  persist(
    (set, get) => ({
      appointments: [],
      createAppointment: (data) => {
        const newAppointment: Appointment = {
          ...data,
          id: `APT-${Math.floor(100000 + Math.random() * 900000)}`,
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
    }),
    { name: 'nareva-appointments' }
  )
);
```

## 24.4 Service Layer (Mock Async, API-Ready)

```typescript
// lib/services/doctorService.ts
import doctorsData from '@/data/doctors.json';
import type { Doctor } from '@/types/doctor';

const simulateDelay = <T,>(data: T, ms = 500): Promise<T> =>
  new Promise((resolve) => setTimeout(() => resolve(data), ms));

export const doctorService = {
  async getAll(filters?: { specializationId?: string; day?: string }): Promise<Doctor[]> {
    let result = doctorsData as Doctor[];
    if (filters?.specializationId) {
      result = result.filter((d) => d.specializationId === filters.specializationId);
    }
    if (filters?.day) {
      result = result.filter((d) => d.schedules.some((s) => s.day === filters.day));
    }
    return simulateDelay(result);
  },
  async getBySlug(slug: string): Promise<Doctor | undefined> {
    return simulateDelay((doctorsData as Doctor[]).find((d) => d.slug === slug));
  },
};
```

> **Kontrak ini yang membuat proyek "API-ready":** ketika backend nyata tersedia, isi fungsi di `lib/services/*.ts` diganti dengan `fetch('/api/doctors')`, sementara signature fungsi (nama, parameter, return type `Promise<Doctor[]>`) **tidak berubah** — sehingga tidak ada komponen UI yang perlu disentuh.

## 24.5 Custom Hooks (Wrapper Data Fetching)

```typescript
// hooks/useDoctors.ts
export function useDoctors(filters?: DoctorFilters) {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  useEffect(() => {
    setStatus('loading');
    doctorService.getAll(filters)
      .then((data) => { setDoctors(data); setStatus('success'); })
      .catch(() => setStatus('error'));
  }, [JSON.stringify(filters)]);

  return { doctors, status, isEmpty: status === 'success' && doctors.length === 0 };
}
```
Pola `status: idle/loading/success/error` ini **wajib** dipakai konsisten di seluruh hook data (`useServices`, `useArticles`, `useFacilities`, dst.) agar mapping ke `LoadingSkeleton`/`EmptyState`/`ErrorState` seragam di seluruh aplikasi (lihat §31–33).

---

# 25. ROUTING

## 25.1 Tabel Rute Lengkap

| Rute | Tipe | Guard |
|---|---|---|
| `/` , `/tentang`, `/layanan`, `/layanan/[slug]`, `/dokter`, `/dokter/[slug]`, `/jadwal`, `/fasilitas`, `/artikel`, `/artikel/[slug]`, `/berita`, `/berita/[slug]`, `/kontak`, `/buat-janji` | Publik | Tidak ada |
| `/login`, `/register` | Publik (Auth) | Jika sudah login → redirect ke `/dashboard` atau `/admin` sesuai role |
| `/dashboard`, `/dashboard/*` | Protected (Patient) | Jika `!isAuthenticated` → redirect `/login?redirect={path}`. Jika role `admin` mencoba akses → redirect ke `/admin` |
| `/admin`, `/admin/*` | Protected (Admin) | Jika `!isAuthenticated` atau `role !== 'admin'` → redirect `/login` |

## 25.2 Implementasi Guard (Client-Side, Simulasi)

```typescript
// components/auth/ProtectedRoute.tsx
'use client';
export function ProtectedRoute({ role, children }: { role: UserRole; children: React.ReactNode }) {
  const { user, isAuthenticated } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace(`/login?redirect=${encodeURIComponent(pathname)}`);
    } else if (user?.role !== role) {
      router.replace(user?.role === 'admin' ? '/admin' : '/dashboard');
    }
  }, [isAuthenticated, user, pathname]);

  if (!isAuthenticated || user?.role !== role) return <FullPageLoading />;
  return <>{children}</>;
}
```

> Catatan penting: ini **guard kosmetik/UX**, bukan keamanan sungguhan (semua logic berjalan di client, dapat di-bypass via devtools) — wajar untuk prototype front-end, namun tim harus paham ini **wajib diganti middleware/server-side check** saat backend nyata diimplementasikan.

## 25.3 Query Param & Deep-linking

- `/dokter?spesialisasi=anak&hari=Senin` — filter ter-refleksi di URL agar dapat dibagikan/di-bookmark.
- `/buat-janji?doctorId=xxx&serviceId=yyy` — dipakai untuk handoff dari Detail Dokter/Chatbot (§14.6), langsung skip ke Step 3.
- `/artikel?kategori=Anak&page=2` — state pagination & filter tersimpan di URL.

---

# 26. FOLDER STRUCTURE

```
src/
├── app/
│   ├── (public)/
│   │   ├── page.tsx                      # Homepage
│   │   ├── tentang/page.tsx
│   │   ├── layanan/page.tsx
│   │   ├── layanan/[slug]/page.tsx
│   │   ├── dokter/page.tsx
│   │   ├── dokter/[slug]/page.tsx
│   │   ├── jadwal/page.tsx
│   │   ├── fasilitas/page.tsx
│   │   ├── artikel/page.tsx
│   │   ├── artikel/[slug]/page.tsx
│   │   ├── berita/page.tsx
│   │   ├── berita/[slug]/page.tsx
│   │   ├── kontak/page.tsx
│   │   └── buat-janji/page.tsx
│   ├── (auth)/
│   │   ├── login/page.tsx
│   │   └── register/page.tsx
│   ├── dashboard/
│   │   ├── layout.tsx                    # ProtectedRoute role="patient" + shell
│   │   ├── page.tsx                      # Overview
│   │   ├── appointment/page.tsx
│   │   ├── appointment/[id]/page.tsx
│   │   ├── riwayat/page.tsx
│   │   ├── chat/page.tsx
│   │   ├── notification/page.tsx
│   │   └── profile/page.tsx
│   ├── admin/
│   │   ├── layout.tsx                    # ProtectedRoute role="admin" + shell
│   │   ├── page.tsx                      # Overview
│   │   ├── dokter/page.tsx
│   │   ├── jadwal/page.tsx
│   │   ├── layanan/page.tsx
│   │   ├── appointment/page.tsx
│   │   ├── pasien/page.tsx
│   │   ├── chat/page.tsx
│   │   ├── artikel/page.tsx
│   │   ├── berita/page.tsx
│   │   ├── fasilitas/page.tsx
│   │   └── settings/page.tsx
│   ├── layout.tsx                        # Root layout: Navbar, Footer, ChatbotWidget, ToastContainer
│   ├── sitemap.ts
│   └── robots.ts
│
├── components/
│   ├── ui/               # Button, Input, Select, Modal, Drawer, Badge, Toast, Tabs, Accordion, Tooltip, Skeleton
│   ├── layout/            # Navbar, Footer, Sidebar, BottomNavigation, TopBar, AdminTopbar
│   ├── cards/             # DoctorCard, ServiceCard, ArticleCard, NewsCard, FacilityCard, AppointmentCard, ScheduleCard, NotificationCard, TestimonialCard
│   ├── chat/              # ChatbotWidget, ChatWindow, ChatBubble, ChatInput, TypingIndicator, QuickReply, RecommendationCard
│   ├── booking/           # BookingStepper, ServiceSelectStep, DoctorSelectStep, DateStep, TimeSlotStep, PatientFormStep, ReviewStep, SuccessStep
│   ├── dashboard/         # DashboardShell, UpcomingAppointmentCard, QuickActionsGrid
│   ├── admin/             # DataTable, ContentFormModal, StatCard, FilterBar
│   └── states/            # EmptyState, ErrorState, LoadingSkeleton (+ varian per domain)
│
├── features/
│   ├── doctors/           # logic spesifik fitur dokter (filter builder, dsb.)
│   ├── appointment/       # booking flow state machine helpers
│   ├── chat/              # intent detection (detectIntent.ts), response builder mock
│   └── admin/             # helper CRUD per entitas
│
├── lib/
│   ├── store/             # Zustand stores (§24.2)
│   ├── services/          # Mock async service layer (§24.4)
│   ├── validation/        # Zod schemas (login, register, booking form, contact form)
│   └── utils/             # formatDate, formatPhone, generateId, cn (classnames)
│
├── hooks/
│   ├── useDoctors.ts
│   ├── useServices.ts
│   ├── useArticles.ts
│   ├── useAppointmentForm.ts
│   ├── useDebouncedSearch.ts
│   └── useMediaQuery.ts
│
├── types/                 # Seluruh interface (§23)
├── data/                  # doctors.json, services.json, facilities.json, articles.json, news.json, testimonials.json, hospitalInfo.json, specializations.json
└── public/
    ├── images/
    └── icons/
```

**Penjelasan singkat fungsi tiap folder utama:**
- `app/` — routing berbasis file (Next.js App Router), dikelompokkan via route groups `(public)`/`(auth)` agar tidak memengaruhi URL namun tetap terorganisir.
- `components/` — komponen presentational, dikelompokkan per domain agar mudah ditemukan (bukan flat folder besar).
- `features/` — logika bisnis/UX yang lebih kompleks dari sekadar komponen (mis. intent detection chatbot), dipisah agar `components/` tetap "dumb".
- `lib/` — infrastruktur front-end: state, service layer, validasi, utilitas murni.
- `hooks/` — jembatan antara `lib/services` dan komponen, mengelola status loading/error secara seragam.
- `types/` & `data/` — kontrak data & sumber mock, satu sumber kebenaran yang mudah diganti API nyata.


---

# 27. UX REQUIREMENTS

- **Simple > Complex, Clear > Clever, Useful > Decorative, Trust > Trend, Patient Journey > Feature Quantity.**
- Navigasi maksimal 2 level; setiap halaman memiliki jalan kembali yang jelas (breadcrumb/back button).
- CTA utama konsisten warna & posisi di seluruh aplikasi (kanan-atas card, atau sticky bottom mobile).
- Booking flow dipecah per step (bukan form panjang tunggal) — lihat §17.
- Semua pesan error actionable, ditulis dengan bahasa manusia (bukan kode error teknis seperti "Error 500").
- Loading selalu skeleton, bukan spinner polos, untuk seluruh list data (§31).
- Chatbot & CS chat tidak boleh menghalangi user menyelesaikan tugas via navigasi biasa — keduanya bersifat **aditif**, bukan satu-satunya jalan (§10).
- Dashboard & Admin harus "terasa seperti aplikasi", bukan halaman statis — state berubah instan (optimistic update) tanpa reload penuh saat user melakukan aksi (reschedule, cancel, CRUD admin).

---

# 28. ACCESSIBILITY

- Kontras teks vs background minimal rasio 4.5:1 (WCAG AA) — termasuk teks di atas warna primary/secondary.
- Semua gambar informatif memiliki `alt` deskriptif; ikon dekoratif menggunakan `aria-hidden="true"`.
- Seluruh elemen interaktif dapat dijangkau via keyboard, tab order logis mengikuti urutan visual.
- Focus state terlihat jelas (`focus-visible:ring-2`) pada semua tombol, input, card selectable, chip filter.
- Semantic HTML: `<nav>`, `<main>`, `<header>`, `<footer>`, heading hierarchy benar (`h1` satu per halaman).
- Label form eksplisit (`<label htmlFor>`) — tidak mengandalkan placeholder sebagai label (§21.6).
- Nama tombol deskriptif: "Buat Janji dengan Dr. Amelia", bukan "Klik di sini".
- Chat widget: dapat dibuka/ditutup via keyboard (`Esc` untuk menutup), pesan baru diumumkan via `aria-live="polite"` agar pembaca layar mengetahui respons baru.
- Modal: fokus terkunci di dalam modal saat terbuka (focus trap), `Esc` untuk menutup, fokus kembali ke elemen pemicu saat ditutup.
- Ukuran teks body minimal 16px; ukuran touch target minimal 44×44px di seluruh elemen interaktif mobile.

---

# 29. SEO

| Halaman | Prioritas | Kebutuhan |
|---|---|---|
| Homepage | Tinggi | Title, meta description, OG image, structured data `MedicalOrganization` |
| Dokter & Detail Dokter | Tinggi | Title dinamis per dokter, meta description, structured data `Physician` |
| Layanan & Detail Layanan | Tinggi | Title dinamis, meta description, structured data `MedicalProcedure`/`Service` (bila relevan) |
| Artikel & Detail Artikel | Sedang | Title, meta description, OG, structured data `Article` |
| Berita | Sedang | Title, meta description |
| Tentang Kami, Kontak | Sedang | Title, meta description, structured data `LocalBusiness`/`Hospital` untuk Kontak |
| Dashboard, Admin | Tidak berlaku | `noindex, nofollow` (area privat) |

Kebutuhan umum: URL berbasis slug (bukan ID acak), semantic HTML per halaman, `sitemap.xml` (hanya halaman publik), `robots.txt` (disallow `/dashboard`, `/admin`), Open Graph tag standar di seluruh halaman publik.

---

# 30. PERFORMANCE

- Lazy load gambar di bawah viewport (`next/image`, `loading="lazy"`).
- Code splitting otomatis per route (Next.js App Router) + dynamic import untuk `ChatbotWidget` dan modul admin yang berat (DataTable dengan sorting kompleks) agar tidak membengkakkan bundle halaman publik.
- Font optimization (subsetting, `font-display: swap`).
- Debounce pada semua input search (300ms) untuk menghindari re-render berlebihan.
- Skeleton loading di semua fetch untuk mengurangi perceived loading time.
- Hindari animasi berat (§38) yang menyebabkan jank di perangkat low-end.
- Target acuan Core Web Vitals: LCP < 2.5s, CLS < 0.1, INP < 200ms.

---

# 31. LOADING STATE

Skeleton wajib untuk seluruh data dinamis:

| Konteks | Bentuk Skeleton |
|---|---|
| Doctor list | Grid card abu-abu dengan placeholder foto bulat + 2 baris teks |
| Service list | Grid card dengan placeholder icon + 2 baris teks |
| Article/News list | Card dengan placeholder gambar rasio 16:9 + 2 baris teks |
| Dashboard Overview | Placeholder untuk Upcoming Appointment Card + Quick Actions |
| Admin DataTable | Baris tabel abu-abu bergaris (shimmer) |
| Chat response | `TypingIndicator` (3-dot), bukan skeleton biasa (§15.2) |

Durasi simulasi delay: 300–800ms (list ringan) hingga 1.5–3s (khusus mock respons Customer Service, §16.4, agar terasa "manusiawi").

---

# 32. EMPTY STATE

| Konteks | Pesan | CTA |
|---|---|---|
| Hasil pencarian dokter kosong | "Tidak ada dokter yang sesuai dengan pencarian." | "Reset Filter" |
| Hasil pencarian global kosong | "Tidak ditemukan hasil untuk \"...\"." | "Tanya Nareva Care" |
| Dashboard Appointment (Upcoming) kosong | "Belum ada appointment mendatang." | "Buat Janji" |
| Dashboard Notification kosong | "Belum ada notifikasi." | — |
| Chat belum ada percakapan | "Belum ada percakapan." | "Mulai Chat" |
| Admin table kosong (mis. belum ada artikel) | "Belum ada data. Tambahkan data pertama Anda." | "+ Tambah [Entitas]" |

---

# 33. ERROR STATE

| Konteks | Pesan | Aksi |
|---|---|---|
| Fetch data gagal (list mana pun) | "Data gagal dimuat. Silakan coba lagi." | Tombol "Coba Lagi" (retry fetch) |
| Submit form gagal (simulasi) | "Terjadi kesalahan. Silakan coba beberapa saat lagi." | Data form tidak hilang, tombol submit kembali aktif |
| Login gagal | "Email atau password salah." | Field tetap terisi kecuali password |
| Halaman tidak ditemukan | Halaman 404 kustom dengan ilustrasi ringan | CTA "Kembali ke Beranda" |

Karena tidak ada backend sungguhan, error state dipicu melalui simulasi (mis. probabilitas kecil kegagalan acak pada mock service, atau tombol debug tersembunyi di dev mode) — cukup untuk mendemonstrasikan bahwa UI menangani kegagalan dengan baik.

---

# 34. MODAL SYSTEM

Modal dipakai untuk:

| Modal | Trigger | Ukuran |
|---|---|---|
| Cancel Appointment | Dashboard Appointment Detail | Kecil (confirmation) |
| Reschedule Appointment | Dashboard Appointment Detail | Sedang |
| Edit Profile (alternatif jika tidak inline) | Dashboard Profile | Sedang |
| Admin — Tambah/Edit Dokter, Layanan, Artikel, Berita, Fasilitas | Tombol "+ Tambah" / "Edit" di tabel admin | Besar (form panjang) |
| Admin — Delete Confirmation | Ikon hapus di tabel | Kecil |
| Facility Gallery Lightbox | Klik `FacilityCard` di `/fasilitas` | Besar (gambar) |
| Search Overlay (opsional dianggap modal full-screen) | Ikon search navbar | Full-screen (mobile) / Besar terpusat (desktop) |

**Perilaku standar modal:** overlay gelap semi-transparan, klik overlay menutup modal (kecuali form dengan perubahan belum disimpan → tampilkan konfirmasi "Perubahan belum disimpan, tetap tutup?"), focus trap aktif, responsive (full-screen di mobile untuk modal besar, centered card di desktop).

---

# 35. TOAST SYSTEM

| Trigger | Pesan | Tipe |
|---|---|---|
| Appointment berhasil dibuat | "Appointment berhasil dibuat." | success |
| Profil berhasil diubah | "Profil berhasil diperbarui." | success |
| Jadwal berhasil diubah (reschedule) | "Jadwal berhasil diubah." | success |
| Appointment dibatalkan | "Appointment dibatalkan." | info/warning |
| Pesan kontak terkirim | "Pesan berhasil dikirim." | success |
| Chat pesan gagal terkirim (simulasi offline) | "Pesan gagal terkirim. Coba lagi." | error |
| Admin — data berhasil ditambahkan/diubah/dihapus | "[Entitas] berhasil ditambahkan/diperbarui/dihapus." | success |
| Login/Register berhasil | "Login berhasil." / "Akun berhasil dibuat." | success |

Toast muncul di pojok kanan-atas (desktop) / atas layar penuh lebar (mobile), auto-dismiss 4 detik, dapat ditutup manual, maksimal 3 toast bertumpuk (yang lebih lama otomatis hilang).

---

# 36. GLOBAL SEARCH

Lihat detail perilaku di §13.3. Tambahan teknis: hasil pencarian diambil dari gabungan seluruh service (`doctorService`, `serviceService`, `articleService`, `newsService`, `facilityService`) dengan pencocokan sederhana (case-insensitive substring match pada nama/judul), dijalankan paralel via `Promise.all` untuk menjaga responsivitas.

---

# 37. FILTER SYSTEM

| Halaman | Filter Tersedia | Perilaku |
|---|---|---|
| `/dokter` | Spesialisasi (multi-select chip), Hari Praktik (chip), Lokasi (select), Ketersediaan Hari Ini (toggle) | Filter ter-refleksi di query param (§25.3), hasil update reaktif tanpa reload |
| `/layanan` | Kategori (chip) | idem |
| `/artikel`, `/berita` | Kategori/Tipe (chip) | idem + reset pagination ke halaman 1 saat filter berubah |
| `/admin/dokter`, `/admin/appointment`, dll. | Search + Select/Chip sesuai kolom relevan | Filter di sisi client (`Array.filter` pada data di store), tidak perlu fetch ulang |

Filter chip aktif ditampilkan sebagai badge yang dapat dihapus individual ("Anak ×", "Senin ×") + tombol "Reset Semua Filter".

---

# 38. ANIMATION & MOTION

Prinsip: **animasi sederhana yang mendukung usability, bukan dekorasi.**

| Elemen | Animasi | Durasi |
|---|---|---|
| Modal/Drawer muncul | Fade + slide/scale ringan | 200ms |
| ChatbotWidget muncul | Scale 0.95→1 + fade | 200ms |
| Toast muncul/hilang | Slide + fade | 250ms |
| Hover card (desktop) | Elevasi shadow + translateY(-2px) | 150ms |
| Skeleton | Shimmer loop | 1.2s infinite |
| Typing indicator | Bounce 3-dot | 1s infinite loop |
| Page transition | Fade sederhana (opsional, jangan gunakan transisi halaman kompleks yang memperlambat navigasi) | 150ms |

Animasi **tidak** dipakai untuk: perubahan status appointment (langsung tampil, tanpa transisi berlebihan), tabel admin (data berubah instan agar terasa responsif seperti aplikasi manajemen sungguhan).


---

# 39. USER FLOW UTAMA

## Flow 1 — Cari Dokter
```
Homepage → Cari Dokter (search/filter) → Doctor Card → Doctor Detail → Buat Janji
```

## Flow 2 — Smart Care Assistant
```
Homepage → Klik "Tanya Nareva Care" → User menjelaskan kebutuhan
→ Assistant memberi pilihan (DoctorCard/ServiceCard) → User memilih
→ Assistant memberi rekomendasi lanjutan → Doctor Detail → Buat Janji
```

## Flow 3 — Appointment (Booking End-to-End)
```
Doctor Detail → Buat Janji → Pilih Layanan (jika belum) → Pilih Dokter (jika belum)
→ Pilih Tanggal → Pilih Jam → Isi Data Pasien → Review → Konfirmasi
→ Success → (jika login) Dashboard / (jika guest) tawaran Buat Akun
```

## Flow 4 — Customer Service
```
Dashboard → Chat → Pilih "Customer Service" → Ketik pesan
→ Mock response (dengan typing indicator) → Percakapan berlanjut
→ (opsional) diarahkan kembali ke Dashboard Appointment untuk tindakan lanjutan
```

## Flow 5 — Admin Mengelola Data
```
Login (role admin) → Admin Dashboard → Pilih menu (mis. Dokter)
→ Lihat Table → Tambah/Edit/Hapus via Modal → Submit
→ Toast konfirmasi → Table ter-update reaktif
```

---

# 40. MVP DEFINITION

MVP harus dapat mendemonstrasikan alur end-to-end berikut, sepenuhnya dengan dummy data, tanpa backend:

```
Homepage
  ↓
Cari Dokter (search & filter berfungsi)
  ↓
Lihat Detail Dokter (jadwal terlihat jelas)
  ↓
Buat Janji (7 step lengkap, validasi berjalan)
  ↓
Appointment Berhasil (success state + nomor referensi)
  ↓
Login / Register (simulasi autentikasi)
  ↓
Dashboard (appointment yang baru dibuat terlihat)
  ↓
Buka Nareva Care (chatbot merespons minimal 6 intent, §14.4)
  ↓
Buka Customer Service (mock chat berjalan)
```

Admin Dashboard **P1** (penting namun tidak wajib demo di hari pertama) — cukup Overview + Dokter + Appointment management yang berfungsi untuk MVP tahap awal; sisanya (Layanan, Pasien, Artikel, Berita, Fasilitas, Settings admin) dapat menyusul di iterasi berikutnya sesuai §41.

---

# 41. DEVELOPMENT PRIORITY (P0 / P1 / P2)

## P0 — Wajib (MVP inti)
- Homepage lengkap dengan seluruh section
- Navbar, Footer, Emergency Access
- Halaman & Detail Dokter (search, filter, jadwal)
- Halaman Layanan
- Halaman Kontak
- Appointment/Buat Janji (7 step end-to-end)
- Login & Register (simulasi)
- Patient Dashboard: Overview, Appointment (list + detail + reschedule + cancel)
- Smart Care Assistant (chatbot) — minimal 6 intent
- Customer Service Chat (simulasi dasar)
- Responsive penuh (mobile-first) untuk seluruh item di atas

## P1 — Penting
- Detail Layanan, Fasilitas, Jadwal Dokter (halaman lintas-dokter)
- Artikel & Detail Artikel, Berita & Detail Berita
- Dashboard: Riwayat, Notification, Profile
- Admin Dashboard: Overview, Dokter, Jadwal, Appointment, Chat
- Global Search

## P2 — Tambahan
- Admin: Layanan, Pasien, Artikel, Berita, Fasilitas, Settings
- Mini-flow booking langsung di dalam chat (§14.6 opsional)
- Dark mode
- Grafik statistik admin (recharts)
- Buat Janji Ulang dari riwayat (rebook cepat)
- Sinkronisasi lintas-tab untuk Admin Chat (`BroadcastChannel`)
- Halaman Kebijakan Privasi & Syarat Ketentuan

---

# 42. ACCEPTANCE CRITERIA

## 42.1 Homepage
- [ ] Responsive di mobile, tablet, desktop tanpa elemen rusak/overflow.
- [ ] Navbar sticky & berfungsi (scroll shrink, drawer mobile, avatar state login).
- [ ] Seluruh Quick Action mengarah ke halaman yang benar.
- [ ] Section Dokter & Layanan menampilkan data dari mock service (bukan hardcode di komponen halaman).
- [ ] Smart Care widget dapat dibuka dari floating button maupun hero input.
- [ ] Emergency CTA selalu terlihat/dapat diakses di semua breakpoint.
- [ ] Footer lengkap dengan seluruh link fungsional.

## 42.2 Dokter
- [ ] Search & filter (spesialisasi, hari, ketersediaan) berfungsi dan hasilnya reaktif.
- [ ] Card responsive, hover state di desktop, tap state di mobile.
- [ ] Klik "Lihat Profil" membuka Detail Dokter dengan data yang sesuai.
- [ ] Jadwal praktik pada Detail Dokter menampilkan hari & jam dengan benar dari mock data.
- [ ] CTA "Buat Janji" membawa data dokter terpilih ke flow booking (prefill).

## 42.3 Appointment
- [ ] Ketujuh step dapat dilalui berurutan dengan progress indicator akurat.
- [ ] Validasi form Step 5 berjalan (required, format email/telepon), error ditampilkan jelas per field.
- [ ] Slot penuh tidak dapat dipilih (disabled).
- [ ] Step Review menampilkan seluruh data yang benar dan tombol Edit berfungsi kembali ke step terkait.
- [ ] Setelah konfirmasi, Success Page menampilkan nomor referensi unik.
- [ ] Appointment baru muncul di Dashboard Appointment (jika login) dengan status `Confirmed`.

## 42.4 Smart Care Assistant (Chatbot)
- [ ] Widget dapat dibuka & ditutup dari semua halaman publik & dashboard pasien.
- [ ] Responsive (desktop panel, mobile full-screen/bottom-sheet).
- [ ] Dapat menerima input teks & quick reply.
- [ ] Merespons minimal intent: Cari Dokter, Cari Layanan, Cek Jadwal, Info RS, Emergency, Fallback (§14.4).
- [ ] Menampilkan DoctorCard, ServiceCard, ScheduleCard, EmergencyCard sesuai konteks.
- [ ] Tidak memberikan diagnosis/rekomendasi obat dalam skenario apa pun (guardrail §14.2 teruji).
- [ ] Riwayat chat tersimpan di localStorage dan dapat dimuat ulang setelah refresh.

## 42.5 Dashboard Pasien
- [ ] Sidebar (desktop) / bottom navigation (mobile) berfungsi dan menandai halaman aktif.
- [ ] Upcoming Appointment tampil benar (atau EmptyState jika kosong).
- [ ] Reschedule & Cancel appointment mengubah status secara reaktif tanpa reload.
- [ ] Notification menampilkan unread badge yang akurat & dapat ditandai dibaca.
- [ ] Profile dapat diedit dan perubahan tersimpan (localStorage), tercermin di form booking berikutnya.

## 42.6 Admin
- [ ] Overview menampilkan statistik dummy dengan format yang benar.
- [ ] Tabel Dokter: tambah/edit/hapus berfungsi dan reaktif terhadap tabel tanpa reload.
- [ ] Tabel Appointment: filter & ubah status berfungsi sesuai aturan transisi status.
- [ ] Admin Chat menampilkan daftar percakapan & dapat membalas (masuk ke state chat terkait).
- [ ] Seluruh modal admin (tambah/edit/hapus) responsive & dapat diakses via keyboard.

---

# 43. DEVELOPMENT ROADMAP

| Fase | Fokus | Output |
|---|---|---|
| **Fase 0 — Setup** | Inisialisasi Next.js + TypeScript + Tailwind, setup design token (§21), setup folder structure (§26), setup Zustand store dasar, setup mock data awal | Skeleton project siap dikembangkan |
| **Fase 1 — Core Public + Booking (P0)** | Homepage, Dokter, Detail Dokter, Layanan, Kontak, Buat Janji end-to-end, Login/Register simulasi | Alur utama (Flow 1 & 3) dapat didemonstrasikan |
| **Fase 2 — Patient Experience (P0/P1)** | Patient Dashboard penuh (Overview, Appointment, Riwayat, Notification, Profile), Smart Care Assistant, Customer Service Chat | Flow 2 & 4 dapat didemonstrasikan; produk terasa seperti "platform", bukan sekadar company profile |
| **Fase 3 — Content & Discovery (P1)** | Artikel, Berita, Fasilitas, Jadwal Dokter, Global Search, Tentang Kami | Kelengkapan informasi rumah sakit |
| **Fase 4 — Admin Dashboard (P1/P2)** | Admin Overview, Dokter, Jadwal, Appointment, Chat, lalu Layanan/Pasien/Artikel/Berita/Fasilitas/Settings | Flow 5 dapat didemonstrasikan; kemampuan pengelolaan konten simulasi lengkap |
| **Fase 5 — Polish & QA** | Audit accessibility (§28), audit responsive di seluruh breakpoint, audit seluruh state (loading/empty/error/toast/modal), microcopy review Bahasa Indonesia | Produk siap didemokan sebagai prototype utuh |
| **Fase 6 — Future (Pasca Front-End)** | Integrasi backend/API nyata menggantikan `lib/services/*`, autentikasi sungguhan, payment gateway, notifikasi real-time, integrasi SIMRS | Di luar scope dokumen ini — lihat Lampiran A |

---

# LAMPIRAN A — ATURAN KONTEN & BATASAN MEDIS

1. Chatbot dan seluruh konten statis (artikel/FAQ) **tidak boleh** memberikan diagnosis, rekomendasi obat/dosis, atau pernyataan yang menggantikan keputusan klinis dokter (lihat §14.2 untuk detail teknis guardrail).
2. Data pasien yang ditampilkan di UI (admin maupun dashboard pasien) **tidak boleh** memuat data medis sensitif (rekam medis, diagnosis, riwayat penyakit) — cukup data administratif (nama, kontak, jadwal, status appointment).
3. Testimoni pasien menggunakan nama inisial/dummy, bukan identitas asli.
4. Kondisi darurat yang terdeteksi (via kata kunci di chatbot atau tombol Emergency) selalu diarahkan ke CTA "Hubungi IGD" — tidak pernah ditangani sebagai percakapan biasa.

# LAMPIRAN B — SIMULATED AUTHENTICATION

Karena tidak ada backend, autentikasi disimulasikan dengan kredensial hardcoded di mock service, disimpan sebagai sesi via `useAuthStore` (persist `localStorage`):

```typescript
// lib/services/authService.ts (mock)
const MOCK_USERS = [
  { email: 'user@example.com', password: 'password123', role: 'patient', name: 'Kevin Santoso' },
  { email: 'admin@example.com', password: 'admin123', role: 'admin', name: 'Admin Sari' },
];

export const authService = {
  async login(email: string, password: string) {
    await simulateDelay(null, 800);
    const found = MOCK_USERS.find((u) => u.email === email && u.password === password);
    if (!found) throw new Error('INVALID_CREDENTIALS');
    return { id: crypto.randomUUID(), role: found.role, name: found.name, email: found.email };
  },
  async register(data: RegisterInput) {
    await simulateDelay(null, 800);
    // Simulasi sukses — tidak benar-benar menyimpan ke "database" permanen,
    // hanya mengembalikan objek user baru untuk keperluan alur demo.
    return { id: crypto.randomUUID(), role: 'patient' as const, name: data.name, email: data.email };
  },
};
```

Tidak ada enkripsi/hashing sungguhan karena ini murni simulasi UI — **wajib diganti autentikasi backend nyata sebelum produksi.**

# LAMPIRAN C — CATATAN ORISINALITAS DESAIN

- Seluruh referensi (RS Islam Jakarta, Medistra, Yadika, Sukmul Medika, Atma Jaya, RS Muhammadiyah Bandung, RS Advent Bandung, RSIA Melinda, Karya Bhakti Pratiwi, RS PMI Bogor, Royal Surabaya, RS Ummi Bogor, RS Pondok Indah, Siloam, RSPP, Altius Hospitals, Mayo Clinic) digunakan **hanya** untuk mempelajari pola struktur informasi, navigasi, dan jenis fitur umum di industri rumah sakit — bukan untuk ditiru desainnya.
- Identitas "RS Nareva" dan "Nareva Care" adalah nama fiktif yang dibuat khusus untuk dokumen ini; tim desain tetap bebas mengganti nama/brand sesuai kebutuhan proyek sungguhan.
- Warna, tipografi, dan komponen di §21 adalah titik awal (starting point) yang harus dikembangkan lebih lanjut oleh tim desain agar tidak menyerupai identitas visual rumah sakit mana pun yang telah ada.
- Tidak ada logo, foto, teks, nama dokter, atau data pasien dari website referensi yang boleh digunakan langsung — seluruh konten dalam prototype menggunakan dummy/mock data yang dibuat baru.

---

**— Akhir Dokumen —**
