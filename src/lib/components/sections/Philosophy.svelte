<script lang="ts">
	import { onMount } from 'svelte';
	import { createScrollAnimation, createStaggerAnimation } from '$utils/animations';
	import type { Philosophy } from '$types/global';

	// Philosophy data
	export let philosophies: Philosophy[] = [
		{
			id: 'refinement',
			title: '洗練',
			subtitle: 'Refinement',
			description:
				'美しく機能的なデザインで、ユーザー体験を向上させます。細部にまでこだわり抜いた洗練されたソリューションを提供します。',
			icon: '/philosophy_refinement.png'
		},
		{
			id: 'affinity',
			title: '親和',
			subtitle: 'Affinity',
			description:
				'お客様との深い信頼関係を築き、共に成長するパートナーシップを大切にします。親しみやすさと専門性を両立させます。',
			icon: '/philosophy_affinity.png'
		},
		{
			id: 'innovation',
			title: '革新',
			subtitle: 'Innovation',
			description:
				'常に最新技術を追求し、従来の枠を超えた革新的なアプローチで課題解決に取り組みます。',
			icon: '/philosophy_innovation.png'
		}
	];

	// Component state
	let mounted = false;
	let sectionElement: HTMLElement;
	const philosophyCards: HTMLElement[] = [];

	onMount(() => {
		mounted = true;

		// Initialize scroll animations
		if (sectionElement) {
			createScrollAnimation(sectionElement.querySelector('.section-header') as HTMLElement, {
				duration: 0.8,
				easing: 'power3.out'
			});

			createStaggerAnimation(philosophyCards, {
				duration: 0.6,
				easing: 'power3.out',
				stagger: 0.2
			});
		}
	});
</script>

<section id="philosophy" class="philosophy section" bind:this={sectionElement}>
	<div class="container">
		<div class="section-header">
			<h2 class="section-title">私たちの哲学</h2>
			<p class="section-subtitle">Philosophy</p>
		</div>

		<div class="philosophy-grid">
			{#each philosophies as philosophy, index}
				<div
					class="philosophy-card"
					data-philosophy={philosophy.id}
					bind:this={philosophyCards[index]}
				>
					<div
						class="philosophy-icon"
						style={`background-image: url(${philosophy.icon})`}
						role="img"
						aria-label={philosophy.title}
					></div>

					<h3 class="philosophy-title">{philosophy.title}</h3>
					<p class="philosophy-subtitle">{philosophy.subtitle}</p>

					<p class="philosophy-description">{philosophy.description}</p>
				</div>
			{/each}
		</div>
	</div>
</section>

<style>
	.philosophy {
		background: var(--gradient-background);
		position: relative;
		overflow: hidden;
	}

	.philosophy::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background:
			radial-gradient(circle at 30% 40%, rgba(0, 255, 255, 0.1) 0%, transparent 50%),
			radial-gradient(circle at 70% 60%, rgba(255, 0, 255, 0.1) 0%, transparent 50%);
		pointer-events: none;
	}

	.section-header {
		text-align: center;
		margin-bottom: var(--spacing-3xl);
	}

	.section-title {
		font-size: var(--font-size-4xl);
		font-weight: var(--font-weight-bold);
		margin-bottom: var(--spacing-sm);
		background: var(--gradient-primary);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}

	.section-subtitle {
		font-size: var(--font-size-lg);
		color: var(--color-text-muted);
		text-transform: uppercase;
		letter-spacing: 0.2em;
		margin: 0;
	}

	.philosophy-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		gap: var(--spacing-xl);
		max-width: 1000px;
		margin: 0 auto;
	}

	.philosophy-card {
		background: var(--gradient-surface);
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: var(--radius-xl);
		padding: var(--spacing-xl);
		text-align: center;
		transition: all var(--transition-normal);
		position: relative;
		overflow: hidden;
		backdrop-filter: blur(10px);
	}

	.philosophy-card::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: linear-gradient(135deg, rgba(0, 255, 255, 0.05), rgba(255, 0, 255, 0.05));
		opacity: 0;
		transition: opacity var(--transition-normal);
		pointer-events: none;
	}

	.philosophy-card:hover::before {
		opacity: 1;
	}

	.philosophy-card:hover {
		transform: translateY(-10px);
		border-color: rgba(0, 255, 255, 0.3);
		box-shadow:
			0 20px 40px rgba(0, 0, 0, 0.3),
			0 0 30px rgba(0, 255, 255, 0.2);
	}

	.philosophy-icon {
		width: 100px;
		height: 100px;
		border-radius: 50%;
		margin: 0 auto var(--spacing-lg);
		transition: all var(--transition-normal);
		position: relative;
		overflow: hidden;
		display: flex;
		align-items: center;
		justify-content: center;
		filter: drop-shadow(0 4px 8px rgba(255, 0, 255, 0.3));
		background: rgba(0, 0, 0, 0.4);
		background-size: contain;
		background-repeat: no-repeat;
		background-position: center;
	}

	.philosophy-icon::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: var(--gradient-primary);
		opacity: 0.6;
		transition: opacity var(--transition-normal);
	}

	.philosophy-card:hover .philosophy-icon::before {
		opacity: 0.9;
	}

	.philosophy-card:hover .philosophy-icon {
		transform: scale(1.1);
		box-shadow: 0 0 30px rgba(0, 255, 255, 0.5);
	}

	.philosophy-title {
		font-size: var(--font-size-2xl);
		font-weight: var(--font-weight-bold);
		margin-bottom: var(--spacing-xs);
		color: var(--color-text-primary);
	}

	.philosophy-subtitle {
		font-size: var(--font-size-lg);
		color: var(--color-primary);
		margin-bottom: var(--spacing-lg);
		text-transform: uppercase;
		letter-spacing: 0.1em;
		font-weight: var(--font-weight-medium);
	}

	.philosophy-description {
		color: var(--color-text-secondary);
		line-height: var(--line-height-relaxed);
		margin: 0;
	}

	/* Responsive Design */
	@media (max-width: 768px) {
		.philosophy-grid {
			grid-template-columns: 1fr;
			gap: var(--spacing-lg);
		}

		.philosophy-card {
			padding: var(--spacing-lg);
		}

		.section-title {
			font-size: var(--font-size-3xl);
		}

		.philosophy-icon {
			width: 80px;
			height: 80px;
		}
	}

	@media (max-width: 480px) {
		.philosophy-card {
			padding: var(--spacing-md);
		}

		.philosophy-icon {
			width: 70px;
			height: 70px;
		}

		.philosophy-title {
			font-size: var(--font-size-xl);
		}
	}
</style>
