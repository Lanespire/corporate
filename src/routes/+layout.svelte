<script lang="ts">
	import '$lib/styles/global.css';
	import { onMount } from 'svelte';

	const { children } = $props();

	// Performance monitoring
	onMount(() => {
		// Register service worker for caching
		if ('serviceWorker' in navigator) {
			navigator.serviceWorker
				.register('/service-worker.js')
				.catch((err) => console.log('Service worker registration failed:', err));
		}

		// Performance metrics
		if (typeof window !== 'undefined' && 'performance' in window) {
			window.addEventListener('load', () => {
				const perfData = performance.getEntriesByType(
					'navigation'
				)[0] as PerformanceNavigationTiming;
				console.log('Page load time:', perfData.loadEventEnd - perfData.loadEventStart, 'ms');
			});
		}
	});
</script>

<svelte:head>
	<!-- Critical CSS for above-the-fold content -->
	<style>
		/* Critical CSS inlined for performance.
		   Per-route :global(body) rules in each +page.svelte set color/background. */
		body {
			margin: 0;
			padding: 0;
			font-family: 'Avenir Next', 'Hiragino Sans', 'Yu Gothic', 'Noto Sans JP', system-ui, sans-serif;
			overflow-x: hidden;
		}
	</style>
</svelte:head>

<main>
	{@render children?.()}
</main>

<style>
	:global(html) {
		scroll-behavior: smooth;
	}

	:global(body) {
		margin: 0;
		padding: 0;
		overflow-x: hidden;
	}

	main {
		position: relative;
		z-index: 1;
	}
</style>
