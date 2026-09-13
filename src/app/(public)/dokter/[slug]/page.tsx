'use client';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { MapPin, GraduationCap, Clock, ArrowLeft } from 'lucide-react';
import Button from '@/components/ui/Button';
import Breadcrumb from '@/components/ui/Breadcrumb';
import Badge from '@/components/ui/Badge';
import { doctorService } from '@/lib/services/doctorService';
import type { Doctor } from '@/types/doctor';

export default function DokterDetailPage() {
  const params = useParams();
  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params.slug) {
      doctorService.getBySlug(params.slug as string).then((d) => {
        setDoctor(d || null);
        setLoading(false);
      });
    }
  }, [params.slug]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 w-48 bg-[var(--color-surface)] rounded" />
          <div className="h-64 bg-[var(--color-surface)] rounded-xl" />
        </div>
      </div>
    );
  }

  if (!doctor) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8 text-center">
        <p className="text-[var(--color-text-secondary)]">Dokter tidak ditemukan.</p>
        <Link href="/dokter"><Button variant="outline" className="mt-4">Kembali ke Daftar Dokter</Button></Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Breadcrumb items={[{ label: 'Dokter', href: '/dokter' }, { label: doctor.name }]} />

      <div className="mt-6 grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          <div className="flex items-start gap-4">
            {doctor.photoUrl ? (
              <img src={doctor.photoUrl} alt={doctor.name} className="h-20 w-20 rounded-full object-cover shrink-0" />
            ) : (
              <div className="h-20 w-20 rounded-full bg-[var(--color-primary-light)] flex items-center justify-center shrink-0">
                <span className="text-[var(--color-primary)] font-bold text-2xl">
                  {doctor.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                </span>
              </div>
            )}
            <div>
              <h1 className="text-2xl font-bold text-[var(--color-text-primary)]">{doctor.name}</h1>
              <Badge variant="info" label={doctor.specializationName} className="mt-1" />
              <div className="flex items-center gap-4 mt-2 text-sm text-[var(--color-text-secondary)]">
                <span className="flex items-center gap-1"><MapPin className="h-4 w-4" />{doctor.location}</span>
                <span>{doctor.experienceYears} tahun pengalaman</span>
              </div>
            </div>
          </div>

          <div>
            <h2 className="font-semibold text-lg mb-2">Tentang Dokter</h2>
            <p className="text-[var(--color-text-secondary)]">{doctor.bio}</p>
          </div>

          <div>
            <h2 className="font-semibold text-lg mb-2 flex items-center gap-2">
              <GraduationCap className="h-5 w-5" /> Pendidikan
            </h2>
            <ul className="space-y-1">
              {doctor.education.map((edu, i) => (
                <li key={i} className="text-sm text-[var(--color-text-secondary)]">• {edu}</li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-semibold text-lg mb-3 flex items-center gap-2">
              <Clock className="h-5 w-5" /> Jadwal Praktik
            </h2>
            <div className="border border-[var(--color-border)] rounded-xl overflow-hidden overflow-x-auto">
              <table className="w-full text-sm min-w-[320px]">
                <thead className="bg-[var(--color-surface)]">
                  <tr>
                    <th className="px-4 py-2 text-left font-medium">Hari</th>
                    <th className="px-4 py-2 text-left font-medium">Jam</th>
                    <th className="px-4 py-2 text-left font-medium">Lokasi</th>
                  </tr>
                </thead>
                <tbody>
                  {['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'].map((day) => {
                    const schedule = doctor.schedules.find(s => s.day === day);
                    return (
                      <tr key={day} className="border-t border-[var(--color-border)]">
                        <td className="px-4 py-2">{day}</td>
                        <td className="px-4 py-2">
                          {schedule ? `${schedule.startTime} - ${schedule.endTime}` : (
                            <span className="text-[var(--color-text-secondary)]">Tidak Praktik</span>
                          )}
                        </td>
                        <td className="px-4 py-2">{schedule?.location || '-'}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="sticky top-24">
            <Link href={`/buat-janji?doctorId=${doctor.id}`}>
              <Button variant="primary" className="w-full" size="lg">
                Buat Janji dengan {doctor.name.split(',')[0]}
              </Button>
            </Link>
            <Button variant="outline" className="w-full mt-2">
              Tanya Medika Care
            </Button>
            <Link href="/dokter" className="flex items-center gap-1 text-sm text-[var(--color-primary)] mt-4 hover:underline">
              <ArrowLeft className="h-4 w-4" /> Kembali ke Daftar Dokter
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
