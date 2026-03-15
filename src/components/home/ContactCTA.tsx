'use client';

import { useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function ContactCTA() {
  const t = useTranslations('cta');
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
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

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-[var(--color-accent)] text-[var(--color-bg)] py-24 lg:py-32"
    >
      <div ref={contentRef} className="container text-center">
        <h2 className="text-display max-w-3xl mx-auto">{t('heading')}</h2>
        <div className="mt-10 lg:mt-12">
          <Link
            href="/contact"
            className="inline-block text-label border border-[var(--color-bg)]/50 px-10 py-4 hover:bg-[var(--color-bg)] hover:text-[var(--color-accent)] transition-all duration-500"
          >
            {t('button')}
          </Link>
        </div>
      </div>
    </section>
  );
}
