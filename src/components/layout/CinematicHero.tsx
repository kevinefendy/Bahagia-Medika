'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Calendar,
  Search,
  PhoneCall,
  ShieldCheck,
  HeartPulse,
  Building2,
  ArrowRight,
  Play,
  Pause,
  Volume2,
  VolumeX,
} from 'lucide-react';
import Modal from '@/components/ui/Modal';

interface VideoScene {
  id: string;
  code: string;
  badge: string;
  title: string;
  desc: string;
  pill: string;
}

const SCENES: VideoScene[] = [
  {
    id: 'CmABnKuKvyo',
    code: 'SCENE 01 • AMBULANS GAWAT DARURAT',
    badge: 'INSTALASI GAWAT DARURAT (IGD 24 JAM)',
    title: 'Armada Ambulans & Tim Gawat Darurat Bahagia Medika Jakarta',
    desc: 'Armada ambulans siaga 24 jam dengan sistem navigasi terpadu dan tim medis darurat di garis depan RS Bahagia Medika Jakarta.',
    pill: '01 Ambulans Siaga',
  },
  {
    id: 'rp_myVO-EzM',
    code: 'SCENE 02 • TIM MEDIS IGD SIAGA',
    badge: 'DOKTER JAGA & TRIAGE 24 JAM',
    title: 'Kesiapsiagaan Tim Dokter & IGD 24 Jam RS Bahagia Medika Jakarta',
    desc: 'Respons cepat tim medis darurat dan dokter jaga spesialis 24 jam dalam menangani pasien kondisi darurat di RS Bahagia Medika Jakarta.',
    pill: '02 IGD Siaga 24 Jam',
  },
  {
    id: 'tSM_epOAEzc',
    code: 'SCENE 03 • BEDAH & OPERASI MODERN',
    badge: 'KAMAR BEDAH TERPADU',
    title: 'Kamar Operasi & Bedah Modern RS Bahagia Medika Jakarta',
    desc: 'Prosedur bedah modern dengan instrumen sterilisasi canggih berstandar internasional dan tim spesialis bedah di RS Bahagia Medika Jakarta.',
    pill: '03 Kamar Bedah Modern',
  },
  {
    id: 'a4YGQBI_Dcs',
    code: 'SCENE 04 • RADIOLOGI & CT-SCAN',
    badge: 'DIAGNOSTIK & RADIOLOGI DIGITAL',
    title: 'Deteksi Dini & Fasilitas CT-Scan Modern RS Bahagia Medika Jakarta',
    desc: 'Pemeriksaan diagnostik radiologi & CT-Scan multi-slice mutakhir untuk deteksi dini penyakit secara presisi di RS Bahagia Medika Jakarta.',
    pill: '04 Radiologi CT-Scan',
  },
];

