'use client';
import { useAuthStore } from '@/lib/store/useAuthStore';
import { LogOut, Menu } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface AdminTopbarProps {
  onToggleMobile?: () => void;
}

export default function AdminTopbar({ onToggleMobile }: AdminTopbarProps) {
  const { user, logout } = useAuthStore();

  return (
    <header className="h-16 bg-white border-b border-[var(--color-border)] flex items-center justify-between px-4 sm:px-6 sticky top-0 z-30">
      <div className="flex items-center gap-3">
        {/* Mobile hamburger toggle */}
        <button
          type="button"
          onClick={onToggleMobile}
          className="md:hidden p-2 rounded-xl text-gray-700 hover:bg-gray-100 transition-colors"
          aria-label="Buka menu navigasi admin"
        >
          <Menu className="h-5 w-5" />
        </button>

        <Link href="/admin" className="flex items-center gap-2.5 shrink-0" aria-label="Bahagia Medika Admin">
          <Image
            src="/logo-bahagia-medika.png"
            alt="Bahagia Medika"
            width={34}
            height={34}
            className="shrink-0 object-contain"
            style={{ width: 34, height: 34 }}
          />
          <span className="font-bold text-base sm:text-lg text-[var(--color-text-primary)]">
            Bahagia Medika <span className="text-[var(--color-text-secondary)] font-normal text-xs sm:text-sm">Admin</span>
          </span>
        </Link>
      </div>

      <div className="flex items-center gap-3 sm:gap-4">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-[var(--color-primary)] flex items-center justify-center shrink-0">
            <span className="text-white text-xs font-semibold">{user?.name?.charAt(0) || 'A'}</span>
          </div>
          <span className="text-xs sm:text-sm font-medium hidden sm:block truncate max-w-[140px]">{user?.name}</span>
        </div>
        <button
          onClick={logout}
          title="Keluar dari Admin"
          className="p-2 rounded-xl text-[var(--color-text-secondary)] hover:bg-[var(--color-surface)] hover:text-[var(--color-error)] transition-colors"
        >
          <LogOut className="h-5 w-5" />
        </button>
      </div>
    </header>
  );
}
