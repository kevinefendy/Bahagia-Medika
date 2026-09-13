'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Clock,
  Search,
  Calendar,
  User,
  MapPin,
  RotateCw,
  FileText,
  Pill,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  XCircle,
} from 'lucide-react';
import { useAuthStore } from '@/lib/store/useAuthStore';
import { useAppointmentStore } from '@/lib/store/useAppointmentStore';
import { formatDate } from '@/lib/utils/format';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import Tabs from '@/components/ui/Tabs';
import EmptyState from '@/components/ui/EmptyState';

const HISTORY_TABS = [
  { id: 'all', label: 'Semua Kunjungan' },
  { id: 'completed', label: 'Selesai Dikonsultasikan' },
  { id: 'cancelled', label: 'Dibatalkan' },
];

export default function RiwayatPage() {
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  const appointments = useAppointmentStore((s) => s.appointments);
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const patientId = user?.id || 'usr-patient-001';

  const history = appointments.filter((a) => {
    const isPatient = a.patientId === patientId || a.patientId === user?.id;
    if (!isPatient) return false;

    const isHistoryStatus = a.status === 'Completed' || a.status === 'Cancelled';
    if (!isHistoryStatus) return false;

    if (activeTab === 'completed' && a.status !== 'Completed') return false;
    if (activeTab === 'cancelled' && a.status !== 'Cancelled') return false;

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const match =
        a.doctorName.toLowerCase().includes(q) ||
        a.serviceName.toLowerCase().includes(q) ||
        a.id.toLowerCase().includes(q);
      if (!match) return false;
    }

    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-[var(--color-text-primary)]">
            Riwayat Kunjungan & Konsultasi
          </h1>
          <p className="text-sm text-[var(--color-text-secondary)] mt-0.5">
            Arsip seluruh riwayat pemeriksaan rawat jalan dan konsultasi spesialis Anda.
          </p>
        </div>

        <Link
          href="/buat-janji"
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold text-white bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] transition-all shadow-xs"
        >
          <Calendar className="w-3.5 h-3.5" />
          <span>Buat Janji Baru</span>
        </Link>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <Tabs tabs={HISTORY_TABS} activeTab={activeTab} onChange={setActiveTab} />

        <div className="relative min-w-[240px]">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Cari dokter atau layanan..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-[var(--color-border)] bg-white focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
          />
        </div>
      </div>

      {/* History List */}
      {history.length === 0 ? (
        <EmptyState
          title="Belum ada riwayat kunjungan yang sesuai"
          description="Riwayat konsultasi yang telah selesai atau dibatalkan akan tercatat otomatis di halaman ini."
        />
      ) : (
        <div className="space-y-3">
          {history.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-[var(--color-border)] p-5 shadow-xs hover:shadow-sm transition-all"
            >
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-bold text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                      {item.id}
                    </span>
                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[var(--color-primary-light)] text-[var(--color-primary)]">
                      {item.serviceName}
                    </span>
                    <span
                      className={`inline-flex items-center gap-1 text-xs font-bold px-2.5 py-0.5 rounded-full ${
                        item.status === 'Completed'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-rose-100 text-rose-800'
                      }`}
                    >
                      {item.status === 'Completed' ? (
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      ) : (
                        <XCircle className="w-3 h-3 text-rose-600" />
                      )}
                      {item.status === 'Completed' ? 'Selesai Konsultasi' : 'Dibatalkan'}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-[var(--color-text-primary)]">
                      {item.doctorName}
                    </h3>
                    <p className="text-xs font-medium text-[var(--color-text-secondary)]">
                      Spesialisasi: {item.doctorSpecialization}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-[var(--color-text-secondary)] pt-1">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-gray-400" />
                      {formatDate(item.date)} ({item.time} WIB)
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-gray-400" />
                      {item.location}
                    </span>
                  </div>

                  {item.patient.complaint && (
                    <p className="text-xs text-gray-600 italic bg-gray-50 p-2.5 rounded-xl border border-gray-100">
                      Keluhan klinis: &ldquo;{item.patient.complaint}&rdquo;
                    </p>
                  )}
                </div>

                {/* Right actions */}
                <div className="flex flex-col sm:flex-row md:flex-col gap-2 shrink-0 md:min-w-[170px]">
                  <Link
                    href={`/dashboard/appointment/${item.id}`}
                    className="w-full text-center px-3 py-2 rounded-lg text-xs font-bold border border-gray-200 hover:bg-gray-50 text-gray-700 transition-colors"
                  >
                    Rincian Kunjungan
                  </Link>

                  {item.status === 'Completed' && (
                    <>
                      <Link
                        href="/dashboard/resep-obat"
                        className="w-full text-center px-3 py-2 rounded-lg text-xs font-bold bg-teal-50 text-[var(--color-primary)] hover:bg-teal-100 transition-colors inline-flex items-center justify-center gap-1"
                      >
                        <Pill className="w-3.5 h-3.5" />
                        <span>Resep Dokter</span>
                      </Link>
                      <Link
                        href="/dashboard/hasil-lab"
                        className="w-full text-center px-3 py-2 rounded-lg text-xs font-bold bg-cyan-50 text-cyan-800 hover:bg-cyan-100 transition-colors inline-flex items-center justify-center gap-1"
                      >
                        <FileText className="w-3.5 h-3.5" />
                        <span>Hasil Pemeriksaan</span>
                      </Link>
                    </>
                  )}

                  <Link
                    href="/buat-janji"
                    className="w-full text-center px-3 py-2 rounded-lg text-xs font-bold bg-gray-100 hover:bg-gray-200 text-gray-800 transition-colors inline-flex items-center justify-center gap-1"
                  >
                    <RotateCw className="w-3 h-3" />
                    <span>Konsultasi Lagi</span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
