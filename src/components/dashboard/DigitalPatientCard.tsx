'use client';
import { useState } from 'react';
import { QrCode, CreditCard, ShieldCheck, Copy, Check, Maximize2, Sparkles, Building2 } from 'lucide-react';
import { usePatientRecordStore } from '@/lib/store/usePatientRecordStore';
import { useAuthStore } from '@/lib/store/useAuthStore';
import Modal from '@/components/ui/Modal';
import Button from '@/components/ui/Button';

export default function DigitalPatientCard() {
  const user = useAuthStore((s) => s.user);
  const { medicalRecord } = usePatientRecordStore();
  const [showQrModal, setShowQrModal] = useState(false);
  const [copied, setCopied] = useState(false);

  const patientName = user?.name || 'Kevin Santoso';
  const rmNumber = medicalRecord.rmNumber;
  const bloodType = medicalRecord.bloodType;
  const insuranceName = medicalRecord.insurance.providerName;
  const insuranceStatus = medicalRecord.insurance.status;

  const handleCopyRm = () => {
    navigator.clipboard.writeText(rmNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#18313D] via-[#214F60] to-[#285F75] p-6 text-white shadow-lg border border-white/10 transition-all hover:shadow-xl">
        {/* Decorative background watermark */}
        <div className="absolute -right-8 -bottom-10 opacity-10 pointer-events-none select-none">
          <Building2 className="w-56 h-56 text-white" />
        </div>
        <div className="absolute top-0 right-0 w-36 h-36 bg-[#78AFC0]/15 rounded-full blur-2xl pointer-events-none" />

        {/* Card Header */}
        <div className="flex items-start justify-between relative z-10 mb-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white">
              <Sparkles className="w-5 h-5 text-[#98D2E1]" />
            </div>
            <div>
              <p className="text-xs font-semibold tracking-wider uppercase text-[#98D2E1]">Bahagia Medika</p>
              <h3 className="text-sm font-bold text-white tracking-wide">CAREPASS DIGITAL PASIEN</h3>
            </div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-[#285F75]/80 text-[#98D2E1] border border-white/15 backdrop-blur-md">
            <ShieldCheck className="w-3.5 h-3.5 text-[#4ade80]" />
            Terverifikasi
          </span>
        </div>

        {/* Card Body */}
        <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
          <div>
            <p className="text-xs text-white/70">Nama Pasien</p>
            <p className="text-lg font-bold text-white tracking-tight truncate">{patientName}</p>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs text-white/70">Gol. Darah:</span>
              <span className="text-xs font-bold px-2 py-0.5 rounded bg-white/20 text-white font-mono">
                {bloodType}
              </span>
              <span className="text-xs text-white/60">|</span>
              <span className="text-xs text-[#98D2E1] truncate font-medium">{insuranceName}</span>
            </div>
          </div>

          <div className="sm:text-right flex flex-col justify-end">
            <p className="text-xs text-white/70">Nomor Rekam Medis (No. RM)</p>
            <div className="flex items-center sm:justify-end gap-1.5 mt-0.5">
              <span className="font-mono text-base font-extrabold tracking-wider text-white">
                {rmNumber}
              </span>
              <button
                onClick={handleCopyRm}
                title="Salin No. RM"
                className="p-1 rounded hover:bg-white/15 text-white/80 hover:text-white transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-[#4ade80]" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
            <p className="text-[11px] text-white/60 mt-0.5">Faskes: RS Bahagia Medika Jakarta</p>
          </div>
        </div>

        {/* Card Footer / Kiosk Action */}
        <div className="relative z-10 pt-4 border-t border-white/15 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-white/80">
            <CreditCard className="w-4 h-4 text-[#98D2E1]" />
            <span>Gunakan untuk pendaftaran mesin kiosk & poli rawat jalan</span>
          </div>

          <button
            onClick={() => setShowQrModal(true)}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-white text-[#18313D] hover:bg-[#EAF4F6] shadow-sm transition-all"
          >
            <QrCode className="w-4 h-4 text-[var(--color-primary)]" />
            <span>Buka QR Kiosk</span>
            <Maximize2 className="w-3 h-3 text-gray-500" />
          </button>
        </div>
      </div>

      {/* QR Code Kiosk Modal */}
      <Modal
        isOpen={showQrModal}
        onClose={() => setShowQrModal(false)}
        title="QR Barcode Check-in Mandiri Kiosk"
        size="md"
      >
        <div className="text-center py-2 space-y-4">
          <p className="text-sm text-[var(--color-text-secondary)]">
            Arahkan layar ponsel ini ke sensor scanner pada mesin Anjungan Pendaftaran Mandiri (APM) di lobi rumah sakit.
          </p>

          {/* High contrast QR code simulation box */}
          <div className="inline-block p-6 bg-white border-2 border-dashed border-[var(--color-primary)] rounded-2xl shadow-md">
            {/* SVG Representation of 2D DataMatrix/QR */}
            <div className="w-48 h-48 mx-auto bg-white p-2 flex flex-col items-center justify-center">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                {/* Outer corners */}
                <rect x="5" y="5" width="26" height="26" fill="#18313D" rx="4" />
                <rect x="9" y="9" width="18" height="18" fill="white" />
                <rect x="13" y="13" width="10" height="10" fill="#18313D" />

                <rect x="69" y="5" width="26" height="26" fill="#18313D" rx="4" />
                <rect x="73" y="9" width="18" height="18" fill="white" />
                <rect x="77" y="13" width="10" height="10" fill="#18313D" />

                <rect x="5" y="69" width="26" height="26" fill="#18313D" rx="4" />
                <rect x="9" y="73" width="18" height="18" fill="white" />
                <rect x="13" y="77" width="10" height="10" fill="#18313D" />

                {/* Data blocks */}
                <rect x="36" y="8" width="6" height="6" fill="#18313D" />
                <rect x="46" y="8" width="6" height="6" fill="#18313D" />
                <rect x="56" y="8" width="6" height="6" fill="#18313D" />
                <rect x="36" y="18" width="6" height="6" fill="#285F75" />
                <rect x="46" y="24" width="8" height="8" fill="#18313D" />
                <rect x="58" y="20" width="5" height="5" fill="#18313D" />

                <rect x="10" y="38" width="6" height="6" fill="#18313D" />
                <rect x="20" y="44" width="8" height="8" fill="#285F75" />
                <rect x="34" y="36" width="14" height="14" fill="#18313D" rx="2" />
                <rect x="54" y="38" width="8" height="8" fill="#18313D" />
                <rect x="68" y="42" width="6" height="6" fill="#285F75" />
                <rect x="80" y="36" width="10" height="10" fill="#18313D" />

                <rect x="36" y="56" width="8" height="8" fill="#285F75" />
                <rect x="48" y="58" width="6" height="6" fill="#18313D" />
                <rect x="58" y="54" width="8" height="8" fill="#18313D" />
                <rect x="70" y="60" width="8" height="8" fill="#285F75" />
                <rect x="82" y="54" width="6" height="6" fill="#18313D" />

                <rect x="38" y="74" width="8" height="8" fill="#18313D" />
                <rect x="50" y="76" width="6" height="6" fill="#285F75" />
                <rect x="62" y="72" width="10" height="10" fill="#18313D" />
                <rect x="78" y="78" width="8" height="8" fill="#18313D" />
              </svg>
            </div>
            {/* Barcode strip below QR */}
            <div className="mt-2 pt-2 border-t border-gray-100 flex flex-col items-center">
              <div className="h-8 flex items-stretch gap-[3px]">
                {[3,1,2,4,1,3,2,1,4,2,1,3,2,4,1,2,3,1,4,2,3,1,2,3].map((w, i) => (
                  <div key={i} className="bg-slate-800" style={{ width: `${w * 2}px` }} />
                ))}
              </div>
              <p className="font-mono text-xs font-bold text-slate-700 tracking-wider mt-1">{rmNumber}</p>
            </div>
          </div>

          <div className="bg-[var(--color-surface)] p-3 rounded-xl text-left text-xs space-y-1.5 border border-[var(--color-border)]">
            <div className="flex justify-between">
              <span className="text-[var(--color-text-secondary)]">Nama Pasien:</span>
              <span className="font-semibold text-[var(--color-text-primary)]">{patientName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[var(--color-text-secondary)]">No. Rekam Medis:</span>
              <span className="font-mono font-bold text-[var(--color-primary)]">{rmNumber}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[var(--color-text-secondary)]">Penjamin:</span>
              <span className="font-semibold text-emerald-700">{insuranceName} ({insuranceStatus})</span>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button variant="outline" size="sm" onClick={() => setShowQrModal(false)}>
              Tutup
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={() => {
                alert('Kartu Digital berhasil diunduh ke galeri ponsel Anda.');
                setShowQrModal(false);
              }}
            >
              Simpan ke Ponsel
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
