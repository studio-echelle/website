'use client';

import { useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SERVICE_KEYS = ['interior', 'architecture', 'landscape', 'fitout'] as const;

export function Services() {
  const t = useTranslations('services');
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = cardsRef.current?.children;
      if (!cards) return;

      gsap.from(Array.from(cards), {
        y: 60,
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out',
        stagger: 0.12,
        scrollTrigger: {
          trigger: cardsRef.current,
          start: 'top 80%',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-[var(--color-dark)] text-[var(--color-bg)] py-24 lg:py-36 border-t border-[var(--color-bg)]/10"
    >
      <div className="container">
        {/* Header */}
        <div className="mb-16 lg:mb-20">
          <span className="text-label text-[var(--color-accent)]">{t('label')}</span>
          <h2 className="text-display mt-4">{t('title')}</h2>
        </div>

        {/* Grid */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[var(--color-bg)]/10"
        >
          {SERVICE_KEYS.map((key, i) => (
            <div
              key={key}
              className="group relative bg-[var(--color-dark)] p-8 lg:p-12 min-h-[260px] flex flex-col justify-between transition-colors duration-500 hover:bg-[var(--color-fg)]"
            >
              {/* Number */}
              <span className="text-label text-[var(--color-accent)]">
                {String(i + 1).padStart(2, '0')}
              </span>

              {/* Service name */}
              <div className="mt-auto">
                <h3 className="text-heading">{t(`${key}.name`)}</h3>

                {/* Description — revealed on hover */}
                <p className="text-[15px] leading-relaxed text-[var(--color-mid)] mt-3 max-h-0 opacity-0 overflow-hidden transition-all duration-500 group-hover:max-h-32 group-hover:opacity-100">
                  {t(`${key}.description`)}
                </p>
              </div>

              {/* Corner accent line */}
              <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-[var(--color-accent)] transition-[width] duration-500 group-hover:w-full" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
