// テンプレートページの技術ロゴを simple-icons / 公式アセットから生成する（手描きSVG禁止）。
import { readFileSync, writeFileSync, mkdirSync, copyFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const outDir = join(root, 'static/templates/matching/icons');
mkdirSync(outDir, { recursive: true });

const si = require('simple-icons');
const simpleIcons = [
	['siExpo', 'expo'],
	['siReact', 'react'],
	['siSwift', 'swift'],
	['siCloudflare', 'cloudflare'],
	['siRevenuecat', 'revenuecat'],
	['siTypescript', 'typescript']
];
for (const [key, file] of simpleIcons) {
	const icon = si[key];
	if (!icon) throw new Error(`simple-icons に ${key} がありません`);
	const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#${icon.hex}" d="${icon.path}"/></svg>`;
	writeFileSync(join(outDir, `${file}.svg`), svg);
}

// OpenAI: 公式ブランドシンボル（Wikimedia Commons 経由ダウンロード済）をそのまま配布
copyFileSync(join(root, 'assets-src/brand/openai.svg'), join(outDir, 'openai.svg'));

// Didit: 公式ロゴSVG内蔵のマーク画像を抽出
const diditSvg = readFileSync(join(root, 'assets-src/brand/didit-switch.svg'), 'utf8');
const diditPng = /<image href="data:image\/png;base64,([^"]+)"/.exec(diditSvg)?.[1];
if (!diditPng) throw new Error('didit-switch.svg からマーク画像を抽出できませんでした');
writeFileSync(join(outDir, 'didit-mark.png'), Buffer.from(diditPng, 'base64'));

console.log('prepared tech icons:', simpleIcons.map(([, f]) => f).join(', '), ', openai, didit-mark');
