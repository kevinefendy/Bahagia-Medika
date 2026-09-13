'use client';

import { useState } from 'react';
import Link from 'next/link';
import treatmentData from '@/data/treatmentEstimates.json';
import { Calculator, Shield, CheckCircle2, ArrowRight, HelpCircle, Phone, FileText } from 'lucide-react';

export default function TreatmentCostEstimator() {
  const [selectedProcId, setSelectedProcId] = useState<string>(treatmentData[0].id);
  const [selectedClass, setSelectedClass] = useState<'vvip' | 'vip' | 'kelas1' | 'kelas2'>('vip');
  const [paymentMode, setPaymentMode] = useState<'mandiri' | 'asuransi' | 'bpjs'>('mandiri');

  const currentProc = treatmentData.find((t) => t.id === selectedProcId) || treatmentData[0];
  const currentPkg = currentProc.packages[selectedClass] || currentProc.packages.vip;

  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(val);
  };

  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-16 sm:py-20">
      <div className="bg-gradient-to-br from-[#F4FAFB] via-white to-[#EAF4F6] border border-[var(--color-border)] rounded-3xl p-6 sm:p-10 md:p-12 shadow-sm">
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[var(--color-border)] text-xs font-semibold text-[var(--color-primary)] mb-3 shadow-2xs">
            <Calculator className="w-3.5 h-3.5" />
            <span>Kalkulator Tarif Medis Transparan</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[var(--color-text-primary)] tracking-tight mb-3">
            Simulasi & Estimasi Biaya Tindakan Medis
          </h2>
          <p className="text-sm sm:text-base text-[var(--color-text-secondary)] leading-relaxed">
            Dapatkan kepastian estimasi biaya sebelum menjalani prosedur medis. Rincian disusun secara jujur dan transparan demi kenyamanan perencanaan finansial Anda.
          </p>
        </div>

        {/* Step 1: Pilih Prosedur */}
        <div className="mb-8">
          <label className="block text-xs font-bold uppercase tracking-wider text-[var(--color-text-secondary)] mb-3">
            1. Pilih Tindakan Medis / Perawatan:
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5">
            {treatmentData.map((proc) => (
              <button
                key={proc.id}
                type="button"
                onClick={() => setSelectedProcId(proc.id)}
                className={`p-3.5 rounded-xl border text-left transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                  selectedProcId === proc.id
                    ? 'bg-white border-2 border-[var(--color-primary)] shadow-md ring-2 ring-[var(--color-primary)]/10 text-[var(--color-primary)]'
                    : 'bg-white/70 hover:bg-white border-[var(--color-border)] text-[var(--color-text-secondary)]'
                }`}
              >
                <span className="text-xs font-bold block mb-1 line-clamp-2">
                  {proc.name}
                </span>
                <span className="text-[10px] opacity-75 block">
                  {proc.lengthOfStay}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Step 2: Pilih Kelas Perawatan & Jalur Penjaminan */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Kelas */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[var(--color-text-secondary)] mb-2">
              2. Pilih Kelas Kamar Rawat Inap:
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { id: 'vvip', label: 'VVIP' },
                { id: 'vip', label: 'VIP Deluxe' },
                { id: 'kelas1', label: 'Kelas 1' },
                { id: 'kelas2', label: 'Kelas 2' },
              ].map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setSelectedClass(c.id as any)}
                  className={`py-2.5 px-3 rounded-xl border text-xs font-bold transition-all cursor-pointer text-center ${
                    selectedClass === c.id
                      ? 'bg-[var(--color-primary)] text-white border-[var(--color-primary)] shadow-xs'
                      : 'bg-white text-[var(--color-text-secondary)] border-[var(--color-border)] hover:bg-[var(--color-surface)]'
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>

          {/* Metode Pembayaran */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[var(--color-text-secondary)] mb-2">
              3. Jalur Penjaminan / Pembayaran:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {[
                { id: 'mandiri', label: 'Umum / Mandiri' },
                { id: 'asuransi', label: 'Asuransi Cashless' },
                { id: 'bpjs', label: 'BPJS Kesehatan' },
              ].map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setPaymentMode(p.id as any)}
                  className={`py-2.5 px-3 rounded-xl border text-xs font-bold transition-all cursor-pointer text-center ${
                    paymentMode === p.id
                      ? 'bg-[var(--color-primary)] text-white border-[var(--color-primary)] shadow-xs'
                      : 'bg-white text-[var(--color-text-secondary)] border-[var(--color-border)] hover:bg-[var(--color-surface)]'
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Calculation Result Box */}
        <div className="bg-white rounded-2xl border border-[var(--color-border)] p-6 sm:p-8 shadow-sm">
          {paymentMode === 'bpjs' ? (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-emerald-900">
                    Dijamin Penuh oleh BPJS Kesehatan (Biaya Rp 0)
                  </h4>
                  <p className="text-xs text-emerald-800 mt-1 leading-relaxed">
                    Tindakan <strong>{currentProc.name}</strong> ditanggung oleh BPJS Kesehatan sesuai indikasi medis darurat atau sistem rujukan berjenjang dari FKTP / Puskesmas ke RS Bahagia Medika.
                  </p>
                </div>
              </div>
              <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
                *Apabila Anda menghendaki naik kelas perawatan (misal dari hak kelas BPJS ke kamar VIP atau VVIP), Anda hanya dikenakan selisih tarif kamar sesuai peraturan Menteri Kesehatan RI yang berlaku.
              </p>
            </div>
          ) : (
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[var(--color-border)]/60">
                <div>
                  <span className="text-xs font-semibold text-[var(--color-primary)] uppercase tracking-wider">
                    {currentProc.category}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-[var(--color-text-primary)] mt-0.5">
                    {currentProc.name}
                  </h3>
                  <p className="text-xs text-[var(--color-text-secondary)] mt-1">
                    Kamar {currentPkg.room} • Durasi Perawatan: {currentProc.lengthOfStay}
                  </p>
                </div>

                <div className="sm:text-right">
                  <span className="text-xs text-[var(--color-text-secondary)] block">Estimasi Total Biaya:</span>
                  <span className="text-2xl sm:text-3xl font-black text-[var(--color-primary)] block">
                    {formatRupiah(currentPkg.total)}
                  </span>
                  {paymentMode === 'asuransi' && (
                    <span className="text-[11px] font-semibold text-emerald-600 flex items-center sm:justify-end gap-1 mt-0.5">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Berlaku sistem cashless 50+ asuransi rekanan</span>
                    </span>
                  )}
                </div>
              </div>

              {/* Breakdown Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-6 border-b border-[var(--color-border)]/60">
                <div className="p-3 bg-[var(--color-surface)]/60 rounded-xl">
                  <span className="text-[11px] text-[var(--color-text-secondary)] block">Jasa Dokter & Bedah</span>
                  <span className="text-sm font-bold text-[var(--color-text-primary)] mt-1 block">
                    {formatRupiah(currentPkg.breakdown.doctor)}
                  </span>
                </div>
                <div className="p-3 bg-[var(--color-surface)]/60 rounded-xl">
                  <span className="text-[11px] text-[var(--color-text-secondary)] block">Kamar & Rawat Inap</span>
                  <span className="text-sm font-bold text-[var(--color-text-primary)] mt-1 block">
                    {formatRupiah(currentPkg.breakdown.room)}
                  </span>
                </div>
                <div className="p-3 bg-[var(--color-surface)]/60 rounded-xl">
                  <span className="text-[11px] text-[var(--color-text-secondary)] block">Obat & Alat Medis (BHP)</span>
                  <span className="text-sm font-bold text-[var(--color-text-primary)] mt-1 block">
                    {formatRupiah(currentPkg.breakdown.meds)}
                  </span>
                </div>
                <div className="p-3 bg-[var(--color-surface)]/60 rounded-xl">
                  <span className="text-[11px] text-[var(--color-text-secondary)] block">Administrasi RS</span>
                  <span className="text-sm font-bold text-[var(--color-text-primary)] mt-1 block">
                    {formatRupiah(currentPkg.breakdown.admin)}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6">
            <p className="text-[11px] text-[var(--color-text-secondary)] leading-relaxed">
              *Estimasi dapat bervariasi sesuai respon pemulihan dan kondisi klinis penyerta pasien.
            </p>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <Link
                href="/buat-janji"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white text-xs font-bold transition-colors shadow-xs"
              >
                <span>Konsultasi Dokter Tindakan</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
