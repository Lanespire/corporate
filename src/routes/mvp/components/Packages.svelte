<script lang="ts">
	import { fade } from 'svelte/transition';
	import {
		Check,
		ArrowRight,
		X,
		Rocket,
		FileSignature,
		Eye,
		PackageCheck,
		ShieldCheck,
		Plus,
		LayoutGrid,
		Plug,
		Palette,
		Smartphone,
		Sparkles,
		Globe,
		ServerCog,
		LifeBuoy
	} from 'lucide-svelte';

	type Feature = {
		title: string;
		detail: string;
	};

	type PaymentStep = {
		label: string;
		amount: string;
		percent: string;
		timing: string;
		note: string;
		Icon: typeof FileSignature;
	};

	type AddonOption = {
		title: string;
		detail: string;
		price: string;
		Icon: typeof Plus;
	};

	const features: Feature[] = [
		{ title: 'ランディングページ', detail: '戦略設計＋コピー＋デザイン＋実装' },
		{ title: 'ログイン認証', detail: 'メール／OAuth（Google・GitHub等）対応' },
		{ title: '管理画面', detail: 'CRUD・ロール別アクセス制御・監査ログ' },
		{ title: 'データベース設計', detail: 'スキーマ設計・マイグレーション・バックアップ' },
		{ title: 'コア機能 2-3画面', detail: 'プロダクトの中核となるユーザー向け画面' },
		{ title: 'API連携', detail: 'Stripe決済・Slack通知・LLM API 等' },
		{ title: 'デプロイ', detail: 'Netlify／Vercel／独自ドメイン・SSL' },
		{ title: 'ドキュメント・運用引き継ぎ', detail: 'README／環境構築手順／運用Runbook' }
	];

	const paymentSteps: PaymentStep[] = [
		{
			label: '開発開始',
			amount: '¥125,000',
			percent: '着手分のみ',
			timing: '契約時',
			note: '要件を固めて初回デモへ',
			Icon: FileSignature
		},
		{
			label: '中間デモ',
			amount: '¥125,000',
			percent: '続行判断',
			timing: '最短7日',
			note: '触って確認してから進める',
			Icon: Eye
		},
		{
			label: '公開前確認',
			amount: '¥250,000',
			percent: '最終調整',
			timing: '2-4週間',
			note: '公開前に品質と運用を確認',
			Icon: PackageCheck
		}
	];

	const addons: AddonOption[] = [
		{
			title: '画面をもう少し増やしたい',
			detail: 'ユーザー画面・管理画面を1画面単位で追加',
			price: '¥80,000〜',
			Icon: Plus
		},
		{
			title: '一連の業務フローを作りたい',
			detail: '申請、予約、審査など複数画面の流れを追加',
			price: '¥150,000〜',
			Icon: LayoutGrid
		},
		{
			title: '外部サービスとつなぎたい',
			detail: '決済、通知、メール、CRMなどの連携を追加',
			price: '¥50,000〜/件',
			Icon: Plug
		},
		{
			title: 'ブランドに合わせたい',
			detail: 'ロゴ、色、トーンに合わせてUIを調整',
			price: '¥100,000〜',
			Icon: Palette
		},
		{
			title: 'スマホアプリでも使いたい',
			detail: 'iOS／Android向けのアプリ版を追加開発',
			price: '¥300,000〜',
			Icon: Smartphone
		},
		{
			title: 'AI機能を入れたい',
			detail: '要約、チャット、分類、生成などを組み込み',
			price: '¥150,000〜',
			Icon: Sparkles
		},
		{
			title: '多言語で公開したい',
			detail: '日本語／英語など複数言語の切替に対応',
			price: '¥80,000〜',
			Icon: Globe
		},
		{
			title: '指定の環境で動かしたい',
			detail: 'AWSなど独自インフラや社内環境に合わせて構築',
			price: '¥120,000〜',
			Icon: ServerCog
		},
		{
			title: '公開後も相談したい',
			detail: '監視、障害対応、小さな改善を月次で支援',
			price: '¥30,000〜/月',
			Icon: LifeBuoy
		}
	];

	const problems: string[] = [
		'アイデアはあるが、見せられる「動くプロダクト」がない',
		'既存ベンダーに頼むと、半年・¥1,500,000〜¥3,000,000の見積りが返ってくる',
		'内製では工数が読めず、本業の手が止まる',
		'LP・認証・管理画面・DB・API連携を別々に発注すると、結合と運用で破綻する',
		'PoCに数百万円かけたが、本番運用に乗らず止まっている'
	];

	const approach: string[] = [
		'LP・認証・管理画面・DB・コア機能をワンチームでワンストップ担当',
		'契約から最短7日で中間デモ、リリースまで2-4週間',
		'Next.js／Supabase／Vercelの標準スタックで、移管・内製化も容易',
		'修正回数の上限なし。中間デモのフィードバックを即反映',
		'運用開始後はスクラム月額契約に切り替えて継続開発も可能'
	];

	let isModalOpen = false;

	function openModal() {
		isModalOpen = true;
	}

	function closeModal() {
		isModalOpen = false;
	}

	function closeModalAndGoToContact() {
		closeModal();
		if (typeof document === 'undefined') return;
		requestAnimationFrame(() => {
			document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
		});
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape' && isModalOpen) closeModal();
	}

	function handleBackdropClick(event: MouseEvent) {
		if (event.target !== event.currentTarget) return;
		if (isModalOpen) closeModal();
	}
