<script lang="ts">
	import {
		ArrowRight,
		Bot,
		BriefcaseBusiness,
		CalendarDays,
		CheckCircle2,
		ClipboardCheck,
		Code2,
		FilePenLine,
		LineChart,
		Mail,
		Monitor,
		Phone,
		Rocket,
		ShieldCheck,
		Sparkles,
		Star,
		UsersRound,
		WandSparkles,
		Workflow
	} from 'lucide-svelte';
	import heroImage from '$lib/assets/images/lp-hero-generated-transparent-v2.png';
	import ctaImage from '$lib/assets/images/lp-cta-generated-transparent-v2.png';
	import darkCaseImage from '$lib/assets/images/business_automation.png';
	import aiImage from '$lib/assets/images/ai_consulting_service.png';
	import webImage from '$lib/assets/images/web_development_service.png';
	import automationImage from '$lib/assets/images/service_web_design.png';
	import dashboardImage from '$lib/assets/images/hero_tech_background.png';
	import teamImage from '$lib/assets/images/about_illustration.png';

	const promises = [
		{ icon: CheckCircle2, title: '相談無料', text: '仕様未確定OK' },
		{ icon: UsersRound, title: '代表が直接対応', text: '現場目線でご提案' },
		{ icon: ShieldCheck, title: '無理な営業なし', text: '安心してご相談可能' }
	];

	const concepts = [
		{
			icon: Sparkles,
			title: 'むずかしいAIではなく、\nやさしい仕組みを。',
			body: '特別な知識がなくても使えるUIで、誰もが成果を出せる仕組みをつくります。'
		},
		{
			icon: ClipboardCheck,
			title: '小さく始めて、\n確かに効果を。',
			body: 'まずは一部の業務から。効果を見ながら少しずつ、確実に広げていきます。'
		},
		{
			icon: LineChart,
			title: '定着・運用まで、\nしっかり伴走。',
			body: '導入して終わりにしません。現場に根づき、成果が続くまで伴走します。'
		}
	];

	const services = [
		{
			icon: Bot,
			title: 'AI導入支援',
			desc: 'ChatGPT / Claude などを活用した業務改善・AIエージェント開発',
			items: ['要件整理・PoC', 'AIエージェント開発', 'RAG・データ活用'],
			color: 'cyan'
		},
		{
			icon: Workflow,
			title: '業務自動化',
			desc: 'n8n / Zapier / Make を用いた業務フローの自動化',
			items: ['ワークフロー設計', 'RPA・API連携', 'レポート自動化'],
			color: 'green'
		},
		{
			icon: Monitor,
			title: 'Web制作',
			desc: 'コーポレートサイト・LP・サービスサイトを企画・設計・実装',
			items: ['コーポレートサイト', 'LP・サービスサイト', 'CMS・保守運用'],
			color: 'blue'
		},
		{
			icon: BriefcaseBusiness,
			title: 'SaaS開発',
			desc: '企画・設計から開発・運用まで一気通貫で支援',
			items: ['プロダクト設計', 'Web / API開発', '運用・グロース支援'],
			color: 'orange'
		}
	];

	const works = [
		{
			image: darkCaseImage,
			title: 'NightTable',
			tag: 'SaaS / 予約・店舗体験',
			body: '飲食店の予約・テーブル・POSを統合した店舗SaaSプラットフォーム。'
		},
		{
			image: aiImage,
			title: 'SakuEdit',
			tag: 'Web / AI動画体験',
			body: 'AIで写真をUIUXに編集できるオンライン編集サービス。'
		},
		{
			image: webImage,
			title: 'Chrome拡張',
			tag: 'Extension / 自動化',
			body: 'AIマッチングアプリの操作を自動化し効率的な活動をサポート。'
		},
		{
			image: teamImage,
			title: 'AI写真編集',
			tag: 'AI / 画像生成',
			body: 'ワンクリックで商品写真に背景補正・加工を行うAIサービス。'
		},
		{
			image: dashboardImage,
			title: '営業CRM',
			tag: '業務システム / CRM',
			body: '営業活動を可視化し、見積や顧客フォローを一元管理。'
		},
		{
			image: automationImage,
			title: '日程調整SaaS',
			tag: 'SaaS / スケジューリング',
			body: 'ダブルブッキングを防ぐ日程調整SaaSプロダクト。'
		},
		{
			image: darkCaseImage,
			title: 'AI営業ロープレ',
			tag: 'AI / 教育・トレーニング',
			body: 'AIが顧客役となり、実践的な営業トレーニングを実現。'
		}
	];

	const flow = [
		{
			icon: UsersRound,
			title: 'ヒアリング・要件整理',
			body: '課題やゴールを整理し、優先度の高いテーマを特定。'
		},
		{
			icon: FilePenLine,
			title: '設計・プロトタイプ',
			body: '使いやすいUI/UXと最小構成のプロトタイプを作成。'
		},
		{
			icon: Code2,
			title: '開発・テスト',
			body: '必要な機能を開発し、品質を担保してリリース準備。'
		},
		{ icon: Rocket, title: 'リリース・導入支援', body: 'スムーズな導入と現場トレーニングを実施。' },
		{
			icon: LineChart,
			title: '運用・改善',
			body: 'データを活用して改善を継続。成果を最大化します。'
		}
	];

	const reasons = [
		{ icon: WandSparkles, title: '現場目線の提案', body: 'ユーザー体験を重視した設計' },
		{ icon: FilePenLine, title: '小さく始める導入', body: 'スモールスタートでリスクを最小化' },
		{ icon: ClipboardCheck, title: '透明性のある開発', body: '進捗・見積・リスクをオープンに共有' },
		{ icon: ShieldCheck, title: '高い技術力', body: 'AI・自動化・Web・SaaSまで対応' },
		{ icon: Star, title: '伴走型サポート', body: '長く付き合えるパートナーとして支援' }
	];

	function goToSection(id: string) {
		if (typeof document === 'undefined') return;
		document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
	}
