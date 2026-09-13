'use client';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import Button from '@/components/ui/Button';
import Breadcrumb from '@/components/ui/Breadcrumb';
import Accordion from '@/components/ui/Accordion';
import { serviceService } from '@/lib/services/serviceService';
import { doctorService } from '@/lib/services/doctorService';
import type { Service } from '@/types/service';
import type { Doctor } from '@/types/doctor';

export default function LayananDetailPage() {
  const params = useParams();
  const [service, setService] = useState<Service | null>(null);
  const [doctors, setDoctors] = useState<Doctor[]>([]);

  useEffect(() => {
    if (params.slug) {
      serviceService.getBySlug(params.slug as string).then((s) => {
        setService(s || null);
        if (s) {
          doctorService.getAll().then((allDocs) => {
            setDoctors(allDocs.filter(d => s.relatedDoctorIds.includes(d.id)).slice(0, 3));
          });
        }
      });
    }
  }, [params.slug]);

  if (!service) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="skeleton h-8 w-48 mb-4" />
        <div className="skeleton h-64 w-full" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Breadcrumb items={[{ label: 'Layanan', href: '/layanan' }, { label: service.name }]} />

      {/* Hero Banner Image */}
      {service.imageUrl && (
        <div className="mt-6 h-64 sm:h-80 w-full rounded-2xl overflow-hidden relative shadow-md">
          <img
            src={service.imageUrl}
            alt={service.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 text-white">
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-white/20 backdrop-blur-xs border border-white/30 mb-2 inline-block">
              {service.category}
            </span>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black">{service.name}</h1>
            <p className="text-white/90 text-sm sm:text-base mt-1 line-clamp-2">{service.shortDescription}</p>
          </div>
        </div>
      )}

      {!service.imageUrl && (
        <div className="mt-6">
          <h1 className="text-2xl md:text-3xl font-bold text-[var(--color-text-primary)] mb-2">{service.name}</h1>
          <p className="text-[var(--color-text-secondary)] mb-6">{service.shortDescription}</p>
        </div>
      )}

      <div className="mt-8 prose max-w-none text-[var(--color-text-secondary)] mb-8">
        <p className="whitespace-pre-line">{service.description}</p>
      </div>
      {service.benefits && service.benefits.length > 0 && (
        <div className="mb-8">
          <h2 className="font-semibold text-lg mb-3">Keunggulan</h2>
          <ul className="space-y-2">
            {service.benefits.map((b, i) => (
              <li key={i} className="flex items-start gap-2.5 text-[var(--color-text-secondary)]">
                <CheckCircle2 className="h-4 w-4 text-[var(--color-success)] shrink-0 mt-0.5" />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      {doctors.length > 0 && (
        <div className="mb-8">
          <h2 className="font-semibold text-lg mb-3">Dokter Terkait</h2>
          <div className="space-y-3">
            {doctors.map(d => (
              <Link key={d.id} href={`/dokter/${d.slug}`} className="flex items-center gap-3 p-3 rounded-lg border border-[var(--color-border)] hover:shadow-sm transition-shadow">
                <div className="h-12 w-12 rounded-full overflow-hidden bg-[var(--color-surface)] shrink-0">
                  {d.photoUrl ? (
                    <img src={d.photoUrl} alt={d.name} className="h-full w-full object-cover" />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center bg-[var(--color-primary-light)]">
                      <span className="text-[var(--color-primary)] font-semibold text-sm">
                        {d.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                      </span>
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">{d.name}</p>
                  <p className="text-xs text-[var(--color-text-secondary)]">{d.specializationName}</p>
                </div>
                <ArrowRight className="h-4 w-4 text-[var(--color-text-secondary)]" />
              </Link>
            ))}
          </div>
        </div>
      )}
      {service.faq && service.faq.length > 0 && (
        <div className="mb-8">
          <h2 className="font-semibold text-lg mb-3">Pertanyaan Umum</h2>
          <Accordion items={service.faq} />
        </div>
      )}
      <Link href="/buat-janji" className="block w-full sm:w-auto sm:inline-block">
        <Button variant="primary" size="lg" className="w-full sm:w-auto">Buat Janji Sekarang</Button>
      </Link>
    </div>
  );
}
