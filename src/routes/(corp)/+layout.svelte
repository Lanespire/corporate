<script lang="ts">
	import '$lib/corp/styles.css';
	import { onMount } from 'svelte';
	import Footer from '$lib/corp/components/Footer.svelte';
	import Header from '$lib/corp/components/Header.svelte';
	import PrivacyDialog from '$lib/corp/components/PrivacyDialog.svelte';

	const { children } = $props();

	onMount(() => {
		(window as unknown as { __corpReady?: boolean }).__corpReady = true;
	});
</script>

<svelte:head>
	<link
		rel="preload"
		href="/fonts/noto-sans-jp-800-display.woff2"
		as="font"
		type="font/woff2"
		crossorigin="anonymous"
	/>
	<meta name="color-scheme" content="light" />
</svelte:head>

<div class="corp" id="top">
	<a class="skip" href="#main">本文へスキップ</a>
	<Header />
	{@render children?.()}
	<Footer />
	<PrivacyDialog />
</div>
