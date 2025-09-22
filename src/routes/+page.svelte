<script lang="ts">
	import Header from '$lib/components/layout/Header.svelte';
	import Hero from '$lib/components/sections/Hero.svelte';
	import About from '$lib/components/sections/About.svelte';
	import Services from '$lib/components/sections/Services.svelte';
	import Philosophy from '$lib/components/sections/Philosophy.svelte';
	import Contact from '$lib/components/sections/Contact.svelte';
	import { onMount } from 'svelte';

	onMount(() => {
		// Preload critical images
		const criticalImages = [
			'/images/lanespire_logo.png',
			'/images/cyberpunk_company_values.png'
		];
		
		criticalImages.forEach(src => {
			const link = document.createElement('link');
			link.rel = 'preload';
			link.as = 'image';
			link.href = src;
			document.head.appendChild(link);
		});
	});
</script>

<svelte:head>
	<title>株式会社Lanespire - コードで、ビジネスの未来を実装する</title>
	<meta name="description" content="株式会社Lanespireは、Web制作からAI導入支援まで、最新技術でお客様のビジネスに革新をもたらすWeb開発会社です。" />
	<meta name="keywords" content="Web制作, AI導入支援, 業務自動化, n8n, NoCode, LowCode, モバイルアプリ開発, 受託開発, 東京, 銀座" />
	<meta name="author" content="株式会社Lanespire" />
	
	<!-- Open Graph -->
	<meta property="og:title" content="株式会社Lanespire - コードで、ビジネスの未来を実装する" />
	<meta property="og:description" content="最新技術でお客様のビジネスに革新をもたらすWeb開発会社" />
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://lanespire.com" />
	<meta property="og:image" content="/images/lanespire_logo.png" />
	
	<!-- Twitter Card -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="株式会社Lanespire" />
	<meta name="twitter:description" content="コードで、ビジネスの未来を実装する" />
	<meta name="twitter:image" content="/images/lanespire_logo.png" />
	
	<!-- Viewport -->
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	
	<!-- Theme color -->
	<meta name="theme-color" content="#00ffff" />
	
	<!-- Preload critical resources -->
	<link rel="preload" href="/images/lanespire_logo.png" as="image" />
	<link rel="preload" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" as="style" />
</svelte:head>

<Header />

<div id="home">
	<Hero />
</div>

<About />

<Services />

<Philosophy />

<Contact />

<style>
	:global(html) {
		scroll-behavior: smooth;
	}
</style>
