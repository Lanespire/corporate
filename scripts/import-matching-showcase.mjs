import { createHash } from 'node:crypto';
import { cp, mkdir, readFile, readdir, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';

import QRCode from 'qrcode';
import sharp from 'sharp';

const [exportDirectory, captureDirectory] = process.argv.slice(2);
if (!exportDirectory || !captureDirectory) {
	throw new Error(
		'Usage: node scripts/import-matching-showcase.mjs <Expo web dist> <capture directory>'
	);
}
const html = await readFile(path.join(exportDirectory, 'index.html'), 'utf8');
if (!html.includes('/showcase/_expo/')) throw new Error('Export must use Expo baseUrl /showcase');
const appScenes = [
	'discover',
	'profile',
	'match',
	'chat',
	'likes',
	'talk',
	'marriage',
	'me',
	'welcome'
];
const adminScenes = ['brand', 'profile-fields', 'onboarding', 'screens'];
const captures = [
	...appScenes.map((scene) => `app-${scene}`),
	...adminScenes.map((scene) => `admin-${scene}`)
];
const media = 'static/templates/media/showcase';
const nativePreview = JSON.parse(
	await readFile(path.join(captureDirectory, 'native-preview.json'), 'utf8')
);
const nativeUrl = new URL(nativePreview.url);
if (!['exp:', 'exps:'].includes(nativeUrl.protocol) || nativeUrl.hostname === 'u.expo.dev') {
	throw new Error('QR destination must be the self-hosted Expo Go update URL');
}
if (nativePreview.captureRuntime !== 'Expo Go on iOS Simulator') {
	throw new Error('App images must be captured from the running native app');
}
let landingPage = await readFile('static/templates/matching/index.html', 'utf8');
landingPage = landingPage.replaceAll(
	/exps:\/\/[^"\s]+/g,
	nativePreview.url.replaceAll('&', '&amp;')
);
let catalogPage = await readFile('static/templates/index.html', 'utf8');
await mkdir(media, { recursive: true });
for (const capture of captures) {
	const bytes = await sharp(path.join(captureDirectory, `${capture}.png`))
		.resize({ width: capture.startsWith('admin-') ? 1440 : 780, withoutEnlargement: true })
		.webp({ quality: 86 })
		.toBuffer();
	const hash = createHash('sha256').update(bytes).digest('hex').slice(0, 10);
	const filename = `${capture}.${hash}.webp`;
	await writeFile(path.join(media, filename), bytes);
	if (capture === 'app-discover' || capture === 'app-marriage') {
		const previous = capture === 'app-discover' ? 'phone-social' : 'phone-marriage';
		catalogPage = catalogPage.replaceAll(
			`/templates/media/${previous}.webp`,
			`/templates/media/showcase/${filename}`
		);
	}
	catalogPage = catalogPage.replaceAll(
		new RegExp(`${capture}(?:\\.[a-f0-9]{10})?\\.webp`, 'g'),
		filename
	);
	landingPage = landingPage.replaceAll(
		new RegExp(`${capture}(?:\\.[a-f0-9]{10})?\\.webp`, 'g'),
		filename
	);
}
await writeFile('static/templates/matching/index.html', landingPage.trimEnd() + '\n');
await writeFile('static/templates/index.html', catalogPage.trimEnd() + '\n');
await writeFile(
	path.join(media, 'native-preview.json'),
	JSON.stringify(nativePreview, null, 2) + '\n'
);
await QRCode.toFile(path.join(media, 'qr.svg'), nativePreview.url, {
	type: 'svg',
	errorCorrectionLevel: 'M',
	margin: 4,
	color: { dark: '#202830', light: '#FFFFFF' }
});
await rm('static/showcase', { force: true, recursive: true });
await cp(exportDirectory, 'static/showcase', { recursive: true });
const files = await readdir('static/showcase', { recursive: true, withFileTypes: true });
const assets = [];
for (const file of files.filter((item) => item.isFile())) {
	const location = path.join(file.parentPath, file.name);
	const bytes = await readFile(location);
	assets.push({
		path: path.relative('static', location),
		bytes: bytes.length,
		sha256: createHash('sha256').update(bytes).digest('hex')
	});
}
await writeFile(
	'static/showcase/release.json',
	JSON.stringify(
		{
			format: 1,
			runtime: 'Expo Web',
			publicUrl: 'https://lanespire.com/showcase/',
			data: 'Fictional sample profiles, no API or database connection',
			capturedAdmin: 'Local development environment with reference masters only',
			nativePreview,
			assets
		},
		null,
		2
	) + '\n'
);
