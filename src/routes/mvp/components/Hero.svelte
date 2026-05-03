<script lang="ts">
	import CalendarDays from 'lucide-svelte/icons/calendar-days';
	import ChartColumn from 'lucide-svelte/icons/chart-column';
	import Check from 'lucide-svelte/icons/check';
	import ChevronRight from 'lucide-svelte/icons/chevron-right';
	import CloudUpload from 'lucide-svelte/icons/cloud-upload';
	import Database from 'lucide-svelte/icons/database';
	import FileText from 'lucide-svelte/icons/file-text';
	import Image from 'lucide-svelte/icons/image';
	import LockKeyhole from 'lucide-svelte/icons/lock-keyhole';
	import Monitor from 'lucide-svelte/icons/monitor';
	import Puzzle from 'lucide-svelte/icons/puzzle';
	import Rocket from 'lucide-svelte/icons/rocket';
	import Users from 'lucide-svelte/icons/users';

	const packageItems = [
		{
			icon: Image,
			title: 'LP',
			body: '訴求から申込までのランディングページ',
			side: 'left'
		},
		{
			icon: LockKeyhole,
			title: 'ログイン認証',
			body: '安全な認証・認可でユーザーを管理',
			side: 'left'
		},
		{
			icon: ChartColumn,
			title: '管理画面',
			body: 'データ管理や運用に必要な管理機能',
			side: 'left'
		},
		{
			icon: Database,
			title: 'データベース',
			body: 'データの保存・管理を最適な設計で構築',
			side: 'right'
		},
		{
			icon: Puzzle,
			title: 'API連携',
			body: '外部サービスとのAPI連携を実装',
			side: 'right'
		},
		{
			icon: CloudUpload,
			title: 'デプロイ',
			body: '本番環境へのデプロイと運用サポート',
			side: 'right'
		}
	];

	const processSteps = [
		{
			icon: Users,
			title: 'ヒアリング・要件定義',
			body: '課題やアイデアを整理'
		},
		{
			icon: Monitor,
			title: '設計・開発',
			body: '迅速に開発を進行'
		},
		{
			icon: FileText,
			title: '中間デモ・フィードバック',
			body: 'デモで確認・軌道修正'
		},
		{
			icon: Rocket,
			title: '公開・運用サポート',
			body: '最短でリリース、その後も支援'
		}
	];
</script>

