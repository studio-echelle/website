import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { ALL_PROJECTS, PROJECT_MAP } from '@/data/projects';
import { ProjectCaseStudy } from './ProjectCaseStudy';

export const dynamicParams = true;

export function generateStaticParams() {
  const locales = ['en', 'ar'];
  return locales.flatMap((locale) =>
    ALL_PROJECTS.map((p) => ({ locale, slug: p.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = PROJECT_MAP[slug];
  const title = project?.title || slug.replace(/-/g, ' ').replace(/\b\w/g, (c: string) => c.toUpperCase());
  return {
    title: `${title} — Studio Échelle`,
    description: project?.narrative?.slice(0, 160) || `${title} by Studio Échelle`,
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const project = PROJECT_MAP[slug];
  if (!project) {
    notFound();
  }

  // Compute prev/next
  const idx = ALL_PROJECTS.findIndex((p) => p.slug === slug);
  const prev = idx > 0 ? ALL_PROJECTS[idx - 1] : null;
  const next = idx < ALL_PROJECTS.length - 1 ? ALL_PROJECTS[idx + 1] : null;

  return (
    <ProjectCaseStudy
      title={project.title}
      category={project.category}
      location={project.location}
      year={project.year}
      areaSqm={project.areaSqm}
      scope={project.scope}
      heroImageUrl={project.heroImageUrl}
      narrative={project.narrative}
      galleryUrls={project.galleryUrls}
      relatedProjects={[]}
      prevProject={prev ? { title: prev.title, slug: prev.slug } : null}
      nextProject={next ? { title: next.title, slug: next.slug } : null}
    />
  );
}
