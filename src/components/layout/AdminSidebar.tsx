'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils/cn';
import {
  LayoutDashboard, Users, Calendar, Stethoscope, MessageCircle,
  FileText, Newspaper, Building2, Settings, Clock, X, Shield
} from 'lucide-react';
import Image from 'next/image';

const MENU_ITEMS = [
  { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { label: 'Dokter', href: '/admin/dokter', icon: Stethoscope },
  { label: 'Jadwal', href: '/admin/jadwal', icon: Clock },
  { label: 'Layanan', href: '/admin/layanan', icon: Building2 },
  { label: 'Appointment', href: '/admin/appointment', icon: Calendar },
  { label: 'Pasien', href: '/admin/pasien', icon: Users },
  { label: 'Chat', href: '/admin/chat', icon: MessageCircle },
  { label: 'Artikel', href: '/admin/artikel', icon: FileText },
  { label: 'Berita', href: '/admin/berita', icon: Newspaper },
  { label: 'Settings', href: '/admin/settings', icon: Settings },
];

interface AdminSidebarProps {
  isMobileOpen?: boolean;
  onCloseMobile?: () => void;
}

export default function AdminSidebar({ isMobileOpen = false, onCloseMobile }: AdminSidebarProps) {
  const pathname = usePathname();

  const renderNavList = () => (
    <ul className="space-y-1">
      {MENU_ITEMS.map((item) => {
        const isActive = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href));
        return (
          <li key={item.href}>
            <Link
              href={item.href}
              onClick={onCloseMobile}
              className={cn(
                'flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors',
                isActive
                  ? 'bg-white/15 text-white font-bold shadow-2xs'
                  : 'text-gray-300 hover:bg-white/10 hover:text-white'
              )}
            >
              <item.icon className={cn('h-5 w-5', isActive ? 'text-teal-300' : 'text-gray-400')} />
              <span>{item.label}</span>
            </Link>
          </li>
        );
      })}
    </ul>
  );

  return (
    <>
      {/* Desktop Sticky Sidebar */}
      <aside className="hidden md:flex w-60 lg:w-64 bg-[#18313D] text-white flex-col h-screen sticky top-0 shrink-0 border-r border-white/10 z-20">
        <div className="p-4 border-b border-white/10 flex items-center gap-3">
          <Image
            src="/logo-bahagia-medika.png"
            alt="Bahagia Medika Admin"
            width={32}
            height={32}
            className="shrink-0 object-contain"
          />
          <div>
            <span className="font-bold text-sm tracking-tight text-white block">Bahagia Medika</span>
            <span className="text-[10px] text-teal-300 uppercase tracking-widest font-semibold block">Admin Panel</span>
          </div>
        </div>

        <div className="flex-1 p-3 overflow-y-auto">
          {renderNavList()}
        </div>

        <div className="p-3 border-t border-white/10 text-[11px] text-gray-400 text-center">
          Portal Internal Medis &bull; v2.0
        </div>
      </aside>

      {/* Mobile / Tablet Drawer */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity duration-300"
            onClick={onCloseMobile}
            aria-hidden="true"
          />

          {/* Drawer content */}
          <div className="fixed inset-y-0 left-0 w-72 max-w-[85vw] bg-[#18313D] text-white shadow-2xl flex flex-col z-50 animate-in slide-in-from-left duration-200">
            {/* Drawer Header */}
            <div className="p-4 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Image
                  src="/logo-bahagia-medika.png"
                  alt="Bahagia Medika Admin"
                  width={30}
                  height={30}
                  className="shrink-0 object-contain"
                />
                <div>
                  <span className="font-bold text-sm text-white block leading-tight">Bahagia Medika</span>
                  <span className="text-[10px] text-teal-300 font-semibold uppercase tracking-wider">Admin Panel</span>
                </div>
              </div>
              <button
                type="button"
                onClick={onCloseMobile}
                className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Tutup menu navigasi"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Nav list */}
            <div className="flex-1 p-3 overflow-y-auto">
              {renderNavList()}
            </div>

            {/* Drawer Footer */}
            <div className="p-4 border-t border-white/10 bg-black/20 text-xs flex items-center justify-between text-gray-400">
              <span className="flex items-center gap-1.5 text-teal-300">
                <Shield className="w-3.5 h-3.5" />
                <span>Otoritas Medis</span>
              </span>
              <span>RS Bahagia Medika</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
