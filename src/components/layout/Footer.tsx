'use client';

import Link from 'next/link';
import { Phone, Mail, MapPin, Clock, ArrowRight, Heart, Cookie } from 'lucide-react';
import Logo from '@/components/ui/Logo';

const QUICK_LINKS = [
  { label: 'Layanan', href: '/layanan' },
  { label: 'Cari Dokter', href: '/dokter' },
  { label: 'Fasilitas', href: '/fasilitas' },
  { label: 'Buat Janji', href: '/buat-janji' },
  { label: 'Jadwal Dokter', href: '/jadwal' },
];

const INFO_LINKS = [
  { label: 'Artikel Kesehatan', href: '/artikel' },
  { label: 'Berita', href: '/berita' },
  { label: 'Tentang Kami', href: '/tentang' },
  { label: 'Kontak', href: '/kontak' },
];

export default function Footer() {
  return (
    <footer className="bg-[var(--color-text-primary)] text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="mb-4 [&_span]:!text-white">
              <Logo light href="/" />
            </div>
            <p className="text-sm text-gray-400 mb-5 leading-relaxed">
              Menghadirkan pelayanan kesehatan berkualitas tinggi dengan dokter spesialis berpengalaman dan fasilitas modern untuk Anda dan keluarga.
            </p>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <MapPin className="h-4 w-4 shrink-0" />
              Jl. Kesehatan No. 123, Jakarta Selatan
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wide mb-4">Navigasi Cepat</h3>
            <ul className="space-y-2.5">
              {QUICK_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-gray-400 hover:text-white transition-colors inline-flex items-center gap-1 group">
                    <ArrowRight className="h-3 w-3 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wide mb-4">Informasi</h3>
            <ul className="space-y-2.5">
              {INFO_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-gray-400 hover:text-white transition-colors inline-flex items-center gap-1 group">
                    <ArrowRight className="h-3 w-3 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wide mb-4">Kontak</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2.5 text-sm text-gray-400">
                <div className="h-8 w-8 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                  <Phone className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-white font-medium">(021) 1234-5678</p>
                  <p className="text-xs text-gray-500">Senin - Sabtu</p>
                </div>
              </li>
              <li className="flex items-center gap-2.5 text-sm text-gray-400">
                <div className="h-8 w-8 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                  <Mail className="h-4 w-4" />
                </div>
                <p className="text-white">info@bahagiamedika.co.id</p>
              </li>
              <li className="flex items-center gap-2.5 text-sm text-gray-400">
                <div className="h-8 w-8 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                  <Clock className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-white">Senin - Sabtu: 08.00 - 20.00</p>
                  <p className="text-xs text-gray-500">Minggu: 08.00 - 14.00</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-gray-500 flex items-center gap-1">
            &copy; {new Date().getFullYear()} Bahagia Medika. Dibuat dengan <Heart className="h-3 w-3 text-[var(--color-error)] fill-current" /> untuk kesehatan Anda.
          </p>
          <div className="flex items-center gap-4 text-xs text-gray-500">
            <button
              type="button"
              onClick={() => {
                if (typeof window !== 'undefined') {
                  window.dispatchEvent(new CustomEvent('open-cookie-settings'));
                }
              }}
              className="hover:text-white transition-colors cursor-pointer inline-flex items-center gap-1"
            >
              <Cookie className="w-3.5 h-3.5 text-gray-400" />
              <span>Pengaturan Cookie</span>
            </button>
            <button
              type="button"
              onClick={() => {
                if (typeof window !== 'undefined') {
                  window.dispatchEvent(new CustomEvent('open-privacy-statement'));
                }
              }}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Pernyataan Privasi
            </button>
            <Link href="/tentang" className="hover:text-white transition-colors">Syarat & Ketentuan</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
