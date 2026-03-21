'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { ProjectCard } from '@/components/projects/ProjectCard';

const CATEGORY_KEYS = ['all', 'residential', 'commercial', 'hospitality', 'landscape'] as const;

interface Project {
  _id: string;
  title: string;
  slug: { current: string };
  category: string;
  location: string;
  year: number;
  imageUrl: string;
}

export function ProjectsGrid({ projects }: { projects: Project[] }) {
  const t = useTranslations('projects');
  const [active, setActive] = useState<string>('all');

  const filtered = active === 'all' ? projects : projects.filter((p) => p.category === active);

  return (
    <div className="bg-[var(--color-fg)] min-h-screen pb-20 lg:pb-32" style={{ paddingTop: '160px' }}>
      <div className="container">
        <h1
          className="text-[var(--color-bg)] mb-12 lg:mb-16"
          style={{
            fontFamily: 'var(--font-display), serif',
            fontWeight: 300,
            fontSize: 'clamp(48px, 6vw, 72px)',
            lineHeight: 1.1,
          }}
        >
          Our Work
        </h1>
        <div className="flex flex-wrap gap-6 lg:gap-10 mb-16 lg:mb-20">
          {CATEGORY_KEYS.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`text-[13px] tracking-[0.12em] uppercase transition-colors duration-300 pb-2 border-b-2 ${
                active === cat
                  ? 'text-[#F5F2ED] border-[var(--color-accent)]'
                  : 'text-[var(--color-mid)] border-transparent hover:text-[#F5F2ED]'
              }`}
              style={{ fontFamily: 'var(--font-body), sans-serif', fontWeight: 500 }}
            >
              {t(cat)}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {filtered.map((project, i) => (
            <ProjectCard
              key={project._id}
              title={project.title}
              slug={project.slug.current}
              location={project.location}
              year={project.year}
              imageUrl={project.imageUrl}
              index={i}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
