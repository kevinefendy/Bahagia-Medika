'use client';
import { useState, useEffect } from 'react';
import { doctorService } from '@/lib/services/doctorService';
import type { Doctor } from '@/types/doctor';

const DAYS = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'];

export default function JadwalPage() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);

  useEffect(() => {
    doctorService.getAll().then(setDoctors);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl md:text-3xl font-bold text-[var(--color-text-primary)] mb-2">Jadwal Dokter</h1>
      <p className="text-[var(--color-text-secondary)] mb-6">Jadwal praktik dokter lintas spesialisasi</p>
      <div className="overflow-x-auto bg-white rounded-xl border border-[var(--color-border)] shadow-2xs">
        <table className="w-full text-sm min-w-[760px]">
          <thead className="bg-[var(--color-surface)]">
            <tr>
              <th className="px-4 py-3 text-left font-medium">Dokter</th>
              {DAYS.map(day => (
                <th key={day} className="px-4 py-3 text-center font-medium">{day}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {doctors.map(doctor => (
              <tr key={doctor.id} className="border-t border-[var(--color-border)]">
                <td className="px-4 py-3">
                  <p className="font-medium">{doctor.name}</p>
                  <p className="text-xs text-[var(--color-text-secondary)]">{doctor.specializationName}</p>
                </td>
                {DAYS.map(day => {
                  const schedule = doctor.schedules.find(s => s.day === day);
                  return (
                    <td key={day} className="px-4 py-3 text-center">
                      {schedule ? (
                        <span className="text-xs">{schedule.startTime}-{schedule.endTime}</span>
                      ) : (
                        <span className="text-[var(--color-text-secondary)]">-</span>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
