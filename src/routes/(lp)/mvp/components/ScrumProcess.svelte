<script lang="ts">
	import Rocket from 'lucide-svelte/icons/rocket';

	type Day = {
		day: number;
		label: string;
		body: string;
	};

	const days: Day[] = [
		{
			day: 1,
			label: 'キックオフ・範囲整理',
			body: '30分で意思決定者と直接対話。見せたい体験と後回しにする機能を決める。'
		},
		{ day: 2, label: '設計・画面ワイヤー', body: 'ユーザーストーリーと3〜5画面のワイヤーを共有。' },
		{ day: 3, label: 'コア実装スタート', body: '認証・DB・主要画面の実装に着手。' },
		{ day: 4, label: '実装＋並行レビュー', body: 'フロント・バックを並走。日次で進捗共有。' },
		{ day: 5, label: 'テスト・QA', body: '選んだ体験を通しで検証。優先度順に潰す。' },
		{ day: 6, label: 'デモ仕上げ', body: 'コピー・UI・操作感を、判断に必要な水準まで調整。' },
		{
			day: 7,
			label: '初回デモ共有',
			body: 'ステージングで実機デモ。次に広げる範囲を一緒に決める。'
		}
	];
</script>

<section id="process" class="mvp-section scrum" aria-labelledby="scrum-heading">
	<div class="mvp-container">
		<header class="head">
			<span class="mvp-eyebrow">SCRUM PROCESS</span>
			<h2 id="scrum-heading" class="mvp-heading-2">契約から最短1週間で、初回デモまで。</h2>
			<p class="mvp-lead">
				条件が合えば、キックオフから最短7日で初回デモを共有。毎日進捗が見える形で、検証範囲に絞ってスプリントを回します。
			</p>
		</header>

		<div class="cycle-wrap">
			<div class="cycle" aria-hidden="true">
				<span class="cycle__ring"></span>
				<span class="cycle__ring cycle__ring--inner"></span>

				<div class="cycle__center">
					<span class="cycle__center-bubble">
						<Rocket size={28} strokeWidth={2.2} aria-hidden="true" />
					</span>
					<span class="cycle__center-eyebrow">7-DAY</span>
					<span class="cycle__center-title">SPRINT</span>
				</div>

				<ol class="cycle__nodes">
					{#each days as d, i (d.day)}
						<li class="cycle__node" style="--i: {i};">
							<div class="cycle__node-inner">
								<span class="cycle__pill">
									<span class="cycle__pill-num">{d.day}</span>
									<span class="cycle__pill-label">DAY</span>
								</span>
								<span class="cycle__node-label">{d.label}</span>
							</div>
						</li>
					{/each}
				</ol>
			</div>

			<ul class="cycle__legend" aria-label="DAY 1 から DAY 7 までの内訳">
				{#each days as d (d.day)}
					<li class="cycle__legend-item">
						<span class="cycle__legend-num">DAY {d.day}</span>
						<div class="cycle__legend-text">
							<strong>{d.label}</strong>
							<span>{d.body}</span>
						</div>
					</li>
				{/each}
			</ul>
		</div>
	</div>
</section>

<style>
	.scrum {
		background: linear-gradient(180deg, var(--mvp-bg) 0%, var(--mvp-bg-soft-orange) 100%);
		overflow: hidden;
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

	.cycle-wrap {
		display: grid;
		grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
		align-items: center;
		gap: var(--mvp-space-12);
	}

	/* === circle === */
	.cycle {
		--size: min(520px, 88vw);
		--radius: calc(var(--size) / 2 - 70px);
		position: relative;
		width: var(--size);
		height: var(--size);
		margin: 0 auto;
		animation: cycle-spin 120s linear infinite;
	}

	.cycle__ring {
		position: absolute;
		inset: 36px;
		border-radius: 50%;
		border: 1px dashed var(--mvp-orange-200);
		opacity: 0.85;
	}

	.cycle__ring--inner {
		inset: 90px;
		border-style: solid;
		border-color: var(--mvp-orange-100);
		background: radial-gradient(circle at 50% 50%, var(--mvp-orange-50) 0%, var(--mvp-white) 75%);
		box-shadow: inset 0 0 60px rgba(255, 136, 56, 0.12);
	}

	.cycle__center {
		position: absolute;
		top: 50%;
		left: 50%;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: var(--mvp-space-2);
		padding: var(--mvp-space-4);
		text-align: center;
		transform: translate(-50%, -50%);
		animation:
			cycle-counter-center 120s linear infinite,
			cycle-float 6s ease-in-out infinite;
	}

	.cycle__center-bubble {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 64px;
		height: 64px;
		border-radius: 50%;
		background: var(--mvp-gradient-cta);
		color: var(--mvp-text-on-orange);
		box-shadow: 0 12px 28px rgba(237, 87, 8, 0.35);
	}

	.cycle__center-eyebrow {
		font-family: var(--mvp-font-heading);
		font-size: 0.75rem;
		font-weight: var(--mvp-fw-bold);
		letter-spacing: var(--mvp-ls-wide);
		color: var(--mvp-text-muted);
	}

	.cycle__center-title {
		font-family: var(--mvp-font-heading);
		font-size: 1.5rem;
		font-weight: var(--mvp-fw-black);
		letter-spacing: var(--mvp-ls-wide);
		color: var(--mvp-navy-900);
		line-height: 1;
	}

	.cycle__nodes {
		position: absolute;
		inset: 0;
		list-style: none;
		margin: 0;
		padding: 0;
	}

	.cycle__node {
		--angle: calc(var(--i) * (360deg / 7));
		position: absolute;
		top: 50%;
		left: 50%;
		width: 0;
		height: 0;
		transform: rotate(var(--angle)) translate(0, calc(var(--radius) * -1));
	}

	.cycle__node-inner {
		position: absolute;
		top: 0;
		left: 0;
		width: 144px;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: var(--mvp-space-2);
		padding: var(--mvp-space-3) var(--mvp-space-3) var(--mvp-space-4);
		background: var(--mvp-white);
		border: 1px solid var(--mvp-border);
		border-radius: 18px;
		box-shadow: 0 10px 24px rgba(15, 27, 61, 0.08);
		text-align: center;
		transform: translate(-50%, -50%) rotate(calc(var(--angle) * -1));
		animation: cycle-counter-node 120s linear infinite;
	}

	.cycle__pill {
		display: inline-flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 2px;
		width: 52px;
		height: 52px;
		border-radius: 50%;
		background: var(--mvp-gradient-cta);
		color: var(--mvp-text-on-orange);
		box-shadow: 0 6px 14px rgba(237, 87, 8, 0.32);
		animation: cycle-pulse 9.8s ease-in-out infinite;
		animation-delay: calc(var(--i) * 1.4s);
	}

	.cycle__pill-num {
		font-family: var(--mvp-font-heading);
		font-weight: var(--mvp-fw-black);
		font-size: 1.25rem;
		line-height: 1;
	}

	.cycle__pill-label {
		font-size: 0.625rem;
		font-weight: var(--mvp-fw-bold);
		letter-spacing: var(--mvp-ls-wide);
		opacity: 0.92;
	}

	.cycle__node-label {
		font-family: var(--mvp-font-heading);
		font-size: 0.78rem;
		font-weight: var(--mvp-fw-bold);
		line-height: var(--mvp-lh-snug);
		color: var(--mvp-text);
	}

	/* === legend (textual list, accessible & SEO friendly) === */
	.cycle__legend {
		list-style: none;
		margin: 0;
		padding: 0;
		display: grid;
		gap: var(--mvp-space-4);
	}

	.cycle__legend-item {
		display: grid;
		grid-template-columns: 72px 1fr;
		gap: var(--mvp-space-4);
		align-items: baseline;
		padding-bottom: var(--mvp-space-3);
		border-bottom: 1px dashed var(--mvp-border);
	}

	.cycle__legend-item:last-child {
		border-bottom: none;
	}

	.cycle__legend-num {
		font-family: var(--mvp-font-heading);
		font-size: var(--mvp-fs-body-sm);
		font-weight: var(--mvp-fw-black);
		letter-spacing: var(--mvp-ls-wide);
		color: var(--mvp-accent);
	}

	.cycle__legend-text strong {
		display: block;
		font-size: var(--mvp-fs-body);
		font-weight: var(--mvp-fw-bold);
		color: var(--mvp-text);
		margin-bottom: 4px;
	}

	.cycle__legend-text span {
		font-size: var(--mvp-fs-body-sm);
		color: var(--mvp-text-muted);
		line-height: var(--mvp-lh-normal);
	}

	/* === animations === */
	@keyframes cycle-spin {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(360deg);
		}
	}

	/* center counter-rotates so its content stays upright while .cycle spins */
	@keyframes cycle-counter-center {
		from {
			transform: translate(-50%, -50%) rotate(0deg);
		}
		to {
			transform: translate(-50%, -50%) rotate(-360deg);
		}
	}

	/* each node counter-rotates around its own center to keep text upright */
	@keyframes cycle-counter-node {
		from {
			transform: translate(-50%, -50%) rotate(calc(var(--angle, 0deg) * -1)) rotate(0deg);
		}
		to {
			transform: translate(-50%, -50%) rotate(calc(var(--angle, 0deg) * -1)) rotate(-360deg);
		}
	}

	@keyframes cycle-float {
		0%,
		100% {
			translate: 0 0;
		}
		50% {
			translate: 0 -6px;
		}
	}

	@keyframes cycle-pulse {
		0%,
		78%,
		100% {
			box-shadow: 0 6px 14px rgba(237, 87, 8, 0.32);
			transform: scale(1);
		}
		8% {
			box-shadow:
				0 0 0 12px rgba(255, 136, 56, 0),
				0 6px 14px rgba(237, 87, 8, 0.55);
			transform: scale(1.12);
		}
		16% {
			box-shadow:
				0 0 0 0 rgba(255, 136, 56, 0),
				0 6px 14px rgba(237, 87, 8, 0.32);
			transform: scale(1);
		}
	}

	/* === responsive === */
	@media (max-width: 1100px) {
		.cycle-wrap {
			grid-template-columns: 1fr;
			gap: var(--mvp-space-16);
		}

		.cycle {
			--size: min(480px, 92vw);
		}
	}

	@media (max-width: 768px) {
		.cycle {
			--size: min(420px, 92vw);
			--radius: calc(var(--size) / 2 - 60px);
		}

		.cycle__node-inner {
			width: 120px;
		}

		.cycle__pill {
			width: 46px;
			height: 46px;
		}

		.cycle__pill-num {
			font-size: 1.05rem;
		}

		.cycle__node-label {
			font-size: 0.72rem;
		}
	}

	@media (max-width: 560px) {
		/* fallback: hide circle, legend list becomes the timeline with stagger fade-in */
		.cycle {
			display: none;
		}

		.cycle__legend {
			gap: var(--mvp-space-5);
		}

		.cycle__legend-item {
			grid-template-columns: 64px 1fr;
			animation: cycle-fade-up 0.6s ease-out both;
		}

		.cycle__legend-item:nth-child(1) {
			animation-delay: 0ms;
		}
		.cycle__legend-item:nth-child(2) {
			animation-delay: 80ms;
		}
		.cycle__legend-item:nth-child(3) {
			animation-delay: 160ms;
		}
		.cycle__legend-item:nth-child(4) {
			animation-delay: 240ms;
		}
		.cycle__legend-item:nth-child(5) {
			animation-delay: 320ms;
		}
		.cycle__legend-item:nth-child(6) {
			animation-delay: 400ms;
		}
		.cycle__legend-item:nth-child(7) {
			animation-delay: 480ms;
		}
	}

	@keyframes cycle-fade-up {
		from {
			opacity: 0;
			transform: translateY(12px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.cycle,
		.cycle__center,
		.cycle__node-inner,
		.cycle__pill,
		.cycle__legend-item {
			animation: none !important;
		}
	}
</style>
