import { z } from 'zod';

export const eventSchema = z.object({
  title: z.string(),
  start_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Must be YYYY-MM-DD'),
  end_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Must be YYYY-MM-DD'),
  city: z.string(),
  country: z.string().default('United Kingdom'),
  format: z.enum(['in-person', 'hybrid', 'virtual']),
  topics: z.array(z.string()),
  price: z.enum(['free', 'paid']),
  url: z.string().url(),
  summary: z.string(),
  // organiser taxonomy (added ST-OS-12)
  organiser: z.string(),
  organiser_url: z.string().url(),
  // optional fields
  series: z.string().optional(),
  co_located_with: z.array(z.string()).optional(),
  venue: z.string().optional(),
  org: z.string().optional(),
  cfp_url: z.string().url().optional(),
  cfp_deadline: z.string().optional(),
  code_of_conduct_url: z.string().url().optional(),
  twitter: z.string().optional(),
});
