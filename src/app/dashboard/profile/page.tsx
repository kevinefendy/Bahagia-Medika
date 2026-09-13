'use client';
import { useState } from 'react';
import {
  User,
  ShieldCheck,
  Heart,
  Phone,
  CreditCard,
  AlertTriangle,
  Save,
  Edit3,
  UserCheck,
} from 'lucide-react';
import { useAuthStore } from '@/lib/store/useAuthStore';
import { useProfileStore } from '@/lib/store/useProfileStore';
import { usePatientRecordStore } from '@/lib/store/usePatientRecordStore';
import type { PatientMedicalRecord } from '@/types/patientRecord';
import { useUIStore } from '@/lib/store/useUIStore';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import Tabs from '@/components/ui/Tabs';

const PROFILE_TABS = [
  { id: 'identity', label: 'Data Identitas' },
  { id: 'clinical', label: 'Rekam Klinis & Alergi' },
  { id: 'emergency', label: 'Kontak Darurat' },
  { id: 'insurance', label: 'Asuransi & Penjamin' },
];

export default function ProfilePage() {
  const user = useAuthStore((s) => s.user);
  const { profile, updateProfile } = useProfileStore();
  const { medicalRecord, updateMedicalRecord } = usePatientRecordStore();
  const addToast = useUIStore((s) => s.addToast);

  const [activeTab, setActiveTab] = useState('identity');
  const [editing, setEditing] = useState(false);

  // Form states
  const [form, setForm] = useState({
    fullName: profile?.fullName || user?.name || 'Kevin Santoso',
    email: profile?.email || user?.email || 'user@example.com',
    phoneNumber: profile?.phoneNumber || user?.phoneNumber || '08123456789',
    birthDate: profile?.birthDate || user?.birthDate || '1996-05-14',
    address: profile?.address || user?.address || 'Jl. Contoh No. 10, Jakarta Selatan',
    // Clinical & Medical Record
    bloodType: medicalRecord.bloodType,
    medicationAllergies: medicalRecord.allergies.medications.join(', '),
    foodAllergies: medicalRecord.allergies.foods.join(', '),
    chronicConditions: medicalRecord.chronicConditions.join(', '),
    // Emergency Contact
    emergencyName: medicalRecord.emergencyContact.name,
    emergencyRelation: medicalRecord.emergencyContact.relationship,
    emergencyPhone: medicalRecord.emergencyContact.phoneNumber,
    // Insurance
    insuranceProvider: medicalRecord.insurance.providerName,
    insuranceCardNumber: medicalRecord.insurance.cardNumber,
    insuranceClass: medicalRecord.insurance.classType,
  });

  const handleSave = () => {
    updateProfile({
      fullName: form.fullName,
      email: form.email,
      phoneNumber: form.phoneNumber,
      birthDate: form.birthDate,
      address: form.address,
    });

    updateMedicalRecord({
      bloodType: form.bloodType as PatientMedicalRecord['bloodType'],
      allergies: {
        medications: form.medicationAllergies.split(',').map((s) => s.trim()).filter(Boolean),
        foods: form.foodAllergies.split(',').map((s) => s.trim()).filter(Boolean),
        others: medicalRecord.allergies.others,
      },
      chronicConditions: form.chronicConditions.split(',').map((s) => s.trim()).filter(Boolean),
      emergencyContact: {
        name: form.emergencyName,
        relationship: form.emergencyRelation,
        phoneNumber: form.emergencyPhone,
      },
      insurance: {
        ...medicalRecord.insurance,
        providerName: form.insuranceProvider,
        cardNumber: form.insuranceCardNumber,
        classType: form.insuranceClass,
      },
    });

    addToast({ type: 'success', message: 'Data profil & rekam medis berhasil diperbarui.' });
    setEditing(false);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header Profile Hero */}
      <div className="bg-white rounded-2xl border border-[var(--color-border)] p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#18313D] to-[var(--color-primary)] flex items-center justify-center text-white shadow-sm shrink-0">
              <User className="w-8 h-8" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-xl font-bold text-[var(--color-text-primary)]">
                  {form.fullName}
                </h1>
                <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                  <ShieldCheck className="w-3 h-3" /> Pasien Terdaftar
                </span>
              </div>
              <p className="text-xs text-[var(--color-text-secondary)] mt-0.5">
                No. Rekam Medis (RM): <strong className="text-gray-800">{medicalRecord.rmNumber}</strong> &bull; NIK: <strong className="text-gray-800">{medicalRecord.nik}</strong>
              </p>
            </div>
          </div>

          <div className="w-full sm:w-auto flex justify-end">
            {!editing ? (
              <Button
                variant="primary"
                size="sm"
                onClick={() => setEditing(true)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Edit Data Profil</span>
              </Button>
            ) : (
              <div className="flex gap-2 w-full sm:w-auto">
                <Button variant="outline" size="sm" onClick={() => setEditing(false)} className="flex-1 sm:flex-none">
                  Batal
                </Button>
                <Button variant="primary" size="sm" onClick={handleSave} className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5">
                  <Save className="w-3.5 h-3.5" />
                  <span>Simpan</span>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs tabs={PROFILE_TABS} activeTab={activeTab} onChange={setActiveTab} />

      {/* Tab Content Cards */}
      <div className="bg-white rounded-2xl border border-[var(--color-border)] p-6 shadow-xs">
        {/* TAB 1: IDENTITAS */}
        {activeTab === 'identity' && (
          <div className="space-y-4">
            <h3 className="font-bold text-base text-[var(--color-text-primary)] flex items-center gap-2 mb-4">
              <UserCheck className="w-4 h-4 text-[var(--color-primary)]" />
              Informasi Kependudukan & Kontak Pasien
            </h3>

            {editing ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Nama Lengkap (Sesuai KTP)"
                  value={form.fullName}
                  onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                />
                <Input
                  label="Alamat Email"
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
                <Input
                  label="Nomor Telepon / WhatsApp"
                  value={form.phoneNumber}
                  onChange={(e) => setForm({ ...form, phoneNumber: e.target.value })}
                />
                <Input
                  label="Tanggal Lahir"
                  type="date"
                  value={form.birthDate}
                  onChange={(e) => setForm({ ...form, birthDate: e.target.value })}
                />
                <div className="md:col-span-2">
                  <Input
                    label="Alamat Domisili Tempat Tinggal"
                    value={form.address}
                    onChange={(e) => setForm({ ...form, address: e.target.value })}
                  />
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-3.5 rounded-xl bg-gray-50/70 border border-gray-100">
                  <span className="text-gray-500 block mb-1">Nama Lengkap:</span>
                  <span className="font-bold text-sm text-gray-900">{form.fullName}</span>
                </div>
                <div className="p-3.5 rounded-xl bg-gray-50/70 border border-gray-100">
                  <span className="text-gray-500 block mb-1">Email Terdaftar:</span>
                  <span className="font-semibold text-sm text-gray-900">{form.email}</span>
                </div>
                <div className="p-3.5 rounded-xl bg-gray-50/70 border border-gray-100">
                  <span className="text-gray-500 block mb-1">Nomor Handphone:</span>
                  <span className="font-semibold text-sm text-gray-900">{form.phoneNumber}</span>
                </div>
                <div className="p-3.5 rounded-xl bg-gray-50/70 border border-gray-100">
                  <span className="text-gray-500 block mb-1">Tanggal Lahir:</span>
                  <span className="font-semibold text-sm text-gray-900">{form.birthDate}</span>
                </div>
                <div className="p-3.5 rounded-xl bg-gray-50/70 border border-gray-100 sm:col-span-2">
                  <span className="text-gray-500 block mb-1">Alamat Domisili:</span>
                  <span className="font-medium text-sm text-gray-900">{form.address}</span>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: REKAM KLINIS & ALERGI */}
        {activeTab === 'clinical' && (
          <div className="space-y-4">
            <h3 className="font-bold text-base text-[var(--color-text-primary)] flex items-center gap-2 mb-4">
              <Heart className="w-4 h-4 text-rose-600" />
              Peringatan Klinis, Golongan Darah & Alergi
            </h3>

            {editing ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Golongan Darah & Rhesus
                  </label>
                  <select
                    value={form.bloodType}
                    onChange={(e) => setForm({ ...form, bloodType: e.target.value as PatientMedicalRecord['bloodType'] })}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-[var(--color-border)] bg-white focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                  >
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                  </select>
                </div>

                <Input
                  label="Riwayat Alergi Obat-obatan (Pisahkan dengan koma)"
                  value={form.medicationAllergies}
                  onChange={(e) => setForm({ ...form, medicationAllergies: e.target.value })}
                />
                <Input
                  label="Riwayat Alergi Makanan & Lingkungan (Pisahkan dengan koma)"
                  value={form.foodAllergies}
                  onChange={(e) => setForm({ ...form, foodAllergies: e.target.value })}
                />
                <Input
                  label="Riwayat Penyakit Kronis / Bawaan"
                  value={form.chronicConditions}
                  onChange={(e) => setForm({ ...form, chronicConditions: e.target.value })}
                />
              </div>
            ) : (
              <div className="space-y-3 text-xs">
                <div className="p-4 rounded-xl bg-rose-50/50 border border-rose-200/70 flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-rose-600 text-white font-black text-sm">
                    {medicalRecord.bloodType}
                  </div>
                  <div>
                    <h4 className="font-bold text-rose-950">Golongan Darah Pasien</h4>
                    <p className="text-rose-800 text-[11px] mt-0.5">
                      Tersinkronisasi ke laboratorium bank darah untuk kesiapan transfusi gawat darurat.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-amber-50/50 border border-amber-200/70 space-y-1">
                  <div className="flex items-center gap-1.5 font-bold text-amber-900">
                    <AlertTriangle className="w-4 h-4 text-amber-600" />
                    <span>Alergi Obat (Kritis untuk Resep Dokter):</span>
                  </div>
                  <p className="font-semibold text-gray-800 pl-5">
                    {form.medicationAllergies || 'Tidak ada riwayat alergi obat'}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-gray-50 border border-gray-100 space-y-1">
                  <span className="font-bold text-gray-700 block">Alergi Makanan & Lainnya:</span>
                  <p className="text-gray-800">{form.foodAllergies || 'Tidak ada riwayat alergi makanan'}</p>
                </div>

                <div className="p-4 rounded-xl bg-gray-50 border border-gray-100 space-y-1">
                  <span className="font-bold text-gray-700 block">Riwayat Penyakit Kronis:</span>
                  <p className="text-gray-800">{form.chronicConditions || 'Tidak ada catatan kondisi kronis'}</p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: KONTAK DARURAT */}
        {activeTab === 'emergency' && (
          <div className="space-y-4">
            <h3 className="font-bold text-base text-[var(--color-text-primary)] flex items-center gap-2 mb-4">
              <Phone className="w-4 h-4 text-[var(--color-primary)]" />
              Kontak Darurat (Emergency Contact)
            </h3>
            <p className="text-xs text-[var(--color-text-secondary)]">
              Pihak keluarga atau kerabat yang dapat segera dihubungi oleh petugas medis RS Bahagia Medika saat keadaan darurat.
            </p>

            {editing ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Input
                  label="Nama Kerabat / Kontak"
                  value={form.emergencyName}
                  onChange={(e) => setForm({ ...form, emergencyName: e.target.value })}
                />
                <Input
                  label="Hubungan Keluarga"
                  placeholder="Contoh: Istri, Suami, Orang Tua"
                  value={form.emergencyRelation}
                  onChange={(e) => setForm({ ...form, emergencyRelation: e.target.value })}
                />
                <Input
                  label="Nomor Telepon Kontak Darurat"
                  value={form.emergencyPhone}
                  onChange={(e) => setForm({ ...form, emergencyPhone: e.target.value })}
                />
              </div>
            ) : (
              <div className="p-4 rounded-xl bg-teal-50/40 border border-teal-200/70 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div>
                  <span className="text-gray-500 block mb-0.5">Nama Kontak:</span>
                  <span className="font-bold text-sm text-gray-900">{form.emergencyName}</span>
                </div>
                <div>
                  <span className="text-gray-500 block mb-0.5">Hubungan:</span>
                  <span className="font-semibold text-sm text-[var(--color-primary)]">{form.emergencyRelation}</span>
                </div>
                <div>
                  <span className="text-gray-500 block mb-0.5">Nomor Handphone:</span>
                  <span className="font-bold text-sm text-gray-900">{form.emergencyPhone}</span>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 4: ASURANSI & PENJAMIN */}
        {activeTab === 'insurance' && (
          <div className="space-y-4">
            <h3 className="font-bold text-base text-[var(--color-text-primary)] flex items-center gap-2 mb-4">
              <CreditCard className="w-4 h-4 text-[var(--color-primary)]" />
              Kepesertaan Asuransi & Penjamin Kesehatan
            </h3>

            {editing ? (
              <div className="space-y-4">
                <Input
                  label="Nama Asuransi / Program Penjamin"
                  value={form.insuranceProvider}
                  onChange={(e) => setForm({ ...form, insuranceProvider: e.target.value })}
                />
                <Input
                  label="Nomor Kartu BPJS / Polis Asuransi"
                  value={form.insuranceCardNumber}
                  onChange={(e) => setForm({ ...form, insuranceCardNumber: e.target.value })}
                />
                <Input
                  label="Kelas Rawat / Fasilitas"
                  value={form.insuranceClass}
                  onChange={(e) => setForm({ ...form, insuranceClass: e.target.value })}
                />
              </div>
            ) : (
              <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200/80 text-xs space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-emerald-950 uppercase">
                    {medicalRecord.insurance.type}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-600 text-white">
                    {medicalRecord.insurance.status}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-emerald-200/50">
                  <div>
                    <span className="text-gray-500 block">Penyedia Jaminan:</span>
                    <span className="font-bold text-gray-800">{form.insuranceProvider}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 block">Nomor Kartu / Polis:</span>
                    <span className="font-bold text-[var(--color-primary)]">{form.insuranceCardNumber}</span>
                  </div>
                  <div className="sm:col-span-2">
                    <span className="text-gray-500 block">Hak Kelas Rawat:</span>
                    <span className="font-medium text-gray-800">{form.insuranceClass}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
