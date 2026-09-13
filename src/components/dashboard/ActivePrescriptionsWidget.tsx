'use client';
import Link from 'next/link';
import { Pill, CheckCircle2, Clock, MapPin, ChevronRight, AlertCircle, Sparkles } from 'lucide-react';
import { usePatientRecordStore } from '@/lib/store/usePatientRecordStore';
import { useUIStore } from '@/lib/store/useUIStore';

export default function ActivePrescriptionsWidget() {
  const { prescriptions, toggleMedicationTaken } = usePatientRecordStore();
  const addToast = useUIStore((s) => s.addToast);

  const handleToggle = (id: string, name: string, currentState: boolean) => {
    toggleMedicationTaken(id);
    addToast({
      type: currentState ? 'info' : 'success',
      message: currentState
        ? `Status minum ${name} dibatalkan.`
        : `Bagus! Anda telah mencatat minum obat ${name} hari ini.`,
    });
  };

  const statusBadge = (status: string) => {
    switch (status) {
      case 'Siap Diambil':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-800 animate-pulse">
            <Clock className="w-3 h-3" />
            Siap Diambil di Farmasi
          </span>
        );
      case 'Sedang Diracik':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-800">
            <Clock className="w-3 h-3" />
            Sedang Diracik Apoteker
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
            <CheckCircle2 className="w-3 h-3" />
            Aktif Dikonsumsi
          </span>
        );
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-[var(--color-border)] p-5 shadow-xs flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between gap-2 mb-4">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-teal-50 text-[var(--color-primary)]">
              <Pill className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base text-[var(--color-text-primary)]">
                Resep Obat & Pengingat Harian
              </h3>
              <p className="text-xs text-[var(--color-text-secondary)]">
                {prescriptions.length} obat dalam terapi aktif Anda
              </p>
            </div>
          </div>

          <Link
            href="/dashboard/resep-obat"
            className="text-xs font-bold text-[var(--color-primary)] hover:underline inline-flex items-center gap-0.5"
          >
            Semua Resep <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Prescription List */}
        <div className="space-y-3">
          {prescriptions.slice(0, 3).map((item) => (
            <div
              key={item.id}
              className={`p-3.5 rounded-xl border transition-all ${
                item.takenToday
                  ? 'bg-emerald-50/40 border-emerald-200'
                  : 'bg-white border-gray-100 hover:border-teal-200'
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="font-bold text-sm text-[var(--color-text-primary)] leading-snug">
                    {item.medicineName}
                  </p>
                  <p className="text-xs font-medium text-[var(--color-primary)] mt-0.5">
                    {item.frequency} &bull; {item.form}
                  </p>
                </div>
                {statusBadge(item.pharmacyStatus)}
              </div>

              <p className="text-xs text-[var(--color-text-secondary)] mt-2 italic bg-gray-50/80 px-2.5 py-1.5 rounded-lg border border-gray-100">
                &ldquo;{item.instruction}&rdquo;
              </p>

              {item.pharmacyStatus === 'Siap Diambil' ? (
                <div className="mt-2.5 flex items-center justify-between text-xs pt-2 border-t border-dashed border-gray-200">
                  <span className="flex items-center gap-1 text-amber-700 font-medium">
                    <MapPin className="w-3.5 h-3.5 shrink-0" />
                    {item.pickupLocation}
                  </span>
                  <Link
                    href="/dashboard/resep-obat"
                    className="font-bold text-[var(--color-primary)] hover:underline"
                  >
                    Ambil Nomor Antrean &rarr;
                  </Link>
                </div>
              ) : (
                <div className="mt-2.5 flex items-center justify-between text-xs pt-2 border-t border-dashed border-gray-100">
                  <span className="text-gray-400">
                    Sisa terapi: <strong className="text-gray-700">{item.remainingDays} hari</strong>
                  </span>
                  <button
                    onClick={() => handleToggle(item.id, item.medicineName, item.takenToday)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                      item.takenToday
                        ? 'bg-emerald-600 text-white shadow-2xs'
                        : 'bg-gray-100 hover:bg-emerald-100 text-gray-700 hover:text-emerald-800'
                    }`}
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{item.takenToday ? 'Sudah Diminum' : 'Tandai Sudah Minum'}</span>
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-[var(--color-text-secondary)]">
        <span className="flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5 text-teal-600" />
          Layanan tebus resep terhubung ke Farmasi 24 Jam
        </span>
        <Link
          href="/dashboard/resep-obat"
          className="font-semibold text-[var(--color-primary)] hover:underline"
        >
          Lihat Riwayat Obat
        </Link>
      </div>
    </div>
  );
}
