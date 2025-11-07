'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

type Props = { herf: string; children: React.ReactNode };

export default function NavLink({ herf, children }: Props) {
  const pathname = usePathname();
  const active = pathname === herf || (herf !== '/' && pathname.startsWith(herf));
  return (
    <Link
      href={herf}
      className={cn(
        'block rounded-xl px-3 py-2 text-sm transition-colors',
        active
          ? 'bg-gray-100 font-medium text-gray-900'
          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
      )}
      aria-current={active ? 'page' : undefined}
    >
      {children}
    </Link>
  );
}
