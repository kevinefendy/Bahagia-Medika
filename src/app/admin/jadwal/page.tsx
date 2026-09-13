'use client';
import { useState, useEffect } from 'react';
import { doctorService } from '@/lib/services/doctorService';
import type { Doctor } from '@/types/doctor';

const DAYS = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'];

export default function AdminJadwalPage() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);

  useEffect(() => {
    doctorService.getAll().then(setDoctors);
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold text-[var(--color-text-primary)] mb-6">Kelola Jadwal</h1>
      <div className="bg-white rounded-xl border border-[var(--color-border)] overflow-hidden shadow-2xs">
        <div className="overflow-x-auto">
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
              {doctors.map(doc => (
                <tr key={doc.id} className="border-t border-[var(--color-border)]">
                  <td className="px-4 py-3">
                    <p className="font-medium">{doc.name}</p>
                    <p className="text-xs text-[var(--color-text-secondary)]">{doc.specializationName}</p>
                  </td>
                  {DAYS.map(day => {
                    const schedule = doc.schedules.find(s => s.day === day);
                    return (
                      <td key={day} className="px-4 py-3 text-center">
                        {schedule ? (
                          <span className="text-xs bg-[var(--color-success-light)] text-[var(--color-success)] px-2 py-1 rounded">
                            {schedule.startTime}-{schedule.endTime}
                          </span>
                        ) : (
                          <button className="text-xs text-[var(--color-primary)] hover:underline">+ Tambah</button>
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
    </div>
  );
}
