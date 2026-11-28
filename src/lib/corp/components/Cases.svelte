<script lang="ts">
	import { onMount } from 'svelte';
	import { cases, casesSection } from '$lib/corp/content';
	import { clamp, parallax, reducedMotion, reveal, whileVisible } from '$lib/corp/motion';
	import CaseArt from './CaseArt.svelte';
	import SectionHead from './SectionHead.svelte';

	const featured = cases.filter((item) => item.featured);
	const others = cases.filter((item) => !item.featured);
	const metaOf = (item: (typeof cases)[number], key: string) =>
		item.meta.find((row) => row.k === key)?.v ?? '';
	const resultOf = (item: (typeof cases)[number]) =>
		item.sections[item.sections.length - 1].items.slice(0, 2);

	let stack: HTMLElement | undefined = $state();
	let stacked = $state(false);

	onMount(() => {
		if (reducedMotion() || !stack) return;
		const query = matchMedia('(min-width: 1024px) and (min-height: 700px)');
		const cards = Array.from(stack.querySelectorAll<HTMLElement>('.case'));
		const measure = () => {
			const room = innerHeight - 72 - 20 - cards.length * 14 - 24;
			stacked =
				query.matches &&
				cards.every((card) => (card.firstElementChild as HTMLElement).offsetHeight <= room);
		};
		let measured = false;
		const remeasure = () => {
			if (measured) measure();
		};
		addEventListener('resize', remeasure, { passive: true });
		const tilt = (event: PointerEvent) => {
			const card = (event.target as HTMLElement).closest<HTMLElement>('.case');
			if (!card || event.pointerType !== 'mouse') return;
			const rect = card.getBoundingClientRect();
			card.style.setProperty('--tx', ((event.clientX - rect.left) / rect.width - 0.5).toFixed(3));
			card.style.setProperty('--ty', ((event.clientY - rect.top) / rect.height - 0.5).toFixed(3));
		};
		const rest = (event: PointerEvent) => {
			const card = (event.target as HTMLElement).closest<HTMLElement>('.case');
			card?.style.setProperty('--tx', '0');
			card?.style.setProperty('--ty', '0');
		};
		const list = stack;
		list.addEventListener('pointermove', tilt, { passive: true });
		list.addEventListener('pointerout', rest, { passive: true });
		const stop = whileVisible(list, () => {
			if (!measured) {
				measured = true;
				measure();
			}
			if (!stacked) return;
			for (let i = 0; i < cards.length - 1; i++) {
				const current = cards[i].getBoundingClientRect();
				const next = cards[i + 1].getBoundingClientRect();
				if (current.bottom < -200 || current.top > innerHeight + 200) continue;
				const cover = clamp(1 - (next.top - current.top) / current.height);
				cards[i].style.setProperty('--cover', cover.toFixed(3));
			}
		});
		return () => {
			stop();
			removeEventListener('resize', remeasure);
			list.removeEventListener('pointermove', tilt);
			list.removeEventListener('pointerout', rest);
		};
	});
</script>

