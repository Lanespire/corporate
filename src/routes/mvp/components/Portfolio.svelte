<script lang="ts">
	type Product = {
		slug: string;
		name: string;
		tags: [string, string];
		description: string;
		thumbnail: string;
	};

	const products: Product[] = [
		{
			slug: 'insightlog',
			name: 'Insightlog',
			tags: ['SaaS', 'B2B'],
			description: '営業の感覚をデータに変えるBIサービス。商談ログから自動でKPIが見える。',
			thumbnail: '/mvp/assets/portfolio/insightlog.png'
		},
		{
			slug: 'recruitloop',
			name: 'Recruitloop',
			tags: ['HR Tech', 'AI'],
			description: 'AIで面接評価のばらつきをなくすHRプラットフォーム。',
			thumbnail: '/mvp/assets/portfolio/recruitloop.png'
		},
		{
			slug: 'foodpath',
			name: 'Foodpath',
			tags: ['SaaS', 'Restaurant'],
			description: '飲食店のフロアと予約を一画面で動かすオペレーションSaaS。',
			thumbnail: '/mvp/assets/portfolio/foodpath.png'
		},
		{
			slug: 'studyflow',
			name: 'Studyflow',
			tags: ['EdTech', 'SaaS'],
			description: '動画講座とライブ授業を組み合わせたオンライン学習基盤。',
			thumbnail: '/mvp/assets/portfolio/studyflow.png'
		},
		{
			slug: 'healthkin',
			name: 'Healthkin',
			tags: ['HealthTech', 'Family'],
			description: '離れて暮らす家族の健康を見守るマルチユーザーアプリ。',
			thumbnail: '/mvp/assets/portfolio/healthkin.png'
		},
		{
			slug: 'buildmate',
			name: 'Buildmate',
			tags: ['ConTech', 'Mobile'],
			description: '現場の図面と写真ログを同期させる建設管理ツール。',
			thumbnail: '/mvp/assets/portfolio/buildmate.png'
		},
		{
			slug: 'cashlinq',
			name: 'Cashlinq',
			tags: ['FinTech', 'Dashboard'],
			description: '中小企業の資金ショートを3ヶ月前に予測するAI資金繰りSaaS。',
			thumbnail: '/mvp/assets/portfolio/cashlinq.png'
		}
	];

	let trackEl: HTMLDivElement;

	function scrollByCard(direction: 1 | -1) {
		if (!trackEl) return;
		const card = trackEl.querySelector<HTMLElement>('.portfolio-card');
		const step = card ? card.offsetWidth + 24 : trackEl.clientWidth * 0.8;
		trackEl.scrollBy({ left: step * direction, behavior: 'smooth' });
	}
</script>

