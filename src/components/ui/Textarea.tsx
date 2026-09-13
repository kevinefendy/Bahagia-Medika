'use client';
import { cn } from '@/lib/utils/cn';
import { TextareaHTMLAttributes, forwardRef } from 'react';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
  maxLength?: number;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, helperText, maxLength, id, value, ...props }, ref) => {
    const textareaId = id || label?.toLowerCase().replace(/\s+/g, '-');
    const currentLength = typeof value === 'string' ? value.length : 0;

    return (
      <div className="w-full">
        {label && (
          <label htmlFor={textareaId} className="block text-sm font-medium text-[var(--color-text-primary)] mb-1.5">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          maxLength={maxLength}
          value={value}
          className={cn(
            'w-full rounded-lg border bg-white px-4 py-2.5 text-sm transition-colors resize-none',
            'placeholder:text-[var(--color-text-secondary)]',
            'focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-opacity-30 focus:border-[var(--color-primary)]',
            'disabled:bg-[var(--color-surface)] disabled:cursor-not-allowed',
            error ? 'border-[var(--color-error)]' : 'border-[var(--color-border)]',
            className
          )}
          {...props}
        />
        <div className="flex justify-between mt-1">
          {error ? (
            <p className="text-xs text-[var(--color-error)]">{error}</p>
          ) : helperText ? (
            <p className="text-xs text-[var(--color-text-secondary)]">{helperText}</p>
          ) : (
            <span />
          )}
          {maxLength && (
            <p className="text-xs text-[var(--color-text-secondary)]">{currentLength}/{maxLength}</p>
          )}
        </div>
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';
export default Textarea;
