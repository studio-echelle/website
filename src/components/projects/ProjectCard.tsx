'use client';

import Image from 'next/image';
import { Link } from '@/i18n/navigation';

interface ProjectCardProps {
  title: string;
  slug: string;
  location: string;
  year: number;
  imageUrl: string;
  index: number;
}

export function ProjectCard({ title, slug, location, year, imageUrl, index }: ProjectCardProps) {
  // Alternate 4:3 (landscape) and 3:4 (portrait)
  const isPortrait = index % 2 !== 0;
  const aspectClass = isPortrait ? 'aspect-[3/4]' : 'aspect-[4/3]';

  return (
    <Link
      href={`/projects/${slug}` as '/projects'}
      className="group block relative overflow-hidden"
      data-cursor="view"
    >
      <div className={`relative ${aspectClass} w-full`}>
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          sizes="(min-width: 1024px) 50vw, 100vw"
        />
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-[var(--color-fg)]/0 group-hover:bg-[var(--color-fg)]/50 transition-colors duration-500" />
        {/* Metadata — visible on hover */}
        <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
          <h3
            className="text-[var(--color-bg)]"
            style={{
              fontFamily: 'var(--font-display), serif',
              fontWeight: 400,
              fontSize: 'clamp(24px, 2.5vw, 36px)',
              lineHeight: 1.2,
            }}
          >
            {title}
          </h3>
          <p
            className="text-[var(--color-bg)]/60 mt-2"
            style={{
              fontFamily: 'var(--font-body), sans-serif',
              fontSize: '12px',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
            }}
          >
            {location} · {year}
          </p>
        </div>
      </div>
    </Link>
  );
}
