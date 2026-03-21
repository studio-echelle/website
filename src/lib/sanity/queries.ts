import { client } from './client';

// Safe wrapper — returns fallback on any Sanity error
async function safeFetch<T>(query: string, params?: Record<string, unknown>, fallback?: T): Promise<T> {
  try {
    const result = await client.fetch(query, params);
    return result ?? (fallback as T);
  } catch {
    return fallback as T;
  }
}

// ——— Projects ———

export async function getAllProjects() {
  return safeFetch<unknown[]>(`
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
  `, undefined, []);
}

export async function getProjectBySlug(slug: string) {
  return safeFetch<unknown | null>(`
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
  `, { slug }, null);
}

export async function getProjectSlugs() {
  return safeFetch<string[]>(`
    *[_type == "project"].slug.current
  `, undefined, []);
}

// ——— Site Settings ———

export async function getSiteSettings() {
  return safeFetch<unknown | null>(`
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
  `, undefined, null);
}

// ——— Team ———

export async function getTeamMembers() {
  return safeFetch<unknown[]>(`
    *[_type == "teamMember"] | order(order asc) {
      _id,
      name,
      title,
      bio,
      bio_ar,
      portrait
    }
  `, undefined, []);
}

// ——— Services ———

export async function getServices() {
  return safeFetch<unknown[]>(`
    *[_type == "service"] | order(order asc) {
      _id,
      title,
      title_ar,
      slug,
      description,
      description_ar
    }
  `, undefined, []);
}
