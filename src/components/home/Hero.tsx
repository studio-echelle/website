'use client';

import { useEffect, useRef } from 'react';
import { Link } from '@/i18n/navigation';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Scattered letter positions — hand-balanced across the left panel
const SCATTERED_LETTERS = [
  { char: 'É', top: '8%', left: '12%', size: 180, rotate: -6 },
  { char: 'C', top: '22%', left: '55%', size: 140, rotate: 3 },
  { char: 'H', top: '45%', left: '25%', size: 200, rotate: -2 },
  { char: 'E', top: '35%', left: '72%', size: 160, rotate: 5 },
  { char: 'L', top: '62%', left: '48%', size: 190, rotate: -4 },
  { char: 'L', top: '70%', left: '10%', size: 150, rotate: 7 },
  { char: 'E', top: '82%', left: '65%', size: 220, rotate: -3 },
];

function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftPanelRef = useRef<HTMLDivElement>(null);
  const letterRefs = useRef<(HTMLSpanElement | null)[]>([]);
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

      // Scattered letters entrance — stagger in
      letterRefs.current.forEach((el, i) => {
        if (!el) return;
        tl.from(
          el,
          {
            opacity: 0,
            scale: 0.8,
            duration: 0.8,
            ease: 'power2.out',
          },
          0.8 + i * 0.08,
        );

        // Floating yoyo animation per letter
        const seed = i + 1;
        gsap.to(el, {
          y: (seededRandom(seed * 3) - 0.5) * 60,
          x: (seededRandom(seed * 7) - 0.5) * 30,
          duration: 4 + seededRandom(seed * 11) * 3,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
          delay: seededRandom(seed * 13) * 2,
        });
      });

      // Fade letters on scroll out
      gsap.to(leftPanelRef.current?.querySelectorAll('.scattered-letter') || [], {
        opacity: 0,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen min-h-[700px] flex flex-col lg:flex-row overflow-hidden"
    >
      {/* Left panel — gradient + scattered letters (55%) */}
      <div
        ref={leftPanelRef}
        className="relative w-full lg:w-[55%] h-[45vh] lg:h-full overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #0a0a08 0%, #1a1614 50%, #0e0c0a 100%)',
        }}
      >
        {/* Geometric overlay — offset thin rectangle */}
        <div
          className="absolute hidden lg:block"
          style={{
            width: '60%',
            height: '70%',
            top: '12%',
            left: '22%',
            border: '1px solid rgba(255,255,255,0.06)',
            transform: 'rotate(2deg)',
          }}
        />

        {/* Scattered letters */}
        {SCATTERED_LETTERS.map((letter, i) => (
          <span
            key={`${letter.char}-${i}`}
            ref={(el) => {
              letterRefs.current[i] = el;
            }}
            className="scattered-letter absolute select-none hidden lg:block"
            style={{
              top: letter.top,
              left: letter.left,
              fontSize: `${letter.size}px`,
              fontFamily: 'var(--font-display), serif',
              fontWeight: 300,
              color: 'rgba(245,242,237,0.12)',
              lineHeight: 1,
              transform: `rotate(${letter.rotate}deg)`,
            }}
          >
            {letter.char}
          </span>
        ))}
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
