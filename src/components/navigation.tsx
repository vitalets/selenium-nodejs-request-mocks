'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const routes = [
  { href: '/', title: 'client-side fetch' },
  { href: '/ssr', title: 'server-side fetch' },
];

export default function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="fetch-nav" aria-label="Fetch mode">
      {routes.map((route) =>
        pathname === route.href ? (
          <span className="active" aria-current="page" key={route.href}>
            {route.title}
          </span>
        ) : (
          <Link href={route.href} key={route.href}>
            {route.title}
          </Link>
        ),
      )}
    </nav>
  );
}
