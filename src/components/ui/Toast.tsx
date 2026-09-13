'use client';
import { cn } from '@/lib/utils/cn';
import { CheckCircle, XCircle, Info, AlertTriangle, X } from 'lucide-react';
import { useUIStore, type Toast as ToastType } from '@/lib/store/useUIStore';

function ToastItem({ toast }: { toast: ToastType }) {
  const removeToast = useUIStore((s) => s.removeToast);

  const icons = {
    success: <CheckCircle className="h-5 w-5 text-[var(--color-success)]" />,
    error: <XCircle className="h-5 w-5 text-[var(--color-error)]" />,
    info: <Info className="h-5 w-5 text-[var(--color-primary)]" />,
    warning: <AlertTriangle className="h-5 w-5 text-[var(--color-warning)]" />,
  };

  const bgColors = {
    success: 'border-[var(--color-success)]/20 bg-[var(--color-success-light)]',
    error: 'border-[var(--color-error)]/20 bg-[var(--color-error-light)]',
    info: 'border-[var(--color-primary)]/20 bg-[var(--color-primary-light)]',
    warning: 'border-[var(--color-warning)]/20 bg-[var(--color-warning-light)]',
  };

  return (
    <div
      className={cn(
        'flex items-start gap-3 p-4 rounded-lg border shadow-lg min-w-[300px] max-w-[400px] animate-in slide-in-from-right duration-300',
        bgColors[toast.type]
      )}
    >
      {icons[toast.type]}
      <p className="flex-1 text-sm text-[var(--color-text-primary)]">{toast.message}</p>
      <button
        onClick={() => removeToast(toast.id)}
        className="text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}

export default function ToastContainer() {
  const toasts = useUIStore((s) => s.toasts);

  return (
    <div className="fixed top-4 right-4 z-[100] flex flex-col gap-2">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} />
      ))}
    </div>
  );
}
