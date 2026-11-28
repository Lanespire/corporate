<script lang="ts">
	import { onMount } from 'svelte';
	import { nav, hero } from '$lib/corp/content';
	import { clamp, onFrame } from '$lib/corp/motion';

	let scrolled = $state(false);
	let hidden = $state(false);
	let open = $state(false);
	let bar: HTMLElement | undefined = $state();

	function close() {
		open = false;
	}

	onMount(() => {
		let last = scrollY;
		const stop = onFrame(() => {
			const y = scrollY;
			scrolled = y > 12;
			if (Math.abs(y - last) > 6) {
				hidden = y > last && y > innerHeight * 0.9 && !open;
				last = y;
			}
			const max = document.documentElement.scrollHeight - innerHeight;
			bar?.style.setProperty('--sp', clamp(max > 0 ? y / max : 0).toFixed(4));
		});
		const onKey = (event: KeyboardEvent) => {
			if (event.key === 'Escape') close();
		};
		addEventListener('keydown', onKey);
		return () => {
			stop();
			removeEventListener('keydown', onKey);
		};
	});

	$effect(() => {
		document.documentElement.classList.toggle('menu-open', open);
	});
</script>

<header class="header" class:scrolled class:hidden class:open>
	<div class="container bar">
		<a class="brand" href="/" aria-label="株式会社Lanespire トップ" onclick={close}>
			<span class="mark" aria-hidden="true"><i></i><i></i><i></i></span>
			<span class="name">Lanespire</span>
		</a>
		<nav class="desktop" aria-label="メインナビゲーション">
			{#each nav as item (item.href)}
				<a href={item.href}>{item.label}</a>
			{/each}
		</nav>
		<a class="cta" href={hero.secondary.href}>
			{hero.secondary.label}
			<svg class="arr" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12h15M13 6l6 6-6 6" /></svg>
		</a>
		<button
			class="toggle"
			type="button"
			aria-expanded={open}
			aria-controls="mobile-menu"
			aria-label={open ? 'メニューを閉じる' : 'メニューを開く'}
			onclick={() => (open = !open)}
		>
			<span></span><span></span>
		</button>
	</div>
	<span class="progress" bind:this={bar} aria-hidden="true"></span>
</header>

<div class="menu" id="mobile-menu" class:open inert={!open}>
	<nav aria-label="モバイルナビゲーション">
		{#each nav as item, i (item.href)}
			<a href={item.href} style="--i:{i}" onclick={close}>
				<small>0{i + 1}</small>{item.label}
			</a>
		{/each}
	</nav>
	<a class="btn btn-primary" href={hero.secondary.href} onclick={close}>
		{hero.secondary.label}
		<svg class="arr" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12h15M13 6l6 6-6 6" /></svg>
	</a>
</div>

<style>
	.header {
		position: fixed;
		inset: 0 0 auto;
		z-index: 100;
		height: var(--header-h);
		transition:
			transform 0.6s var(--ease-out),
			background-color 0.4s,
			box-shadow 0.4s;
	}
	.header.scrolled {
		background: rgba(255, 255, 255, 0.82);
		backdrop-filter: saturate(1.6) blur(16px);
		-webkit-backdrop-filter: saturate(1.6) blur(16px);
		box-shadow: 0 1px 0 rgba(17, 41, 64, 0.08);
	}
	.header.hidden {
		transform: translateY(-100%);
	}
	.header.open {
		background: #fff;
		transform: none;
	}
	.bar {
		height: 100%;
		display: flex;
		align-items: center;
		gap: 36px;
	}
	.brand {
		display: inline-flex;
		align-items: center;
		gap: 10px;
		flex: none;
		color: var(--ink);
	}
	.mark {
		width: 26px;
		height: 30px;
		display: flex;
		align-items: flex-end;
		gap: 4px;
		transform: skewY(-9deg);
	}
	.mark i {
		width: 6px;
		border-radius: 1px;
		background: var(--blue);
		transform-origin: 50% 100%;
		animation: corp-grow-y 0.7s var(--ease-out) both;
	}
	.mark i:nth-child(1) {
		height: 20px;
		animation-delay: 0.05s;
	}
	.mark i:nth-child(2) {
		height: 25px;
		animation-delay: 0.14s;
	}
	.mark i:nth-child(3) {
		height: 30px;
		animation-delay: 0.23s;
	}
	.name {
		font-size: 24px;
		font-weight: 800;
		letter-spacing: -0.03em;
		line-height: 1;
	}
	.desktop {
		margin-left: auto;
		display: flex;
		gap: 30px;
		font-size: 14px;
		font-weight: 600;
		color: var(--ink);
		white-space: nowrap;
	}
	.desktop a {
		position: relative;
		padding: 8px 0;
	}
	.desktop a::after {
		content: '';
		position: absolute;
		inset: auto 0 2px;
		height: 2px;
		border-radius: 2px;
		background: var(--blue);
		transform: scaleX(0);
		transform-origin: 100% 50%;
		transition: transform 0.45s var(--ease-out);
	}
	.desktop a:hover::after,
	.desktop a:focus-visible::after {
		transform: none;
		transform-origin: 0 50%;
	}
	.cta {
		display: inline-flex;
		align-items: center;
		gap: 10px;
		min-height: 44px;
		padding: 0 20px;
		border-radius: 999px;
		background: var(--ink);
		color: #fff;
		font-size: 14px;
		font-weight: 700;
		white-space: nowrap;
		transition: background-color 0.3s;
	}
	.cta:hover,
	.cta:focus-visible {
		background: var(--blue);
	}
	.arr {
		width: 16px;
		height: 16px;
		fill: none;
		stroke: currentColor;
		stroke-width: 2;
		stroke-linecap: round;
		stroke-linejoin: round;
		transition: transform 0.4s var(--ease-out);
	}
	.cta:hover .arr {
		transform: translateX(4px);
	}
	.toggle {
		display: none;
		position: relative;
		width: 44px;
		height: 44px;
		margin-left: auto;
		border: 0;
		border-radius: 12px;
		background: var(--pale);
		cursor: pointer;
	}
	.toggle span {
		position: absolute;
		left: 12px;
		right: 12px;
		height: 2px;
		border-radius: 2px;
		background: var(--ink);
		transition: transform 0.45s var(--ease-out);
	}
	.toggle span:nth-child(1) {
		top: 17px;
	}
	.toggle span:nth-child(2) {
		top: 25px;
	}
	.open .toggle span:nth-child(1) {
		transform: translateY(4px) rotate(45deg);
	}
	.open .toggle span:nth-child(2) {
		transform: translateY(-4px) rotate(-45deg);
	}
	.progress {
		position: absolute;
		inset: auto 0 0;
		height: 2px;
		background: linear-gradient(90deg, var(--blue), #7fa8ff);
		transform: scaleX(var(--sp, 0));
		transform-origin: 0 50%;
		opacity: 0;
		transition: opacity 0.4s;
	}
	.scrolled .progress {
		opacity: 1;
	}
	.menu {
		position: fixed;
		inset: 0;
		z-index: 90;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		gap: 24px;
		padding: calc(var(--header-h) + 24px) var(--pad) 32px;
		background: #fff;
		visibility: hidden;
		clip-path: inset(0 0 100% 0);
		transition:
			clip-path 0.7s var(--ease-out),
			visibility 0s 0.7s;
	}
	.menu.open {
		visibility: visible;
		clip-path: inset(0);
		transition:
			clip-path 0.7s var(--ease-out),
			visibility 0s;
	}
	.menu nav {
		display: grid;
	}
	.menu nav a {
		display: flex;
		align-items: baseline;
		gap: 16px;
		padding: 16px 0;
		border-bottom: 1px solid var(--line);
		font-family: var(--font-sans);
		font-size: 24px;
		font-weight: 800;
		color: var(--ink);
		opacity: 0;
		transform: translateY(18px);
		transition:
			opacity 0.5s,
			transform 0.7s var(--ease-out);
	}
	.menu.open nav a {
		opacity: 1;
		transform: none;
		transition-delay: calc(0.12s + var(--i) * 0.06s);
	}
	.menu nav small {
		font-family: var(--font-sans);
		font-size: 12px;
		font-weight: 700;
		letter-spacing: 0.1em;
		color: var(--blue);
	}
	.menu :global(.arr) {
		fill: none;
		stroke: currentColor;
		stroke-width: 2;
		stroke-linecap: round;
		stroke-linejoin: round;
	}
	:global(html.menu-open) {
		overflow: hidden;
	}
	@media (max-width: 1080px) {
		.desktop,
		.cta {
			display: none;
		}
		.toggle {
			display: block;
		}
	}
	@media (min-width: 1081px) {
		.menu {
			display: none;
		}
	}
</style>
