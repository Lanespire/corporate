<script lang="ts">
	import './styles/tokens.css';
	import './styles/base.css';

	import Header from './components/Header.svelte';
	import Hero from './components/Hero.svelte';
	import Packages from './components/Packages.svelte';
	import ScrumProcess from './components/ScrumProcess.svelte';
	import Areas from './components/Areas.svelte';
	import Reasons from './components/Reasons.svelte';
	import WhyCheap from './components/WhyCheap.svelte';
	import CTABanner from './components/CTABanner.svelte';
	import Footer from './components/Footer.svelte';
</script>

<svelte:head>
	<title>Lanespire MVP - 最短1週間で、事業判断に使えるMVPへ。</title>
	<meta
		name="description"
		content="初期ユーザーや社内に見せたい1つの体験を、認証・DB・簡易管理画面込みでブラウザから触れる状態へ。最短1週間で初回デモを共有します。"
	/>
	<link rel="canonical" href="https://mvp.lanespire.com/" />

	<!-- Open Graph -->
	<meta property="og:type" content="website" />
	<meta property="og:site_name" content="Lanespire MVP" />
	<meta property="og:title" content="Lanespire MVP - 最短1週間で、事業判断に使えるMVPへ。" />
	<meta
		property="og:description"
		content="初期ユーザーや社内に見せたい1つの体験を、認証・DB・簡易管理画面込みでブラウザから触れる状態へ。Liteは¥500,000〜。"
	/>
	<meta property="og:url" content="https://mvp.lanespire.com/" />
	<meta property="og:image" content="https://mvp.lanespire.com/ogp/mvp-og.png" />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta property="og:locale" content="ja_JP" />

	<!-- Twitter Card -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="Lanespire MVP - 最短1週間で、事業判断に使えるMVPへ。" />
	<meta
		name="twitter:description"
		content="初期ユーザーや社内に見せたい1つの体験を、認証・DB・簡易管理画面込みでブラウザから触れる状態へ。Liteは¥500,000〜。"
	/>
	<meta name="twitter:image" content="https://mvp.lanespire.com/ogp/mvp-og.png" />

	<!-- JSON-LD: Service + Offer -->
	<script type="application/ld+json">
		{
			"@context": "https://schema.org",
			"@type": "Service",
			"name": "Lanespire MVP検証パッケージ",
			"serviceType": "MVP検証・Webアプリ開発",
			"description": "初期ユーザーや社内に見せたい1つの体験を、認証・DB・簡易管理画面込みでブラウザから触れる状態へ。最短1週間で初回デモを共有。",
			"provider": {
				"@type": "Organization",
				"name": "株式会社Lanespire",
				"url": "https://lanespire.com/",
				"email": "info@lanespire.com"
			},
			"areaServed": "JP",
			"url": "https://mvp.lanespire.com/",
			"offers": {
				"@type": "Offer",
				"name": "MVP検証 Lite",
				"price": "500000",
				"priceCurrency": "JPY",
				"availability": "https://schema.org/InStock",
				"url": "https://mvp.lanespire.com/"
			}
		}
	</script>
</svelte:head>

<div class="mvp-page">
	<Header />

	<main>
		<Hero />
		<Packages />
		<ScrumProcess />
		<Areas />
		<Reasons />
		<WhyCheap />
		<CTABanner />
	</main>

	<Footer />
</div>
