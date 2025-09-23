import sharp from 'sharp';
import { readdir, stat } from 'fs/promises';
import { join, extname, basename } from 'path';

const INPUT_DIR = 'static';
const OUTPUT_DIR = 'static/optimized';

async function optimizeImage(inputPath, outputPath) {
	const ext = extname(inputPath).toLowerCase();

	if (!['.png', '.jpg', '.jpeg'].includes(ext)) {
		return;
	}

	try {
		const image = sharp(inputPath);
		const metadata = await image.metadata();

		// Generate WebP version
		await image.webp({ quality: 85, effort: 6 }).toFile(outputPath.replace(ext, '.webp'));

		// Generate optimized original format
		if (ext === '.png') {
			await image.png({ quality: 85, compressionLevel: 9 }).toFile(outputPath);
		} else {
			await image.jpeg({ quality: 85, progressive: true }).toFile(outputPath);
		}

		// Generate smaller sizes for responsive images
		const sizes = [400, 800, 1200];
		for (const size of sizes) {
			if (metadata.width > size) {
				await image
					.resize(size, null, { withoutEnlargement: true })
					.webp({ quality: 85 })
					.toFile(outputPath.replace(ext, `_${size}w.webp`));
			}
		}

		console.log(`✓ Optimized: ${inputPath}`);
	} catch (error) {
		console.error(`✗ Failed to optimize ${inputPath}:`, error.message);
	}
}

async function processDirectory(dir) {
	try {
		const entries = await readdir(dir);

		for (const entry of entries) {
			const fullPath = join(dir, entry);
			const stats = await stat(fullPath);

			if (stats.isDirectory() && entry !== 'optimized') {
				await processDirectory(fullPath);
			} else if (stats.isFile()) {
				const relativePath = fullPath.replace(INPUT_DIR + '/', '');
				const outputPath = join(OUTPUT_DIR, relativePath);
				await optimizeImage(fullPath, outputPath);
			}
		}
	} catch (error) {
		console.error(`Error processing directory ${dir}:`, error.message);
	}
}

// Create output directory
import { mkdir } from 'fs/promises';
try {
	await mkdir(OUTPUT_DIR, { recursive: true });
} catch (error) {
	// Directory already exists
}

console.log('🖼️  Starting image optimization...');
await processDirectory(INPUT_DIR);
console.log('✅ Image optimization complete!');
