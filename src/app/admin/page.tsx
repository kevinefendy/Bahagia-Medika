'use client';
import { Users, Calendar, Stethoscope, Clock } from 'lucide-react';
import { useAppointmentStore } from '@/lib/store/useAppointmentStore';

const stats = [
  { label: 'Total Pasien', value: '1,245', icon: Users, color: 'bg-[var(--color-primary-light)] text-[var(--color-primary)]' },
  { label: 'Appointment Hari Ini', value: '84', icon: Calendar, color: 'bg-[var(--color-success-light)] text-[var(--color-success)]' },
  { label: 'Dokter Aktif', value: '120', icon: Stethoscope, color: 'bg-[var(--color-secondary-light)] text-[var(--color-secondary)]' },
  { label: 'Appointment Pending', value: '15', icon: Clock, color: 'bg-[var(--color-warning-light)] text-[var(--color-warning)]' },
];

export default function AdminOverviewPage() {
  const appointments = useAppointmentStore((s) => s.appointments);

  return (
    <div>
      <h1 className="text-2xl font-bold text-[var(--color-text-primary)] mb-6">Dashboard Admin</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white rounded-xl border border-[var(--color-border)] p-4 shadow-2xs">
            <div className="flex items-center gap-3">
              <div className={`h-10 w-10 rounded-lg flex items-center justify-center shrink-0 ${stat.color}`}>
                <stat.icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-xs text-[var(--color-text-secondary)]">{stat.label}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-[var(--color-border)] p-4 sm:p-6 shadow-2xs">
        <h2 className="font-bold text-base text-[var(--color-text-primary)] mb-4">Appointment Terbaru</h2>
        <div className="overflow-x-auto -mx-4 sm:mx-0 px-4 sm:px-0">
          <table className="w-full text-sm min-w-[540px]">
            <thead className="bg-[var(--color-surface)]">
              <tr>
                <th className="px-4 py-2 text-left font-medium">ID</th>
                <th className="px-4 py-2 text-left font-medium">Pasien</th>
                <th className="px-4 py-2 text-left font-medium">Dokter</th>
                <th className="px-4 py-2 text-left font-medium">Tanggal</th>
                <th className="px-4 py-2 text-left font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {appointments.slice(0, 5).map(a => (
                <tr key={a.id} className="border-t border-[var(--color-border)]">
                  <td className="px-4 py-2 font-mono text-xs">{a.id}</td>
                  <td className="px-4 py-2">{a.patient.fullName}</td>
                  <td className="px-4 py-2">{a.doctorName}</td>
                  <td className="px-4 py-2">{a.date}</td>
                  <td className="px-4 py-2">
                    <span className={`px-2 py-0.5 rounded-full text-xs ${
                      a.status === 'Confirmed' ? 'bg-[var(--color-success-light)] text-[var(--color-success)]' :
                      a.status === 'Pending' ? 'bg-[var(--color-warning-light)] text-[var(--color-warning)]' :
                      a.status === 'Cancelled' ? 'bg-[var(--color-error-light)] text-[var(--color-error)]' :
                      'bg-[var(--color-primary-light)] text-[var(--color-primary)]'
                    }`}>{a.status}</span>
                  </td>
                </tr>
              ))}
              {appointments.length === 0 && (
                <tr><td colSpan={5} className="px-4 py-8 text-center text-[var(--color-text-secondary)]">Belum ada appointment</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
