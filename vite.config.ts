import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	
	// Performance optimizations
	build: {
		target: 'es2022',
		minify: true
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
		}
	}
});
