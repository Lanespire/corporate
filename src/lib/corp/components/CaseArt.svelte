<script lang="ts">
	type Props = { slug: string; eager?: boolean };
	let { slug, eager = false }: Props = $props();
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
		.sheen {
			animation: none !important;
		}
	}
</style>
