'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

const NAV_LINKS = [
  { href: '/', key: 'home' },
  { href: '/about', key: 'about' },
  { href: '/projects', key: 'projects' },
  { href: '/services', key: 'services' },
  { href: '/contact', key: 'contact' },
] as const;

export function Navigation() {
  const t = useTranslations('nav');
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 40);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          scrolled ? 'bg-[var(--color-bg)]/95 backdrop-blur-sm' : ''
        }`}
      >
        <div className="container flex items-center justify-between h-20 lg:h-24">
          {/* Logo / Wordmark */}
          <Link href="/" className="relative z-50" onClick={() => setMenuOpen(false)}>
            <span
              className="font-[var(--font-display)] text-xl lg:text-2xl tracking-[0.08em] uppercase"
              style={{ fontFamily: 'var(--font-display), serif', fontWeight: 300 }}
            >
              Studio Echelle
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-10" role="navigation">
            {NAV_LINKS.map(({ href, key }) => (
              <Link
                key={key}
                href={href}
                className="text-label text-[var(--color-fg)] hover:text-[var(--color-accent)] transition-colors duration-300"
              >
                {t(key)}
              </Link>
            ))}
          </nav>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden relative z-50 w-8 h-8 flex flex-col justify-center items-center gap-1.5"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            <span
              className={`block w-6 h-px bg-[var(--color-fg)] transition-all duration-300 ${
                menuOpen ? 'rotate-45 translate-y-[3.5px]' : ''
              }`}
            />
            <span
              className={`block w-6 h-px bg-[var(--color-fg)] transition-all duration-300 ${
                menuOpen ? '-rotate-45 -translate-y-[3.5px]' : ''
              }`}
            />
          </button>
        </div>
      </header>

      {/* Mobile overlay menu */}
      <div
        className={`fixed inset-0 z-30 bg-[var(--color-bg)] flex flex-col items-center justify-center transition-all duration-500 lg:hidden ${
          menuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <nav className="flex flex-col items-center gap-8">
          {NAV_LINKS.map(({ href, key }) => (
            <Link
              key={key}
              href={href}
              className="text-display text-[var(--color-fg)] hover:text-[var(--color-accent)] transition-colors duration-300"
              onClick={() => setMenuOpen(false)}
            >
              {t(key)}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
}
