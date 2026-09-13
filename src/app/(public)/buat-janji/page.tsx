'use client';
import { useState, useEffect, useMemo, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Check, ChevronLeft, ChevronRight, Lock, ArrowRight, Clock, Calendar, Stethoscope, CheckCircle2 } from 'lucide-react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Textarea from '@/components/ui/Textarea';
import DatePicker from '@/components/ui/DatePicker';
import { useBookingFlowStore } from '@/lib/store/useBookingFlowStore';
import { useAppointmentStore } from '@/lib/store/useAppointmentStore';
import { useAuthStore } from '@/lib/store/useAuthStore';
import { useUIStore } from '@/lib/store/useUIStore';
import { doctorService } from '@/lib/services/doctorService';
import { serviceService } from '@/lib/services/serviceService';
import { formatDate } from '@/lib/utils/format';
import type { Doctor } from '@/types/doctor';
import type { Service } from '@/types/service';
import Link from 'next/link';

const STEPS = [
  { num: 1, label: 'Layanan' },
  { num: 2, label: 'Dokter' },
  { num: 3, label: 'Tanggal' },
  { num: 4, label: 'Jam' },
  { num: 5, label: 'Data Pasien' },
  { num: 6, label: 'Review' },
  { num: 7, label: 'Selesai' },
];

function generateTimeSlots(startTime: string, endTime: string, slotDuration: number): string[] {
  const slots: string[] = [];
  let [startH, startM] = startTime.split(':').map(Number);
  const [endH, endM] = endTime.split(':').map(Number);
  while (startH < endH || (startH === endH && startM < endM)) {
    slots.push(`${String(startH).padStart(2, '0')}:${String(startM).padStart(2, '0')}`);
    startM += slotDuration;
    if (startM >= 60) { startH++; startM -= 60; }
  }
  return slots;
}

function BuatJanjiContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const addToast = useUIStore((s) => s.addToast);
  const { user, isAuthenticated } = useAuthStore();
  const createAppointment = useAppointmentStore((s) => s.createAppointment);

  const [authChecked, setAuthChecked] = useState(false);

  // Authentication requirement: User must log in first
  useEffect(() => {
    if (!isAuthenticated) {
      addToast({
        type: 'warning',
        message: 'Layanan Buat Janji memerlukan akun pasien. Silakan masuk terlebih dahulu.',
      });
      router.replace('/login?required=buat-janji');
    } else {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setAuthChecked(true);
    }
  }, [isAuthenticated, router, addToast]);

  const {
    currentStep, selectedService, selectedDoctor, selectedDate, selectedTime,
    setStep, setService, setDoctor, setDate, setTime, prefillDoctor,
  } = useBookingFlowStore();

  const [services, setServices] = useState<Service[]>([]);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [appointmentId, setAppointmentId] = useState('');

  // Patient form state
  const [form, setForm] = useState({
    fullName: user?.name || '',
    email: user?.email || '',
    phoneNumber: user?.phoneNumber || '',
    birthDate: user?.birthDate || '',
    address: user?.address || '',
    complaint: '',
  });

  useEffect(() => {
    serviceService.getAll().then(setServices);
    const doctorId = searchParams.get('doctorId');
    const serviceId = searchParams.get('serviceId');
    if (doctorId) {
      doctorService.getById(doctorId).then((d) => {
        if (d) {
          if (serviceId) {
            serviceService.getById(serviceId).then((s) => {
              prefillDoctor(d, s || undefined);
            });
          } else {
            prefillDoctor(d);
          }
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  useEffect(() => {
    if (currentStep === 2 && selectedService) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLoading(true);
      doctorService.getAll().then((data) => {
        setDoctors(data.filter(d => d.relatedServiceIds.includes(selectedService.id)));
        setLoading(false);
      });
    }
  }, [currentStep, selectedService]);

  useEffect(() => {
    if (currentStep === 5 && user) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setForm(prev => ({
        ...prev,
        fullName: prev.fullName || user.name || '',
        email: prev.email || user.email || '',
        phoneNumber: prev.phoneNumber || user.phoneNumber || '',
        birthDate: prev.birthDate || user.birthDate || '',
        address: prev.address || user.address || '',
      }));
    }
  }, [currentStep, user]);

  const getAvailableSlots = () => {
    if (!selectedDoctor) {
      return ['08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00'];
    }

    if (!selectedDate) {
      if (selectedDoctor.schedules && selectedDoctor.schedules.length > 0) {
        const first = selectedDoctor.schedules[0];
        return generateTimeSlots(first.startTime, first.endTime, first.slotDurationMinutes || 30);
      }
      return ['09:00', '09:30', '10:00', '10:30', '11:00', '13:30', '14:00', '14:30', '15:00', '15:30'];
    }

    // Parse date safely without timezone offset shift
    const parts = selectedDate.split('-').map(Number);
    const localDate = new Date(parts[0], (parts[1] || 1) - 1, parts[2] || 1);
    const dayName = ['Minggu','Senin','Selasa','Rabu','Kamis','Jumat','Sabtu'][localDate.getDay()];

    const schedule = selectedDoctor.schedules?.find(s => s.day.toLowerCase() === dayName.toLowerCase());
    if (schedule) {
      const generated = generateTimeSlots(schedule.startTime, schedule.endTime, schedule.slotDurationMinutes || 30);
      if (generated.length > 0) return generated;
    }

    // Standard consultation clinic hours for this doctor when booked on another day
    const defaultStart = selectedDoctor.schedules?.[0]?.startTime || '09:00';
    const defaultEnd = selectedDoctor.schedules?.[0]?.endTime || '16:00';
    const fallbackSlots = generateTimeSlots(defaultStart, defaultEnd, 30);
    if (fallbackSlots.length > 0) return fallbackSlots;

    return ['08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00'];
  };

  const disabledDates = ['2026-01-01', '2026-08-17'];

  // Slot penuh ditentukan deterministik agar stabil antar render (mock).
  const FULL_SLOTS = useMemo(() => new Set(['09:00', '13:00']), []);

  const validateStep5 = () => {
    const newErrors: Record<string, string> = {};
    if (!form.fullName.trim()) newErrors.fullName = 'Nama wajib diisi';
    if (!form.email.trim()) newErrors.email = 'Email wajib diisi';
    else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = 'Format email tidak valid';
    if (!form.phoneNumber.trim()) newErrors.phoneNumber = 'No. telepon wajib diisi';
    else if (!/^\d{9,13}$/.test(form.phoneNumber.replace(/\D/g, ''))) newErrors.phoneNumber = 'Format no. telepon tidak valid';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (currentStep === 5 && !validateStep5()) return;
    if (currentStep === 6) {
      // Submit
      setLoading(true);
      setTimeout(() => {
        const appt = createAppointment({
          doctorId: selectedDoctor!.id,
          doctorName: selectedDoctor!.name,
          doctorSpecialization: selectedDoctor!.specializationName,
          serviceId: selectedService!.id,
          serviceName: selectedService!.name,
          date: selectedDate!,
          time: selectedTime!,
          location: selectedDoctor!.location,
          patient: {
            fullName: form.fullName,
            email: form.email,
            phoneNumber: form.phoneNumber,
            birthDate: form.birthDate,
            address: form.address,
            complaint: form.complaint,
          },
          patientId: user?.id,
        });
        setAppointmentId(appt.id);
        setLoading(false);
        setStep(7);
        addToast({ type: 'success', message: 'Appointment berhasil dibuat.' });
      }, 800);
      return;
    }
    setStep(currentStep + 1);
  };

  const handleBack = () => {
    if (currentStep > 1) setStep(currentStep - 1);
  };

  if (currentStep === 7) {
    return (
      <div className="max-w-lg mx-auto px-4 py-16 text-center">
        <div className="h-16 w-16 rounded-full bg-[var(--color-success)] flex items-center justify-center mx-auto mb-6">
          <Check className="h-8 w-8 text-white" />
        </div>
        <h1 className="text-2xl font-bold mb-2">Appointment Berhasil Dibuat</h1>
        <p className="text-[var(--color-text-secondary)] mb-6">Terima kasih telah membuat janji dengan Bahagia Medika</p>
        <div className="bg-[var(--color-surface)] rounded-xl p-6 mb-6 text-left">
          <p className="text-sm text-[var(--color-text-secondary)]">Dokter</p>
          <p className="font-medium">{selectedDoctor?.name}</p>
          <p className="text-sm text-[var(--color-text-secondary)] mt-2">Tanggal & Jam</p>
          <p className="font-medium">{selectedDate} · {selectedTime}</p>
          <p className="text-sm text-[var(--color-text-secondary)] mt-2">Nomor Referensi</p>
          <p className="font-bold text-[var(--color-primary)]">{appointmentId}</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/dashboard/appointment" className="w-full sm:w-auto">
            <Button variant="primary" className="w-full sm:w-auto">Lihat Detail Appointment</Button>
          </Link>
          <Link href="/" className="w-full sm:w-auto">
            <Button variant="outline" className="w-full sm:w-auto">Kembali ke Beranda</Button>
          </Link>
        </div>
      </div>
    );
  }

  if (!isAuthenticated || !authChecked) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center">
        <div className="w-16 h-16 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center mb-4 text-amber-600 mx-auto shadow-2xs">
          <Lock className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">Autentikasi Akun Pasien Diperlukan</h2>
        <p className="text-xs sm:text-sm text-gray-600 mb-6 leading-relaxed">
          Untuk menjaga keamanan rekam medis dan data konsultasi Anda, layanan buat janji temu dokter hanya dapat diakses oleh pasien yang telah masuk.
        </p>
        <Link
          href="/login?required=buat-janji"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[var(--color-primary)] text-white text-xs sm:text-sm font-bold shadow-md hover:bg-[var(--color-primary-dark)] transition-all w-full sm:w-auto"
        >
          <span>Masuk ke Akun Pasien</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {/* Progress Indicator */}
      <div className="mb-8 bg-white p-4 sm:p-5 rounded-2xl border border-[var(--color-border)] shadow-xs">
        <div className="hidden md:flex items-center w-full">
          {STEPS.map((step, i) => (
            <div key={step.num} className="flex items-center flex-1 last:flex-none">
              <div className="flex items-center gap-2 shrink-0">
                <div
                  className={`flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold transition-all ${
                    currentStep > step.num
                      ? 'bg-emerald-600 text-white shadow-2xs'
                      : currentStep === step.num
                      ? 'bg-[var(--color-primary)] text-white shadow-md ring-4 ring-[var(--color-primary)]/15 scale-105'
                      : 'bg-gray-100 text-gray-500 border border-gray-200'
                  }`}
                >
                  {currentStep > step.num ? <Check className="h-4 w-4 stroke-[3]" /> : step.num}
                </div>
                <span
                  className={`text-xs font-semibold tracking-tight ${
                    currentStep === step.num
                      ? 'text-[var(--color-primary)] font-bold'
                      : currentStep > step.num
                      ? 'text-gray-800'
                      : 'text-gray-400'
                  }`}
                >
                  {step.label}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <div
                  className={`flex-1 h-0.5 mx-2.5 transition-colors ${
                    currentStep > step.num ? 'bg-emerald-500' : 'bg-gray-200'
                  }`}
                />
              )}
            </div>
          ))}
        </div>
        <div className="md:hidden">
          <div className="flex items-center justify-between text-xs font-semibold text-gray-700 mb-1.5">
            <span>
              Langkah {currentStep} dari {STEPS.length}:{' '}
              <strong className="text-[var(--color-primary)]">{STEPS[currentStep - 1].label}</strong>
            </span>
            <span>{Math.round((currentStep / STEPS.length) * 100)}%</span>
          </div>
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-[var(--color-primary)] rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / STEPS.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Step Content */}
      <div className="bg-white rounded-2xl border border-[var(--color-border)] p-6 sm:p-8 shadow-xs">
        {/* Step 1: Pilih Layanan */}
        {currentStep === 1 && (
          <div>
            <div className="mb-5">
              <h2 className="text-lg sm:text-xl font-black text-gray-900">Pilih Layanan & Poliklinik</h2>
              <p className="text-xs text-gray-500 mt-0.5">
                Pilih spesialisasi atau poliklinik medis yang sesuai dengan kebutuhan konsultasi Anda.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {services.map((service) => (
                <button
                  key={service.id}
                  type="button"
                  onClick={() => setService(service)}
                  className={`text-left p-4 rounded-xl border-2 transition-all flex items-start justify-between cursor-pointer ${
                    selectedService?.id === service.id
                      ? 'border-[var(--color-primary)] bg-[var(--color-primary-light)]/60 shadow-xs ring-2 ring-[var(--color-primary)]/10'
                      : 'border-[var(--color-border)] hover:border-[var(--color-primary)]/40 bg-white hover:bg-slate-50/50'
                  }`}
                >
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-primary)] block mb-1">
                      {service.category}
                    </span>
                    <p className="font-bold text-sm text-[var(--color-text-primary)]">{service.name}</p>
                    <p className="text-xs text-[var(--color-text-secondary)] mt-1 line-clamp-2 leading-relaxed">
                      {service.shortDescription}
                    </p>
                  </div>
                  {selectedService?.id === service.id && (
                    <CheckCircle2 className="w-5 h-5 text-[var(--color-primary)] shrink-0 ml-2 mt-0.5" />
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Pilih Dokter */}
        {currentStep === 2 && (
          <div>
            <div className="mb-5">
              <h2 className="text-lg sm:text-xl font-black text-gray-900">Pilih Dokter Konsultan</h2>
              <p className="text-xs text-gray-500 mt-0.5">
                Dokter spesialis yang tersedia pada layanan <strong>{selectedService?.name}</strong>.
              </p>
            </div>
            {loading ? (
              <div className="space-y-3">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="h-20 bg-[var(--color-surface)] rounded-xl skeleton" />
                ))}
              </div>
            ) : doctors.length === 0 ? (
              <p className="text-[var(--color-text-secondary)] text-center py-8">
                Belum ada dokter tersedia untuk layanan ini.
              </p>
            ) : (
              <div className="space-y-3">
                {doctors.map((doctor) => (
                  <button
                    key={doctor.id}
                    type="button"
                    onClick={() => setDoctor(doctor)}
                    className={`w-full text-left p-4 rounded-xl border-2 transition-all flex items-center justify-between cursor-pointer ${
                      selectedDoctor?.id === doctor.id
                        ? 'border-[var(--color-primary)] bg-[var(--color-primary-light)]/60 shadow-xs ring-2 ring-[var(--color-primary)]/10'
                        : 'border-[var(--color-border)] hover:border-[var(--color-primary)]/40 bg-white hover:bg-slate-50/50'
                    }`}
                  >
                    <div className="flex items-center gap-3.5">
                      <div className="w-14 h-14 rounded-xl overflow-hidden bg-gray-100 shrink-0 border border-gray-100 shadow-2xs">
                        <img
                          src={doctor.photoUrl || 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200&h=200&fit=crop&crop=face'}
                          alt={doctor.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <span className="text-[10px] font-bold text-[var(--color-primary)] uppercase tracking-wider block">
                          {doctor.specializationName}
                        </span>
                        <p className="font-bold text-sm sm:text-base text-[var(--color-text-primary)]">{doctor.name}</p>
                        <p className="text-xs text-[var(--color-text-secondary)] mt-0.5">
                          {doctor.location} &bull; {doctor.experienceYears} tahun pengalaman klinis
                        </p>
                      </div>
                    </div>
                    {selectedDoctor?.id === doctor.id ? (
                      <CheckCircle2 className="w-5 h-5 text-[var(--color-primary)] shrink-0" />
                    ) : (
                      <div className="w-5 h-5 rounded-full border-2 border-gray-300 shrink-0" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Step 3: Pilih Tanggal */}
        {currentStep === 3 && (
          <div className="space-y-4">
            <div>
              <h2 className="text-lg font-bold text-gray-900">Pilih Tanggal Kunjungan</h2>
              <p className="text-xs text-gray-500 mt-0.5">
                Silakan pilih tanggal konsultasi rawat jalan yang sesuai dengan rencana Anda.
              </p>
            </div>

            {selectedDoctor && (
              <div className="p-3.5 bg-teal-50/80 border border-teal-200 rounded-xl text-xs space-y-1.5 shadow-2xs">
                <div className="flex items-center gap-2 text-[var(--color-primary)] font-bold">
                  <Stethoscope className="w-4 h-4 text-emerald-600" />
                  <span>Jadwal Dokter: {selectedDoctor.name}</span>
                </div>
                <p className="text-gray-700 font-medium">
                  Hari Praktik Rutin:{' '}
                  <span className="text-teal-900 font-bold">
                    {selectedDoctor.schedules.map((s) => `${s.day} (${s.startTime} - ${s.endTime})`).join(', ')}
                  </span>
                </p>
                <p className="text-[11px] text-gray-500">
                  Lokasi Poliklinik: {selectedDoctor.location} &bull; Reservasi terintegrasi antrean elektronik resmi.
                </p>
              </div>
            )}

            <DatePicker
              selectedDate={selectedDate}
              onSelect={(date) => {
                setDate(date);
              }}
              disabledDates={disabledDates}
            />

            {selectedDate && (
              <div className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-xl text-xs shadow-2xs">
                <span className="text-gray-500 font-medium">Tanggal Konsultasi Terpilih:</span>
                <span className="font-bold text-[var(--color-primary)] flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-teal-600" />
                  {formatDate(selectedDate)}
                </span>
              </div>
            )}
          </div>
        )}

        {/* Step 4: Pilih Jam */}
        {currentStep === 4 && (() => {
          const allSlots = getAvailableSlots();
          const morningSlots = allSlots.filter((slot) => {
            const h = parseInt(slot.split(':')[0], 10);
            return h < 12;
          });
          const afternoonSlots = allSlots.filter((slot) => {
            const h = parseInt(slot.split(':')[0], 10);
            return h >= 12;
          });

          return (
            <div className="space-y-5">
              <div>
                <h2 className="text-lg font-bold text-gray-900">Pilih Jam Konsultasi</h2>
                <p className="text-xs text-gray-500 mt-0.5">
                  Pilih waktu kunjungan yang tersedia pada antrean dokter untuk tanggal yang telah dipilih.
                </p>
              </div>

              {/* Consultation Summary Header */}
              <div className="p-3.5 bg-gray-50 border border-gray-200 rounded-xl flex flex-wrap items-center justify-between gap-3 text-xs">
                <div>
                  <p className="font-bold text-gray-900">{selectedDoctor?.name}</p>
                  <p className="text-[11px] text-gray-500">{selectedService?.name} &bull; {selectedDoctor?.location}</p>
                </div>
                {selectedDate && (
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-gray-200 rounded-lg font-bold text-[var(--color-primary)] shadow-2xs">
                    <Calendar className="w-3.5 h-3.5 text-teal-600" />
                    <span>{formatDate(selectedDate)}</span>
                  </div>
                )}
              </div>

              {/* Morning Session */}
              {morningSlots.length > 0 && (
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-gray-700 uppercase tracking-wider flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[var(--color-primary)]" />
                      Sesi Pagi (08:00 - 12:00)
                    </span>
                    <span className="text-[11px] text-gray-400 font-medium">Slot Konsultasi @30 Menit</span>
                  </div>

                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
                    {morningSlots.map((slot) => {
                      const isFull = FULL_SLOTS.has(slot);
                      const isSelected = selectedTime === slot;
                      return (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => !isFull && setTime(slot)}
                          disabled={isFull}
                          className={`py-2.5 px-2 rounded-xl text-xs font-bold border transition-all flex flex-col items-center justify-center gap-0.5 ${
                            isSelected
                              ? 'bg-[var(--color-primary)] text-white border-[var(--color-primary)] shadow-md ring-2 ring-[var(--color-primary)]/30'
                              : isFull
                              ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed line-through'
                              : 'bg-white hover:bg-teal-50/60 border-gray-200 text-gray-800 hover:border-[var(--color-primary)] cursor-pointer shadow-2xs active:scale-95'
                          }`}
                        >
                          <span className="text-sm font-black">{slot}</span>
                          <span className="text-[9px] font-normal opacity-80">
                            {isFull ? 'Penuh' : isSelected ? 'Dipilih' : 'Tersedia'}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Afternoon & Evening Session */}
              {afternoonSlots.length > 0 && (
                <div className="space-y-2.5 pt-3 border-t border-gray-100">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-gray-700 uppercase tracking-wider flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-amber-600" />
                      Sesi Siang & Sore (12:00 - 17:00)
                    </span>
                    <span className="text-[11px] text-gray-400 font-medium">Slot Konsultasi @30 Menit</span>
                  </div>

                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
                    {afternoonSlots.map((slot) => {
                      const isFull = FULL_SLOTS.has(slot);
                      const isSelected = selectedTime === slot;
                      return (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => !isFull && setTime(slot)}
                          disabled={isFull}
                          className={`py-2.5 px-2 rounded-xl text-xs font-bold border transition-all flex flex-col items-center justify-center gap-0.5 ${
                            isSelected
                              ? 'bg-[var(--color-primary)] text-white border-[var(--color-primary)] shadow-md ring-2 ring-[var(--color-primary)]/30'
                              : isFull
                              ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed line-through'
                              : 'bg-white hover:bg-teal-50/60 border-gray-200 text-gray-800 hover:border-[var(--color-primary)] cursor-pointer shadow-2xs active:scale-95'
                          }`}
                        >
                          <span className="text-sm font-black">{slot}</span>
                          <span className="text-[9px] font-normal opacity-80">
                            {isFull ? 'Penuh' : isSelected ? 'Dipilih' : 'Tersedia'}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Selected Time Confirmation Notification */}
              {selectedTime ? (
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-between text-xs text-emerald-900 shadow-2xs">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>
                      Waktu Terpilih: <strong>{selectedTime} WIB</strong> &bull; Estimasi durasi 30 menit
                    </span>
                  </div>
                  <span className="font-bold text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded">
                    Siap Lanjutkan
                  </span>
                </div>
              ) : (
                <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-800 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>Silakan klik salah satu jam di atas untuk menentukan jadwal konsultasi Anda.</span>
                </div>
              )}
            </div>
          );
        })()}

        {/* Step 5: Data Pasien */}
        {currentStep === 5 && (
          <div>
            <div className="mb-5">
              <h2 className="text-lg sm:text-xl font-black text-gray-900">Data Diri Pasien</h2>
              <p className="text-xs text-gray-500 mt-0.5">
                Pastikan data sesuai dengan kartu identitas (KTP/KK) untuk sinkronisasi Rekam Medis SATUSEHAT.
              </p>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Nama Lengkap Pasien"
                  placeholder="Sesuai KTP / Paspor"
                  required
                  value={form.fullName}
                  onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                  error={errors.fullName}
                />
                <Input
                  label="Alamat Email Pasien"
                  type="email"
                  placeholder="contoh@domain.com"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  error={errors.email}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Nomor WhatsApp / Telepon"
                  placeholder="081234567890"
                  required
                  value={form.phoneNumber}
                  onChange={(e) => setForm({ ...form, phoneNumber: e.target.value })}
                  error={errors.phoneNumber}
                />
                <Input
                  label="Tanggal Lahir Pasien"
                  type="date"
                  value={form.birthDate}
                  onChange={(e) => setForm({ ...form, birthDate: e.target.value })}
                />
              </div>

              <Textarea
                label="Alamat Domisili Pasien"
                placeholder="Nama jalan, RT/RW, Kelurahan, Kecamatan, Kota"
                rows={2}
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
              />

              <Textarea
                label="Keluhan Utama / Alasan Konsultasi"
                placeholder="Ceritakan singkat gejala yang Anda rasakan untuk membantu dokter mempersiapkan pemeriksaan..."
                rows={3}
                value={form.complaint}
                onChange={(e) => setForm({ ...form, complaint: e.target.value })}
              />
            </div>
          </div>
        )}

        {/* Step 6: Review - Official Voucher Preview */}
        {currentStep === 6 && (
          <div className="space-y-6">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-primary)] bg-[var(--color-primary-light)] px-2.5 py-0.5 rounded-full">
                Konfirmasi Terakhir
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-gray-900 mt-2">
                Pratinjau Tiket Reservasi Konsultasi
              </h2>
              <p className="text-xs text-gray-500 mt-0.5">
                Periksa kembali data jadwal dan identitas sebelum mengonfirmasi nomor antrean digital Anda.
              </p>
            </div>

            {/* Official Appointment Voucher Card */}
            <div className="bg-gradient-to-br from-slate-50 to-teal-50/40 rounded-2xl border-2 border-teal-600/30 overflow-hidden shadow-sm">
              <div className="p-5 sm:p-6 bg-[var(--color-primary)] text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-xs font-bold uppercase tracking-widest text-teal-200">
                      RS Bahagia Medika Jakarta
                    </span>
                  </div>
                  <h3 className="text-lg font-black text-white mt-0.5">
                    Tiket Rawat Jalan Poliklinik Terpadu
                  </h3>
                </div>
                <div className="sm:text-right">
                  <span className="text-[11px] text-teal-200 block">Metode Penjaminan:</span>
                  <span className="text-xs font-bold text-white bg-white/20 px-2.5 py-0.5 rounded-md inline-block mt-0.5">
                    Umum / Asuransi / BPJS
                  </span>
                </div>
              </div>

              <div className="p-5 sm:p-6 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-4 border-b border-gray-200/80">
                  <div>
                    <span className="text-[11px] text-gray-500 font-semibold block uppercase">Dokter Konsultan:</span>
                    <p className="text-sm font-black text-gray-900 mt-0.5">{selectedDoctor?.name}</p>
                    <p className="text-xs text-[var(--color-primary)] font-bold">{selectedDoctor?.specializationName}</p>
                    <p className="text-[11px] text-gray-500 mt-0.5">{selectedDoctor?.location}</p>
                  </div>
                  <div>
                    <span className="text-[11px] text-gray-500 font-semibold block uppercase">Jadwal Sesi Konsultasi:</span>
                    <p className="text-sm font-black text-gray-900 mt-0.5 flex items-center gap-1.5">
                      <Calendar className="w-4 h-4 text-teal-600" />
                      <span>{selectedDate && formatDate(selectedDate)}</span>
                    </p>
                    <p className="text-xs font-bold text-gray-800 flex items-center gap-1.5 mt-0.5">
                      <Clock className="w-4 h-4 text-amber-600" />
                      <span>Pukul {selectedTime} WIB</span>
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <span className="text-[11px] text-gray-500 font-semibold block uppercase">Data Pasien:</span>
                    <p className="text-sm font-bold text-gray-900 mt-0.5">{form.fullName}</p>
                    <p className="text-xs text-gray-600">{form.phoneNumber} &bull; {form.email}</p>
                  </div>
                  <div>
                    <span className="text-[11px] text-gray-500 font-semibold block uppercase">Keluhan Awal:</span>
                    <p className="text-xs text-gray-700 italic mt-0.5 line-clamp-2">
                      {form.complaint ? `"${form.complaint}"` : 'Konsultasi dan kontrol medis rutin'}
                    </p>
                  </div>
                </div>

                <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-800 space-y-1 mt-2">
                  <p className="font-bold flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-600" />
                    <span>Petunjuk Kunjungan Pasien:</span>
                  </p>
                  <p className="text-[11px] leading-relaxed">
                    Harap tiba di Lobi Utama Lantai 1 sekurang-kurangnya 15 menit sebelum sesi untuk verifikasi berkas dan cetak nomor antrean di Kiosk Mandiri.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between gap-3 mt-6">
        <Button variant="outline" onClick={handleBack} disabled={currentStep === 1} className="text-xs sm:text-sm">
          <ChevronLeft className="h-4 w-4" /> Kembali
        </Button>
        <Button
          variant="primary"
          onClick={handleNext}
          isLoading={loading}
          className="text-xs sm:text-sm shadow-md"
          disabled={
            (currentStep === 1 && !selectedService) ||
            (currentStep === 2 && !selectedDoctor) ||
            (currentStep === 3 && !selectedDate) ||
            (currentStep === 4 && !selectedTime)
          }
        >
          {currentStep === 6 ? 'Konfirmasi & Terbitkan Tiket' : 'Lanjutkan'}
          {currentStep < 6 && <ChevronRight className="h-4 w-4" />}
        </Button>
      </div>
    </div>
  );
}

export default function BuatJanjiPage() {
  return (
    <Suspense fallback={
      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="skeleton h-8 w-48 mb-4" />
        <div className="skeleton h-64 w-full" />
      </div>
    }>
      <BuatJanjiContent />
    </Suspense>
  );
}
