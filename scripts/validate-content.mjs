import { readFileSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import matter from 'gray-matter';
import { eventSchema } from '../src/lib/event-schema.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const eventsDir = join(__dirname, '..', 'src', 'content', 'events');

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
