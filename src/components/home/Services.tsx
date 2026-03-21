'use client';

import { useEffect, useRef, useCallback, useState } from 'react';
import { useTranslations } from 'next-intl';
import { useGsap } from '@/lib/useGsap';
import { getGsap } from '@/lib/gsap';

const SERVICE_KEYS = ['interior', 'architecture', 'landscape', 'fitout'] as const;

export function Services() {
  const t = useTranslations('services');
  const [mounted, setMounted] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const rowsRef = useRef<HTMLDivElement>(null);
  const descRefs = useRef<(HTMLParagraphElement | null)[]>([]);
  const nameRefs = useRef<(HTMLHeadingElement | null)[]>([]);
  const arrowRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    setMounted(true);
  }, []);

  // No GSAP opacity animation on service rows — they render visible immediately.
  // Previous gsap.from({ opacity: 0 }) with ScrollTrigger was leaving rows invisible.

  const handleEnter = useCallback((i: number) => {
    const gsap = getGsap();
    if (!gsap) return;
    const desc = descRefs.current[i];
    const name = nameRefs.current[i];
    const arrow = arrowRefs.current[i];
    if (desc) gsap.to(desc, { xPercent: 0, opacity: 1, duration: 0.4, ease: 'power2.out' });
    if (name) gsap.to(name, { x: 12, duration: 0.3, ease: 'power2.out' });
    if (arrow) gsap.to(arrow, { rotation: 45, duration: 0.3, ease: 'power2.out' });
  }, []);

  const handleLeave = useCallback((i: number) => {
    const gsap = getGsap();
    if (!gsap) return;
    const desc = descRefs.current[i];
    const name = nameRefs.current[i];
    const arrow = arrowRefs.current[i];
    if (desc) gsap.to(desc, { xPercent: 20, opacity: 0, duration: 0.3, ease: 'power2.in' });
    if (name) gsap.to(name, { x: 0, duration: 0.3, ease: 'power2.out' });
    if (arrow) gsap.to(arrow, { rotation: 0, duration: 0.3, ease: 'power2.out' });
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-[var(--color-dark)] text-[var(--color-bg)]"
      style={{ paddingBlock: 'var(--section-py)' }}
    >
      <div ref={rowsRef} className="max-w-[1440px] mx-auto">
        {SERVICE_KEYS.map((key, i) => (
          <div
            key={key}
            className="group cursor-pointer transition-colors duration-300 hover:bg-white/[0.02] border-t border-white/[0.06]"
            style={{ padding: '48px 40px 48px 80px' }}
            onMouseEnter={() => handleEnter(i)}
            onMouseLeave={() => handleLeave(i)}
          >
            <div className="flex items-center gap-8 lg:gap-12">
              <span
                className="text-[11px] tracking-[0.12em] uppercase font-medium text-[var(--color-accent)] shrink-0 w-[36px]"
                style={{ fontFamily: 'var(--font-body), sans-serif' }}
              >
                {String(i + 1).padStart(2, '0')}
              </span>

              <h3
                ref={(el) => {
                  nameRefs.current[i] = el;
                }}
                className="shrink-0 w-[280px] lg:w-[360px]"
                style={{
                  fontFamily: 'var(--font-display), serif',
                  fontWeight: 300,
                  fontSize: 'clamp(32px, 3.2vw, 48px)',
                  lineHeight: 1.1,
                }}
              >
                {t(`${key}.name`)}
              </h3>

              <p
                ref={(el) => {
                  descRefs.current[i] = el;
                }}
                className="hidden lg:block flex-1 max-w-[400px] text-[var(--color-mid)] opacity-0"
                style={{
                  fontFamily: 'var(--font-body), sans-serif',
                  fontSize: '14px',
                  lineHeight: 1.7,
                  transform: 'translateX(20%)',
                }}
              >
                {t(`${key}.description`)}
              </p>

              <span
                ref={(el) => {
                  arrowRefs.current[i] = el;
                }}
                className="ms-auto shrink-0 text-[var(--color-accent)] text-[20px]"
                style={{ fontFamily: 'var(--font-body), sans-serif' }}
              >
                →
              </span>
            </div>
          </div>
        ))}
        <div className="border-t border-white/[0.06]" />
      </div>
    </section>
  );
}
