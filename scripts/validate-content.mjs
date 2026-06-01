import { readFileSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import matter from 'gray-matter';
import { z } from 'zod';

const __dirname = dirname(fileURLToPath(import.meta.url));
const eventsDir = join(__dirname, '..', 'src', 'content', 'events');

const eventSchema = z.object({
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
  venue: z.string().optional(),
  org: z.string().optional(),
  cfp_url: z.string().url().optional(),
  cfp_deadline: z.string().optional(),
  code_of_conduct_url: z.string().url().optional(),
  twitter: z.string().optional(),
});

const files = readdirSync(eventsDir).filter(f => f.endsWith('.md'));

if (files.length === 0) {
  console.error('No event files found in src/content/events/');
  process.exit(1);
}

let hasErrors = false;

for (const file of files) {
  const raw = readFileSync(join(eventsDir, file), 'utf8');
  const { data } = matter(raw);
  const result = eventSchema.safeParse(data);
  if (!result.success) {
    console.error(`\n✗ ${file}`);
    for (const issue of result.error.issues) {
      console.error(`  ${issue.path.join('.')}: ${issue.message}`);
    }
    hasErrors = true;
  } else {
    console.log(`✓ ${file}`);
  }
}

if (hasErrors) {
  console.error('\nContent validation failed.');
  process.exit(1);
}

console.log(`\n${files.length} event(s) valid.`);
