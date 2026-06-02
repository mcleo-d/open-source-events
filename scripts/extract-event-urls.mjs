import { readFileSync, readdirSync, writeFileSync } from 'fs';
import { join } from 'path';
import matter from 'gray-matter';

const eventsDir = 'src/content/events';
const files = readdirSync(eventsDir)
  .filter(f => f.endsWith('.md') && f !== '_template.md')
  .sort();

const urls = [];
for (const file of files) {
  const raw = readFileSync(join(eventsDir, file), 'utf8');
  const { data } = matter(raw);
  if (data.url) urls.push(data.url);
}

writeFileSync('urls.txt', urls.join('\n') + '\n');
console.log(`Wrote ${urls.length} URL(s) to urls.txt`);
