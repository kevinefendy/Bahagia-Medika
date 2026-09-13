import Link from 'next/link';
import Badge from '@/components/ui/Badge';
import { Calendar, Clock } from 'lucide-react';
import type { Appointment } from '@/types/appointment';
import { formatDate } from '@/lib/utils/format';

const statusVariant: Record<string, 'success' | 'warning' | 'error' | 'info'> = {
  Confirmed: 'success',
  Pending: 'warning',
  Completed: 'info',
  Cancelled: 'error',
};

interface AppointmentCardProps {
  appointment: Appointment;
}

export default function AppointmentCard({ appointment }: AppointmentCardProps) {
  return (
    <Link
      href={`/dashboard/appointment/${appointment.id}`}
      className="block rounded-xl border border-[var(--color-border)] p-4 hover:shadow-sm transition-all bg-white"
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="font-medium text-[var(--color-text-primary)]">{appointment.doctorName}</p>
          <p className="text-sm text-[var(--color-text-secondary)]">{appointment.serviceName}</p>
        </div>
        <Badge variant={statusVariant[appointment.status]} label={appointment.status} />
      </div>
      <div className="flex items-center gap-4 mt-3 text-sm text-[var(--color-text-secondary)]">
        <span className="flex items-center gap-1">
          <Calendar className="h-4 w-4" />
          {formatDate(appointment.date)}
        </span>
        <span className="flex items-center gap-1">
          <Clock className="h-4 w-4" />
          {appointment.time}
        </span>
      </div>
    </Link>
  );
}
