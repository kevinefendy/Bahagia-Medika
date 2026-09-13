'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Calendar,
  MessageCircle,
  Clock,
  Bell,
  FileText,
  Pill,
  HeartPulse,
  PhoneCall,
  ChevronRight,
  ArrowUpRight,
} from 'lucide-react';
import { useAuthStore } from '@/lib/store/useAuthStore';
import { useAppointmentStore } from '@/lib/store/useAppointmentStore';
import { useNotificationStore } from '@/lib/store/useNotificationStore';
import { usePatientRecordStore } from '@/lib/store/usePatientRecordStore';
import AppointmentCard from '@/components/cards/AppointmentCard';
import EmptyState from '@/components/ui/EmptyState';
import DigitalPatientCard from '@/components/dashboard/DigitalPatientCard';
import TodayQueueBanner from '@/components/dashboard/TodayQueueBanner';
import HealthVitalsBar from '@/components/dashboard/HealthVitalsBar';
import ActivePrescriptionsWidget from '@/components/dashboard/ActivePrescriptionsWidget';
import RecentLabResultsWidget from '@/components/dashboard/RecentLabResultsWidget';
import { formatDate } from '@/lib/utils/format';

export default function DashboardOverviewPage() {
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  const appointments = useAppointmentStore((s) => s.appointments);
  const { notifications, markAsRead } = useNotificationStore();
  const { medicalRecord } = usePatientRecordStore();

  const patientId = user?.id || 'usr-patient-001';

  const upcomingAppointments = appointments
    .filter(
      (a) =>
        (a.patientId === patientId || a.patientId === user?.id) &&
        (a.status === 'Confirmed' || a.status === 'Pending') &&
        // eslint-disable-next-line react-hooks/purity
        new Date(a.date) >= new Date(Date.now() - 86400000)
    )
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const latestNotifications = notifications.slice(0, 3);

  const quickActions = [
    {
      label: 'Buat Janji Dokter',
      desc: 'Pilih spesialis & jadwal',
      href: '/buat-janji',
      icon: Calendar,
      color: 'text-teal-700 bg-teal-50 hover:bg-teal-100/80',
    },
    {
      label: 'Hasil Lab & Radiologi',
      desc: 'Unduh rekam resmi',
      href: '/dashboard/hasil-lab',
      icon: FileText,
      color: 'text-cyan-700 bg-cyan-50 hover:bg-cyan-100/80',
    },
    {
      label: 'Resep & Farmasi',
      desc: 'Pelacak obat 24 jam',
      href: '/dashboard/resep-obat',
      icon: Pill,
      color: 'text-amber-700 bg-amber-50 hover:bg-amber-100/80',
    },
    {
      label: 'Konsultasi Medika Care',
      desc: 'Tanya dokter & AI',
      href: '/dashboard/chat',
      icon: MessageCircle,
      color: 'text-indigo-700 bg-indigo-50 hover:bg-indigo-100/80',
    },
    {
      label: 'Riwayat Kunjungan',
      desc: 'Histori diagnosis',
      href: '/dashboard/riwayat',
      icon: Clock,
      color: 'text-blue-700 bg-blue-50 hover:bg-blue-100/80',
    },
    {
      label: 'Kamar Rawat Inap',
      desc: 'Ketersediaan tempat tidur',
      href: '/ketersediaan-kamar',
      icon: HeartPulse,
      color: 'text-rose-700 bg-rose-50 hover:bg-rose-100/80',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Executive Welcome Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-[var(--color-border)] shadow-xs">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-primary)] bg-[var(--color-primary-light)] px-2.5 py-0.5 rounded-full">
              Portal Pasien MyMedika
            </span>
            <span className="text-xs text-[var(--color-text-secondary)]">
              &bull; {formatDate(new Date().toISOString())}
            </span>
          </div>
          <h1 className="text-2xl font-black text-[var(--color-text-primary)] tracking-tight">
            Selamat Datang, {user?.name || 'Kevin Santoso'}
          </h1>
          <p className="text-xs text-[var(--color-text-secondary)] mt-0.5">
            No. Rekam Medis: <strong className="text-gray-900">{medicalRecord.rmNumber}</strong> &bull; Faskes Utama: <strong className="text-gray-900">RS Bahagia Medika Jakarta</strong>
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Link
            href="/buat-janji"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] shadow-sm transition-all"
          >
            <Calendar className="w-4 h-4" />
            <span>Buat Janji Baru</span>
          </Link>
          <a
            href="tel:02178909999"
            className="inline-flex items-center gap-1.5 px-3 py-2.5 rounded-xl text-xs font-bold text-rose-700 bg-rose-50 hover:bg-rose-100 transition-all border border-rose-200"
          >
            <PhoneCall className="w-4 h-4 text-rose-600" />
            <span>IGD 24 Jam: (021) 7890-9999</span>
          </a>
        </div>
      </div>

      {/* Live Queue Banner for Today's Active Appointment */}
      <TodayQueueBanner />

      {/* Row 1: Digital Patient Card + Vitals Bar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        <div className="lg:col-span-5 flex flex-col">
          <DigitalPatientCard />
        </div>
        <div className="lg:col-span-7 flex flex-col justify-between">
          <HealthVitalsBar />
        </div>
      </div>

      {/* Quick Action Navigation Grid */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-bold text-base text-[var(--color-text-primary)]">
            Akses Layanan Cepat
          </h2>
          <span className="text-xs text-[var(--color-text-secondary)]">Pintasan fitur rawat jalan</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {quickActions.map((action) => (
            <Link
              key={action.label}
              href={action.href}
              className={`p-4 rounded-xl border border-gray-100 flex flex-col justify-between transition-all hover:shadow-xs hover:-translate-y-0.5 group ${action.color}`}
            >
              <div className="flex items-center justify-between mb-3">
                <action.icon className="w-6 h-6" />
                <ArrowUpRight className="w-3.5 h-3.5 opacity-40 group-hover:opacity-100 transition-opacity" />
              </div>
              <div>
                <p className="font-bold text-xs text-[var(--color-text-primary)] leading-tight">
                  {action.label}
                </p>
                <p className="text-[10px] text-[var(--color-text-secondary)] mt-0.5 line-clamp-1">
                  {action.desc}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Clinical Row: Upcoming Appointment + Active Prescriptions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Upcoming Appointment + Recent Lab Results */}
        <div className="lg:col-span-7 space-y-6">
          {/* Upcoming Appointment Section */}
          <div className="bg-white rounded-2xl border border-[var(--color-border)] p-5 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-teal-50 text-[var(--color-primary)]">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-[var(--color-text-primary)]">
                    Jadwal Konsultasi Mendatang
                  </h3>
                  <p className="text-xs text-[var(--color-text-secondary)]">
                    Janji temu dokter yang telah dikonfirmasi
                  </p>
                </div>
              </div>

              <Link
                href="/dashboard/appointment"
                className="text-xs font-bold text-[var(--color-primary)] hover:underline inline-flex items-center gap-0.5"
              >
                Lihat Semua <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {upcomingAppointments.length > 0 ? (
              <div className="space-y-3">
                <AppointmentCard appointment={upcomingAppointments[0]} />
                {upcomingAppointments.length > 1 && (
                  <p className="text-xs text-[var(--color-text-secondary)] text-center pt-2">
                    Masih ada {upcomingAppointments.length - 1} janji temu lainnya di menu{' '}
                    <Link href="/dashboard/appointment" className="font-semibold text-[var(--color-primary)] hover:underline">
                      Appointment
                    </Link>
                  </p>
                )}
              </div>
            ) : (
              <EmptyState
                title="Belum ada konsultasi mendatang"
                description="Buat janji temu dengan dokter spesialis kami dengan mudah"
                ctaLabel="Pilih Dokter & Jadwal"
                onCtaClick={() => router.push('/buat-janji')}
              />
            )}
          </div>

          {/* Recent Lab Results */}
          <RecentLabResultsWidget />
        </div>

        {/* Right Column: Active Prescriptions + Notifications */}
        <div className="lg:col-span-5 space-y-6">
          {/* Active Prescriptions Widget */}
          <ActivePrescriptionsWidget />

          {/* Latest Notifications Box */}
          <div className="bg-white rounded-2xl border border-[var(--color-border)] p-5 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-indigo-50 text-indigo-700">
                  <Bell className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-[var(--color-text-primary)]">
                    Notifikasi & Informasi
                  </h3>
                  <p className="text-xs text-[var(--color-text-secondary)]">
                    Pemberitahuan terkini terkait layanan Anda
                  </p>
                </div>
              </div>

              <Link
                href="/dashboard/notification"
                className="text-xs font-bold text-[var(--color-primary)] hover:underline inline-flex items-center gap-0.5"
              >
                Semua <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {latestNotifications.length > 0 ? (
              <div className="space-y-2.5">
                {latestNotifications.map((n) => (
                  <div
                    key={n.id}
                    onClick={() => markAsRead(n.id)}
                    className={`p-3 rounded-xl border transition-all cursor-pointer ${
                      n.isRead
                        ? 'bg-white border-gray-100 hover:bg-gray-50'
                        : 'bg-teal-50/50 border-teal-200'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-xs font-bold text-[var(--color-text-primary)]">
                        {n.title}
                      </p>
                      {!n.isRead && (
                        <span className="w-2 h-2 rounded-full bg-[var(--color-primary)] shrink-0 mt-1" />
                      )}
                    </div>
                    <p className="text-[11px] text-[var(--color-text-secondary)] mt-1 line-clamp-2">
                      {n.message}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-[var(--color-text-secondary)] text-center py-6">
                Belum ada notifikasi baru.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
