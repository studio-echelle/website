import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getProjectBySlug, getProjectSlugs } from '@/lib/sanity/queries';
import { urlFor } from '@/lib/sanity/image';
import { ProjectCaseStudy } from './ProjectCaseStudy';

// Placeholder data for when Sanity has no content
const PLACEHOLDER_PROJECT = {
  title: 'Joujou Al Fardan',
  category: 'residential',
  location: 'Muscat, Oman',
  year: 2026,
  areaSqm: 850,
  scope: 'Design Concept',
  heroImageUrl:
    'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1920&q=80&auto=format&fit=crop',
  narrative:
    'A coastal residence embodying a seamless dialogue between nature and architecture. Organic textures, curved walls, natural stone, and hand-finished plaster surfaces create a sanctuary of warmth and sophistication. Arched windows frame uninterrupted ocean views, dissolving the boundary between indoors and out. Earthy hues, terracotta tones, and lush greenery weave a sense of grounding into the airy spaces, harmonising the raw beauty of the landscape with a refined yet relaxed living environment.',
  galleryUrls: [
    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=800&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1600566753376-12c8ab7c3376?w=800&q=80&auto=format&fit=crop',
  ],
  relatedProjects: [],
};

export async function generateStaticParams() {
  try {
    const slugs = await getProjectSlugs();
    if (slugs && slugs.length > 0) {
      return slugs.map((slug: string) => ({ slug }));
    }
  } catch {
    // Sanity not configured
  }
  return [
    { slug: 'joujou-al-fardan' },
    { slug: 'via-doro-compound' },
    { slug: 'private-villa-qetaifan-003' },
  ];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  let project;
  try {
    project = await getProjectBySlug(slug);
  } catch {
    // fallback
  }
  const title = project?.title || slug.replace(/-/g, ' ').replace(/\b\w/g, (c: string) => c.toUpperCase());
  return {
    title: `${title} — Studio Échelle`,
    description: project?.summary || `${title} by Studio Échelle`,
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let project: any = null;
  try {
    project = await getProjectBySlug(slug);
  } catch {
    // Sanity not configured
  }

  if (project) {
    return (
      <ProjectCaseStudy
        title={project.title}
        category={project.category}
        location={project.location}
        year={project.year}
        areaSqm={project.areaSqm}
        scope={project.scope}
        heroImageUrl={project.heroImage ? urlFor(project.heroImage).width(1920).url() : PLACEHOLDER_PROJECT.heroImageUrl}
        narrative={project.summary || ''}
        galleryUrls={
          project.gallery
            ? project.gallery.map((img: { alt?: string }) => urlFor(img).width(800).url())
            : PLACEHOLDER_PROJECT.galleryUrls
        }
        relatedProjects={project.relatedProjects || []}
      />
    );
  }

  // Placeholder fallback
  if (!['joujou-al-fardan', 'via-doro-compound', 'private-villa-qetaifan-003'].includes(slug)) {
    notFound();
  }

  return (
    <ProjectCaseStudy
      title={PLACEHOLDER_PROJECT.title}
      category={PLACEHOLDER_PROJECT.category}
      location={PLACEHOLDER_PROJECT.location}
      year={PLACEHOLDER_PROJECT.year}
      areaSqm={PLACEHOLDER_PROJECT.areaSqm}
      scope={PLACEHOLDER_PROJECT.scope}
      heroImageUrl={PLACEHOLDER_PROJECT.heroImageUrl}
      narrative={PLACEHOLDER_PROJECT.narrative}
      galleryUrls={PLACEHOLDER_PROJECT.galleryUrls}
      relatedProjects={[]}
    />
  );
}
