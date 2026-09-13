import Button from './Button';
import { FileX } from 'lucide-react';

interface EmptyStateProps {
  title: string;
  description?: string;
  ctaLabel?: string;
  onCtaClick?: () => void;
}

export default function EmptyState({ title, description, ctaLabel, onCtaClick }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      <div className="h-16 w-16 rounded-full bg-[var(--color-surface)] flex items-center justify-center mb-4">
        <FileX className="h-8 w-8 text-[var(--color-text-secondary)]" />
      </div>
      <h3 className="text-lg font-medium text-[var(--color-text-primary)] mb-1">{title}</h3>
      {description && (
        <p className="text-sm text-[var(--color-text-secondary)] mb-4 max-w-sm">{description}</p>
      )}
      {ctaLabel && onCtaClick && (
        <Button onClick={onCtaClick} variant="primary">
          {ctaLabel}
        </Button>
      )}
    </div>
  );
}