export default function CinematicHero() {
  const router = useRouter();
  const [selectedSpecialty, setSelectedSpecialty] = useState('');
  const [searchDoctor, setSearchDoctor] = useState('');
  const [showTourModal, setShowTourModal] = useState(false);

  // Cinematic Video Player State
  const [isMounted, setIsMounted] = useState(false);
  const [currentScene, setCurrentScene] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [visitedScenes, setVisitedScenes] = useState<Set<number>>(new Set([0]));

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Auto-progress animation ticker
  useEffect(() => {
    if (!isPlaying) return;

    const intervalMs = 100;
    const sceneDurationMs = 8000;
    const step = (intervalMs / sceneDurationMs) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setCurrentScene((curr) => {
            const next = (curr + 1) % SCENES.length;
            setVisitedScenes((v) => new Set(v).add(next));
            return next;
          });
          return 0;
        }
        return prev + step;
      });
    }, intervalMs);

    return () => clearInterval(timer);
  }, [isPlaying]);

  const selectScene = (index: number) => {
    setCurrentScene(index);
    setVisitedScenes((v) => new Set(v).add(index));
    setProgress(0);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (selectedSpecialty) params.set('specialization', selectedSpecialty);
    if (searchDoctor.trim()) params.set('search', searchDoctor.trim());

    if (params.toString()) {
      router.push(`/dokter?${params.toString()}`);
    } else {
      router.push('/dokter');
    }
  };

  return (
    <div className="relative bg-gradient-to-b from-slate-50 via-[#F7FAFA] to-[#EDF5F7] border-b border-[var(--color-border)]/60 overflow-hidden">
      {/* Subtle architectural geometric grid pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.35]"
        style={{
          backgroundImage: 'radial-gradient(#285F75 0.75px, transparent 0.75px)',
          backgroundSize: '24px 24px',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-10 pb-12 sm:pb-16 lg:pb-20 relative z-10">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Clinical Authority, Headline & Triage Search */}
          <div className="lg:col-span-6 xl:col-span-7 space-y-5 sm:space-y-6">
            {/* Accreditation Badge */}
            <div className="inline-flex items-center gap-2 bg-white/90 border border-teal-200/80 px-3.5 py-1.5 rounded-full text-xs font-semibold text-[var(--color-primary)] shadow-2xs backdrop-blur-xs">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Akreditasi Mutu KARS Paripurna &bull; Rumah Sakit Rujukan Modern</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-[var(--color-text-primary)] tracking-tight leading-[1.15]">
              Layanan Medis Presisi & Komprehensif untuk Pemulihan Optimal.
            </h1>

            {/* Subtitle */}
            <p className="text-xs sm:text-base text-[var(--color-text-secondary)] leading-relaxed max-w-2xl font-normal">
              RS Bahagia Medika Jakarta memadukan keahlian 120+ dokter spesialis konsultan, instalasi gawat darurat bersertifikasi ACLS 24 jam, kamar bedah terpadu modern, serta rekam medis digital yang terintegrasi secara aman.
            </p>

            {/* Main CTAs */}
            <div className="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-3 pt-1">
              <Link
                href="/buat-janji"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[var(--color-primary)] text-white text-xs sm:text-sm font-bold shadow-md hover:bg-[var(--color-primary-dark)] hover:shadow-lg transition-all"
              >
                <Calendar className="w-4 h-4" />
                <span>Buat Janji Konsultasi</span>
              </Link>

              <a
                href="tel:02178909999"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs sm:text-sm font-bold hover:bg-rose-100 transition-colors"
              >
                <PhoneCall className="w-4 h-4 text-rose-600" />
                <span>IGD Darurat: (021) 7890-9999</span>
              </a>

              <button
                type="button"
                onClick={() => setShowTourModal(true)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl bg-white border border-gray-200 text-gray-700 text-xs sm:text-sm font-semibold hover:bg-gray-50 transition-colors"
              >
                <Play className="w-3.5 h-3.5 fill-gray-600 text-gray-600 ml-0.5" />
                <span>Tur Fasilitas RS</span>
              </button>
            </div>

            {/* Integrated Clinical Search Matrix */}
            <div className="pt-2">
              <form
                onSubmit={handleSearchSubmit}
                className="bg-white rounded-2xl border border-[var(--color-border)] p-3.5 sm:p-4 shadow-sm space-y-3"
              >
                <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                  <span className="text-xs font-bold text-gray-700 uppercase tracking-wider flex items-center gap-1.5">
                    <Search className="w-3.5 h-3.5 text-[var(--color-primary)]" />
                    Pencarian Dokter & Layanan Spesialis
                  </span>
                  <Link href="/jadwal" className="text-xs font-semibold text-[var(--color-primary)] hover:underline">
                    Lihat Jadwal Lengkap
                  </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                  <div className="sm:col-span-6">
                    <label className="block text-[11px] font-semibold text-gray-500 mb-1">
                      Poli Spesialisasi:
                    </label>
                    <select
                      value={selectedSpecialty}
                      onChange={(e) => setSelectedSpecialty(e.target.value)}
                      className="w-full px-3 py-2 text-xs font-medium bg-gray-50 rounded-lg border border-gray-200 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                    >
                      <option value="">Semua Poliklinik Spesialis</option>
                      <option value="Jantung">Poli Jantung & Pembuluh Darah (Sp.JP)</option>
                      <option value="Anak">Poli Kesehatan Anak & Pediatri (Sp.A)</option>
                      <option value="Kandungan">Poli Kebidanan & Kandungan (Sp.OG)</option>
                      <option value="Ortopedi">Poli Ortopedi & Traumatologi (Sp.OT)</option>
                      <option value="Bedah">Poli Bedah Umum & Subspesialis (Sp.B)</option>
                      <option value="Penyakit Dalam">Poli Penyakit Dalam (Sp.PD)</option>
                    </select>
                  </div>

                  <div className="sm:col-span-4">
                    <label className="block text-[11px] font-semibold text-gray-500 mb-1">
                      Nama Dokter / Tindakan:
                    </label>
                    <input
                      type="text"
                      placeholder="Contoh: Dr. Dewi, USG, Kateterisasi"
                      value={searchDoctor}
                      onChange={(e) => setSearchDoctor(e.target.value)}
                      className="w-full px-3 py-2 text-xs font-medium bg-gray-50 rounded-lg border border-gray-200 text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                    />
                  </div>

                  <div className="sm:col-span-2 flex items-end">
                    <button
                      type="submit"
                      className="w-full py-2 px-3 rounded-lg text-xs font-bold bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-dark)] transition-colors flex items-center justify-center gap-1 shadow-2xs h-[38px] sm:h-[34px]"
                    >
                      <span>Cari</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </form>
            </div>

            {/* Operational Signals HUD */}
            <div className="grid grid-cols-2 gap-3 pt-1">
              <div className="p-3.5 rounded-2xl bg-white border border-[var(--color-border)] shadow-2xs space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-gray-500 uppercase">IGD & Trauma</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                </div>
                <p className="text-sm font-black text-gray-900">Siaga 24/7</p>
                <p className="text-[11px] text-gray-500">Tim Dokter Spesialis & ACLS</p>
              </div>

              <div className="p-3.5 rounded-2xl bg-white border border-[var(--color-border)] shadow-2xs space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-gray-500 uppercase">Kamar Rawat</span>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
                    SIRANAP
                  </span>
                </div>
                <p className="text-sm font-black text-gray-900">84 Tempat Tidur</p>
                <p className="text-[11px] text-gray-500">Update Real-time Kemenkes</p>
              </div>
            </div>
          </div>

          {/* Right Column: 4-Scene Cinematic Video Player */}
          <div className="lg:col-span-6 xl:col-span-5 relative mt-6 lg:mt-0">
            {/* Floating Indonesian Hospital Accreditation Badge */}
            <div className="hidden sm:flex absolute -top-5 -left-4 z-20 items-center gap-3 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-2xl shadow-xl border border-teal-100 animate-float-slow">
              <div className="w-9 h-9 rounded-xl bg-teal-50 border border-teal-200 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5 text-[var(--color-primary)]" />
              </div>
              <div>
                <p className="text-xs font-black text-gray-900 leading-tight">Akreditasi Paripurna</p>
                <p className="text-[10px] font-medium text-gray-500">KARS & Kemenkes RI</p>
              </div>
            </div>

            {/* Floating Emergency Response Badge */}
            <div className="flex absolute -bottom-7 sm:-bottom-8 lg:-bottom-9 left-2 sm:left-4 lg:-left-8 xl:-left-12 z-20 items-center gap-2.5 bg-white/95 backdrop-blur-md px-3.5 py-2.5 rounded-2xl shadow-xl border border-teal-100 animate-float-reverse">
              <div className="w-8 h-8 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center shrink-0">
                <HeartPulse className="w-4 h-4 text-emerald-600" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <p className="text-xs font-black text-gray-900 leading-tight">Dokter Siaga 24 Jam</p>
                </div>
                <p className="text-[10px] font-medium text-gray-500">Respon IGD Cepat</p>
              </div>
            </div>

            {/* Video Viewport Frame */}
            <div className="relative rounded-3xl overflow-hidden border-4 sm:border-8 border-white shadow-2xl bg-slate-950 w-full h-[360px] sm:h-[440px] lg:h-[480px]">
              {/* Emergency Ambulance Flashing Strobe Accent on Scene 0 */}
              {currentScene === 0 && (
                <div className="absolute inset-0 pointer-events-none z-10 opacity-30 animate-pulse bg-[radial-gradient(ellipse_at_top_right,rgba(239,68,68,0.35)_0%,transparent_60%),radial-gradient(ellipse_at_bottom_left,rgba(56,189,248,0.35)_0%,transparent_60%)]" />
              )}

              {/* YouTube Video Embeds with visited scene memory */}
              {isMounted &&
                SCENES.map((scene, index) => {
                  if (index !== currentScene && !visitedScenes.has(index)) {
                    return null;
                  }
                  return (
                    <div
                      key={scene.id}
                      className={`absolute inset-0 transition-opacity duration-700 pointer-events-none overflow-hidden ${
                        index === currentScene ? 'opacity-100 z-0' : 'opacity-0 -z-10'
                      }`}
                    >
                      <iframe
                        src={`https://www.youtube-nocookie.com/embed/${scene.id}?autoplay=1&mute=${isMuted ? 1 : 0}&loop=1&playlist=${scene.id}&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&enablejsapi=0`}
                        title={scene.title}
                        className="absolute top-1/2 left-1/2 w-[150%] sm:w-[135%] h-[150%] sm:h-[135%] -translate-x-1/2 -translate-y-1/2 border-0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        loading={index === 0 ? 'eager' : 'lazy'}
                      />
                    </div>
                  );
                })}

              {/* High-contrast color gradient wash */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0b171c] via-[#0b171c]/30 to-[#0b171c]/60 pointer-events-none z-1" />

              {/* In-Video Top HUD */}
              <div className="absolute top-3 sm:top-4 left-3 sm:left-4 right-3 sm:right-4 flex items-center justify-between z-15">
                <div className="inline-flex items-center gap-2 bg-slate-900/85 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20 text-white text-[10px] sm:text-[11px] font-bold tracking-wider uppercase shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse shrink-0" />
                  <span className="truncate max-w-[190px] sm:max-w-none">{SCENES[currentScene].code}</span>
                </div>

                <div className="flex items-center gap-1.5 sm:gap-2">
                  <button
                    type="button"
                    onClick={() => setIsPlaying((p) => !p)}
                    title={isPlaying ? 'Jeda Rotasi' : 'Lanjutkan Rotasi'}
                    className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-slate-900/85 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:bg-slate-800 transition-transform active:scale-95 cursor-pointer shadow-sm"
                  >
                    {isPlaying ? (
                      <Pause className="w-3.5 h-3.5 text-white" />
                    ) : (
                      <Play className="w-3.5 h-3.5 fill-white text-white ml-0.5" />
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsMuted((m) => !m)}
                    title={isMuted ? 'Nyalakan Audio' : 'Bisukan Audio'}
                    className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-slate-900/85 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:bg-slate-800 transition-transform active:scale-95 cursor-pointer shadow-sm"
                  >
                    {isMuted ? (
                      <VolumeX className="w-3.5 h-3.5 text-white" />
                    ) : (
                      <Volume2 className="w-3.5 h-3.5 text-white" />
                    )}
                  </button>
                </div>
              </div>

              {/* In-Video Bottom Description & Multi-Scene Switcher */}
              <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4 z-15 space-y-2 sm:space-y-3">
                <div className="space-y-1 drop-shadow-md">
                  <span className="inline-block text-[10px] font-black text-teal-300 tracking-wider uppercase">
                    {SCENES[currentScene].badge}
                  </span>
                  <h3 className="text-sm sm:text-base lg:text-lg font-black text-white leading-snug line-clamp-2">
                    {SCENES[currentScene].title}
                  </h3>
                  <p className="text-[11px] sm:text-xs text-slate-200/90 line-clamp-2 font-light leading-relaxed hidden sm:block">
                    {SCENES[currentScene].desc}
                  </p>
                </div>

                {/* Multi-Scene Mini Pill Switcher */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 sm:gap-2 pt-1">
                  {SCENES.map((scene, idx) => (
                    <button
                      key={scene.id}
                      type="button"
                      onClick={() => selectScene(idx)}
                      className={`relative overflow-hidden text-left p-2 sm:p-2.5 rounded-xl transition-all cursor-pointer border ${
                        currentScene === idx
                          ? 'bg-[var(--color-primary)]/90 border-teal-300 text-white shadow-md'
                          : 'bg-slate-900/75 border-white/15 text-slate-300 hover:bg-slate-800/80 hover:text-white'
                      }`}
                    >
                      <span className="block text-[10px] sm:text-xs font-bold truncate">
                        {scene.pill}
                      </span>
                      {/* Mini Progress Rail */}
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/20">
                        <div
                          className="h-full bg-teal-300 transition-all duration-100 ease-linear"
                          style={{
                            width:
                              idx === currentScene
                                ? `${progress}%`
                                : idx < currentScene
                                ? '100%'
                                : '0%',
                          }}
                        />
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hospital Tour Modal */}
      <Modal
        isOpen={showTourModal}
        onClose={() => setShowTourModal(false)}
        title="Tur Fasilitas & Kampus Medis RS Bahagia Medika"
        size="lg"
      >
        <div className="space-y-4 py-2 text-xs">
          <div className="rounded-2xl overflow-hidden border border-gray-200">
            <img
              src="https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=900&auto=format&fit=crop&q=80"
              alt="Lobi Utama RS Bahagia Medika"
              className="w-full h-64 object-cover"
            />
          </div>

          <div className="space-y-2">
            <h4 className="font-bold text-sm text-gray-900">
              Infrastruktur Medis Modern Standar Internasional
            </h4>
            <p className="text-gray-600 leading-relaxed">
              RS Bahagia Medika Jakarta dirancang dengan konsep *healing environment* yang memprioritaskan sirkulasi udara bersih berfilter HEPA, pencahayaan alami, serta sistem pemisahan alur pasien infeksius dan non-infeksius untuk keamanan maksimal.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-gray-100">
            <div className="p-3 rounded-xl bg-gray-50 border border-gray-100">
              <p className="font-bold text-gray-800">Gedung Utama A</p>
              <p className="text-[11px] text-gray-500 mt-0.5">IGD 24 Jam, Radiologi CT-Scan, dan Farmasi Rawat Jalan.</p>
            </div>
            <div className="p-3 rounded-xl bg-gray-50 border border-gray-100">
              <p className="font-bold text-gray-800">Gedung Spesialis B</p>
              <p className="text-[11px] text-gray-500 mt-0.5">Poliklinik Spesialis, Lounge MCU, dan Rehabilitasi Medik.</p>
            </div>
            <div className="p-3 rounded-xl bg-gray-50 border border-gray-100">
              <p className="font-bold text-gray-800">Gedung Rawat Inap C</p>
              <p className="text-[11px] text-gray-500 mt-0.5">Kamar Bedah Sentral, ICU/NICU/PICU, dan Kamar Rawat VVIP/VIP.</p>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-gray-100">
            <button
              onClick={() => setShowTourModal(false)}
              className="px-4 py-2 text-xs font-bold text-white bg-[var(--color-primary)] rounded-lg hover:bg-[var(--color-primary-dark)] transition-colors"
            >
              Tutup Tur
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
