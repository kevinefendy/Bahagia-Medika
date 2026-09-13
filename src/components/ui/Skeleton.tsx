import { cn } from '@/lib/utils/cn';

interface SkeletonProps {
  className?: string;
  count?: number;
}

export default function Skeleton({ className, count = 1 }: SkeletonProps) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className={cn('skeleton rounded-lg', className)}
        />
      ))}
    </>
  );
}

export function CardSkeleton() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden space-y-4 flex flex-col justify-between h-full">
      <Skeleton className="w-full aspect-[16/10]" />
      <div className="p-5 sm:p-6 pt-0 space-y-3 flex-1 flex flex-col">
        <Skeleton className="h-3.5 w-1/4" />
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="h-11 w-full rounded-xl mt-auto pt-2" />
      </div>
    </div>
  );
}


export function DoctorCardSkeleton() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden space-y-4">
      <Skeleton className="w-full aspect-[4/3.8] sm:aspect-[4/4]" />
      <div className="p-5 sm:p-6 pt-0 space-y-3 text-center">
        <Skeleton className="h-4 w-1/3 mx-auto" />
        <Skeleton className="h-7 w-3/4 mx-auto" />
        <Skeleton className="h-11 w-full rounded-xl mt-4" />
      </div>
    </div>
  );
}

export function TableSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex gap-4 p-4 border border-[var(--color-border)] rounded-lg">
          <Skeleton className="h-10 w-10 rounded-full" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-3 w-1/2" />
          </div>
          <Skeleton className="h-6 w-20 rounded-full" />
        </div>
      ))}
    </div>
  );
}