<!-- eslint-disable svelte/no-navigation-without-resolve -- Served from the domain root; links are fixed paths. -->
<section class="section cases cv" id="cases" aria-labelledby="cases-title">
	<span id="works" class="anchor"></span>
	<span id="products" class="anchor"></span>
	<div class="container">
		<div class="top">
			<SectionHead
				id="cases-title"
				eyebrow={casesSection.eyebrow}
				lines={casesSection.lines}
				lead={casesSection.lead}
			/>
			<div class="top-art" use:parallax={36} data-reveal use:reveal>
				<img
					src="/corporate/sections/03-cases.webp"
					width="1600"
					height="1067"
					alt=""
					loading="lazy"
					decoding="async"
				/>
			</div>
		</div>

		<ol class="stack" class:stacked bind:this={stack}>
			{#each featured as item, i (item.slug)}
				<li class="case" style="--i:{i}">
					<article class="case-in">
						<div class="visual">
							<CaseArt slug={item.slug} index={i} chips={item.tech} />
						</div>
						<div class="body">
							<p class="kicker">
								<span class="no">CASE {String(i + 1).padStart(2, '0')}</span>
								{#if item.label}<span class="tag">{item.label}</span>{/if}
								{#if metaOf(item, '業種')}<span class="tag plain">{metaOf(item, '業種')}</span>{/if}
							</p>
							<h3>
								<a href="/cases/{item.slug}">{item.title}</a>
							</h3>
							<p class="summary">{item.summary}</p>
							<dl class="facts">
								{#each ['期間', '体制', '担当範囲'] as key (key)}
									{#if metaOf(item, key)}
										<div>
											<dt>{key}</dt>
											<dd>{metaOf(item, key)}</dd>
										</div>
									{/if}
								{/each}
							</dl>
							<ul class="results">
								{#each resultOf(item) as line (line)}
									<li>{line}</li>
								{/each}
							</ul>
							<div class="foot">
								<ul class="tech">
									{#each item.tech.slice(0, 5) as tech (tech)}
										<li class="chip">{tech}</li>
									{/each}
									{#if item.tech.length > 5}
										<li class="chip more">+{item.tech.length - 5}</li>
									{/if}
								</ul>
								<span class="read" aria-hidden="true">
									{casesSection.read}
									<svg class="arr" viewBox="0 0 24 24"><path d="M4 12h15M13 6l6 6-6 6" /></svg>
								</span>
							</div>
						</div>
					</article>
				</li>
			{/each}
		</ol>

		<div class="others">
			<h3 class="others-title" data-reveal use:reveal>{casesSection.more}</h3>
			<ul>
				{#each others as item, i (item.slug)}
					<li data-reveal use:reveal style="--d:{i * 90}ms">
						<a class="row" href="/cases/{item.slug}">
							<img
								class="row-thumb"
								src="/corporate/cases/{item.slug}-800.webp"
								width="800"
								height="600"
								alt=""
								loading="lazy"
								decoding="async"
							/>
							<span class="row-no">{String(featured.length + i + 1).padStart(2, '0')}</span>
							<span class="row-main">
								<span class="row-title">{item.title}</span>
								<span class="row-sub">{metaOf(item, '期間')}／{metaOf(item, '担当範囲')}</span>
							</span>
							<span class="row-tag">
								{#if item.label}<span class="tag">{item.label}</span>{/if}
							</span>
							<span class="row-go" aria-hidden="true">
								<svg class="arr" viewBox="0 0 24 24"><path d="M4 12h15M13 6l6 6-6 6" /></svg>
							</span>
						</a>
					</li>
				{/each}
			</ul>
			<p class="note" data-reveal use:reveal>{casesSection.note}</p>
		</div>
	</div>
</section>

<style>
	.cases {
		padding-bottom: clamp(56px, 7vw, 96px);
	}
	.anchor {
		position: absolute;
		top: 0;
	}
	.top {
		display: grid;
		grid-template-columns: minmax(0, 1fr) minmax(0, 0.8fr);
		gap: clamp(24px, 5vw, 80px);
		align-items: end;
	}
	.top-art {
		overflow: hidden;
		border-radius: var(--r-lg);
		aspect-ratio: 16 / 9;
		background: var(--pale);
	}
	.top-art img {
		width: 100%;
		height: 118%;
		object-fit: cover;
		transform: translate3d(0, calc(-7% + var(--py, 0px)), 0);
	}
	.stack {
		margin-top: clamp(48px, 6vw, 88px);
		display: grid;
		gap: 28px;
	}
	.case-in {
		position: relative;
		display: grid;
		grid-template-columns: minmax(0, 0.82fr) minmax(0, 1fr);
		gap: clamp(20px, 3vw, 48px);
		padding: clamp(16px, 2vw, 28px);
		border: 1px solid var(--line);
		border-radius: var(--r-lg);
		background: #fff;
		box-shadow: 0 30px 60px -44px rgba(17, 41, 64, 0.45);
		transition:
			border-color 0.5s var(--ease-out),
			box-shadow 0.5s var(--ease-out);
	}
	.case-in::after {
		content: '';
		position: absolute;
		inset: 0;
		border-radius: inherit;
		background: var(--navy);
		opacity: calc(var(--cover, 0) * 0.28);
		pointer-events: none;
	}
	.case:hover .case-in,
	.case:focus-within .case-in {
		border-color: rgba(50, 107, 227, 0.55);
		box-shadow: 0 40px 70px -40px rgba(34, 84, 196, 0.55);
	}
	.visual {
		min-height: 260px;
		transform: perspective(1000px) rotateY(calc(var(--tx, 0) * 5deg))
			rotateX(calc(var(--ty, 0) * -4deg));
		transition: transform 0.6s var(--ease-out);
	}
	.row-tag {
		min-width: 5em;
		text-align: right;
	}
	.body {
		display: flex;
		flex-direction: column;
		padding: clamp(4px, 1vw, 16px) clamp(0px, 1vw, 12px) 4px 0;
	}
	.kicker {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 10px;
	}
	.no {
		font-size: 13px;
		font-weight: 800;
		letter-spacing: 0.16em;
		color: var(--blue);
	}
	.tag.plain {
		background: var(--pale);
		color: var(--navy-2);
	}
	h3 {
		margin-top: 12px;
		font-family: var(--font-sans);
		word-break: auto-phrase;
		font-size: clamp(21px, 2.1vw, 30px);
		font-weight: 800;
		line-height: 1.45;
		color: var(--ink);
	}
	h3 a::after {
		content: '';
		position: absolute;
		inset: 0;
		z-index: 1;
		border-radius: var(--r-lg);
	}
	.summary {
		margin-top: 10px;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		line-clamp: 2;
		overflow: hidden;
	}
	.facts {
		display: grid;
		gap: 0;
		margin-top: 16px;
		border-top: 1px solid var(--line);
	}
	.facts div {
		display: grid;
		grid-template-columns: 5.5em minmax(0, 1fr);
		gap: 12px;
		padding: 9px 0;
		border-bottom: 1px solid var(--line);
		font-size: 14px;
		line-height: 1.7;
	}
	.facts dt {
		font-weight: 700;
		color: var(--muted);
	}
	.facts dd {
		color: var(--ink);
		font-weight: 600;
	}
	.results {
		display: grid;
		gap: 6px;
		margin-top: 14px;
	}
	.results li {
		position: relative;
		padding-left: 26px;
		font-size: 15px;
		line-height: 1.75;
		color: var(--ink);
	}
	.results li::before {
		content: '';
		position: absolute;
		left: 2px;
		top: 0.86em;
		width: 14px;
		height: 2px;
		border-radius: 2px;
		background: var(--blue);
	}
	.foot {
		display: flex;
		align-items: flex-end;
		justify-content: space-between;
		gap: 16px;
		margin-top: auto;
		padding-top: 18px;
	}
	.tech {
		display: flex;
		flex-wrap: wrap;
		gap: 6px;
	}
	.chip.more {
		background: var(--pale);
		border-color: transparent;
		color: var(--muted);
	}
	.read {
		display: inline-flex;
		align-items: center;
		gap: 10px;
		flex: none;
		min-height: 44px;
		padding: 0 18px;
		border-radius: 999px;
		background: var(--ink);
		color: #fff;
		font-size: 14px;
		font-weight: 700;
		transition: background-color 0.4s var(--ease-out);
	}
	.read .arr,
	.row-go .arr {
		width: 16px;
		height: 16px;
		transition: transform 0.4s var(--ease-out);
	}
	.case:hover .read,
	.case:focus-within .read {
		background: var(--blue);
	}
	.case:hover .read .arr {
		transform: translateX(5px);
	}

	/* Desktop: each card sticks and the next one slides over it. */
	.stack.stacked {
		gap: 0;
	}
	.stacked .case {
		position: sticky;
		top: calc(var(--header-h) + 20px + var(--i) * 14px);
		padding-bottom: 40px;
	}
	.stacked .case-in {
		transform: scale(calc(1 - var(--cover, 0) * 0.045));
		transform-origin: 50% 0;
		will-change: transform;
	}

	.others {
		margin-top: clamp(40px, 5vw, 72px);
	}
	.others-title {
		margin: 0;
		font-size: 15px;
		letter-spacing: 0.12em;
		color: var(--muted);
		font-family: var(--font-sans);
	}
	.others ul {
		margin-top: 14px;
		border-top: 1px solid var(--line);
	}
	.row {
		position: relative;
		display: grid;
		grid-template-columns: auto auto minmax(0, 1fr) auto auto;
		align-items: center;
		gap: clamp(14px, 2.4vw, 32px);
		padding: 22px clamp(4px, 1.2vw, 20px);
		border-bottom: 1px solid var(--line);
		overflow: hidden;
		isolation: isolate;
		transition: color 0.45s var(--ease-out);
	}
	.row::before {
		content: '';
		position: absolute;
		inset: 0;
		z-index: -1;
		background: var(--ink);
		transform: scaleY(0);
		transform-origin: 50% 100%;
		transition: transform 0.55s var(--ease-out);
	}
	.row:hover::before,
	.row:focus-visible::before {
		transform: none;
	}
	.row:hover,
	.row:focus-visible {
		color: #fff;
	}
	.row-thumb {
		width: 104px;
		height: 78px;
		border-radius: 12px;
		object-fit: cover;
		background: var(--pale);
		transition: scale 0.6s var(--ease-out);
	}
	.row:hover .row-thumb,
	.row:focus-visible .row-thumb {
		scale: 1.06;
	}
	.row-no {
		font-size: 13px;
		font-weight: 800;
		letter-spacing: 0.14em;
		color: var(--blue);
	}
	.row:hover .row-no,
	.row:focus-visible .row-no {
		color: #9fc0ff;
	}
	.row-main {
		display: grid;
		gap: 2px;
	}
	.row-title {
		font-family: var(--font-sans);
		font-size: clamp(17px, 1.7vw, 22px);
		font-weight: 800;
		line-height: 1.5;
		color: var(--ink);
		transition: color 0.45s var(--ease-out);
	}
	.row:hover .row-title,
	.row:focus-visible .row-title {
		color: #fff;
	}
	.row-sub {
		font-size: 14px;
		line-height: 1.6;
		color: var(--muted);
	}
	.row:hover .row-sub,
	.row:focus-visible .row-sub {
		color: rgba(255, 255, 255, 0.7);
	}
	.row-go {
		display: grid;
		place-items: center;
		width: 44px;
		height: 44px;
		border: 1px solid var(--line);
		border-radius: 50%;
	}
	.row:hover .row-go .arr {
		transform: translateX(3px);
	}
	.note {
		margin-top: 16px;
		font-size: 13px;
		color: var(--muted);
	}

	@media (max-width: 900px) {
		.top {
			grid-template-columns: 1fr;
		}
		.top-art {
			display: none;
		}
		.case-in {
			grid-template-columns: 1fr;
		}
		.visual {
			min-height: 0;
			aspect-ratio: 16 / 11;
		}
		.body {
			padding: 0 4px 6px;
		}
		.foot {
			flex-direction: column;
			align-items: stretch;
		}
		.read {
			justify-content: center;
		}
		.row {
			grid-template-columns: auto minmax(0, 1fr) auto;
		}
		.row-thumb {
			width: 72px;
			height: 54px;
		}
		.row-no {
			display: none;
		}
		.row-tag {
			display: none;
		}
	}
</style>
