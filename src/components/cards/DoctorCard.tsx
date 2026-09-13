import Link from 'next/link';
import { Calendar, MapPin } from 'lucide-react';
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
      <div className="flex items-center gap-3 p-3 rounded-lg border border-[var(--color-border)] hover:shadow-sm transition-shadow">
        <div className="h-12 w-12 rounded-full overflow-hidden bg-[var(--color-surface)] shrink-0">
          {doctor.photoUrl ? (
            <img src={doctor.photoUrl} alt={doctor.name} className="h-full w-full object-cover" />
          ) : (
            <div className="h-full w-full flex items-center justify-center bg-[var(--color-primary-light)]">
              <span className="text-[var(--color-primary)] font-semibold text-sm">
                {doctor.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
              </span>
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-[var(--color-text-primary)] truncate">{doctor.name}</p>
          <p className="text-xs text-[var(--color-text-secondary)]">{doctor.specializationName}</p>
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
        onClick={() => onSelect?.(doctor)}
        className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
          isSelected
            ? 'border-[var(--color-primary)] bg-[var(--color-primary-light)]'
            : 'border-[var(--color-border)] hover:border-[var(--color-primary)]/50'
        }`}
      >
        <div className="flex items-start gap-3">
          <div className="h-14 w-14 rounded-full overflow-hidden bg-[var(--color-surface)] shrink-0">
            {doctor.photoUrl ? (
              <img src={doctor.photoUrl} alt={doctor.name} className="h-full w-full object-cover" />
            ) : (
              <div className="h-full w-full flex items-center justify-center bg-[var(--color-primary-light)]">
                <span className="text-[var(--color-primary)] font-semibold">
                  {doctor.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                </span>
              </div>
            )}
          </div>
          <div>
            <p className="font-medium text-[var(--color-text-primary)]">{doctor.name}</p>
            <p className="text-sm text-[var(--color-text-secondary)]">{doctor.specializationName}</p>
            <div className="flex items-center gap-2 mt-1 text-xs text-[var(--color-text-secondary)]">
              <MapPin className="h-3 w-3" />
              {doctor.location}
            </div>
          </div>
        </div>
      </button>
    );
  }

  return (
    <div className="group rounded-2xl border border-[var(--color-border)] overflow-hidden bg-white smooth-card hover:border-[var(--color-primary)]/40 flex flex-col justify-between">
      <div>
        <div className="h-52 bg-[var(--color-surface)] overflow-hidden relative">
          {doctor.photoUrl ? (
            <img
              src={doctor.photoUrl}
              alt={doctor.name}
              className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            />
          ) : (
            <div className="h-full w-full flex items-center justify-center bg-[var(--color-primary-light)]">
              <span className="text-[var(--color-primary)] font-bold text-4xl">
                {doctor.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
              </span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-40 transition-opacity duration-300" />
        </div>
        <div className="p-4 sm:p-5">
          <h3 className="font-bold text-base text-[var(--color-text-primary)] group-hover:text-[var(--color-primary)] transition-colors duration-200 truncate">
            {doctor.name}
          </h3>
          <p className="text-xs sm:text-sm font-medium text-[var(--color-primary)] mt-0.5">{doctor.specializationName}</p>
          <div className="flex items-center gap-2 mt-2.5 text-xs text-[var(--color-text-secondary)]">
            <MapPin className="h-3.5 w-3.5 shrink-0 text-gray-400" />
            <span className="truncate">{doctor.location}</span>
          </div>
          {doctor.schedules.length > 0 && (
            <div className="flex items-center gap-2 mt-1.5 text-xs text-[var(--color-text-secondary)]">
              <Calendar className="h-3.5 w-3.5 shrink-0 text-gray-400" />
              <span className="truncate">{doctor.schedules.map(s => s.day).join(', ')}</span>
            </div>
          )}
        </div>
      </div>
      <div className="p-4 sm:p-5 pt-0">
        <div className="flex gap-2 pt-3 border-t border-[var(--color-border)]/50">
          <Link href={`/dokter/${doctor.slug}`} className="flex-1">
            <Button variant="outline" size="sm" className="w-full text-xs">
              Lihat Profil
            </Button>
          </Link>
          <Link href={`/buat-janji?doctorId=${doctor.id}`} className="flex-1">
            <Button variant="primary" size="sm" className="w-full text-xs">
              Buat Janji
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
