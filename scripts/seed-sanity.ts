/**
 * One-time seed script — creates the SiteSettings singleton in Sanity.
 * Run: npx ts-node scripts/seed-sanity.ts
 */

import { createClient } from 'next-sanity';

const token = process.env.SANITY_API_TOKEN;
if (!token) {
  console.error('Missing SANITY_API_TOKEN. Source .env.echelle first.');
  process.exit(1);
}

const client = createClient({
  projectId: 'xhaz6bmd',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token,
});

async function seed() {
  console.log('Seeding SiteSettings singleton…');

  const existing = await client.fetch('*[_type == "siteSettings"][0]._id');
  const doc = {
    _id: 'siteSettings',
    _type: 'siteSettings',
    studioName: 'Studio Échelle',
    tagline:
      'We design with love, for form, for material, and for the people who live with our work.',
    contactEmail: 'hello@studioechelle.com',
    contactPhone: '+974 5121 8333',
    address: 'The Pearl, Doha, Qatar',
    instagramHandle: 'studioechelle',
    stats: {
      projects: 120,
      countries: 5,
      years: 6,
      sqm: 60000,
    },
  };

  if (existing) {
    console.log(`SiteSettings already exists (${existing}). Patching…`);
    await client.patch(existing).set(doc).commit();
  } else {
    console.log('Creating new SiteSettings document…');
    await client.createOrReplace(doc);
  }

  console.log('Done — SiteSettings seeded.');
}

seed().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
