'use client';

import { useEffect, useRef } from 'react';
import { Link } from '@/i18n/navigation';
import Image from 'next/image';
import { gsap } from 'gsap';

const HERO_IMAGE =
  'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1920&q=80&auto=format&fit=crop';

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const studioRef = useRef<HTMLSpanElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLParagraphElement>(null);
  const locationRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.6 });

      // Image scale in
      tl.from(imageRef.current, {
        scale: 1.05,
        duration: 1.8,
        ease: 'power2.out',
      });

      // Right panel text elements — clip-path reveal upward
      const textEls = [studioRef, titleRef, lineRef, servicesRef, locationRef, ctaRef];
      textEls.forEach((ref, i) => {
        tl.from(
          ref.current,
          {
            yPercent: 110,
            opacity: 0,
            duration: 0.9,
            ease: 'power3.out',
          },
          i === 0 ? 0.3 : `-=0.55`,
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen min-h-[700px] flex flex-col lg:flex-row overflow-hidden"
    >
      {/* Left panel — image/video (55%) */}
      <div className="relative w-full lg:w-[55%] h-[45vh] lg:h-full bg-[var(--color-fg)] overflow-hidden">
        <div ref={imageRef} className="absolute inset-0">
          <Image
            src={HERO_IMAGE}
            alt="Luxury interior by Studio Échelle"
            fill
            priority
            className="object-cover opacity-50"
            sizes="(min-width: 1024px) 55vw, 100vw"
          />
          {/* Gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-fg)]/40 via-transparent to-[var(--color-fg)]/50" />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[var(--color-fg)]/30 hidden lg:block" />
        </div>
      </div>

      {/* Right panel — text content (45%) */}
      <div className="relative w-full lg:w-[45%] h-[55vh] lg:h-full bg-[var(--color-fg)] flex flex-col justify-between px-8 lg:px-16 xl:px-20 py-10 lg:py-14 overflow-hidden">
        {/* Top: Studio name */}
        <div className="overflow-hidden">
          <span
            ref={studioRef}
            className="block text-[11px] tracking-[0.2em] uppercase text-[var(--color-mid)]"
            style={{ fontFamily: 'var(--font-body), sans-serif', fontWeight: 500 }}
          >
            Studio Échelle
          </span>
        </div>

        {/* Centre: ÉCHELLE title */}
        <div className="overflow-hidden -mx-8 lg:-mx-16 xl:-mx-20 pe-0">
          <h1
            ref={titleRef}
            className="text-[var(--color-bg)] ps-8 lg:ps-16 xl:ps-20"
            style={{
              fontFamily: 'var(--font-display), serif',
              fontWeight: 300,
              fontSize: 'clamp(100px, 12vw, 180px)',
              lineHeight: 0.9,
              letterSpacing: '-0.02em',
              whiteSpace: 'nowrap',
            }}
          >
            ÉCHELLE
          </h1>
        </div>

        {/* Below title: line + services + location */}
        <div className="space-y-5">
          <div ref={lineRef} className="overflow-hidden">
            <div className="h-px bg-[#2a2a28] w-full" />
          </div>

          <div className="overflow-hidden">
            <p
              ref={servicesRef}
              className="text-[12px] tracking-[0.15em] uppercase text-[var(--color-mid)]"
              style={{ fontFamily: 'var(--font-body), sans-serif', fontWeight: 400 }}
            >
              Architecture · Interior · Landscape
            </p>
          </div>

          <div className="overflow-hidden">
            <p
              ref={locationRef}
              className="text-[12px] tracking-[0.15em] uppercase text-[var(--color-mid)]"
              style={{ fontFamily: 'var(--font-body), sans-serif', fontWeight: 400 }}
            >
              Doha, Qatar
            </p>
          </div>
        </div>

        {/* Bottom: CTA */}
        <div className="overflow-hidden">
          <div ref={ctaRef}>
            <Link
              href="/projects"
              className="inline-block text-[11px] tracking-[0.2em] uppercase text-[var(--color-accent)] hover:text-[var(--color-accent-hover)] transition-colors duration-300"
              style={{ fontFamily: 'var(--font-body), sans-serif', fontWeight: 500 }}
            >
              View Our Work →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
