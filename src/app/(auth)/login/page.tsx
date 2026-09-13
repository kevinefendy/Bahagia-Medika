'use client';
import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowRight,
  ShieldCheck,
  Clock,
  Stethoscope,
  Mail,
  Lock,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  PhoneCall,
  Sparkles,
  KeyRound,
  UserCheck,
  Building2,
} from 'lucide-react';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import Logo from '@/components/ui/Logo';
import Modal from '@/components/ui/Modal';
import { useAuthStore } from '@/lib/store/useAuthStore';
import { useUIStore } from '@/lib/store/useUIStore';

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login, isLoading, error, clearError } = useAuthStore();
  const addToast = useUIStore((s) => s.addToast);

  const [activeRole, setActiveRole] = useState<'patient' | 'admin'>('patient');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotSent, setForgotSent] = useState(false);

  const isRequiredNotice = searchParams.get('required') === 'buat-janji';

  const handleQuickFill = (role: 'patient' | 'admin') => {
    setActiveRole(role);
    clearError();
    if (role === 'patient') {
      setEmail('user@example.com');
      setPassword('password123');
      addToast({
        type: 'info',
        message: 'Kredensial Pasien (Kevin Santoso) berhasil diisikan.',
      });
    } else {
      setEmail('admin@example.com');
      setPassword('admin123');
      addToast({
        type: 'info',
        message: 'Kredensial Admin Rumah Sakit berhasil diisikan.',
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(email, password);
    const user = useAuthStore.getState().user;
    if (user) {
      addToast({
        type: 'success',
        message: `Selamat datang kembali, ${user.name}! Akses penuh layanan aktif.`,
      });
      if (user.role === 'admin') {
        router.push('/admin');
      } else {
        // User request: "baru setelah login pindah ke homepage baru bisa full akses"
        router.push('/');
      }
    }
  };

  const handleForgotSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!forgotEmail) return;
    setForgotSent(true);
    setTimeout(() => {
      addToast({
        type: 'success',
        message: 'Instruksi reset kata sandi telah dikirim ke email / WhatsApp Anda.',
      });
      setShowForgotModal(false);
      setForgotSent(false);
      setForgotEmail('');
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left Panel: Clinical Hospital Branding & Visuals (Desktop) */}
      <div className="relative hidden lg:flex lg:w-1/2 xl:w-5/12 bg-[#18313D] text-white flex-col justify-between p-10 xl:p-14 overflow-hidden">
        {/* Photographic background image with deep gradient overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1200&auto=format&fit=crop&q=80"
            alt="RS Bahagia Medika Modern Clinic"
            className="w-full h-full object-cover opacity-40 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#18313D] via-[#18313D]/85 to-[#214F60]/75" />
        </div>

        {/* Ambient glow effects */}
        <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-[#78AFC0]/15 rounded-full blur-3xl pointer-events-none" />
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
            <span>PORTAL KESEHATAN DIGITAL MYMEDIKA</span>
          </div>

          <h2 className="text-3xl xl:text-4xl font-black text-white tracking-tight leading-tight">
            Akses Pelayanan Medis Paripurna dalam Satu Genggaman.
          </h2>

          <p className="text-sm xl:text-base text-white/80 leading-relaxed max-w-md">
            Pantau antrean rawat jalan real-time, unduh hasil laboratorium resmi tervalidasi spesialis, serta tebus resep farmasi 24 jam dengan mudah dan aman.
          </p>

          {/* Trust badges grid */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-xs">
              <div className="flex items-center gap-2 text-white font-bold text-xs mb-1">
                <ShieldCheck className="w-4 h-4 text-[#4ade80]" />
                <span>Akreditasi KARS</span>
              </div>
              <p className="text-[11px] text-white/60">Tingkat Paripurna Bintang 5 Kemenkes RI</p>
            </div>

            <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-xs">
              <div className="flex items-center gap-2 text-white font-bold text-xs mb-1">
                <Lock className="w-4 h-4 text-[#98D2E1]" />
                <span>ISO/IEC 27001</span>
              </div>
              <p className="text-[11px] text-white/60">Privasi & Rekam Medis Pasien Terenkripsi</p>
            </div>
          </div>

          {/* Testimonial preview */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-white/10 to-white/5 border border-white/10 backdrop-blur-md">
            <p className="text-xs text-white/90 italic leading-relaxed">
              &ldquo;Hasil tes darah dan profil kolesterol langsung dapat diunduh 2 jam setelah pengambilan sampel. Barcode di ponsel memudahkan pendaftaran mandiri tanpa antre di loket.&rdquo;
            </p>
            <div className="flex items-center gap-2 mt-2 pt-2 border-t border-white/10 text-[11px]">
              <div className="w-5 h-5 rounded-full bg-[#285F75] text-white flex items-center justify-center font-bold text-[10px]">
                KS
              </div>
              <span className="font-semibold text-white">Kevin S.</span>
              <span className="text-white/60">&bull; Pasien Rawat Jalan Poli Jantung</span>
            </div>
          </div>
        </div>

        {/* Bottom footer info */}
        <div className="relative z-10 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-white/70">
          <div className="flex items-center gap-1.5">
            <PhoneCall className="w-3.5 h-3.5 text-rose-400" />
            <span>IGD 24 Jam: <strong>(021) 7890-9999</strong></span>
          </div>
          <span>&copy; {new Date().getFullYear()} RS Bahagia Medika</span>
        </div>
      </div>

      {/* Right Panel: Login Form & Role Switcher */}
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
              Masuk ke MyMedika
            </h1>
            <p className="text-xs sm:text-sm text-[var(--color-text-secondary)] mt-1">
              Silakan pilih tipe akun dan masukkan kredensial terdaftar Anda.
            </p>
          </div>

          {/* Service Access Requirement Notice */}
          {isRequiredNotice && (
            <div className="mb-5 p-3.5 rounded-xl bg-amber-50 border border-amber-200/90 text-amber-900 text-xs flex items-center gap-2.5 shadow-2xs animate-fade-in">
              <Lock className="w-4 h-4 text-amber-600 shrink-0" />
              <span>
                Layanan <strong>Buat Janji & Konsultasi Dokter</strong> memerlukan akun pasien. Silakan masuk terlebih dahulu untuk membuka akses penuh.
              </span>
            </div>
          )}

          {/* Role Switcher Tabs */}
          <div className="grid grid-cols-2 p-1 bg-gray-200/80 rounded-xl mb-5">
            <button
              type="button"
              onClick={() => {
                setActiveRole('patient');
                clearError();
              }}
              className={`py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                activeRole === 'patient'
                  ? 'bg-white text-[var(--color-primary)] shadow-xs'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span>Pasien / Keluarga</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveRole('admin');
                clearError();
              }}
              className={`py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                activeRole === 'admin'
                  ? 'bg-white text-[var(--color-primary)] shadow-xs'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>Staf Medis / Admin</span>
            </button>
          </div>

          {/* 1-Click Auto Fill Demo Pill */}
          <div className="mb-5 p-3.5 rounded-xl bg-white border border-teal-200/80 shadow-2xs">
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1">
                <KeyRound className="w-3 h-3 text-[var(--color-primary)]" />
                Uji Coba Cepat (Demo 1-Klik)
              </span>
              <span className="text-[10px] text-teal-700 font-semibold bg-teal-50 px-2 py-0.5 rounded-full">
                Siap Pakai
              </span>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => handleQuickFill('patient')}
                className={`flex-1 py-1.5 px-2.5 rounded-lg text-xs font-bold border transition-all flex items-center justify-center gap-1.5 ${
                  activeRole === 'patient' && email === 'user@example.com'
                    ? 'bg-[var(--color-primary)] text-white border-[var(--color-primary)] shadow-2xs'
                    : 'bg-teal-50/50 hover:bg-teal-100/70 border-teal-200 text-teal-900'
                }`}
              >
                <UserCheck className="w-3.5 h-3.5" />
                <span>Akun Pasien</span>
              </button>
              <button
                type="button"
                onClick={() => handleQuickFill('admin')}
                className={`flex-1 py-1.5 px-2.5 rounded-lg text-xs font-bold border transition-all flex items-center justify-center gap-1.5 ${
                  activeRole === 'admin' && email === 'admin@example.com'
                    ? 'bg-[var(--color-primary)] text-white border-[var(--color-primary)] shadow-2xs'
                    : 'bg-indigo-50/50 hover:bg-indigo-100/70 border-indigo-200 text-indigo-900'
                }`}
              >
                <Building2 className="w-3.5 h-3.5" />
                <span>Akun Admin</span>
              </button>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Alamat Email"
              type="email"
              placeholder="nama@email.com"
              required
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                clearError();
              }}
              leftIcon={<Mail className="h-4 w-4" />}
            />

            <Input
              label="Kata Sandi (Password)"
              type="password"
              placeholder="Masukkan kata sandi akun"
              required
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                clearError();
              }}
              leftIcon={<Lock className="h-4 w-4" />}
            />

            {/* Remember me & Forgot password */}
            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-2 cursor-pointer text-gray-600 select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-gray-300 text-[var(--color-primary)] focus:ring-[var(--color-primary)]"
                />
                <span>Ingat saya di perangkat ini</span>
              </label>

              <button
                type="button"
                onClick={() => setShowForgotModal(true)}
                className="font-bold text-[var(--color-primary)] hover:underline"
              >
                Lupa kata sandi?
              </button>
            </div>

            {error && (
              <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-xl flex items-start gap-2.5 text-xs text-rose-800 animate-shake">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold">Gagal Masuk</p>
                  <p className="mt-0.5">{error}</p>
                </div>
              </div>
            )}

            <Button
              type="submit"
              variant="primary"
              isLoading={isLoading}
              className="w-full text-sm font-bold py-3 shadow-sm hover:shadow-md transition-all"
              size="lg"
            >
              <span>Masuk Sekarang</span>
              <ArrowRight className="h-4 w-4 ml-1.5" />
            </Button>
          </form>

          {/* Registration link */}
          <div className="mt-6 text-center text-xs text-[var(--color-text-secondary)]">
            Belum memiliki akun rekam medis?{' '}
            <Link
              href="/register"
              className="font-bold text-[var(--color-primary)] hover:underline"
            >
              Daftar Akun Baru
            </Link>
          </div>

          {/* Security footnote */}
          <div className="mt-8 pt-5 border-t border-gray-200 text-center flex items-center justify-center gap-1.5 text-[11px] text-gray-500">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Sesi aman terenkripsi SSL 256-bit standar medis Kemenkes RI</span>
          </div>
        </div>

        {/* Right footer copyright */}
        <div className="text-center text-[11px] text-gray-400 pt-6">
          Butuh bantuan pendaftaran? Hubungi Customer Care (021) 7890-1234
        </div>
      </div>

      {/* Forgot Password Modal */}
      <Modal
        isOpen={showForgotModal}
        onClose={() => setShowForgotModal(false)}
        title="Pemulihan Kata Sandi Akun"
        size="sm"
      >
        <form onSubmit={handleForgotSubmit} className="space-y-4 py-1 text-xs">
          <p className="text-[var(--color-text-secondary)]">
            Masukkan alamat email yang terdaftar pada akun Bahagia Medika Anda. Kami akan mengirimkan tautan verifikasi pemulihan sandi.
          </p>

          <Input
            label="Alamat Email Terdaftar"
            type="email"
            placeholder="nama@email.com"
            required
            value={forgotEmail}
            onChange={(e) => setForgotEmail(e.target.value)}
            leftIcon={<Mail className="h-4 w-4" />}
          />

          <div className="p-3 bg-teal-50 rounded-xl border border-teal-200 text-teal-900 text-[11px] flex items-start gap-2">
            <HelpCircle className="w-4 h-4 shrink-0 text-teal-700 mt-0.5" />
            <span>
              Jika nomor WhatsApp Anda terdaftar, kode OTP verifikasi juga akan dikirimkan otomatis secara instan.
            </span>
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-gray-100">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setShowForgotModal(false)}
            >
              Batal
            </Button>
            <Button
              type="submit"
              variant="primary"
              size="sm"
              isLoading={forgotSent}
            >
              Kirim Tautan Reset
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-slate-50">
          <div className="animate-pulse space-y-4 w-full max-w-md p-8">
            <div className="h-8 bg-gray-200 rounded w-1/2 mx-auto" />
            <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto" />
            <div className="h-12 bg-gray-200 rounded" />
            <div className="h-12 bg-gray-200 rounded" />
            <div className="h-12 bg-gray-200 rounded" />
          </div>
        </div>
      }
    >
      <LoginContent />
    </Suspense>
  );
}
