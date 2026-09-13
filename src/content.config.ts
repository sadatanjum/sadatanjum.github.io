import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/projects" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    tags: z.array(z.string()),
    headline: z.string(),
    coverImage: z.string().optional(),
    metrics: z.array(z.string()).optional(),
    github: z.string().url().optional(),
    demo: z.string().url().optional(),
    publishDate: z.string(),
    featured: z.boolean().default(true),
  }),
});

const notes = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/notes" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishDate: z.string(),
    category: z.string(),
  }),
});

export const collections = { projects, notes };