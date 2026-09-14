/** Generate content-addressed portfolio images from assets already in this repository. */
import { readFile, mkdir, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { createHash } from 'node:crypto';
import sharp from 'sharp';

const root = process.cwd();
const projects = JSON.parse(await readFile(resolve(root, 'src/lib/corporate/projects.json'), 'utf8'));
const css = (await Promise.all(['base', 'content', 'responsive', 'works'].map(name => readFile(resolve(root, `src/lib/corporate/${name}.css`), 'utf8')))).join('\n');
await mkdir(resolve(root, 'static/corporate'), { recursive: true });
await writeFile(resolve(root, 'static/corporate/site.css'), css);
const output = resolve(root, 'static/corporate/images');
await mkdir(output, { recursive: true });
const manifest = {};
for (const project of projects) {
  if (!/^[a-z0-9-]+$/.test(project.id) || !/^work-[a-z0-9-]+\.png$/.test(project.image)) {
    throw new Error(`Invalid portfolio asset: ${project.id}`);
  }
  const bytes = await readFile(resolve(root, 'src/lib/assets/images', project.image));
  const hash = createHash('sha256').update(bytes).update('corporate-webp-q84-v1').digest('hex').slice(0, 12);
  const images = [];
  for (const width of [640, 1280]) {
    const name = `${project.id}-${hash}-${width}.webp`;
    const info = await sharp(bytes).rotate().resize({ width, withoutEnlargement: true }).webp({ quality: 84 }).toFile(resolve(output, name));
    images.push({ src: `/corporate/images/${name}`, width: info.width, height: info.height });
  }
  manifest[project.id] = { card: images[0], detail: images[1] };
}
const serialized = JSON.stringify(manifest, null, 2) + '\n';
await writeFile(resolve(output, 'manifest.json'), serialized);
const generated = resolve(root, 'src/lib/corporate/generated');
await mkdir(generated, { recursive: true });
await writeFile(resolve(generated, 'manifest.json'), serialized);
console.log(`Prepared ${projects.length} portfolio images in two sizes.`);