<section id="works" class="portfolio" aria-labelledby="portfolio-heading">
	<div class="portfolio__inner">
		<header class="portfolio__head">
			<p class="portfolio__eyebrow">PORTFOLIO</p>
			<h2 id="portfolio-heading" class="portfolio__title">実績・プロダクト事例</h2>
		</header>

		<div class="portfolio__carousel">
			<button
				type="button"
				class="portfolio__nav portfolio__nav--prev"
				on:click={() => scrollByCard(-1)}
				aria-label="前のプロダクトを見る"
			>
				<span aria-hidden="true">←</span>
			</button>

			<div class="portfolio__track" bind:this={trackEl} role="list">
				{#each products as product (product.slug)}
					<article class="portfolio-card" role="listitem">
						<div class="portfolio-card__thumb" data-slug={product.slug}>
							<img
								src={product.thumbnail}
								alt={`${product.name} のサムネイル`}
								loading="lazy"
								on:error={(e) => {
									(e.currentTarget as HTMLImageElement).style.visibility = 'hidden';
								}}
							/>
						</div>
						<div class="portfolio-card__body">
							<h3 class="portfolio-card__name">{product.name}</h3>
							<ul class="portfolio-card__tags">
								{#each product.tags as tag}
									<li>{tag}</li>
								{/each}
							</ul>
							<p class="portfolio-card__desc">{product.description}</p>
						</div>
					</article>
				{/each}
			</div>

			<button
				type="button"
				class="portfolio__nav portfolio__nav--next"
				on:click={() => scrollByCard(1)}
				aria-label="次のプロダクトを見る"
			>
				<span aria-hidden="true">→</span>
			</button>
		</div>
	</div>
</section>

<style>
	.portfolio {
		padding: 96px 0;
		background: #ffffff;
	}

	.portfolio__inner {
		max-width: 1160px;
		margin: 0 auto;
		padding: 0 24px;
	}

	.portfolio__head {
		margin-bottom: 40px;
	}

	.portfolio__eyebrow {
		margin: 0 0 8px;
		font-size: 12px;
		letter-spacing: 0.16em;
		font-weight: 700;
		color: var(--orange, #ff7a1a);
	}

	.portfolio__title {
		margin: 0;
		font-size: clamp(24px, 3vw, 34px);
		font-weight: 800;
		color: var(--ink, #111);
		letter-spacing: 0.01em;
	}

	.portfolio__carousel {
		position: relative;
	}

	.portfolio__track {
		display: grid;
		grid-auto-flow: column;
		grid-auto-columns: minmax(280px, 1fr);
		gap: 24px;
		overflow-x: auto;
		scroll-snap-type: x mandatory;
		scroll-padding: 4px;
		padding: 4px 4px 24px;
		-webkit-overflow-scrolling: touch;
		scrollbar-width: thin;
	}

	@media (min-width: 821px) {
		.portfolio__track {
			grid-auto-columns: calc((100% - 24px * 2) / 3);
		}
	}

	.portfolio__track::-webkit-scrollbar {
		height: 6px;
	}
	.portfolio__track::-webkit-scrollbar-thumb {
		background: var(--line, #dbe5ed);
		border-radius: 999px;
	}

	.portfolio-card {
		scroll-snap-align: start;
		display: flex;
		flex-direction: column;
		background: #ffffff;
		border: 1px solid var(--line, #dbe5ed);
		border-radius: var(--radius-card, 14px);
		overflow: hidden;
		box-shadow: var(--shadow-card, 0 8px 24px rgba(17, 17, 17, 0.08));
		transition: transform 0.2s ease, box-shadow 0.2s ease;
	}
	.portfolio-card:hover {
		transform: translateY(-4px);
		box-shadow: 0 14px 32px rgba(17, 17, 17, 0.12);
	}

	.portfolio-card__thumb {
		position: relative;
		aspect-ratio: 16 / 10;
		overflow: hidden;
		background: linear-gradient(135deg, #ffd9bf 0%, #ffb27a 50%, #1678dc 100%);
	}
	.portfolio-card__thumb[data-slug='insightlog'] {
		background: linear-gradient(135deg, #e6f4ff 0%, #1678dc 100%);
	}
	.portfolio-card__thumb[data-slug='recruitloop'] {
		background: linear-gradient(135deg, #fff1d6 0%, #ff9a4d 100%);
	}
	.portfolio-card__thumb[data-slug='foodpath'] {
		background: linear-gradient(135deg, #fff4e0 0%, #ff7a1a 100%);
	}
	.portfolio-card__thumb[data-slug='studyflow'] {
		background: linear-gradient(135deg, #d8e8ff 0%, #1678dc 100%);
	}
	.portfolio-card__thumb[data-slug='healthkin'] {
		background: linear-gradient(135deg, #ffe2ec 0%, #ff7a8a 50%, #6a3ce0 100%);
	}
	.portfolio-card__thumb[data-slug='buildmate'] {
		background: linear-gradient(135deg, #1f2a44 0%, #1678dc 60%, #ff7a1a 100%);
	}
	.portfolio-card__thumb[data-slug='cashlinq'] {
		background: linear-gradient(135deg, #e8f5e9 0%, #2e7d5c 60%, #1678dc 100%);
	}

	.portfolio-card__thumb img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		display: block;
	}

	.portfolio-card__body {
		padding: 20px 22px 24px;
		display: flex;
		flex-direction: column;
		gap: 10px;
	}

	.portfolio-card__name {
		margin: 0;
		font-size: 18px;
		font-weight: 800;
		color: var(--ink, #111);
	}

	.portfolio-card__tags {
		display: flex;
		flex-wrap: wrap;
		gap: 6px;
		padding: 0;
		margin: 0;
		list-style: none;
	}
	.portfolio-card__tags li {
		font-size: 11px;
		font-weight: 700;
		letter-spacing: 0.04em;
		color: #4a5867;
		background: var(--soft, #f5f8fb);
		border: 1px solid var(--line, #dbe5ed);
		padding: 4px 10px;
		border-radius: 999px;
	}

	.portfolio-card__desc {
		margin: 0;
		font-size: 13px;
		line-height: 1.7;
		color: #4a5867;
	}

	.portfolio__nav {
		position: absolute;
		top: 38%;
		width: 44px;
		height: 44px;
		border-radius: 50%;
		border: 1px solid var(--line, #dbe5ed);
		background: #ffffff;
		color: var(--ink, #111);
		font-size: 18px;
		display: grid;
		place-items: center;
		cursor: pointer;
		box-shadow: 0 6px 18px rgba(17, 17, 17, 0.08);
		transition: background 0.15s ease, color 0.15s ease, transform 0.15s ease;
		z-index: 2;
	}
	.portfolio__nav:hover {
		background: var(--ink, #111);
		color: #ffffff;
		transform: translateY(-1px);
	}
	.portfolio__nav--prev {
		left: -22px;
	}
	.portfolio__nav--next {
		right: -22px;
	}

	@media (max-width: 820px) {
		.portfolio {
			padding: 72px 0;
		}
		.portfolio__nav {
			top: auto;
			bottom: -64px;
		}
		.portfolio__nav--prev {
			left: calc(50% - 52px);
		}
		.portfolio__nav--next {
			right: calc(50% - 52px);
		}
		.portfolio__carousel {
			padding-bottom: 64px;
		}
	}
</style>