</script>

<svelte:head>
	<title>Lanespire - AIを、現場の人が使える形にする。</title>
	<meta
		name="description"
		content="LanespireはAI導入支援、業務自動化、Web制作、SaaS開発で、現場の業務をやさしく効率化する開発パートナーです。"
	/>
	<meta name="theme-color" content="#ffffff" />
</svelte:head>

<div class="lp-shell">
	<header class="site-header">
		<button
			class="brand brand-button"
			type="button"
			aria-label="Lanespire トップ"
			on:click={() => goToSection('top')}
		>
			<span class="brand-mark" aria-hidden="true"></span>
			<span>Lanespire</span>
		</button>

		<nav class="desktop-nav" aria-label="メインナビゲーション">
			<button type="button" on:click={() => goToSection('services')}>サービス</button>
			<button type="button" on:click={() => goToSection('works')}>実績</button>
			<button type="button" on:click={() => goToSection('concept')}>私たちについて</button>
			<button type="button" on:click={() => goToSection('flow')}>導入の流れ</button>
			<button type="button" on:click={() => goToSection('works')}>ブログ</button>
			<button type="button" on:click={() => goToSection('contact')}>採用情報</button>
		</nav>

		<div class="header-actions">
			<a class="phone" href="tel:0368242296">
				<Phone size={16} />
				<span><strong>03-6824-2296</strong><small>平日 10:00 - 19:00</small></span>
			</a>
			<a class="primary small" href="#contact"><CalendarDays size={17} />AI導入を相談する</a>
		</div>
	</header>

	<main id="top">
		<section class="hero-section">
			<div class="hero-copy">
				<p class="eyebrow">AI・業務自動化の開発パートナー</p>
				<h1>
					<span class="line"><strong>AI</strong>を、現場の人が</span>
					<span class="line">使える形にする。</span>
				</h1>
				<p class="lead">
					難しいAI用語より、毎日の業務がどう楽になるか。<br
					/>私たちは、AI・Web・業務自動化・SaaSで、現場の「困っている」に寄り添い、使いやすく、続く仕組みをつくります。
				</p>
				<div class="hero-buttons">
					<a class="primary" href="#contact"
						><CalendarDays size={19} />AI導入を相談する<ArrowRight size={18} /></a
					>
					<a class="secondary" href="#works">実績を見る<ArrowRight size={18} /></a>
				</div>
				<div class="trust-row">
					{#each promises as promise}
						{@const Icon = promise.icon}
						<div class="trust-card">
							<Icon size={30} />
							<p><strong>{promise.title}</strong><span>{promise.text}</span></p>
						</div>
					{/each}
				</div>
			</div>

			<div class="hero-art">
				<div class="soft-blob"></div>
				<img src={heroImage} alt="AI導入を相談するチームのイラスト" />
				<div class="floating-card assistant-card">
					<strong>AIアシスタント</strong>
					<span>議事録を生成しました</span>
					<i></i><i></i><i></i>
				</div>
				<div class="floating-card chart-card">
					<span>今月の削減時間</span>
					<strong>32.5<small>時間</small></strong>
					<em>▲ 81%</em>
					<div class="chart-line"></div>
				</div>
				<div class="floating-card flow-card">
					<strong>自動化フロー</strong>
					<div class="mini-flow">
						<span>入力</span><b></b><span>処理</span><b></b><span>出力</span>
					</div>
				</div>
			</div>
		</section>

		<section class="concept-section" id="concept">
			<h2>私たちの考え方 <span>| AIを、やさしく、わかりやすく。</span></h2>
			<div class="concept-grid">
				{#each concepts as concept, index}
					{@const Icon = concept.icon}
					<article class="concept-card">
						<Icon size={42} />
						<h3>{concept.title}</h3>
						<p>{concept.body}</p>
					</article>
					{#if index < concepts.length - 1}<span class="concept-arrow">→</span>{/if}
				{/each}
			</div>
		</section>

		<section class="services-section" id="services">
			<h2 class="section-title">サービス <span>✦</span></h2>
			<div class="service-grid">
				{#each services as service}
					{@const Icon = service.icon}
					<article class={`service-card ${service.color}`}>
						<Icon size={44} />
						<h3>{service.title}</h3>
						<p>{service.desc}</p>
						<ul>
							{#each service.items as item}<li>{item}</li>{/each}
						</ul>
						<a href="#contact">詳しく見る <ArrowRight size={15} /></a>
					</article>
				{/each}
			</div>
		</section>

		<section class="works-section" id="works">
			<h2 class="section-title">実績・プロダクト事例 <span>⌄</span></h2>
			<p class="section-lead">公開できるプロダクトの一部をご紹介します。</p>
			<div class="works-row">
				{#each works as work}
					<article class="work-card">
						<img src={work.image} alt={work.title} loading="lazy" />
						<div>
							<h3>{work.title}</h3>
							<strong>{work.tag}</strong>
							<p>{work.body}</p>
							<a href="#contact">事例を読む <ArrowRight size={13} /></a>
						</div>
					</article>
				{/each}
			</div>
		</section>

		<section class="flow-section" id="flow">
			<h2 class="section-title">導入・開発の進め方 <span>⌄</span></h2>
			<p class="section-lead">最短で価値を届け、現場に定着するまで伴走します。</p>
			<div class="flow-grid">
				{#each flow as step, index}
					{@const Icon = step.icon}
					<article class="flow-step">
						<span>{String(index + 1).padStart(2, '0')}</span>
						<Icon size={34} />
						<h3>{step.title}</h3>
						<p>{step.body}</p>
					</article>
				{/each}
			</div>
		</section>

		<section class="reason-section">
			<h2 class="section-title">Lanespireが選ばれる理由</h2>
			<div class="reason-grid">
				{#each reasons as reason}
					{@const Icon = reason.icon}
					<article>
						<Icon size={28} />
						<div>
							<h3>{reason.title}</h3>
							<p>{reason.body}</p>
						</div>
					</article>
				{/each}
			</div>
		</section>

		<section class="cta-band" id="contact">
			<img src={ctaImage} alt="相談中のイラスト" loading="lazy" />
			<div class="cta-copy">
				<h2>まずは30分の無料相談から。</h2>
				<p>課題の整理やアイデアの壁打ちだけでも歓迎です。最適な進め方をご提案します。</p>
			</div>
			<a class="primary cta-button" href="mailto:info@lanespire.com"
				><CalendarDays size={24} />AI導入を相談する（30分無料）<ArrowRight size={22} /></a
			>
			<div class="cta-meta">
				<span>オンライン対応（Google Meet）</span><span>平日 10:00 - 19:00</span>
			</div>
		</section>
	</main>

	<footer class="footer">
		<div class="footer-brand">
			<button class="brand brand-button" type="button" on:click={() => goToSection('top')}
				><span class="brand-mark" aria-hidden="true"></span><span>Lanespire</span></button
			>
			<p>AI・Web・業務自動化・SaaS開発で、事業の成長に伴走する開発パートナー。</p>
			<small>© 2024 Lanespire Inc.</small>
		</div>
		<nav>
			<strong>サービス</strong>
			<a href="#services">AI導入支援</a><a href="#services">業務自動化</a><a href="#services"
				>Web制作</a
			><a href="#services">SaaS開発</a>
		</nav>
		<nav>
			<strong>実績</strong>
			<a href="#works">プロダクト一覧</a><a href="#works">事例インタビュー</a><a href="#works"
				>お客様の声</a
			>
		</nav>
		<nav>
			<strong>私たちについて</strong>
			<a href="#concept">ミッション</a><a href="#concept">メンバー</a><a href="#contact">会社概要</a
			>
		</nav>
		<div class="footer-contact">
			<a class="phone-card" href="tel:0368242296"
				><Phone size={19} /><strong>03-6824-2296</strong><span>平日 10:00 - 19:00</span></a
			>
			<a class="form-link" href="mailto:info@lanespire.com"
				>お問い合わせフォーム <ArrowRight size={16} /></a
			>
			<div class="socials"><span>𝕏</span><span>f</span><span>in</span><Mail size={18} /></div>
		</div>
	</footer>
</div>

<style>
	:global(body) {
		background: #fbfaf7;
		color: #14223a;
		font-family:
			Inter,
			'Noto Sans JP',
			system-ui,
			-apple-system,
			BlinkMacSystemFont,
			'Segoe UI',
			sans-serif;
	}

	:global(html) {
		scroll-behavior: smooth;
	}

	.lp-shell {
		--ink: #14223a;
		--muted: #5e6b79;
		--teal: #1c9a91;
		--teal-2: #4dc5bd;
		--orange: #ff7a35;
		--line: #dce8e6;
		--panel: #ffffff;
		background:
			radial-gradient(circle at 78% 4%, rgba(79, 197, 189, 0.2), transparent 24%),
			linear-gradient(180deg, #fffefa 0%, #fbfaf7 70%, #ffffff 100%);
		color: var(--ink);
		min-height: 100vh;
	}

	.lp-shell :global(a) {
		color: inherit;
		text-decoration: none;
	}
	.lp-shell :global(p),
	.lp-shell :global(h1),
	.lp-shell :global(h2),
	.lp-shell :global(h3) {
		margin: 0;
	}

	.site-header {
		align-items: center;
		background: rgba(255, 255, 255, 0.88);
		border-bottom: 1px solid rgba(220, 232, 230, 0.86);
		backdrop-filter: blur(18px);
		display: flex;
		gap: 28px;
		height: 86px;
		justify-content: space-between;
		padding: 0 48px;
		position: sticky;
		top: 0;
		z-index: 30;
	}

	.brand {
		align-items: center;
		background: transparent;
		border: 0;
		color: inherit;
		cursor: pointer;
		display: inline-flex;
		gap: 12px;
		font-size: 34px;
		font-weight: 850;
		letter-spacing: -0.01em;
		white-space: nowrap;
	}
	.brand-mark {
		background: conic-gradient(
			from 40deg,
			var(--teal) 0 68%,
			transparent 68% 82%,
			#76d5cd 82% 100%
		);
		border-radius: 50%;
		display: block;
		height: 32px;
		position: relative;
		width: 32px;
	}
	.brand-mark::after {
		background: #fbfaf7;
		border-radius: 50%;
		content: '';
		height: 14px;
		position: absolute;
		right: 0;
		top: 9px;
		width: 14px;
	}

	.desktop-nav {
		align-items: center;
		display: flex;
		gap: 34px;
		font-size: 15px;
		font-weight: 800;
	}
	.desktop-nav button {
		background: transparent;
		border: 0;
		color: inherit;
		cursor: pointer;
		font: inherit;
		font-weight: inherit;
		transition: color 160ms ease;
	}
	.desktop-nav button:hover {
		color: var(--teal);
	}

	.header-actions {
		align-items: center;
		display: flex;
		gap: 18px;
	}
	.phone {
		align-items: center;
		display: flex;
		gap: 8px;
		font-size: 14px;
		font-weight: 800;
	}
	.phone span {
		display: grid;
		gap: 1px;
	}
	.phone small {
		color: var(--muted);
		font-size: 11px;
		font-weight: 700;
	}

	.primary,
	.secondary {
		align-items: center;
		border-radius: 8px;
		display: inline-flex;
		font-weight: 850;
		gap: 10px;
		justify-content: center;
		line-height: 1;
		min-height: 54px;
		padding: 0 22px;
		transition:
			transform 160ms ease,
			box-shadow 160ms ease;
	}
	.primary {
		background: linear-gradient(135deg, #ff893f, var(--orange));
		color: #fff;
		box-shadow: 0 12px 24px rgba(255, 122, 53, 0.22);
	}
	.secondary {
		background: #fff;
		border: 1px solid #b9c8c8;
		color: var(--ink);
	}
	.primary:hover,
	.secondary:hover {
		transform: translateY(-2px);
	}
	.primary.small {
		min-height: 48px;
		padding: 0 18px;
	}

	main {
		margin: 0 auto;
		max-width: 1400px;
		padding: 0 40px 48px;
	}

	.hero-section {
		align-items: center;
		display: grid;
		gap: 38px;
		grid-template-columns: minmax(560px, 0.94fr) minmax(600px, 1.06fr);
		min-height: 610px;
		padding: 36px 0 28px;
	}
	.eyebrow {
		color: var(--teal);
		font-size: 20px;
		font-weight: 850;
		margin-bottom: 20px;
	}
	.hero-copy h1 {
		color: var(--ink);
		font-size: clamp(50px, 5.1vw, 70px);
		font-weight: 900;
		letter-spacing: 0;
		line-height: 1.28;
		margin-bottom: 26px;
	}

	.hero-copy h1 .line {
		display: block;
		white-space: nowrap;
	}

	.hero-copy h1 strong {
		color: var(--teal);
		font-size: 1.12em;
	}
	.lead {
		color: #314156;
		font-size: 18px;
		font-weight: 650;
		line-height: 2;
		margin-bottom: 28px;
		max-width: 610px;
	}
	.hero-buttons {
		display: flex;
		flex-wrap: wrap;
		gap: 16px;
		margin-bottom: 28px;
	}
	.trust-row {
		display: grid;
		gap: 16px;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		max-width: 650px;
	}
	.trust-card {
		align-items: center;
		background: rgba(255, 255, 255, 0.88);
		border: 1px solid var(--line);
		border-radius: 8px;
		box-shadow: 0 12px 30px rgba(23, 40, 48, 0.06);
		display: flex;
		gap: 14px;
		min-height: 78px;
		padding: 14px 16px;
	}
	.trust-card :global(svg) {
		color: var(--teal);
		flex: 0 0 auto;
	}
	.trust-card p {
		display: grid;
		gap: 3px;
	}
	.trust-card strong {
		font-size: 15px;
	}
	.trust-card span {
		color: var(--muted);
		font-size: 12px;
		font-weight: 700;
	}

	.hero-art {
		min-height: 560px;
		position: relative;
	}
	.soft-blob {
		display: none;
	}
	.hero-art > img {
		bottom: 0;
		display: block;
		position: absolute;
		right: -8px;
		width: min(760px, 108%);
		z-index: 2;
	}
	.floating-card {
		background: rgba(255, 255, 255, 0.9);
		border: 1px solid #cfdfdd;
		border-radius: 10px;
		box-shadow: 0 16px 38px rgba(35, 62, 70, 0.1);
		display: none;
		position: absolute;
		z-index: 3;
	}
	.assistant-card {
		display: grid;
		gap: 8px;
		left: 12px;
		padding: 18px 22px;
		top: 70px;
		width: 190px;
	}
	.assistant-card strong,
	.flow-card strong {
		font-size: 14px;
	}
	.assistant-card span {
		color: var(--muted);
		font-size: 12px;
		font-weight: 700;
	}
	.assistant-card i {
		background: #dfe9e9;
		border-radius: 999px;
		display: block;
		height: 7px;
		width: 84%;
	}
	.chart-card {
		padding: 18px 20px;
		right: 2px;
		top: 26px;
		width: 255px;
	}
	.chart-card span {
		color: var(--muted);
		font-size: 12px;
		font-weight: 800;
	}
	.chart-card strong {
		display: block;
		font-size: 34px;
		margin-top: 9px;
	}
	.chart-card small {
		font-size: 15px;
		margin-left: 3px;
	}
	.chart-card em {
		color: #1aa97f;
		display: block;
		font-size: 13px;
		font-style: normal;
		font-weight: 800;
		margin-top: 4px;
	}
	.chart-line {
		border-bottom: 3px solid var(--teal);
		border-right: 3px solid var(--teal);
		height: 42px;
		margin-top: 14px;
		transform: skew(-28deg);
		width: 170px;
	}
	.flow-card {
		bottom: 170px;
		padding: 18px 22px;
		right: 4px;
		width: 210px;
	}
	.mini-flow {
		align-items: center;
		color: #178e86;
		display: flex;
		font-size: 12px;
		font-weight: 800;
		gap: 9px;
		margin-top: 13px;
	}
	.mini-flow b {
		background: #9ecfca;
		height: 2px;
		width: 24px;
	}

	.concept-section,
	.services-section,
	.works-section,
	.flow-section,
	.reason-section {
		padding: 34px 0;
	}
	.concept-section h2,
	.section-title {
		color: var(--ink);
		font-size: 26px;
		font-weight: 900;
		letter-spacing: 0;
		text-align: center;
	}
	.concept-section h2 span,
	.section-title span {
		color: var(--teal);
		font-size: 18px;
	}
	.concept-grid {
		align-items: center;
		display: grid;
		gap: 24px;
		grid-template-columns: 1fr 24px 1fr 24px 1fr;
		margin: 28px auto 0;
		max-width: 1240px;
	}
	.concept-card,
	.service-card,
	.work-card,
	.flow-step {
		background: rgba(255, 255, 255, 0.86);
		border: 1px solid var(--line);
		border-radius: 8px;
		box-shadow: 0 18px 42px rgba(31, 50, 58, 0.05);
	}
	.concept-card {
		min-height: 178px;
		padding: 28px 30px;
	}
	.concept-card :global(svg) {
		color: var(--teal);
		margin-bottom: 12px;
	}
	.concept-card h3 {
		font-size: 20px;
		line-height: 1.6;
		white-space: pre-line;
	}
	.concept-card p {
		color: var(--muted);
		font-size: 13px;
		font-weight: 650;
		line-height: 1.9;
		margin-top: 8px;
	}
	.concept-arrow {
		color: var(--teal);
		font-size: 28px;
		font-weight: 900;
		text-align: center;
	}

	.service-grid {
		display: grid;
		gap: 22px;
		grid-template-columns: repeat(4, minmax(0, 1fr));
		margin-top: 26px;
	}
	.service-card {
		padding: 28px 28px 26px;
	}
	.service-card.cyan :global(svg),
	.service-card.cyan a,
	.service-card.cyan li::marker {
		color: #14b8c5;
	}
	.service-card.green :global(svg),
	.service-card.green a {
		color: #35a853;
	}
	.service-card.blue :global(svg),
	.service-card.blue a {
		color: #1e8ce3;
	}
	.service-card.orange :global(svg),
	.service-card.orange a {
		color: #f27622;
	}
	.service-card h3 {
		font-size: 23px;
		margin: 16px 0 12px;
	}
	.service-card p {
		color: #4e5f70;
		font-size: 14px;
		font-weight: 650;
		line-height: 1.75;
		min-height: 74px;
	}
	.service-card ul {
		display: grid;
		gap: 8px;
		margin: 18px 0 24px;
		padding-left: 18px;
	}
	.service-card li {
		color: #26384d;
		font-size: 13px;
		font-weight: 750;
	}
	.service-card a,
	.work-card a {
		align-items: center;
		display: inline-flex;
		font-size: 13px;
		font-weight: 850;
		gap: 5px;
	}

	.section-lead {
		color: var(--muted);
		font-size: 15px;
		font-weight: 750;
		margin-top: 8px;
		text-align: center;
	}
	.works-row {
		display: grid;
		gap: 14px;
		grid-template-columns: repeat(7, minmax(0, 1fr));
		margin: 26px calc(50% - 50vw) 0;
		padding: 0 38px;
	}
	.work-card {
		min-width: 0;
		overflow: hidden;
	}
	.work-card img {
		aspect-ratio: 1.55 / 1;
		display: block;
		height: auto;
		object-fit: cover;
		width: 100%;
	}
	.work-card div {
		padding: 14px 14px 16px;
	}
	.work-card h3 {
		font-size: 15px;
		margin-bottom: 6px;
	}
	.work-card strong {
		color: #277ec4;
		display: block;
		font-size: 11px;
		margin-bottom: 9px;
	}
	.work-card p {
		color: #5a6878;
		font-size: 11px;
		font-weight: 650;
		line-height: 1.75;
		min-height: 58px;
	}
	.work-card a {
		color: var(--teal);
		margin-top: 12px;
	}

	.flow-grid {
		display: grid;
		gap: 28px;
		grid-template-columns: repeat(5, minmax(0, 1fr));
		margin-top: 34px;
		position: relative;
	}
	.flow-step {
		min-height: 168px;
		padding: 28px 22px 20px;
		position: relative;
	}
	.flow-step:not(:last-child)::after {
		color: #8ca9a6;
		content: '→';
		font-size: 25px;
		font-weight: 700;
		position: absolute;
		right: -23px;
		top: 72px;
	}
	.flow-step > span {
		align-items: center;
		background: var(--teal);
		border-radius: 999px;
		color: #fff;
		display: flex;
		font-size: 13px;
		font-weight: 900;
		height: 34px;
		justify-content: center;
		left: 20px;
		position: absolute;
		top: -17px;
		width: 34px;
	}
	.flow-step:nth-child(2) > span,
	.flow-step:nth-child(5) > span {
		background: #75bc45;
	}
	.flow-step:nth-child(3) > span {
		background: #16b6cf;
	}
	.flow-step:nth-child(4) > span {
		background: #ffa33c;
	}
	.flow-step :global(svg) {
		color: var(--teal);
		margin-bottom: 18px;
	}
	.flow-step h3 {
		font-size: 16px;
		margin-bottom: 12px;
	}
	.flow-step p {
		color: #596a79;
		font-size: 12px;
		font-weight: 650;
		line-height: 1.8;
	}

	.reason-grid {
		align-items: stretch;
		display: grid;
		gap: 22px;
		grid-template-columns: repeat(5, minmax(0, 1fr));
		margin-top: 28px;
	}
	.reason-grid article {
		align-items: center;
		display: flex;
		gap: 12px;
		min-width: 0;
	}
	.reason-grid :global(svg) {
		background: #fff;
		border: 1px solid var(--line);
		border-radius: 999px;
		color: var(--ink);
		flex: 0 0 auto;
		height: 48px;
		padding: 10px;
		width: 48px;
	}
	.reason-grid h3 {
		font-size: 15px;
		margin-bottom: 4px;
	}
	.reason-grid p {
		color: var(--muted);
		font-size: 11px;
		font-weight: 650;
		line-height: 1.5;
	}

	.cta-band {
		align-items: center;
		background: linear-gradient(135deg, #61c9bd, #149c91);
		border-radius: 18px;
		color: #fff;
		display: grid;
		gap: 24px;
		grid-template-columns: 270px 1fr auto;
		margin-top: 34px;
		min-height: 190px;
		overflow: hidden;
		padding: 0 36px;
		position: relative;
	}
	.cta-band img {
		align-self: end;
		display: block;
		max-height: 182px;
		object-fit: contain;
		width: 270px;
	}
	.cta-copy h2 {
		font-size: 32px;
		font-weight: 900;
		margin-bottom: 14px;
	}
	.cta-copy p {
		color: rgba(255, 255, 255, 0.9);
		font-size: 15px;
		font-weight: 750;
		line-height: 1.8;
	}
	.cta-button {
		font-size: 22px;
		min-height: 84px;
		padding: 0 42px;
	}
	.cta-meta {
		bottom: 28px;
		display: flex;
		gap: 28px;
		font-size: 13px;
		font-weight: 850;
		position: absolute;
		right: 62px;
	}

	.footer {
		align-items: start;
		display: grid;
		gap: 54px;
		grid-template-columns: 1.5fr 0.65fr 0.7fr 0.8fr 1fr;
		margin: 0 auto;
		max-width: 1400px;
		padding: 44px 48px 54px;
	}
	.footer .brand {
		font-size: 30px;
		margin-bottom: 18px;
	}
	.footer-brand p {
		color: var(--muted);
		font-size: 13px;
		font-weight: 650;
		line-height: 1.8;
		max-width: 300px;
	}
	.footer-brand small {
		color: #97a2ad;
		display: block;
		font-size: 12px;
		margin-top: 24px;
	}
	.footer nav {
		display: grid;
		gap: 12px;
	}
	.footer nav strong {
		font-size: 14px;
		margin-bottom: 6px;
	}
	.footer nav a {
		color: #536273;
		font-size: 13px;
		font-weight: 700;
	}
	.footer-contact {
		background: #fff;
		border: 1px solid var(--line);
		border-radius: 12px;
		box-shadow: 0 14px 30px rgba(31, 50, 58, 0.06);
		padding: 20px;
	}
	.phone-card {
		align-items: center;
		display: grid;
		gap: 4px 8px;
		grid-template-columns: 22px 1fr;
		margin-bottom: 14px;
	}
	.phone-card span {
		color: var(--muted);
		font-size: 11px;
		grid-column: 2;
	}
	.form-link {
		align-items: center;
		border: 1px solid #b8c7c6;
		border-radius: 7px;
		display: flex;
		font-size: 13px;
		font-weight: 850;
		gap: 8px;
		justify-content: center;
		min-height: 42px;
	}
	.socials {
		align-items: center;
		display: flex;
		gap: 18px;
		justify-content: center;
		margin-top: 18px;
	}
	.socials span {
		font-weight: 900;
	}

	@media (max-width: 1120px) {
		.site-header {
			padding: 0 24px;
		}
		.desktop-nav,
		.phone {
			display: none;
		}
		main {
			padding: 0 24px 42px;
		}
		.hero-section {
			grid-template-columns: 1fr;
		}
		.hero-art {
			min-height: 500px;
		}
		.service-grid,
		.concept-grid {
			grid-template-columns: 1fr 1fr;
		}
		.concept-arrow {
			display: none;
		}
		.works-row {
			grid-template-columns: repeat(3, minmax(0, 1fr));
			margin: 26px 0 0;
			padding: 0;
		}
		.flow-grid,
		.reason-grid {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}
		.flow-step::after {
			display: none;
		}
		.cta-band {
			grid-template-columns: 180px 1fr;
			padding: 20px 24px;
		}
		.cta-band img {
			width: 180px;
		}
		.cta-button {
			grid-column: 1 / -1;
			min-height: 64px;
		}
		.cta-meta {
			position: static;
			grid-column: 1 / -1;
		}
		.footer {
			grid-template-columns: 1fr 1fr;
		}
	}

	@media (max-width: 720px) {
		.site-header {
			height: 70px;
		}
		.brand {
			font-size: 25px;
		}
		.brand-mark {
			height: 26px;
			width: 26px;
		}
		.primary.small {
			display: none;
		}
		main {
			padding: 0 18px 34px;
		}
		.hero-section {
			min-height: 0;
			padding-top: 34px;
		}
		.hero-copy h1 {
			font-size: 41px;
		}
		.hero-copy h1 .line {
			white-space: normal;
		}
		.lead {
			font-size: 15px;
			line-height: 1.8;
		}
		.hero-buttons,
		.trust-row,
		.service-grid,
		.concept-grid,
		.flow-grid,
		.reason-grid,
		.footer {
			grid-template-columns: 1fr;
		}
		.hero-buttons {
			display: grid;
		}
		.hero-art {
			min-height: 350px;
		}
		.soft-blob {
			height: 330px;
			right: -30px;
			width: 370px;
		}
		.hero-art > img {
			width: 440px;
		}
		.floating-card {
			display: none;
		}
		.works-row {
			grid-template-columns: 1fr;
		}
		.cta-band {
			grid-template-columns: 1fr;
			text-align: center;
		}
		.cta-band img {
			justify-self: center;
		}
		.cta-copy h2 {
			font-size: 26px;
		}
		.cta-button {
			font-size: 17px;
			padding: 0 18px;
		}
		.cta-meta {
			flex-direction: column;
			gap: 10px;
		}
	}
</style>
