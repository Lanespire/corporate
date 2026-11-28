<script lang="ts">
	import Cases from '$lib/corp/components/Cases.svelte';
	import Company from '$lib/corp/components/Company.svelte';
	import Contact from '$lib/corp/components/Contact.svelte';
	import Faq from '$lib/corp/components/Faq.svelte';
	import Hero from '$lib/corp/components/Hero.svelte';
	import Process from '$lib/corp/components/Process.svelte';
	import Products from '$lib/corp/components/Products.svelte';
	import Services from '$lib/corp/components/Services.svelte';
	import { jsonLd, site, structuredData } from '$lib/corp/content';
</script>

<svelte:head>
	<title>{site.title}</title>
	<meta name="description" content={site.description} />
	<link rel="canonical" href={site.url} />
	<meta property="og:type" content="website" />
	<meta property="og:locale" content="ja_JP" />
	<meta property="og:title" content={site.ogTitle} />
	<meta property="og:description" content={site.ogDescription} />
	<meta property="og:url" content={site.url} />
	<meta property="og:image" content={site.ogImage} />
	<meta name="twitter:card" content="summary_large_image" />
	<!-- eslint-disable-next-line svelte/no-at-html-tags -- JSON-LD is built only from static local content. -->
	{@html jsonLd(structuredData)}
</svelte:head>

<main id="main">
	<Hero />
	<div class="sheet">
		<Cases />
		<Products />
		<Services />
		<Process />
		<Company />
		<Faq />
		<Contact />
	</div>
</main>

<style>
	.sheet {
		position: relative;
		z-index: 1;
		background: #fff;
	}
	@media (min-aspect-ratio: 4/5) and (min-width: 1024px) and (min-height: 600px) {
		.sheet {
			border-radius: 44px 44px 0 0;
			box-shadow: 0 -18px 50px -26px rgba(17, 41, 64, 0.2);
		}
	}
</style>
