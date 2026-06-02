import { execSync, spawnSync } from 'child_process';
import { readdirSync, existsSync } from 'fs';
import { join } from 'path';

// Ensure a matching ChromeDriver is available
execSync('npx browser-driver-manager install chrome', { stdio: 'inherit' });

// Locate the installed chromedriver
const driverBase = join(process.env.HOME ?? '', '.browser-driver-manager', 'chromedriver');
let driverPath = '';

if (existsSync(driverBase)) {
  for (const ver of readdirSync(driverBase)) {
    const candidates = [
      join(driverBase, ver, 'chromedriver-mac-arm64', 'chromedriver'),
      join(driverBase, ver, 'chromedriver-mac64', 'chromedriver'),
      join(driverBase, ver, 'chromedriver-linux64', 'chromedriver'),
    ];
    const found = candidates.find(existsSync);
    if (found) { driverPath = found; break; }
  }
}

const slug = execSync('node scripts/get-sample-slug.mjs', { encoding: 'utf8' }).trim();

const args = [
  'http://localhost:4321',
  `http://localhost:4321/events/${slug}/`,
  '--exit',
  ...(driverPath ? ['--chromedriver-path', driverPath] : []),
];

const result = spawnSync('npx', ['axe', ...args], { stdio: 'inherit', shell: true });
process.exit(result.status ?? 1);
