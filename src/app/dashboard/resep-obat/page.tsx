'use client';
import { useState } from 'react';
import {
  Pill,
  Clock,
  MapPin,
  CheckCircle2,
  Calendar,
  User,
  ShieldCheck,
  AlertCircle,
  Truck,
  RotateCcw,
  Sparkles,
  Info,
  PhoneCall,
  Check,
} from 'lucide-react';
import { usePatientRecordStore } from '@/lib/store/usePatientRecordStore';
import { useUIStore } from '@/lib/store/useUIStore';
import Tabs from '@/components/ui/Tabs';
import Modal from '@/components/ui/Modal';
import Button from '@/components/ui/Button';

const STATUS_TABS = [
  { id: 'all', label: 'Semua Resep' },
  { id: 'pickup', label: 'Siap Diambil di Farmasi' },
  { id: 'active', label: 'Aktif Dikonsumsi' },
];

export default function ResepObatPage() {
  const { prescriptions, toggleMedicationTaken, requestRefill } = usePatientRecordStore();
  const addToast = useUIStore((s) => s.addToast);
  const [activeTab, setActiveTab] = useState('all');
  const [refillModalItem, setRefillModalItem] = useState<string | null>(null);
  const [deliveryMethod, setDeliveryMethod] = useState<'pickup' | 'delivery'>('pickup');

  const filteredPrescriptions = prescriptions.filter((item) => {
    if (activeTab === 'pickup') return item.pharmacyStatus === 'Siap Diambil';
    if (activeTab === 'active') return item.pharmacyStatus === 'Selesai';
    return true;
  });

  const handleToggleTaken = (id: string, name: string, currentState: boolean) => {
    toggleMedicationTaken(id);
    addToast({
      type: currentState ? 'info' : 'success',
      message: currentState
        ? `Status minum obat ${name} dibatalkan.`
        : `Tercatat! Anda telah meminum obat ${name} hari ini.`,
    });
  };

  const handleRefillSubmit = () => {
    if (refillModalItem) {
      requestRefill(refillModalItem);
      addToast({
        type: 'success',
        message:
          deliveryMethod === 'delivery'
            ? 'Permintaan tebus ulang diterima. Kurir MedikaExpress akan mengirim ke alamat terdaftar.'
            : 'Permintaan tebus ulang diproses. Siap diambil di Loket Farmasi dalam 30 menit.',
      });
      setRefillModalItem(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold text-[var(--color-text-primary)]">
              Resep Obat & Layanan Farmasi
            </h1>
            <p className="text-sm text-[var(--color-text-secondary)] mt-0.5">
              Pantau jadwal konsumsi obat harian, status racikan apotek 24 jam, serta layanan tebus resep digital.
            </p>
          </div>

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 font-semibold">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Farmasi Standar Kemenkes RI & BPOM</span>
          </div>
        </div>
      </div>

      {/* Live Pharmacy Dispensing Tracker */}
      <div className="bg-white rounded-2xl border border-[var(--color-border)] p-6 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[var(--color-primary-light)] text-[var(--color-primary)] flex items-center justify-center">
              <Pill className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-[var(--color-primary)]">
                Pelacak Status Farmasi Real-time
              </p>
              <h3 className="font-bold text-base text-[var(--color-text-primary)]">
                Status Penyiapan Obat Kunjungan Terakhir
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-[var(--color-text-secondary)] bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">
            <PhoneCall className="w-3.5 h-3.5 text-teal-600" />
            <span>Hotline Farmasi 24 Jam: <strong>(021) 7890-1234 ext 210</strong></span>
          </div>
        </div>

        {/* 4 Steps Stepper */}
        <div className="relative">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {[
              {
                step: 1,
                title: 'Resep Diterima',
                desc: 'Terkirim otomatis dari ruang poli dokter',
                done: true,
                current: false,
              },
              {
                step: 2,
                title: 'Telaah Resep & Interaksi',
                desc: 'Diverifikasi oleh Apt. Farida, S.Farm',
                done: true,
                current: false,
              },
              {
                step: 3,
                title: 'Peracikan & Quality Check',
                desc: 'Pengemasan higienis & penempelan etiket',
                done: true,
                current: false,
              },
              {
                step: 4,
                title: 'Siap Diambil di Loket',
                desc: 'Loket Farmasi B (Lantai 1 Sayap Barat)',
                done: false,
                current: true,
              },
            ].map((item, idx) => (
              <div
                key={item.step}
                className={`relative p-3.5 rounded-xl border transition-all ${
                  item.current
                    ? 'bg-amber-50/80 border-amber-300 ring-2 ring-amber-400/20'
                    : item.done
                    ? 'bg-emerald-50/60 border-emerald-200'
                    : 'bg-gray-50 border-gray-200 opacity-60'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span
                    className={`w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center ${
                      item.done
                        ? 'bg-emerald-600 text-white'
                        : item.current
                        ? 'bg-amber-500 text-white animate-pulse'
                        : 'bg-gray-200 text-gray-600'
                    }`}
                  >
                    {item.done ? <Check className="w-3.5 h-3.5" /> : item.step}
                  </span>
                  <span
                    className={`text-[10px] font-extrabold uppercase tracking-wider ${
                      item.current
                        ? 'text-amber-700'
                        : item.done
                        ? 'text-emerald-700'
                        : 'text-gray-400'
                    }`}
                  >
                    {item.current ? 'Aktif Sekarang' : item.done ? 'Selesai' : 'Menunggu'}
                  </span>
                </div>
                <h4 className="font-bold text-xs text-[var(--color-text-primary)]">{item.title}</h4>
                <p className="text-[11px] text-[var(--color-text-secondary)] mt-0.5">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs Filter */}
      <Tabs tabs={STATUS_TABS} activeTab={activeTab} onChange={setActiveTab} />

      {/* Prescription Cards */}
      <div className="space-y-4">
        {filteredPrescriptions.map((item) => (
          <div
            key={item.id}
            className={`bg-white rounded-2xl border p-5 shadow-xs transition-all ${
              item.pharmacyStatus === 'Siap Diambil'
                ? 'border-amber-200 bg-gradient-to-r from-amber-50/30 via-white to-white'
                : 'border-[var(--color-border)]'
            }`}
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
              {/* Left Column: Details */}
              <div className="lg:col-span-8 space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-bold text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                    {item.code}
                  </span>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-teal-50 text-[var(--color-primary)]">
                    {item.form}
                  </span>
                  {item.pharmacyStatus === 'Siap Diambil' ? (
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-700 bg-amber-100 px-2.5 py-0.5 rounded-full">
                      <Clock className="w-3 h-3" />
                      Siap Diambil di Farmasi
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                      <CheckCircle2 className="w-3 h-3" />
                      Aktif Dikonsumsi
                    </span>
                  )}
                </div>

                <div>
                  <h3 className="text-lg font-bold text-[var(--color-text-primary)]">
                    {item.medicineName}
                  </h3>
                  <p className="text-xs font-semibold text-[var(--color-primary)]">
                    Aturan Pakai: {item.frequency} &bull; Dosis: {item.dosage}
                  </p>
                </div>

                <div className="p-3 bg-gray-50/80 rounded-xl border border-gray-100 text-xs">
                  <p className="font-semibold text-gray-700">Petunjuk Khusus Dokter:</p>
                  <p className="text-[var(--color-text-secondary)] italic mt-0.5">
                    &ldquo;{item.instruction}&rdquo;
                  </p>
                  {item.notes && (
                    <p className="text-[11px] text-teal-800 font-medium mt-1">
                      Catatan: {item.notes}
                    </p>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-4 text-xs text-[var(--color-text-secondary)] pt-1">
                  <span>Diresepkan oleh: <strong>{item.doctorName}</strong> ({item.doctorSpecialization})</span>
                  <span>Tanggal: <strong>{item.prescribedDate}</strong></span>
                </div>
              </div>

              {/* Right Column: Interactive State / Actions */}
              <div className="lg:col-span-4 lg:border-l lg:border-gray-100 lg:pl-5 flex flex-col justify-between h-full space-y-3">
                {item.pharmacyStatus === 'Siap Diambil' ? (
                  <div className="bg-amber-50 p-4 rounded-xl border border-amber-200 space-y-2 text-xs">
                    <p className="font-bold text-amber-900 flex items-center gap-1.5">
                      <MapPin className="w-4 h-4 text-amber-700" />
                      Lokasi Pengambilan:
                    </p>
                    <p className="text-amber-800 font-medium">
                      {item.pickupLocation}
                    </p>
                    <p className="text-[11px] text-amber-700">
                      Tunjukkan kartu digital atau sebutkan No. RM Anda pada loket farmasi.
                    </p>
                  </div>
                ) : (
                  <div className="bg-gray-50/70 p-3.5 rounded-xl border border-gray-100 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-500">Sisa Terapi:</span>
                      <span className="font-bold text-gray-800">{item.remainingDays} dari {item.durationDays} hari</span>
                    </div>

                    {/* Progress bar */}
                    <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-[var(--color-primary)] h-full rounded-full transition-all"
                        style={{
                          width: `${Math.round(((item.durationDays - item.remainingDays) / item.durationDays) * 100)}%`,
                        }}
                      />
                    </div>

                    {/* Check-off toggle */}
                    <div className="pt-2">
                      <button
                        onClick={() => handleToggleTaken(item.id, item.medicineName, item.takenToday)}
                        className={`w-full py-2 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                          item.takenToday
                            ? 'bg-emerald-600 text-white shadow-xs'
                            : 'bg-white border border-gray-300 hover:bg-emerald-50 text-gray-700 hover:text-emerald-800'
                        }`}
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        <span>{item.takenToday ? 'Sudah Diminum Hari Ini' : 'Tandai Sudah Minum Hari Ini'}</span>
                      </button>
                    </div>
                  </div>
                )}

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full text-xs"
                    onClick={() => setRefillModalItem(item.id)}
                  >
                    <RotateCcw className="w-3.5 h-3.5 mr-1" />
                    Minta Tebus Ulang
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Refill / Tebus Ulang Modal */}
      {refillModalItem && (
        <Modal
          isOpen={!!refillModalItem}
          onClose={() => setRefillModalItem(null)}
          title="Permintaan Tebus Ulang Resep (Refill)"
          size="md"
        >
          <div className="space-y-4 py-1 text-xs">
            <p className="text-[var(--color-text-secondary)]">
              Pilih metode pengambilan obat yang diresepkan oleh dokter Anda:
            </p>

            <div className="space-y-2.5">
              <label
                className={`flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${
                  deliveryMethod === 'pickup'
                    ? 'border-[var(--color-primary)] bg-teal-50/40'
                    : 'border-gray-200 hover:bg-gray-50'
                }`}
              >
                <input
                  type="radio"
                  name="delivery"
                  checked={deliveryMethod === 'pickup'}
                  onChange={() => setDeliveryMethod('pickup')}
                  className="mt-0.5 text-[var(--color-primary)]"
                />
                <div>
                  <p className="font-bold text-sm text-[var(--color-text-primary)]">
                    Ambil Mandiri di Loket Farmasi RS
                  </p>
                  <p className="text-[11px] text-[var(--color-text-secondary)] mt-0.5">
                    Obat disiapkan dalam 30 menit. Bebas biaya antrean kiosk dengan verifikasi resep digital.
                  </p>
                </div>
              </label>

              <label
                className={`flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${
                  deliveryMethod === 'delivery'
                    ? 'border-[var(--color-primary)] bg-teal-50/40'
                    : 'border-gray-200 hover:bg-gray-50'
                }`}
              >
                <input
                  type="radio"
                  name="delivery"
                  checked={deliveryMethod === 'delivery'}
                  onChange={() => setDeliveryMethod('delivery')}
                  className="mt-0.5 text-[var(--color-primary)]"
                />
                <div>
                  <p className="font-bold text-sm text-[var(--color-text-primary)] flex items-center gap-1.5">
                    <Truck className="w-4 h-4 text-[var(--color-primary)]" />
                    Kirim ke Alamat Pasien (MedikaExpress)
                  </p>
                  <p className="text-[11px] text-[var(--color-text-secondary)] mt-0.5">
                    Dikirim menggunakan kurir khusus berpendingin medis standar kefarmasian (Area Jabodetabek).
                  </p>
                </div>
              </label>
            </div>

            <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-amber-900 text-[11px] flex items-start gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-amber-700 mt-0.5" />
              <span>
                Obat dengan pengawasan khusus / antibiotik memerlukan verifikasi dokter penanggung jawab sebelum peracikan disetujui.
              </span>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-gray-100">
              <Button variant="outline" size="sm" onClick={() => setRefillModalItem(null)}>
                Batal
              </Button>
              <Button variant="primary" size="sm" onClick={handleRefillSubmit}>
                Kirim Permintaan Tebus
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
