import { cn } from '@/lib/utils/cn';

interface BadgeProps {
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info' | 'outline';
  label: string;
  className?: string;
}

export default function Badge({ variant = 'default', label, className }: BadgeProps) {
  const variants = {
    default: 'bg-[var(--color-surface)] text-[var(--color-text-secondary)]',
    success: 'bg-[var(--color-success-light)] text-[var(--color-success)]',
    warning: 'bg-[var(--color-warning-light)] text-[var(--color-warning)]',
    error: 'bg-[var(--color-error-light)] text-[var(--color-error)]',
    info: 'bg-[var(--color-primary-light)] text-[var(--color-primary)]',
    outline: 'border border-[var(--color-border)] text-[var(--color-text-secondary)]',
  };

  return (
    <span className={cn('inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium', variants[variant], className)}>
      {label}
    </span>
  );
}
