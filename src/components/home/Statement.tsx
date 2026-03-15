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
      className="bg-[var(--color-dark)] text-[var(--color-bg)]"
      style={{ paddingBlock: 'var(--section-py)' }}
    >
      <div className="container">
        {/* Manifesto */}
        <div className="max-w-5xl mx-auto text-center mb-24 lg:mb-36">
          <h2
            ref={manifestoRef}
            style={{
              fontFamily: 'var(--font-display), serif',
              fontWeight: 300,
              fontSize: 'clamp(36px, 4vw, 64px)',
              lineHeight: 1.2,
              letterSpacing: '0.01em',
            }}
          >
            {t('manifesto')}
          </h2>
          <p
            ref={extendedRef}
            className="mt-8 lg:mt-10 text-[var(--color-mid)] max-w-2xl mx-auto"
            style={{
              fontSize: 'clamp(17px, 1.4vw, 21px)',
              lineHeight: 1.8,
            }}
          >
            {t('extended')}
          </p>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-16 gap-x-8 border-t border-[var(--color-bg)]/10 pt-20 lg:pt-24">
          {STATS.map((stat, i) => (
            <div key={stat.key} className="text-center">
              <div
                className="text-[var(--color-accent)]"
                style={{
                  fontFamily: 'var(--font-display), serif',
                  fontWeight: 300,
                  fontSize: 'clamp(64px, 7vw, 96px)',
                  lineHeight: 1,
                }}
              >
                <span
                  ref={(el) => {
                    counterRefs.current[i] = el;
                  }}
                >
                  0
                </span>
                {stat.suffix}
              </div>
              <p className="text-[11px] tracking-[0.12em] uppercase font-medium text-[var(--color-mid)] mt-4">
                {t(`stats.${stat.key}`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