</script>

<svelte:window on:keydown={handleKeydown} />

<section id="services" class="mvp-section mvp-section--subtle packages">
	<div class="mvp-container">
		<header class="packages__header">
			<span class="mvp-eyebrow">SERVICES</span>
			<h2 class="mvp-heading-2">MVPまるごと開発</h2>
			<p class="mvp-lead packages__lead">
				LP・認証・管理画面・データベース・コア機能を1セットに。<br />
				¥500,000〜で MVP を立ち上げます。
			</p>
		</header>

		<article class="hero-card">
			<div class="hero-card__ribbon">STANDARD</div>

			<div class="hero-card__head">
				<div class="hero-card__badge">
					<Rocket size={28} strokeWidth={1.75} />
				</div>
				<h3 class="hero-card__title">MVP丸ごと開発</h3>
				<p class="hero-card__tagline">
					投資家ピッチも、初期ユーザー検証も、社内導入も。<br />
					必要なものを、1パッケージで。
				</p>
			</div>

			<div class="hero-card__price-block">
				<div class="hero-card__price-anchor">
					<span class="hero-card__price-anchor-label">業界相場</span>
					<span class="hero-card__price-anchor-value">¥1,500,000 - 3,000,000</span>
				</div>
				<div class="hero-card__price-row">
					<span class="hero-card__price">¥500,000</span>
					<span class="hero-card__price-tail">〜</span>
				</div>
				<p class="hero-card__price-note">税抜・固定料金パッケージ</p>
				<p class="hero-card__duration">契約から最短7日でデモ、リリースまで2-4週間</p>
			</div>

			<div class="hero-card__features">
				<p class="hero-card__features-label">含まれる開発内容</p>
				<ul class="hero-card__features-list">
					{#each features as feature}
						<li>
							<span class="hero-card__check" aria-hidden="true">
								<Check size={14} strokeWidth={3} />
							</span>
							<div>
								<p class="hero-card__feature-title">{feature.title}</p>
								<p class="hero-card__feature-detail">{feature.detail}</p>
							</div>
						</li>
					{/each}
				</ul>
			</div>

			<div class="hero-card__actions">
				<button
					type="button"
					class="hero-card__cta"
					on:click={closeModalAndGoToContact}
				>
					このパッケージを相談する
					<ArrowRight size={17} />
				</button>
				<button
					type="button"
					class="hero-card__detail-link"
					on:click={openModal}
					aria-haspopup="dialog"
				>
					詳細を見る
					<ArrowRight size={16} strokeWidth={2} />
				</button>
			</div>
		</article>

		<section class="payment" aria-labelledby="payment-title">
			<header class="payment__header">
				<span class="mvp-eyebrow">CHECKPOINT</span>
				<h3 id="payment-title" class="payment__title">中間デモで続行判断できます</h3>
				<p class="payment__lead">
					最短7日でブラウザ上のデモを共有します。画面・操作感・方向性を確認してから、<br />
					<strong>続行するか、ここで止めるかを判断できます。</strong>
				</p>
			</header>

			<ol class="payment__timeline">
				{#each paymentSteps as step, i}
					{@const StepIcon = step.Icon}
					<li
						class="payment-step"
						class:payment-step--final={i === paymentSteps.length - 1}
						class:payment-step--decision={i === 1}
					>
						<div class="payment-step__icon">
							<StepIcon size={22} strokeWidth={1.75} />
						</div>
						<div class="payment-step__body">
							<p class="payment-step__timing">{step.timing}</p>
							<p class="payment-step__label">{step.label}</p>
							<p class="payment-step__amount">{step.percent}</p>
							<p class="payment-step__note">{step.note}</p>
						</div>
					</li>
				{/each}
			</ol>

			<aside class="payment-assurance" aria-label="Preview後の続行判断について">
				<div class="payment-assurance__icon" aria-hidden="true">
					<ShieldCheck size={28} strokeWidth={1.75} />
				</div>
				<div class="payment-assurance__body">
					<p class="payment-assurance__title">最初の判断材料を早く出します</p>
					<p class="payment-assurance__text">
						資料だけで進めず、実際に触れる状態で確認します。中間デモで品質と方向性を確かめてから、公開に向けた実装へ進みます。
					</p>
				</div>
			</aside>

			<p class="payment__footnote">
				※ 費用の分割タイミングは案件内容に合わせて調整できます。
			</p>
		</section>

		<section class="addons" aria-labelledby="addons-title">
			<header class="addons__header">
				<span class="mvp-eyebrow">EXPAND SCOPE</span>
				<h3 id="addons-title" class="addons__title">必要に応じて広げられる範囲</h3>
				<p class="addons__lead">
					まずは標準パッケージでMVPを形にします。検証に必要な範囲が見えたら、<br />
					画面・連携・運用などを必要な分だけ足していきます。
				</p>
			</header>

			<ul class="addons__grid">
				{#each addons as addon}
					{@const AddonIcon = addon.Icon}
					<li class="addon-card">
						<div class="addon-card__icon" aria-hidden="true">
							<AddonIcon size={20} strokeWidth={1.75} />
						</div>
						<div class="addon-card__body">
							<p class="addon-card__title">{addon.title}</p>
							<p class="addon-card__detail">{addon.detail}</p>
						</div>
						<p class="addon-card__price">{addon.price}</p>
					</li>
				{/each}
			</ul>

			<p class="addons__footnote">
				※ いきなり全部を決める必要はありません。中間デモ後に優先順位を見直せます。
			</p>
		</section>
	</div>
</section>

{#if isModalOpen}
	<div
		class="pkg-modal-backdrop"
		role="presentation"
		on:click={handleBackdropClick}
		transition:fade={{ duration: 120 }}
	>
		<div
			class="pkg-modal"
			role="dialog"
			aria-modal="true"
			aria-labelledby="pkg-modal-title"
			tabindex="-1"
		>
			<button class="pkg-modal__close" type="button" aria-label="閉じる" on:click={closeModal}>
				<X size={20} />
			</button>

			<div class="pkg-modal__visual">
				<div class="pkg-modal__visual-fallback" aria-hidden="true">
					<Rocket size={88} strokeWidth={1.4} />
				</div>
			</div>

			<div class="pkg-modal__copy">
				<p class="pkg-modal__tag">MVP STANDARD</p>
				<h3 id="pkg-modal-title" class="pkg-modal__title">MVP丸ごと開発</h3>
				<p class="pkg-modal__tagline">
					LP・認証・管理画面・データベース・コア機能を1セットに。¥500,000〜で MVP を立ち上げます。
				</p>

				<div class="pkg-modal__price-row">
					<span class="pkg-modal__price">¥500,000</span>
					<span class="pkg-modal__price-note">〜（税抜）</span>
					<span class="pkg-modal__meta">
						最短7日でデモ／2-4週間で納品
					</span>
				</div>

				<div class="pkg-modal__detail-grid">
					<div class="pkg-modal__problem-card">
						<h4>こんな課題に</h4>
						<ul>
							{#each problems as problem}
								<li>{problem}</li>
							{/each}
						</ul>
					</div>
					<div class="pkg-modal__approach-card">
						<h4>私たちのアプローチ</h4>
						<ul>
							{#each approach as step}
								<li>{step}</li>
							{/each}
						</ul>
					</div>
				</div>

				<div class="pkg-modal__includes">
					<h4>含まれる開発内容</h4>
					<ul>
						{#each features as feature}
							<li>
								<span class="pkg-modal__includes-check" aria-hidden="true">
									<Check size={12} strokeWidth={3} />
								</span>
								<span><strong>{feature.title}</strong>：{feature.detail}</span>
							</li>
						{/each}
					</ul>
				</div>

				<div class="pkg-modal__payment">
					<h4>中間デモで続行判断</h4>
					<ol>
						{#each paymentSteps as step}
							<li>
								<span class="pkg-modal__payment-timing">{step.timing}</span>
								<span class="pkg-modal__payment-label">{step.label}</span>
								<span class="pkg-modal__payment-amount">{step.percent}</span>
							</li>
						{/each}
					</ol>
					<p class="pkg-modal__payment-note">
						<ShieldCheck size={14} strokeWidth={2} />
						<span>
							最短7日の中間デモで<strong>続行 / 中止</strong>を選択可能。触ってから判断できます。
						</span>
					</p>
				</div>

				<div class="pkg-modal__result-band">
					<strong>支援後のイメージ</strong>
					<p>
						契約から2-4週間後には、LP から管理画面までを備えた MVP が稼働。投資家ピッチ・初期ユーザー検証・社内導入のいずれもこの1セットで動き始めます。
					</p>
				</div>

				<div class="pkg-modal__actions">
					<button class="pkg-modal__cta" type="button" on:click={closeModalAndGoToContact}>
						このパッケージを相談する
						<ArrowRight size={17} />
					</button>
				</div>
			</div>
		</div>
	</div>
{/if}

<style>
	.packages__header {
		text-align: center;
		max-width: 720px;
		margin: 0 auto var(--mvp-space-12);
	}

	.packages__lead {
		margin-top: var(--mvp-space-4);
	}

	/* ==============================================================
	   Hero Card — メインパッケージ1枚
	   ============================================================== */
	.hero-card {
		position: relative;
		max-width: 720px;
		margin: 0 auto;
		padding: var(--mvp-space-10) var(--mvp-space-10) var(--mvp-space-8);
		background: var(--mvp-white);
		border: 1px solid var(--mvp-border);
		border-radius: var(--mvp-radius-lg);
		box-shadow:
			0 24px 60px rgba(15, 27, 61, 0.08),
			0 4px 12px rgba(15, 27, 61, 0.04);
		display: flex;
		flex-direction: column;
		gap: var(--mvp-space-8);
	}

	.hero-card__ribbon {
		position: absolute;
		top: -14px;
		left: 50%;
		transform: translateX(-50%);
		padding: 6px 18px;
		font-size: var(--mvp-fs-eyebrow);
		font-weight: var(--mvp-fw-black);
		letter-spacing: 0.08em;
		color: var(--mvp-white);
		background: linear-gradient(135deg, var(--mvp-orange-500) 0%, var(--mvp-orange-400) 100%);
		border-radius: var(--mvp-radius-pill);
		box-shadow: 0 6px 16px rgba(255, 107, 26, 0.32);
	}

	.hero-card__head {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: var(--mvp-space-3);
		text-align: center;
	}

	.hero-card__badge {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 64px;
		height: 64px;
		border-radius: var(--mvp-radius-md);
		background: var(--mvp-orange-50);
		color: var(--mvp-orange-600);
	}

	.hero-card__title {
		font-size: var(--mvp-fs-h2);
		font-weight: var(--mvp-fw-black);
		color: var(--mvp-text);
		line-height: var(--mvp-lh-tight);
		letter-spacing: var(--mvp-ls-tight);
	}

	.hero-card__tagline {
		font-size: var(--mvp-fs-body);
		color: var(--mvp-text-muted);
		line-height: var(--mvp-lh-normal);
	}

	.hero-card__price-block {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: var(--mvp-space-2);
		padding: var(--mvp-space-6) var(--mvp-space-6);
		background: linear-gradient(180deg, #fff8f1 0%, var(--mvp-orange-50) 100%);
		border: 1px solid var(--mvp-orange-200);
		border-radius: var(--mvp-radius-card);
	}

	.hero-card__price-anchor {
		display: inline-flex;
		align-items: center;
		gap: var(--mvp-space-2);
		font-size: var(--mvp-fs-body-sm);
		color: var(--mvp-text-subtle);
	}

	.hero-card__price-anchor-label {
		font-weight: var(--mvp-fw-semibold);
		letter-spacing: 0.04em;
	}

	.hero-card__price-anchor-value {
		text-decoration: line-through;
		text-decoration-color: var(--mvp-text-subtle);
		font-weight: var(--mvp-fw-medium);
	}

	.hero-card__price-row {
		display: flex;
		align-items: baseline;
		gap: var(--mvp-space-1);
		line-height: 1;
	}

	.hero-card__price {
		font-family: var(--mvp-font-heading);
		font-size: clamp(3rem, 7vw, 4rem);
		font-weight: var(--mvp-fw-black);
		letter-spacing: var(--mvp-ls-tight);
		color: var(--mvp-text);
		line-height: 1;
	}

	.hero-card__price-tail {
		font-family: var(--mvp-font-heading);
		font-size: 1.75rem;
		font-weight: var(--mvp-fw-bold);
		color: var(--mvp-orange-600);
		line-height: 1;
	}

	.hero-card__price-note {
		font-size: var(--mvp-fs-body-sm);
		font-weight: var(--mvp-fw-semibold);
		color: var(--mvp-orange-700);
		letter-spacing: 0.02em;
	}

	.hero-card__duration {
		margin-top: var(--mvp-space-2);
		font-size: var(--mvp-fs-body-sm);
		color: var(--mvp-text-muted);
		line-height: var(--mvp-lh-normal);
	}

	.hero-card__features-label {
		font-size: var(--mvp-fs-eyebrow);
		font-weight: var(--mvp-fw-black);
		letter-spacing: 0.06em;
		color: var(--mvp-text-subtle);
		text-transform: uppercase;
		margin-bottom: var(--mvp-space-4);
		text-align: center;
	}

	.hero-card__features-list {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: var(--mvp-space-4) var(--mvp-space-6);
		margin: 0;
	}

	.hero-card__features-list li {
		display: flex;
		gap: var(--mvp-space-3);
		align-items: flex-start;
	}

	.hero-card__check {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 22px;
		height: 22px;
		border-radius: 50%;
		background: var(--mvp-orange-500);
		color: var(--mvp-white);
		flex-shrink: 0;
		margin-top: 2px;
	}

	.hero-card__feature-title {
		font-size: var(--mvp-fs-body-sm);
		font-weight: var(--mvp-fw-bold);
		color: var(--mvp-text);
		line-height: var(--mvp-lh-snug);
	}

	.hero-card__feature-detail {
		margin-top: 2px;
		font-size: 0.8125rem;
		color: var(--mvp-text-muted);
		line-height: var(--mvp-lh-normal);
	}

	.hero-card__actions {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: center;
		gap: var(--mvp-space-4);
		padding-top: var(--mvp-space-4);
		border-top: 1px solid var(--mvp-border);
	}

	.hero-card__cta {
		display: inline-flex;
		align-items: center;
		gap: 10px;
		padding: 1rem 2rem;
		font-size: var(--mvp-fs-body);
		font-weight: var(--mvp-fw-bold);
		color: var(--mvp-white);
		background: linear-gradient(135deg, var(--mvp-orange-500) 0%, var(--mvp-orange-400) 100%);
		border: none;
		border-radius: var(--mvp-radius-pill);
		box-shadow: var(--mvp-shadow-cta);
		cursor: pointer;
		transition:
			background var(--mvp-transition),
			box-shadow var(--mvp-transition),
			transform var(--mvp-transition-fast);
	}

	.hero-card__cta:hover {
		background: var(--mvp-orange-600);
		box-shadow: var(--mvp-shadow-cta-hover);
	}

	.hero-card__cta:active {
		transform: translateY(1px);
	}

	.hero-card__detail-link {
		display: inline-flex;
		align-items: center;
		gap: var(--mvp-space-2);
		font-size: var(--mvp-fs-body-sm);
		font-weight: var(--mvp-fw-semibold);
		color: var(--mvp-accent);
		background: none;
		border: none;
		padding: 0;
		cursor: pointer;
		transition: gap var(--mvp-transition-fast);
	}

	.hero-card__detail-link:hover {
		color: var(--mvp-accent-hover);
		gap: var(--mvp-space-3);
	}

	/* ==============================================================
	   Payment Timeline
	   ============================================================== */
	.payment {
		max-width: 720px;
		margin: var(--mvp-space-16) auto 0;
	}

	.payment__header {
		text-align: center;
		margin-bottom: var(--mvp-space-10);
	}

	.payment__title {
		margin-top: var(--mvp-space-3);
		font-size: var(--mvp-fs-h3);
		font-weight: var(--mvp-fw-black);
		color: var(--mvp-text);
		letter-spacing: var(--mvp-ls-tight);
	}

	.payment__lead {
		margin-top: var(--mvp-space-3);
		font-size: var(--mvp-fs-body-sm);
		color: var(--mvp-text-muted);
		line-height: var(--mvp-lh-normal);
	}

	.payment__timeline {
		position: relative;
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: var(--mvp-space-4);
		margin: 0;
		padding: 0;
		list-style: none;
	}

	.payment__timeline::before {
		content: '';
		position: absolute;
		top: 28px;
		left: calc(100% / 6);
		right: calc(100% / 6);
		height: 2px;
		background: linear-gradient(
			90deg,
			var(--mvp-orange-500) 0%,
			var(--mvp-orange-300) 50%,
			var(--mvp-orange-500) 100%
		);
		border-radius: 2px;
		z-index: 0;
	}

	.payment-step {
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: var(--mvp-space-3);
		text-align: center;
		z-index: 1;
	}

	.payment-step__icon {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 56px;
		height: 56px;
		border-radius: 50%;
		background: var(--mvp-white);
		border: 2px solid var(--mvp-orange-500);
		color: var(--mvp-orange-600);
		box-shadow: 0 6px 14px rgba(255, 107, 26, 0.18);
	}

	.payment-step--final .payment-step__icon {
		background: var(--mvp-orange-500);
		color: var(--mvp-white);
		box-shadow: 0 8px 18px rgba(255, 107, 26, 0.32);
	}

	.payment-step__body {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 4px;
	}

	.payment-step__timing {
		font-size: var(--mvp-fs-eyebrow);
		font-weight: var(--mvp-fw-semibold);
		color: var(--mvp-text-subtle);
		letter-spacing: 0.04em;
	}

	.payment-step__label {
		font-size: var(--mvp-fs-body);
		font-weight: var(--mvp-fw-bold);
		color: var(--mvp-text);
	}

	.payment-step__amount {
		display: inline-block;
		padding: 4px 12px;
		font-size: 0.8125rem;
		font-weight: var(--mvp-fw-bold);
		color: var(--mvp-orange-700);
		background: var(--mvp-orange-50);
		border: 1px solid var(--mvp-orange-200);
		border-radius: var(--mvp-radius-pill);
		line-height: 1.2;
	}

	.payment__lead strong {
		font-weight: var(--mvp-fw-black);
		color: var(--mvp-orange-700);
	}

	.payment-step__note {
		margin-top: 2px;
		font-size: 0.75rem;
		font-weight: var(--mvp-fw-semibold);
		color: var(--mvp-text-muted);
		line-height: var(--mvp-lh-snug);
		max-width: 14em;
	}

	.payment-step--decision .payment-step__note {
		color: #047857;
		font-weight: var(--mvp-fw-bold);
	}

	.payment-step--decision .payment-step__icon {
		border-color: #047857;
		color: #047857;
		box-shadow: 0 6px 14px rgba(4, 120, 87, 0.18);
	}

	.payment-step--decision .payment-step__amount {
		color: #047857;
		background: #ecfdf5;
		border-color: #6ee7b7;
	}

	/* ==============================================================
	   Payment Assurance Badge
	   ============================================================== */
	.payment-assurance {
		display: flex;
		gap: var(--mvp-space-4);
		align-items: flex-start;
		max-width: 720px;
		margin: var(--mvp-space-10) auto 0;
		padding: var(--mvp-space-5) var(--mvp-space-6);
		background: linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%);
		border: 1px solid #6ee7b7;
		border-radius: var(--mvp-radius-card);
		box-shadow: 0 8px 24px rgba(4, 120, 87, 0.08);
	}

	.payment-assurance__icon {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 44px;
		height: 44px;
		flex-shrink: 0;
		border-radius: 50%;
		background: #047857;
		color: var(--mvp-white);
		box-shadow: 0 6px 14px rgba(4, 120, 87, 0.28);
	}

	.payment-assurance__title {
		font-size: var(--mvp-fs-body);
		font-weight: var(--mvp-fw-black);
		color: #064e3b;
		line-height: var(--mvp-lh-snug);
		letter-spacing: var(--mvp-ls-tight);
	}

	.payment-assurance__text {
		margin-top: var(--mvp-space-2);
		font-size: var(--mvp-fs-body-sm);
		color: #065f46;
		line-height: var(--mvp-lh-normal);
	}

	.payment__footnote {
		margin-top: var(--mvp-space-8);
		text-align: center;
		font-size: var(--mvp-fs-body-sm);
		color: var(--mvp-text-subtle);
		line-height: var(--mvp-lh-normal);
	}

	/* ==============================================================
	   Add-ons (追加オプション目安料金)
	   ============================================================== */
	.addons {
		max-width: 960px;
		margin: var(--mvp-space-20) auto 0;
	}

	.addons__header {
		text-align: center;
		margin-bottom: var(--mvp-space-10);
	}

	.addons__title {
		margin-top: var(--mvp-space-3);
		font-size: var(--mvp-fs-h3);
		font-weight: var(--mvp-fw-black);
		color: var(--mvp-text);
		letter-spacing: var(--mvp-ls-tight);
	}

	.addons__lead {
		margin-top: var(--mvp-space-3);
		font-size: var(--mvp-fs-body-sm);
		color: var(--mvp-text-muted);
		line-height: var(--mvp-lh-normal);
	}

	.addons__grid {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: var(--mvp-space-4);
		margin: 0;
		padding: 0;
		list-style: none;
	}

	.addon-card {
		display: grid;
		grid-template-columns: auto 1fr auto;
		gap: var(--mvp-space-4);
		align-items: center;
		padding: var(--mvp-space-5) var(--mvp-space-6);
		background: var(--mvp-white);
		border: 1px solid var(--mvp-border);
		border-radius: var(--mvp-radius-card);
		transition:
			border-color var(--mvp-transition-fast),
			box-shadow var(--mvp-transition-fast),
			transform var(--mvp-transition-fast);
	}

	.addon-card:hover {
		border-color: var(--mvp-orange-200);
		box-shadow: 0 8px 22px rgba(15, 27, 61, 0.08);
		transform: translateY(-1px);
	}

	.addon-card__icon {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 40px;
		height: 40px;
		border-radius: 50%;
		background: var(--mvp-orange-50);
		color: var(--mvp-orange-600);
		flex-shrink: 0;
	}

	.addon-card__title {
		font-size: var(--mvp-fs-body-sm);
		font-weight: var(--mvp-fw-bold);
		color: var(--mvp-text);
		line-height: var(--mvp-lh-snug);
	}

	.addon-card__detail {
		margin-top: 2px;
		font-size: 0.8125rem;
		color: var(--mvp-text-muted);
		line-height: var(--mvp-lh-normal);
	}

	.addon-card__price {
		font-family: var(--mvp-font-heading);
		font-size: 1.0625rem;
		font-weight: var(--mvp-fw-black);
		color: var(--mvp-orange-600);
		letter-spacing: var(--mvp-ls-tight);
		white-space: nowrap;
		text-align: right;
	}

	.addons__footnote {
		margin-top: var(--mvp-space-8);
		text-align: center;
		font-size: var(--mvp-fs-body-sm);
		color: var(--mvp-text-subtle);
		line-height: var(--mvp-lh-normal);
	}

	/* ==============================================================
	   Modal — `/` の service-modal を踏襲
	   ============================================================== */
	.pkg-modal-backdrop {
		position: fixed;
		inset: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 28px;
		background: rgba(10, 24, 35, 0.42);
		z-index: 100;
	}

	.pkg-modal {
		position: relative;
		display: flex;
		flex-direction: column;
		width: min(100%, 720px);
		max-width: 720px;
		max-height: min(880px, calc(100vh - 56px));
		overflow: auto;
		background: #fff;
		border: 1px solid rgba(220, 232, 230, 0.9);
		border-radius: 14px;
		box-shadow: 0 30px 90px rgba(10, 24, 35, 0.28);
	}

	.pkg-modal__close {
		position: absolute;
		top: 16px;
		right: 16px;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 38px;
		height: 38px;
		border-radius: 999px;
		background: #fff;
		border: 1px solid #dbe5ed;
		color: #111;
		cursor: pointer;
		z-index: 2;
		transition: background 150ms ease;
	}

	.pkg-modal__close:hover {
		background: #f7f8fa;
		color: var(--mvp-orange-600);
	}

	.pkg-modal__visual {
		display: flex;
		align-items: center;
		justify-content: center;
		min-height: 200px;
		padding: 28px 28px 24px;
		background:
			radial-gradient(circle at 30% 25%, rgba(255, 122, 26, 0.22), transparent 55%),
			#fef5ef;
	}

	.pkg-modal__visual-fallback {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 160px;
		height: 160px;
		background: #fff;
		border: 1px solid #dbe5ed;
		border-radius: 18px;
		color: var(--mvp-orange-600);
		box-shadow: 0 22px 48px rgba(31, 50, 58, 0.08);
	}

	.pkg-modal__copy {
		padding: 36px 42px 38px;
	}

	.pkg-modal__tag {
		font-size: 13px;
		font-weight: 900;
		letter-spacing: 0.06em;
		color: var(--mvp-orange-600);
		margin-bottom: 10px;
		text-transform: uppercase;
	}

	.pkg-modal__title {
		font-size: 30px;
		font-weight: 900;
		line-height: 1.2;
		color: #111;
		margin-bottom: 10px;
	}

	.pkg-modal__tagline {
		font-size: 15px;
		font-weight: 650;
		color: #415264;
		line-height: 1.85;
		margin-bottom: 20px;
	}

	.pkg-modal__price-row {
		display: flex;
		align-items: baseline;
		flex-wrap: wrap;
		gap: 8px 16px;
		padding: 14px 18px;
		margin-bottom: 24px;
		background: #f7f8fa;
		border: 1px solid #dbe5ed;
		border-radius: 12px;
	}

	.pkg-modal__price {
		font-size: 26px;
		font-weight: 900;
		letter-spacing: -0.02em;
		color: #111;
		line-height: 1;
	}

	.pkg-modal__price-note {
		font-size: 13px;
		font-weight: 700;
		color: var(--mvp-orange-600);
	}

	.pkg-modal__meta {
		font-size: 13px;
		font-weight: 650;
		color: #4a4a4a;
		margin-left: auto;
	}

	.pkg-modal__detail-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 14px;
		margin-bottom: 24px;
		position: relative;
	}

	.pkg-modal__detail-grid::before {
		content: '↓';
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		display: flex;
		align-items: center;
		justify-content: center;
		width: 30px;
		height: 30px;
		background: #fff;
		border: 1px solid #ffc59a;
		border-radius: 999px;
		color: var(--mvp-orange-600);
		font-size: 18px;
		font-weight: 900;
		box-shadow: 0 4px 10px rgba(255, 107, 26, 0.18);
		z-index: 1;
	}

	.pkg-modal__problem-card,
	.pkg-modal__approach-card {
		padding: 22px 24px;
		border-radius: 12px;
	}

	.pkg-modal__problem-card {
		background: #f3f4f6;
		border: 1px solid #e2e5ea;
	}

	.pkg-modal__problem-card h4 {
		font-size: 12px;
		font-weight: 900;
		letter-spacing: 0.04em;
		color: #6b7280;
		text-transform: uppercase;
		margin-bottom: 12px;
	}

	.pkg-modal__problem-card ul {
		display: grid;
		gap: 10px;
		margin: 0;
		padding-left: 18px;
	}

	.pkg-modal__problem-card li {
		font-size: 13px;
		font-weight: 650;
		color: #475160;
		line-height: 1.75;
	}

	.pkg-modal__problem-card li::marker {
		color: #98a3b1;
	}

	.pkg-modal__approach-card {
		background: #fff4ec;
		border: 1px solid #ffc59a;
	}

	.pkg-modal__approach-card h4 {
		font-size: 12px;
		font-weight: 900;
		letter-spacing: 0.04em;
		color: var(--mvp-orange-700);
		text-transform: uppercase;
		margin-bottom: 12px;
	}

	.pkg-modal__approach-card ul {
		display: grid;
		gap: 10px;
		margin: 0;
		padding-left: 18px;
	}

	.pkg-modal__approach-card li {
		font-size: 13px;
		font-weight: 650;
		color: #92340a;
		line-height: 1.75;
	}

	.pkg-modal__approach-card li::marker {
		color: var(--mvp-orange-500);
	}

	.pkg-modal__includes {
		padding: 20px 22px;
		margin-bottom: 20px;
		background: #fff;
		border: 1px solid #dbe5ed;
		border-radius: 12px;
	}

	.pkg-modal__includes h4 {
		font-size: 12px;
		font-weight: 900;
		letter-spacing: 0.04em;
		color: #475160;
		text-transform: uppercase;
		margin-bottom: 12px;
	}

	.pkg-modal__includes ul {
		display: grid;
		gap: 8px;
		margin: 0;
		padding: 0;
		list-style: none;
	}

	.pkg-modal__includes li {
		display: flex;
		align-items: flex-start;
		gap: 10px;
		font-size: 13px;
		font-weight: 600;
		color: #2c3a4a;
		line-height: 1.7;
	}

	.pkg-modal__includes li strong {
		font-weight: 800;
		color: #111;
	}

	.pkg-modal__includes-check {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 18px;
		height: 18px;
		border-radius: 50%;
		background: var(--mvp-orange-500);
		color: #fff;
		flex-shrink: 0;
		margin-top: 2px;
	}

	.pkg-modal__payment {
		padding: 20px 22px;
		margin-bottom: 24px;
		background: #fef5ef;
		border: 1px solid #ffc59a;
		border-radius: 12px;
	}

	.pkg-modal__payment h4 {
		font-size: 12px;
		font-weight: 900;
		letter-spacing: 0.04em;
		color: var(--mvp-orange-700);
		text-transform: uppercase;
		margin-bottom: 12px;
	}

	.pkg-modal__payment ol {
		display: grid;
		gap: 8px;
		margin: 0;
		padding: 0;
		list-style: none;
		counter-reset: pay-step;
	}

	.pkg-modal__payment li {
		display: grid;
		grid-template-columns: 90px 1fr auto;
		align-items: center;
		gap: 12px;
		padding: 8px 0;
		border-bottom: 1px dashed rgba(255, 197, 154, 0.7);
		font-size: 13px;
		line-height: 1.5;
	}

	.pkg-modal__payment li:last-child {
		border-bottom: none;
	}

	.pkg-modal__payment-timing {
		font-weight: 700;
		color: var(--mvp-orange-700);
	}

	.pkg-modal__payment-label {
		font-weight: 700;
		color: #2c3a4a;
	}

	.pkg-modal__payment-amount {
		font-family: var(--mvp-font-heading);
		font-weight: 900;
		color: #111;
	}

	.pkg-modal__payment-note {
		display: flex;
		align-items: flex-start;
		gap: 8px;
		margin-top: 12px;
		padding: 10px 12px;
		background: #ecfdf5;
		border: 1px solid #6ee7b7;
		border-radius: 8px;
		color: #065f46;
		font-size: 12px;
		line-height: 1.6;
	}

	.pkg-modal__payment-note strong {
		font-weight: 900;
		color: #047857;
	}

	.pkg-modal__result-band {
		padding: 18px 22px;
		margin-bottom: 24px;
		background: #fef5ef;
		border: 1px solid #ffc59a;
		border-radius: 12px;
	}

	.pkg-modal__result-band strong {
		display: block;
		font-size: 12px;
		font-weight: 900;
		letter-spacing: 0.04em;
		color: var(--mvp-orange-700);
		text-transform: uppercase;
		margin-bottom: 6px;
	}

	.pkg-modal__result-band p {
		font-size: 14px;
		font-weight: 650;
		color: #2c3a4a;
		line-height: 1.85;
	}

	.pkg-modal__actions {
		display: flex;
		flex-wrap: wrap;
		gap: 12px;
	}

	.pkg-modal__cta {
		display: inline-flex;
		align-items: center;
		gap: 10px;
		padding: 0.875rem 1.625rem;
		font-size: 15px;
		font-weight: 700;
		color: #fff;
		background: linear-gradient(135deg, var(--mvp-orange-500) 0%, var(--mvp-orange-400) 100%);
		border: none;
		border-radius: 9999px;
		box-shadow: 0 8px 20px rgba(255, 107, 26, 0.32);
		cursor: pointer;
		transition:
			background 220ms ease,
			box-shadow 220ms ease,
			transform 150ms ease;
	}

	.pkg-modal__cta:hover {
		background: var(--mvp-orange-600);
		box-shadow: 0 12px 28px rgba(255, 107, 26, 0.42);
	}

	.pkg-modal__cta:active {
		transform: translateY(1px);
	}

	@media (max-width: 768px) {
		.hero-card {
			padding: var(--mvp-space-8) var(--mvp-space-6) var(--mvp-space-6);
			gap: var(--mvp-space-6);
		}

		.hero-card__features-list {
			grid-template-columns: 1fr;
			gap: var(--mvp-space-3);
		}

		.payment__timeline {
			grid-template-columns: 1fr;
			gap: var(--mvp-space-6);
		}

		.payment__timeline::before {
			top: 0;
			bottom: 0;
			left: 27px;
			right: auto;
			width: 2px;
			height: auto;
			background: linear-gradient(
				180deg,
				var(--mvp-orange-500) 0%,
				var(--mvp-orange-300) 50%,
				var(--mvp-orange-500) 100%
			);
		}

		.payment-step {
			flex-direction: row;
			align-items: center;
			gap: var(--mvp-space-4);
			text-align: left;
		}

		.payment-step__body {
			align-items: flex-start;
		}

		.payment-step__note {
			max-width: none;
		}

		.payment-assurance {
			flex-direction: column;
			gap: var(--mvp-space-3);
			padding: var(--mvp-space-5) var(--mvp-space-5);
		}

		.addons__grid {
			grid-template-columns: 1fr;
			gap: var(--mvp-space-3);
		}

		.addon-card {
			padding: var(--mvp-space-4) var(--mvp-space-5);
			gap: var(--mvp-space-3);
		}

		.addon-card__price {
			font-size: 1rem;
		}
	}

	@media (max-width: 640px) {
		.hero-card__price {
			font-size: 2.75rem;
		}

		.pkg-modal-backdrop {
			padding: 14px;
		}

		.pkg-modal__copy {
			padding: 24px 22px 26px;
		}

		.pkg-modal__title {
			font-size: 24px;
		}

		.pkg-modal__visual {
			min-height: 160px;
			padding: 20px 20px 16px;
		}

		.pkg-modal__price-row {
			padding: 12px 14px;
		}

		.pkg-modal__price {
			font-size: 22px;
		}

		.pkg-modal__meta {
			margin-left: 0;
		}

		.pkg-modal__problem-card,
		.pkg-modal__approach-card {
			padding: 18px 18px;
		}

		.pkg-modal__payment li {
			grid-template-columns: 1fr;
			gap: 4px;
		}
	}
</style>
