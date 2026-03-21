import { ALL_PROJECTS } from '@/data/projects';
import { ProjectsGrid } from './ProjectsGrid';

export default function ProjectsPage() {
  const projects = ALL_PROJECTS.map((p) => ({
    _id: p._id,
    title: p.title,
    slug: { current: p.slug },
    category: p.category,
    location: p.location,
    year: p.year,
    imageUrl: p.heroImageUrl.replace('w_2400', 'w_1200'),
  }));

  return <ProjectsGrid projects={projects} />;
}
