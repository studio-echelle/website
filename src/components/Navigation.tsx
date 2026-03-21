'use client';

import { useState, useEffect, useCallback } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { usePathname } from 'next/navigation';

const NAV_LINKS = [
  { href: '/about', key: 'about' },
  { href: '/projects', key: 'projects' },
  { href: '/services', key: 'services' },
  { href: '/contact', key: 'contact' },
];

export function Navigation() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 40);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  const prefix = `/${locale}`;
  const altLocale = locale === 'en' ? 'ar' : 'en';
  const switchUrl = pathname.replace(`/${locale}`, `/${altLocale}`);

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-40 transition-[background-color,backdrop-filter] duration-500 border-b border-white/[0.08] ${
          scrolled
            ? 'bg-[var(--color-fg)]/80 backdrop-blur-md'
            : ''
        }`}
      >
        <div className="flex items-center justify-between h-[80px]" style={{ paddingInline: '32px' }}>
          <a href={prefix} className="relative z-50 flex items-center gap-2.5" onClick={closeMenu}>
            <span className="w-[4px] h-[4px] rounded-full bg-[var(--color-accent)] shrink-0" />
            <span
              className="text-[18px] lg:text-[20px] tracking-[0.1em] uppercase text-[var(--color-bg)]"
              style={{ fontFamily: 'var(--font-display), serif', fontWeight: 300 }}
            >
              Studio Échelle
            </span>
          </a>

          <nav className="hidden lg:flex items-center gap-10">
            {NAV_LINKS.map(({ href, key }) => (
              <a
                key={key}
                href={`${prefix}${href}`}
                className="text-[11px] font-medium uppercase tracking-[0.15em] text-[var(--color-bg)]/60 hover:text-[var(--color-bg)] transition-colors duration-300 relative after:absolute after:bottom-[-4px] after:left-0 after:h-px after:bg-[var(--color-accent)] after:transition-[width] after:duration-300 after:w-0 hover:after:w-full"
              >
                {t(key)}
              </a>
            ))}

            <a
              href={switchUrl}
              className="text-[11px] font-medium uppercase tracking-[0.15em] text-[var(--color-mid)] hover:text-[var(--color-bg)] transition-colors duration-300 ms-2"
              aria-label={locale === 'en' ? 'Switch to Arabic' : 'Switch to English'}
            >
              {locale === 'en' ? 'عربي' : 'EN'}
            </a>
          </nav>

          <button
            className="lg:hidden relative z-50 w-10 h-10 flex flex-col justify-center items-center gap-[6px]"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            <span
              className={`block w-6 h-[1.5px] bg-[var(--color-bg)] transition-all duration-300 origin-center ${
                menuOpen ? 'rotate-45 translate-y-[3.75px]' : ''
              }`}
            />
            <span
              className={`block w-6 h-[1.5px] bg-[var(--color-bg)] transition-all duration-300 origin-center ${
                menuOpen ? '-rotate-45 -translate-y-[3.75px]' : ''
              }`}
            />
          </button>
        </div>
      </header>

      <div
        className={`fixed inset-0 z-30 bg-[var(--color-fg)] transition-opacity duration-500 lg:hidden ${
          menuOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden={!menuOpen}
      >
        <div className="flex flex-col items-center justify-center h-full gap-10">
          <nav className="flex flex-col items-center gap-8">
            {[{ href: '', key: 'home' }, ...NAV_LINKS].map(({ href, key }) => (
              <a
                key={key}
                href={`${prefix}${href ? href : ''}`}
                className="text-display text-[var(--color-bg)] hover:text-[var(--color-accent)] transition-colors duration-300"
                onClick={closeMenu}
              >
                {t(key)}
              </a>
            ))}
          </nav>

          <a
            href={switchUrl}
            className="text-label text-[var(--color-mid)] hover:text-[var(--color-bg)] transition-colors duration-300 mt-4"
          >
            {locale === 'en' ? 'عربي' : 'English'}
          </a>
        </div>
      </div>
    </>
  );
}
