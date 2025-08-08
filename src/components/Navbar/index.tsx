'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';

const routes = [
  { label: 'Início', path: '/' },
  { label: 'Transferências', path: '/transferencias' },
  { label: 'Investimentos', path: '/investimentos' },
  { label: 'Outros serviços', path: '/servicos' },
];

export const Navbar = () => {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="w-full h-full">
      <div className="md:hidden hidden sm:flex justify-center items-center gap-18 py-4 text-sm sm:text-base bg-transparent">
        {routes.map((route) => (
          <Link
            key={route.path}
            href={route.path}
            className={`relative font-medium text-text-dark hover:text-green-600 transition ${
              isActive(route.path) ? 'text-green-600 font-semibold' : ''}`
            }
          >
            {route.label}
            {isActive(route.path) && (
              <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-green-600 rounded-sm" />
            )}
          </Link>
        ))}
      </div>

      <div className="hidden md:flex w-full h-full flex-col items-center gap-6 py-8 bg-white text-sm">
        {routes.map((route) => (
          <Link
            key={route.path}
            href={route.path}
            className={`w-full text-center font-medium text-black hover:text-green-600 transition border-b border-gray-200 pb-2 ${
              isActive(route.path) ? 'text-green-600 font-semibold' : ''
            }`}
          >
            {route.label}
          </Link>
        ))}
      </div>
    </nav>
  );
};
