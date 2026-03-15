'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

const FOOTER_NAV = [
  { href: '/about' as const, key: 'about' },
  { href: '/projects' as const, key: 'projects' },
  { href: '/services' as const, key: 'services' },
  { href: '/contact' as const, key: 'contact' },
];

export function Footer() {
  const t = useTranslations('nav');
  const tc = useTranslations('common');

  return (
    <footer className="bg-[var(--color-dark)] text-[var(--color-bg)]">
      {/* Main footer */}
      <div className="container py-20 lg:py-28">
        <div className="grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-y-14 gap-x-[var(--gutter)]">
          {/* Brand column */}
          <div className="col-span-4 lg:col-span-5">
            <Link href="/">
              <span
                className="text-[22px] lg:text-[28px] tracking-[0.1em] uppercase"
                style={{ fontFamily: 'var(--font-display), serif', fontWeight: 300 }}
              >
                Studio Échelle
              </span>
            </Link>
            <p className="text-[15px] leading-relaxed text-[var(--color-mid)] mt-6 max-w-sm">
              We design with love, for form, for material, and for the people
              who live with our work.
            </p>
          </div>

          {/* Navigation */}
          <div className="col-span-2 lg:col-span-2 lg:col-start-7">
            <h4 className="text-label text-[var(--color-mid)] mb-5">Navigate</h4>
            <nav className="flex flex-col gap-3">
              {FOOTER_NAV.map(({ href, key }) => (
                <Link
                  key={key}
                  href={href}
                  className="text-[14px] text-[var(--color-bg)]/70 hover:text-[var(--color-accent-hover)] transition-colors duration-300"
                >
                  {t(key)}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div className="col-span-2 lg:col-span-3 lg:col-start-10">
            <h4 className="text-label text-[var(--color-mid)] mb-5">Contact</h4>
            <div className="flex flex-col gap-3 text-[14px]">
              <a
                href="mailto:hello@studioechelle.com"
                className="text-[var(--color-bg)]/70 hover:text-[var(--color-accent-hover)] transition-colors duration-300"
              >
                hello@studioechelle.com
              </a>
              <a
                href="tel:+97451218333"
                className="text-[var(--color-bg)]/70 hover:text-[var(--color-accent-hover)] transition-colors duration-300"
              >
                +974 5121 8333
              </a>
              <p className="text-[var(--color-mid)] mt-1">
                The Pearl, Doha, Qatar
              </p>

              {/* Socials */}
              <div className="flex gap-5 mt-3">
                <a
                  href="https://instagram.com/studioechelle"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--color-mid)] hover:text-[var(--color-accent-hover)] transition-colors duration-300"
                  aria-label="Instagram"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" />
                    <circle cx="12" cy="12" r="5" />
                    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                  </svg>
                </a>
                <a
                  href="https://facebook.com/echelleinteriors"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--color-mid)] hover:text-[var(--color-accent-hover)] transition-colors duration-300"
                  aria-label="Facebook"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[var(--color-mid)]/15">
        <div className="container py-6 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-[12px] text-[var(--color-mid)]">
            &copy; {new Date().getFullYear()} Studio Échelle. {tc('allRightsReserved')}.
          </p>
          <p className="text-[12px] text-[var(--color-mid)]">
            Doha, Qatar
          </p>
        </div>
      </div>
    </footer>
  );
}
