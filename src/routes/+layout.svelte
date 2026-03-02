<script lang="ts">
	import '$lib/styles/global.css';
	import favicon from '$lib/assets/images/lanespire_logo.png';

	const { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<meta name="theme-color" content="#1a73e8" />
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link
		href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&family=Noto+Sans+JP:wght@400;500;700&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<main>
	{@render children?.()}
</main>

<style>
	main {
		min-height: 100dvh;
	}
</style>
