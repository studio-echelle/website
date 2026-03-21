'use client';

import { useEffect, useRef, useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { useGsap } from '@/lib/useGsap';

export function ContactCTA() {
  const t = useTranslations('cta');
  const locale = useLocale();
  const [mounted, setMounted] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useGsap((gsap, ScrollTrigger) => {
    if (!mounted) return;
    return gsap.context(() => {
      gsap.from(contentRef.current, {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
      });
    }, sectionRef);
  }, [mounted]);

  return (
    <section
      ref={sectionRef}
      className="bg-[var(--color-accent)] text-[var(--color-bg)]"
      style={{ minHeight: '50vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 'clamp(96px, 8vw, 128px) 24px' }}
    >
      <div ref={contentRef} style={{ textAlign: 'center', width: '100%' }}>
        <h2 className="text-display" style={{ maxWidth: '48rem', margin: '0 auto' }}>{t('heading')}</h2>
        <div className="mt-12 lg:mt-14">
          <a
            href={`/${locale}/contact`}
            className="inline-block text-label border border-[var(--color-bg)]/50 px-10 py-4 hover:bg-[var(--color-bg)] hover:text-[var(--color-accent)] transition-all duration-500"
          >
            {t('button')}
          </a>
        </div>
      </div>
    </section>
  );
}
