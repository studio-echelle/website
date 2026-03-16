'use client';

import { useState } from 'react';
import { ProjectCard } from '@/components/projects/ProjectCard';

const CATEGORIES = ['all', 'residential', 'commercial', 'hospitality', 'landscape'] as const;

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
  const [active, setActive] = useState<string>('all');

  const filtered = active === 'all' ? projects : projects.filter((p) => p.category === active);

  return (
    <div className="bg-[var(--color-fg)] min-h-screen pt-32 lg:pt-40 pb-20 lg:pb-32">
      <div className="container">
        {/* Filter tabs */}
        <div className="flex flex-wrap gap-6 lg:gap-10 mb-16 lg:mb-20">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`text-[11px] tracking-[0.15em] uppercase transition-colors duration-300 pb-2 border-b-[1.5px] ${
                active === cat
                  ? 'text-[var(--color-bg)] border-[var(--color-accent)]'
                  : 'text-[var(--color-mid)] border-transparent hover:text-[var(--color-bg)]'
              }`}
              style={{ fontFamily: 'var(--font-body), sans-serif', fontWeight: 500 }}
            >
              {cat === 'all' ? 'All' : cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>

        {/* Project grid */}
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
