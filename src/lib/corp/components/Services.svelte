<script lang="ts">
	import { services } from '$lib/corp/content';
	import { contactSubject, parallax, reveal } from '$lib/corp/motion';
	import SectionHead from './SectionHead.svelte';
</script>

<!-- eslint-disable svelte/no-navigation-without-resolve -- Served from the domain root; links are fixed paths. -->
<section class="section services cv" id="services" aria-labelledby="services-title">
	<div class="container grid">
		<div class="side">
			<SectionHead
				id="services-title"
				eyebrow={services.eyebrow}
				lines={services.lines}
				lead={services.lead}
			/>
			<div class="art" use:parallax={40} data-reveal use:reveal>
				<img
					src="/corporate/sections/01-delegate.webp"
					width="1600"
					height="1067"
					alt=""
					loading="lazy"
					decoding="async"
				/>
			</div>
		</div>
		<div class="list">
			{#each services.items as item, i (item.title)}
				<div class="cell" data-reveal use:reveal style="--d:{(i % 2) * 110}ms">
					<article class="card">
						<p class="en"><span>{String(i + 1).padStart(2, '0')}</span>{item.en}</p>
						<h3>{item.title}</h3>
						<p class="text">{item.text}</p>
						<ul>
							{#each item.points as point (point)}
								<li>{point}</li>
							{/each}
						</ul>
						<a class="link" href="/#contact" onclick={() => contactSubject.set(item.title)}>
							{item.cta}
							<svg class="arr" viewBox="0 0 24 24" aria-hidden="true"
								><path d="M4 12h15M13 6l6 6-6 6" /></svg
							>
						</a>
					</article>
				</div>
			{/each}
			<div class="related" data-reveal use:reveal>
				<p>{services.relatedLabel}</p>
				{#each services.related as item (item.href)}
					<a href={item.href} target="_blank" rel="noopener noreferrer">
						<span><b>{item.name}</b><small>{item.text}</small></span>
						<svg class="arr" viewBox="0 0 24 24" aria-hidden="true"
							><path d="M6 18 18 6M8 6h10v10" /></svg
						>
					</a>
				{/each}
			</div>
		</div>
	</div>
</section>

<style>
	.services {
		background: var(--pale);
	}
	.grid {
		display: grid;
		grid-template-columns: minmax(0, 0.8fr) minmax(0, 1.2fr);
		gap: clamp(32px, 6vw, 96px);
		align-items: start;
	}
	.side {
		position: sticky;
		top: calc(var(--header-h) + 32px);
	}
	.art {
		margin-top: 40px;
		overflow: hidden;
		border-radius: var(--r-lg);
		aspect-ratio: 3 / 2;
	}
	.art img {
		width: 100%;
		height: 116%;
		object-fit: cover;
		transform: translate3d(0, calc(-6% + var(--py, 0px)), 0);
	}
	.list {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 20px;
	}
	.card {
		position: relative;
		display: flex;
		flex-direction: column;
		padding: 28px 26px 24px;
		border: 1px solid var(--line);
		border-radius: var(--r-md);
		background: #fff;
		overflow: hidden;
		height: 100%;
		transition:
			box-shadow 0.5s var(--ease-out),
			border-color 0.5s var(--ease-out);
	}
	.card::before {
		content: '';
		position: absolute;
		inset: 0 0 auto;
		height: 3px;
		background: linear-gradient(90deg, var(--blue), #7fa8ff);
		transform: scaleX(0);
		transform-origin: 0 50%;
		transition: transform 0.7s var(--ease-out);
	}
	.card:hover,
	.card:focus-within {
		border-color: rgba(50, 107, 227, 0.5);
		box-shadow: 0 30px 50px -36px rgba(34, 84, 196, 0.55);
	}
	.card:hover::before,
	.card:focus-within::before {
		transform: none;
	}
	.en {
		display: flex;
		align-items: center;
		gap: 12px;
		font-size: 12px;
		font-weight: 700;
		letter-spacing: 0.14em;
		color: var(--muted);
	}
	.en span {
		color: var(--blue);
		font-weight: 800;
	}
	h3 {
		margin-top: 12px;
		font-family: var(--font-sans);
		font-size: clamp(20px, 1.7vw, 24px);
		font-weight: 800;
		line-height: 1.5;
		color: var(--ink);
	}
	.text {
		margin-top: 10px;
		font-size: 15px;
		line-height: 1.85;
	}
	ul {
		display: grid;
		gap: 6px;
		margin-top: 16px;
		padding-top: 16px;
		border-top: 1px solid var(--line);
	}
	li {
		position: relative;
		padding-left: 22px;
		font-size: 14px;
		font-weight: 600;
		line-height: 1.7;
		color: var(--ink);
	}
	li::before {
		content: '';
		position: absolute;
		left: 0;
		top: 0.82em;
		width: 12px;
		height: 2px;
		border-radius: 2px;
		background: var(--blue);
	}
	.link {
		display: inline-flex;
		align-items: center;
		gap: 10px;
		margin-top: auto;
		padding-top: 20px;
		font-size: 14px;
		font-weight: 700;
		color: var(--blue-ink);
	}
	.arr {
		width: 16px;
		height: 16px;
		transition: transform 0.4s var(--ease-out);
	}
	.link:hover .arr {
		transform: translateX(5px);
	}
	.related {
		grid-column: 1 / -1;
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 12px 16px;
		margin-top: 12px;
	}
	.related p {
		font-size: 13px;
		font-weight: 700;
		letter-spacing: 0.1em;
		color: var(--muted);
	}
	.related a {
		display: inline-flex;
		align-items: center;
		gap: 16px;
		padding: 12px 18px;
		border: 1px solid var(--line);
		border-radius: 14px;
		background: #fff;
		color: var(--ink);
		transition:
			border-color 0.4s,
			transform 0.4s var(--ease-out);
	}
	.related a:hover {
		border-color: var(--blue);
		transform: translateY(-3px);
	}
	.related b {
		display: block;
		font-size: 15px;
		line-height: 1.4;
	}
	.related small {
		display: block;
		font-size: 12px;
		color: var(--muted);
		line-height: 1.5;
	}
	.related a:hover .arr {
		transform: translate(3px, -3px);
	}
	@media (max-width: 1000px) {
		.grid {
			grid-template-columns: 1fr;
		}
		.side {
			position: static;
		}
		.art {
			display: none;
		}
	}
	@media (max-width: 620px) {
		.list {
			grid-template-columns: 1fr;
		}
	}
</style>
