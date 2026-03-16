'use client';

import { useEffect, useRef } from 'react';
import { Link } from '@/i18n/navigation';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const outerCircleRef = useRef<HTMLDivElement>(null);
  const innerCircleRef = useRef<HTMLDivElement>(null);
  const pulseRectRef = useRef<HTMLDivElement>(null);
  const studioRef = useRef<HTMLSpanElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLSpanElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLParagraphElement>(null);
  const locationRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.6 });

      // Right panel text elements — clip-path reveal upward
      const textEls = [studioRef, titleRef, subtitleRef, lineRef, servicesRef, locationRef, ctaRef];
      textEls.forEach((ref, i) => {
        tl.from(
          ref.current,
          {
            yPercent: 110,
            opacity: 0,
            duration: 0.9,
            ease: 'power3.out',
          },
          i === 0 ? 0.2 : `-=0.55`,
        );
      });

      // Left panel — rotating circles
      gsap.to(outerCircleRef.current, {
        rotation: 360,
        duration: 120,
        ease: 'none',
        repeat: -1,
      });

      gsap.to(innerCircleRef.current, {
        rotation: -360,
        duration: 80,
        ease: 'none',
        repeat: -1,
      });

      // Pulsing terracotta rectangle
      gsap.to(pulseRectRef.current, {
        opacity: 0.15,
        duration: 3,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen min-h-[700px] flex flex-col lg:flex-row overflow-hidden"
    >
      {/* Left panel — architectural composition (55%) */}
      <div
        className="relative w-full lg:w-[55%] h-[45vh] lg:h-full overflow-hidden"
        style={{ background: '#0a0a08' }}
      >
        {/* Horizontal lines at 25%, 50%, 75% */}
        <div className="absolute w-full h-px top-1/4" style={{ background: 'rgba(255,255,255,0.03)' }} />
        <div className="absolute w-full h-px top-1/2" style={{ background: 'rgba(255,255,255,0.03)' }} />
        <div className="absolute w-full h-px top-3/4" style={{ background: 'rgba(255,255,255,0.03)' }} />

        {/* Diagonal line — top-right to bottom-left */}
        <div
          className="absolute hidden lg:block"
          style={{
            width: '141%',
            height: '1px',
            background: 'rgba(255,255,255,0.06)',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%) rotate(-45deg)',
            transformOrigin: 'center',
          }}
        />

        {/* Outer circle — 800px, slowly rotating */}
        <div
          ref={outerCircleRef}
          className="absolute hidden lg:block"
          style={{
            width: '800px',
            height: '800px',
            borderRadius: '50%',
            border: '1px solid rgba(255,255,255,0.04)',
            top: '50%',
            left: '55%',
            transform: 'translate(-50%, -50%)',
          }}
        />

        {/* Inner circle — 400px, counter-rotating */}
        <div
          ref={innerCircleRef}
          className="absolute hidden lg:block"
          style={{
            width: '400px',
            height: '400px',
            borderRadius: '50%',
            border: '1px solid rgba(184,147,90,0.08)',
            top: '50%',
            left: '55%',
            transform: 'translate(-50%, -50%)',
          }}
        />

        {/* Bottom-left terracotta rectangle — pulsing */}
        <div
          ref={pulseRectRef}
          className="absolute hidden lg:block"
          style={{
            width: '120px',
            height: '80px',
            border: '1px solid #8B3A2A',
            opacity: 0.4,
            bottom: '80px',
            left: '60px',
          }}
        />

        {/* Vertical text — far left edge */}
        <div
          className="absolute hidden lg:flex items-center"
          style={{
            left: '20px',
            top: '50%',
            transform: 'translateY(-50%)',
            writingMode: 'vertical-rl',
            rotate: '180deg',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-body), sans-serif',
              fontSize: '10px',
              fontWeight: 500,
              letterSpacing: '0.2em',
              color: 'rgba(140,136,128,0.5)',
              textTransform: 'uppercase',
              whiteSpace: 'nowrap',
            }}
          >
            Doha · Qatar · Est. 2019
          </span>
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

        {/* Centre: ÉCHELLE title + DESIGN STUDIO subtitle */}
        <div>
          <div className="overflow-hidden -mx-8 lg:-mx-16 xl:-mx-20 pe-0">
            <h1
              ref={titleRef}
              className="text-[var(--color-bg)] ps-8 lg:ps-16 xl:ps-20"
              style={{
                fontFamily: 'var(--font-display), serif',
                fontWeight: 300,
                fontSize: 'clamp(120px, 15vw, 220px)',
                lineHeight: 0.85,
                letterSpacing: '-0.02em',
                whiteSpace: 'nowrap',
              }}
            >
              ÉCHELLE
            </h1>
          </div>
          <div className="overflow-hidden mt-10">
            <span
              ref={subtitleRef}
              className="block text-[13px] tracking-[0.3em] uppercase text-[var(--color-mid)]"
              style={{ fontFamily: 'var(--font-body), sans-serif', fontWeight: 500 }}
            >
              Design Studio
            </span>
          </div>
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
