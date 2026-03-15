'use client';

import { useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import Image from 'next/image';
import { gsap } from 'gsap';

const HERO_IMAGE =
  'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1920&q=80&auto=format&fit=crop';

export function Hero() {
  const t = useTranslations('hero');
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.7 });

      tl.from(titleRef.current, {
        yPercent: 100,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out',
      })
        .from(
          taglineRef.current,
          {
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: 'power2.out',
          },
          '-=0.4',
        )
        .from(
          ctaRef.current,
          {
            y: 20,
            opacity: 0,
            duration: 0.6,
            ease: 'power2.out',
          },
          '-=0.3',
        )
        .from(
          scrollRef.current,
          {
            opacity: 0,
            duration: 0.6,
          },
          '-=0.2',
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden bg-[var(--color-dark)]"
    >
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src={HERO_IMAGE}
          alt="Luxury interior by Studio Échelle"
          fill
          priority
          className="object-cover opacity-40"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-dark)]/30 via-transparent to-[var(--color-dark)]/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-[var(--color-bg)] px-6 max-w-4xl">
        <div className="overflow-hidden">
          <h1 ref={titleRef} className="text-hero">
            {t('title')}
          </h1>
        </div>

        <p
          ref={taglineRef}
          className="mt-6 lg:mt-8 text-[17px] lg:text-[19px] leading-relaxed text-[var(--color-bg)]/70 max-w-xl mx-auto"
          style={{ fontFamily: 'var(--font-body), sans-serif' }}
        >
          {t('tagline')}
        </p>

        <div ref={ctaRef} className="mt-10 lg:mt-12">
          <Link
            href="/projects"
            className="inline-block text-label border border-[var(--color-bg)]/40 px-8 py-4 hover:bg-[var(--color-bg)] hover:text-[var(--color-dark)] transition-all duration-500"
          >
            {t('cta')}
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] uppercase tracking-[0.2em] text-[var(--color-bg)]/40">
          Scroll
        </span>
        <div className="w-px h-10 bg-[var(--color-bg)]/20 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1/2 bg-[var(--color-bg)]/60 animate-[scrollLine_1.8s_ease-in-out_infinite]" />
        </div>
      </div>
    </section>
  );
}
