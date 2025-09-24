import { sveltekit } from '@sveltejs/kit/vite';
import { enhancedImages } from '@sveltejs/enhanced-img';
import { defineConfig } from 'vite';



export default defineConfig({
	plugins: [
		enhancedImages(), // SvelteKitプラグインより前に配置
		sveltekit()
	],

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
