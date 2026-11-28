<script lang="ts">
	import CaseArt from '$lib/corp/components/CaseArt.svelte';
	import { casesSection, hero, partnerNote, site } from '$lib/corp/content';
	import { reveal } from '$lib/corp/motion';

	let { data } = $props();
	const item = $derived(data.item);
	const url = $derived(`${site.url}cases/${item.slug}`);
	const pageTitle = $derived(`${item.title} | 開発事例 | ${site.name}`);
</script>

<!-- eslint-disable svelte/no-navigation-without-resolve -- Served from the domain root; links are fixed paths. -->
<svelte:head>
	<title>{pageTitle}</title>
	<meta name="description" content={item.summary} />
	<link rel="canonical" href={url} />
	<meta property="og:type" content="article" />
	<meta property="og:locale" content="ja_JP" />
	<meta property="og:title" content={pageTitle} />
	<meta property="og:description" content={item.summary} />
	<meta property="og:url" content={url} />
	<meta property="og:image" content={site.ogImage} />
	<meta name="twitter:card" content="summary_large_image" />
</svelte:head>

<main id="main" class="case-page">
	{#key item.slug}
		<header class="top">
			<div class="container top-grid">
				<div class="intro">
					<a class="back" href="/#cases">
						<svg class="arr" viewBox="0 0 24 24" aria-hidden="true"
							><path d="M20 12H5M11 6l-6 6 6 6" /></svg
						>
						開発事例
					</a>
					<p class="kicker">
						<span class="no">CASE {String(data.index + 1).padStart(2, '0')}</span>
						{#if item.label}<span class="tag">{item.label}</span>{/if}
					</p>
					<h1 class="display">
						<span class="ln"><span class="ln-i">{item.title}</span></span>
					</h1>
					<span class="lane-rule" aria-hidden="true"></span>
				</div>
				<div class="visual">
					<CaseArt slug={item.slug} eager />
				</div>
			</div>
		</header>

		<div class="container body">
			<aside class="facts" data-reveal use:reveal>
				<dl>
					{#each item.meta as row (row.k)}
						<div>
							<dt>{row.k}</dt>
							<dd>{row.v}</dd>
						</div>
					{/each}
				</dl>
				<h2 class="facts-title">技術</h2>
				<ul class="tech">
					{#each item.tech as tech (tech)}
						<li class="chip">{tech}</li>
					{/each}
				</ul>
			</aside>
			<div class="story">
				{#each item.sections as section (section.h)}
					<section data-reveal use:reveal>
						<h2>{section.h}</h2>
						{#each section.blocks as block, b (b)}
							{#if block.t === 'p'}
								<p>{block.text}</p>
							{:else if block.t === 'ol'}
								<ol>
									{#each block.items as line, n (n)}
										<li>{line}</li>
									{/each}
								</ol>
							{:else}
								<ul>
									{#each block.items as line, n (n)}
										<li>{line}</li>
									{/each}
								</ul>
							{/if}
						{/each}
					</section>
				{/each}
				<p class="note">{casesSection.note}</p>
			</div>
		</div>

		<section class="consult">
			<div class="container consult-in" data-reveal use:reveal>
				<p class="display">{casesSection.consult}</p>
				<div class="actions">
					<a class="btn btn-light" href={hero.secondary.href}>
						{hero.secondary.label}
						<svg class="arr" viewBox="0 0 24 24" aria-hidden="true"
							><path d="M4 12h15M13 6l6 6-6 6" /></svg
						>
					</a>
					<a class="mail" href="mailto:{site.email}">{site.email}</a>
				</div>
			</div>
			<div class="container">
				<aside class="partner" aria-labelledby="partner-title" data-reveal use:reveal>
					<h2 id="partner-title">{partnerNote.title}</h2>
					<dl>
						{#each partnerNote.rows as row (row.k)}
							<div>
								<dt>{row.k}</dt>
								<dd>{row.v}</dd>
							</div>
						{/each}
					</dl>
				</aside>
			</div>
		</section>

		<nav class="container pager" aria-label="ほかの開発事例">
			{#if data.prev}
				<a class="prev" href="/cases/{data.prev.slug}">
					<small>前の事例</small>
					<span>{data.prev.title}</span>
				</a>
			{:else}
				<span></span>
			{/if}
			{#if data.next}
				<a class="next" href="/cases/{data.next.slug}">
					<small>次の事例</small>
					<span>{data.next.title}</span>
				</a>
			{/if}
		</nav>
	{/key}
</main>

<style>
	.case-page {
		padding-top: var(--header-h);
	}
	.top {
		padding-block: clamp(40px, 6vw, 88px) clamp(40px, 5vw, 72px);
		background: linear-gradient(180deg, #fff, var(--pale));
	}
	.top-grid {
		display: grid;
		grid-template-columns: minmax(0, 1.15fr) minmax(0, 0.85fr);
		gap: clamp(28px, 5vw, 80px);
		align-items: center;
	}
	.back {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		min-height: 44px;
		font-size: 14px;
		font-weight: 700;
		color: var(--muted);
		transition: color 0.3s;
		animation: corp-fade-up 0.8s var(--ease-out) both;
	}
	.back:hover {
		color: var(--blue-ink);
	}
	.back .arr {
		width: 16px;
		height: 16px;
		transition: transform 0.4s var(--ease-out);
	}
	.back:hover .arr {
		transform: translateX(-4px);
	}
	.kicker {
		display: flex;
		align-items: center;
		gap: 10px;
		margin-top: 18px;
		animation: corp-fade-up 0.8s var(--ease-out) 0.05s both;
	}
	.no {
		font-size: 13px;
		font-weight: 800;
		letter-spacing: 0.16em;
		color: var(--blue);
	}
	h1 {
		margin-top: 14px;
		font-size: clamp(26px, 3.6vw, 48px);
		line-height: 1.42;
	}
	h1 .ln-i {
		animation: corp-line-up 1s var(--ease-out) 0.1s both;
	}
	.lane-rule {
		margin-top: 24px;
		animation: corp-grow-x 1s var(--ease-out) 0.45s both;
	}
	.visual {
		aspect-ratio: 5 / 4;
		animation: corp-fade-up 1.1s var(--ease-out) 0.25s both;
	}
	.body {
		display: grid;
		grid-template-columns: minmax(0, 0.8fr) minmax(0, 1.2fr);
		gap: clamp(32px, 6vw, 96px);
		align-items: start;
		padding-block: clamp(56px, 7vw, 104px);
	}
	.facts {
		position: sticky;
		top: calc(var(--header-h) + 28px);
		padding: 26px;
		border: 1px solid var(--line);
		border-radius: var(--r-md);
		background: #fff;
	}
	.facts dl div {
		display: grid;
		grid-template-columns: 5.5em minmax(0, 1fr);
		gap: 12px;
		padding: 12px 0;
		border-bottom: 1px solid var(--line);
		font-size: 15px;
		line-height: 1.75;
	}
	.facts dl div:first-child {
		padding-top: 0;
	}
	.facts dt,
	.facts-title {
		font-size: 14px;
		font-weight: 700;
		color: var(--muted);
	}
	.facts dd {
		font-weight: 600;
		color: var(--ink);
	}
	.facts-title {
		margin-top: 16px;
	}
	.tech {
		display: flex;
		flex-wrap: wrap;
		gap: 6px;
		margin-top: 10px;
	}
	.story {
		display: grid;
		gap: clamp(36px, 4vw, 56px);
	}
	.story h2 {
		display: flex;
		align-items: baseline;
		gap: 14px;
		padding-bottom: 14px;
		border-bottom: 2px solid var(--ink);
		font-family: var(--font-sans);
		font-size: clamp(20px, 2vw, 26px);
		font-weight: 800;
		line-height: 1.5;
		color: var(--ink);
	}
	.story p,
	.story ul,
	.story ol {
		margin-top: 18px;
	}
	.story p {
		color: var(--ink);
		text-wrap: pretty;
	}
	.story ul,
	.story ol {
		display: grid;
		gap: 10px;
	}
	.story ol {
		counter-reset: step;
	}
	.story li {
		position: relative;
		padding-left: 26px;
		color: var(--ink);
	}
	.story ul li::before {
		content: '';
		position: absolute;
		left: 2px;
		top: 0.9em;
		width: 14px;
		height: 2px;
		border-radius: 2px;
		background: var(--blue);
	}
	.story ol li {
		counter-increment: step;
		padding-left: 30px;
	}
	.story ol li::before {
		content: counter(step) '.';
		position: absolute;
		left: 2px;
		top: 0;
		font-weight: 800;
		color: var(--blue-ink);
	}
	.story .note {
		margin: 0;
		font-size: 13px;
		color: var(--muted);
	}
	.consult {
		padding-block: clamp(48px, 6vw, 88px);
		background: var(--navy);
	}
	.consult-in {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: space-between;
		gap: 24px 40px;
	}
	.partner {
		margin-top: clamp(28px, 4vw, 48px);
		padding: clamp(20px, 2.6vw, 32px);
		border: 1px solid rgba(255, 255, 255, 0.18);
		border-radius: var(--r-md);
		background: rgba(255, 255, 255, 0.05);
		color: rgba(255, 255, 255, 0.82);
	}
	.partner h2 {
		display: flex;
		align-items: center;
		gap: 12px;
		font-size: 15px;
		font-weight: 700;
		letter-spacing: 0.06em;
		color: #8fb3ff;
	}
	.partner h2::before {
		content: '';
		width: 24px;
		height: 2px;
		border-radius: 2px;
		background: currentColor;
	}
	.partner dl {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: 8px 32px;
		margin-top: 16px;
	}
	.partner dt {
		font-size: 13px;
		font-weight: 700;
		letter-spacing: 0.08em;
		color: rgba(255, 255, 255, 0.62);
	}
	.partner dd {
		margin-top: 4px;
		font-size: 16px;
		line-height: 1.8;
		color: #fff;
	}
	.consult .display {
		font-size: clamp(22px, 2.6vw, 34px);
		color: #fff;
	}
	.actions {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 16px 24px;
	}
	.mail {
		font-weight: 700;
		color: #fff;
		border-bottom: 1px solid rgba(255, 255, 255, 0.5);
	}
	.pager {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 16px;
		padding-block: clamp(32px, 4vw, 56px);
	}
	.pager a {
		display: grid;
		gap: 4px;
		padding: 20px 22px;
		border: 1px solid var(--line);
		border-radius: var(--r-md);
		transition:
			border-color 0.4s,
			transform 0.4s var(--ease-out);
	}
	.pager a:hover {
		border-color: var(--blue);
		transform: translateY(-3px);
	}
	.pager small {
		font-size: 12px;
		font-weight: 700;
		letter-spacing: 0.1em;
		color: var(--blue);
	}
	.pager span {
		font-weight: 700;
		line-height: 1.6;
		color: var(--ink);
	}
	.next {
		text-align: right;
	}
	@media (max-width: 900px) {
		.top-grid,
		.body {
			grid-template-columns: minmax(0, 1fr);
		}
		.facts {
			position: static;
		}
		.partner dl {
			grid-template-columns: minmax(0, 1fr);
			gap: 14px;
		}
		.visual {
			aspect-ratio: 16 / 10;
		}
	}
	@media (max-width: 560px) {
		.pager {
			grid-template-columns: minmax(0, 1fr);
		}
		.next {
			text-align: left;
		}
	}
</style>
