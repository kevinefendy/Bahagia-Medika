'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils/cn';
import { useAuthStore } from '@/lib/store/useAuthStore';
import {
  Menu,
  X,
  ChevronDown,
  LogOut,
  LayoutDashboard,
  Shield,
  Phone,
  Calendar,
  MessageCircle,
} from 'lucide-react';
import Button from '@/components/ui/Button';
import Logo from '@/components/ui/Logo';

// Navigation structure inspired by stwasir.com (Tentang Kami, Profil Dokter, Layanan, Fasilitas, Artikel, Kontak + Daftar Online CTA)
const NAV_ITEMS = [
  { label: 'Tentang Kami', href: '/tentang' },
  { label: 'Profil Dokter', href: '/dokter' },
  {
    label: 'Layanan',
    href: '/layanan',
    children: [
      { label: 'Seluruh Layanan Medis', href: '/layanan', desc: 'Daftar poliklinik dan unit penunjang' },
      { label: 'Estimasi Biaya Tindakan', href: '/estimasi-biaya', desc: 'Kalkulator perkiraan biaya transparan' },
      { label: 'Ketersediaan Kamar Rawat', href: '/ketersediaan-kamar', desc: 'Status tempat tidur terintegrasi' },
      { label: 'Jadwal Dokter Spesialis', href: '/jadwal', desc: 'Informasi hari dan jam praktik dokter' },
    ],
  },
  { label: 'Fasilitas', href: '/fasilitas' },
  { label: 'Artikel', href: '/artikel' },
  { label: 'Kontak', href: '/kontak' },
];

