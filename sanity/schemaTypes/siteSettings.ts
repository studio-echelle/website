import { defineField, defineType } from 'sanity';

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'studioName',
      title: 'Studio Name',
      type: 'string',
      initialValue: 'Studio Échelle',
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
    }),
    defineField({
      name: 'tagline_ar',
      title: 'Tagline (Arabic)',
      type: 'string',
    }),
    defineField({
      name: 'contactEmail',
      title: 'Contact Email',
      type: 'string',
      initialValue: 'hello@studioechelle.com',
    }),
    defineField({
      name: 'contactPhone',
      title: 'Contact Phone',
      type: 'string',
      initialValue: '+974 5121 8333',
    }),
    defineField({
      name: 'address',
      title: 'Address',
      type: 'string',
      initialValue: 'The Pearl, Doha, Qatar',
    }),
    defineField({
      name: 'instagramHandle',
      title: 'Instagram Handle',
      type: 'string',
      initialValue: '@studioechelle',
    }),
    defineField({
      name: 'heroVideoUrl',
      title: 'Hero Video URL',
      type: 'string',
      description: 'Cloudinary or direct video URL',
    }),
    defineField({
      name: 'heroFallbackImage',
      title: 'Hero Fallback Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'featuredProjects',
      title: 'Featured Projects',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'project' }] }],
      validation: (r) => r.max(3),
    }),
    defineField({
      name: 'stats',
      title: 'Stats',
      type: 'object',
      fields: [
        defineField({ name: 'projects', title: 'Projects', type: 'number', initialValue: 120 }),
        defineField({ name: 'countries', title: 'Countries', type: 'number', initialValue: 5 }),
        defineField({ name: 'years', title: 'Years', type: 'number', initialValue: 6 }),
        defineField({ name: 'sqm', title: 'SQM', type: 'number', initialValue: 60000 }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Site Settings' };
    },
  },
});
