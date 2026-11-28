<script lang="ts">
	import { onMount } from 'svelte';
	import { approach } from '$lib/corp/content';
	import { clamp, parallax, reducedMotion, reveal, whileVisible } from '$lib/corp/motion';
	import SectionHead from './SectionHead.svelte';

	// Seconds at which the light reaches each dot in the Remotion loop; it goes dark again near 7s.
	const MARKS = [0.9, 1.8, 2.7, 3.6, 4.5];

	let lane: HTMLElement | undefined = $state();
	let film: HTMLVideoElement | undefined = $state();
	let filmMode = $state(false);
	let reached = $state(approach.phases.length);

	onMount(() => {
		if (reducedMotion() || !lane) return;
		const track = lane;
		const total = approach.phases.length;
		const player = film;
		if (player && matchMedia('(min-width: 901px)').matches) {
			let frame = 0;
			const sync = () => {
				const time = player.currentTime;
				reached = time > 6.9 ? 0 : MARKS.filter((mark) => time >= mark).length;
				frame = requestAnimationFrame(sync);
			};
			const start = () => {
				cancelAnimationFrame(frame);
				frame = requestAnimationFrame(sync);
			};
			const pause = () => cancelAnimationFrame(frame);
			const type = player.canPlayType('video/mp4; codecs="avc1.42E01E"') ? 'mp4' : 'webm';
			player.addEventListener('play', start);
			player.addEventListener('pause', pause);
			const watcher = new IntersectionObserver(
				([entry]) => {
					if (!entry.isIntersecting) return player.pause();
					if (!player.src) {
						player.src = `/corporate/process/loop.${type}`;
						filmMode = true;
						reached = 0;
					}
					player.play().catch(() => {
						filmMode = false;
						reached = total;
					});
				},
				{ threshold: 0.35 }
			);
			watcher.observe(track);
			return () => {
				watcher.disconnect();
				cancelAnimationFrame(frame);
				player.removeEventListener('play', start);
				player.removeEventListener('pause', pause);
			};
		}
		reached = 0;
		return whileVisible(track, () => {
			const rect = track.getBoundingClientRect();
			const progress = clamp((innerHeight * 0.82 - rect.top) / (innerHeight * 0.5));
			track.style.setProperty('--lp', progress.toFixed(3));
			reached = Math.max(reached, Math.floor(progress * total + 0.15));
		});
	});
</script>

