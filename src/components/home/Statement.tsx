'use client';

import { useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { value: 120, suffix: '+', key: 'projects' },
  { value: 5, suffix: '', key: 'countries' },
  { value: 6, suffix: '', key: 'years' },
  { value: 60000, suffix: '+', key: 'sqm' },
] as const;

function formatNumber(n: number): string {
  if (n >= 1000) {
    return n.toLocaleString('en-US');
  }
  return String(n);
}

export function Statement() {
  const t = useTranslations('statement');
  const sectionRef = useRef<HTMLElement>(null);
  const manifestoRef = useRef<HTMLHeadingElement>(null);
  const extendedRef = useRef<HTMLParagraphElement>(null);
  const counterRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Manifesto text reveal
      gsap.from(manifestoRef.current, {
        y: 60,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: manifestoRef.current,
          start: 'top 80%',
        },
      });

      gsap.from(extendedRef.current, {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: extendedRef.current,
          start: 'top 85%',
        },
      });

      // Animated counters
      counterRefs.current.forEach((el, i) => {
        if (!el) return;
        const target = { val: 0 };
        const end = STATS[i].value;

        gsap.to(target, {
          val: end,
          duration: 2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 90%',
          },
          onUpdate: () => {
            el.textContent = formatNumber(Math.round(target.val));
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-[var(--color-dark)] text-[var(--color-bg)] py-24 lg:py-40"
    >
      <div className="container">
        {/* Manifesto */}
        <div className="max-w-4xl mx-auto text-center mb-20 lg:mb-32">
          <h2 ref={manifestoRef} className="text-display">
            {t('manifesto')}
          </h2>
          <p
            ref={extendedRef}
            className="mt-6 lg:mt-8 text-[17px] lg:text-[19px] leading-relaxed text-[var(--color-mid)] max-w-2xl mx-auto"
          >
            {t('extended')}
          </p>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-12 gap-x-8 border-t border-[var(--color-bg)]/10 pt-16 lg:pt-20">
          {STATS.map((stat, i) => (
            <div key={stat.key} className="text-center">
              <div className="text-hero text-[var(--color-accent)]">
                <span
                  ref={(el) => {
                    counterRefs.current[i] = el;
                  }}
                >
                  0
                </span>
                {stat.suffix}
              </div>
              <p className="text-label text-[var(--color-mid)] mt-3">
                {t(`stats.${stat.key}`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
