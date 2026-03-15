'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

const FOOTER_LINKS = [
  { href: '/about', key: 'about' },
  { href: '/projects', key: 'projects' },
  { href: '/services', key: 'services' },
  { href: '/contact', key: 'contact' },
] as const;

export function Footer() {
  const t = useTranslations('nav');
  const tc = useTranslations('common');

  return (
    <footer className="bg-[var(--color-dark)] text-[var(--color-bg)] py-16 lg:py-24">
      <div className="container">
        <div className="grid grid-cols-4 lg:grid-cols-12 gap-y-12 gap-x-[var(--gutter)]">
          {/* Wordmark */}
          <div className="col-span-4 lg:col-span-4">
            <Link href="/">
              <span
                className="text-2xl lg:text-3xl tracking-[0.08em] uppercase"
                style={{ fontFamily: 'var(--font-display), serif', fontWeight: 300 }}
              >
                Studio Echelle
              </span>
            </Link>
            <p className="text-small text-[var(--color-mid)] mt-4 max-w-xs">
              Luxury interior design & architecture studio. Doha, Qatar.
            </p>
          </div>

          {/* Nav links */}
          <div className="col-span-2 lg:col-span-2 lg:col-start-7">
            <h4 className="text-label text-[var(--color-mid)] mb-4">Navigation</h4>
            <nav className="flex flex-col gap-3">
              {FOOTER_LINKS.map(({ href, key }) => (
                <Link
                  key={key}
                  href={href}
                  className="text-small text-[var(--color-bg)] hover:text-[var(--color-accent)] transition-colors duration-300"
                >
                  {t(key)}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div className="col-span-2 lg:col-span-3 lg:col-start-10">
            <h4 className="text-label text-[var(--color-mid)] mb-4">Contact</h4>
            <div className="flex flex-col gap-3 text-small">
              <a
                href="mailto:hello@studioechelle.com"
                className="text-[var(--color-bg)] hover:text-[var(--color-accent)] transition-colors duration-300"
              >
                hello@studioechelle.com
              </a>
              <a
                href="tel:+97451218333"
                className="text-[var(--color-bg)] hover:text-[var(--color-accent)] transition-colors duration-300"
              >
                +974 5121 8333
              </a>
              <div className="flex gap-4 mt-2">
                <a
                  href="https://instagram.com/studioechelle"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--color-mid)] hover:text-[var(--color-accent)] transition-colors duration-300"
                  aria-label="Instagram"
                >
                  Instagram
                </a>
                <a
                  href="https://facebook.com/echelleinteriors"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--color-mid)] hover:text-[var(--color-accent)] transition-colors duration-300"
                  aria-label="Facebook"
                >
                  Facebook
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-[var(--color-mid)]/20 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-small text-[var(--color-mid)]">
            &copy; {new Date().getFullYear()} Studio Echelle. {tc('allRightsReserved')}.
          </p>
          <p className="text-small text-[var(--color-mid)]">Doha, Qatar</p>
        </div>
      </div>
    </footer>
  );
}
