'use client';
import { useState } from 'react';
import { Ticket, Clock, MapPin, ChevronRight, Navigation, CheckCircle2, AlertCircle, X, Bell } from 'lucide-react';
import { usePatientRecordStore } from '@/lib/store/usePatientRecordStore';
import Modal from '@/components/ui/Modal';
import Button from '@/components/ui/Button';

export default function TodayQueueBanner() {
  const { activeQueue, dismissQueue } = usePatientRecordStore();
  const [showDirections, setShowDirections] = useState(false);
  const [showTicketModal, setShowTicketModal] = useState(false);

  if (!activeQueue) return null;

  return (
    <>
      <div className="relative overflow-hidden rounded-2xl border-2 border-[var(--color-primary)]/30 bg-gradient-to-r from-emerald-50/80 via-teal-50/50 to-cyan-50/80 p-5 shadow-sm">
        {/* Top tag & dismiss */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100/90 px-2.5 py-0.5 rounded-full">
              Antrean Rawat Jalan Aktif Hari Ini
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-[var(--color-text-secondary)] hidden sm:inline">
              Estimasi Panggilan: <strong className="text-[var(--color-text-primary)]">{activeQueue.estimatedCallTime}</strong>
            </span>
            <button
              onClick={dismissQueue}
              className="p-1 text-gray-400 hover:text-gray-600 rounded-md hover:bg-white/60 transition-colors"
              title="Tutup banner antrean"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          {/* Ticket Number Highlight */}
          <div className="md:col-span-3 flex items-center gap-3 bg-white p-3.5 rounded-xl border border-emerald-200/80 shadow-xs">
            <div className="w-12 h-12 rounded-lg bg-[var(--color-primary)] text-white flex items-center justify-center shrink-0">
              <Ticket className="w-6 h-6" />
            </div>
            <div>
              <p className="text-[11px] font-medium text-[var(--color-text-secondary)] uppercase">Nomor Antrean Anda</p>
              <p className="text-2xl font-black text-[var(--color-primary)] leading-none tracking-tight">
                {activeQueue.ticketNumber}
              </p>
              <p className="text-[11px] font-semibold text-emerald-600 mt-1">
                Dipanggil saat ini: <span className="font-bold text-gray-900">{activeQueue.currentCallingNumber}</span>
              </p>
            </div>
          </div>

          {/* Poly & Doctor Information */}
          <div className="md:col-span-5 space-y-1">
            <h4 className="font-bold text-base text-[var(--color-text-primary)] leading-snug">
              {activeQueue.polyName}
            </h4>
            <p className="text-xs font-medium text-[var(--color-primary)]">
              Dokter: {activeQueue.doctorName}
            </p>
            <div className="flex items-center gap-1.5 text-xs text-[var(--color-text-secondary)]">
              <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
              <span>{activeQueue.roomNumber} &bull; {activeQueue.floor}</span>
            </div>
          </div>

          {/* Status Counter & Actions */}
          <div className="md:col-span-4 flex flex-col sm:flex-row md:flex-col lg:flex-row items-stretch md:items-end justify-between gap-2.5">
            <div className="bg-white/80 backdrop-blur-xs px-3 py-2 rounded-lg border border-gray-200/70 text-xs">
              <div className="flex items-center gap-1.5 font-semibold text-emerald-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>{activeQueue.patientsAhead} Pasien di depan Anda</span>
              </div>
              <p className="text-[11px] text-[var(--color-text-secondary)] mt-0.5">
                Harap bersiap di ruang tunggu poli
              </p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setShowDirections(true)}
                className="px-3 py-2 text-xs font-semibold text-[var(--color-primary)] bg-white border border-[var(--color-primary)]/30 rounded-lg hover:bg-teal-50 transition-colors flex items-center justify-center gap-1.5"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>Rute Poli</span>
              </button>
              <button
                onClick={() => setShowTicketModal(true)}
                className="px-3 py-2 text-xs font-semibold text-white bg-[var(--color-primary)] rounded-lg hover:bg-[var(--color-primary-dark)] shadow-xs transition-colors flex items-center justify-center gap-1.5"
              >
                <Ticket className="w-3.5 h-3.5" />
                <span>Tiket Kiosk</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Rute / Denah Gedung Modal */}
      <Modal
        isOpen={showDirections}
        onClose={() => setShowDirections(false)}
        title="Petunjuk Arah Menuju Ruang Pelayanan"
        size="md"
      >
        <div className="space-y-4 py-1">
          <div className="bg-[var(--color-surface)] p-4 rounded-xl border border-[var(--color-border)]">
            <h5 className="font-bold text-sm text-[var(--color-primary)] mb-1">
              Tujuan: {activeQueue.polyName}
            </h5>
            <p className="text-xs text-[var(--color-text-secondary)]">
              Lokasi: {activeQueue.roomNumber} ({activeQueue.floor})
            </p>
          </div>

          <div className="space-y-3">
            <p className="text-xs font-bold uppercase text-[var(--color-text-secondary)] tracking-wider">
              Langkah Akses Cepat dari Lobi Utama:
            </p>

            <div className="space-y-2.5">
              {[
                {
                  step: '1',
                  title: 'Masuk melalui Pintu Utama Gedung A (Lobi Barat)',
                  desc: 'Konfirmasi kedatangan pada mesin Anjungan Mandiri (APM) di dekat pusat informasi.',
                },
                {
                  step: '2',
                  title: 'Gunakan Lift Pengunjung B atau Eskalator Utama',
                  desc: 'Naik ke Lantai 2 menuju koridor Sayap Medika Timur.',
                },
                {
                  step: '3',
                  title: 'Menuju Nurse Station Poli Jantung',
                  desc: 'Tunjukkan barcode tiket pada layar Anda ke perawat jaga di depan Ruang 204.',
                },
              ].map((item) => (
                <div key={item.step} className="flex items-start gap-3 p-2.5 rounded-lg bg-white border border-gray-100">
                  <span className="w-6 h-6 rounded-full bg-[var(--color-primary-light)] text-[var(--color-primary)] font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    {item.step}
                  </span>
                  <div>
                    <p className="text-xs font-semibold text-[var(--color-text-primary)]">{item.title}</p>
                    <p className="text-[11px] text-[var(--color-text-secondary)] mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <Button variant="primary" size="sm" onClick={() => setShowDirections(false)}>
              Saya Mengerti
            </Button>
          </div>
        </div>
      </Modal>

      {/* Tiket Kiosk E-Ticket Modal */}
      <Modal
        isOpen={showTicketModal}
        onClose={() => setShowTicketModal(false)}
        title="Tiket Antrean Elektronik (E-Ticket)"
        size="sm"
      >
        <div className="text-center py-2 space-y-4">
          <div className="bg-gradient-to-b from-teal-50 to-white p-5 rounded-2xl border-2 border-[var(--color-primary)]">
            <p className="text-xs font-semibold text-[var(--color-primary)] uppercase tracking-wider">
              RS Bahagia Medika Jakarta
            </p>
            <p className="text-[11px] text-gray-500">Klinik Rawat Jalan Spesialis</p>

            <div className="my-4 py-3 border-y border-dashed border-gray-300">
              <span className="text-xs text-gray-500 font-medium">NOMOR ANTREAN</span>
              <p className="text-4xl font-black text-[var(--color-primary)] tracking-tight">
                {activeQueue.ticketNumber}
              </p>
              <p className="text-xs font-semibold text-emerald-700 mt-1">
                3 Pasien di Depan Anda
              </p>
            </div>

            <div className="text-left text-xs space-y-1.5 text-gray-700">
              <div className="flex justify-between">
                <span className="text-gray-500">Poli:</span>
                <span className="font-bold text-right truncate max-w-[160px]">{activeQueue.polyName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Dokter:</span>
                <span className="font-semibold text-right">{activeQueue.doctorName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Ruangan:</span>
                <span className="font-semibold">{activeQueue.roomNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Estimasi Pelayanan:</span>
                <span className="font-bold text-[var(--color-primary)]">{activeQueue.estimatedCallTime}</span>
              </div>
            </div>

            {/* Visual barcode strip */}
            <div className="mt-4 pt-3 border-t border-gray-200 flex flex-col items-center">
              <div className="h-7 flex items-stretch gap-[2px]">
                {[2,1,3,1,4,2,1,2,3,1,4,2,3,1,2,4,1,2,3,2,1,3].map((w, i) => (
                  <div key={i} className="bg-gray-800" style={{ width: `${w * 2}px` }} />
                ))}
              </div>
              <span className="text-[10px] text-gray-500 tracking-widest mt-1">
                {activeQueue.qrCodeToken}
              </span>
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline" size="sm" onClick={() => setShowTicketModal(false)}>
              Tutup
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={() => {
                alert('Tiket antrean berhasil disimpan ke perangkat.');
                setShowTicketModal(false);
              }}
            >
              Unduh Tiket
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
