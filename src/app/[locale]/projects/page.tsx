import { getAllProjects } from '@/lib/sanity/queries';
import { urlFor } from '@/lib/sanity/image';
import { ProjectsGrid } from './ProjectsGrid';

// Placeholder projects for when Sanity is empty
const PLACEHOLDER_PROJECTS = [
  {
    _id: 'p1',
    title: 'Joujou Al Fardan',
    slug: { current: 'joujou-al-fardan' },
    category: 'residential',
    location: 'Muscat, Oman',
    year: 2026,
    imageUrl:
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&q=80&auto=format&fit=crop',
  },
  {
    _id: 'p2',
    title: 'Via D\'Oro Compound',
    slug: { current: 'via-doro-compound' },
    category: 'residential',
    location: 'Qetaifan Island, Qatar',
    year: 2026,
    imageUrl:
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80&auto=format&fit=crop',
  },
  {
    _id: 'p3',
    title: 'Private Villa',
    slug: { current: 'private-villa-qetaifan-003' },
    category: 'residential',
    location: 'Qetaifan Island, Qatar',
    year: 2026,
    imageUrl:
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80&auto=format&fit=crop',
  },
  {
    _id: 'p4',
    title: 'Executive Tower Lobby',
    slug: { current: 'executive-tower-lobby' },
    category: 'commercial',
    location: 'West Bay, Doha',
    year: 2025,
    imageUrl:
      'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80&auto=format&fit=crop',
  },
  {
    _id: 'p5',
    title: 'Al Sadd Residence',
    slug: { current: 'al-sadd-residence' },
    category: 'residential',
    location: 'Al Sadd, Doha',
    year: 2024,
    imageUrl:
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80&auto=format&fit=crop',
  },
  {
    _id: 'p6',
    title: 'Boutique Hotel',
    slug: { current: 'boutique-hotel' },
    category: 'hospitality',
    location: 'Katara, Doha',
    year: 2025,
    imageUrl:
      'https://images.unsplash.com/photo-1559508551-44bff1de756b?w=800&q=80&auto=format&fit=crop',
  },
];

export default async function ProjectsPage() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let sanityProjects: any[] = [];
  try {
    sanityProjects = await getAllProjects();
  } catch {
    // Sanity may not be configured yet
  }

  const projects =
    sanityProjects && sanityProjects.length > 0
      ? sanityProjects.map((p) => ({
          _id: p._id,
          title: p.title,
          slug: p.slug,
          category: p.category,
          location: p.location,
          year: p.year,
          imageUrl: p.heroImage ? urlFor(p.heroImage).width(800).url() : PLACEHOLDER_PROJECTS[0].imageUrl,
        }))
      : PLACEHOLDER_PROJECTS;

  return <ProjectsGrid projects={projects} />;
}
