'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useLocale } from 'next-intl';
import { useGsap } from '@/lib/useGsap';

const CLD = 'https://res.cloudinary.com/darx0pq1z/image/upload/f_auto,q_auto:good';

const FEATURED = [
  {
    slug: 'lusail-villa',
    title: 'Lusail Villa',
    category: 'Residential',
    location: 'Lusail, Qatar',
    image: `${CLD},w_1920/se/projects/lusail-villa/gallery/hero`,
    index: '01',
  },
  {
    slug: 'mezami',
    title: 'Mezami',
    category: 'Hospitality',
    location: 'Doha, Qatar',
    image: `${CLD},w_1920/se/projects/mezami/gallery/hero`,
    index: '02',
  },
  {
    slug: 'private-welness-retreat',
    title: 'Private Wellness Retreat',
    category: 'Lifestyle',
    location: 'Doha, Qatar',
    image: `${CLD},w_1920/se/projects/private-welness-retreat/gallery/hero`,
    index: '03',
  },
];

export function HorizontalScroll() {
  const locale = useLocale();
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useGsap((gsap, ScrollTrigger) => {
    if (!mounted) return;
    return gsap.context(() => {
      const panels = gsap.utils.toArray<HTMLElement>('.h-panel');
      if (panels.length === 0) return;

      const totalScroll = (panels.length - 1) * window.innerWidth;

      gsap.to(panels, {
        xPercent: -100 * (panels.length - 1),
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: 1,
          end: () => '+=' + totalScroll,
        },
      });
    }, containerRef);
  }, [mounted]);

  return (
    <div ref={containerRef} className="h-scroll-container overflow-hidden relative">
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 pointer-events-none">
        <span
          style={{
            fontFamily: 'var(--font-body), sans-serif',
            fontSize: '10px',
            fontWeight: 500,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'rgba(245,242,237,0.4)',
          }}
        >
          Scroll
        </span>
        <div className="w-px h-6 bg-[var(--color-accent)] opacity-60" />
      </div>
      <div className="flex h-screen">
        {FEATURED.map((project) => (
          <a
            key={project.index}
            href={`/${locale}/projects/${project.slug}`}
            className="h-panel relative w-screen h-screen flex-shrink-0 block"
            data-cursor="view"
          >
            {/* Full-bleed image */}
            <div className="absolute inset-0">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover"
                sizes="100vw"
              />
            </div>

            {/* Dark gradient overlay */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  'linear-gradient(to top, rgba(14,14,12,0.8) 0%, rgba(14,14,12,0.1) 50%, rgba(14,14,12,0.3) 100%)',
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
                {project.index}
              </span>
            </div>

            {/* Content — bottom left */}
            <div className="absolute bottom-[12%] left-[40px] lg:left-[60px] z-10 max-w-xl">
              {/* Category tag */}
              <p
                className="text-[var(--color-accent)] mb-4"
                style={{
                  fontFamily: 'var(--font-body), sans-serif',
                  fontSize: '11px',
                  fontWeight: 500,
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                }}
              >
                {project.category} — {project.location}
              </p>

              {/* Project title */}
              <h2
                className="text-[var(--color-bg)]"
                style={{
                  fontFamily: 'var(--font-display), serif',
                  fontWeight: 300,
                  fontSize: 'clamp(48px, 6vw, 80px)',
                  lineHeight: 1.05,
                  letterSpacing: '-0.01em',
                }}
              >
                {project.title}
              </h2>

              {/* View project hint */}
              <p
                className="text-[var(--color-bg)]/50 mt-6"
                style={{
                  fontFamily: 'var(--font-body), sans-serif',
                  fontSize: '12px',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                }}
              >
                View Project →
              </p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
