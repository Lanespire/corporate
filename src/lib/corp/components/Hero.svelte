<script lang="ts">
	import { onMount } from 'svelte';
	import { hero } from '$lib/corp/content';
	import { clamp, onFrame, reducedMotion } from '$lib/corp/motion';

	type Connection = { saveData?: boolean; effectiveType?: string };
	const STORE_KEY = 'ls-hero-motion';

	let root: HTMLElement | undefined = $state();
	let video: HTMLVideoElement | undefined = $state();
	let available = $state(false);
	let playing = $state(false);
	let shown = $state(false);
	let wanted = true;
	let visible = true;
	let started = false;

	function remember(value: string) {
		try {
			localStorage.setItem(STORE_KEY, value);
		} catch {
			// Storage can be unavailable; the choice then lasts for this view only.
		}
	}

	async function play() {
		if (!video) return;
		if (!video.src) {
			const name = matchMedia('(max-aspect-ratio: 4/5)').matches ? 'loop-m' : 'loop';
			const type = video.canPlayType('video/mp4; codecs="avc1.42E01E"') ? 'mp4' : 'webm';
			video.src = `/corporate/hero/${name}.${type}`;
		}
		try {
			await video.play();
			playing = true;
		} catch {
			playing = false;
		}
	}

	function toggle() {
		if (!video) return;
		if (playing) {
			video.pause();
			playing = false;
			wanted = false;
			remember('off');
		} else {
			wanted = true;
			remember('on');
			play();
		}
	}

	onMount(() => {
		const connection = (navigator as Navigator & { connection?: Connection }).connection;
		const saver = !!connection?.saveData || /2g/.test(connection?.effectiveType ?? '');
		if (reducedMotion() || saver) return;
		available = true;
		try {
			wanted = localStorage.getItem(STORE_KEY) !== 'off';
		} catch {
			wanted = true;
		}
		const start = () => {
			started = true;
			if (wanted && visible) play();
		};
		const idle = () => setTimeout(start, 250);
		if (document.readyState === 'complete') idle();
		else addEventListener('load', idle, { once: true });

		const stop = onFrame(() => {
			if (!root) return;
			const height = root.offsetHeight || 1;
			const progress = clamp(scrollY / height);
			root.style.setProperty('--hp', progress.toFixed(3));
			const nowVisible = progress < 0.98;
			if (nowVisible === visible) return;
			visible = nowVisible;
			if (!visible) video?.pause();
			else if (wanted && started) play();
		});
		let targetX = 0;
		let targetY = 0;
		let currentX = 0;
		let currentY = 0;
		let frame = 0;
		const ease = () => {
			currentX += (targetX - currentX) * 0.06;
			currentY += (targetY - currentY) * 0.06;
			root?.style.setProperty('--mx', currentX.toFixed(3));
			root?.style.setProperty('--my', currentY.toFixed(3));
			const moving = Math.abs(targetX - currentX) + Math.abs(targetY - currentY) > 0.002;
			frame = moving ? requestAnimationFrame(ease) : 0;
		};
		const follow = (event: PointerEvent) => {
			if (event.pointerType !== 'mouse') return;
			targetX = event.clientX / innerWidth - 0.5;
			targetY = event.clientY / innerHeight - 0.5;
			if (!frame) frame = requestAnimationFrame(ease);
		};
		const element = root;
		element?.addEventListener('pointermove', follow, { passive: true });
		return () => {
			stop();
			removeEventListener('load', idle);
			element?.removeEventListener('pointermove', follow);
			cancelAnimationFrame(frame);
		};
	});
</script>

