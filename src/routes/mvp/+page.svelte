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
	<title>Lanespire MVP - 最初の1週間で、見えるものを出す。</title>
	<meta
		name="description"
		content="最短1週間でMVPを形にするスクラム開発サービス。要件定義から実装・公開までを少人数の専任チームで一気通貫。低価格で高品質なMVP開発をお探しの方へ。"
	/>
	<link rel="canonical" href="https://mvp.lanespire.com/" />

	<!-- Open Graph -->
	<meta property="og:type" content="website" />
	<meta property="og:site_name" content="Lanespire MVP" />
	<meta property="og:title" content="Lanespire MVP - 最初の1週間で、見えるものを出す。" />
	<meta
		property="og:description"
		content="最短1週間でMVPを形にするスクラム開発サービス。低価格で高品質。¥500,000〜。"
	/>
	<meta property="og:url" content="https://mvp.lanespire.com/" />
	<meta property="og:image" content="https://mvp.lanespire.com/ogp/mvp-og.png" />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta property="og:locale" content="ja_JP" />

	<!-- Twitter Card -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="Lanespire MVP - 最初の1週間で、見えるものを出す。" />
	<meta
		name="twitter:description"
		content="最短1週間でMVPを形にするスクラム開発サービス。低価格で高品質。¥500,000〜。"
	/>
	<meta name="twitter:image" content="https://mvp.lanespire.com/ogp/mvp-og.png" />

	<!-- JSON-LD: Service + Offer -->
	{@html `<script type="application/ld+json">${JSON.stringify({
		'@context': 'https://schema.org',
		'@type': 'Service',
		name: 'Lanespire MVP開発パッケージ',
		serviceType: 'MVP開発・スクラム開発',
		description:
			'最短1週間でMVPを形にするスクラム開発パッケージ。LP・認証・管理画面・DB・API連携・デプロイまで一式。',
		provider: {
			'@type': 'Organization',
			name: '株式会社Lanespire',
			url: 'https://lanespire.com/',
			email: 'info@lanespire.com'
		},
		areaServed: 'JP',
		url: 'https://mvp.lanespire.com/',
		offers: {
			'@type': 'Offer',
			name: 'MVP丸ごと開発 STANDARD',
			price: '500000',
			priceCurrency: 'JPY',
			availability: 'https://schema.org/InStock',
			url: 'https://mvp.lanespire.com/'
		}
	})}</script>`}
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
