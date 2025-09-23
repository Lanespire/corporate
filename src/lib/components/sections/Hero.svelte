<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { ThreeScene, defaultThreeConfig } from '$utils/three-utils';
	import { TypingAnimation } from '$utils/animations';
	import type { ThreeSceneConfig } from '$types/global';

	// Props
	export let title: string[] = ['コードで、', 'ビジネスの未来を', '実装する。'];
	export let subtitle =
		'最新技術と豊富な経験で、あなたのアイデアを現実に。Web制作からAI導入まで、ワンストップで支援します。';

	// Component state
	let mounted = false;
	let heroContainer: HTMLElement;
	let threeContainer: HTMLElement;
	let titleElement: HTMLElement;
	let threeScene: ThreeScene | null = null;
	let typingAnimation: TypingAnimation | null = null;

	// Three.js configuration - Original cyberpunk settings
	const threeConfig: ThreeSceneConfig = {
		...defaultThreeConfig,
		particles: {
			count: 1000,
			size: 0.05,
			speed: 0.01,
			color: '#00ffff'
		}
	};

	onMount(async () => {
		mounted = true;

		// Initialize Three.js scene
		if (threeContainer) {
			try {
				threeScene = new ThreeScene(threeContainer, threeConfig);
			} catch (error) {
				console.warn('Three.js initialization failed:', error);
			}
		}

		// Initialize typing animation with delay
		setTimeout(() => {
			if (titleElement) {
				typingAnimation = new TypingAnimation(
					titleElement,
					title,
					150, // typing speed
					() => {
						// Animation complete callback
						console.log('Typing animation complete');
					}
				);
			}
		}, 1000);
	});

	onDestroy(() => {
		if (threeScene) {
			threeScene.destroy();
		}
		if (typingAnimation) {
			typingAnimation.destroy();
		}
	});
</script>

<section class="hero" bind:this={heroContainer}>
	<div class="hero-background" bind:this={threeContainer}></div>

	<div class="hero-content">
		<div class="container">
			<div class="hero-text">
				<h1 class="hero-title" bind:this={titleElement}>
					<!-- Typing animation will populate this -->
				</h1>

				<p class="hero-subtitle">
					{subtitle}
				</p>
			</div>
		</div>
	</div>

	<div class="scroll-indicator">
		<div class="scroll-text">Scroll</div>
		<div class="scroll-arrow"></div>
	</div>
</section>

<style>
	.hero {
		position: relative;
		min-height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;
		overflow: hidden;
		background: var(--gradient-background);
		padding-top: 100px; /* Account for fixed header */
	}

	.hero-background {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 1;
	}

	.hero-content {
		position: relative;
		z-index: 2;
		width: 100%;
		text-align: center;
	}

	.hero-text {
		max-width: 800px;
		margin: 0 auto;
	}

	.hero-title {
		font-size: 4rem;
		font-weight: 700;
		line-height: 1.2;
		margin-bottom: 2rem;
		min-height: 240px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.hero-title :global(.typing-line) {
		display: block;
		margin-bottom: 0.5rem;
		min-height: 1.2em;
		position: relative;
	}

	.hero-title :global(.typing-line.highlight) {
		background: linear-gradient(45deg, #00ffff, #ff00ff);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
		filter: none;
		text-shadow: none;
	}

	.hero-subtitle {
		font-size: var(--font-size-xl);
		color: var(--color-text-secondary);
		line-height: var(--line-height-relaxed);
		opacity: 0;
		transform: translateY(20px);
		animation: fadeInUp 1s ease-out 3s forwards;
	}

	.scroll-indicator {
		position: absolute;
		bottom: var(--spacing-xl);
		left: 50%;
		transform: translateX(-50%);
		z-index: 3;
		text-align: center;
		opacity: 0;
		animation: fadeIn 1s ease-out 4s forwards;
	}

	.scroll-text {
		font-size: var(--font-size-sm);
		color: var(--color-text-muted);
		margin-bottom: var(--spacing-xs);
		text-transform: uppercase;
		letter-spacing: 0.1em;
	}

	.scroll-arrow {
		width: 2px;
		height: 30px;
		background: var(--gradient-primary);
		margin: 0 auto;
		position: relative;
		animation: scrollBounce 2s infinite;
	}

	.scroll-arrow::after {
		content: '';
		position: absolute;
		bottom: 0;
		left: 50%;
		transform: translateX(-50%);
		width: 0;
		height: 0;
		border-left: 4px solid transparent;
		border-right: 4px solid transparent;
		border-top: 8px solid var(--color-primary);
	}

	@keyframes fadeInUp {
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	@keyframes fadeIn {
		to {
			opacity: 1;
		}
	}

	@keyframes scrollBounce {
		0%,
		20%,
		50%,
		80%,
		100% {
			transform: translateY(0);
		}
		40% {
			transform: translateY(-10px);
		}
		60% {
			transform: translateY(-5px);
		}
	}

	/* Responsive design */
	@media (max-width: 768px) {
		.hero {
			padding-top: 80px;
		}

		.hero-title {
			font-size: var(--font-size-4xl);
			min-height: 180px;
		}

		.hero-subtitle {
			font-size: var(--font-size-lg);
		}
	}

	@media (max-width: 480px) {
		.hero-title {
			font-size: var(--font-size-3xl);
			min-height: 150px;
		}

		.hero-subtitle {
			font-size: var(--font-size-base);
		}
	}
</style>
