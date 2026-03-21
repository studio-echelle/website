'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useLocale } from 'next-intl';
import { useGsap } from '@/lib/useGsap';

interface Props {
  title: string;
  category: string;
  location: string;
  year: number;
  areaSqm?: number;
  scope?: string;
  heroImageUrl: string;
  narrative: string;
  galleryUrls: string[];
  relatedProjects: { _id: string; title: string; slug: { current: string }; location: string; year: number; heroImage?: unknown }[];
  prevProject?: { title: string; slug: string } | null;
  nextProject?: { title: string; slug: string } | null;
}

export function ProjectCaseStudy({
  title,
  category,
  location,
  year,
  areaSqm,
  scope,
  heroImageUrl,
  narrative,
  galleryUrls,
  prevProject,
  nextProject,
}: Props) {
  const locale = useLocale();
  const [mounted, setMounted] = useState(false);
  const galleryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useGsap((gsap) => {
    if (!mounted) return;
    return gsap.context(() => {
      const images = galleryRef.current?.querySelectorAll('.gallery-img');
      if (images) {
        gsap.from(Array.from(images), {
          scale: 0.85,
          opacity: 0,
          duration: 1.4,
          ease: 'power2.out',
          stagger: 0.15,
          scrollTrigger: {
            trigger: galleryRef.current,
            start: 'top 85%',
          },
        });
      }
    });
  }, [mounted]);

  const metaItems = [
    { label: 'Category', value: category.charAt(0).toUpperCase() + category.slice(1) },
    { label: 'Location', value: location },
    { label: 'Year', value: String(year) },
    ...(areaSqm ? [{ label: 'Area', value: `${areaSqm.toLocaleString()} sqm` }] : []),
    ...(scope ? [{ label: 'Scope', value: scope }] : []),
  ];

  return (
    <div className="bg-[var(--color-fg)] min-h-screen">
      {/* Hero */}
      <div className="relative h-[70vh] min-h-[500px]">
        <Image
          src={heroImageUrl}
          alt={title}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-fg)] via-[var(--color-fg)]/30 to-transparent" />
        <div className="absolute bottom-12 lg:bottom-16 left-0 right-0" style={{ paddingInline: '56px' }}>
          <h1
            className="text-[var(--color-bg)]"
            style={{
              fontFamily: 'var(--font-display), serif',
              fontWeight: 300,
              fontSize: 'clamp(48px, 6vw, 80px)',
              lineHeight: 1.1,
            }}
          >
            {title}
          </h1>
          <p
            className="text-[var(--color-mid)]"
            style={{
              fontFamily: 'var(--font-body), sans-serif',
              fontSize: '12px',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              marginTop: '8px',
            }}
          >
            {location} · {year}
          </p>
        </div>
      </div>

      {/* Metadata bar */}
      <div style={{ background: '#0E0E0C', padding: '32px 56px' }}>
        {/* Desktop: flex row with dividers */}
        <div className="hidden md:flex" style={{ gap: '48px' }}>
          {metaItems.map((item, i) => (
            <div key={item.label} className="flex" style={{ gap: '48px' }}>
              {i > 0 && (
                <div style={{ width: '1px', background: 'rgba(255,255,255,0.08)', alignSelf: 'stretch' }} />
              )}
              <div style={{ minWidth: 0 }}>
                <p
                  style={{
                    fontFamily: 'var(--font-body), sans-serif',
                    fontSize: '10px',
                    fontWeight: 500,
                    letterSpacing: '0.16em',
                    textTransform: 'uppercase',
                    color: '#8C8880',
                    marginBottom: '6px',
                  }}
                >
                  {item.label}
                </p>
                <p
                  style={{
                    fontFamily: 'var(--font-display), serif',
                    fontSize: '15px',
                    fontWeight: 300,
                    color: '#F5F2ED',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {item.value}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile: 2×2 grid */}
        <div className="grid grid-cols-2 gap-x-12 gap-y-8 md:hidden">
          {metaItems.map((item) => (
            <div key={item.label}>
              <p
                style={{
                  fontFamily: 'var(--font-body), sans-serif',
                  fontSize: '10px',
                  fontWeight: 500,
                  letterSpacing: '0.16em',
                  textTransform: 'uppercase',
                  color: '#8C8880',
                  marginBottom: '6px',
                }}
              >
                {item.label}
              </p>
              <p
                style={{
                  fontFamily: 'var(--font-display), serif',
                  fontSize: '15px',
                  fontWeight: 300,
                  color: '#F5F2ED',
                }}
              >
                {item.value}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Narrative + first 2 gallery images */}
      <div className="container" style={{ paddingBlock: 'var(--section-py)' }}>
        <div className="grid grid-cols-1 lg:grid-cols-2" style={{ gap: '64px' }}>
          <div>
            <p
              className="text-[#D5D0C8]"
              style={{
                fontFamily: 'var(--font-body), sans-serif',
                fontSize: 'clamp(16px, 1.2vw, 19px)',
                lineHeight: 1.8,
              }}
            >
              {narrative}
            </p>
          </div>
          <div className="flex flex-col gap-8">
            {galleryUrls.slice(0, 2).map((url, i) => (
              <div key={i} className="relative aspect-[4/3]">
                <Image src={url} alt={`${title} — ${i + 1}`} fill className="object-cover" sizes="(min-width: 1024px) 50vw, 100vw" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Gallery grid */}
      {galleryUrls.length > 2 && (
        <div className="container pb-20 lg:pb-32" ref={galleryRef}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {galleryUrls.slice(2).map((url, i) => (
              <div key={i} className="gallery-img relative aspect-[4/3]">
                <Image
                  src={url}
                  alt={`${title} gallery — ${i + 3}`}
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Project navigation */}
      <div className="border-t border-white/[0.06]" style={{ padding: '48px 56px' }}>
        <div className="flex items-center justify-between">
          <div>
            {prevProject ? (
              <a
                href={`/${locale}/projects/${prevProject.slug}`}
                className="group flex items-center gap-3 text-[var(--color-mid)] hover:text-[var(--color-bg)] transition-colors duration-300"
              >
                <span style={{ fontSize: '18px' }}>←</span>
                <div>
                  <p style={{ fontFamily: 'var(--font-body), sans-serif', fontSize: '10px', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase' }}>Previous</p>
                  <p style={{ fontFamily: 'var(--font-display), serif', fontSize: '18px', fontWeight: 300 }} className="text-[var(--color-bg)] mt-1">{prevProject.title}</p>
                </div>
              </a>
            ) : <div />}
          </div>

          <a
            href={`/${locale}/projects`}
            className="text-[var(--color-mid)] hover:text-[var(--color-accent)] transition-colors duration-300"
            style={{ fontFamily: 'var(--font-body), sans-serif', fontSize: '11px', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase' }}
          >
            All Projects
          </a>

          <div>
            {nextProject ? (
              <a
                href={`/${locale}/projects/${nextProject.slug}`}
                className="group flex items-center gap-3 text-[var(--color-mid)] hover:text-[var(--color-bg)] transition-colors duration-300 text-end"
              >
                <div>
                  <p style={{ fontFamily: 'var(--font-body), sans-serif', fontSize: '10px', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase' }}>Next</p>
                  <p style={{ fontFamily: 'var(--font-display), serif', fontSize: '18px', fontWeight: 300 }} className="text-[var(--color-bg)] mt-1">{nextProject.title}</p>
                </div>
                <span style={{ fontSize: '18px' }}>→</span>
              </a>
            ) : <div />}
          </div>
        </div>
      </div>
    </div>
  );
}
