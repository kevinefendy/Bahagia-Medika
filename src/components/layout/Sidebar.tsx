'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils/cn';
import {
  LayoutDashboard,
  Calendar,
  Clock,
  MessageCircle,
  Bell,
  User,
  LogOut,
  FileText,
  Pill,
  CreditCard,
  HeartPulse,
} from 'lucide-react';
import { useAuthStore } from '@/lib/store/useAuthStore';
import { useNotificationStore } from '@/lib/store/useNotificationStore';
import { usePatientRecordStore } from '@/lib/store/usePatientRecordStore';

const MENU_ITEMS = [
  { label: 'Overview', href: '/dashboard', icon: LayoutDashboard },
  { label: 'Appointment', href: '/dashboard/appointment', icon: Calendar },
  { label: 'Hasil Lab & Radiologi', href: '/dashboard/hasil-lab', icon: FileText },
  { label: 'Resep & Farmasi', href: '/dashboard/resep-obat', icon: Pill },
  { label: 'Riwayat Kunjungan', href: '/dashboard/riwayat', icon: Clock },
  { label: 'Chat Medika Care', href: '/dashboard/chat', icon: MessageCircle },
  { label: 'Notifikasi', href: '/dashboard/notification', icon: Bell, badge: true },
  { label: 'Profil & Rekam Medis', href: '/dashboard/profile', icon: User },
];

export default function Sidebar() {
  const pathname = usePathname();
  const logout = useAuthStore((s) => s.logout);
  const unreadCount = useNotificationStore((s) => s.unreadCount());
  const { medicalRecord } = usePatientRecordStore();

  return (
    <aside className="hidden md:flex w-56 lg:w-64 bg-white border-r border-[var(--color-border)] flex-col h-[calc(100vh-64px)] sticky top-16 shrink-0">
      <div className="flex-1 p-3 lg:p-4 overflow-y-auto">
        <ul className="space-y-1">
          {MENU_ITEMS.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== '/dashboard' && pathname.startsWith(item.href));
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    'flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-[var(--color-primary-light)] text-[var(--color-primary)] font-bold'
                      : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-surface)] hover:text-[var(--color-text-primary)]'
                  )}
                >
                  <div className="flex items-center gap-3">
                    <item.icon className={cn('h-5 w-5', isActive ? 'text-[var(--color-primary)]' : 'text-gray-400')} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && unreadCount > 0 && (
                    <span className="w-5 h-5 rounded-full bg-[var(--color-primary)] text-white text-[11px] font-bold flex items-center justify-center">
                      {unreadCount}
                    </span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Patient RM Mini Card */}
        <div className="mt-6 p-3.5 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] text-xs space-y-1.5">
          <div className="flex items-center gap-2 text-[var(--color-primary)] font-bold">
            <CreditCard className="w-4 h-4" />
            <span>CarePass Pasien</span>
          </div>
          <div className="flex justify-between items-center text-[11px]">
            <span className="text-gray-500">No. RM:</span>
            <span className="font-bold text-gray-800">{medicalRecord.rmNumber}</span>
          </div>
          <div className="flex justify-between items-center text-[11px]">
            <span className="text-gray-500">Gol. Darah:</span>
            <span className="font-bold text-gray-800">{medicalRecord.bloodType}</span>
          </div>
        </div>
      </div>

      <div className="p-4 border-t border-[var(--color-border)]">
        <button
          onClick={logout}
          className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-medium text-[var(--color-error)] hover:bg-[var(--color-error-light)] transition-colors"
        >
          <LogOut className="h-5 w-5" />
          Keluar
        </button>
      </div>
    </aside>
  );
}
