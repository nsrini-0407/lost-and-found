'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { cn } from '@/lib/utils';

const NAV_LINKS = [
  { href: '/',       label: 'Home'        },
  { href: '/items',  label: 'Browse'      },
  { href: '/submit', label: 'Submit Item' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header
      className="sticky top-0 z-50 bg-navy border-b border-white/6"
      role="banner"
    >
      <nav
        className="max-w-6xl mx-auto px-4 flex items-center justify-between h-14"
        aria-label="Main navigation"
      >
        {/* ── Logo ── */}
        <Link
          href="/"
          className="flex flex-col leading-none gap-0.5"
          aria-label="L&F Services — home"
        >
          <span className="text-amber text-[9px] font-medium tracking-[0.14em] uppercase">
            L&F
          </span>
          <span className="font-display text-white text-[17px] leading-none">
            Services
          </span>
        </Link>

        {/* ── Desktop links ── */}
        <ul className="hidden md:flex items-center gap-1" role="list">
          {NAV_LINKS.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className={cn(
                  'px-4 py-2 text-sm rounded-sm transition-colors duration-150',
                  pathname === href
                    ? 'text-amber bg-white/5'
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                )}
                aria-current={pathname === href ? 'page' : undefined}
              >
                {label}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="/admin"
              className="ml-3 px-4 py-2 text-sm font-semibold bg-amber text-navy
                         rounded-sm hover:bg-amber/90 transition-colors duration-150"
            >
              Admin
            </Link>
          </li>
        </ul>

        {/* ── Mobile menu button ── */}
        <button
          className="md:hidden text-white p-2 rounded-sm"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
        >
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
            {menuOpen ? (
              <>
                <line x1="4" y1="4" x2="18" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <line x1="18" y1="4" x2="4" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </>
            ) : (
              <>
                <line x1="3" y1="6"  x2="19" y2="6"  stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <line x1="3" y1="11" x2="19" y2="11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <line x1="3" y1="16" x2="19" y2="16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </>
            )}
          </svg>
        </button>
      </nav>

      {/* ── Mobile menu ── */}
      {menuOpen && (
        <div
          id="mobile-menu"
          className="md:hidden bg-navy border-t border-white/6 px-4 pb-4"
        >
          <ul className="flex flex-col gap-1 pt-2" role="list">
            {NAV_LINKS.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  className={cn(
                    'block px-4 py-3 text-sm rounded-sm',
                    pathname === href
                      ? 'text-amber bg-white/5'
                      : 'text-white/60 hover:text-white hover:bg-white/5'
                  )}
                  aria-current={pathname === href ? 'page' : undefined}
                >
                  {label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/admin"
                onClick={() => setMenuOpen(false)}
                className="block px-4 py-3 text-sm font-semibold text-amber"
              >
                Admin Dashboard
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}