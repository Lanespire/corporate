<script lang="ts">
	import {
		Globe,
		Sparkles,
		Workflow,
		LayoutDashboard,
		Database,
		LifeBuoy
	} from 'lucide-svelte';

	const areas = [
		{
			title: 'Web制作',
			desc: 'コーポレートサイト・LP・サービスサイトの企画から実装まで。',
			Icon: Globe
		},
		{
			title: 'AI導入',
			desc: 'ChatGPT／画像生成の業務組み込みから、AIエージェント開発まで。',
			Icon: Sparkles
		},
		{
			title: '業務自動化',
			desc: 'RPA／Zapier／Make系のノーコード自動化で、定型業務を仕組みに変えます。',
			Icon: Workflow
		},
		{
			title: 'SaaS開発',
			desc: 'Webアプリのフロント・バック実装と、APIインフラの構築。',
			Icon: LayoutDashboard
		},
		{
			title: 'データ活用',
			desc: 'データ基盤の構築から、分析・ダッシュボードまでをセットで。',
			Icon: Database
		},
		{
			title: '保守・運用',
			desc: '運用改善・監視・継続的なサポートで、プロダクトを長く動かします。',
			Icon: LifeBuoy
		}
	];
</script>

<section id="areas" class="mvp-section mvp-section--subtle areas" aria-label="対応領域">
	<div class="mvp-container">
		<header class="head">
			<span class="mvp-eyebrow">AREAS WE COVER</span>
			<h2 class="mvp-heading-2">対応領域</h2>
			<p class="mvp-lead">
				Web制作からデータ活用、保守・運用まで、6つの領域をワンチームでカバーします。
			</p>
		</header>

		<ul class="grid">
			{#each areas as area (area.title)}
				<li>
					<article class="mvp-card mvp-card--interactive area-card">
						<span class="mvp-icon-bubble mvp-icon-bubble--lg">
							<svelte:component this={area.Icon} size={28} strokeWidth={1.75} />
						</span>
						<div class="text">
							<h3 class="area-title">{area.title}</h3>
							<p class="area-desc">{area.desc}</p>
						</div>
					</article>
				</li>
			{/each}
		</ul>
	</div>
</section>

<style>
	.areas {
		background: var(--mvp-bg-subtle);
	}

	.head {
		text-align: center;
		max-width: 720px;
		margin: 0 auto var(--mvp-space-12);
	}

	.head :global(.mvp-eyebrow) {
		margin-bottom: var(--mvp-space-3);
	}

	.head :global(.mvp-lead) {
		margin-top: var(--mvp-space-4);
	}

	.grid {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: var(--mvp-space-6);
	}

	.area-card {
		display: flex;
		flex-direction: row;
		align-items: flex-start;
		gap: var(--mvp-space-4);
		padding: var(--mvp-space-6);
		height: 100%;
	}

	.text {
		display: flex;
		flex-direction: column;
		gap: var(--mvp-space-2);
		min-width: 0;
	}

	.area-title {
		font-size: var(--mvp-fs-h4);
		font-weight: var(--mvp-fw-bold);
		color: var(--mvp-text);
		line-height: var(--mvp-lh-snug);
		margin: 0;
	}

	.area-desc {
		font-size: var(--mvp-fs-body-sm);
		color: var(--mvp-text-muted);
		line-height: var(--mvp-lh-relaxed);
		margin: 0;
	}

	@media (max-width: 1024px) {
		.grid {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}
	}

	@media (max-width: 640px) {
		.grid {
			grid-template-columns: 1fr;
		}
	}
</style>
