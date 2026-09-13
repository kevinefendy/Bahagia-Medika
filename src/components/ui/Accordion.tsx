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
    <div className="space-y-2.5">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div
            key={index}
            className={cn(
              'border rounded-xl overflow-hidden transition-colors duration-200 bg-white',
              isOpen ? 'border-[var(--color-primary)] shadow-xs' : 'border-[var(--color-border)]'
            )}
          >
            <button
              onClick={() => setOpenIndex(isOpen ? null : index)}
              className="w-full flex items-center justify-between px-5 py-3.5 text-left text-sm font-semibold text-[var(--color-text-primary)] hover:bg-[var(--color-surface)]/50 transition-colors cursor-pointer"
            >
              <span className={cn('transition-colors', isOpen && 'text-[var(--color-primary)]')}>
                {item.question}
              </span>
              <ChevronDown
                className={cn(
                  'h-4 w-4 text-[var(--color-text-secondary)] transition-transform duration-300 ease-out shrink-0 ml-2',
                  isOpen && 'rotate-180 text-[var(--color-primary)]'
                )}
              />
            </button>
            <div
              className={cn(
                'grid transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]',
                isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
              )}
            >
              <div className="overflow-hidden">
                <div className="px-5 pb-4 pt-1 text-sm text-[var(--color-text-secondary)] leading-relaxed border-t border-gray-100">
                  {item.answer}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
