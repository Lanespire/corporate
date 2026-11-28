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

		// Small stylesheets go into the HTML so the first paint needs no extra request.
		inlineStyleThreshold: 40000,

		// Prerender all pages for optimal performance
		prerender: {
			handleHttpError: 'warn',
			handleMissingId: 'warn',
			entries: ['*']
		},

		// Service worker configuration
		// Only the LP layout registers the worker; the corporate pages stay without one.
		serviceWorker: {
			register: false
		},

		// Alias for clean imports
		alias: {
			$components: 'src/lib/components',
			$stores: 'src/lib/stores',
			$utils: 'src/lib/utils',
			$types: 'src/lib/types',
			$styles: 'src/lib/styles',
			$assets: 'src/lib/assets'
		}
	}
};

export default config;
