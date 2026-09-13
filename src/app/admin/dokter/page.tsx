'use client';
import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2 } from 'lucide-react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Modal from '@/components/ui/Modal';
import { useUIStore } from '@/lib/store/useUIStore';
import { doctorService } from '@/lib/services/doctorService';
import { specializationService } from '@/lib/services/specializationService';
import type { Doctor, Specialization } from '@/types/doctor';

export default function AdminDokterPage() {
  const addToast = useUIStore((s) => s.addToast);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [specializations, setSpecializations] = useState<Specialization[]>([]);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editDoctor, setEditDoctor] = useState<Doctor | null>(null);
  const [form, setForm] = useState({ name: '', specializationId: '', experienceYears: 3, location: 'Gedung Utama Lt.2', bio: '' });

  useEffect(() => {
    doctorService.getAll().then(setDoctors);
    specializationService.getAll().then(setSpecializations);
  }, []);

  const filtered = doctors.filter(d => d.name.toLowerCase().includes(search.toLowerCase()));

  const handleSubmit = () => {
    if (editDoctor) {
      setDoctors(prev => prev.map(d => d.id === editDoctor.id ? { ...d, ...form, specializationName: specializations.find(s => s.id === form.specializationId)?.name || d.specializationName } : d));
      addToast({ type: 'success', message: 'Data dokter berhasil diperbarui.' });
    } else {
      const newDoc: Doctor = {
        id: `doc-${Date.now()}`,
        slug: form.name.toLowerCase().replace(/\s+/g, '-'),
        ...form,
        specializationName: specializations.find(s => s.id === form.specializationId)?.name || '',
        photoUrl: '',
        education: [],
        languages: ['Bahasa Indonesia'],
        isActive: true,
        schedules: [],
        relatedServiceIds: [],
      };
      setDoctors(prev => [...prev, newDoc]);
      addToast({ type: 'success', message: 'Dokter berhasil ditambahkan.' });
    }
    setShowModal(false);
    setEditDoctor(null);
    setForm({ name: '', specializationId: '', experienceYears: 3, location: 'Gedung Utama Lt.2', bio: '' });
  };

  const handleDelete = (id: string) => {
    if (confirm('Hapus data dokter ini?')) {
      setDoctors(prev => prev.filter(d => d.id !== id));
      addToast({ type: 'success', message: 'Dokter berhasil dihapus.' });
    }
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <h1 className="text-2xl font-bold text-[var(--color-text-primary)]">Kelola Dokter</h1>
        <Button onClick={() => { setEditDoctor(null); setForm({ name: '', specializationId: '', experienceYears: 3, location: 'Gedung Utama Lt.2', bio: '' }); setShowModal(true); }}>
          <Plus className="h-4 w-4" /> Tambah Dokter
        </Button>
      </div>

      <div className="mb-4">
        <Input placeholder="Cari nama dokter..." value={search} onChange={(e) => setSearch(e.target.value)} />
      </div>

      <div className="bg-white rounded-xl border border-[var(--color-border)] overflow-hidden shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[650px]">
            <thead className="bg-[var(--color-surface)]">
              <tr>
                <th className="px-4 py-3 text-left font-medium">Nama</th>
                <th className="px-4 py-3 text-left font-medium">Spesialisasi</th>
                <th className="px-4 py-3 text-left font-medium">Pengalaman</th>
                <th className="px-4 py-3 text-left font-medium">Lokasi</th>
                <th className="px-4 py-3 text-left font-medium">Status</th>
                <th className="px-4 py-3 text-left font-medium">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(doc => (
                <tr key={doc.id} className="border-t border-[var(--color-border)]">
                  <td className="px-4 py-3 font-medium">{doc.name}</td>
                  <td className="px-4 py-3">{doc.specializationName}</td>
                  <td className="px-4 py-3">{doc.experienceYears} tahun</td>
                  <td className="px-4 py-3">{doc.location}</td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-0.5 rounded-full text-xs bg-[var(--color-success-light)] text-[var(--color-success)]">
                      Aktif
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <button onClick={() => { setEditDoctor(doc); setForm({ name: doc.name, specializationId: doc.specializationId, experienceYears: doc.experienceYears, location: doc.location, bio: doc.bio }); setShowModal(true); }} className="p-1.5 hover:bg-[var(--color-surface)] rounded-lg"><Edit className="h-4 w-4" /></button>
                      <button onClick={() => handleDelete(doc.id)} className="p-1.5 hover:bg-[var(--color-error-light)] rounded-lg text-[var(--color-error)]"><Trash2 className="h-4 w-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title={editDoctor ? 'Edit Dokter' : 'Tambah Dokter'} size="lg">
        <div className="space-y-4">
          <Input label="Nama Dokter" placeholder="Dr. Nama Dokter, Sp.X" value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} />
          <Select label="Spesialisasi" value={form.specializationId} onChange={(e) => setForm({...form, specializationId: e.target.value})} options={specializations.map(s => ({ value: s.id, label: s.name }))} placeholder="Pilih spesialisasi" />
          <Input label="Pengalaman (tahun)" type="number" value={form.experienceYears} onChange={(e) => setForm({...form, experienceYears: Number(e.target.value)})} />
          <Input label="Lokasi" value={form.location} onChange={(e) => setForm({...form, location: e.target.value})} />
          <Input label="Bio" value={form.bio} onChange={(e) => setForm({...form, bio: e.target.value})} />
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setShowModal(false)}>Batal</Button>
            <Button onClick={handleSubmit}>{editDoctor ? 'Simpan' : 'Tambah'}</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
