import { defineField, defineType } from 'sanity';

export const project = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'title_ar',
      title: 'Title (Arabic)',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Residential', value: 'residential' },
          { title: 'Commercial', value: 'commercial' },
          { title: 'Hospitality', value: 'hospitality' },
          { title: 'Landscape', value: 'landscape' },
        ],
        layout: 'radio',
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
    }),
    defineField({
      name: 'year',
      title: 'Year',
      type: 'number',
    }),
    defineField({
      name: 'areaSqm',
      title: 'Area (sqm)',
      type: 'number',
    }),
    defineField({
      name: 'scope',
      title: 'Scope',
      type: 'string',
      description: 'e.g. "Design Concept", "Full — Concept + Supervision + Fit-Out"',
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'gallery',
      title: 'Gallery',
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({
              name: 'alt',
              title: 'Alt Text',
              type: 'string',
            }),
          ],
        },
      ],
    }),
    defineField({
      name: 'summary',
      title: 'Summary',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'summary_ar',
      title: 'Summary (Arabic)',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'narrative',
      title: 'Narrative',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'narrative_ar',
      title: 'Narrative (Arabic)',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'floorPlan',
      title: 'Floor Plan',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'relatedProjects',
      title: 'Related Projects',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'project' }] }],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'location',
      media: 'heroImage',
    },
  },
  orderings: [
    {
      title: 'Year (newest)',
      name: 'yearDesc',
      by: [{ field: 'year', direction: 'desc' }],
    },
  ],
});