export default function Navbar() {
  const pathname = usePathname();
  const { user, isAuthenticated, logout } = useAuthStore();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 15);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMobileOpen(false);
    setIsMobileServicesOpen(false);
    setOpenDropdown(null);
  }, [pathname]);

  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileOpen]);

  return (
    <>
      <nav
        className={cn(
          'sticky top-0 z-40 bg-white/95 backdrop-blur-md transition-all duration-300 border-b',
          isScrolled ? 'border-slate-200 shadow-sm py-0' : 'border-slate-100 py-1'
        )}
      >
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-18">
          {/* 1. Left: Hospital Logo */}
          <div className="flex items-center gap-3">
            <Logo size="md" priority href="/" />
          </div>

          {/* 2. Center: Navigation Links (Modeled after stwasir.com) */}
          <div className="hidden lg:flex items-center gap-1 xl:gap-2">
            {NAV_ITEMS.map((item) => {
              const isCurrent =
                item.href === '/'
                  ? pathname === '/'
                  : pathname === item.href || pathname.startsWith(`${item.href}/`);

              return item.children ? (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => setOpenDropdown(item.label)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <button
                    type="button"
                    className={cn(
                      'flex items-center gap-1.5 px-3.5 py-2 text-sm font-semibold rounded-xl transition-all cursor-pointer',
                      isCurrent
                        ? 'text-[var(--color-primary)] font-bold bg-[var(--color-primary-light)]/60'
                        : 'text-slate-700 hover:text-[var(--color-primary)] hover:bg-slate-50'
                    )}
                  >
                    <span>{item.label}</span>
                    <ChevronDown
                      className={cn(
                        'h-3.5 w-3.5 transition-transform duration-200',
                        openDropdown === item.label && 'rotate-180'
                      )}
                    />
                  </button>

                  {/* Dropdown Menu */}
                  {openDropdown === item.label && (
                    <div className="absolute top-full left-0 mt-1 w-64 bg-white border border-slate-200/90 rounded-2xl shadow-xl py-2 z-50 animate-scale-in">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className={cn(
                            'block px-4 py-2.5 mx-1.5 rounded-xl transition-colors',
                            pathname === child.href
                              ? 'bg-[var(--color-primary-light)] text-[var(--color-primary)] font-bold'
                              : 'text-slate-700 hover:bg-slate-50 hover:text-[var(--color-primary)]'
                          )}
                        >
                          <p className="text-sm font-semibold leading-snug">{child.label}</p>
                          {child.desc && (
                            <p className="text-[11px] text-slate-500 mt-0.5">{child.desc}</p>
                          )}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'px-3.5 py-2 text-sm font-semibold rounded-xl transition-all relative',
                    isCurrent
                      ? 'text-[var(--color-primary)] font-bold bg-[var(--color-primary-light)]/60'
                      : 'text-slate-700 hover:text-[var(--color-primary)] hover:bg-slate-50'
                  )}
                >
                  {item.label}
                  {isCurrent && (
                    <span className="absolute bottom-1 left-3.5 right-3.5 h-0.5 bg-[var(--color-primary)] rounded-full" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* 3. Right: "Daftar Online" CTA Button + Patient Portal/Login */}
          <div className="flex items-center gap-2.5">
            {/* Prominent "Daftar Online" Button (like stwasir.com) */}
            <Link
              href={isAuthenticated ? '/buat-janji' : '/login?required=buat-janji'}
              className="hidden sm:inline-flex"
            >
              <button
                type="button"
                className="px-4 py-2.5 rounded-xl bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-xs hover:shadow-md transition-all cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                <span>Daftar Online</span>
              </button>
            </Link>

            {/* Authenticated User Menu or Guest Login */}
            {isAuthenticated ? (
              <div className="relative group">
                <button
                  type="button"
                  className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  <div className="relative">
                    <div className="h-9 w-9 rounded-full bg-[var(--color-primary)] flex items-center justify-center shadow-xs">
                      <span className="text-white text-xs font-bold">
                        {user?.name
                          ?.split(' ')
                          .map((n) => n[0])
                          .join('')
                          .slice(0, 2)
                          .toUpperCase()}
                      </span>
                    </div>
                    <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white" />
                  </div>
                  <ChevronDown className="h-4 w-4 text-slate-500 hidden md:block" />
                </button>

                <div className="absolute right-0 top-full mt-2 w-64 bg-white border border-slate-200 rounded-2xl shadow-xl py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                  <div className="px-4 py-3 border-b border-slate-100">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-bold text-slate-900 truncate">{user?.name}</p>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700">
                        {user?.role === 'admin' ? 'Admin' : 'Pasien'}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 truncate mt-0.5">{user?.email}</p>
                  </div>

                  {user?.role === 'patient' && (
                    <>
                      <Link
                        href="/buat-janji"
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 hover:text-[var(--color-primary)] transition-colors"
                      >
                        <Calendar className="h-4 w-4 text-teal-700" />
                        <span>Daftar / Buat Janji</span>
                      </Link>
                      <Link
                        href="/dashboard"
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 hover:text-[var(--color-primary)] transition-colors"
                      >
                        <LayoutDashboard className="h-4 w-4 text-teal-700" />
                        <span>Portal Dashboard Pasien</span>
                      </Link>
                    </>
                  )}

                  {user?.role === 'admin' && (
                    <Link
                      href="/admin"
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 hover:text-[var(--color-primary)] transition-colors"
                    >
                      <Shield className="h-4 w-4 text-teal-700" />
                      <span>Panel Administrasi</span>
                    </Link>
                  )}

                  <div className="border-t border-slate-100 mt-1 pt-1">
                    <button
                      type="button"
                      onClick={logout}
                      className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Keluar</span>
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <Link href="/login" className="hidden sm:inline-flex">
                <Button variant="outline" size="sm" className="font-semibold rounded-xl text-xs sm:text-sm">
                  Masuk
                </Button>
              </Link>
            )}

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setIsMobileOpen(true)}
              className="lg:hidden p-2 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
              aria-label="Buka menu navigasi"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </nav>

      {/* 4. Mobile Off-Canvas Drawer (Inspired by stwasir.com mobile drawer) */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop overlay */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-xs animate-fade-in"
            onClick={() => setIsMobileOpen(false)}
          />

          {/* Drawer container */}
          <div className="absolute right-0 top-0 h-full w-80 max-w-[85vw] bg-white shadow-2xl flex flex-col animate-slide-in-right">
            {/* Drawer Header with Logo & Close Button */}
            <div className="flex items-center justify-between p-4 border-b border-slate-200">
              <Logo size="sm" href="/" />
              <button
                type="button"
                onClick={() => setIsMobileOpen(false)}
                className="w-9 h-9 rounded-xl flex items-center justify-center text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
                aria-label="Tutup menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Drawer Body Links */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {/* Primary Mobile CTA: Daftar Online */}
              <Link
                href={isAuthenticated ? '/buat-janji' : '/login?required=buat-janji'}
                className="block w-full"
              >
                <button
                  type="button"
                  className="w-full py-3 px-4 rounded-xl bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-sm transition-colors cursor-pointer"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Daftar Online</span>
                </button>
              </Link>

              {/* Navigation Items */}
              <div className="space-y-1 pt-1">
                {NAV_ITEMS.map((item) => {
                  const isCurrent =
                    item.href === '/'
                      ? pathname === '/'
                      : pathname === item.href || pathname.startsWith(`${item.href}/`);

                  return item.children ? (
                    <div key={item.label} className="border-b border-slate-100 pb-1 mb-1">
                      <button
                        type="button"
                        onClick={() => setIsMobileServicesOpen(!isMobileServicesOpen)}
                        className="w-full flex items-center justify-between px-3 py-2.5 text-sm font-bold text-slate-800 rounded-xl hover:bg-slate-50 transition-colors"
                      >
                        <span>{item.label}</span>
                        <ChevronDown
                          className={cn(
                            'h-4 w-4 text-slate-400 transition-transform duration-200',
                            isMobileServicesOpen && 'rotate-180'
                          )}
                        />
                      </button>

                      {isMobileServicesOpen && (
                        <div className="pl-4 pr-1 py-1 space-y-1">
                          {item.children.map((child) => (
                            <Link
                              key={child.href}
                              href={child.href}
                              className={cn(
                                'block px-3 py-2 text-xs font-semibold rounded-lg transition-colors',
                                pathname === child.href
                                  ? 'bg-[var(--color-primary-light)] text-[var(--color-primary)] font-bold'
                                  : 'text-slate-600 hover:bg-slate-50'
                              )}
                            >
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        'block px-3 py-2.5 text-sm font-semibold rounded-xl transition-colors',
                        isCurrent
                          ? 'bg-[var(--color-primary-light)] text-[var(--color-primary)] font-bold'
                          : 'text-slate-700 hover:bg-slate-50'
                      )}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </div>

              {/* User Account / Portal Links */}
              <div className="pt-3 border-t border-slate-100">
                {isAuthenticated ? (
                  <div className="space-y-2">
                    <div className="p-3 bg-slate-50 rounded-xl">
                      <p className="text-xs text-slate-500 font-medium">Masuk sebagai:</p>
                      <p className="text-sm font-bold text-slate-900 truncate">{user?.name}</p>
                    </div>
                    <Link
                      href="/dashboard"
                      className="flex items-center gap-2.5 px-3 py-2 text-xs font-bold text-teal-800 bg-teal-50 rounded-xl"
                    >
                      <LayoutDashboard className="w-4 h-4" />
                      <span>Masuk ke Portal Pasien</span>
                    </Link>
                    <button
                      type="button"
                      onClick={logout}
                      className="w-full text-left px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 rounded-xl"
                    >
                      Keluar Akun
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-2">
                    <Link href="/login" className="block">
                      <Button variant="outline" className="w-full text-xs font-bold" size="sm">
                        Masuk
                      </Button>
                    </Link>
                    <Link href="/register" className="block">
                      <Button variant="primary" className="w-full text-xs font-bold" size="sm">
                        Daftar Akun
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </div>

            {/* Drawer Bottom Support Section (like stwasir.com contact info) */}
            <div className="p-4 border-t border-slate-200 bg-slate-50/80 space-y-2 text-xs">
              <p className="font-bold text-slate-800 text-[11px] uppercase tracking-wider">
                Bantuan & Informasi Pasien
              </p>
              <div className="flex items-center justify-between text-slate-600">
                <span className="flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-teal-700" />
                  Call Center
                </span>
                <a href="tel:02112345678" className="font-bold text-slate-900">
                  (021) 1234-5678
                </a>
              </div>
              <div className="flex items-center justify-between text-slate-600">
                <span className="flex items-center gap-1.5">
                  <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                  WhatsApp Siaga
                </span>
                <a
                  href="https://wa.me/6281234567890"
                  target="_blank"
                  rel="noreferrer"
                  className="font-bold text-emerald-700 hover:underline"
                >
                  0812-3456-7890
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
