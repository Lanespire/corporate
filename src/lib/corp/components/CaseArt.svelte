<script lang="ts">
	type Props = { slug: string; index: number; chips?: string[]; eager?: boolean };
	let { slug, index, chips = [], eager = false }: Props = $props();

	const number = $derived(String(index + 1).padStart(2, '0'));
</script>

<div class="art" aria-hidden="true">
	<img
		src="/corporate/cases/{slug}-800.webp"
		srcset="/corporate/cases/{slug}-800.webp 800w, /corporate/cases/{slug}.webp 1600w"
		sizes="(max-width: 900px) 92vw, 46vw"
		width="1600"
		height="1200"
		alt=""
		loading={eager ? 'eager' : 'lazy'}
		decoding="async"
	/>
	<span class="num">{number}</span>
	<ul class="floats">
		{#each chips.slice(0, 3) as chip, i (chip)}
			<li style="--i:{i}">{chip}</li>
		{/each}
	</ul>
	<span class="sheen"></span>
</div>

<style>
	.art {
		position: relative;
		height: 100%;
		overflow: hidden;
		border-radius: var(--r-md);
		background: #f1f3f8;
		isolation: isolate;
	}
	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		animation: art-breathe 16s var(--ease-io) infinite alternate;
		transition: scale 1.2s var(--ease-out);
	}
	:global(.case:hover) img,
	:global(.case:focus-within) img {
		scale: 1.06;
	}
	.num {
		position: absolute;
		left: 18px;
		top: 16px;
		display: grid;
		place-items: center;
		min-width: 64px;
		padding: 8px 12px;
		border: 1px solid rgba(255, 255, 255, 0.95);
		border-radius: 14px;
		background: linear-gradient(140deg, rgba(255, 255, 255, 0.85), rgba(210, 225, 255, 0.55));
		box-shadow:
			0 18px 30px -18px rgba(34, 84, 196, 0.6),
			inset 0 1px 0 #fff;
		backdrop-filter: blur(6px);
		-webkit-backdrop-filter: blur(6px);
		font-family: var(--font-display);
		font-size: 30px;
		font-weight: 800;
		line-height: 1;
		letter-spacing: -0.02em;
		color: var(--blue-ink);
	}
	.floats li {
		position: absolute;
		padding: 5px 12px;
		border: 1px solid rgba(255, 255, 255, 0.95);
		border-radius: 999px;
		background: rgba(255, 255, 255, 0.8);
		box-shadow: 0 12px 24px -14px rgba(17, 41, 64, 0.5);
		backdrop-filter: blur(6px);
		-webkit-backdrop-filter: blur(6px);
		font-size: 12px;
		font-weight: 700;
		line-height: 1.4;
		color: var(--navy-2);
		white-space: nowrap;
		animation: art-bob 5s var(--ease-io) infinite alternate;
		animation-delay: calc(var(--i) * -1.4s);
	}
	.floats li:nth-child(1) {
		right: 6%;
		top: 9%;
	}
	.floats li:nth-child(2) {
		right: 9%;
		bottom: 9%;
	}
	.floats li:nth-child(3) {
		left: 7%;
		bottom: 13%;
	}
	.sheen {
		position: absolute;
		inset: -20% auto -20% -40%;
		width: 30%;
		background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.75), transparent);
		transform: skewX(-18deg) translateX(0);
		opacity: 0;
	}
	:global(.case:hover) .sheen,
	:global(.case:focus-within) .sheen {
		animation: art-sheen 1.1s var(--ease-out);
	}
	@keyframes art-breathe {
		from {
			transform: scale(1.01);
		}
		to {
			transform: scale(1.07) translate3d(-1%, -1%, 0);
		}
	}
	@keyframes art-bob {
		to {
			translate: 0 -8px;
		}
	}
	@keyframes art-sheen {
		0% {
			opacity: 0;
			transform: skewX(-18deg) translateX(0);
		}
		20% {
			opacity: 1;
		}
		100% {
			opacity: 0;
			transform: skewX(-18deg) translateX(520%);
		}
	}
	@media (prefers-reduced-motion: reduce) {
		img,
		.floats li,
		.sheen {
			animation: none !important;
		}
	}
</style>
