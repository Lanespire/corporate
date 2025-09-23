<script lang="ts">
	import { onMount } from 'svelte';
	import { createScrollAnimation, createStaggerAnimation } from '$utils/animations';
	import type { CompanyValue } from '$types/global';

	// Company values data
	export let values: CompanyValue[] = [
		{
			id: 'innovation',
			title: '革新性',
			description: '最新技術を積極的に取り入れ、常に革新的なソリューションを提供します。',
			icon: '/icon_innovation.png'
		},
		{
			id: 'efficiency',
			title: '効率性',
			description: '無駄を省き、最短経路でお客様の目標達成をサポートします。',
			icon: '/icon_efficiency.png'
		},
		{
			id: 'collaboration',
			title: '協働性',
			description: 'お客様との密接な連携により、共に成長し続けるパートナーシップを築きます。',
			icon: '/icon_collaboration.png'
		}
	];

	// Component state
	let mounted = false;
	let sectionElement: HTMLElement;
	const valueCards: HTMLElement[] = [];

	onMount(() => {
		mounted = true;

		// Initialize scroll animations
		if (sectionElement) {
			createScrollAnimation(sectionElement.querySelector('.section-header') as HTMLElement, {
				duration: 0.8,
				easing: 'power3.out'
			});

			createScrollAnimation(sectionElement.querySelector('.about-content') as HTMLElement, {
				duration: 0.8,
				easing: 'power3.out',
				delay: 0.2
			});

			createStaggerAnimation(valueCards, {
				duration: 0.6,
				easing: 'power3.out',
				stagger: 0.15
			});
		}
	});
</script>

<section id="about" class="about section" bind:this={sectionElement}>
	<div class="container">
		<div class="section-header">
			<h2 class="section-title">私たちの使命</h2>
			<p class="section-subtitle">About</p>
		</div>

		<div class="about-content">
			<div class="about-text">
				<div class="about-description">
					<p class="lead-text">
						株式会社Lanespireは、最新のテクノロジーを駆使して、
						お客様のビジネスに革新をもたらすWeb開発会社です。
					</p>

					<p>
						私たちは単なる技術提供者ではありません。お客様のビジネスパートナーとして、
						共に課題を解決し、新たな価値を創造していきます。
						Web制作からAI導入支援、業務自動化まで、幅広い技術領域で お客様の成功を支援いたします。
					</p>

					<p>
						立ち上げたばかりの私たちだからこそ、フットワークの軽さと
						最新技術への感度の高さで、お客様に最適なソリューションを 迅速に提供することができます。
					</p>
				</div>

				<div class="about-image">
					<img
						src="/images/cyberpunk_company_values.png"
						alt="私たちの価値観"
						class="showcase-image"
						loading="lazy"
					/>
				</div>
			</div>

			<div class="company-values">
				<h3 class="values-title">私たちの価値観</h3>

				<div class="values-grid">
					{#each values as value, index}
						<div class="value-card" bind:this={valueCards[index]}>
							<div
								class="value-icon"
								style="background-image: url({value.icon})"
								role="img"
								aria-label={value.title}
							></div>

							<h4 class="value-title">{value.title}</h4>

							<p class="value-description">{value.description}</p>
						</div>
					{/each}
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	.about {
		background: var(--color-background);
		position: relative;
		overflow: hidden;
	}

	.about::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background:
			radial-gradient(circle at 70% 30%, rgba(0, 255, 255, 0.05) 0%, transparent 50%),
			radial-gradient(circle at 30% 70%, rgba(255, 0, 255, 0.05) 0%, transparent 50%);
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

	.about-content {
		max-width: 1000px;
		margin: 0 auto;
	}

	.about-text {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: var(--spacing-3xl);
		align-items: center;
		margin-bottom: var(--spacing-3xl);
	}

	.about-description {
		color: var(--color-text-secondary);
		line-height: var(--line-height-relaxed);
	}

	.lead-text {
		font-size: var(--font-size-xl);
		font-weight: var(--font-weight-medium);
		color: var(--color-text-primary);
		margin-bottom: var(--spacing-lg);
	}

	.about-description p {
		margin-bottom: var(--spacing-md);
	}

	.about-image {
		position: relative;
	}

	.showcase-image {
		width: 100%;
		max-width: 500px;
		height: auto;
		border-radius: var(--radius-xl);
		box-shadow:
			0 20px 40px rgba(0, 0, 0, 0.3),
			0 0 30px rgba(0, 255, 255, 0.2);
		transition: all var(--transition-normal);
	}

	.showcase-image:hover {
		transform: scale(1.02);
		box-shadow:
			0 30px 60px rgba(0, 0, 0, 0.4),
			0 0 50px rgba(0, 255, 255, 0.3);
	}

	.company-values {
		text-align: center;
	}

	.values-title {
		font-size: var(--font-size-3xl);
		font-weight: var(--font-weight-bold);
		margin-bottom: var(--spacing-xl);
		color: var(--color-text-primary);
	}

	.values-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
		gap: var(--spacing-xl);
	}

	.value-card {
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

	.value-card::before {
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

	.value-card:hover::before {
		opacity: 1;
	}

	.value-card:hover {
		transform: translateY(-10px);
		border-color: rgba(0, 255, 255, 0.3);
		box-shadow:
			0 20px 40px rgba(0, 0, 0, 0.3),
			0 0 30px rgba(0, 255, 255, 0.2);
	}

	.value-icon {
		width: 80px;
		height: 80px;
		background-size: 50px 50px;
		background-position: center;
		background-repeat: no-repeat;
		border-radius: 50%;
		margin: 0 auto var(--spacing-lg);
		transition: all var(--transition-normal);
		position: relative;
		overflow: hidden;
	}

	.value-icon::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: var(--gradient-primary);
		border-radius: 50%;
		opacity: 0.2;
		transition: opacity var(--transition-normal);
	}

	.value-card:hover .value-icon {
		transform: scale(1.1);
		box-shadow: 0 0 30px rgba(0, 255, 255, 0.5);
	}

	.value-card:hover .value-icon::before {
		opacity: 0.4;
	}

	.value-title {
		font-size: var(--font-size-xl);
		font-weight: var(--font-weight-bold);
		margin-bottom: var(--spacing-md);
		color: var(--color-text-primary);
	}

	.value-description {
		color: var(--color-text-secondary);
		line-height: var(--line-height-relaxed);
		margin: 0;
	}

	/* Responsive Design */
	@media (max-width: 768px) {
		.about-text {
			grid-template-columns: 1fr;
			gap: var(--spacing-xl);
		}

		.about-image {
			order: -1;
		}

		.values-grid {
			grid-template-columns: 1fr;
			gap: var(--spacing-lg);
		}

		.section-title {
			font-size: var(--font-size-3xl);
		}

		.values-title {
			font-size: var(--font-size-2xl);
		}
	}

	@media (max-width: 480px) {
		.value-card {
			padding: var(--spacing-lg);
		}

		.value-icon {
			width: 60px;
			height: 60px;
		}

		.lead-text {
			font-size: var(--font-size-lg);
		}
	}
</style>
