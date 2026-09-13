'use client';

import Link from 'next/link';
import { MapPin, ArrowRight } from 'lucide-react';
import type { Doctor } from '@/types/doctor';
import Button from '@/components/ui/Button';

interface DoctorCardProps {
  doctor: Doctor;
  variant?: 'default' | 'compact' | 'selectable';
  isSelected?: boolean;
  onSelect?: (doctor: Doctor) => void;
}

export default function DoctorCard({ doctor, variant = 'default', isSelected, onSelect }: DoctorCardProps) {
  if (variant === 'compact') {
    return (
      <div className="flex items-center gap-3 p-3 rounded-xl border border-slate-200 bg-white hover:shadow-sm transition-shadow">
        <div className="h-12 w-12 rounded-xl overflow-hidden bg-slate-100 shrink-0 border border-slate-200">
          {doctor.photoUrl ? (
            <img src={doctor.photoUrl} alt={doctor.name} className="h-full w-full object-cover" />
          ) : (
            <div className="h-full w-full flex items-center justify-center bg-[var(--color-primary-light)]">
              <span className="text-[var(--color-primary)] font-semibold text-sm">
                {doctor.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
              </span>
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-bold text-slate-900 truncate">{doctor.name}</p>
          <p className="text-xs text-slate-500">{doctor.specializationName}</p>
        </div>
        <Link href={`/dokter/${doctor.slug}`}>
          <Button variant="outline" size="sm">Lihat</Button>
        </Link>
      </div>
    );
  }

  if (variant === 'selectable') {
    return (
      <button
        type="button"
        onClick={() => onSelect?.(doctor)}
        className={`w-full text-left p-4 rounded-xl border-2 transition-all cursor-pointer ${
          isSelected
            ? 'border-[var(--color-primary)] bg-[var(--color-primary-light)]/40 shadow-sm'
            : 'border-slate-200 hover:border-[var(--color-primary)]/50 bg-white'
        }`}
      >
        <div className="flex items-start gap-3">
          <div className="h-14 w-14 rounded-xl overflow-hidden bg-slate-100 shrink-0 border border-slate-200">
            {doctor.photoUrl ? (
              <img src={doctor.photoUrl} alt={doctor.name} className="h-full w-full object-cover" />
            ) : (
              <div className="h-full w-full flex items-center justify-center bg-[var(--color-primary-light)]">
                <span className="text-[var(--color-primary)] font-bold">
                  {doctor.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                </span>
              </div>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-bold text-slate-900 text-sm sm:text-base">{doctor.name}</p>
            <p className="text-xs sm:text-sm text-teal-700 font-semibold">{doctor.specializationName}</p>
            <div className="flex items-center gap-2 mt-1 text-xs text-slate-500">
              <MapPin className="h-3.5 w-3.5 text-slate-400 shrink-0" />
              <span>{doctor.location}</span>
            </div>
          </div>
        </div>
      </button>
    );
  }

  return (
    <div className="group relative flex flex-col justify-between bg-white rounded-2xl border border-slate-200/90 hover:border-[var(--color-primary)]/40 shadow-xs hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden h-full">
      {/* Clickable Header & Image & Info */}
      <Link href={`/dokter/${doctor.slug}`} className="block flex-1">
        {/* Doctor Photo */}
        <div className="relative w-full aspect-[4/3.8] sm:aspect-[4/4] overflow-hidden bg-slate-100">
          {doctor.photoUrl ? (
            <img
              src={doctor.photoUrl}
              alt={doctor.name}
              className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-[var(--color-primary-light)]">
              <span className="text-3xl font-extrabold text-[var(--color-primary)]">
                {doctor.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
              </span>
            </div>
          )}
        </div>

        {/* Doctor Name & Specialization */}
        <div className="p-5 sm:p-6 pb-2 text-center">
          <p className="text-xs sm:text-sm font-semibold text-teal-700 tracking-wide uppercase">
            {doctor.specializationName}
          </p>

          <h3 className="mt-2 text-xl sm:text-2xl font-black text-slate-900 group-hover:text-[var(--color-primary)] transition-colors leading-snug">
            {doctor.name}
          </h3>
        </div>
      </Link>

      {/* Clean Single Action Button */}
      <div className="p-5 sm:p-6 pt-3">
        <Link
          href={`/dokter/${doctor.slug}`}
          className="w-full py-3 px-4 rounded-xl bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer"
        >
          <span>Lihat Profil & Jadwal</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
}
