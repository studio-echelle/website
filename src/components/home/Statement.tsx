'use client';

import { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { useGsap } from '@/lib/useGsap';

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
  const [mounted, setMounted] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const manifestoRef = useRef<HTMLDivElement>(null);
  const extendedRef = useRef<HTMLParagraphElement>(null);
  const counterRefs = useRef<(HTMLSpanElement | null)[]>([]);

  const manifestoText = t('manifesto');

  useEffect(() => {
    setMounted(true);
  }, []);

  useGsap((gsap, ScrollTrigger) => {
    if (!mounted) return;
    return gsap.context(() => {
      const words = manifestoRef.current?.querySelectorAll('.manifesto-word');
      if (words && words.length > 0) {
        gsap.from(words, {
          yPercent: 100,
          stagger: 0.04,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: manifestoRef.current,
            start: 'top 70%',
          },
        });
      }

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
  }, [mounted]);

  return (
    <section
      ref={sectionRef}
      className="bg-[var(--color-dark)] text-[var(--color-bg)]"
      style={{ paddingBlock: 'var(--section-py)' }}
    >
      <div className="container">
        {/* Manifesto */}
        <div style={{ maxWidth: '64rem', marginLeft: 'auto', textAlign: 'right', marginBottom: 'clamp(96px, 8vw, 144px)' }}>
          <h2 ref={manifestoRef}>
            {mounted ? (
              // Client: split into word spans for GSAP animation
              <span
                style={{
                  fontFamily: 'var(--font-display), serif',
                  fontWeight: 300,
                  fontSize: 'clamp(36px, 4vw, 64px)',
                  lineHeight: 1.2,
                  letterSpacing: '0.01em',
                }}
              >
                {manifestoText.split(' ').map((word, i) => (
                  <span key={i} className="inline-block overflow-hidden align-top">
                    <span className="manifesto-word inline-block">
                      {word}
                    </span>
                    {i < manifestoText.split(' ').length - 1 && '\u00A0'}
                  </span>
                ))}
              </span>
            ) : (
              // Server: render plain text — identical text content, no span mismatch
              <span
                style={{
                  fontFamily: 'var(--font-display), serif',
                  fontWeight: 300,
                  fontSize: 'clamp(36px, 4vw, 64px)',
                  lineHeight: 1.2,
                  letterSpacing: '0.01em',
                }}
              >
                {manifestoText}
              </span>
            )}
          </h2>
          <p
            ref={extendedRef}
            className="text-[var(--color-mid)]"
            style={{ marginTop: 'clamp(32px, 3vw, 40px)', maxWidth: '42rem', marginLeft: 'auto', fontSize: 'clamp(17px, 1.4vw, 21px)', lineHeight: 1.8 }}
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
                  height: 'clamp(64px, 7vw, 96px)',
                  display: 'flex',
                  alignItems: 'flex-end',
                  justifyContent: 'center',
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
              <p className="text-[11px] tracking-[0.12em] uppercase font-medium text-[var(--color-mid)] mt-4 whitespace-nowrap">
                {t(`stats.${stat.key}`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
