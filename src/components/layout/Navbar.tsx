'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils/cn';
import { useAuthStore } from '@/lib/store/useAuthStore';
import { Menu, X, ChevronDown, LogOut, LayoutDashboard, Shield, Phone, Calendar } from 'lucide-react';
import Button from '@/components/ui/Button';
import Logo from '@/components/ui/Logo';

const NAV_ITEMS = [
  { label: 'Beranda', href: '/' },
  { label: 'Layanan', href: '/layanan' },
  { label: 'Dokter', href: '/dokter' },
  { label: 'Fasilitas', href: '/fasilitas' },
  {
    label: 'Informasi & Pasien',
    children: [
      { label: 'Ketersediaan Kamar (Live)', href: '/ketersediaan-kamar' },
      { label: 'Estimasi Biaya Tindakan', href: '/estimasi-biaya' },
      { label: 'Jadwal Dokter', href: '/jadwal' },
      { label: 'Artikel Kesehatan', href: '/artikel' },
      { label: 'Berita & Acara', href: '/berita' },
    ],
  },
  { label: 'Kontak', href: '/kontak' },
];

export default function Navbar() {
  const pathname = usePathname();
  const { user, isAuthenticated, logout } = useAuthStore();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isMobileOpen]);

  return (
    <>
      <nav
        className={cn(
          'sticky top-0 z-40 bg-white/95 backdrop-blur-sm transition-all duration-200',
          isScrolled ? 'shadow-sm' : ''
        )}
      >
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
          <Logo size="md" priority />

          <div className="hidden lg:flex items-center gap-0.5">
            {NAV_ITEMS.map((item) =>
              item.children ? (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => setOpenDropdown(item.label)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <button className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors rounded-lg">
                    {item.label}
                    <ChevronDown className={cn('h-3.5 w-3.5 transition-transform', openDropdown === item.label && 'rotate-180')} />
                  </button>
                  {openDropdown === item.label && (
                    <div className="absolute top-full left-0 mt-1 w-52 bg-white border border-[var(--color-border)] rounded-xl shadow-lg py-1.5 z-50">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className={cn(
                            'block px-4 py-2.5 text-sm transition-colors mx-1 rounded-lg',
                            pathname === child.href
                              ? 'bg-[var(--color-primary-light)] text-[var(--color-primary)] font-medium'
                              : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-surface)]'
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
                    'px-3 py-2 text-sm font-medium transition-colors rounded-lg relative',
                    pathname === item.href
                      ? 'text-[var(--color-primary)]'
                      : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
                  )}
                >
                  {item.label}
                  {pathname === item.href && (
                    <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-[var(--color-primary)] rounded-full" />
                  )}
                </Link>
              )
            )}
          </div>

          <div className="flex items-center gap-2">
            <Link
              href={isAuthenticated ? '/buat-janji' : '/login?required=buat-janji'}
              className="hidden md:inline-flex"
            >
              <Button variant="primary" size="sm">
                Buat Janji
              </Button>
            </Link>

            {isAuthenticated ? (
              <div className="relative group">
                <button className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-[var(--color-surface)] transition-colors">
                  <div className="relative">
                    <div className="h-8 w-8 rounded-full bg-[var(--color-primary)] flex items-center justify-center">
                      <span className="text-white text-xs font-semibold">
                        {user?.name?.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
                      </span>
                    </div>
                    <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white" />
                  </div>
                  <ChevronDown className="h-4 w-4 text-[var(--color-text-secondary)] hidden md:block" />
                </button>
                <div className="absolute right-0 top-full mt-2 w-64 bg-white border border-[var(--color-border)] rounded-xl shadow-lg py-1.5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                  <div className="px-4 py-3 border-b border-[var(--color-border)]">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-semibold truncate">{user?.name}</p>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700">
                        Akses Penuh
                      </span>
                    </div>
                    <p className="text-xs text-[var(--color-text-secondary)] truncate mt-0.5">{user?.email}</p>
                  </div>
                  {user?.role === 'patient' && (
                    <>
                      <Link href="/buat-janji" className="flex items-center gap-3 px-4 py-2.5 text-sm text-[var(--color-text-secondary)] hover:bg-[var(--color-surface)] transition-colors">
                        <Calendar className="h-4 w-4 text-[var(--color-primary)]" />
                        Buat Janji Dokter
                      </Link>
                      <Link href="/dashboard" className="flex items-center gap-3 px-4 py-2.5 text-sm text-[var(--color-text-secondary)] hover:bg-[var(--color-surface)] transition-colors">
                        <LayoutDashboard className="h-4 w-4 text-[var(--color-primary)]" />
                        Portal Dashboard Pasien
                      </Link>
                    </>
                  )}
                  {user?.role === 'admin' && (
                    <Link href="/admin" className="flex items-center gap-3 px-4 py-2.5 text-sm text-[var(--color-text-secondary)] hover:bg-[var(--color-surface)] transition-colors">
                      <Shield className="h-4 w-4" />
                      Admin Panel
                    </Link>
                  )}
                  <div className="border-t border-[var(--color-border)] mt-1 pt-1">
                    <button onClick={logout} className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-[var(--color-error)] hover:bg-[var(--color-surface)] transition-colors">
                      <LogOut className="h-4 w-4" />
                      Keluar
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link href="/login">
                  <Button variant="outline" size="sm" className="hidden md:inline-flex">
                    Masuk
                  </Button>
                </Link>
                <Link href="/register">
                  <Button variant="primary" size="sm" className="hidden md:inline-flex bg-slate-800 hover:bg-slate-900 border-slate-800">
                    Daftar
                  </Button>
                </Link>
              </div>
            )}

            <button
              onClick={() => setIsMobileOpen(true)}
              className="lg:hidden p-2 rounded-xl hover:bg-[var(--color-surface)] transition-colors"
              aria-label="Buka menu"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
            onClick={() => setIsMobileOpen(false)}
          />
          <div className="absolute left-0 top-0 h-full w-80 max-w-[85vw] bg-white shadow-2xl flex flex-col animate-in slide-in-from-left duration-200">
            <div className="flex items-center justify-between p-4 border-b border-[var(--color-border)]">
              <Logo size="sm" href={null} />
              <button
                onClick={() => setIsMobileOpen(false)}
                className="p-2 rounded-lg hover:bg-[var(--color-surface)] transition-colors"
                aria-label="Tutup menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
              <Link href="/buat-janji" className="block w-full mb-5">
                <Button variant="primary" className="w-full" size="lg">
                  Buat Janji Sekarang
                </Button>
              </Link>

              <div className="space-y-1">
                {NAV_ITEMS.map((item) =>
                  item.children ? (
                    <div key={item.label} className="mb-3">
                      <p className="px-3 py-1.5 text-xs font-semibold text-[var(--color-text-secondary)] uppercase tracking-wide">
                        {item.label}
                      </p>
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className={cn(
                            'block px-3 py-2.5 text-sm rounded-lg transition-colors',
                            pathname === child.href
                              ? 'bg-[var(--color-primary-light)] text-[var(--color-primary)] font-medium'
                              : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-surface)]'
                          )}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        'block px-3 py-2.5 text-sm rounded-lg transition-colors',
                        pathname === item.href
                          ? 'bg-[var(--color-primary-light)] text-[var(--color-primary)] font-medium'
                          : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-surface)]'
                      )}
                    >
                      {item.label}
                    </Link>
                  )
                )}
              </div>

              <div className="mt-5 pt-5 border-t border-[var(--color-border)]">
                {isAuthenticated ? (
                  <div className="space-y-1">
                    <div className="flex items-center gap-3 px-3 py-2 mb-2">
                      <div className="h-10 w-10 rounded-full bg-[var(--color-primary)] flex items-center justify-center">
                        <span className="text-white text-sm font-semibold">
                          {user?.name?.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm font-medium">{user?.name}</p>
                        <p className="text-xs text-[var(--color-text-secondary)]">{user?.email}</p>
                      </div>
                    </div>
                    {user?.role === 'patient' && (
                      <Link
                        href="/buat-janji"
                        className="flex items-center gap-3 px-3 py-2.5 text-sm font-bold text-[var(--color-primary)] bg-[var(--color-primary-light)] rounded-lg transition-colors mb-1"
                      >
                        <Calendar className="h-4 w-4" />
                        Buat Janji Dokter (Akses Penuh)
                      </Link>
                    )}
                    <Link
                      href={user?.role === 'admin' ? '/admin' : '/dashboard'}
                      className="flex items-center gap-3 px-3 py-2.5 text-sm text-[var(--color-text-secondary)] hover:bg-[var(--color-surface)] rounded-lg transition-colors"
                    >
                      <LayoutDashboard className="h-4 w-4" />
                      Portal Dashboard Pasien
                    </Link>
                    <button
                      onClick={logout}
                      className="flex items-center gap-3 w-full px-3 py-2.5 text-sm text-[var(--color-error)] hover:bg-[var(--color-surface)] rounded-lg transition-colors"
                    >
                      <LogOut className="h-4 w-4" />
                      Keluar
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Link href="/login?required=buat-janji" className="block">
                      <Button variant="primary" className="w-full" size="md">
                        Buat Janji (Masuk Dahulu)
                      </Button>
                    </Link>
                    <div className="grid grid-cols-2 gap-2">
                      <Link href="/login" className="block">
                        <Button variant="outline" className="w-full" size="md">
                          Masuk
                        </Button>
                      </Link>
                      <Link href="/register" className="block">
                        <Button variant="primary" className="w-full bg-slate-800 hover:bg-slate-900 border-slate-800" size="md">
                          Daftar
                        </Button>
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Emergency contact at bottom */}
            <div className="p-4 border-t border-[var(--color-border)] bg-[var(--color-error-light)]">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-[var(--color-error)] flex items-center justify-center shrink-0">
                  <Phone className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-[var(--color-error)]">IGD 24 Jam</p>
                  <a href="tel:02112349999" className="text-sm font-bold text-[var(--color-error)]">
                    (021) 1234-9999
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
