import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://svelte.dev/docs/kit/integrations
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		// Static site generation for maximum performance
		adapter: adapter({
			pages: 'build',
			assets: 'build',
			fallback: undefined,
			precompress: true,
			strict: true
		}),
		
		// Prerender all pages for optimal performance
		prerender: {
			handleHttpError: 'warn',
			entries: ['*']
		},
		
		// Alias for clean imports
		alias: {
			'$components': 'src/lib/components',
			'$stores': 'src/lib/stores',
			'$utils': 'src/lib/utils',
			'$types': 'src/lib/types',
			'$styles': 'src/lib/styles',
			'$assets': 'src/lib/assets'
		}
	}
};

export default config;
