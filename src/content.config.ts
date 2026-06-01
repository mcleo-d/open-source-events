import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { eventSchema } from './lib/event-schema.mjs';

const events = defineCollection({
  loader: glob({ pattern: ['**/*.md', '!**/_*.md'], base: './src/content/events' }),
  schema: eventSchema,
});

export const collections = { events };
