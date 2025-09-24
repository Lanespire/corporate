<script lang="ts">
	import { onMount } from 'svelte';
	import {
		createScrollAnimation,
		createStaggerAnimation,
		createHoverAnimation
	} from '$utils/animations';
	import type { Service } from '$types/global';

	// Services data
	export let services: Service[] = [
		{
			id: 'web-development',
			title: 'Web制作',
			description:
				'レスポンシブデザインとSEO対策を標準装備した、ビジネス成果に直結するWebサイトを制作します。',
			icon: '/images/icon_web_development.png',
			technologies: ['React', 'Vue.js', 'SvelteKit']
		},
		{
			id: 'ai-consulting',
			title: 'ITコンサルタント・AI導入支援',
			description:
				'業務効率化とコスト削減を実現するAIソリューションの企画から実装まで一貫してサポートします。',
			icon: '/images/icon_ai_consulting.png',
			technologies: ['ChatGPT', 'Claude', 'Gemini']
		},
		{
			id: 'automation',
			title: 'n8nによる業務効率支援',
			description:
				'ワークフロー自動化プラットフォームn8nを活用し、反復作業を自動化して生産性を向上させます。',
			icon: '/images/icon_automation.png',
			technologies: ['n8n', 'Zapier', 'API連携']
		},
		{
			id: 'outsourcing',
			title: '業務委託',
			description:
				'専門性の高い技術者による業務委託サービスで、お客様のプロジェクトを成功に導きます。',
			icon: '/images/icon_outsourcing.png',
			technologies: ['フルスタック', 'DevOps', 'PM']
		},
		{
			id: 'nocode',
			title: 'NoCode、LowCodeによるサービス開発',
			description:
				'迅速なプロトタイピングから本格運用まで、NoCode/LowCodeツールを活用した効率的な開発を提供します。',
			icon: '/images/icon_nocode.png',
			technologies: ['Bubble', 'Webflow', 'Airtable']
		},
		{
			id: 'mobile',
			title: 'モバイルアプリケーション開発',
			description:
				'iOS・Android対応のネイティブアプリから、React Nativeを使用したクロスプラットフォーム開発まで対応します。',
			icon: '/images/icon_mobile_app.png',
			technologies: ['React Native', 'Flutter', 'Swift']
		},
		{
			id: 'custom-development',
			title: '受託開発',
			description:
				'お客様の要件に合わせたカスタムシステム開発を、企画から運用まで一貫してサポートします。',
			icon: '/images/icon_custom_development.png',
			technologies: ['Python', 'Node.js', 'Go']
		}
	];

	// Component state
	let mounted = false;
	let sectionElement: HTMLElement;
	const serviceCards: HTMLElement[] = [];

	onMount(() => {
		mounted = true;

		// Initialize scroll animations
		if (sectionElement) {
			const headerElement = sectionElement.querySelector('.section-header') as HTMLElement;
			if (headerElement) {
				createScrollAnimation(headerElement, {
					duration: 0.8,
					easing: 'power3.out'
				});
			}

			createStaggerAnimation(serviceCards, {
				duration: 0.6,
				easing: 'power3.out',
				stagger: 0.1
			});
		}

		// Initialize hover animations for service cards
		serviceCards.forEach((card) => {
			if (card) {
				createHoverAnimation(card);
			}
		});
	});
</script>

<section id="services" class="services section" bind:this={sectionElement}>
	<div class="container">
		<div class="section-header">
			<h2 class="section-title">サービス</h2>
			<p class="section-subtitle">Services</p>
		</div>

		<div class="services-grid">
			{#each services as service, index}
				<div class="service-card" data-service={service.id} bind:this={serviceCards[index]}>
					<div class="service-icon" role="img" aria-label={service.title}>
						<img src={service.icon} alt={service.title} loading="lazy" decoding="async" />
					</div>

					<h3 class="service-title">{service.title}</h3>

					<p class="service-description">{service.description}</p>

					<div class="service-tech">
						{#each service.technologies as tech}
							<span class="tech-tag">{tech}</span>
						{/each}
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>

<style>
	.services {
		background: var(--gradient-background);
		position: relative;
		overflow: hidden;
	}

	.services::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background:
			radial-gradient(circle at 20% 50%, rgba(0, 255, 255, 0.1) 0%, transparent 50%),
			radial-gradient(circle at 80% 20%, rgba(255, 0, 255, 0.1) 0%, transparent 50%);
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

	.services-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
		gap: var(--spacing-xl);
		max-width: 1200px;
		margin: 0 auto;
	}

	.service-card {
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

	.service-card::before {
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

	.service-card:hover::before {
		opacity: 1;
	}

	.service-card:hover {
		border-color: rgba(0, 255, 255, 0.3);
		box-shadow:
			0 20px 40px rgba(0, 0, 0, 0.3),
			0 0 30px rgba(0, 255, 255, 0.2);
	}

	.service-icon {
		width: 80px;
		height: 80px;
		border-radius: 50%;
		margin: 0 auto var(--spacing-lg);
		transition: all var(--transition-normal);
		position: relative;
		overflow: hidden;
		filter: drop-shadow(0 4px 8px rgba(0, 255, 255, 0.3));
		display: flex;
		align-items: center;
		justify-content: center;
		background: rgba(0, 0, 0, 0.4);
	}

	.service-icon img {
		width: 48px;
		height: 48px;
		object-fit: contain;
		position: relative;
		z-index: 1;
	}

	.service-icon::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: radial-gradient(circle, rgba(0, 255, 255, 0.1) 0%, rgba(255, 0, 255, 0.1) 100%);
		border-radius: 50%;
		opacity: 0.8;
		transition: opacity var(--transition-normal);
	}

	.service-card:hover .service-icon::before {
		opacity: 1;
		background: radial-gradient(circle, rgba(0, 255, 255, 0.2) 0%, rgba(255, 0, 255, 0.2) 100%);
	}

	.service-card:hover .service-icon {
		transform: scale(1.1);
		filter: drop-shadow(0 8px 16px rgba(0, 255, 255, 0.5));
	}

	.service-title {
		font-size: var(--font-size-xl);
		font-weight: var(--font-weight-bold);
		margin-bottom: var(--spacing-md);
		color: var(--color-text-primary);
	}

	.service-description {
		color: var(--color-text-secondary);
		line-height: var(--line-height-relaxed);
		margin-bottom: var(--spacing-lg);
	}

	.service-tech {
		display: flex;
		flex-wrap: wrap;
		gap: var(--spacing-xs);
		justify-content: center;
	}

	.tech-tag {
		background: rgba(0, 255, 255, 0.1);
		color: var(--color-primary);
		padding: var(--spacing-xs) var(--spacing-sm);
		border-radius: var(--radius-full);
		font-size: var(--font-size-sm);
		font-weight: var(--font-weight-medium);
		border: 1px solid rgba(0, 255, 255, 0.2);
		transition: all var(--transition-fast);
	}

	.tech-tag:hover {
		background: rgba(0, 255, 255, 0.2);
		border-color: rgba(0, 255, 255, 0.4);
		transform: translateY(-2px);
	}

	/* Responsive Design */
	@media (max-width: 768px) {
		.services-grid {
			grid-template-columns: 1fr;
			gap: var(--spacing-lg);
		}

		.service-card {
			padding: var(--spacing-lg);
		}

		.section-title {
			font-size: var(--font-size-3xl);
		}
	}

	@media (max-width: 480px) {
		.service-card {
			padding: var(--spacing-md);
		}

		.service-icon {
			width: 60px;
			height: 60px;
		}

		.service-title {
			font-size: var(--font-size-lg);
		}
	}
</style>
