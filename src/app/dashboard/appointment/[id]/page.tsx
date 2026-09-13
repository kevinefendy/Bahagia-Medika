'use client';
import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Calendar,
  Clock,
  MapPin,
  Printer,
  ShieldCheck,
  AlertCircle,
  FileText,
  User,
  Ticket,
  QrCode,
  CheckCircle2,
} from 'lucide-react';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import Modal from '@/components/ui/Modal';
import DatePicker from '@/components/ui/DatePicker';
import { useAppointmentStore } from '@/lib/store/useAppointmentStore';
import { useUIStore } from '@/lib/store/useUIStore';
import { formatDate } from '@/lib/utils/format';
import Breadcrumb from '@/components/ui/Breadcrumb';

const statusVariant: Record<string, 'success' | 'warning' | 'error' | 'info'> = {
  Confirmed: 'success',
  Pending: 'warning',
  Completed: 'info',
  Cancelled: 'error',
};

export default function AppointmentDetailPage() {
  const params = useParams();
  const router = useRouter();
  const addToast = useUIStore((s) => s.addToast);
  const appointment = useAppointmentStore((s) => s.appointments.find((a) => a.id === params.id));
  const reschedule = useAppointmentStore((s) => s.reschedule);
  const cancel = useAppointmentStore((s) => s.cancel);

  const [showReschedule, setShowReschedule] = useState(false);
  const [showCancel, setShowCancel] = useState(false);
  const [newDate, setNewDate] = useState<string | null>(null);
  const [newTime, setNewTime] = useState('');

  if (!appointment) {
    return (
      <div className="text-center py-12">
        <p className="text-[var(--color-text-secondary)]">Appointment tidak ditemukan.</p>
        <Link href="/dashboard/appointment">
          <Button variant="outline" className="mt-4">
            Kembali ke Daftar Appointment
          </Button>
        </Link>
      </div>
    );
  }

  const handleReschedule = () => {
    if (newDate && newTime) {
      reschedule(appointment.id, newDate, newTime);
      setShowReschedule(false);
      addToast({ type: 'success', message: 'Jadwal appointment berhasil diubah.' });
    }
  };

  const handleCancel = () => {
    cancel(appointment.id);
    setShowCancel(false);
    addToast({ type: 'info', message: 'Appointment berhasil dibatalkan.' });
    router.push('/dashboard/appointment');
  };

  const canModify =
    (appointment.status === 'Confirmed' || appointment.status === 'Pending') &&
    new Date(appointment.date) >= new Date(Date.now() - 86400000);

  return (
    <div className="space-y-6">
      <Breadcrumb
        items={[
          { label: 'Appointment', href: '/dashboard/appointment' },
          { label: appointment.id },
        ]}
      />

      {/* Main Card */}
      <div className="bg-white rounded-2xl border border-[var(--color-border)] p-6 shadow-xs">
        {/* Header */}
        <div className="flex flex-wrap items-start justify-between gap-4 pb-6 border-b border-gray-100">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-primary)] bg-[var(--color-primary-light)] px-2.5 py-0.5 rounded-full">
              {appointment.serviceName}
            </span>
            <h1 className="text-2xl font-black text-[var(--color-text-primary)] mt-1.5">
              {appointment.doctorName}
            </h1>
            <p className="text-xs text-[var(--color-text-secondary)]">
              Spesialisasi: <strong>{appointment.doctorSpecialization}</strong> &bull; Faskes: RS Bahagia Medika Jakarta
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Badge variant={statusVariant[appointment.status]} label={appointment.status} />
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.print()}
              className="inline-flex items-center gap-1.5 text-xs"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Cetak Slip</span>
            </Button>
          </div>
        </div>

        {/* E-Ticket Box for Confirmed Visits */}
        {appointment.status === 'Confirmed' && (
          <div className="my-6 p-5 rounded-2xl bg-gradient-to-r from-teal-50 via-cyan-50 to-white border border-teal-200/80">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-primary)]">
                  E-TICKET CHECK-IN KIOSK APM
                </span>
                <p className="font-bold text-sm text-[var(--color-text-primary)]">
                  Gunakan Kode Booking ini untuk scan barcode pada mesin tiket lobi
                </p>
                <p className="text-xs text-[var(--color-text-secondary)]">
                  Scan 15-30 menit sebelum jadwal dokter untuk mendapatkan nomor antrean poli rawat jalan.
                </p>
              </div>

              <div className="bg-white p-3 rounded-xl border border-teal-200 text-center shrink-0">
                <p className="font-mono text-xs font-bold text-gray-500">KODE BOOKING</p>
                <p className="font-mono text-xl font-black text-[var(--color-primary)] tracking-wider">
                  {appointment.id}
                </p>
                {/* Barcode visual */}
                <div className="h-6 flex items-stretch justify-center gap-[2px] mt-1">
                  {[2,1,3,1,4,2,1,2,3,1,4,2,3,1,2,4].map((w, i) => (
                    <div key={i} className="bg-slate-800" style={{ width: `${w * 1.5}px` }} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Schedule & Clinical Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
          <div className="space-y-4">
            <h3 className="font-bold text-sm text-gray-700 uppercase tracking-wider">
              Jadwal & Lokasi Pelayanan
            </h3>

            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 border border-gray-100">
                <Calendar className="h-5 w-5 text-[var(--color-primary)] shrink-0" />
                <div>
                  <p className="text-xs text-[var(--color-text-secondary)]">Hari & Tanggal</p>
                  <p className="font-bold text-sm text-[var(--color-text-primary)]">
                    {formatDate(appointment.date)}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 border border-gray-100">
                <Clock className="h-5 w-5 text-[var(--color-primary)] shrink-0" />
                <div>
                  <p className="text-xs text-[var(--color-text-secondary)]">Jam Konsultasi</p>
                  <p className="font-bold text-sm text-[var(--color-text-primary)]">
                    {appointment.time} WIB
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 border border-gray-100">
                <MapPin className="h-5 w-5 text-rose-500 shrink-0" />
                <div>
                  <p className="text-xs text-[var(--color-text-secondary)]">Lokasi & Ruangan</p>
                  <p className="font-bold text-sm text-[var(--color-text-primary)]">
                    {appointment.location}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-bold text-sm text-gray-700 uppercase tracking-wider">
              Data Pasien & Keluhan
            </h3>

            <div className="p-4 rounded-xl bg-gray-50 border border-gray-100 text-xs space-y-2.5">
              <div>
                <span className="text-gray-500 block">Nama Pasien:</span>
                <span className="font-bold text-sm text-gray-900">{appointment.patient.fullName}</span>
              </div>
              <div>
                <span className="text-gray-500 block">Nomor Kontak:</span>
                <span className="font-medium text-gray-900">{appointment.patient.phoneNumber}</span>
              </div>
              <div>
                <span className="text-gray-500 block">Email Terdaftar:</span>
                <span className="font-medium text-gray-900">{appointment.patient.email}</span>
              </div>
              <div>
                <span className="text-gray-500 block">Keluhan / Catatan Pasien:</span>
                <p className="text-gray-800 italic mt-0.5 bg-white p-2 rounded border border-gray-200">
                  &ldquo;{appointment.patient.complaint || 'Pemeriksaan dan evaluasi berkala'}&rdquo;
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Preparation Guide Box */}
        <div className="p-4 rounded-xl bg-amber-50/60 border border-amber-200 text-xs space-y-1 text-amber-950 mb-6">
          <p className="font-bold flex items-center gap-1.5 text-amber-900">
            <AlertCircle className="w-4 h-4 text-amber-700" />
            Panduan Penting Kedatangan Pasien:
          </p>
          <ul className="list-disc list-inside space-y-0.5 text-amber-800 pt-1">
            <li>Harap tiba 15 menit lebih awal sebelum jam konsultasi dokter dimulai.</li>
            <li>Bawa kartu identitas fisik (KTP/SIM/Paspor) atau tunjukkan CarePass Digital di aplikasi ini.</li>
            <li>Bagi pasien asuransi/BPJS, pastikan rujukan faskes atau surat kontrol masih dalam masa berlaku.</li>
          </ul>
        </div>

        {/* Action Buttons */}
        {canModify && (
          <div className="flex flex-wrap items-center justify-between gap-3 pt-6 border-t border-gray-100">
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setShowReschedule(true)}>
                Ubah Jadwal (Reschedule)
              </Button>
              <Button variant="destructive" onClick={() => setShowCancel(true)}>
                Batalkan Janji
              </Button>
            </div>

            <Link href="/dashboard/chat">
              <Button variant="ghost" className="text-xs">
                Butuh Bantuan? Chat Medika Care
              </Button>
            </Link>
          </div>
        )}
      </div>

      {/* Reschedule Modal */}
      <Modal isOpen={showReschedule} onClose={() => setShowReschedule(false)} title="Ubah Jadwal Appointment">
        <div className="space-y-4 py-1">
          <p className="text-xs text-[var(--color-text-secondary)]">
            Pilih tanggal dan jam baru yang tersedia untuk dokter {appointment.doctorName}.
          </p>
          <DatePicker selectedDate={newDate} onSelect={setNewDate} />
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-2">Pilih Jam Konsultasi Baru:</label>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
              {['08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30'].map((time) => (
                <button
                  key={time}
                  type="button"
                  onClick={() => setNewTime(time)}
                  className={`py-2 px-2 rounded-xl text-xs font-bold border transition-all text-center cursor-pointer ${
                    newTime === time
                      ? 'bg-[var(--color-primary)] text-white border-[var(--color-primary)] shadow-sm'
                      : 'bg-white hover:bg-teal-50/60 border-gray-200 text-gray-800'
                  }`}
                >
                  {time}
                </button>
              ))}
            </div>
            {newTime && (
              <p className="text-xs text-emerald-700 mt-2 font-medium flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Jam Terpilih: <strong>{newTime} WIB</strong></span>
              </p>
            )}
          </div>
          <div className="flex justify-end gap-2 pt-2 border-t border-gray-100">
            <Button variant="outline" onClick={() => setShowReschedule(false)}>
              Batal
            </Button>
            <Button variant="primary" onClick={handleReschedule} disabled={!newDate || !newTime}>
              Simpan Jadwal Baru
            </Button>
          </div>
        </div>
      </Modal>

      {/* Cancel Modal */}
      <Modal isOpen={showCancel} onClose={() => setShowCancel(false)} title="Batalkan Appointment?" size="sm">
        <div className="space-y-4 py-1">
          <p className="text-xs text-[var(--color-text-secondary)]">
            Apakah Anda yakin ingin membatalkan jadwal konsultasi ini? Nomor antrean yang telah dialokasikan akan dibatalkan.
          </p>
          <div className="flex justify-end gap-2 pt-2 border-t border-gray-100">
            <Button variant="outline" onClick={() => setShowCancel(false)}>
              Kembali
            </Button>
            <Button variant="destructive" onClick={handleCancel}>
              Ya, Batalkan
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
