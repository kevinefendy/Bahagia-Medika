'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import {
  MapPin,
  GraduationCap,
  Clock,
  ArrowLeft,
  Calendar,
  Phone,
  MessageCircle,
  ShieldCheck,
  Building2,
  CheckCircle2,
} from 'lucide-react';
import Button from '@/components/ui/Button';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { doctorService } from '@/lib/services/doctorService';
import type { Doctor } from '@/types/doctor';

const ALL_DAYS = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];

export default function DokterDetailPage() {
  const params = useParams();
  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params.slug) {
      doctorService.getBySlug(params.slug as string).then((d) => {
        setDoctor(d || null);
        setLoading(false);
      });
    }
  }, [params.slug]);

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-10 sm:py-12">
        <div className="animate-pulse space-y-6">
          <div className="h-6 w-40 bg-slate-200 rounded" />
          <div className="h-64 bg-slate-200 rounded-3xl" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 h-72 bg-slate-200 rounded-3xl" />
            <div className="h-72 bg-slate-200 rounded-3xl" />
          </div>
        </div>
      </div>
    );
  }

  if (!doctor) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4 text-slate-400">
          <Building2 className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold text-slate-900">Profil Dokter Tidak Ditemukan</h2>
        <p className="text-sm text-slate-500 mt-1">Dokter spesialis yang Anda cari mungkin telah berganti jadwal atau tidak aktif.</p>
        <Link href="/dokter" className="inline-block mt-6">
          <Button variant="primary">Kembali ke Direktori Dokter</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-slate-50/40 min-h-screen pb-16">
      {/* Top Header Card */}
      <div className="bg-white border-b border-slate-200 py-6 sm:py-8">
        <div className="max-w-5xl mx-auto px-4">
          <Breadcrumb items={[{ label: 'Dokter Spesialis', href: '/dokter' }, { label: doctor.name }]} />

          <div className="mt-6 flex flex-col sm:flex-row items-center sm:items-start gap-6">
            {/* Doctor Photo */}
            <div className="relative w-32 h-32 sm:w-36 sm:h-36 rounded-2xl overflow-hidden bg-slate-100 border-2 border-slate-100 shadow-md shrink-0">
              {doctor.photoUrl ? (
                <img src={doctor.photoUrl} alt={doctor.name} className="h-full w-full object-cover" />
              ) : (
                <div className="h-full w-full flex items-center justify-center bg-[var(--color-primary-light)]">
                  <span className="text-[var(--color-primary)] font-bold text-3xl">
                    {doctor.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                  </span>
                </div>
              )}
            </div>

            {/* Doctor Credentials */}
            <div className="flex-1 text-center sm:text-left min-w-0">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-2">
                <span className="px-3 py-0.5 rounded-full text-xs font-bold bg-teal-50 text-teal-800 border border-teal-200/70">
                  Spesialis {doctor.specializationName}
                </span>
                <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200/80">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Aktif Melayani Pasien
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                {doctor.name}
              </h1>

              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 mt-3 text-xs sm:text-sm text-slate-600">
                <span className="flex items-center gap-1.5">
                  <Building2 className="h-4 w-4 text-teal-700 shrink-0" />
                  {doctor.location || 'Poliklinik Spesialis'}
                </span>
                <span>&bull;</span>
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0" />
                  {doctor.experienceYears} Tahun Pengalaman Klinis
                </span>
                {doctor.languages && doctor.languages.length > 0 && (
                  <>
                    <span>&bull;</span>
                    <span>Bahasa: {doctor.languages.join(', ')}</span>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Details Grid */}
      <div className="max-w-5xl mx-auto px-4 mt-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Left Column: Clinical Bio, Education, Schedules */}
          <div className="md:col-span-8 space-y-6">
            {/* About Doctor */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
              <h2 className="text-base sm:text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-teal-700" />
                <span>Profil & Keahlian Klinis</span>
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                {doctor.bio}
              </p>
            </div>

            {/* Education & Certification */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
              <h2 className="text-base sm:text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-teal-700" />
                <span>Pendidikan & Kualifikasi</span>
              </h2>
              <ul className="space-y-2.5">
                {doctor.education.map((edu, i) => (
                  <li key={i} className="text-xs sm:text-sm text-slate-700 flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                    <span className="font-medium">{edu}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Complete Practice Schedule */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-teal-700" />
                  <span>Jadwal Praktik Mingguan</span>
                </h2>
                <span className="text-xs text-slate-500 font-medium">Waktu Indonesia Barat (WIB)</span>
              </div>

              <div className="border border-slate-200 rounded-xl overflow-hidden">
                <table className="w-full text-xs sm:text-sm">
                  <thead className="bg-slate-50 border-b border-slate-200">
                    <tr>
                      <th className="px-4 py-3 text-left font-bold text-slate-700">Hari</th>
                      <th className="px-4 py-3 text-left font-bold text-slate-700">Jam Praktik</th>
                      <th className="px-4 py-3 text-left font-bold text-slate-700">Lokasi Poliklinik</th>
                      <th className="px-4 py-3 text-center font-bold text-slate-700">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {ALL_DAYS.map((day) => {
                      const schedule = doctor.schedules.find((s) => s.day === day);
                      return (
                        <tr key={day} className={schedule ? 'bg-white' : 'bg-slate-50/40 text-slate-400'}>
                          <td className="px-4 py-3 font-semibold text-slate-900">{day}</td>
                          <td className="px-4 py-3 font-semibold">
                            {schedule ? (
                              <span className="font-bold text-teal-800">
                                {schedule.startTime} - {schedule.endTime}
                              </span>
                            ) : (
                              <span className="text-slate-400">Tidak Praktik</span>
                            )}
                          </td>
                          <td className="px-4 py-3">
                            {schedule ? schedule.location : '-'}
                          </td>
                          <td className="px-4 py-3 text-center">
                            {schedule ? (
                              <span className="inline-flex px-2 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                                Buka Praktik
                              </span>
                            ) : (
                              <span className="text-slate-400 text-[11px]">-</span>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Right Column: Sticky Appointment Booking & Patient Care */}
          <div className="md:col-span-4 space-y-4">
            <div className="sticky top-24 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
              <div>
                <h3 className="text-base font-bold text-slate-900">Reservasi Konsultasi</h3>
                <p className="text-xs text-slate-500 mt-1">
                  Amankan nomor antrean resmi dengan e-voucher reservasi langsung ke poliklinik dokter.
                </p>
              </div>

              <Link href={`/buat-janji?doctorId=${doctor.id}`} className="block">
                <button
                  type="button"
                  className="w-full py-3 px-4 rounded-xl bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-sm transition-colors cursor-pointer"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Buat Janji Sekarang</span>
                </button>
              </Link>

              <a
                href="https://wa.me/6281234567890?text=Halo%20RS%20Bahagia%20Medika,%20saya%20ingin%20berkonsultasi%20mengenai%20jadwal%20dokter"
                target="_blank"
                rel="noreferrer"
                className="w-full py-2.5 px-4 rounded-xl border border-emerald-300 hover:bg-emerald-50 text-emerald-800 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                <span>Tanya via WhatsApp</span>
              </a>

              <div className="pt-4 border-t border-slate-100 text-xs text-slate-500 space-y-2">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Dukungan Pasien Umum & Asuransi</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Pembatalan fleksibel lewat portal</span>
                </div>
              </div>

              <Link
                href="/dokter"
                className="pt-2 flex items-center justify-center gap-1.5 text-xs font-semibold text-[var(--color-primary)] hover:underline"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                <span>Kembali ke Daftar Dokter</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
