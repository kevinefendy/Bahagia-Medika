'use client';
import { useState } from 'react';
import { useAppointmentStore } from '@/lib/store/useAppointmentStore';
import Badge from '@/components/ui/Badge';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import { formatDate } from '@/lib/utils/format';
import type { AppointmentStatus } from '@/types/appointment';

const statusVariant: Record<string, 'success' | 'warning' | 'error' | 'info'> = {
  Confirmed: 'success', Pending: 'warning', Completed: 'info', Cancelled: 'error',
};

export default function AdminAppointmentPage() {
  const { appointments, updateStatus } = useAppointmentStore();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const filtered = appointments.filter(a => {
    const matchSearch = a.patient.fullName.toLowerCase().includes(search.toLowerCase()) || a.id.toLowerCase().includes(search.toLowerCase());
    const matchStatus = !statusFilter || a.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div>
      <h1 className="text-2xl font-bold text-[var(--color-text-primary)] mb-6">Kelola Appointment</h1>
      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <div className="flex-1">
          <Input placeholder="Cari nama pasien atau ID..." value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <div className="w-full sm:w-56">
          <Select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            options={[
              { value: '', label: 'Semua Status' },
              { value: 'Pending', label: 'Pending' },
              { value: 'Confirmed', label: 'Confirmed' },
              { value: 'Completed', label: 'Completed' },
              { value: 'Cancelled', label: 'Cancelled' },
            ]}
          />
        </div>
      </div>
      <div className="bg-white rounded-xl border border-[var(--color-border)] overflow-hidden shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[700px]">
            <thead className="bg-[var(--color-surface)]">
              <tr>
                <th className="px-4 py-3 text-left font-medium">ID</th>
                <th className="px-4 py-3 text-left font-medium">Pasien</th>
                <th className="px-4 py-3 text-left font-medium">Dokter</th>
                <th className="px-4 py-3 text-left font-medium">Layanan</th>
                <th className="px-4 py-3 text-left font-medium">Tanggal</th>
                <th className="px-4 py-3 text-left font-medium">Status</th>
                <th className="px-4 py-3 text-left font-medium">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(a => (
                <tr key={a.id} className="border-t border-[var(--color-border)]">
                  <td className="px-4 py-3 font-medium text-xs">{a.id}</td>
                  <td className="px-4 py-3">{a.patient.fullName}</td>
                  <td className="px-4 py-3">{a.doctorName}</td>
                  <td className="px-4 py-3">{a.serviceName}</td>
                  <td className="px-4 py-3">{formatDate(a.date)} · {a.time}</td>
                  <td className="px-4 py-3"><Badge variant={statusVariant[a.status]} label={a.status} /></td>
                  <td className="px-4 py-3">
                    <select
                      value={a.status}
                      onChange={(e) => updateStatus(a.id, e.target.value as AppointmentStatus)}
                      className="text-xs border border-[var(--color-border)] rounded px-2 py-1"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Confirmed">Confirmed</option>
                      <option value="Completed">Completed</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={7} className="px-4 py-8 text-center text-[var(--color-text-secondary)]">Tidak ada appointment</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
