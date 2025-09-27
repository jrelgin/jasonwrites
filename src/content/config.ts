import { defineCollection, z } from 'astro:content';

const posts = defineCollection({
  type: 'content',
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      date: z.coerce.date(),
      updated: z.coerce.date().optional(),
      summary: z.string().min(10, {
        message: 'Provide a short summary (≈160 characters).',
      }),
      category: z.enum(['ideas', 'essays']),
      tags: z.array(z.string()).default([]),
      draft: z.boolean().default(false),
      cover: image().optional(),
      canonical: z.string().url().optional(),
    }),
});

export const collections = { posts };
