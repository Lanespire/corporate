import { createHash } from 'node:crypto';
import { cp, mkdir, readFile, readdir, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';

import QRCode from 'qrcode';
import sharp from 'sharp';

const [exportDirectory, captureDirectory] = process.argv.slice(2);
if (!exportDirectory || !captureDirectory) {
  throw new Error('Usage: node scripts/import-matching-showcase.mjs <Expo web dist> <capture directory>');
}
const html = await readFile(path.join(exportDirectory, 'index.html'), 'utf8');
if (!html.includes('/showcase/_expo/')) throw new Error('Export must use Expo baseUrl /showcase');
const appScenes = ['discover', 'profile', 'match', 'chat', 'likes', 'talk', 'marriage', 'me', 'welcome'];
const adminScenes = ['brand', 'profile-fields', 'onboarding', 'screens'];
const captures = [...appScenes.map(scene => `app-${scene}`), ...adminScenes.map(scene => `admin-${scene}`)];
const media = 'static/templates/media/showcase';
let landingPage = await readFile('static/templates/matching/index.html', 'utf8');
await mkdir(media, { recursive: true });
for (const capture of captures) {
  const bytes = await sharp(path.join(captureDirectory, `${capture}.png`))
    .resize({ width: capture.startsWith('admin-') ? 1440 : 780, withoutEnlargement: true })
    .webp({ quality: 86 }).toBuffer();
  const hash = createHash('sha256').update(bytes).digest('hex').slice(0, 10);
  const filename = `${capture}.${hash}.webp`;
  await writeFile(path.join(media, filename), bytes);
  landingPage = landingPage.replaceAll(new RegExp(`${capture}(?:\\.[a-f0-9]{10})?\\.webp`, 'g'), filename);
}
await writeFile('static/templates/matching/index.html', landingPage.trimEnd() + '\n');
await QRCode.toFile(path.join(media, 'qr.svg'), 'https://lanespire.com/showcase/?capture=1', {
  type: 'svg', errorCorrectionLevel: 'M', margin: 4, color: { dark: '#202830', light: '#FFFFFF' }
});
await rm('static/showcase', { force: true, recursive: true });
await cp(exportDirectory, 'static/showcase', { recursive: true });
const files = await readdir('static/showcase', { recursive: true, withFileTypes: true });
const assets = [];
for (const file of files.filter(item => item.isFile())) {
  const location = path.join(file.parentPath, file.name);
  const bytes = await readFile(location);
  assets.push({ path: path.relative('static', location), bytes: bytes.length,
    sha256: createHash('sha256').update(bytes).digest('hex') });
}
await writeFile('static/showcase/release.json', JSON.stringify({
  format: 1, runtime: 'Expo Web', publicUrl: 'https://lanespire.com/showcase/',
  data: 'Fictional sample profiles, no API or database connection',
  capturedAdmin: 'Local development environment with reference masters only',
  assets
}, null, 2) + '\n');
