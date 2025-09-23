<script lang="ts">
	import '$lib/styles/global.css';
	import { onMount } from 'svelte';
	import favicon from '$lib/assets/favicon.svg';

	const { children } = $props();

	// Performance monitoring
	onMount(() => {
		// Register service worker for caching
		if ('serviceWorker' in navigator) {
			navigator.serviceWorker.register('/service-worker.js')
				.catch(err => console.log('Service worker registration failed:', err));
		}

		// Performance metrics
		if (typeof window !== 'undefined' && 'performance' in window) {
			window.addEventListener('load', () => {
				const perfData = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
				console.log('Page load time:', perfData.loadEventEnd - perfData.loadEventStart, 'ms');
			});
		}
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	
	<!-- Preload critical fonts -->
	<link rel="preconnect" href="https://fonts.googleapis.com">
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous">
	<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
	<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
	
	<!-- Critical CSS for above-the-fold content -->
	<style>
		/* Critical CSS inlined for performance */
		body {
			margin: 0;
			padding: 0;
			font-family: 'Inter', sans-serif;
			background: #0a0a0a;
			color: #ffffff;
			overflow-x: hidden;
		}
		
		/* Prevent FOUC */
		.hero {
			min-height: 100vh;
			background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%);
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
