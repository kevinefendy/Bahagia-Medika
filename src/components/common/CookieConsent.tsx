'use client';

import { useState, useEffect } from 'react';
import {
  Cookie,
  ShieldCheck,
  SlidersHorizontal,
  BarChart3,
  Settings2,
  HeartHandshake,
  Check,
  X,
  Lock,
} from 'lucide-react';

interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  functional: boolean;
  marketing: boolean;
  timestamp: string;
}

const STORAGE_KEY = 'bahagia_cookie_consent';

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [preferences, setPreferences] = useState({
    analytics: true,
    functional: true,
    marketing: false,
  });

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (!saved) {
        // Show after a brief delay for a clean smooth entrance
        const timer = setTimeout(() => setIsVisible(true), 500);
        return () => clearTimeout(timer);
      } else {
        const timer = setTimeout(() => {
          try {
            const parsed = JSON.parse(saved);
            setPreferences({
              analytics: !!parsed.analytics,
              functional: !!parsed.functional,
              marketing: !!parsed.marketing,
            });
          } catch {
            // ignore JSON parse errors
          }
        }, 0);
        return () => clearTimeout(timer);
      }
    } catch {
      const timer = setTimeout(() => setIsVisible(true), 500);
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    // Custom event to reopen cookie settings modal anytime (e.g. from footer)
    const handleOpenSettings = () => {
      setIsModalOpen(true);
      setIsPrivacyOpen(false);
      setIsVisible(true);
    };

    const handleOpenPrivacy = () => {
      setIsPrivacyOpen(true);
      setIsModalOpen(false);
      setIsVisible(true);
    };

    window.addEventListener('open-cookie-settings', handleOpenSettings);
    window.addEventListener('open-privacy-statement', handleOpenPrivacy);
    return () => {
      window.removeEventListener('open-cookie-settings', handleOpenSettings);
      window.removeEventListener('open-privacy-statement', handleOpenPrivacy);
    };
  }, []);

  const saveConsent = (prefs: { analytics: boolean; functional: boolean; marketing: boolean }) => {
    const payload: CookiePreferences = {
      necessary: true,
      ...prefs,
      timestamp: new Date().toISOString(),
    };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch {
      // ignore
    }
    setPreferences(prefs);
    setIsVisible(false);
    setIsModalOpen(false);
    setIsPrivacyOpen(false);
  };

  const handleAcceptAll = () => {
    saveConsent({
      analytics: true,
      functional: true,
      marketing: true,
    });
  };

  const handleRejectNonEssential = () => {
    saveConsent({
      analytics: false,
      functional: false,
      marketing: false,
    });
  };

  const handleSaveCustom = () => {
    saveConsent(preferences);
  };

  if (!isVisible && !isModalOpen && !isPrivacyOpen) return null;

  return (
    <>
      {/* 1. Cookie Notice Banner (Bottom-docked / floating) */}
      {isVisible && !isModalOpen && !isPrivacyOpen && (
        <div
          role="region"
          aria-label="Preferensi Cookie & Privasi"
          className="fixed bottom-20 md:bottom-6 left-3 right-3 sm:left-6 sm:right-6 lg:left-auto lg:right-6 lg:max-w-xl z-50 bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-[var(--color-border)] p-4 sm:p-5 animate-slide-up"
        >
          <div className="flex items-start gap-3.5">
            <div className="h-10 w-10 rounded-xl bg-[var(--color-primary-light)] text-[var(--color-primary)] flex items-center justify-center shrink-0 border border-[var(--color-primary)]/20 mt-0.5">
              <Cookie className="h-5 w-5" />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1.5">
                <h3 className="text-sm font-bold text-[var(--color-text-primary)]">
                  Preferensi Cookie & Privasi
                </h3>
                <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  Data Terenkripsi
                </span>
              </div>

              <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed mb-3.5">
                Dengan memilih <strong className="font-semibold text-[var(--color-text-primary)]">“Setujui Semua Cookie”</strong>, Anda menyetujui penyimpanan cookie pada perangkat Anda guna meningkatkan kelancaran bernavigasi, menganalisis performa lalu lintas situs, dan mendukung penyempurnaan layanan kesehatan kami. Pelajari selengkapnya melalui{' '}
                <button
                  type="button"
                  onClick={() => setIsPrivacyOpen(true)}
                  className="text-[var(--color-primary)] font-semibold underline hover:text-[var(--color-primary-dark)] cursor-pointer"
                >
                  pernyataan privasi
                </button>
                .
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(true)}
                  className="order-2 sm:order-1 inline-flex items-center justify-center gap-1.5 px-3.5 py-2 bg-white hover:bg-gray-50 border border-[var(--color-border)] text-[var(--color-text-primary)] text-xs font-semibold rounded-xl transition-colors cursor-pointer"
                >
                  <SlidersHorizontal className="w-3.5 h-3.5 text-gray-500" />
                  <span>Pengaturan Cookie</span>
                </button>

                <button
                  type="button"
                  onClick={handleAcceptAll}
                  className="order-1 sm:order-2 flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white text-xs font-bold rounded-xl transition-all shadow-xs cursor-pointer active:scale-95"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>Setujui Semua Cookie</span>
                </button>

                <button
                  type="button"
                  onClick={handleRejectNonEssential}
                  className="order-3 text-xs font-medium text-gray-500 hover:text-gray-800 py-1.5 px-2 text-center transition-colors cursor-pointer"
                >
                  Hanya Wajib
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. Manage Cookies Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
          <div
            className="bg-white rounded-2xl shadow-2xl border border-[var(--color-border)] w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh] animate-scale-in"
            role="dialog"
            aria-modal="true"
            aria-labelledby="cookie-modal-title"
          >
            {/* Modal Header */}
            <div className="px-5 py-4 border-b border-[var(--color-border)] flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[var(--color-primary-light)] text-[var(--color-primary)] flex items-center justify-center">
                  <SlidersHorizontal className="w-4 h-4" />
                </div>
                <div>
                  <h3 id="cookie-modal-title" className="text-sm font-bold text-[var(--color-text-primary)]">
                    Pengaturan Preferensi Cookie
                  </h3>
                  <p className="text-[11px] text-[var(--color-text-secondary)]">
                    Kelola izin cookie sesuai kenyamanan dan standar privasi Anda
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
                aria-label="Tutup Pengaturan Cookie"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body - Category List */}
            <div className="p-5 overflow-y-auto space-y-3.5 divide-y divide-gray-100 text-xs">
              {/* Category 1: Necessary (Always Active) */}
              <div className="pt-2 first:pt-0">
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span className="font-bold text-[var(--color-text-primary)]">
                      Cookie Esensial (Wajib)
                    </span>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                    Selalu Aktif
                  </span>
                </div>
                <p className="text-[11px] text-[var(--color-text-secondary)] leading-relaxed">
                  Diperlukan untuk stabilitas dan keamanan website, navigasi antar halaman, serta kelancaran pemesanan jadwal dokter. Kategori ini tidak dapat dinonaktifkan.
                </p>
              </div>

              {/* Category 2: Analytics */}
              <div className="pt-3.5">
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <BarChart3 className="w-4 h-4 text-[var(--color-primary)]" />
                    <span className="font-bold text-[var(--color-text-primary)]">
                      Cookie Analitik & Kinerja
                    </span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={preferences.analytics}
                      onChange={(e) =>
                        setPreferences((prev) => ({ ...prev, analytics: e.target.checked }))
                      }
                      className="sr-only peer"
                    />
                    <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[var(--color-primary)]" />
                  </label>
                </div>
                <p className="text-[11px] text-[var(--color-text-secondary)] leading-relaxed">
                  Membantu kami memahami bagaimana pengunjung berinteraksi dengan situs secara agregat dan anonim demi meningkatkan kecepatan serta aksesibilitas layanan.
                </p>
              </div>

              {/* Category 3: Functional */}
              <div className="pt-3.5">
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <Settings2 className="w-4 h-4 text-[var(--color-primary)]" />
                    <span className="font-bold text-[var(--color-text-primary)]">
                      Cookie Preferensi & Fungsional
                    </span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={preferences.functional}
                      onChange={(e) =>
                        setPreferences((prev) => ({ ...prev, functional: e.target.checked }))
                      }
                      className="sr-only peer"
                    />
                    <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[var(--color-primary)]" />
                  </label>
                </div>
                <p className="text-[11px] text-[var(--color-text-secondary)] leading-relaxed">
                  Menyimpan riwayat pilihan poliklinik dan filter pencarian dokter spesialis agar kunjungan Anda berikutnya lebih cepat dan efisien.
                </p>
              </div>

              {/* Category 4: Personalization / Educational */}
              <div className="pt-3.5">
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <HeartHandshake className="w-4 h-4 text-[var(--color-primary)]" />
                    <span className="font-bold text-[var(--color-text-primary)]">
                      Cookie Edukasi & Informasi Layanan
                    </span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={preferences.marketing}
                      onChange={(e) =>
                        setPreferences((prev) => ({ ...prev, marketing: e.target.checked }))
                      }
                      className="sr-only peer"
                    />
                    <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[var(--color-primary)]" />
                  </label>
                </div>
                <p className="text-[11px] text-[var(--color-text-secondary)] leading-relaxed">
                  Menampilkan panduan kesehatan preventif berkala dan informasi paket MCU yang sesuai dengan profil kebutuhan medis Anda.
                </p>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-slate-50 border-t border-[var(--color-border)] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
              <button
                type="button"
                onClick={handleRejectNonEssential}
                className="px-3 py-2 text-xs font-semibold text-gray-600 hover:text-gray-900 transition-colors cursor-pointer text-center"
              >
                Tolak Non-Esensial
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleSaveCustom}
                  className="flex-1 sm:flex-initial px-4 py-2 border border-[var(--color-border)] bg-white hover:bg-gray-100 text-xs font-bold text-[var(--color-text-primary)] rounded-xl transition-colors cursor-pointer shadow-2xs"
                >
                  Simpan Pengaturan
                </button>
                <button
                  type="button"
                  onClick={handleAcceptAll}
                  className="flex-1 sm:flex-initial px-4 py-2 bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white text-xs font-bold rounded-xl transition-all shadow-xs cursor-pointer"
                >
                  Setujui Semua Cookie
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. Privacy Statement Modal */}
      {isPrivacyOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
          <div
            className="bg-white rounded-2xl shadow-2xl border border-[var(--color-border)] w-full max-w-lg overflow-hidden flex flex-col max-h-[85vh] animate-scale-in"
            role="dialog"
            aria-modal="true"
            aria-labelledby="privacy-modal-title"
          >
            {/* Modal Header */}
            <div className="px-5 py-4 border-b border-[var(--color-border)] flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
                  <Lock className="w-4 h-4" />
                </div>
                <div>
                  <h3 id="privacy-modal-title" className="text-sm font-bold text-[var(--color-text-primary)]">
                    Pernyataan Privasi Pasien
                  </h3>
                  <p className="text-[11px] text-[var(--color-text-secondary)]">
                    Kepatuhan UU PDP No. 27/2022 & Standar Kemenkes RI
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsPrivacyOpen(false)}
                className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
                aria-label="Tutup Pernyataan Privasi"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-5 overflow-y-auto space-y-3.5 text-xs text-[var(--color-text-secondary)] leading-relaxed">
              <div className="p-3 bg-emerald-50/70 border border-emerald-200 rounded-xl space-y-1">
                <p className="font-bold text-emerald-900 text-xs flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-700" />
                  Prinsip Perlindungan Privasi Data Pasien
                </p>
                <p className="text-[11px] text-emerald-800">
                  RS Bahagia Medika Jakarta berkomitmen penuh melindungi privasi, kerahasiaan riwayat medis, dan keamanan data pribadi Anda di setiap interaksi digital.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-[var(--color-text-primary)] mb-1">
                  1. Perlindungan Rekam Medis Elektronik (RME)
                </h4>
                <p>
                  Seluruh data klinis yang tercatat melalui reservasi poliklinik terhubung secara terenkripsi dengan platform SATUSEHAT Kementerian Kesehatan Republik Indonesia sesuai standar enkripsi TLS 256-bit.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-[var(--color-text-primary)] mb-1">
                  2. Tujuan Penggunaan Cookie
                </h4>
                <p>
                  Cookie digunakan semata-mata untuk mengamankan autentikasi sesi pasien, memperlancar proses booking janji temu, dan mengumpulkan data analitik agregat tanpa mengidentifikasi identitas personal pasien.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-[var(--color-text-primary)] mb-1">
                  3. Tidak Ada Komersialisasi Data
                </h4>
                <p>
                  Kami menjamin bahwa data kesehatan dan informasi kontak pasien tidak akan pernah dijual, disewakan, atau dialihkan kepada pihak ketiga untuk kepentingan periklanan komersial.
                </p>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-slate-50 border-t border-[var(--color-border)] flex items-center justify-between">
              <button
                type="button"
                onClick={() => {
                  setIsPrivacyOpen(false);
                  setIsModalOpen(true);
                }}
                className="text-xs font-semibold text-[var(--color-primary)] hover:underline inline-flex items-center gap-1 cursor-pointer"
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>Buka Pengaturan Cookie</span>
              </button>

              <button
                type="button"
                onClick={() => setIsPrivacyOpen(false)}
                className="px-4 py-2 bg-[var(--color-primary)] text-white text-xs font-bold rounded-xl hover:bg-[var(--color-primary-dark)] transition-colors cursor-pointer"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
