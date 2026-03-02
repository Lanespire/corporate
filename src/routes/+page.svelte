<script lang="ts">
	import logo from '$lib/assets/images/lanespire_logo.png';
	import type { PageData } from './$types';

	const { data } = $props<{ data: PageData }>();

	const navItems = [
		{ label: 'サービス', href: '#services' },
		{ label: '導入事例', href: '#cases' },
		{ label: '会社情報', href: '#company' },
		{ label: 'お問い合わせ', href: '#contact' }
	];

	const valueProps = [
		{
			title: 'Material準拠の情報設計',
			description: 'Googleのデザイン思想をベースに、視認性と操作性を両立したUIを設計します。'
		},
		{
			title: '売れる会社の導線設計',
			description: '事業説明と実績提示を一体化し、問い合わせまでの心理的ハードルを下げます。'
		},
		{
			title: '更新しやすい運用構造',
			description: '導入事例やサービス情報はMarkdown管理で、ビルド時に自動反映されます。'
		}
	];

	const deliverySteps = [
		{ title: 'Discovery', body: '事業・顧客・競合の整理' },
		{ title: 'Design', body: '情報設計とビジュアル設計' },
		{ title: 'Build', body: 'SvelteKitで高速実装' },
		{ title: 'Optimize', body: '計測改善と継続運用' }
	];

	type ContentEntry = PageData['services'][number];

	const getMeta = (entry: ContentEntry, key: string): string => {
		const value = entry.meta[key];
		if (typeof value === 'string') {
			return value;
		}

		if (typeof value === 'number') {
			return String(value);
		}

		if (Array.isArray(value)) {
			return value.join(', ');
		}

		return '';
	};

	const year = new Date().getFullYear();
</script>

<svelte:head>
	<title>株式会社Lanespire | 事業を前進させるデジタル体験設計</title>
	<meta
		name="description"
		content="株式会社Lanespireのコーポレートサイト。Googleデザインガイドラインをベースに、サービス紹介と導入事例をMarkdownで更新できる構成へ刷新。"
	/>
	<meta name="keywords" content="Lanespire, Web制作, AI導入, SvelteKit, Night Table, 業務自動化" />
	<meta property="og:title" content="株式会社Lanespire | 事業を前進させるデジタル体験設計" />
	<meta
		property="og:description"
		content="デザイン・開発・運用まで一体で伴走。導入事例とサービス情報を素早く更新できるコーポレートサイト。"
	/>
	<meta property="og:type" content="website" />
</svelte:head>

