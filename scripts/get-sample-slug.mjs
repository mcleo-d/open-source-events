import { readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const eventsDir = join(__dirname, '..', 'src', 'content', 'events');
const file = readdirSync(eventsDir).filter(f => f.endsWith('.md'))[0];
process.stdout.write(file.replace(/\.md$/, ''));
