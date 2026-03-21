'use client';

import Image from 'next/image';
import { useLocale } from 'next-intl';

interface ProjectCardProps {
  title: string;
  slug: string;
  location: string;
  year: number;
  imageUrl: string;
  index: number;
}

export function ProjectCard({ title, slug, location, year, imageUrl, index }: ProjectCardProps) {
  const locale = useLocale();
  const isPortrait = index % 2 !== 0;
  const aspectClass = isPortrait ? 'aspect-[3/4]' : 'aspect-[4/3]';

  return (
    <a
      href={`/${locale}/projects/${slug}`}
      className="group block"
      data-cursor="view"
    >
      <div className={`relative ${aspectClass} w-full overflow-hidden`}>
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          sizes="(min-width: 1024px) 50vw, 100vw"
        />
        {/* Permanent bottom gradient for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      </div>

      {/* Always-visible title + metadata below image */}
      <div className="mt-4">
        <h3
          className="text-[var(--color-bg)] group-hover:text-[var(--color-accent)] transition-colors duration-300"
          style={{
            fontFamily: 'var(--font-display), serif',
            fontWeight: 400,
            fontSize: '22px',
            lineHeight: 1.3,
          }}
        >
          {title}
        </h3>
        <p
          className="text-[var(--color-mid)] mt-1"
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
    </a>
  );
}
