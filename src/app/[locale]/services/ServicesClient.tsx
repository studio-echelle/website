'use client';

import { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useGsap } from '@/lib/useGsap';

const CLD = 'https://res.cloudinary.com/darx0pq1z/image/upload/f_auto,q_auto:good,w_800';

// Real project images from Cloudinary — 2 per service
const SERVICE_IMAGES: string[][] = [
  // Interior Design — Lusail Villa + AM Residence
  [`${CLD}/se/projects/lusail-villa/gallery/3`, `${CLD}/se/projects/am-residence/gallery/1`],
  // Architectural Design — AAA Villa + GV007
  [`${CLD}/se/projects/aaa-villa/gallery/2`, `${CLD}/se/projects/gv007/gallery/1`],
  // Landscape Design — Lusail Villa exterior + Private Wellness Retreat
  [`${CLD}/se/projects/lusail-villa/gallery/8`, `${CLD}/se/projects/private-welness-retreat/gallery/7`],
  // Fit-Out Supervision — Mezami + Blue Salon
  [`${CLD}/se/projects/mezami/gallery/1`, `${CLD}/se/projects/blue-salon/gallery/2`],
  // Project Management — Chariot Muscat + 50-90 Studio
  [`${CLD}/se/projects/chariot-muscat/gallery/1`, `${CLD}/se/projects/50-90-studio/gallery/1`],
];

const SERVICE_KEYS = ['s1', 's2', 's3', 's4', 's5'] as const;

export function ServicesClient() {
  const t = useTranslations('servicesPage');
  const [mounted, setMounted] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const sectionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => { setMounted(true); }, []);

  useGsap((gsap) => {
    if (!mounted) return;
    return gsap.context(() => {
      if (heroRef.current) {
        const title = heroRef.current.querySelector('.hero-title');
        const tagline = heroRef.current.querySelector('.hero-tagline');
        if (title) gsap.from(title, { yPercent: 30, opacity: 0, duration: 1.2, ease: 'power3.out' });
        if (tagline) gsap.from(tagline, { y: 20, opacity: 0, duration: 1, delay: 0.4, ease: 'power2.out' });
      }
      // Service blocks render visible by default — no opacity animation
      // that could leave them invisible if ScrollTrigger doesn't fire
    });
  }, [mounted]);

  return (
    <div className="bg-[var(--color-fg)] min-h-screen">
      <div ref={heroRef} style={{ paddingTop: '160px' }} className="pb-20 lg:pb-28">
        <div className="container">
          <h1 className="hero-title text-[var(--color-bg)]" style={{ fontFamily: 'var(--font-display), serif', fontWeight: 300, fontSize: 'clamp(64px, 8vw, 96px)', lineHeight: 1.05, letterSpacing: '0.02em' }}>
            {t('title')}
          </h1>
          <p className="hero-tagline text-[var(--color-mid)] mt-6 max-w-2xl" style={{ fontFamily: 'var(--font-body), sans-serif', fontSize: '16px', lineHeight: 1.8 }}>
            {t('subtitle')}
          </p>
        </div>
      </div>

      <div ref={sectionsRef}>
        {SERVICE_KEYS.map((key, idx) => {
          const number = String(idx + 1).padStart(2, '0');
          return (
            <section key={key} className="service-block border-t border-white/[0.06] relative overflow-hidden" style={{ paddingBlock: 'clamp(80px, 10vw, 120px)' }}>
              <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none" style={{ fontFamily: 'var(--font-display), serif', fontSize: '200px', fontWeight: 300, color: 'rgba(255,255,255,0.03)', lineHeight: 1 }}>
                {number}
              </span>
              <div className="container relative">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
                  <div className="lg:col-span-7">
                    <p className="text-[var(--color-accent)] mb-6" style={{ fontFamily: 'var(--font-body), sans-serif', fontSize: '11px', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase' }}>{number}</p>
                    <h2 className="text-[var(--color-bg)] mb-8" style={{ fontFamily: 'var(--font-display), serif', fontSize: 'clamp(40px, 5vw, 64px)', fontWeight: 300, lineHeight: 1.15 }}>
                      {t(`${key}.name`)}
                    </h2>
                    <p className="text-[#8C8880] max-w-xl" style={{ fontFamily: 'var(--font-body), sans-serif', fontSize: '16px', lineHeight: 1.8 }}>
                      {t(`${key}.description`)}
                    </p>
                  </div>
                  <div className="lg:col-span-5 flex gap-4">
                    {SERVICE_IMAGES[idx].map((url, i) => (
                      <div key={i} className="relative flex-1 aspect-[3/4]">
                        <Image src={url} alt={`${t(`${key}.name`)} ${i + 1}`} fill className="object-cover" sizes="(min-width: 1024px) 20vw, 45vw" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          );
        })}
      </div>

      {/* CTA */}
      <section
        className="bg-[var(--color-accent)] text-[var(--color-bg)] flex items-center justify-center text-center"
        style={{ padding: 'clamp(80px, 10vw, 120px) 24px' }}
      >
        <div>
          <h2
            style={{
              fontFamily: 'var(--font-display), serif',
              fontWeight: 300,
              fontSize: 'clamp(36px, 4vw, 56px)',
              lineHeight: 1.2,
              maxWidth: '600px',
              margin: '0 auto',
            }}
          >
            Ready to start your project?
          </h2>
          <div className="mt-10">
            <a
              href="/en/contact"
              className="inline-block border border-[var(--color-bg)]/50 px-10 py-4 hover:bg-[var(--color-bg)] hover:text-[var(--color-accent)] transition-all duration-500"
              style={{
                fontFamily: 'var(--font-body), sans-serif',
                fontSize: '11px',
                fontWeight: 500,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
              }}
            >
              Get in Touch
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
