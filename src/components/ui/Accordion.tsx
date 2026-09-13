'use client';
import { cn } from '@/lib/utils/cn';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

interface AccordionItem {
  question: string;
  answer: string;
}

interface AccordionProps {
  items: AccordionItem[];
}

export default function Accordion({ items }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-2">
      {items.map((item, index) => (
        <div key={index} className="border border-[var(--color-border)] rounded-lg overflow-hidden">
          <button
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            className="w-full flex items-center justify-between px-4 py-3 text-left text-sm font-medium text-[var(--color-text-primary)] hover:bg-[var(--color-surface)] transition-colors"
          >
            {item.question}
            <ChevronDown
              className={cn(
                'h-4 w-4 text-[var(--color-text-secondary)] transition-transform',
                openIndex === index && 'rotate-180'
              )}
            />
          </button>
          {openIndex === index && (
            <div className="px-4 pb-4 text-sm text-[var(--color-text-secondary)]">
              {item.answer}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
