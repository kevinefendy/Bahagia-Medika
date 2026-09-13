import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils/cn';

type LogoProps = {
  variant?: 'full' | 'icon-only' | 'text-only';
  size?: 'sm' | 'md' | 'lg';
  href?: string | null;
  light?: boolean;
  className?: string;
  priority?: boolean;
};

const SIZES = {
  sm: { width: 32, height: 32, text: 'text-sm' },
  md: { width: 40, height: 40, text: 'text-lg' },
  lg: { width: 56, height: 56, text: 'text-xl' },
};

export default function Logo({
  variant = 'full',
  size = 'md',
  href = '/',
  light = false,
  className,
  priority = false,
}: LogoProps) {
  const dims = SIZES[size];

  const logoImage = (
    <Image
      src="/logo-bahagia-medika.png"
      alt="Bahagia Medika"
      width={dims.width}
      height={dims.height}
      className="shrink-0 object-contain"
      style={{ width: dims.width, height: dims.height }}
      priority={priority}
    />
  );

  const brandText = (
    <span
      className={cn(
        'font-bold leading-none',
        dims.text,
        light ? 'text-white' : 'text-[var(--color-text-primary)]'
      )}
    >
      Bahagia Medika
    </span>
  );

  const content = (
    <>
      {variant !== 'text-only' && logoImage}
      {variant !== 'icon-only' && brandText}
    </>
  );

  const wrapperClass = cn('flex items-center gap-2.5 shrink-0', className);

  if (href === null) {
    return <div className={wrapperClass}>{content}</div>;
  }

  return (
    <Link href={href} className={wrapperClass} aria-label="Bahagia Medika - Beranda">
      {content}
    </Link>
  );
}
