'use client';
import { useState, useEffect } from 'react';
import { serviceService } from '@/lib/services/serviceService';
import type { Service } from '@/types/service';

export default function AdminLayananPage() {
  const [services, setServices] = useState<Service[]>([]);
  useEffect(() => { serviceService.getAll().then(setServices); }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold text-[var(--color-text-primary)] mb-6">Kelola Layanan</h1>
      <div className="bg-white rounded-xl border border-[var(--color-border)] overflow-hidden shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[500px]">
            <thead className="bg-[var(--color-surface)]">
              <tr>
                <th className="px-4 py-3 text-left font-medium">Nama</th>
                <th className="px-4 py-3 text-left font-medium">Kategori</th>
                <th className="px-4 py-3 text-left font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {services.map(s => (
                <tr key={s.id} className="border-t border-[var(--color-border)]">
                  <td className="px-4 py-3 font-medium">{s.name}</td>
                  <td className="px-4 py-3">{s.category}</td>
                  <td className="px-4 py-3"><span className="px-2 py-0.5 rounded-full text-xs bg-[var(--color-success-light)] text-[var(--color-success)]">Published</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
