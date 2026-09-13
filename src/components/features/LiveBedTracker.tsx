'use client';

import { useState } from 'react';
import bedData from '@/data/bedAvailability.json';
import { Bed, CheckCircle2, AlertCircle, Phone, ArrowRight, Clock, ShieldCheck, Sparkles } from 'lucide-react';

export default function LiveBedTracker() {
  const [filter, setFilter] = useState<string>('Semua');

  const categories = ['Semua', 'Kamar Privat', 'Semi Privat', 'Reguler', 'Reguler BPJS', 'Perawatan Kritis', 'Isolasi Khusus'];

  const filteredBeds = filter === 'Semua'
    ? bedData
    : bedData.filter(b => b.category === filter);

  const totalAvailable = bedData.reduce((acc, curr) => acc + curr.available, 0);
  const totalBeds = bedData.reduce((acc, curr) => acc + curr.total, 0);

  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-16 sm:py-20">
      {/* Header with Live Status Pulse */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
        <div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[var(--color-text-primary)] tracking-tight">
            Ketersediaan Tempat Tidur & Kamar Rawat Inap
          </h2>
          <p className="text-sm sm:text-base text-[var(--color-text-secondary)] mt-2 max-w-2xl leading-relaxed">
            Pantau ketersediaan kamar rawat inap secara transparan dan real-time sebelum tiba di rumah sakit. Kami siap membantu proses admisi Anda 24 jam nonstop.
          </p>
        </div>

        {/* Global Stats Capsule */}
        <div className="flex items-center gap-4 bg-white border border-[var(--color-border)] p-4 rounded-2xl shadow-xs shrink-0">
          <div className="w-12 h-12 rounded-xl bg-[var(--color-primary-light)] text-[var(--color-primary)] flex items-center justify-center">
            <Bed className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-[var(--color-text-secondary)] font-medium">Total Kamar Siap Pakai</p>
            <p className="text-xl font-extrabold text-[var(--color-text-primary)]">
              <span className="text-emerald-600">{totalAvailable}</span> / {totalBeds} Bed Tersedia
            </p>
          </div>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-8 no-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setFilter(cat)}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${
              filter === cat
                ? 'bg-[var(--color-primary)] text-white shadow-sm'
                : 'bg-white text-[var(--color-text-secondary)] border border-[var(--color-border)] hover:bg-[var(--color-surface)]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Bed Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {filteredBeds.map((bed) => {
          const occupancyRate = Math.round((bed.occupied / bed.total) * 100);
          const isCritical = bed.available <= 3;

          return (
            <div
              key={bed.id}
              className="group bg-white rounded-2xl border border-[var(--color-border)] overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
            >
              <div>
                {/* Room Photo */}
                <div className="h-40 relative overflow-hidden bg-gray-100">
                  <img
                    src={bed.imageUrl}
                    alt={bed.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs text-[11px] font-bold text-[var(--color-primary)] px-2.5 py-0.5 rounded-full shadow-2xs">
                    {bed.category}
                  </div>
                  <div className={`absolute top-3 right-3 text-[11px] font-bold px-2.5 py-0.5 rounded-full shadow-2xs text-white ${
                    isCritical ? 'bg-amber-600' : 'bg-emerald-600'
                  }`}>
                    {bed.status}
                  </div>
                </div>

                {/* Details */}
                <div className="p-5">
                  <h3 className="font-bold text-lg text-[var(--color-text-primary)] mb-1">
                    {bed.name}
                  </h3>
                  <p className="text-xs font-semibold text-[var(--color-primary)] mb-3">
                    Tarif: {bed.pricePerNight}
                  </p>

                  {/* Availability Progress Bar */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between text-xs font-bold mb-1.5">
                      <span className="text-emerald-700">{bed.available} Tersedia</span>
                      <span className="text-gray-500">{bed.occupied} Terisi</span>
                    </div>
                    <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          occupancyRate > 80 ? 'bg-amber-500' : 'bg-emerald-500'
                        }`}
                        style={{ width: `${occupancyRate}%` }}
                      />
                    </div>
                  </div>

                  {/* Facilities list */}
                  <ul className="space-y-1.5 text-xs text-[var(--color-text-secondary)] border-t border-[var(--color-border)]/50 pt-3">
                    {bed.facilities.slice(0, 3).map((f, i) => (
                      <li key={i} className="flex items-center gap-1.5 truncate">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span className="truncate">{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Button */}
              <div className="p-5 pt-0">
                <a
                  href="tel:02112345678"
                  className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[var(--color-surface)] hover:bg-[var(--color-primary)] hover:text-white text-xs font-bold text-[var(--color-primary)] transition-colors"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Admisi Rawat Inap</span>
                </a>
              </div>
            </div>
          );
        })}
      </div>

      {/* Info Notice Strip */}
      <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <ShieldCheck className="w-6 h-6 text-[var(--color-success)] shrink-0" />
          <p className="text-xs sm:text-sm text-[var(--color-text-primary)]">
            <strong>Hak Pasien BPJS Kesehatan:</strong> Pasien berhak mendapatkan fasilitas rawat inap sesuai hak kelas kepesertaan tanpa iuran tambahan, atau opsi naik kelas perawatan sesuai regulasi Kemenkes.
          </p>
        </div>
        <a
          href="tel:02112349999"
          className="w-full sm:w-auto shrink-0 inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[var(--color-error)] text-white text-xs font-bold shadow-xs hover:bg-red-700 transition-colors"
        >
          <Phone className="w-3.5 h-3.5" />
          <span>Hotline Emergency IGD: (021) 1234-9999</span>
        </a>
      </div>
    </section>
  );
}