<section class="section process cv" id="process" aria-labelledby="process-title">
	<span id="approach" class="anchor"></span>
	<div class="container">
		<div class="top">
			<SectionHead
				id="process-title"
				eyebrow={approach.eyebrow}
				lines={approach.lines}
				lead={approach.lead}
			/>
			<div class="art" use:parallax={36} data-reveal use:reveal>
				<img
					src="/corporate/sections/02-process.webp"
					width="1600"
					height="1067"
					alt=""
					loading="lazy"
					decoding="async"
				/>
			</div>
		</div>

		<ul class="principles">
			{#each approach.principles as item, i (item.title)}
				<li data-reveal use:reveal style="--d:{i * 110}ms">
					<span class="no">{String(i + 1).padStart(2, '0')}</span>
					<h3>{item.title}</h3>
					<p>{item.text}</p>
				</li>
			{/each}
		</ul>

		<div class="phases" data-reveal use:reveal>
			<div class="phases-head">
				<h3>{approach.phasesTitle}</h3>
				<p>{approach.phasesLead}</p>
			</div>
			<div class="lane" class:film-mode={filmMode} bind:this={lane}>
				<video
					class="film"
					bind:this={film}
					muted
					loop
					playsinline
					preload="none"
					poster="/corporate/process/poster.webp"
					tabindex="-1"
					aria-hidden="true"
				></video>
				<span class="rail" aria-hidden="true"><i></i></span>
				<ol>
					{#each approach.phases as phase, i (phase.title)}
						<li class:on={i < reached}>
							<span class="dot" aria-hidden="true"></span>
							<span class="step">STEP {i + 1}</span>
							<h4>{phase.title}</h4>
							<p>{phase.text}</p>
						</li>
					{/each}
				</ol>
			</div>
		</div>
	</div>
</section>

<style>
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
	.art {
		overflow: hidden;
		border-radius: var(--r-lg);
		aspect-ratio: 16 / 9;
	}
	.art img {
		width: 100%;
		height: 118%;
		object-fit: cover;
		transform: translate3d(0, calc(-7% + var(--py, 0px)), 0);
	}
	.principles {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: 20px;
		margin-top: clamp(48px, 6vw, 80px);
	}
	.principles li {
		padding: 28px 26px;
		border: 1px solid var(--line);
		border-radius: var(--r-md);
		background: #fff;
	}
	.no {
		font-size: 13px;
		font-weight: 800;
		letter-spacing: 0.14em;
		color: var(--blue);
	}
	.principles h3 {
		margin-top: 10px;
		font-family: var(--font-sans);
		font-size: clamp(19px, 1.6vw, 22px);
		font-weight: 800;
		line-height: 1.5;
		color: var(--ink);
	}
	.principles p {
		margin-top: 10px;
		font-size: 15px;
		line-height: 1.85;
	}
	.phases {
		margin-top: 24px;
		padding: clamp(24px, 3.4vw, 48px);
		border-radius: var(--r-lg);
		background: var(--navy);
		color: rgba(255, 255, 255, 0.76);
		overflow: hidden;
	}
	.phases-head {
		display: flex;
		flex-wrap: wrap;
		align-items: baseline;
		justify-content: space-between;
		gap: 8px 24px;
	}
	.phases-head h3 {
		font-family: var(--font-sans);
		font-size: clamp(19px, 1.8vw, 24px);
		font-weight: 800;
		color: #fff;
	}
	.phases-head p {
		font-size: 14px;
	}
	.lane {
		position: relative;
		margin-top: 36px;
	}
	.film {
		display: none;
		width: 100%;
		aspect-ratio: 1280 / 250;
		object-fit: cover;
		margin-bottom: 4px;
	}
	.film-mode .film {
		display: block;
	}
	.film-mode .rail,
	.film-mode .dot {
		display: none;
	}
	.film-mode ol {
		gap: 0;
	}
	.film-mode ol li {
		padding: 0 8px;
		text-align: center;
	}
	.rail {
		position: absolute;
		left: 6px;
		right: 6px;
		top: 6px;
		height: 2px;
		border-radius: 2px;
		background: rgba(255, 255, 255, 0.16);
	}
	.rail i {
		position: absolute;
		inset: 0;
		border-radius: inherit;
		background: linear-gradient(90deg, #7fa8ff, #fff);
		box-shadow: 0 0 14px rgba(127, 168, 255, 0.9);
		transform: scaleX(var(--lp, 1));
		transform-origin: 0 50%;
	}
	ol {
		position: relative;
		display: grid;
		grid-template-columns: repeat(5, minmax(0, 1fr));
		gap: 16px;
	}
	ol li {
		position: relative;
		padding-top: 30px;
		opacity: 0.42;
		transition: opacity 0.6s var(--ease-out);
	}
	ol li.on {
		opacity: 1;
	}
	.dot {
		position: absolute;
		top: 0;
		width: 14px;
		height: 14px;
		border: 2px solid rgba(255, 255, 255, 0.4);
		border-radius: 50%;
		background: var(--navy);
		transition:
			border-color 0.5s,
			background-color 0.5s,
			box-shadow 0.5s;
	}
	li.on .dot {
		border-color: #fff;
		background: #7fa8ff;
		box-shadow: 0 0 0 6px rgba(127, 168, 255, 0.22);
	}
	.step {
		font-size: 11px;
		font-weight: 700;
		letter-spacing: 0.16em;
		color: #8fb3ff;
	}
	h4 {
		margin-top: 4px;
		font-size: 18px;
		font-weight: 800;
		line-height: 1.5;
		color: #fff;
	}
	ol p {
		margin-top: 4px;
		font-size: 14px;
		line-height: 1.7;
	}
	@media (max-width: 900px) {
		.top {
			grid-template-columns: 1fr;
		}
		.art {
			display: none;
		}
		.principles {
			grid-template-columns: 1fr;
		}
		.rail {
			left: 6px;
			right: auto;
			top: 6px;
			bottom: 6px;
			width: 2px;
			height: auto;
		}
		.rail i {
			transform: scaleY(var(--lp, 1));
			transform-origin: 50% 0;
			background: linear-gradient(180deg, #7fa8ff, #fff);
		}
		ol {
			grid-template-columns: 1fr;
			gap: 22px;
		}
		ol li {
			padding: 0 0 0 34px;
		}
		.dot {
			top: 6px;
		}
	}
</style>