<section class="mvp-hero" id="top" aria-labelledby="hero-heading">
	<div class="mvp-hero__inner">
		<div class="mvp-hero__copy">
			<h1 id="hero-heading" class="mvp-hero__heading">
				<span class="mvp-hero__heading-line">MVPに必要なものを、</span><br />
				<span>1パッケージで。</span>
			</h1>

			<p class="mvp-hero__sub">
				LP・認証・管理画面・DB・API連携・デプロイまで、<br />
				<strong>¥500,000〜。</strong>
			</p>

			<div class="mvp-hero__ctas">
				<a href="#cta" class="mvp-hero__primary">
					<CalendarDays size={34} aria-hidden="true" />
					<span>30分の無料相談</span>
					<span class="mvp-hero__cta-arrow" aria-hidden="true">
						<ChevronRight size={34} />
					</span>
				</a>
				<a href="#services" class="mvp-hero__secondary">
					<FileText size={34} aria-hidden="true" />
					<span>詳細を見る</span>
					<span class="mvp-hero__cta-arrow" aria-hidden="true">
						<ChevronRight size={32} />
					</span>
				</a>
			</div>

			<div class="mvp-hero__assurance">
				<span class="mvp-hero__shield" aria-hidden="true">
					<Check size={34} strokeWidth={3} />
				</span>
				<div>
					<h2>中間デモで続行判断OK</h2>
					<p>開発の途中でデモをご確認いただき、続行するかどうかを判断できます。</p>
				</div>
			</div>
		</div>

		<div class="mvp-hero__diagram" aria-label="MVP開発パッケージ内容">
			<div class="mvp-hero__feature-column mvp-hero__feature-column--left">
				{#each packageItems.filter((item) => item.side === 'left') as item}
					<article class="mvp-hero__feature mvp-hero__feature--left">
						<span class="mvp-hero__feature-icon" aria-hidden="true">
							<svelte:component this={item.icon} size={52} strokeWidth={1.8} />
						</span>
						<div>
							<h3>{item.title}</h3>
							<p>{item.body}</p>
						</div>
					</article>
				{/each}
			</div>

			<div class="mvp-hero__price-wrap">
				<span class="mvp-hero__orbit" aria-hidden="true"></span>
				<div class="mvp-hero__price-card">
					<div class="mvp-hero__plan">
						<span class="mvp-hero__stars" aria-hidden="true">★ ★ ★</span>
						<span>STANDARD</span>
					</div>
					<div class="mvp-hero__price">
						<span>¥</span>500,000〜
						<small>（税抜）</small>
					</div>
					<div class="mvp-hero__price-divider"></div>
					<ul class="mvp-hero__timelines">
						<li>
							<span class="mvp-hero__timeline-icon" aria-hidden="true">
								<CalendarDays size={28} />
							</span>
							<span>最短 <strong>7日</strong>でデモ</span>
						</li>
						<li>
							<span class="mvp-hero__timeline-icon" aria-hidden="true">
								<Rocket size={28} />
							</span>
							<span><strong>2-4週間</strong>で公開</span>
						</li>
					</ul>
				</div>
			</div>

			<div class="mvp-hero__feature-column mvp-hero__feature-column--right">
				{#each packageItems.filter((item) => item.side === 'right') as item}
					<article class="mvp-hero__feature mvp-hero__feature--right">
						<span class="mvp-hero__feature-icon" aria-hidden="true">
							<svelte:component this={item.icon} size={52} strokeWidth={1.8} />
						</span>
						<div>
							<h3>{item.title}</h3>
							<p>{item.body}</p>
						</div>
					</article>
				{/each}
			</div>
		</div>
	</div>

	<div class="mvp-hero__process" aria-label="開発の流れ">
		{#each processSteps as step, index}
			<div class="mvp-hero__process-step">
				<span class="mvp-hero__process-icon" aria-hidden="true">
					<svelte:component this={step.icon} size={30} strokeWidth={1.8} />
				</span>
				<div>
					<h3>{step.title}</h3>
					<p>{step.body}</p>
				</div>
			</div>
			{#if index < processSteps.length - 1}
				<span class="mvp-hero__process-arrow" aria-hidden="true">
					<ChevronRight size={32} />
				</span>
			{/if}
		{/each}
	</div>
</section>

<style>
	.mvp-hero {
		overflow: hidden;
		padding: 28px 42px 28px;
		background:
			radial-gradient(900px 420px at 68% 42%, rgba(238, 243, 251, 0.95), transparent 68%),
			linear-gradient(180deg, #ffffff 0%, #fbfcff 100%);
	}

	.mvp-hero__inner {
		display: grid;
		grid-template-columns: minmax(560px, 0.9fr) minmax(840px, 1.35fr);
		align-items: center;
		gap: 24px;
		width: min(100%, 1560px);
		margin: 0 auto;
	}

	.mvp-hero__copy {
		padding-top: 8px;
	}

	.mvp-hero__heading {
		position: relative;
		display: inline-block;
		margin: 0 0 28px;
		color: var(--mvp-text);
		font-size: clamp(54px, 3.8vw, 68px);
		font-weight: 900;
		line-height: 1.34;
		letter-spacing: 0;
	}

	.mvp-hero__heading::after {
		content: '';
		position: absolute;
		left: 0;
		right: 20px;
		bottom: 0.08em;
		height: 6px;
		background: var(--mvp-accent);
		border-radius: 999px;
		z-index: 0;
	}

	.mvp-hero__heading span {
		position: relative;
		z-index: 1;
	}

	.mvp-hero__heading-line {
		white-space: nowrap;
	}

	.mvp-hero__sub {
		margin-bottom: 28px;
		color: var(--mvp-text);
		font-size: clamp(20px, 1.42vw, 24px);
		font-weight: 700;
		line-height: 1.65;
		letter-spacing: 0;
	}

	.mvp-hero__sub strong {
		color: var(--mvp-accent);
		font-size: clamp(30px, 2.2vw, 38px);
		font-weight: 900;
	}

	.mvp-hero__ctas {
		display: grid;
		gap: 14px;
		width: min(100%, 468px);
		margin-bottom: 30px;
	}

	.mvp-hero__primary,
	.mvp-hero__secondary {
		display: grid;
		grid-template-columns: 48px 1fr 34px;
		align-items: center;
		gap: 18px;
		min-height: 76px;
		padding: 0 28px 0 50px;
		border-radius: 8px;
		font-size: 27px;
		font-weight: 900;
		line-height: 1.1;
		letter-spacing: 0;
	}

	.mvp-hero__primary {
		color: var(--mvp-white);
		background: linear-gradient(180deg, #ff7a17 0%, #ff6508 100%);
		box-shadow: 0 12px 24px rgba(255, 101, 8, 0.28);
	}

	.mvp-hero__primary:hover {
		color: var(--mvp-white);
		background: var(--mvp-accent-hover);
	}

	.mvp-hero__secondary {
		color: var(--mvp-text);
		background: var(--mvp-white);
		border: 2px solid var(--mvp-text);
		box-shadow: 0 4px 12px rgba(15, 27, 61, 0.05);
	}

	.mvp-hero__secondary:hover {
		color: var(--mvp-accent);
		border-color: var(--mvp-accent);
	}

	.mvp-hero__cta-arrow {
		justify-self: end;
	}

	.mvp-hero__assurance {
		display: flex;
		align-items: flex-start;
		gap: 18px;
		color: var(--mvp-text);
	}

	.mvp-hero__shield {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 52px;
		height: 58px;
		color: var(--mvp-white);
		background: var(--mvp-text);
		clip-path: polygon(50% 0, 92% 16%, 86% 70%, 50% 100%, 14% 70%, 8% 16%);
		flex: 0 0 auto;
	}

	.mvp-hero__assurance h2 {
		margin: 0 0 6px;
		font-size: 24px;
		font-weight: 900;
		letter-spacing: 0;
	}

	.mvp-hero__assurance p {
		color: var(--mvp-gray-600);
		font-size: 16px;
		font-weight: 700;
		line-height: 1.6;
	}

	.mvp-hero__diagram {
		display: grid;
		grid-template-columns: 210px minmax(300px, 1fr) 250px;
		align-items: center;
		gap: 58px;
		min-height: 530px;
	}

	.mvp-hero__feature-column {
		display: grid;
		gap: 18px;
		position: relative;
		z-index: 2;
	}

	.mvp-hero__feature {
		position: relative;
		display: grid;
		grid-template-columns: 64px 1fr;
		align-items: start;
		gap: 14px;
		min-height: 142px;
		padding: 22px 20px;
		border: 1px solid #dbe4f0;
		border-radius: 14px;
		background: rgba(255, 255, 255, 0.96);
		box-shadow:
			0 2px 8px rgba(15, 27, 61, 0.06),
			0 14px 32px rgba(15, 27, 61, 0.08);
	}

	.mvp-hero__feature::before {
		content: '';
		position: absolute;
		top: 50%;
		width: 62px;
		height: 2px;
		background: var(--mvp-text);
	}

	.mvp-hero__feature::after {
		content: '';
		position: absolute;
		top: calc(50% - 6px);
		width: 12px;
		height: 12px;
		border-radius: 50%;
		background: var(--mvp-accent);
	}

	.mvp-hero__feature--left::before {
		right: -62px;
	}

	.mvp-hero__feature--left::after {
		right: -6px;
	}

	.mvp-hero__feature--right::before {
		left: -62px;
	}

	.mvp-hero__feature--right::after {
		left: -6px;
	}

	.mvp-hero__feature-icon {
		color: var(--mvp-text);
	}

	.mvp-hero__feature h3 {
		margin: 4px 0 12px;
		font-size: 20px;
		font-weight: 900;
		letter-spacing: 0;
		line-height: 1.25;
	}

	.mvp-hero__feature p {
		color: var(--mvp-text);
		font-size: 15px;
		font-weight: 700;
		line-height: 1.55;
	}

	.mvp-hero__price-wrap {
		position: relative;
		display: grid;
		place-items: center;
		min-height: 500px;
	}

	.mvp-hero__orbit {
		position: absolute;
		width: min(38vw, 420px);
		aspect-ratio: 1 / 1;
		border: 2px dashed #d2deef;
		border-radius: 50%;
	}

	.mvp-hero__price-card {
		position: relative;
		z-index: 1;
		width: min(100%, 330px);
		overflow: hidden;
		border-radius: 16px;
		background: var(--mvp-white);
		box-shadow:
			0 2px 10px rgba(15, 27, 61, 0.08),
			0 20px 42px rgba(15, 27, 61, 0.13);
	}

	.mvp-hero__plan {
		display: grid;
		justify-items: center;
		gap: 4px;
		padding: 13px 18px 12px;
		background: linear-gradient(180deg, #05276b 0%, #08245a 100%);
		color: var(--mvp-white);
		font-size: 27px;
		font-weight: 900;
		letter-spacing: 0.06em;
		line-height: 1;
	}

	.mvp-hero__stars {
		color: var(--mvp-accent);
		font-size: 20px;
		letter-spacing: 0.08em;
	}

	.mvp-hero__price {
		display: grid;
		justify-items: center;
		padding: 38px 20px 18px;
		color: var(--mvp-accent);
		font-size: 52px;
		font-weight: 900;
		letter-spacing: 0;
		line-height: 0.9;
	}

	.mvp-hero__price span {
		display: inline;
		font-size: 36px;
	}

	.mvp-hero__price small {
		margin-top: 14px;
		color: var(--mvp-gray-600);
		font-size: 16px;
		font-weight: 800;
	}

	.mvp-hero__price-divider {
		height: 2px;
		margin: 8px 32px 22px;
		background: #d4ddea;
	}

	.mvp-hero__timelines {
		display: grid;
		gap: 16px;
		padding: 0 30px 32px;
	}

	.mvp-hero__timelines li {
		display: grid;
		grid-template-columns: 48px 1fr;
		align-items: center;
		gap: 16px;
		color: var(--mvp-text);
		font-size: 21px;
		font-weight: 900;
		line-height: 1.2;
	}

	.mvp-hero__timelines strong {
		color: var(--mvp-accent);
		font-size: 34px;
	}

	.mvp-hero__timeline-icon {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 48px;
		height: 48px;
		border-radius: 50%;
		background: var(--mvp-text);
		color: var(--mvp-white);
	}

	.mvp-hero__process {
		display: grid;
		grid-template-columns: 1fr auto 1fr auto 1fr auto 1fr;
		align-items: center;
		gap: 28px;
		width: min(100%, 1560px);
		margin: 22px auto 0;
		padding-top: 22px;
		border-top: 1px solid #d6dfec;
	}

	.mvp-hero__process-step {
		display: grid;
		grid-template-columns: 66px 1fr;
		align-items: center;
		gap: 16px;
		min-width: 0;
	}

	.mvp-hero__process-icon {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 66px;
		height: 66px;
		border: 1px solid #d6dfec;
		border-radius: 50%;
		background: var(--mvp-white);
		color: var(--mvp-text);
	}

	.mvp-hero__process-step h3 {
		margin: 0 0 6px;
		font-size: 18px;
		font-weight: 900;
		letter-spacing: 0;
		line-height: 1.35;
	}

	.mvp-hero__process-step p {
		color: var(--mvp-gray-600);
		font-size: 14px;
		font-weight: 700;
		line-height: 1.45;
	}

	.mvp-hero__process-arrow {
		color: var(--mvp-text);
		opacity: 0.75;
	}

	@media (max-width: 1380px) {
		.mvp-hero {
			padding-inline: 28px;
		}

		.mvp-hero__inner {
			grid-template-columns: minmax(480px, 0.86fr) minmax(680px, 1.4fr);
			gap: 34px;
		}

		.mvp-hero__diagram {
			grid-template-columns: 208px minmax(280px, 1fr) 224px;
			gap: 48px;
		}

		.mvp-hero__feature {
			grid-template-columns: 56px 1fr;
			min-height: 144px;
			padding: 22px 20px;
		}

		.mvp-hero__feature::before {
			width: 56px;
		}

		.mvp-hero__feature--left::before {
			right: -56px;
		}

		.mvp-hero__feature--right::before {
			left: -56px;
		}

		.mvp-hero__feature h3 {
			font-size: 20px;
		}

		.mvp-hero__feature p {
			font-size: 15px;
		}
	}

	@media (max-width: 1120px) {
		.mvp-hero__inner {
			grid-template-columns: 1fr;
			gap: 48px;
		}

		.mvp-hero__copy {
			max-width: 720px;
		}

		.mvp-hero__diagram {
			grid-template-columns: 1fr minmax(300px, 360px) 1fr;
		}

		.mvp-hero__process {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}

		.mvp-hero__process-arrow {
			display: none;
		}
	}

	@media (max-width: 820px) {
		.mvp-hero {
			padding: 38px 18px 24px;
		}

		.mvp-hero__heading {
			font-size: 42px;
			line-height: 1.28;
			margin-bottom: 24px;
		}

		.mvp-hero__sub {
			font-size: 18px;
		}

		.mvp-hero__sub br {
			display: none;
		}

		.mvp-hero__primary,
		.mvp-hero__secondary {
			grid-template-columns: 40px 1fr 28px;
			min-height: 68px;
			padding: 0 18px;
			font-size: 20px;
		}

		.mvp-hero__diagram {
			grid-template-columns: 1fr;
			gap: 20px;
			min-height: 0;
		}

		.mvp-hero__feature-column {
			gap: 14px;
		}

		.mvp-hero__feature-column--left {
			order: 2;
		}

		.mvp-hero__price-wrap {
			order: 1;
			min-height: 390px;
		}

		.mvp-hero__feature-column--right {
			order: 3;
		}

		.mvp-hero__feature {
			min-height: auto;
		}

		.mvp-hero__feature::before,
		.mvp-hero__feature::after {
			display: none;
		}

		.mvp-hero__orbit {
			width: min(86vw, 360px);
		}

		.mvp-hero__process {
			grid-template-columns: 1fr;
			gap: 18px;
		}
	}

	@media (max-width: 480px) {
		.mvp-hero__heading {
			font-size: 36px;
		}

		.mvp-hero__assurance h2 {
			font-size: 20px;
		}

		.mvp-hero__price-card {
			width: 100%;
		}

		.mvp-hero__price {
			font-size: 48px;
		}
	}
</style>
