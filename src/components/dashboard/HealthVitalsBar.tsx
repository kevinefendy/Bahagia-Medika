'use client';
import { useState } from 'react';
import { Heart, Activity, Droplets, Scale, PlusCircle, CheckCircle, AlertTriangle, Calendar } from 'lucide-react';
import { usePatientRecordStore } from '@/lib/store/usePatientRecordStore';
import { useUIStore } from '@/lib/store/useUIStore';
import Modal from '@/components/ui/Modal';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

export default function HealthVitalsBar() {
  const { vitals, updateVitals } = usePatientRecordStore();
  const addToast = useUIStore((s) => s.addToast);
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  const [form, setForm] = useState({
    bloodPressure: vitals.bloodPressure,
    heartRate: vitals.heartRate.toString(),
    bloodSugar: vitals.bloodSugar.toString(),
    weightKg: vitals.weightKg.toString(),
    heightCm: vitals.heightCm.toString(),
  });

  const handleSave = () => {
    const hr = parseInt(form.heartRate, 10) || 72;
    const bs = parseInt(form.bloodSugar, 10) || 92;
    const wt = parseFloat(form.weightKg) || 64;
    const ht = parseFloat(form.heightCm) || 170;
    const heightInM = ht / 100;
    const bmiVal = parseFloat((wt / (heightInM * heightInM)).toFixed(1));

    let bpStatus: 'Normal' | 'Prahipertensi' | 'Hipertensi' = 'Normal';
    const systolic = parseInt(form.bloodPressure.split('/')[0], 10);
    if (systolic >= 140) bpStatus = 'Hipertensi';
    else if (systolic >= 120) bpStatus = 'Prahipertensi';

    updateVitals({
      bloodPressure: form.bloodPressure,
      bloodPressureStatus: bpStatus,
      heartRate: hr,
      heartRateStatus: hr > 100 ? 'Tinggi' : hr < 60 ? 'Rendah' : 'Normal',
      bloodSugar: bs,
      bloodSugarStatus: bs > 100 ? 'Perlu Perhatian' : 'Normal',
      weightKg: wt,
      heightCm: ht,
      bmi: bmiVal,
      bmiCategory: bmiVal > 25 ? 'Berlebih' : bmiVal < 18.5 ? 'Kurang' : 'Ideal',
      lastCheckedDate: new Date().toISOString().split('T')[0],
    });

    addToast({ type: 'success', message: 'Tanda vital berhasil diperbarui.' });
    setShowUpdateModal(false);
  };

  const metrics = [
    {
      label: 'Tekanan Darah',
      value: vitals.bloodPressure,
      status: vitals.bloodPressureStatus,
      isWarning: vitals.bloodPressureStatus !== 'Normal',
      icon: Activity,
      color: 'text-rose-600',
      bgColor: 'bg-rose-50',
      detail: 'Pemeriksaan tensimeter',
    },
    {
      label: 'Detak Jantung',
      value: `${vitals.heartRate} bpm`,
      status: vitals.heartRateStatus,
      isWarning: vitals.heartRateStatus !== 'Normal',
      icon: Heart,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
      detail: 'Istirahat tenang',
    },
    {
      label: 'Gula Darah Puasa',
      value: `${vitals.bloodSugar} mg/dL`,
      status: vitals.bloodSugarStatus,
      isWarning: vitals.bloodSugarStatus !== 'Normal',
      icon: Droplets,
      color: 'text-cyan-600',
      bgColor: 'bg-cyan-50',
      detail: 'Glukometer digital',
    },
    {
      label: 'Indeks Massa Tubuh',
      value: `${vitals.bmi} BMI`,
      status: vitals.bmiCategory,
      isWarning: vitals.bmiCategory !== 'Ideal',
      icon: Scale,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
      detail: `${vitals.weightKg} kg / ${vitals.heightCm} cm`,
    },
  ];

  return (
    <>
      <div className="bg-white rounded-2xl border border-[var(--color-border)] p-5 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
          <div>
            <h3 className="font-bold text-base text-[var(--color-text-primary)] flex items-center gap-2">
              <Activity className="w-4 h-4 text-[var(--color-primary)]" />
              Tanda Vital & Indikator Kesehatan
            </h3>
            <p className="text-xs text-[var(--color-text-secondary)] mt-0.5">
              Pembaruan terakhir: {vitals.lastCheckedDate} &bull; Terverifikasi oleh tim medis klinik
            </p>
          </div>

          <button
            onClick={() => setShowUpdateModal(true)}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--color-primary)] hover:text-[var(--color-primary-dark)] p-1.5 rounded-lg hover:bg-[var(--color-surface)] transition-colors"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>Catat Mandiri</span>
          </button>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {metrics.map((m) => (
            <div
              key={m.label}
              className="p-3.5 rounded-xl border border-gray-100 bg-gray-50/50 hover:bg-white hover:border-teal-200 transition-all shadow-2xs"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-[var(--color-text-secondary)] truncate">
                  {m.label}
                </span>
                <div className={`p-1.5 rounded-lg ${m.bgColor}`}>
                  <m.icon className={`w-3.5 h-3.5 ${m.color}`} />
                </div>
              </div>

              <div className="space-y-1">
                <p className="text-lg font-black text-[var(--color-text-primary)] tracking-tight">
                  {m.value}
                </p>

                <div className="flex items-center justify-between gap-1 text-[11px]">
                  <span className="text-gray-400 truncate text-[10px] sm:text-[11px]">{m.detail}</span>
                  <span
                    className={`inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full font-bold text-[10px] shrink-0 ${
                      m.isWarning
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-emerald-100 text-emerald-800'
                    }`}
                  >
                    {m.isWarning ? (
                      <AlertTriangle className="w-2.5 h-2.5" />
                    ) : (
                      <CheckCircle className="w-2.5 h-2.5" />
                    )}
                    {m.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Update Vitals Modal */}
      <Modal
        isOpen={showUpdateModal}
        onClose={() => setShowUpdateModal(false)}
        title="Catat Pembaruan Tanda Vital Mandiri"
        size="md"
      >
        <div className="space-y-4 py-2">
          <p className="text-xs text-[var(--color-text-secondary)]">
            Catatan mandiri ini membantu dokter memantau fluktuasi kesehatan Anda di antara kunjungan konsultasi.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Input
              label="Tekanan Darah (mmHg)"
              placeholder="Contoh: 120/80"
              value={form.bloodPressure}
              onChange={(e) => setForm({ ...form, bloodPressure: e.target.value })}
            />
            <Input
              label="Detak Jantung (bpm)"
              placeholder="Contoh: 75"
              type="number"
              value={form.heartRate}
              onChange={(e) => setForm({ ...form, heartRate: e.target.value })}
            />
            <Input
              label="Gula Darah Puasa (mg/dL)"
              placeholder="Contoh: 95"
              type="number"
              value={form.bloodSugar}
              onChange={(e) => setForm({ ...form, bloodSugar: e.target.value })}
            />
            <Input
              label="Berat Badan (kg)"
              placeholder="Contoh: 65"
              type="number"
              value={form.weightKg}
              onChange={(e) => setForm({ ...form, weightKg: e.target.value })}
            />
          </div>

          <Input
            label="Tinggi Badan (cm)"
            placeholder="Contoh: 170"
            type="number"
            value={form.heightCm}
            onChange={(e) => setForm({ ...form, heightCm: e.target.value })}
          />

          <div className="flex justify-end gap-2 pt-2 border-t border-gray-100">
            <Button variant="outline" size="sm" onClick={() => setShowUpdateModal(false)}>
              Batal
            </Button>
            <Button variant="primary" size="sm" onClick={handleSave}>
              Simpan Data Vital
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
