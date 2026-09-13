import Link from 'next/link';
import { Clock, Phone, ShieldCheck, UserCheck } from 'lucide-react';

export default function TopBar() {
  return (
    <div className="hidden md:block bg-[#18313D] text-white text-xs py-2 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center gap-5 text-white/80">
          <span className="flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5 text-[var(--color-secondary)]" />
            <span>Poliklinik: Senin - Sabtu 08.00 - 20.00</span>
          </span>
          <span className="hidden lg:flex items-center gap-1.5 text-white/70">
            <ShieldCheck className="h-3.5 w-3.5 text-[var(--color-success)]" />
            <span>Menerima Pasien BPJS Kesehatan & 50+ Asuransi</span>
          </span>
        </div>

        <div className="flex items-center gap-5">
          <a
            href="tel:02112349999"
            className="flex items-center gap-1.5 font-semibold text-red-300 hover:text-red-200 transition-colors"
          >
            <Phone className="h-3.5 w-3.5 text-red-400" />
            <span>IGD 24 Jam: (021) 1234-9999</span>
          </a>
          <span className="text-white/20">|</span>
          <Link
            href="/dashboard"
            className="flex items-center gap-1.5 text-white/90 hover:text-white font-medium transition-colors"
          >
            <UserCheck className="h-3.5 w-3.5 text-[var(--color-secondary)]" />
            <span>Portal Pasien MyMedika</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
