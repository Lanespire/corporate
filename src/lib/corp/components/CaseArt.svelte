<script lang="ts">
	type Props = { index: number; chips?: string[]; large?: boolean };
	let { index, chips = [], large = false }: Props = $props();

	const variants = [
		[
			'M-20 330 C120 310 210 240 290 170 S420 60 520 30',
			'M-20 260 C110 262 200 214 286 162 S410 84 520 76',
			'M70 390 C170 310 250 250 312 176 S440 110 520 124'
		],
		[
			'M-20 90 C110 96 190 150 262 196 S400 290 520 300',
			'M-20 160 C100 160 190 186 266 214 S410 262 520 250',
			'M-20 30 C130 44 214 120 282 180 S430 320 520 350'
		],
		[
			'M-20 200 C90 120 190 120 260 180 S400 260 520 150',
			'M-20 250 C100 180 190 170 262 214 S410 300 520 200',
			'M-20 150 C80 70 196 80 256 150 S390 210 520 100'
		],
		[
			'M40 390 C90 280 170 220 250 190 S430 150 520 40',
			'M150 390 C170 300 220 240 286 204 S440 190 520 110',
			'M-20 340 C70 270 150 200 236 176 S410 110 520 -10'
		]
	];
	const paths = $derived(variants[index % variants.length]);
	const number = $derived(String(index + 1).padStart(2, '0'));
</script>

<div class="art" class:large aria-hidden="true">
	<svg viewBox="0 0 500 380" preserveAspectRatio="xMidYMid slice">
		{#each paths as d, i (d)}
			<path class="lane" {d} />
			<path class="run" {d} pathLength="100" style="--i:{i}" />
		{/each}
	</svg>
	<span class="plate p1"></span>
	<span class="plate p2"></span>
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
		min-height: 240px;
		overflow: hidden;
		border-radius: var(--r-md);
		background:
			radial-gradient(120% 90% at 78% 12%, rgba(255, 255, 255, 0.95), transparent 60%),
			linear-gradient(155deg, #f5f8fe 0%, #e4ecfa 58%, #d6e2f8 100%);
		isolation: isolate;
	}
	svg {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
	}
	path {
		fill: none;
		stroke-linecap: round;
	}
	.lane {
		stroke: rgba(50, 107, 227, 0.22);
		stroke-width: 1.4;
	}
	.run {
		stroke: #fff;
		stroke-width: 3;
		stroke-dasharray: 12 88;
		filter: drop-shadow(0 0 6px rgba(50, 107, 227, 0.95));
		animation: art-run 5.6s linear infinite;
		animation-delay: calc(var(--i) * -1.9s);
	}
	.plate {
		position: absolute;
		border: 1px solid rgba(255, 255, 255, 0.9);
		border-radius: 20px;
		background: linear-gradient(140deg, rgba(255, 255, 255, 0.82), rgba(160, 190, 250, 0.3));
		box-shadow:
			0 30px 50px -24px rgba(34, 84, 196, 0.5),
			inset 0 1px 0 #fff,
			inset 0 -18px 30px -18px rgba(50, 107, 227, 0.35);
		backdrop-filter: blur(5px);
		-webkit-backdrop-filter: blur(5px);
	}
	.p1 {
		left: 13%;
		top: 20%;
		width: 44%;
		aspect-ratio: 1 / 1.08;
		transform: rotate(-9deg);
		animation: art-float 7s var(--ease-io) infinite alternate;
	}
	.p2 {
		left: 38%;
		top: 34%;
		width: 34%;
		aspect-ratio: 1 / 1.1;
		transform: rotate(7deg);
		background: linear-gradient(150deg, rgba(74, 128, 240, 0.72), rgba(34, 84, 196, 0.5));
		border-color: rgba(190, 212, 255, 0.9);
		animation: art-float 8.5s var(--ease-io) -2s infinite alternate-reverse;
	}
	.num {
		position: absolute;
		left: 19%;
		top: 25%;
		font-family: var(--font-display);
		font-size: clamp(64px, 9vw, 128px);
		font-weight: 800;
		line-height: 1;
		letter-spacing: -0.04em;
		color: transparent;
		background: linear-gradient(170deg, #1a3f9c 10%, #326be3 55%, #9fc0ff 100%);
		-webkit-background-clip: text;
		background-clip: text;
		transform: rotate(-9deg);
	}
	.floats li {
		position: absolute;
		padding: 5px 12px;
		border: 1px solid rgba(255, 255, 255, 0.95);
		border-radius: 999px;
		background: rgba(255, 255, 255, 0.78);
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
		right: 9%;
		top: 14%;
	}
	.floats li:nth-child(2) {
		right: 16%;
		bottom: 24%;
	}
	.floats li:nth-child(3) {
		left: 9%;
		bottom: 11%;
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
	.large .num {
		font-size: clamp(88px, 12vw, 176px);
	}
	@keyframes art-run {
		from {
			stroke-dashoffset: 100;
		}
		to {
			stroke-dashoffset: 0;
		}
	}
	@keyframes art-float {
		to {
			translate: 0 -10px;
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
		.run {
			animation: none;
			stroke-dasharray: none;
			stroke: rgba(255, 255, 255, 0.9);
			stroke-width: 2;
		}
		.plate,
		.floats li,
		.sheen {
			animation: none !important;
		}
	}
</style>
