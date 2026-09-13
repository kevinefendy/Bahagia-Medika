import Button from './Button';
import { AlertTriangle } from 'lucide-react';

interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
}

export default function ErrorState({
  message = 'Data gagal dimuat. Silakan coba lagi.',
  onRetry,
}: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      <div className="h-16 w-16 rounded-full bg-[var(--color-error-light)] flex items-center justify-center mb-4">
        <AlertTriangle className="h-8 w-8 text-[var(--color-error)]" />
      </div>
      <h3 className="text-lg font-medium text-[var(--color-text-primary)] mb-1">Terjadi Kesalahan</h3>
      <p className="text-sm text-[var(--color-text-secondary)] mb-4 max-w-sm">{message}</p>
      {onRetry && (
        <Button onClick={onRetry} variant="outline">
          Coba Lagi
        </Button>
      )}
    </div>
  );
}
