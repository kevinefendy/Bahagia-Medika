'use client';
import { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle2, ExternalLink } from 'lucide-react';
import Input from '@/components/ui/Input';
import Textarea from '@/components/ui/Textarea';
import Button from '@/components/ui/Button';
import { useUIStore } from '@/lib/store/useUIStore';

export default function KontakPage() {
  const addToast = useUIStore((s) => s.addToast);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      addToast({ type: 'success', message: 'Pesan berhasil dikirim!' });
      setTimeout(() => {
        setForm({ name: '', email: '', phone: '', subject: '', message: '' });
        setSubmitted(false);
      }, 3000);
    }, 800);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
      <div className="text-center mb-10">
        <h1 className="text-2xl md:text-3xl font-bold text-[var(--color-text-primary)] mb-2">Hubungi Kami</h1>
        <p className="text-[var(--color-text-secondary)] max-w-md mx-auto">Ada yang bisa kami bantu? Jangan ragu untuk menghubungi tim kami.</p>
      </div>

      <div className="grid lg:grid-cols-5 gap-8">
        {/* Contact Info */}
        <div className="lg:col-span-2 space-y-4">
          {[
            { icon: MapPin, label: 'Alamat', value: 'Jl. Kesehatan No. 123, Jakarta Selatan, DKI Jakarta 12345', color: 'primary' },
            { icon: Phone, label: 'Telepon', value: '(021) 1234-5678', color: 'primary' },
            { icon: Phone, label: 'IGD 24 Jam', value: '(021) 1234-9999', color: 'error', isEmergency: true },
            { icon: Mail, label: 'Email', value: 'info@bahagiamedika.co.id', color: 'primary' },
            { icon: Clock, label: 'Jam Operasional', value: 'Senin - Sabtu: 08.00 - 20.00\nMinggu: 08.00 - 14.00', color: 'primary' },
          ].map((item) => (
            <div
              key={item.label}
              className={`flex items-start gap-4 p-4 rounded-xl border transition-colors ${
                item.isEmergency
                  ? 'border-[var(--color-error)]/20 bg-[var(--color-error-light)]'
                  : 'border-[var(--color-border)] bg-white hover:shadow-sm'
              }`}
            >
              <div className={`h-10 w-10 rounded-lg flex items-center justify-center shrink-0 ${
                item.isEmergency
                  ? 'bg-[var(--color-error)]'
                  : 'bg-[var(--color-primary-light)]'
              }`}>
                <item.icon className={`h-5 w-5 ${item.isEmergency ? 'text-white' : 'text-[var(--color-primary)]'}`} />
              </div>
              <div>
                <p className={`text-sm font-semibold ${item.isEmergency ? 'text-[var(--color-error)]' : 'text-[var(--color-text-primary)]'}`}>{item.label}</p>
                <p className="text-sm text-[var(--color-text-secondary)] whitespace-pre-line">{item.value}</p>
              </div>
            </div>
          ))}

          {/* Hospital Building & Location Preview */}
          <div className="rounded-2xl overflow-hidden border border-[var(--color-border)] shadow-xs relative group">
            <div className="h-56 relative overflow-hidden bg-gray-100">
              <img
                src="https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=800&auto=format&fit=crop&q=80"
                alt="Gedung Rumah Sakit Bahagia Medika Jakarta"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 text-white">
                <p className="text-xs font-bold">Gedung Utama Bahagia Medika</p>
                <p className="text-[11px] text-white/80">Lobi Utama & Pintu Masuk IGD 24 Jam</p>
              </div>
            </div>
            <div className="p-3 bg-[var(--color-surface)]/60 text-[11px] text-[var(--color-text-secondary)] flex items-center justify-between">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                <span>15 Menit dari Stasiun MRT Fatmawati</span>
              </span>
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noreferrer"
                className="text-[var(--color-primary)] font-bold hover:underline inline-flex items-center gap-1"
              >
                <span>Buka di Maps</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-xl border border-[var(--color-border)] p-6 md:p-8">
            <h2 className="font-semibold text-lg mb-1">Kirim Pesan</h2>
            <p className="text-sm text-[var(--color-text-secondary)] mb-6">Isi form di bawah ini dan kami akan membalas segera</p>

            {submitted ? (
              <div className="text-center py-12">
                <div className="h-16 w-16 rounded-full bg-[var(--color-success-light)] flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="h-8 w-8 text-[var(--color-success)]" />
                </div>
                <h3 className="font-semibold text-lg text-[var(--color-text-primary)] mb-1">Pesan Terkirim!</h3>
                <p className="text-sm text-[var(--color-text-secondary)]">Terima kasih, kami akan segera merespon.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <Input
                    label="Nama Lengkap"
                    placeholder="Nama Anda"
                    required
                    value={form.name}
                    onChange={(e) => setForm({...form, name: e.target.value})}
                  />
                  <Input
                    label="Email"
                    type="email"
                    placeholder="email@contoh.com"
                    required
                    value={form.email}
                    onChange={(e) => setForm({...form, email: e.target.value})}
                  />
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <Input
                    label="No. Telepon"
                    placeholder="08xxxxxxxxxx"
                    value={form.phone}
                    onChange={(e) => setForm({...form, phone: e.target.value})}
                  />
                  <Input
                    label="Subjek"
                    placeholder="Perihal pesan"
                    required
                    value={form.subject}
                    onChange={(e) => setForm({...form, subject: e.target.value})}
                  />
                </div>
                <Textarea
                  label="Pesan"
                  placeholder="Tuliskan pesan Anda di sini..."
                  rows={5}
                  required
                  value={form.message}
                  onChange={(e) => setForm({...form, message: e.target.value})}
                />
                <Button type="submit" variant="primary" isLoading={loading} className="w-full" size="lg">
                  <Send className="h-4 w-4" />
                  Kirim Pesan
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
