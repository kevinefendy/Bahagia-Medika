'use client';
import { cn } from '@/lib/utils/cn';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';

interface DatePickerProps {
  selectedDate: string | null;
  onSelect: (date: string) => void;
  disabledDates?: string[];
  minDate?: string;
}

const DAYS = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];
const MONTHS = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}

function formatDateStr(year: number, month: number, day: number) {
  return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}

export default function DatePicker({ selectedDate, onSelect, disabledDates = [], minDate }: DatePickerProps) {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());

  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const firstDay = getFirstDayOfMonth(currentYear, currentMonth);

  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  return (
    <div className="bg-white border border-[var(--color-border)] rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <button onClick={prevMonth} className="p-1 hover:bg-[var(--color-surface)] rounded">
          <ChevronLeft className="h-4 w-4" />
        </button>
        <span className="text-sm font-medium">{MONTHS[currentMonth]} {currentYear}</span>
        <button onClick={nextMonth} className="p-1 hover:bg-[var(--color-surface)] rounded">
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
      <div className="grid grid-cols-7 gap-1">
        {DAYS.map((day) => (
          <div key={day} className="text-center text-xs font-medium text-[var(--color-text-secondary)] py-1">
            {day}
          </div>
        ))}
        {Array.from({ length: firstDay }).map((_, i) => (
          <div key={`empty-${i}`} />
        ))}
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const day = i + 1;
          const dateStr = formatDateStr(currentYear, currentMonth, day);
          const isDisabled = disabledDates.includes(dateStr) || (minDate && dateStr < minDate) || dateStr < formatDateStr(today.getFullYear(), today.getMonth(), today.getDate());
          const isSelected = selectedDate === dateStr;
          const isToday = dateStr === formatDateStr(today.getFullYear(), today.getMonth(), today.getDate());

          return (
            <button
              key={day}
              onClick={() => !isDisabled && onSelect(dateStr)}
              disabled={isDisabled}
              className={cn(
                'h-9 w-full rounded-lg text-sm transition-colors',
                isSelected && 'bg-[var(--color-primary)] text-white',
                !isSelected && isToday && 'ring-1 ring-[var(--color-primary)] text-[var(--color-primary)]',
                !isSelected && !isDisabled && 'hover:bg-[var(--color-surface)]',
                isDisabled && 'text-[var(--color-text-secondary)] opacity-40 cursor-not-allowed'
              )}
            >
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );
}
