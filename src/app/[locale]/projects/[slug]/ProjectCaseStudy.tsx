'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

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
}: Props) {
  const galleryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
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

    return () => ctx.revert();
  }, []);

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
        <div className="absolute bottom-12 lg:bottom-16 left-0 right-0">
          <div className="container">
            <h1
              className="text-[var(--color-bg)]"
              style={{
                fontFamily: 'var(--font-display), serif',
                fontWeight: 300,
                fontSize: 'clamp(48px, 6vw, 72px)',
                lineHeight: 1.1,
              }}
            >
              {title}
            </h1>
            <p
              className="text-[var(--color-mid)] mt-3"
              style={{
                fontFamily: 'var(--font-body), sans-serif',
                fontSize: '12px',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
              }}
            >
              {location} · {year}
            </p>
          </div>
        </div>
      </div>

      {/* Metadata bar */}
      <div className="border-y border-white/[0.06]">
        <div className="container py-6 flex flex-wrap gap-y-4 divide-x divide-white/[0.08]">
          {metaItems.map((item) => (
            <div key={item.label} className="px-6 first:ps-0">
              <p
                className="text-[var(--color-mid)]"
                style={{ fontFamily: 'var(--font-body), sans-serif', fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase' }}
              >
                {item.label}
              </p>
              <p
                className="text-[var(--color-bg)] mt-1"
                style={{ fontFamily: 'var(--font-body), sans-serif', fontSize: '14px' }}
              >
                {item.value}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Narrative + first 2 gallery images */}
      <div className="container" style={{ paddingBlock: 'var(--section-py)' }}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          <div>
            <p
              className="text-[var(--color-bg)]/80"
              style={{
                fontFamily: 'var(--font-body), sans-serif',
                fontSize: 'clamp(16px, 1.2vw, 19px)',
                lineHeight: 1.8,
              }}
            >
              {narrative}
            </p>
          </div>
          <div className="flex flex-col gap-6">
            {galleryUrls.slice(0, 2).map((url, i) => (
              <div key={i} className="relative aspect-[4/3]">
                <Image src={url} alt={`${title} — ${i + 1}`} fill className="object-cover" sizes="(min-width: 1024px) 50vw, 100vw" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Gallery — masonry grid */}
      {galleryUrls.length > 2 && (
        <div className="container pb-20 lg:pb-32" ref={galleryRef}>
          <div className="columns-1 md:columns-2 lg:columns-3 gap-4">
            {galleryUrls.slice(2).map((url, i) => (
              <div key={i} className="gallery-img mb-4 break-inside-avoid">
                <div className="relative aspect-auto">
                  <Image
                    src={url}
                    alt={`${title} gallery — ${i + 3}`}
                    width={800}
                    height={600}
                    className="w-full h-auto object-cover"
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
