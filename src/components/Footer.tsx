'use client';

import { useTranslations, useLocale } from 'next-intl';

const FOOTER_NAV = [
  { href: '/about', key: 'about' },
  { href: '/projects', key: 'projects' },
  { href: '/services', key: 'services' },
  { href: '/contact', key: 'contact' },
];

export function Footer() {
  const t = useTranslations('nav');
  const tc = useTranslations('common');
  const tf = useTranslations('footer');
  const locale = useLocale();
  const prefix = `/${locale}`;

  return (
    <footer className="bg-[var(--color-dark)] text-[var(--color-bg)]">
      <div className="container py-20 lg:py-28">
        <div className="grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-y-14 gap-x-[var(--gutter)]">
          <div className="col-span-4 lg:col-span-5">
            <a href={prefix}>
              <span
                className="text-[22px] lg:text-[28px] tracking-[0.1em] uppercase"
                style={{ fontFamily: 'var(--font-display), serif', fontWeight: 300 }}
              >
                Studio Échelle
              </span>
            </a>
            <p className="text-[15px] leading-relaxed text-[var(--color-mid)] mt-6 max-w-sm">
              {tf('tagline')}
            </p>
          </div>

          <div className="col-span-2 lg:col-span-2 lg:col-start-7">
            <h4 className="text-label text-[var(--color-mid)] mb-5">{tf('navigate')}</h4>
            <nav className="flex flex-col gap-3">
              {FOOTER_NAV.map(({ href, key }) => (
                <a
                  key={key}
                  href={`${prefix}${href}`}
                  className="text-[14px] text-[var(--color-bg)]/70 hover:text-[var(--color-accent-hover)] transition-colors duration-300"
                >
                  {t(key)}
                </a>
              ))}
            </nav>
          </div>

          <div className="col-span-2 lg:col-span-3 lg:col-start-10">
            <h4 className="text-label text-[var(--color-mid)] mb-5">{tf('contact')}</h4>
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
