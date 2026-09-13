'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowRight,
  ShieldCheck,
  UserCheck,
  Mail,
  Lock,
  Phone,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  KeyRound,
  FileCheck,
  Building2,
  HeartPulse,
  Pill,
  Clock,
  Check,
} from 'lucide-react';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import Logo from '@/components/ui/Logo';
import { useAuthStore } from '@/lib/store/useAuthStore';
import { useUIStore } from '@/lib/store/useUIStore';

export default function RegisterPage() {
  const router = useRouter();
  const { register, isLoading, error, clearError } = useAuthStore();
  const addToast = useUIStore((s) => s.addToast);

  const [form, setForm] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
    hasExistingRm: false,
    rmNumber: '',
    agreeTerms: true,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Password strength calculation
  const getPasswordStrength = (pass: string) => {
    let score = 0;
    if (pass.length >= 8) score += 1;
    if (/[0-9]/.test(pass)) score += 1;
    if (/[A-Z]/.test(pass)) score += 1;
    if (/[^A-Za-z0-9]/.test(pass)) score += 1;
    return score;
  };

  const passStrength = getPasswordStrength(form.password);

  const handleQuickFill = () => {
    setForm({
      name: 'Rian Pratama',
      email: 'rian.pratama@example.com',
      phoneNumber: '081298765432',
      password: 'Password123!',
      confirmPassword: 'Password123!',
      hasExistingRm: true,
      rmNumber: 'BM-2026-77821',
      agreeTerms: true,
    });
    setErrors({});
    clearError();
    addToast({
      type: 'info',
      message: 'Formulir demo pasien berhasil diisi otomatis.',
    });
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!form.name.trim()) newErrors.name = 'Nama lengkap wajib diisi';
    if (!form.email.trim()) newErrors.email = 'Alamat email wajib diisi';
    else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = 'Format email tidak valid';
    if (!form.phoneNumber.trim()) newErrors.phoneNumber = 'Nomor telepon/WhatsApp wajib diisi';
    else if (form.phoneNumber.length < 9) newErrors.phoneNumber = 'Nomor telepon minimal 9 digit';
    if (!form.password) newErrors.password = 'Kata sandi wajib diisi';
    else if (form.password.length < 8) newErrors.password = 'Kata sandi minimal 8 karakter';
    if (form.password !== form.confirmPassword) newErrors.confirmPassword = 'Konfirmasi kata sandi tidak cocok';
    if (!form.agreeTerms) newErrors.agreeTerms = 'Anda harus menyetujui syarat & ketentuan';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    await register({
      name: form.name,
      email: form.email,
      phoneNumber: form.phoneNumber,
      password: form.password,
    });

    const user = useAuthStore.getState().user;
    if (user) {
      addToast({
        type: 'success',
        message: `Pendaftaran berhasil! Selamat datang, ${user.name}. Anda kini memiliki akses penuh ke seluruh layanan.`,
      });
      router.push('/');
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left Panel: Clinical Hospital Branding & Visuals (Desktop) */}
      <div className="relative hidden lg:flex lg:w-1/2 xl:w-5/12 bg-[#18313D] text-white flex-col justify-between p-10 xl:p-14 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=1200&auto=format&fit=crop&q=80"
            alt="RS Bahagia Medika Care Excellence"
            className="w-full h-full object-cover opacity-40 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#18313D] via-[#18313D]/85 to-[#214F60]/75" />
        </div>

        {/* Ambient glow effects */}
        <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-[#78AFC0]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-[#285F75]/30 rounded-full blur-3xl pointer-events-none" />

        {/* Top bar */}
        <div className="relative z-10 flex items-center justify-between">
          <Logo variant="full" size="md" light href="/" />
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-white/80 hover:text-white bg-white/10 hover:bg-white/15 px-3 py-1.5 rounded-lg backdrop-blur-md transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Kembali ke Beranda</span>
          </Link>
        </div>

        {/* Center Content */}
        <div className="relative z-10 my-auto py-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-white/10 border border-white/15 text-[#98D2E1] backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-[#98D2E1]" />
            <span>REGISTRASI REKAM MEDIS DIGITAL</span>
          </div>

          <h2 className="text-3xl xl:text-4xl font-black text-white tracking-tight leading-tight">
            Bergabung dengan Layanan Kesehatan Modern & Tepercaya.
          </h2>

          <p className="text-sm xl:text-base text-white/80 leading-relaxed max-w-md">
            Satu akun untuk seluruh kebutuhan kesehatan Anda dan keluarga. Nikmati kemudahan reservasi dokter, pantau hasil lab, hingga pengantaran obat ke rumah.
          </p>

          {/* 4 Feature list items */}
          <div className="space-y-3 pt-2">
            {[
              {
                icon: HeartPulse,
                title: 'Akses 120+ Dokter Spesialis',
                desc: 'Konsultasi rawat jalan, telemedika, dan jadwal dokter terpadu.',
              },
              {
                icon: ShieldCheck,
                title: 'Kartu CarePass & QR Kiosk Check-In',
                desc: 'Pendaftaran mandiri di mesin APM lobi tanpa perlu antre di loket.',
              },
              {
                icon: FileCheck,
                title: 'Hasil Lab & Radiologi Digital',
                desc: 'Unduh dokumen resmi tervalidasi dokter spesialis langsung dari ponsel.',
              },
              {
                icon: Pill,
                title: 'Pelacakan Farmasi 24 Jam',
                desc: 'Pantau status racikan obat dan layanan tebus ulang resep praktis.',
              },
            ].map((feat) => (
              <div
                key={feat.title}
                className="flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-xs"
              >
                <div className="p-2 rounded-lg bg-white/15 text-[#98D2E1] shrink-0 mt-0.5">
                  <feat.icon className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-xs text-white">{feat.title}</h4>
                  <p className="text-[11px] text-white/70 mt-0.5">{feat.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom footer info */}
        <div className="relative z-10 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-white/70">
          <span>Standar Akreditasi Kemenkes RI & KARS</span>
          <span>&copy; {new Date().getFullYear()} RS Bahagia Medika</span>
        </div>
      </div>

      {/* Right Panel: Register Form */}
      <div className="flex-1 flex flex-col justify-between bg-slate-50 p-6 sm:p-10 lg:p-12 xl:p-16 overflow-y-auto">
        {/* Mobile top bar */}
        <div className="lg:hidden flex items-center justify-between pb-6 mb-4 border-b border-gray-200">
          <Logo variant="full" size="md" href="/" />
          <Link
            href="/"
            className="text-xs font-semibold text-[var(--color-primary)] inline-flex items-center gap-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Beranda</span>
          </Link>
        </div>

        <div className="w-full max-w-md mx-auto my-auto py-4">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-2xl sm:text-3xl font-black text-[var(--color-text-primary)] tracking-tight">
              Buat Akun Pasien Baru
            </h1>
            <p className="text-xs sm:text-sm text-[var(--color-text-secondary)] mt-1">
              Lengkapi informasi di bawah ini untuk mengaktifkan akun rekam medis Anda.
            </p>
          </div>

          {/* 1-Click Demo Fill */}
          <div className="mb-5 p-3 rounded-xl bg-white border border-teal-200/80 flex items-center justify-between gap-2 shadow-2xs">
            <div className="text-xs">
              <span className="font-bold text-gray-800 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-[var(--color-primary)]" />
                Uji Coba Cepat
              </span>
              <p className="text-[11px] text-gray-500">Isi formulir otomatis dengan data contoh</p>
            </div>
            <button
              type="button"
              onClick={handleQuickFill}
              className="py-1.5 px-3 rounded-lg text-xs font-bold bg-teal-50 hover:bg-teal-100 text-teal-800 border border-teal-200 transition-colors shrink-0 flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Isi Otomatis</span>
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Nama Lengkap (Sesuai KTP)"
              placeholder="Contoh: Rian Pratama"
              required
              value={form.name}
              onChange={(e) => {
                setForm({ ...form, name: e.target.value });
                if (errors.name) setErrors({ ...errors, name: '' });
              }}
              error={errors.name}
              leftIcon={<UserCheck className="h-4 w-4" />}
            />

            <Input
              label="Alamat Email Aktif"
              type="email"
              placeholder="nama@email.com"
              required
              value={form.email}
              onChange={(e) => {
                setForm({ ...form, email: e.target.value });
                if (errors.email) setErrors({ ...errors, email: '' });
              }}
              error={errors.email}
              leftIcon={<Mail className="h-4 w-4" />}
            />

            <Input
              label="Nomor Telepon / WhatsApp"
              type="tel"
              placeholder="Contoh: 08123456789"
              required
              value={form.phoneNumber}
              onChange={(e) => {
                setForm({ ...form, phoneNumber: e.target.value });
                if (errors.phoneNumber) setErrors({ ...errors, phoneNumber: '' });
              }}
              error={errors.phoneNumber}
              leftIcon={<Phone className="h-4 w-4" />}
            />

            <div>
              <Input
                label="Kata Sandi (Password)"
                type="password"
                placeholder="Minimal 8 karakter"
                required
                value={form.password}
                onChange={(e) => {
                  setForm({ ...form, password: e.target.value });
                  if (errors.password) setErrors({ ...errors, password: '' });
                }}
                error={errors.password}
                leftIcon={<Lock className="h-4 w-4" />}
              />

              {/* Password strength meter */}
              {form.password && (
                <div className="mt-2 space-y-1.5">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-gray-500">Kekuatan Sandi:</span>
                    <span
                      className={`font-bold ${
                        passStrength <= 1
                          ? 'text-rose-600'
                          : passStrength <= 3
                          ? 'text-amber-600'
                          : 'text-emerald-600'
                      }`}
                    >
                      {passStrength <= 1
                        ? 'Lemah'
                        : passStrength <= 3
                        ? 'Sedang'
                        : 'Kuat'}
                    </span>
                  </div>

                  {/* 4 segments */}
                  <div className="grid grid-cols-4 gap-1.5 h-1.5">
                    {[1, 2, 3, 4].map((step) => (
                      <div
                        key={step}
                        className={`rounded-full h-full transition-all ${
                          passStrength >= step
                            ? passStrength <= 1
                              ? 'bg-rose-500'
                              : passStrength <= 3
                              ? 'bg-amber-500'
                              : 'bg-emerald-500'
                            : 'bg-gray-200'
                        }`}
                      />
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-2 text-[10px] text-gray-500 pt-0.5">
                    <span className={form.password.length >= 8 ? 'text-emerald-600 font-bold' : ''}>
                      &bull; Min. 8 karakter
                    </span>
                    <span className={/[0-9]/.test(form.password) ? 'text-emerald-600 font-bold' : ''}>
                      &bull; Angka (0-9)
                    </span>
                    <span className={/[A-Z]/.test(form.password) ? 'text-emerald-600 font-bold' : ''}>
                      &bull; Huruf Besar (A-Z)
                    </span>
                  </div>
                </div>
              )}
            </div>

            <Input
              label="Konfirmasi Kata Sandi"
              type="password"
              placeholder="Ulangi kata sandi"
              required
              value={form.confirmPassword}
              onChange={(e) => {
                setForm({ ...form, confirmPassword: e.target.value });
                if (errors.confirmPassword) setErrors({ ...errors, confirmPassword: '' });
              }}
              error={errors.confirmPassword}
              leftIcon={<Lock className="h-4 w-4" />}
            />

            {/* Optional Medical Record Number check */}
            <div className="p-3.5 rounded-xl bg-white border border-gray-200/80 space-y-2.5">
              <label className="flex items-start gap-2.5 cursor-pointer text-xs select-none">
                <input
                  type="checkbox"
                  checked={form.hasExistingRm}
                  onChange={(e) => setForm({ ...form, hasExistingRm: e.target.checked })}
                  className="mt-0.5 rounded border-gray-300 text-[var(--color-primary)] focus:ring-[var(--color-primary)]"
                />
                <div>
                  <span className="font-bold text-gray-800">
                    Saya sudah pernah berobat di RS Bahagia Medika
                  </span>
                  <p className="text-[11px] text-gray-500 mt-0.5">
                    Centang untuk menyambungkan nomor rekam medis fisik Anda dengan akun digital ini.
                  </p>
                </div>
              </label>

              {form.hasExistingRm && (
                <div className="pt-2 border-t border-gray-100">
                  <Input
                    label="Nomor Rekam Medis (No. RM)"
                    placeholder="Contoh: BM-2026-88910"
                    value={form.rmNumber}
                    onChange={(e) => setForm({ ...form, rmNumber: e.target.value })}
                    helperText="Tercantum pada kartu berobat fisik atau bukti kwitansi Anda"
                  />
                </div>
              )}
            </div>

            {/* Terms and conditions */}
            <div>
              <label className="flex items-start gap-2.5 cursor-pointer text-xs select-none">
                <input
                  type="checkbox"
                  checked={form.agreeTerms}
                  onChange={(e) => {
                    setForm({ ...form, agreeTerms: e.target.checked });
                    if (errors.agreeTerms) setErrors({ ...errors, agreeTerms: '' });
                  }}
                  className="mt-0.5 rounded border-gray-300 text-[var(--color-primary)] focus:ring-[var(--color-primary)]"
                />
                <span className="text-gray-600 leading-relaxed text-[11px]">
                  Saya menyetujui{' '}
                  <Link href="/tentang" className="text-[var(--color-primary)] font-bold hover:underline">
                    Ketentuan Layanan
                  </Link>{' '}
                  serta{' '}
                  <Link href="/tentang" className="text-[var(--color-primary)] font-bold hover:underline">
                    Kebijakan Privasi Rekam Medis
                  </Link>{' '}
                  RS Bahagia Medika.
                </span>
              </label>
              {errors.agreeTerms && (
                <p className="text-xs text-rose-600 mt-1">{errors.agreeTerms}</p>
              )}
            </div>

            {error && (
              <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-xl flex items-start gap-2.5 text-xs text-rose-800">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <p>{error}</p>
              </div>
            )}

            <Button
              type="submit"
              variant="primary"
              isLoading={isLoading}
              className="w-full text-sm font-bold py-3 shadow-sm hover:shadow-md transition-all"
              size="lg"
            >
              <span>Daftar Akun Sekarang</span>
              <ArrowRight className="h-4 w-4 ml-1.5" />
            </Button>
          </form>

          {/* Login link */}
          <div className="mt-6 text-center text-xs text-[var(--color-text-secondary)]">
            Sudah memiliki akun terdaftar?{' '}
            <Link
              href="/login"
              className="font-bold text-[var(--color-primary)] hover:underline"
            >
              Masuk ke Akun Anda
            </Link>
          </div>

          {/* Security footnote */}
          <div className="mt-8 pt-5 border-t border-gray-200 text-center flex items-center justify-center gap-1.5 text-[11px] text-gray-500">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Data pasien dienkripsi sesuai regulasi PMK Rekam Medis Elektronik</span>
          </div>
        </div>

        {/* Right footer copyright */}
        <div className="text-center text-[11px] text-gray-400 pt-6">
          Pusat Bantuan Pendaftaran: (021) 7890-1234 ext 101
        </div>
      </div>
    </div>
  );
}
