'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useGsap } from '@/lib/useGsap';

interface TeamMember {
  _id: string;
  name: string;
  title: string;
  portraitUrl: string | null;
}

export function AboutClient({ team }: { team: TeamMember[] }) {
  const t = useTranslations('about');
  const [mounted, setMounted] = useState(false);
  const [muted, setMuted] = useState(true);
  const [playing, setPlaying] = useState(true);
  const sectionRef = useRef<HTMLDivElement>(null);
  const storyRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const valuesRef = useRef<HTMLDivElement>(null);

  const values = [
    { number: '01', statement: t('value1') },
    { number: '02', statement: t('value2') },
    { number: '03', statement: t('value3') },
  ];

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleMute = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setMuted(videoRef.current.muted);
    }
  }, []);

  const togglePlay = useCallback(() => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setPlaying(true);
      } else {
        videoRef.current.pause();
        setPlaying(false);
      }
    }
  }, []);

  useGsap((gsap) => {
    if (!mounted) return;
    return gsap.context(() => {
      if (storyRef.current) {
        gsap.from(storyRef.current, {
          y: 30, opacity: 0, duration: 1, ease: 'power2.out', delay: 0.3,
        });
      }

      if (valuesRef.current) {
        valuesRef.current.querySelectorAll('.value-block').forEach((block) => {
          const words = block.querySelectorAll('.value-word');
          gsap.from(words, {
            yPercent: 100, stagger: 0.03, duration: 0.7, ease: 'power3.out',
            scrollTrigger: { trigger: block, start: 'top 75%' },
          });
        });
      }
    }, sectionRef);
  }, [mounted]);

  return (
    <div ref={sectionRef} className="bg-[var(--color-fg)] min-h-screen">
      {/* Hero — Founder Video + Studio Story */}
      <section className="min-h-screen flex flex-col lg:flex-row">
        {/* Video panel — vertical 9:16 */}
        <div className="relative w-full lg:w-[42%] h-[70vh] lg:h-screen bg-[#0a0a08] overflow-hidden flex-shrink-0">
          {mounted && (
            <video
              ref={videoRef}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              className="absolute inset-0 w-full h-full object-cover"
            >
              <source src="/video/about-intro.mp4" type="video/mp4" />
            </video>
          )}

          {/* Video controls — bottom left */}
          <div className="absolute bottom-6 left-6 z-10 flex gap-3">
            <button
              onClick={togglePlay}
              className="w-10 h-10 rounded-full border border-white/20 bg-black/40 backdrop-blur-sm flex items-center justify-center text-white/80 hover:text-white hover:border-white/40 transition-all duration-300"
              aria-label={playing ? 'Pause video' : 'Play video'}
            >
              {playing ? (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16" /><rect x="14" y="4" width="4" height="16" /></svg>
              ) : (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><polygon points="5,3 19,12 5,21" /></svg>
              )}
            </button>
            <button
              onClick={toggleMute}
              className="w-10 h-10 rounded-full border border-white/20 bg-black/40 backdrop-blur-sm flex items-center justify-center text-white/80 hover:text-white hover:border-white/40 transition-all duration-300"
              aria-label={muted ? 'Unmute' : 'Mute'}
            >
              {muted ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polygon points="11,5 6,9 2,9 2,15 6,15 11,19" fill="currentColor" /><line x1="23" y1="9" x2="17" y2="15" /><line x1="17" y1="9" x2="23" y2="15" /></svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polygon points="11,5 6,9 2,9 2,15 6,15 11,19" fill="currentColor" /><path d="M19.07 4.93a10 10 0 0 1 0 14.14" /><path d="M15.54 8.46a5 5 0 0 1 0 7.07" /></svg>
              )}
            </button>
          </div>

          {/* Gradient overlay at bottom for text readability */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
        </div>

        {/* Story panel */}
        <div
          className="flex-1 flex flex-col justify-center overflow-hidden"
          style={{ padding: 'clamp(32px, 5vw, 80px)' }}
          ref={storyRef}
        >
          <p
            className="text-[var(--color-accent)]"
            style={{
              fontFamily: 'var(--font-body), sans-serif',
              fontSize: '11px', fontWeight: 500,
              letterSpacing: '0.12em', textTransform: 'uppercase',
              marginBottom: '32px',
            }}
          >
            {t('studioLabel')}
          </p>
          <h1
            className="text-[var(--color-bg)]"
            style={{
              fontFamily: 'var(--font-display), serif',
              fontWeight: 300,
              fontSize: 'clamp(36px, 4vw, 64px)',
              lineHeight: 1.15,
              letterSpacing: '0.02em',
            }}
          >
            {t('heading')}
          </h1>
          <p
            className="text-[#D5D0C8] mt-8 lg:mt-12"
            style={{
              fontFamily: 'var(--font-body), sans-serif',
              fontSize: '16px', lineHeight: 1.8,
              maxWidth: '540px',
            }}
          >
            {t('description')}
          </p>
          <p
            className="mt-10"
            style={{
              fontFamily: 'var(--font-body), sans-serif',
              fontSize: '11px', fontWeight: 500,
              letterSpacing: '0.12em', textTransform: 'uppercase',
              color: 'var(--color-accent)',
            }}
          >
            {t('established')}
          </p>
        </div>
      </section>

      {/* Team */}
      <section style={{ paddingBlock: 'var(--section-py)' }}>
        <div className="container">
          <p className="text-[var(--color-accent)] mb-16" style={{ fontFamily: 'var(--font-body), sans-serif', fontSize: '11px', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
            {t('teamLabel')}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
            {team.map((member) => (
              <div key={member._id} className="group">
                <div className="relative aspect-[3/4] bg-[#1a1a18] overflow-hidden mb-6">
                  {member.portraitUrl ? (
                    <Image src={member.portraitUrl} alt={member.name} fill className="object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-[1.02]" sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-[var(--color-mid)]/30" style={{ fontFamily: 'var(--font-display), serif', fontSize: '72px', fontWeight: 300 }}>
                        {member.name.split(' ').map((n) => n[0]).join('')}
                      </span>
                    </div>
                  )}
                </div>
                <div className="relative">
                  <h3 className="text-[var(--color-bg)]" style={{ fontFamily: 'var(--font-display), serif', fontSize: '24px', fontWeight: 400 }}>{member.name}</h3>
                  <p className="text-[var(--color-mid)] mt-2" style={{ fontFamily: 'var(--font-body), sans-serif', fontSize: '11px', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase' }}>{member.title}</p>
                  <div className="h-px bg-[var(--color-accent)] mt-4 w-0 group-hover:w-full transition-all duration-500" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section style={{ paddingBlock: 'var(--section-py)' }}>
        <div className="container">
          <p className="text-[var(--color-accent)] mb-16" style={{ fontFamily: 'var(--font-body), sans-serif', fontSize: '11px', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
            03 — Our Process
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 mb-24 lg:mb-32">
            <div>
              <h2 className="text-[var(--color-bg)]" style={{ fontFamily: 'var(--font-display), serif', fontWeight: 300, fontSize: 'clamp(32px, 4vw, 48px)', lineHeight: 1.2 }}>
                A structured approach to exceptional spaces
              </h2>
            </div>
            <div>
              <p className="text-[#D5D0C8]" style={{ fontFamily: 'var(--font-body), sans-serif', fontSize: '16px', lineHeight: 1.8 }}>
                Our methodology is aligned with RIBA work stages, adapted for the GCC context. Every project follows a clear, documented process from initial brief through to handover — ensuring nothing is left to chance and every decision is traceable.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {[
              { phase: '01', title: 'Brief & Discovery', desc: 'Site visits, client interviews, spatial analysis, budget framework, and project programme establishment.' },
              { phase: '02', title: 'Concept Design', desc: 'Moodboards, spatial planning, 3D visualisations, material palettes, and preliminary specifications.' },
              { phase: '03', title: 'Technical Design', desc: 'Detailed drawings, MEP coordination, shop drawings review, material procurement, and contractor tendering.' },
              { phase: '04', title: 'Delivery & Handover', desc: 'Site supervision, quality control, snag lists, final styling, and comprehensive project documentation.' },
            ].map((step) => (
              <div key={step.phase} className="bg-[var(--color-fg)] border border-white/[0.06] p-10 lg:p-12">
                <p className="text-[var(--color-accent)] mb-6" style={{ fontFamily: 'var(--font-body), sans-serif', fontSize: '11px', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                  Phase {step.phase}
                </p>
                <h3 className="text-[var(--color-bg)] mb-4" style={{ fontFamily: 'var(--font-display), serif', fontSize: '24px', fontWeight: 400 }}>
                  {step.title}
                </h3>
                <p className="text-[#D5D0C8]" style={{ fontFamily: 'var(--font-body), sans-serif', fontSize: '14px', lineHeight: 1.7 }}>
                  {step.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-16 border-t border-white/[0.06] pt-12">
            <p className="text-[var(--color-mid)] mb-8" style={{ fontFamily: 'var(--font-body), sans-serif', fontSize: '11px', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
              Standard Deliverables
            </p>
            <div className="flex flex-wrap gap-3">
              {[
                'Floor Plans', 'Ceiling Plans', 'Elevations', '3D Renders',
                'Material Specifications', 'FF&E Schedules', 'Lighting Design',
                'MEP Coordination', 'Shop Drawing Review', 'Site Reports',
                'Bill of Quantities', 'Project Timeline'
              ].map((item) => (
                <span
                  key={item}
                  className="border border-white/[0.08] px-4 py-2"
                  style={{ fontFamily: 'var(--font-body), sans-serif', fontSize: '12px', color: '#D5D0C8' }}
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section style={{ paddingBlock: 'var(--section-py)' }} ref={valuesRef}>
        <div className="container">
          <p className="text-[var(--color-accent)] mb-16" style={{ fontFamily: 'var(--font-body), sans-serif', fontSize: '11px', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
            {t('valuesLabel')}
          </p>
          <div className="flex flex-col">
            {values.map((v) => (
              <div key={v.number} className="value-block border-t border-white/[0.08] py-16 lg:py-20">
                <p className="text-[var(--color-accent)] mb-6" style={{ fontFamily: 'var(--font-body), sans-serif', fontSize: '11px', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase' }}>{v.number}</p>
                <p className="text-[var(--color-bg)] max-w-[800px]" style={{ fontFamily: 'var(--font-display), serif', fontSize: 'clamp(28px, 3vw, 36px)', fontWeight: 300, lineHeight: 1.35 }}>
                  {mounted ? (
                    <>{v.statement.split(' ').map((word, i) => (
                      <span key={i} className="inline-block overflow-hidden align-top">
                        <span className="value-word inline-block">{word}</span>{'\u00A0'}
                      </span>
                    ))}</>
                  ) : v.statement}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
