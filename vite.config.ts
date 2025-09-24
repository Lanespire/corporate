import { sveltekit } from '@sveltejs/kit/vite';
import sharp from 'sharp';
import { defineConfig, type Plugin } from 'vite';

function getFileInfo(filePath: string) {
	const normalized = filePath.replace(/\\/g, '/');
	const segments = normalized.split('/');
	const lastSegment = segments[segments.length - 1] ?? '';
	const dotIndex = lastSegment.lastIndexOf('.');

	return {
		baseName: dotIndex > 0 ? lastSegment.slice(0, dotIndex) : lastSegment,
		extension: dotIndex > -1 ? lastSegment.slice(dotIndex + 1).toLowerCase() : ''
	};
}

function imageOptimizer(): Plugin {
	const cache = new Map<string, string>();

	return {
		name: 'sveltekit-image-optimizer',
		enforce: 'pre',
		async load(id) {
			if (!id.includes('?')) return null;

			if (cache.has(id)) {
				const cached = cache.get(id);
				return cached ? { code: cached, map: { mappings: '' } } : null;
			}

			const [filePath, queryString] = id.split('?', 2);

			if (!filePath || !/\.(png|jpe?g)$/i.test(filePath)) {
				return null;
			}

			const params = new URLSearchParams(queryString ?? '');
			const mode = params.get('as');

			if (!mode || !['picture', 'srcset', 'src'].includes(mode)) {
				return null;
			}

			const qualityParam = params.get('quality');
			const quality = qualityParam ? Number(qualityParam) : 80;
			const sizes = params.get('sizes') ?? '100vw';
			const widthsParam = params.get('w') ?? params.get('width');
			const widthCandidates = widthsParam
				? widthsParam
						.split(/[;,]/)
						.map((value) => Number(value.trim()))
						.filter((value) => Number.isFinite(value) && value > 0)
				: [];

			const { baseName, extension: baseExt } = getFileInfo(filePath);
			const formatsParam = params.get('format');
			const requestedFormats = formatsParam
				? formatsParam
						.split(/[;,]/)
						.map((value) => value.trim().toLowerCase())
						.filter(Boolean)
				: [];

			const formats = requestedFormats.length ? [...requestedFormats] : [baseExt];
			if (!formats.includes(baseExt)) {
				formats.push(baseExt);
			}

			const metadata = await sharp(filePath).metadata();
			const originalWidth = metadata.width ?? 0;
			const originalHeight = metadata.height ?? 0;

			const normalizedWidths = (widthCandidates.length ? widthCandidates : [originalWidth || 1200])
				.map((value) => {
					if (!originalWidth) return value;
					return value > originalWidth ? originalWidth : value;
				})
				.filter((value) => value > 0);

			const uniqueWidths = Array.from(
				new Set(normalizedWidths.length ? normalizedWidths : [originalWidth || 1200])
			).sort((a, b) => a - b);

			if (uniqueWidths.length === 0) {
				uniqueWidths.push(originalWidth || 1200);
			}

			const results = new Map<
				string,
				{
					ref: string;
					width: number;
					height: number;
					format: string;
				}[]
			>();

			for (const format of formats) {
				const normalizedFormat = format === 'jpg' ? 'jpeg' : format;
				const entries: {
					ref: string;
					width: number;
					height: number;
					format: string;
				}[] = [];

				for (const width of uniqueWidths) {
					const transformer = sharp(filePath);

					if (width) {
						transformer.resize({ width, withoutEnlargement: true });
					}

					const { data, info } = await transformer
						.toFormat(normalizedFormat as keyof sharp.FormatEnum, { quality })
						.toBuffer({ resolveWithObject: true });

					const entryWidth = info.width ?? width;
					const entryHeight =
						info.height ??
						(originalWidth && originalHeight && entryWidth
							? Math.round((originalHeight * entryWidth) / originalWidth)
							: entryWidth);

					const outputExt = normalizedFormat === 'jpeg' ? 'jpg' : normalizedFormat;
					const referenceId = this.emitFile({
						type: 'asset',
						name: `${baseName}-${entryWidth}w.${outputExt}`,
						source: data
					});

					entries.push({
						ref: referenceId,
						width: entryWidth,
						height: entryHeight,
						format: outputExt
					});
				}

				results.set(format, entries);
			}

			const fallbackFormat = formats[formats.length - 1];
			const fallbackEntries = results.get(fallbackFormat);

			if (!fallbackEntries?.length) {
				return null;
			}

			const fallback = fallbackEntries[fallbackEntries.length - 1];

			const toSrcset = (entries: { ref: string; width: number }[]) =>
				entries
					.map((entry) => `\${import.meta.ROLLUP_FILE_URL_${entry.ref}} ${entry.width}w`)
					.join(', ');

			let code = '';

			if (mode === 'picture') {
				code += 'const sources = []\n';

				for (const format of formats.slice(0, -1)) {
					const entries = results.get(format);
					if (!entries?.length) continue;
					const mime = `image/${format === 'jpg' ? 'jpeg' : format}`;
					code += `sources.push({ type: '${mime}', srcset: \`${toSrcset(entries)}\`, sizes: '${sizes}' })\n`;
				}

				code += `const img = { src: import.meta.ROLLUP_FILE_URL_${fallback.ref}, width: ${fallback.width}, height: ${fallback.height}, srcset: \`${toSrcset(fallbackEntries)}\`, sizes: '${sizes}' }\n`;
				code += 'export default { sources, img }';
			} else if (mode === 'srcset') {
				code += `export default { src: import.meta.ROLLUP_FILE_URL_${fallback.ref}, width: ${fallback.width}, height: ${fallback.height}, srcset: \`${toSrcset(fallbackEntries)}\`, sizes: '${sizes}' }`;
			} else {
				code += `export default import.meta.ROLLUP_FILE_URL_${fallback.ref}`;
			}

			cache.set(id, code);

			return {
				code,
				map: { mappings: '' }
			};
		}
	};
}

export default defineConfig({
	plugins: [sveltekit(), imageOptimizer()],

	// Alias configuration
	resolve: {
		alias: {
			$components: '/src/lib/components',
			$utils: '/src/lib/utils',
			$stores: '/src/lib/stores',
			$types: '/src/lib/types'
		}
	},

	// Build optimization for performance
	build: {
		target: 'es2022',
		minify: 'terser',
		terserOptions: {
			compress: {
				drop_console: true,
				drop_debugger: true,
				pure_funcs: ['console.log', 'console.info', 'console.debug']
			}
		},
		rollupOptions: {
			output: {
				manualChunks: (id) => {
					if (id.includes('three')) return 'three';
					if (id.includes('gsap')) return 'gsap';
					if (id.includes('node_modules')) return 'vendor';
					return undefined;
				},
				chunkFileNames: 'assets/[name]-[hash].js',
				entryFileNames: 'assets/[name]-[hash].js',
				assetFileNames: 'assets/[name]-[hash].[ext]'
			}
		},
		chunkSizeWarningLimit: 500,
		sourcemap: false
	},

	// Optimize dependencies
	optimizeDeps: {
		include: ['three', 'gsap'],
		exclude: []
	},

	// CSS optimization
	css: {
		devSourcemap: false
	},

	// Server configuration for development
	server: {
		fs: {
			allow: ['..']
		},
		port: 5173,
		host: true
	}
});
