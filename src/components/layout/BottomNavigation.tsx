'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils/cn';
import { Home, Calendar, FileText, Pill, User } from 'lucide-react';

const NAV_ITEMS = [
  { label: 'Beranda', href: '/dashboard', icon: Home },
  { label: 'Janji', href: '/dashboard/appointment', icon: Calendar },
  { label: 'Hasil Lab', href: '/dashboard/hasil-lab', icon: FileText },
  { label: 'Resep', href: '/dashboard/resep-obat', icon: Pill },
  { label: 'Profil', href: '/dashboard/profile', icon: User },
];

export default function BottomNavigation() {
  const pathname = usePathname();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-[var(--color-border)] z-40 safe-area-bottom shadow-lg">
      <div className="flex items-center justify-around py-1.5 px-2">
        {NAV_ITEMS.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== '/dashboard' && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex flex-col items-center gap-0.5 px-2.5 py-1.5 rounded-xl transition-colors min-w-[52px]',
                isActive
                  ? 'text-[var(--color-primary)] font-bold'
                  : 'text-[var(--color-text-secondary)] active:bg-[var(--color-surface)]'
              )}
            >
              <div className="relative">
                <item.icon className={cn('h-5 w-5', isActive && 'stroke-[2.5]')} />
                {isActive && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 h-1 w-1 rounded-full bg-[var(--color-primary)]" />
                )}
              </div>
              <span className={cn('text-[10px] mt-0.5', isActive ? 'font-bold' : 'font-medium')}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
