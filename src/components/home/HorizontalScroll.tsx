'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const PANELS = [
  {
    category: 'Residential',
    image:
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1920&q=80&auto=format&fit=crop',
    index: '01',
  },
  {
    category: 'Commercial',
    image:
      'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&q=80&auto=format&fit=crop',
    index: '02',
  },
  {
    category: 'Hospitality',
    image:
      'https://images.unsplash.com/photo-1559508551-44bff1de756b?w=1920&q=80&auto=format&fit=crop',
    index: '03',
  },
];

export function HorizontalScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const categoryRefs = useRef<(HTMLHeadingElement | null)[]>([]);
  const lineRefs = useRef<(HTMLDivElement | null)[]>([]);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const panels = gsap.utils.toArray<HTMLElement>('.h-panel');
      if (panels.length === 0) return;

      const totalScroll = (panels.length - 1) * window.innerWidth;

      // Main horizontal scroll
      const scrollTween = gsap.to(panels, {
        xPercent: -100 * (panels.length - 1),
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: 1,
          end: () => '+=' + totalScroll,
        },
      });

      // Per-panel animations
      panels.forEach((panel, i) => {
        const category = categoryRefs.current[i];
        const line = lineRefs.current[i];
        const imageWrap = imageRefs.current[i];

        // Category text reveal
        if (category) {
          gsap.from(category, {
            yPercent: 40,
            opacity: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: panel,
              containerAnimation: i > 0 ? scrollTween : undefined,
              start: i === 0 ? 'top 80%' : 'left 80%',
              toggleActions: 'play none none reverse',
            },
          });
        }

        // Vertical line scale
        if (line) {
          gsap.from(line, {
            scaleY: 0,
            transformOrigin: 'bottom',
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: panel,
              containerAnimation: i > 0 ? scrollTween : undefined,
              start: i === 0 ? 'top 80%' : 'left 80%',
              toggleActions: 'play none none reverse',
            },
          });
        }

        // Image parallax — subtle horizontal offset
        if (imageWrap) {
          gsap.fromTo(
            imageWrap,
            { xPercent: i === 0 ? 0 : 8 },
            {
              xPercent: i === panels.length - 1 ? 0 : -8,
              ease: 'none',
              scrollTrigger: {
                trigger: panel,
                containerAnimation: i > 0 ? scrollTween : undefined,
                start: 'left right',
                end: 'right left',
                scrub: true,
              },
            },
          );
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="h-scroll-container overflow-hidden">
      <div className="flex h-screen">
        {PANELS.map((panel, i) => (
          <div
            key={panel.index}
            className="h-panel relative w-screen h-screen flex-shrink-0"
          >
            {/* Full-bleed image */}
            <div
              ref={(el) => {
                imageRefs.current[i] = el;
              }}
              className="absolute inset-[-8%] lg:inset-[-4%]"
            >
              <Image
                src={panel.image}
                alt={`${panel.category} project by Studio Échelle`}
                fill
                className="object-cover"
                sizes="120vw"
              />
            </div>

            {/* Dark overlay */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  'linear-gradient(to right, rgba(14,14,12,0.85) 0%, rgba(14,14,12,0.3) 60%, rgba(14,14,12,0.7) 100%)',
              }}
            />

            {/* Panel number — top right */}
            <div className="absolute top-12 right-12 z-10">
              <span
                className="text-[11px] tracking-[0.2em] uppercase"
                style={{
                  fontFamily: 'var(--font-body), sans-serif',
                  fontWeight: 500,
                  color: 'rgba(140,136,128,0.6)',
                }}
              >
                {panel.index}
              </span>
            </div>

            {/* Content — bottom left */}
            <div className="absolute bottom-[20%] left-[60px] z-10">
              {/* Vertical terracotta line */}
              <div
                ref={(el) => {
                  lineRefs.current[i] = el;
                }}
                className="w-px h-[80px] bg-[var(--color-accent)] mb-6"
              />

              {/* Category */}
              <h2
                ref={(el) => {
                  categoryRefs.current[i] = el;
                }}
                className="text-[var(--color-bg)]"
                style={{
                  fontFamily: 'var(--font-display), serif',
                  fontWeight: 300,
                  fontSize: 'clamp(96px, 11vw, 160px)',
                  lineHeight: 0.95,
                  letterSpacing: '-0.02em',
                }}
              >
                {panel.category}
              </h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