<!-- eslint-disable svelte/no-navigation-without-resolve -- Served from the domain root; links are fixed paths. -->
<section class="hero" aria-labelledby="hero-title" bind:this={root}>
	<div class="media" aria-hidden="true">
		<div class="media-in">
			<picture>
				<source
					media="(max-aspect-ratio: 4/5)"
					srcset="/corporate/hero/poster-m.webp 556w, /corporate/hero/still-m.webp 780w"
					sizes="100vw"
				/>
				<img
					src="/corporate/hero/poster.webp"
					srcset="/corporate/hero/poster.webp 1280w, /corporate/hero/still.webp 1920w"
					sizes="100vw"
					width="1280"
					height="720"
					alt=""
					fetchpriority="high"
					decoding="async"
				/>
			</picture>
			<video
				bind:this={video}
				class:shown
				muted
				loop
				playsinline
				preload="none"
				tabindex="-1"
				onplaying={() => (shown = true)}
			></video>
		</div>
	</div>

	<div class="container inner">
		<div class="copy">
			<p class="eyebrow">{hero.eyebrow}</p>
			<h1 class="display" id="hero-title">
				{#each hero.lines as line, i (line)}
					<span class="ln"><span class="ln-i" style="--i:{i}">{line}</span></span>
				{/each}
			</h1>
			<span class="lane-rule" aria-hidden="true"></span>
			<p class="lead">
				{#each hero.lead as part (part)}<span>{part}</span>{/each}
			</p>
			<div class="actions">
				<a class="btn btn-primary" href={hero.primary.href}>
					{hero.primary.label}
					<svg class="arr" viewBox="0 0 24 24" aria-hidden="true"
						><path d="M4 12h15M13 6l6 6-6 6" /></svg
					>
				</a>
				<a class="btn btn-ghost" href={hero.secondary.href}>{hero.secondary.label}</a>
			</div>
			<div class="scope">
				<p class="scope-label">{hero.scopeLabel}</p>
				<div class="scope-window">
					<ul class="scope-list">
						{#each hero.scope as item, i (item)}
							<li class="chip" style="--i:{i}">{item}</li>
						{/each}
					</ul>
					<ul class="scope-list clone" aria-hidden="true">
						{#each hero.scope as item (item)}
							<li class="chip">{item}</li>
						{/each}
					</ul>
				</div>
			</div>
		</div>
	</div>

	{#if available}
		<button class="motion" type="button" aria-pressed={playing} onclick={toggle}>
			<svg viewBox="0 0 24 24" aria-hidden="true">
				{#if playing}
					<path d="M8 6v12M16 6v12" />
				{:else}
					<path d="M8 5.5v13l11-6.5z" />
				{/if}
			</svg>
			{playing ? '背景の動きを止める' : '背景の動きを再生する'}
		</button>
	{/if}
	<a class="cue" href={hero.primary.href} aria-hidden="true" tabindex="-1"><span>SCROLL</span></a>
</section>

<style>
	.hero {
		position: relative;
		background: #fff;
		padding-top: var(--header-h);
	}
	.media {
		position: relative;
		overflow: hidden;
		background: #fff;
	}
	.media-in,
	.media picture {
		display: block;
		width: 100%;
		height: 100%;
	}
	.media-in {
		position: relative;
	}
	.media img,
	.media video {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
	.media video {
		position: absolute;
		inset: 0;
		opacity: 0;
		transition: opacity 0.6s linear;
	}
	.media video.shown {
		opacity: 1;
	}
	.copy {
		position: relative;
	}
	.eyebrow {
		animation: corp-fade-up 0.8s var(--ease-out) 0.05s both;
	}
	.eyebrow::before {
		animation: corp-grow-x 0.9s var(--ease-out) 0.2s both;
	}
	h1 {
		margin-top: 18px;
		font-size: clamp(26px, 7.8vw, 44px);
		line-height: 1.34;
	}
	h1 .ln-i {
		animation: corp-line-up 0.95s var(--ease-out) both;
		animation-delay: calc(0.1s + var(--i) * 0.11s);
	}
	.lane-rule {
		margin-top: 22px;
		animation: corp-grow-x 1s var(--ease-out) 0.5s both;
	}
	.lead {
		margin-top: 22px;
		max-width: 34em;
		animation: corp-fade-up 0.9s var(--ease-out) 0.42s both;
	}
	.actions {
		display: flex;
		flex-wrap: wrap;
		gap: 12px;
		margin-top: 28px;
		animation: corp-fade-up 0.9s var(--ease-out) 0.54s both;
	}
	.scope {
		margin-top: 30px;
		animation: corp-fade-up 0.9s var(--ease-out) 0.66s both;
	}
	.scope-label {
		font-size: 12px;
		font-weight: 700;
		letter-spacing: 0.12em;
		color: var(--muted);
	}
	.scope-window {
		display: flex;
		gap: 8px;
		margin-top: 8px;
	}
	.scope-list {
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
	}
	.scope-list.clone {
		display: none;
	}
	.chip {
		background: rgba(255, 255, 255, 0.9);
	}
	.motion {
		position: absolute;
		right: var(--pad);
		bottom: 22px;
		z-index: 3;
		display: inline-flex;
		align-items: center;
		gap: 8px;
		min-height: 40px;
		padding: 0 14px 0 10px;
		border: 1px solid var(--line);
		border-radius: 999px;
		background: rgba(255, 255, 255, 0.86);
		backdrop-filter: blur(8px);
		-webkit-backdrop-filter: blur(8px);
		font-size: 12px;
		font-weight: 700;
		color: var(--navy-2);
		cursor: pointer;
		transition:
			background-color 0.3s,
			color 0.3s;
	}
	.motion:hover {
		background: var(--ink);
		color: #fff;
	}
	.motion svg {
		width: 18px;
		height: 18px;
		fill: none;
		stroke: currentColor;
		stroke-width: 2.2;
		stroke-linecap: round;
		stroke-linejoin: round;
	}
	.cue {
		display: none;
	}

	/* Portrait screens: copy above, moving picture in its own box below. */
	@media (max-aspect-ratio: 4/5) {
		.hero {
			display: flex;
			flex-direction: column-reverse;
			padding-bottom: 8px;
		}
		.inner {
			padding-top: 28px;
		}
		.media {
			width: min(100%, 52svh);
			aspect-ratio: 556 / 640;
			margin: 8px auto 0;
		}
		.media img,
		.media video {
			object-position: 50% 100%;
		}
		.lead span {
			display: inline;
		}
		.actions .btn {
			flex: 1 1 0;
			min-width: 0;
			padding-inline: 12px;
			font-size: 15px;
		}
		.scope-window {
			overflow: hidden;
			margin-inline: calc(var(--pad) * -1);
			padding-inline: var(--pad);
			-webkit-mask-image: linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent);
			mask-image: linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent);
		}
		.scope-list {
			flex: none;
			flex-wrap: nowrap;
			animation: scope-marquee 22s linear infinite;
		}
		.scope-list.clone {
			display: flex;
		}
		.motion {
			bottom: 14px;
			right: 14px;
		}
	}

	/* Landscape screens: copy over the still side of the picture. */
	@media (min-aspect-ratio: 4/5) {
		.hero {
			min-height: max(600px, 100svh);
			display: grid;
			align-items: center;
			padding-bottom: 56px;
		}
		.media {
			position: absolute;
			inset: 0;
		}
		.media img,
		.media video {
			object-position: 70% 50%;
		}
		.media-in {
			transform: translate3d(calc(var(--mx, 0) * -22px), calc(var(--my, 0) * -14px), 0)
				scale(calc(1.035 + var(--hp, 0) * 0.06));
			transform-origin: 80% 60%;
		}
		.inner {
			position: relative;
			z-index: 2;
		}
		.copy {
			max-width: min(58%, 760px);
			opacity: calc(1 - var(--hp, 0) * 1.6);
			transform: translate3d(0, calc(var(--hp, 0) * -70px), 0);
		}
		h1 {
			font-size: clamp(32px, 4.3vw, 64px);
		}
		.lead span {
			display: block;
		}
		.chip {
			animation: scope-glow 8s var(--ease-io) infinite;
			animation-delay: calc(1.2s + var(--i) * 2s);
		}
		.cue {
			position: absolute;
			left: var(--pad);
			bottom: 26px;
			z-index: 2;
			display: inline-flex;
			align-items: center;
			gap: 12px;
			font-size: 11px;
			font-weight: 700;
			letter-spacing: 0.24em;
			color: var(--muted);
			opacity: calc(1 - var(--hp, 0) * 4);
		}
		.cue::after {
			content: '';
			width: 56px;
			height: 1px;
			background: linear-gradient(90deg, var(--blue) 50%, rgba(50, 107, 227, 0.18) 50%);
			background-size: 200% 100%;
			animation: cue-run 2.4s var(--ease-io) infinite;
		}
	}
	@media (min-aspect-ratio: 4/5) and (min-width: 1024px) and (min-height: 600px) {
		.hero {
			position: sticky;
			top: 0;
			height: 100svh;
			z-index: 0;
		}
	}
	@media (min-aspect-ratio: 4/5) and (max-aspect-ratio: 5/4) {
		.copy {
			max-width: 48%;
		}
	}
	@media (min-aspect-ratio: 5/4) {
		.media img,
		.media video {
			object-position: 62% 50%;
		}
	}
	@media (min-aspect-ratio: 4/3) {
		.media img,
		.media video {
			object-position: 58% 50%;
		}
	}
	@media (min-aspect-ratio: 3/2) {
		.media img,
		.media video {
			object-position: 36% 50%;
		}
	}
	@media (min-aspect-ratio: 16/10) {
		.media img,
		.media video {
			object-position: 0% 50%;
		}
	}

	@keyframes scope-marquee {
		to {
			transform: translate3d(calc(-100% - 8px), 0, 0);
		}
	}
	@keyframes scope-glow {
		0%,
		22%,
		100% {
			border-color: var(--line);
			box-shadow: none;
			color: var(--navy-2);
		}
		6%,
		16% {
			border-color: var(--blue);
			box-shadow: 0 8px 22px -10px rgba(50, 107, 227, 0.75);
			color: var(--blue-ink);
		}
	}
	@keyframes cue-run {
		from {
			background-position: 100% 0;
		}
		to {
			background-position: -100% 0;
		}
	}
	@media (prefers-reduced-motion: reduce) {
		.scope-window {
			overflow: visible;
			-webkit-mask-image: none;
			mask-image: none;
		}
		.scope-list {
			flex: 1;
			flex-wrap: wrap;
			animation: none;
		}
		.scope-list.clone {
			display: none;
		}
		.chip,
		.cue::after {
			animation: none;
		}
		.copy,
		.media-in {
			opacity: 1;
			transform: none;
		}
	}
</style>
