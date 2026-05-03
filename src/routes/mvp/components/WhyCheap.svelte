<script lang="ts">
	const pillars = [
		{
			icon: 'sparkles',
			title: 'AIが工数の最大70%を肩代わり',
			body: '設計・実装・レビュー・テスト生成までAIが定型を最大70%肩代わり。判断と品質設計に工数を集中させ、浮いたぶんをそのまま価格に還元しています。'
		},
		{
			icon: 'award',
			title: '過去案件のベスト構成を再利用',
			body: '認証・管理画面・APIなど、毎回ゼロから書かない仕組み。完成度の高い土台に新機能を載せるから、品質と速さを両立できます。'
		},
		{
			icon: 'shield-check',
			title: 'だからセキュリティも安心',
			body: 'AI生成コードはそのまま使わず、認証・権限・データ取扱いの設計は手で書いています。OWASP Top 10やプライバシー要件のレビュー込みで納品するので、本番投入後も安心です。'
		}
	];
</script>

<section id="faq" class="why-cheap" aria-labelledby="why-cheap-heading">
	<div class="container">
		<header class="head">
			<span class="eyebrow">WHY SO AFFORDABLE</span>
			<h2 id="why-cheap-heading">なぜ、半額以下で同じ品質が出せるのか。</h2>
			<p class="lede">
				LP制作の業界平均は約¥55万、PoC開発の推奨予算は¥200万から。<br />
				それでもLanespireはLPを¥198,000〜、AI業務自動化を¥480,000〜で提供できる。理由は3つあります。
			</p>
		</header>

		<ul class="grid">
			{#each pillars as pillar, i}
				<li class="pillar">
					<div class="step" aria-hidden="true">0{i + 1}</div>
					<span class="icon" aria-hidden="true">
						{#if pillar.icon === 'sparkles'}
							<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l1.8 4.7L18.5 9.5 13.8 11.3 12 16l-1.8-4.7L5.5 9.5l4.7-1.8z" /><path d="M19 14l.8 2.2L22 17l-2.2.8L19 20l-.8-2.2L16 17l2.2-.8z" /><path d="M5 16l.6 1.5L7 18l-1.4.5L5 20l-.6-1.5L3 18l1.4-.5z" /></svg>
						{:else if pillar.icon === 'award'}
							<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="9" r="6" /><path d="M8.5 14L7 22l5-3 5 3-1.5-8" /></svg>
						{:else}
							<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="M9 12l2 2 4-4" /></svg>
						{/if}
					</span>
					<h3>{pillar.title}</h3>
					<p>{pillar.body}</p>
				</li>
			{/each}
		</ul>

		<p class="reassure">
			「安かろう悪かろう」ではなく、「やり方を変えたから安い」。これがLanespireの基本姿勢です。
		</p>
	</div>
</section>

<style>
	.why-cheap {
		padding: var(--mvp-section-pad-y) 0;
		background: var(--mvp-bg-soft-orange);
		color: var(--mvp-text);
		font-family: var(--mvp-font-body);
		position: relative;
	}

	.why-cheap::before {
		content: '';
		position: absolute;
		inset: 0;
		background: var(--mvp-gradient-soft-orange);
		pointer-events: none;
	}

	.container {
		position: relative;
		max-width: var(--mvp-container-max);
		margin: 0 auto;
		padding: 0 var(--mvp-container-pad);
	}

	.head {
		text-align: center;
		max-width: 760px;
		margin: 0 auto var(--mvp-space-12);
	}

	.eyebrow {
		display: inline-block;
		font-size: var(--mvp-fs-eyebrow);
		font-weight: var(--mvp-fw-semibold);
		letter-spacing: var(--mvp-ls-wide);
		color: var(--mvp-orange-700);
		margin-bottom: var(--mvp-space-3);
		text-transform: uppercase;
	}

	h2 {
		font-family: var(--mvp-font-heading);
		font-size: var(--mvp-fs-h2);
		font-weight: var(--mvp-fw-bold);
		line-height: var(--mvp-lh-tight);
		letter-spacing: var(--mvp-ls-tight);
		margin: 0 0 var(--mvp-space-4);
	}

	.lede {
		font-size: var(--mvp-fs-body-lg);
		line-height: var(--mvp-lh-normal);
		color: var(--mvp-text-muted);
		margin: 0;
	}

	.grid {
		list-style: none;
		padding: 0;
		margin: 0;
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: var(--mvp-space-6);
	}

	.pillar {
		position: relative;
		background: var(--mvp-surface);
		border: 1px solid var(--mvp-border);
		border-radius: var(--mvp-radius-card);
		padding: var(--mvp-space-10) var(--mvp-space-8) var(--mvp-space-8);
		box-shadow: var(--mvp-shadow-card);
	}

	.step {
		position: absolute;
		top: var(--mvp-space-5);
		right: var(--mvp-space-6);
		font-family: var(--mvp-font-heading);
		font-size: var(--mvp-fs-h3);
		font-weight: var(--mvp-fw-black);
		color: var(--mvp-orange-200);
		letter-spacing: var(--mvp-ls-tight);
	}

	.icon {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 56px;
		height: 56px;
		border-radius: 14px;
		background: var(--mvp-gradient-cta);
		color: var(--mvp-text-on-orange);
		box-shadow: var(--mvp-shadow-cta);
		margin-bottom: var(--mvp-space-5);
	}

	.icon :global(svg) {
		width: 28px;
		height: 28px;
	}

	h3 {
		font-family: var(--mvp-font-heading);
		font-size: var(--mvp-fs-h4);
		font-weight: var(--mvp-fw-bold);
		line-height: var(--mvp-lh-snug);
		margin: 0 0 var(--mvp-space-3);
	}

	.pillar p {
		margin: 0;
		font-size: var(--mvp-fs-body);
		line-height: var(--mvp-lh-normal);
		color: var(--mvp-text-muted);
	}

	.reassure {
		margin: var(--mvp-space-10) auto 0;
		text-align: center;
		max-width: 720px;
		font-size: var(--mvp-fs-body);
		color: var(--mvp-text-muted);
	}

	@media (max-width: 1024px) {
		.grid {
			grid-template-columns: 1fr;
		}
	}

	@media (max-width: 640px) {
		.pillar {
			padding: var(--mvp-space-8) var(--mvp-space-6) var(--mvp-space-6);
		}
		.step {
			top: var(--mvp-space-3);
			right: var(--mvp-space-4);
			font-size: var(--mvp-fs-h4);
		}
	}
</style>
