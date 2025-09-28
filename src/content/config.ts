import { defineCollection, z } from 'astro:content';

const posts = defineCollection({
  type: 'content',
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      date: z.coerce.date(),
      updated: z.coerce.date().optional(),
      summary: z
        .string()
        .max(240, {
          message: 'Keep the summary under 240 characters.',
        })
        .optional()
        .transform(value => value?.trim() ?? ''),
      category: z.enum(['ideas', 'essays']),
      tags: z.array(z.string()).default([]),
      draft: z.boolean().default(false),
      cover: image().optional(),
      canonical: z.string().url().optional(),
    }),
});

export const collections = { posts };
