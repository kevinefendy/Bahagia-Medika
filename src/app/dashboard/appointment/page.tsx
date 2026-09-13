'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Calendar, Plus } from 'lucide-react';
import { useAuthStore } from '@/lib/store/useAuthStore';
import { useAppointmentStore } from '@/lib/store/useAppointmentStore';
import Tabs from '@/components/ui/Tabs';
import AppointmentCard from '@/components/cards/AppointmentCard';
import EmptyState from '@/components/ui/EmptyState';

const TABS = [
  { id: 'upcoming', label: 'Upcoming' },
  { id: 'history', label: 'History' },
  { id: 'cancelled', label: 'Cancelled' },
];

export default function AppointmentPage() {
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  const appointments = useAppointmentStore((s) => s.appointments);
  const [activeTab, setActiveTab] = useState('upcoming');

  const filtered = appointments.filter(a => {
    if (a.patientId !== user?.id) return false;
    if (activeTab === 'upcoming') return (a.status === 'Confirmed' || a.status === 'Pending') && new Date(a.date) >= new Date();
    if (activeTab === 'history') return a.status === 'Completed';
    if (activeTab === 'cancelled') return a.status === 'Cancelled';
    return false;
  });

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
        <div>
          <h1 className="text-2xl font-black text-[var(--color-text-primary)]">Jadwal Janji Temu Dokter</h1>
          <p className="text-xs text-[var(--color-text-secondary)] mt-0.5">Pantau status antrean dan konfirmasi jadwal konsultasi Anda.</p>
        </div>
        <Link
          href="/buat-janji"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[var(--color-primary)] text-white text-xs sm:text-sm font-bold shadow-sm hover:bg-[var(--color-primary-dark)] transition-colors self-start sm:self-auto"
        >
          <Calendar className="w-4 h-4" />
          <span>Buat Janji Baru</span>
        </Link>
      </div>
      <Tabs tabs={TABS} activeTab={activeTab} onChange={setActiveTab} />
      <div className="mt-4 space-y-3">
        {filtered.length === 0 ? (
          <EmptyState
            title={`Belum ada appointment ${activeTab === 'upcoming' ? 'mendatang' : activeTab}`}
            description={activeTab === 'upcoming' ? 'Buat janji temu sekarang' : undefined}
            ctaLabel={activeTab === 'upcoming' ? 'Buat Janji' : undefined}
            onCtaClick={activeTab === 'upcoming' ? () => router.push('/buat-janji') : undefined}
          />
        ) : (
          filtered.map(a => <AppointmentCard key={a.id} appointment={a} />)
        )}
      </div>
    </div>
  );
}
