import { client } from './client';

// ——— Projects ———

export async function getAllProjects() {
  return client.fetch(`
    *[_type == "project"] | order(year desc) {
      _id,
      title,
      title_ar,
      slug,
      category,
      location,
      year,
      areaSqm,
      scope,
      featured,
      heroImage,
      summary,
      summary_ar
    }
  `);
}

export async function getProjectBySlug(slug: string) {
  return client.fetch(
    `
    *[_type == "project" && slug.current == $slug][0] {
      _id,
      title,
      title_ar,
      slug,
      category,
      location,
      year,
      areaSqm,
      scope,
      heroImage,
      gallery,
      summary,
      summary_ar,
      narrative,
      narrative_ar,
      floorPlan,
      relatedProjects[]-> {
        _id,
        title,
        slug,
        category,
        location,
        year,
        heroImage
      }
    }
  `,
    { slug },
  );
}

export async function getProjectSlugs() {
  return client.fetch(`
    *[_type == "project"].slug.current
  `);
}

// ——— Site Settings ———

export async function getSiteSettings() {
  return client.fetch(`
    *[_type == "siteSettings"][0] {
      studioName,
      tagline,
      tagline_ar,
      contactEmail,
      contactPhone,
      address,
      instagramHandle,
      heroVideoUrl,
      heroFallbackImage,
      featuredProjects[]-> {
        _id,
        title,
        slug,
        category,
        location,
        year,
        heroImage
      },
      stats
    }
  `);
}

// ——— Team ———

export async function getTeamMembers() {
  return client.fetch(`
    *[_type == "teamMember"] | order(order asc) {
      _id,
      name,
      title,
      bio,
      bio_ar,
      portrait
    }
  `);
}

// ——— Services ———

export async function getServices() {
  return client.fetch(`
    *[_type == "service"] | order(order asc) {
      _id,
      title,
      title_ar,
      slug,
      description,
      description_ar
    }
  `);
}
