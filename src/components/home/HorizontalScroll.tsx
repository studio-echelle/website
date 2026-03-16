'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const PANELS = [
  {
    category: 'Residential',
    image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1600&q=80&auto=format&fit=crop',
    index: '01',
  },
  {
    category: 'Commercial',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&q=80&auto=format&fit=crop',
    index: '02',
  },
  {
    category: 'Hospitality',
    image: 'https://images.unsplash.com/photo-1559508551-44bff1de756b?w=1600&q=80&auto=format&fit=crop',
    index: '03',
  },
];

export function HorizontalScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const panels = gsap.utils.toArray<HTMLElement>('.h-panel');
      if (panels.length === 0) return;

      gsap.to(panels, {
        xPercent: -100 * (panels.length - 1),
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: 1,
          end: () => '+=' + (panels.length - 1) * window.innerWidth,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="h-scroll-container overflow-hidden">
      <div ref={trackRef} className="flex h-screen">
        {PANELS.map((panel) => (
          <div
            key={panel.index}
            className="h-panel relative w-screen h-screen flex-shrink-0 bg-[var(--color-fg)]"
          >
            {/* Image — right 65% */}
            <div className="absolute top-0 right-0 w-full lg:w-[65%] h-full">
              <Image
                src={panel.image}
                alt={`${panel.category} project by Studio Échelle`}
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 65vw, 100vw"
              />
              {/* Dark gradient from left */}
              <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-fg)] via-[var(--color-fg)]/70 to-transparent" />
              {/* Top/bottom vignette */}
              <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-fg)]/30 via-transparent to-[var(--color-fg)]/40" />
            </div>

            {/* Text content — left side */}
            <div className="relative z-10 flex flex-col justify-between h-full px-8 lg:px-16 xl:px-20 py-16 lg:py-20 max-w-[600px]">
              <div />

              <div>
                {/* Category */}
                <h2
                  className="text-[var(--color-bg)]"
                  style={{
                    fontFamily: 'var(--font-display), serif',
                    fontWeight: 300,
                    fontSize: 'clamp(80px, 10vw, 140px)',
                    lineHeight: 1,
                    letterSpacing: '-0.01em',
                  }}
                >
                  {panel.category}
                </h2>

                {/* Terracotta line */}
                <div className="w-[60px] h-px bg-[var(--color-accent)] mt-8" />

                {/* Discover CTA */}
                <p
                  className="mt-6 text-[11px] tracking-[0.2em] uppercase text-[var(--color-accent)]"
                  style={{ fontFamily: 'var(--font-body), sans-serif', fontWeight: 500 }}
                >
                  Discover →
                </p>
              </div>

              {/* Panel counter — bottom left */}
              <p
                className="text-[13px] tracking-[0.1em] text-[var(--color-mid)]"
                style={{ fontFamily: 'var(--font-body), sans-serif', fontWeight: 400 }}
              >
                {panel.index} / 03
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