<div class="page-shell">
	<div class="decor decor-left" aria-hidden="true"></div>
	<div class="decor decor-right" aria-hidden="true"></div>

	<header class="topbar">
		<div class="container topbar-inner">
			<a href="#home" class="brand" aria-label="Lanespire Home">
				<img src={logo} alt="Lanespire" width="34" height="34" />
				<span>Lanespire</span>
			</a>
			<nav class="nav" aria-label="Main navigation">
				{#each navItems as item}
					<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
					<a href={item.href}>{item.label}</a>
				{/each}
			</nav>
			<a class="header-cta" href="#contact">無料相談</a>
		</div>
	</header>

	<main>
		<section id="home" class="hero section container">
			<div class="hero-copy">
				<p class="eyebrow">Digital Partner for Growing Teams</p>
				<h1>売上につながるコーポレートサイトへ、全面アップデート</h1>
				<p>
					情報を並べるだけのサイトではなく、サービス価値が伝わり商談につながる体験へ。
					Googleの設計思想を軸に、見やすさ・速さ・更新しやすさを高い水準で両立します。
				</p>
				<div class="hero-actions">
					<a class="btn btn-primary" href="#contact">プロジェクトを相談する</a>
					<a class="btn btn-ghost" href="#cases">導入事例を見る</a>
				</div>
			</div>
			<div class="hero-panel">
				<p class="panel-label">主要指標</p>
				<ul>
					<li>
						<span>01</span>
						<div>
							<strong>高速表示とSEOの両立</strong>
							<p>構造化されたページ設計で、検索流入とCV動線を強化。</p>
						</div>
					</li>
					<li>
						<span>02</span>
						<div>
							<strong>導入事例の更新を簡単に</strong>
							<p>Markdownで追加するだけで、ビルド時に即反映。</p>
						</div>
					</li>
					<li>
						<span>03</span>
						<div>
							<strong>サービス説明の説得力を向上</strong>
							<p>比較・実績・導線を統合し、検討段階の不安を減らします。</p>
						</div>
					</li>
				</ul>
			</div>
		</section>

		<section class="section container value-grid" aria-label="Core values">
			{#each valueProps as value, index}
				<article class="value-card" style={`--delay:${index * 120}ms`}>
					<h2>{value.title}</h2>
					<p>{value.description}</p>
				</article>
			{/each}
		</section>

		<section id="services" class="section container">
			<div class="section-head">
				<p class="eyebrow">Services</p>
				<h2>サービス事例をMarkdownで管理</h2>
				<p>`src/content/services/*.md` に追加すると、ビルド時にカードとして自動反映されます。</p>
			</div>
			<div class="card-grid">
				{#each data.services as service}
					<article class="card service-card">
						<div class="card-top">
							{#if service.category}
								<p class="chip">{service.category}</p>
							{/if}
							<h3>{service.title}</h3>
							<p>{service.summary}</p>
						</div>
						{#if service.tags.length}
							<div class="tag-list">
								{#each service.tags as tag}
									<span>{tag}</span>
								{/each}
							</div>
						{/if}
						<!-- eslint-disable-next-line svelte/no-at-html-tags -->
						<div class="markdown">{@html service.html}</div>
						{#if service.ctaUrl}
							<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
							<a href={service.ctaUrl} class="inline-link">{service.ctaLabel ?? '詳しく見る'}</a>
						{/if}
					</article>
				{/each}
			</div>
		</section>

		<section id="cases" class="section container">
			<div class="section-head">
				<p class="eyebrow">Case Studies</p>
				<h2>導入事例</h2>
				<p>`src/content/case-studies/*.md` に実績を追加するだけで表示内容を差し替え可能です。</p>
			</div>
			<div class="card-grid case-grid">
				{#each data.caseStudies as caseStudy}
					<article class="card case-card">
						<div class="case-header">
							<div>
								{#if caseStudy.category}
									<p class="chip">{caseStudy.category}</p>
								{/if}
								<h3>{caseStudy.title}</h3>
							</div>
							{#if getMeta(caseStudy, 'period')}
								<p class="meta-pill">{getMeta(caseStudy, 'period')}</p>
							{/if}
						</div>

						<p>{caseStudy.summary}</p>

						<dl class="meta-list">
							{#if getMeta(caseStudy, 'industry')}
								<div>
									<dt>業界</dt>
									<dd>{getMeta(caseStudy, 'industry')}</dd>
								</div>
							{/if}
							{#if getMeta(caseStudy, 'result')}
								<div>
									<dt>成果</dt>
									<dd>{getMeta(caseStudy, 'result')}</dd>
								</div>
							{/if}
						</dl>

						<!-- eslint-disable-next-line svelte/no-at-html-tags -->
						<div class="markdown">{@html caseStudy.html}</div>

						{#if getMeta(caseStudy, 'site_url')}
							<!-- eslint-disable svelte/no-navigation-without-resolve -->
							<a
								class="inline-link"
								href={getMeta(caseStudy, 'site_url')}
								target="_blank"
								rel="noreferrer"
							>
								サービスサイトを見る
							</a>
							<!-- eslint-enable svelte/no-navigation-without-resolve -->
						{/if}
					</article>
				{/each}
			</div>
		</section>

		<section id="company" class="section container company-wrap">
			<div class="section-head compact">
				<p class="eyebrow">Company</p>
				<h2>伴走型のプロダクトチームとして支援</h2>
			</div>
			<div class="flow-grid">
				{#each deliverySteps as step, index}
					<article class="flow-card">
						<p class="flow-index">0{index + 1}</p>
						<h3>{step.title}</h3>
						<p>{step.body}</p>
					</article>
				{/each}
			</div>
		</section>

		<section id="contact" class="section container contact-wrap">
			<div class="contact-panel">
				<div class="section-head compact">
					<p class="eyebrow">Contact</p>
					<h2>新しいコーポレートサイトを一緒に設計しましょう</h2>
					<p>初回ヒアリングで現状課題を整理し、最短2週間でデザイン提案まで進めます。</p>
				</div>
				<ul>
					<li>会社名:株式会社Lanespire</li>
					<li>所在地:東京都中央区銀座1丁目12番4号 N&E BLD.6F</li>
					<li>対応領域:Web制作 / AI導入 / SaaS開発支援</li>
				</ul>
			</div>

			<form
				class="contact-form"
				name="contact"
				method="POST"
				data-netlify="true"
				netlify-honeypot="bot-field"
			>
				<input type="hidden" name="form-name" value="contact" />
				<p class="sr-only">
					<label>Do not fill this out <input name="bot-field" /></label>
				</p>

				<label>
					<span>お名前</span>
					<input type="text" name="name" required />
				</label>

				<label>
					<span>メールアドレス</span>
					<input type="email" name="email" required />
				</label>

				<label>
					<span>ご相談内容</span>
					<textarea name="message" rows="5" required></textarea>
				</label>

				<button type="submit">送信する</button>
			</form>
		</section>
	</main>

	<footer>
		<div class="container footer-inner">
			<p>© {year} Lanespire Inc.</p>
			<a href="https://night-table.com/" target="_blank" rel="noreferrer">Night Table</a>
		</div>
	</footer>
</div>

<style>
	.page-shell {
		position: relative;
		isolation: isolate;
	}

	.decor {
		position: fixed;
		z-index: -1;
		width: 26rem;
		height: 26rem;
		border-radius: 999px;
		filter: blur(3px);
		pointer-events: none;
		animation: float 10s ease-in-out infinite;
	}

	.decor-left {
		top: 10vh;
		left: -12rem;
		background: radial-gradient(circle, rgba(26, 115, 232, 0.27), rgba(26, 115, 232, 0));
	}

	.decor-right {
		top: 48vh;
		right: -10rem;
		animation-delay: 1.8s;
		background: radial-gradient(circle, rgba(24, 128, 56, 0.22), rgba(24, 128, 56, 0));
	}

	.topbar {
		position: sticky;
		top: 0;
		z-index: 30;
		backdrop-filter: blur(16px);
		background: rgba(245, 248, 255, 0.78);
		border-bottom: 1px solid rgba(216, 226, 240, 0.8);
	}

	.topbar-inner {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0.85rem 0;
		gap: 1rem;
	}

	.brand {
		display: inline-flex;
		align-items: center;
		gap: 0.65rem;
		font-weight: 800;
		font-size: 1.06rem;
		text-decoration: none;
		letter-spacing: 0.01em;
	}

	.nav {
		display: inline-flex;
		align-items: center;
		gap: 1.1rem;
	}

	.nav a {
		font-size: 0.95rem;
		text-decoration: none;
		color: var(--ink-soft);
		font-weight: 600;
		transition: color 180ms ease;
	}

	.nav a:hover {
		color: var(--primary);
	}

	.header-cta {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		height: 2.4rem;
		padding: 0 1.05rem;
		border-radius: 999px;
		text-decoration: none;
		background: var(--primary);
		color: #fff;
		font-size: 0.9rem;
		font-weight: 700;
		box-shadow: 0 6px 18px rgba(26, 115, 232, 0.27);
	}

	.section {
		padding: 5.2rem 0;
	}

	.hero {
		display: grid;
		grid-template-columns: minmax(0, 1.18fr) minmax(0, 0.82fr);
		gap: 1.4rem;
		padding-top: 5.6rem;
		align-items: stretch;
	}

	.hero-copy,
	.hero-panel {
		border: 1px solid rgba(216, 226, 240, 0.95);
		background: linear-gradient(146deg, #ffffff, #f7fbff);
		border-radius: var(--radius-xl);
		padding: 2rem;
		box-shadow: var(--shadow-soft);
	}

	.eyebrow {
		display: inline-flex;
		align-items: center;
		gap: 0.4rem;
		margin-bottom: 0.8rem;
		font-size: 0.75rem;
		font-weight: 800;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: var(--primary);
	}

	.hero-copy h1 {
		font-size: clamp(1.9rem, 3.5vw, 3rem);
		margin-bottom: 1.1rem;
	}

	.hero-copy p {
		font-size: 1.04rem;
		max-width: 60ch;
	}

	.hero-actions {
		display: flex;
		flex-wrap: wrap;
		gap: 0.78rem;
		margin-top: 1.55rem;
	}

	.btn {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		height: 2.9rem;
		padding: 0 1.2rem;
		border-radius: 999px;
		text-decoration: none;
		font-weight: 700;
		font-size: 0.95rem;
		transition:
			transform 200ms ease,
			box-shadow 200ms ease,
			background-color 200ms ease;
	}

	.btn:hover {
		transform: translateY(-2px);
	}

	.btn-primary {
		color: #fff;
		background: linear-gradient(135deg, var(--primary), #488ef2);
		box-shadow: 0 10px 24px rgba(26, 115, 232, 0.25);
	}

	.btn-ghost {
		background: rgba(26, 115, 232, 0.1);
		color: var(--primary);
	}

	.hero-panel {
		background: linear-gradient(160deg, #f7fbff, #eef5ff);
	}

	.panel-label {
		font-size: 0.8rem;
		font-weight: 700;
		letter-spacing: 0.07em;
		text-transform: uppercase;
		margin-bottom: 0.9rem;
	}

	.hero-panel ul {
		list-style: none;
		display: grid;
		gap: 1rem;
		padding: 0;
		margin: 0;
	}

	.hero-panel li {
		display: grid;
		grid-template-columns: auto minmax(0, 1fr);
		gap: 0.75rem;
		align-items: start;
	}

	.hero-panel li > span {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 2rem;
		height: 2rem;
		border-radius: 999px;
		font-size: 0.78rem;
		font-weight: 800;
		background: #d2e3fc;
		color: #0b57d0;
	}

	.hero-panel strong {
		display: block;
		font-size: 0.97rem;
		margin-bottom: 0.25rem;
	}

	.hero-panel p {
		font-size: 0.92rem;
	}

	.value-grid {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: 1rem;
		padding-top: 0;
	}

	.value-card {
		padding: 1.35rem;
		border-radius: var(--radius-lg);
		border: 1px solid var(--line);
		background: #fff;
		box-shadow: var(--shadow-card);
		animation: fade-up 550ms ease both;
		animation-delay: var(--delay);
	}

	.value-card h2 {
		font-size: 1.12rem;
		margin-bottom: 0.58rem;
	}

	.section-head {
		max-width: 56rem;
		margin-bottom: 1.5rem;
	}

	.section-head h2 {
		font-size: clamp(1.6rem, 2.8vw, 2.28rem);
		margin-bottom: 0.62rem;
	}

	.section-head p {
		font-size: 1rem;
	}

	.card-grid {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: 1rem;
	}

	.card {
		padding: 1.4rem;
		border-radius: var(--radius-lg);
		border: 1px solid var(--line);
		background: #fff;
		box-shadow: var(--shadow-card);
	}

	.card h3 {
		font-size: 1.25rem;
		margin: 0.45rem 0 0.62rem;
	}

	.chip {
		display: inline-flex;
		align-items: center;
		height: 1.7rem;
		padding: 0 0.72rem;
		border-radius: 999px;
		font-size: 0.75rem;
		font-weight: 800;
		letter-spacing: 0.03em;
		background: rgba(26, 115, 232, 0.12);
		color: var(--primary);
	}

	.tag-list {
		display: flex;
		flex-wrap: wrap;
		gap: 0.45rem;
		margin: 0.95rem 0;
	}

	.tag-list span {
		font-size: 0.77rem;
		padding: 0.3rem 0.55rem;
		border-radius: 0.58rem;
		background: var(--surface-soft);
		font-weight: 700;
		color: #234271;
	}

	.inline-link {
		display: inline-flex;
		margin-top: 0.8rem;
		text-decoration: none;
		font-weight: 700;
		font-size: 0.9rem;
		color: var(--primary);
	}

	.inline-link:hover {
		text-decoration: underline;
	}

	.markdown {
		display: grid;
		gap: 0.55rem;
		margin-top: 0.85rem;
	}

	.markdown :global(h2),
	.markdown :global(h3),
	.markdown :global(h4) {
		font-size: 1rem;
	}

	.markdown :global(p),
	.markdown :global(li),
	.markdown :global(blockquote) {
		font-size: 0.92rem;
		color: var(--ink-soft);
	}

	.markdown :global(ul) {
		padding-left: 1.1rem;
		margin: 0;
		display: grid;
		gap: 0.45rem;
	}

	.markdown :global(code) {
		padding: 0.12rem 0.4rem;
		border-radius: 0.4rem;
		background: #edf3ff;
		font-size: 0.78rem;
		font-family: 'ui-monospace', 'SFMono-Regular', Menlo, Monaco, Consolas, monospace;
	}

	.markdown :global(a) {
		color: var(--primary);
	}

	.case-grid {
		grid-template-columns: repeat(2, minmax(0, 1fr));
	}

	.case-header {
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		gap: 0.8rem;
	}

	.meta-pill {
		margin: 0;
		font-size: 0.76rem;
		font-weight: 700;
		padding: 0.35rem 0.6rem;
		border-radius: 999px;
		background: rgba(24, 128, 56, 0.14);
		color: var(--secondary);
	}

	.meta-list {
		display: grid;
		gap: 0.6rem;
		padding: 0;
		margin: 0.9rem 0 0;
	}

	.meta-list div {
		display: grid;
		gap: 0.2rem;
	}

	.meta-list dt {
		font-size: 0.75rem;
		font-weight: 800;
		color: #4b6896;
		letter-spacing: 0.04em;
		text-transform: uppercase;
	}

	.meta-list dd {
		margin: 0;
		font-size: 0.94rem;
		font-weight: 600;
		color: #1f355a;
	}

	.company-wrap {
		padding-top: 4.4rem;
	}

	.compact {
		margin-bottom: 1rem;
	}

	.flow-grid {
		display: grid;
		grid-template-columns: repeat(4, minmax(0, 1fr));
		gap: 0.85rem;
	}

	.flow-card {
		padding: 1.2rem;
		border-radius: var(--radius-md);
		border: 1px solid var(--line);
		background: #fff;
	}

	.flow-index {
		font-size: 0.73rem;
		font-weight: 800;
		margin-bottom: 0.5rem;
		color: var(--primary);
		letter-spacing: 0.06em;
	}

	.flow-card h3 {
		font-size: 1.1rem;
		margin-bottom: 0.42rem;
	}

	.flow-card p {
		font-size: 0.92rem;
	}

	.contact-wrap {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1rem;
		padding-top: 4.4rem;
	}

	.contact-panel,
	.contact-form {
		padding: 1.4rem;
		border-radius: var(--radius-lg);
		border: 1px solid var(--line);
		background: #fff;
		box-shadow: var(--shadow-card);
	}

	.contact-panel ul {
		list-style: none;
		padding: 0;
		margin: 1rem 0 0;
		display: grid;
		gap: 0.45rem;
	}

	.contact-panel li {
		font-size: 0.92rem;
		color: #374862;
		font-weight: 600;
	}

	.contact-form {
		display: grid;
		gap: 0.85rem;
	}

	.contact-form label {
		display: grid;
		gap: 0.4rem;
	}

	.contact-form span {
		font-size: 0.84rem;
		font-weight: 700;
		color: #34517c;
	}

	.contact-form input,
	.contact-form textarea {
		width: 100%;
		border-radius: 0.75rem;
		border: 1px solid #c9d7eb;
		padding: 0.72rem 0.84rem;
		font-size: 0.95rem;
		font-family: inherit;
		background: #fbfdff;
	}

	.contact-form input:focus,
	.contact-form textarea:focus {
		outline: 2px solid rgba(26, 115, 232, 0.33);
		border-color: rgba(26, 115, 232, 0.7);
	}

	.contact-form button {
		height: 2.8rem;
		border: 0;
		border-radius: 0.84rem;
		font-weight: 800;
		background: linear-gradient(135deg, var(--primary), #3b86ef);
		color: #fff;
		cursor: pointer;
	}

	footer {
		padding: 1.3rem 0 2rem;
	}

	.footer-inner {
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: 0.88rem;
	}

	.footer-inner a {
		font-weight: 700;
		color: var(--primary);
		text-decoration: none;
	}

	.footer-inner a:hover {
		text-decoration: underline;
	}

	.sr-only {
		position: absolute;
		width: 1px;
		height: 1px;
		padding: 0;
		margin: -1px;
		overflow: hidden;
		clip: rect(0, 0, 0, 0);
		border: 0;
	}

	@keyframes fade-up {
		from {
			opacity: 0;
			transform: translateY(8px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	@keyframes float {
		0%,
		100% {
			transform: translateY(0);
		}
		50% {
			transform: translateY(-14px);
		}
	}

	@media (max-width: 1080px) {
		.hero {
			grid-template-columns: 1fr;
		}

		.value-grid,
		.card-grid,
		.flow-grid,
		.contact-wrap {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}

		.nav {
			display: none;
		}
	}

	@media (max-width: 768px) {
		.section {
			padding: 4.2rem 0;
		}

		.hero {
			padding-top: 4.5rem;
		}

		.hero-copy,
		.hero-panel,
		.card,
		.contact-panel,
		.contact-form {
			padding: 1.2rem;
			border-radius: 1rem;
		}

		.value-grid,
		.card-grid,
		.case-grid,
		.flow-grid,
		.contact-wrap {
			grid-template-columns: 1fr;
		}

		.topbar-inner {
			padding: 0.7rem 0;
		}

		.header-cta {
			height: 2.1rem;
			font-size: 0.82rem;
			padding: 0 0.78rem;
		}

		.footer-inner {
			flex-direction: column;
			align-items: flex-start;
			gap: 0.4rem;
		}
	}
</style>
