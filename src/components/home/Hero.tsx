'use client';

import { useRef, useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import Image from 'next/image';
import { useGsap } from '@/lib/useGsap';

export function Hero() {
  const t = useTranslations('hero');
  const locale = useLocale();
  const [mounted, setMounted] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const outerCircleRef = useRef<HTMLDivElement>(null);
  const innerCircleRef = useRef<HTMLDivElement>(null);
  const pulseRectRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLParagraphElement>(null);
  const locationRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => { setMounted(true); }, []);

  useGsap((gsap) => {
    if (!mounted) return;
    return gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.6 });
      const textEls = [logoRef, lineRef, servicesRef, locationRef, ctaRef];
      textEls.forEach((ref, i) => {
        tl.from(ref.current, { yPercent: 110, opacity: 0, duration: 0.9, ease: 'power3.out' }, i === 0 ? 0.2 : `-=0.55`);
      });
      gsap.to(outerCircleRef.current, { rotation: 360, duration: 120, ease: 'none', repeat: -1 });
      gsap.to(innerCircleRef.current, { rotation: -360, duration: 80, ease: 'none', repeat: -1 });
      gsap.to(pulseRectRef.current, { opacity: 0.15, duration: 3, ease: 'sine.inOut', yoyo: true, repeat: -1 });
    }, sectionRef);
  }, [mounted]);

  const isRtl = locale === 'ar';

  return (
    <section
      ref={sectionRef}
      className={`relative h-screen min-h-[700px] flex flex-col lg:flex-row overflow-hidden ${isRtl ? 'lg:flex-row-reverse' : ''}`}
    >
      {/* Left panel — video + architectural composition (55%) */}
      <div
        className="relative w-full lg:w-[55%] h-[45vh] lg:h-full overflow-hidden"
        style={{ background: '#0a0a08' }}
      >
        {/* Video — z-index 0 */}
        {mounted && (
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            className="absolute inset-0 w-full h-full object-cover opacity-50"
            style={{ zIndex: 0 }}
          >
            <source src="/video/hero.mp4" type="video/mp4" />
          </video>
        )}

        {/* Geometric overlays — z-index 2, above video */}
        <div className="absolute inset-0" style={{ zIndex: 2 }}>
          {/* Subtle grid lines */}
          <div className="absolute w-full h-px top-1/4" style={{ background: 'rgba(255,255,255,0.03)' }} />
          <div className="absolute w-full h-px top-1/2" style={{ background: 'rgba(255,255,255,0.03)' }} />
          <div className="absolute w-full h-px top-3/4" style={{ background: 'rgba(255,255,255,0.03)' }} />

          {/* Diagonal */}
          <div
            className="absolute hidden lg:block"
            style={{
              width: '141%', height: '1px',
              background: 'rgba(255,255,255,0.06)',
              top: '50%', left: '50%',
              transform: 'translate(-50%, -50%) rotate(-45deg)',
              transformOrigin: 'center',
            }}
          />

          {/* Outer circle */}
          <div
            ref={outerCircleRef}
            className="absolute hidden lg:block"
            style={{
              width: '800px', height: '800px', borderRadius: '50%',
              border: '1px solid rgba(255,255,255,0.06)',
              top: '50%', left: '55%',
              transform: 'translate(-50%, -50%)',
            }}
          />

          {/* Inner circle */}
          <div
            ref={innerCircleRef}
            className="absolute hidden lg:block"
            style={{
              width: '400px', height: '400px', borderRadius: '50%',
              border: '1px solid rgba(184,147,90,0.10)',
              top: '50%', left: '55%',
              transform: 'translate(-50%, -50%)',
            }}
          />

          {/* Pulsing rectangle */}
          <div
            ref={pulseRectRef}
            className="absolute hidden lg:block"
            style={{
              width: '120px', height: '80px',
              border: '1px solid #8B3A2A',
              opacity: 0.4, bottom: '80px', left: '60px',
            }}
          />

          {/* Vertical text */}
          <div
            className="absolute hidden lg:flex items-center"
            style={{
              left: '20px', top: '50%',
              transform: 'translateY(-50%)',
              writingMode: 'vertical-rl', rotate: '180deg',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-body), sans-serif',
                fontSize: '10px', fontWeight: 500,
                letterSpacing: '0.2em',
                color: 'rgba(140,136,128,0.5)',
                textTransform: 'uppercase', whiteSpace: 'nowrap',
              }}
            >
              Doha · Qatar · Est. 2019
            </span>
          </div>
        </div>
      </div>

      {/* Right panel — 56px padding on all sides, logo upper-centre */}
      <div
        className="relative w-full lg:w-[45%] h-[55vh] lg:h-full bg-[var(--color-fg)] flex flex-col overflow-hidden"
        style={{ padding: 'clamp(24px, 5vw, 56px)' }}
      >
        {/* Logo — upper area, centred horizontally */}
        <div className="flex-1 flex items-center justify-center overflow-hidden">
          <div ref={logoRef}>
            <Image
              src="/logo.svg"
              alt="Studio Échelle"
              width={280}
              height={70}
              className="h-auto"
              style={{ maxWidth: '280px', width: '100%' }}
              priority
            />
          </div>
        </div>

        {/* Bottom text block — same 56px padding as parent */}
        <div className="space-y-6">
          {/* Divider — matches content width */}
          <div ref={lineRef} className="overflow-hidden">
            <div className="h-px bg-[#2a2a28] w-full" />
          </div>

          <div className="overflow-hidden">
            <p
              ref={servicesRef}
              className="text-[12px] tracking-[0.15em] uppercase text-[var(--color-mid)]"
              style={{ fontFamily: 'var(--font-body), sans-serif', fontWeight: 400 }}
            >
              {t('architecture')} · {t('interior')} · {t('landscape')}
            </p>
          </div>

          <div className="overflow-hidden">
            <p
              ref={locationRef}
              className="text-[12px] tracking-[0.15em] uppercase text-[var(--color-mid)]"
              style={{ fontFamily: 'var(--font-body), sans-serif', fontWeight: 400 }}
            >
              {isRtl ? 'الدوحة، قطر' : 'Doha, Qatar'}
            </p>
          </div>

          <div className="overflow-hidden">
            <div ref={ctaRef}>
              <a
                href={`/${locale}/projects`}
                className="inline-block text-[11px] tracking-[0.2em] uppercase text-[var(--color-accent)] hover:text-[var(--color-accent-hover)] transition-colors duration-300"
                style={{ fontFamily: 'var(--font-body), sans-serif', fontWeight: 500 }}
              >
                {t('viewOurWork')} {isRtl ? '←' : '→'}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
