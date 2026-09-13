'use client';
import { cn } from '@/lib/utils/cn';

interface Tab {
  id: string;
  label: string;
  count?: number;
}

interface TabsProps {
  tabs: Tab[];
  activeTab: string;
  onChange: (tabId: string) => void;
}

export default function Tabs({ tabs, activeTab, onChange }: TabsProps) {
  return (
    <div className="flex border-b border-[var(--color-border)] overflow-x-auto scrollbar-none flex-nowrap -mx-4 px-4 sm:mx-0 sm:px-0">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={cn(
            'px-4 py-3 text-xs sm:text-sm font-medium border-b-2 transition-colors -mb-px whitespace-nowrap shrink-0',
            activeTab === tab.id
              ? 'border-[var(--color-primary)] text-[var(--color-primary)] font-bold'
              : 'border-transparent text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
          )}
        >
          {tab.label}
          {tab.count !== undefined && (
            <span className={cn(
              'ml-2 px-2 py-0.5 rounded-full text-xs',
              activeTab === tab.id
                ? 'bg-[var(--color-primary-light)] text-[var(--color-primary)]'
                : 'bg-[var(--color-surface)] text-[var(--color-text-secondary)]'
            )}>
              {tab.count}
            </span>
          )}
        </button>
      ))}
    </div>
  );
}
