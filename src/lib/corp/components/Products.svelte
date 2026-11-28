<script lang="ts">
	import { products, productsSection } from '$lib/corp/content';
	import { reveal } from '$lib/corp/motion';
</script>

<!-- eslint-disable svelte/no-navigation-without-resolve -- Served from the domain root; links are fixed paths. -->
<section class="products cv" aria-labelledby="products-title">
	<div class="container head" data-reveal use:reveal>
		<h3 id="products-title" class="display">{productsSection.title}</h3>
		<span class="lane-rule" aria-hidden="true"></span>
	</div>
	<div class="viewport" data-reveal use:reveal>
		{#each [0, 1] as copy (copy)}
			<ul class="track" aria-hidden={copy === 1}>
				{#each products as product (product.id)}
					<li>
						<a
							class="card"
							href={product.url}
							target="_blank"
							rel="noopener noreferrer"
							tabindex={copy === 1 ? -1 : undefined}
						>
							<span class="shot" style="--bg:{product.color}">
								<img
									src={product.image.src}
									width={product.image.width}
									height={product.image.height}
									alt=""
									loading="lazy"
									decoding="async"
								/>
							</span>
							<span class="meta">
								<span class="tagline">{product.tag}</span>
								<span class="name">{product.name}</span>
								<span class="text">{product.description}</span>
								<span class="go">
									{productsSection.link}
									<svg class="arr" viewBox="0 0 24 24" aria-hidden="true"
										><path d="M6 18 18 6M8 6h10v10" /></svg
									>
								</span>
							</span>
						</a>
					</li>
				{/each}
			</ul>
		{/each}
	</div>
</section>

<style>
	.products {
		padding-bottom: clamp(88px, 11vw, 160px);
	}
	.head {
		display: flex;
		align-items: center;
		gap: 20px;
	}
	.head h3 {
		font-size: clamp(22px, 2.4vw, 32px);
	}
	.viewport {
		display: flex;
		gap: 20px;
		margin-top: 28px;
		overflow: hidden;
		padding-block: 12px 28px;
		-webkit-mask-image: linear-gradient(90deg, transparent, #000 5%, #000 95%, transparent);
		mask-image: linear-gradient(90deg, transparent, #000 5%, #000 95%, transparent);
	}
	.track {
		display: flex;
		flex: none;
		gap: 20px;
		animation: products-run 64s linear infinite;
	}
	.viewport:hover .track,
	.viewport:focus-within .track {
		animation-play-state: paused;
	}
	.card {
		display: grid;
		grid-template-rows: auto 1fr;
		width: clamp(264px, 26vw, 348px);
		height: 100%;
		border: 1px solid var(--line);
		border-radius: var(--r-md);
		background: #fff;
		overflow: hidden;
		transition:
			transform 0.5s var(--ease-out),
			border-color 0.5s var(--ease-out),
			box-shadow 0.5s var(--ease-out);
	}
	.card:hover,
	.card:focus-visible {
		transform: translateY(-8px);
		border-color: rgba(50, 107, 227, 0.55);
		box-shadow: 0 28px 44px -30px rgba(34, 84, 196, 0.6);
	}
	.shot {
		display: block;
		aspect-ratio: 1200 / 630;
		overflow: hidden;
		background: var(--bg, var(--pale));
	}
	.shot img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		transition: transform 0.9s var(--ease-out);
	}
	.card:hover .shot img {
		transform: scale(1.05);
	}
	.meta {
		display: grid;
		align-content: start;
		gap: 6px;
		padding: 18px 20px 20px;
	}
	.tagline {
		font-size: 12px;
		font-weight: 700;
		letter-spacing: 0.08em;
		color: var(--blue);
	}
	.name {
		font-size: 19px;
		font-weight: 800;
		line-height: 1.4;
		color: var(--ink);
	}
	.text {
		font-size: 14px;
		line-height: 1.75;
	}
	.go {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		margin-top: 6px;
		font-size: 13px;
		font-weight: 700;
		color: var(--ink);
	}
	.go .arr {
		width: 15px;
		height: 15px;
		transition: transform 0.4s var(--ease-out);
	}
	.card:hover .go .arr {
		transform: translate(3px, -3px);
	}
	@keyframes products-run {
		to {
			transform: translate3d(calc(-100% - 20px), 0, 0);
		}
	}
	@media (prefers-reduced-motion: reduce) {
		.viewport {
			overflow-x: auto;
			padding-inline: var(--pad);
			-webkit-mask-image: none;
			mask-image: none;
		}
		.track {
			animation: none;
		}
		.track[aria-hidden='true'] {
			display: none;
		}
	}
</style>
