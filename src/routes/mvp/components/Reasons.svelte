<script lang="ts">
	const reasons = [
		{
			icon: 'bolt',
			title: '最短7日でデモまで',
			body: '契約からプロトタイプ提示までを1週間に固定。判断のスピードが落ちません。'
		},
		{
			icon: 'award',
			title: '直接契約・再委託なし',
			body: '実装者と直接やり取りできる体制。下請け会社を経由せず、最初から最後まで同じチームが担当します。'
		},
		{
			icon: 'tag',
			title: '固定料金パッケージ',
			body: '人月見積りに振り回されない、修正回数まで明示した固定料金。'
		},
		{
			icon: 'sprint',
			title: 'スクラムで毎週前進',
			body: '毎週金曜にデモ。仕様変更コストは「来週やる」に置き換わります。'
		},
		{
			icon: 'sparkles',
			title: 'AI活用で開発速度2〜3倍',
			body: 'コーディング・レビュー・テスト生成にAIをフル活用。同じ予算で多く作れます。'
		},
		{
			icon: 'handover',
			title: 'そのまま自走できる引き継ぎ',
			body: 'コード・設計・運用ドキュメントを毎週更新。内製化や別ベンダーへの移行も容易。'
		}
	];
</script>

<section id="reasons" class="reasons" aria-labelledby="reasons-heading">
	<div class="container">
		<header class="head">
			<span class="eyebrow">WHY LANESPIRE</span>
			<h2 id="reasons-heading">スタートアップに選ばれる理由</h2>
			<p class="lede">
				「うちみたいな規模でも頼めるの？」とよく聞かれます。むしろ、そういう方に向いています。
			</p>
		</header>

		<ul class="grid">
			{#each reasons as reason}
				<li class="card">
					<span class="icon" aria-hidden="true">
						{#if reason.icon === 'bolt'}
							<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z" /></svg>
						{:else if reason.icon === 'award'}
							<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="9" r="6" /><path d="M8.5 14L7 22l5-3 5 3-1.5-8" /></svg>
						{:else if reason.icon === 'tag'}
							<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.6 13.4l-7.2 7.2a2 2 0 01-2.8 0L3 13V3h10l7.6 7.6a2 2 0 010 2.8z" /><circle cx="7.5" cy="7.5" r="1.5" /></svg>
						{:else if reason.icon === 'sprint'}
							<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 11-3-6.7" /><path d="M21 4v5h-5" /></svg>
						{:else if reason.icon === 'sparkles'}
							<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l1.8 4.7L18.5 9.5 13.8 11.3 12 16l-1.8-4.7L5.5 9.5l4.7-1.8z" /><path d="M19 14l.8 2.2L22 17l-2.2.8L19 20l-.8-2.2L16 17l2.2-.8z" /></svg>
						{:else}
							<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19l-5-5 5-5" /><path d="M4 14h11a5 5 0 005-5V5" /></svg>
						{/if}
					</span>
					<h3>{reason.title}</h3>
					<p>{reason.body}</p>
				</li>
			{/each}
		</ul>
	</div>
</section>

<style>
	.reasons {
		padding: var(--mvp-section-pad-y) 0;
		background: var(--mvp-bg);
		color: var(--mvp-text);
		font-family: var(--mvp-font-body);
	}

	.container {
		max-width: var(--mvp-container-max);
		margin: 0 auto;
		padding: 0 var(--mvp-container-pad);
	}

	.head {
		text-align: center;
		max-width: 720px;
		margin: 0 auto var(--mvp-space-12);
	}

	.eyebrow {
		display: inline-block;
		font-size: var(--mvp-fs-eyebrow);
		font-weight: var(--mvp-fw-semibold);
		letter-spacing: var(--mvp-ls-wide);
		color: var(--mvp-accent);
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

	.card {
		background: var(--mvp-surface);
		border: 1px solid var(--mvp-border);
		border-radius: var(--mvp-radius-card);
		padding: var(--mvp-space-8);
		box-shadow: var(--mvp-shadow-xs);
		transition: transform var(--mvp-transition), box-shadow var(--mvp-transition), border-color var(--mvp-transition);
	}

	.card:hover {
		transform: translateY(-2px);
		box-shadow: var(--mvp-shadow-card-hover);
		border-color: var(--mvp-orange-200);
	}

	.icon {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 48px;
		height: 48px;
		border-radius: 12px;
		background: var(--mvp-bg-soft-orange);
		color: var(--mvp-accent);
		margin-bottom: var(--mvp-space-5);
	}

	.icon :global(svg) {
		width: 24px;
		height: 24px;
	}

	h3 {
		font-family: var(--mvp-font-heading);
		font-size: var(--mvp-fs-h4);
		font-weight: var(--mvp-fw-bold);
		line-height: var(--mvp-lh-snug);
		margin: 0 0 var(--mvp-space-3);
	}

	.card p {
		margin: 0;
		font-size: var(--mvp-fs-body);
		line-height: var(--mvp-lh-normal);
		color: var(--mvp-text-muted);
	}

	@media (max-width: 1024px) {
		.grid {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}
	}

	@media (max-width: 640px) {
		.grid {
			grid-template-columns: 1fr;
			gap: var(--mvp-space-4);
		}
		.card {
			padding: var(--mvp-space-6);
		}
	}
</style>
