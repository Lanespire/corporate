<script lang="ts">
	import { resolve } from '$app/paths';
	import heroImage from '$lib/assets/images/launch_lp_ref_hero.png?enhanced';
	import problemImage from '$lib/assets/images/launch_lp_ref_problem.png?enhanced';
	import BadgeJapaneseYen from 'lucide-svelte/icons/badge-japanese-yen';
	import ClipboardList from 'lucide-svelte/icons/clipboard-list';
	import LayoutTemplate from 'lucide-svelte/icons/layout-template';
	import MessageCircle from 'lucide-svelte/icons/message-circle';
	import MonitorCog from 'lucide-svelte/icons/monitor-cog';
	import PackageCheck from 'lucide-svelte/icons/package-check';
	import Smartphone from 'lucide-svelte/icons/smartphone';
	import Timer from 'lucide-svelte/icons/timer';

	type Plan = {
		name: string;
		price: string;
		catch: string;
		featured?: boolean;
		items: string[];
	};

	type Faq = {
		question: string;
		answer: string;
	};

	const badges = ['デザイン2案', 'スマホ対応', '最短納品'];

	const worries = [
		'制作会社に依頼するとコストが高すぎる',
		'納期が長く、キャンペーンに間に合わない',
		'デザインや成果へのこだわりも妥協したくない'
	];

	const benefits = [
		{
			icon: BadgeJapaneseYen,
			title: '低価格で高品質',
			body: '必要な構成とデザインを絞り込み、はじめてのLP制作でも依頼しやすい価格で形にします。'
		},
		{
			icon: Timer,
			title: 'スピード納品',
			body: '目的と素材が揃っていれば短納期で制作可能。キャンペーンや告知の機会を逃しません。'
		},
		{
			icon: Smartphone,
			title: 'スマホ最適化',
			body: 'スマホで読みやすく、問い合わせまで迷わない導線を前提にレイアウトを整えます。'
		}
	];

	const plans: Plan[] = [
		{
			name: 'Light',
			price: '19,800',
			catch: 'まずは低価格で試したい方へ',
			items: [
				'デザイン2案ご提案',
				'スマホ対応',
				'基本的な構成・デザイン',
				'最短5営業日で納品',
				'修正2回まで'
			]
		},
		{
			name: 'Standard',
			price: '49,800',
			catch: '集客用LPをしっかり整えたい方へ',
			featured: true,
			items: [
				'デザイン2案ご提案',
				'スマホ対応',
				'戦略的な構成設計',
				'最短5営業日で納品',
				'修正3回まで',
				'画像・素材のご用意'
			]
		},
		{
			name: 'Pro',
			price: '98,000',
			catch: '広告・販売導線まで作り込みたい方へ',
			items: [
				'デザイン2案ご提案',
				'スマホ対応',
				'戦略的な構成設計',
				'最短5営業日で納品',
				'修正無制限',
				'画像・素材のご用意',
				'アニメーション対応'
			]
		}
	];

	const supportItems = [
		'公開・運用・月1修正まで対応',
		'表示崩れ・フォーム動作の確認',
		'公開後の運用相談',
		'軽微な修正を月1回まで対応'
	];

	const flow = [
		{
			icon: MessageCircle,
			title: '相談',
			body: 'フォームから目的や希望納期をお知らせください。'
		},
		{
			icon: ClipboardList,
			title: 'ヒアリング',
			body: 'ターゲットや訴求内容を整理します。'
		},
		{
			icon: LayoutTemplate,
			title: '構成案',
			body: '成果につながる流れを作成します。'
		},
		{
			icon: MonitorCog,
			title: '制作',
			body: 'デザイン制作後、Webページ化します。'
		},
		{
			icon: PackageCheck,
			title: '納品',
			body: '公開方法まで確認してお渡しします。'
		}
	];

	const faqs: Faq[] = [
		{
			question: '本当に最短5営業日で納品できますか？',
			answer:
				'掲載内容と画像素材が揃っている場合の目安です。内容量や修正範囲によって納期は前後します。'
		},
		{
			question: '修正は何回まで可能ですか？',
			answer:
				'Lightは2回、Standardは3回、Proは無制限で対応します。大幅な構成変更やページ追加は別途お見積もりです。'
		},
		{
			question: '原稿や画像がなくても依頼できますか？',
			answer:
				'可能です。ヒアリング内容をもとに原稿整理や素材選定を進めます。Standard以上は画像・素材のご用意も含みます。'
		},
		{
			question: '公開後の運用サポートはありますか？',
			answer: '月額9,800円で公開作業、運用相談、表示確認、月1回までの軽微な修正に対応します。'
		}
	];

	let openFaq = -1;

	function toggleFaq(index: number) {
		openFaq = openFaq === index ? -1 : index;
	}
</script>

<svelte:head>
	<title>Launch LP - 低価格で成果につながるLP制作</title>
	<meta
		name="description"
		content="Light 19,800円、Standard 49,800円、Pro 98,000円。納品後の公開・運用サポートも月額9,800円で依頼できるLP制作サービス。"
	/>
	<link rel="canonical" href="https://launch-lp.lanespire.com/" />

	<!-- Open Graph -->
	<meta property="og:type" content="website" />
	<meta property="og:site_name" content="Launch LP" />
	<meta property="og:title" content="Launch LP - 低価格で成果につながるLP制作" />
	<meta
		property="og:description"
		content="Light 19,800円、Standard 49,800円、Pro 98,000円。短納期・スマホ対応のLP制作サービス。"
	/>
	<meta property="og:url" content="https://launch-lp.lanespire.com/" />
	<meta property="og:image" content="https://launch-lp.lanespire.com/ogp/launch-lp-og.png" />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta property="og:locale" content="ja_JP" />

	<!-- Twitter Card -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="Launch LP - 低価格で成果につながるLP制作" />
	<meta
		name="twitter:description"
		content="Light 19,800円、Standard 49,800円、Pro 98,000円。短納期・スマホ対応のLP制作サービス。"
	/>
	<meta name="twitter:image" content="https://launch-lp.lanespire.com/ogp/launch-lp-og.png" />

	<!-- JSON-LD: Service + Offers + FAQPage -->
	{@html `<script type="application/ld+json">${JSON.stringify({
		'@context': 'https://schema.org',
		'@graph': [
			{
				'@type': 'Service',
				name: 'Launch LP - LP制作サービス',
				serviceType: 'ランディングページ制作',
				description:
					'低価格・短納期で成果につながるLPを制作するサービス。Light / Standard / Pro の3プラン展開。',
				provider: {
					'@type': 'Organization',
					name: '株式会社Lanespire',
					url: 'https://lanespire.com/',
					email: 'info@lanespire.com'
				},
				areaServed: 'JP',
				url: 'https://launch-lp.lanespire.com/',
				offers: [
					{ '@type': 'Offer', name: 'Light', price: '19800', priceCurrency: 'JPY', availability: 'https://schema.org/InStock' },
					{ '@type': 'Offer', name: 'Standard', price: '49800', priceCurrency: 'JPY', availability: 'https://schema.org/InStock' },
					{ '@type': 'Offer', name: 'Pro', price: '98000', priceCurrency: 'JPY', availability: 'https://schema.org/InStock' },
					{ '@type': 'Offer', name: '公開・運用サポート', price: '9800', priceCurrency: 'JPY', priceSpecification: { '@type': 'UnitPriceSpecification', price: '9800', priceCurrency: 'JPY', billingIncrement: 1, unitText: 'MONTH' }, availability: 'https://schema.org/InStock' }
				]
			},
			{
				'@type': 'FAQPage',
				mainEntity: faqs.map((f) => ({
					'@type': 'Question',
					name: f.question,
					acceptedAnswer: { '@type': 'Answer', text: f.answer }
				}))
			}
		]
	})}</script>`}
</svelte:head>

<div class="lp-page">
	<header class="lp-header" aria-label="Launch LP">
		<a class="brand" href={resolve('/launch-lp')} aria-label="Launch LP トップ">
			<span>Launch</span>
			<strong>LP</strong>
		</a>

		<nav class="desktop-nav" aria-label="ページ内ナビゲーション">
			<a href="#features">特徴</a>
			<a href="#price">料金</a>
			<a href="#support">運用</a>
			<a href="#flow">流れ</a>
			<a href="#faq">FAQ</a>
		</nav>

		<a class="header-cta" href="#contact">
			導入相談
		</a>
	</header>

	<main>
		<section class="hero dot-bg" id="top">
			<div class="hero-inner">
				<div class="hero-copy">
					<div class="hero-badges" aria-label="サービス内容">
						{#each badges as badge}
							<span>{badge}</span>
						{/each}
					</div>

					<h1>
						低価格で、<br />
						<span>成果</span>につながる<br />
						LP制作
					</h1>

					<p class="hero-lead">初めてでも頼みやすい<br />短納期のLP制作サービス</p>

					<a class="line-button" href="#contact">
						導入相談する
					</a>
				</div>

				<div class="hero-visual" aria-label="LP制作のイメージ">
					<enhanced:img src={heroImage} alt="LP制作のデザインイメージ" loading="eager" />
				</div>
			</div>
		</section>

		<section class="features" id="features">
			<div class="problem-card">
				<div class="problem-visual">
					<enhanced:img src={problemImage} alt="LP制作に悩む人のイメージ" loading="eager" />
				</div>

				<div class="problem-copy">
					<h2>LP制作でこんなお悩みありませんか？</h2>
					<ul>
						{#each worries as worry}
							<li>{worry}</li>
						{/each}
					</ul>
				</div>
			</div>

			<div class="solution-heading">
				<p>Launch LPならまとめて解決</p>
				<h2>安く、早く、きちんと伝わるLPへ</h2>
			</div>

			<div class="benefit-grid">
				{#each benefits as benefit}
					{@const Icon = benefit.icon}
					<article class="benefit-card">
						<div class="benefit-icon" aria-hidden="true">
							<Icon size={44} strokeWidth={2.2} />
						</div>
						<h3>{benefit.title}</h3>
						<p>{benefit.body}</p>
					</article>
				{/each}
			</div>
		</section>

		<section class="pricing dot-bg" id="price">
			<div class="section-heading">
				<p>料金プラン</p>
				<h2>目的に合わせて選べる3プラン</h2>
			</div>

			<div class="plan-list">
				{#each plans as plan}
					<article class:featured={plan.featured} class="plan-card">
						{#if plan.featured}
							<p class="recommend">おすすめ</p>
						{/if}
						<p class="plan-catch">{plan.catch}</p>
						<h3>{plan.name}</h3>
						<p class="price"><span>{plan.price}</span>円</p>
						<ul>
							{#each plan.items as item}
								<li>{item}</li>
							{/each}
						</ul>
					</article>
				{/each}
			</div>

			<div class="support-option" id="support">
				<div class="support-copy">
					<p class="support-label">公開後まで任せたい方へ</p>
					<h3>公開・運用サポート</h3>
					<p class="support-text">
						納品後の公開作業から運用相談、月1回の軽微な修正まで対応します。
					</p>
				</div>
				<div class="support-price">
					<p><span>+9,800</span>円/月</p>
					<ul>
						{#each supportItems as item}
							<li>{item}</li>
						{/each}
					</ul>
				</div>
			</div>
		</section>

		<section class="flow" id="flow">
			<div class="section-heading">
				<p>制作の流れ</p>
				<h2>相談から納品まで5ステップ</h2>
			</div>

			<div class="flow-grid">
				{#each flow as step, index}
					{@const Icon = step.icon}
					<article>
						<span>{String(index + 1).padStart(2, '0')}</span>
						<div class="flow-icon" aria-hidden="true">
							<Icon size={26} strokeWidth={2.2} />
						</div>
						<h3>{step.title}</h3>
						<p>{step.body}</p>
					</article>
				{/each}
			</div>
		</section>

		<section class="faq dot-bg" id="faq">
			<h2>よくあるご質問</h2>
			<div class="faq-list">
				{#each faqs as faq, index}
					<article class:open={openFaq === index}>
						<button
							type="button"
							aria-expanded={openFaq === index}
							aria-controls={`faq-answer-${index}`}
							on:click={() => toggleFaq(index)}
						>
							<span>Q</span>
							{faq.question}
							<i aria-hidden="true"></i>
						</button>
						<div id={`faq-answer-${index}`} class="faq-answer" hidden={openFaq !== index}>
							<span>A</span>
							<p>{faq.answer}</p>
						</div>
					</article>
				{/each}
			</div>
		</section>

		<section class="contact-cta" id="contact">
			<div class="cta-copy">
				<h2>まずは導入相談してみませんか？</h2>
				<p>LP制作のプロが、目的に合わせて最適なプランをご提案します。</p>
			</div>

			<form
				class="contact-form"
				name="launch-lp-contact"
				method="POST"
				data-netlify="true"
				data-netlify-honeypot="bot-field"
			>
				<input type="hidden" name="form-name" value="launch-lp-contact" />
				<p class="hp-field">
					<label>Don't fill this out if you're human: <input name="bot-field" /></label>
				</p>

				<div class="form-grid">
					<div class="form-group full">
						<label for="purpose">LPの目的 <span class="required">*</span></label>
						<textarea
							id="purpose"
							name="purpose"
							rows="3"
							placeholder="例：新サービス申込みの獲得、資料請求の獲得 など"
							required
						></textarea>
					</div>

					<div class="form-group">
						<label for="deadline">希望納期</label>
						<input
							type="text"
							id="deadline"
							name="deadline"
							placeholder="例：2週間以内 / 〇月〇日まで"
						/>
					</div>

					<div class="form-group">
						<label for="plan">検討プラン</label>
						<select id="plan" name="plan">
							<option value="">選択してください</option>
							<option value="Light">Light（19,800円）</option>
							<option value="Standard">Standard（49,800円）</option>
							<option value="Pro">Pro（98,000円）</option>
							<option value="未定">未定 / 相談したい</option>
						</select>
					</div>

					<div class="form-group full">
						<label for="target">ターゲット</label>
						<textarea
							id="target"
							name="target"
							rows="2"
							placeholder="例：30代女性、中小企業の経営者 など"
						></textarea>
					</div>

					<div class="form-group full">
						<label for="strengths">商品・サービスの強み</label>
						<textarea
							id="strengths"
							name="strengths"
							rows="2"
							placeholder="競合と比べた優位性、訴求したいポイント"
						></textarea>
					</div>

					<div class="form-group full">
						<label for="references">競合 / 参考URL</label>
						<textarea
							id="references"
							name="references"
							rows="2"
							placeholder="参考にしたいサイトや競合のURL（複数可）"
						></textarea>
					</div>

					<div class="form-group">
						<label for="assets">素材の準備状況</label>
						<select id="assets" name="assets">
							<option value="">選択してください</option>
							<option value="原稿・画像とも用意済み">原稿・画像とも用意済み</option>
							<option value="原稿のみ用意済み">原稿のみ用意済み</option>
							<option value="画像のみ用意済み">画像のみ用意済み</option>
							<option value="ほぼ未準備">ほぼ未準備</option>
						</select>
					</div>

					<div class="form-group">
						<label for="goals">目標CV / 集客チャネル</label>
						<input
							type="text"
							id="goals"
							name="goals"
							placeholder="例：月20件の問合せ / 広告・SNSなど"
						/>
					</div>

					<div class="form-group">
						<label for="name">お名前 <span class="required">*</span></label>
						<input type="text" id="name" name="name" required />
					</div>

					<div class="form-group">
						<label for="email">メールアドレス <span class="required">*</span></label>
						<input type="email" id="email" name="email" required />
					</div>
				</div>

				<button type="submit" class="submit-btn">導入相談を送信</button>
			</form>
		</section>
	</main>

	<footer class="lp-footer">
		<nav aria-label="フッターナビゲーション">
			<a href="#features">特徴</a>
			<a href="#price">料金</a>
			<a href="#support">運用</a>
			<a href="#flow">流れ</a>
			<a href="#faq">FAQ</a>
			<a href="#contact">導入相談</a>
		</nav>
		<p>© 2026 Launch LP. All rights reserved.</p>
	</footer>
</div>

<style>
	:global(body) {
		background: #0c100f;
		color: #f3f0e8;
		font-family:
			'Avenir Next',
			'Hiragino Sans',
			'Yu Gothic',
			'Noto Sans JP',
			system-ui,
			sans-serif;
		margin: 0;
	}

	:global(body:has(.lp-page)) {
		background: #0c100f !important;
		color: #f3f0e8 !important;
	}

	:global(body:has(.lp-page) main) {
		background: transparent;
	}

	.lp-page {
		--background: #0c100f;
		--text: #f3f0e8;
		--muted: #aab1ab;
		--accent: #8be6ce;
		--accent-hover: #b0f4df;
		--panel: #151a18;
		--panel-strong: #1b2220;
		--line: rgba(201, 224, 215, 0.16);
		--input: #0e1312;
		--dark-text: #10201b;
		background: var(--background);
		color: var(--text);
		min-height: 100vh;
		overflow: clip;
	}

	.lp-page,
	.lp-page * {
		box-sizing: border-box;
	}

	h1,
	h2,
	h3,
	p {
		margin: 0;
	}

	.lp-page p,
	.lp-page li {
		color: inherit;
	}

	.lp-page a {
		color: inherit;
		text-decoration: none;
	}

	.lp-page section {
		scroll-margin-top: 110px;
	}

	.dot-bg {
		background:
			radial-gradient(circle at 82% 10%, rgba(139, 230, 206, 0.09), transparent 22rem),
			radial-gradient(circle, rgba(201, 224, 215, 0.13) 1px, transparent 1px) 0 0 / 28px 28px,
			var(--background);
	}

	.lp-header {
		align-items: center;
		backdrop-filter: blur(18px);
		background: rgba(21, 26, 24, 0.9);
		border: 1px solid var(--line);
		border-radius: 999px;
		box-shadow: 0 16px 40px rgba(0, 0, 0, 0.28);
		display: flex;
		gap: 28px;
		height: 70px;
		justify-content: space-between;
		left: 50%;
		max-width: calc(100vw - 48px);
		padding: 0 24px;
		position: fixed;
		top: 20px;
		transform: translateX(-50%);
		width: min(1120px, calc(100vw - 48px));
		z-index: 20;
	}

	.brand {
		align-items: baseline;
		display: flex;
		gap: 6px;
		white-space: nowrap;
	}

	.brand span {
		font-size: 18px;
		font-weight: 900;
		letter-spacing: -0.04em;
	}

	.brand strong {
		color: var(--accent);
		font-family: Georgia, serif;
		font-size: 32px;
		font-style: italic;
		line-height: 1;
	}

	.desktop-nav {
		align-items: center;
		display: flex;
		font-size: 13px;
		font-weight: 700;
		gap: clamp(18px, 2.4vw, 34px);
		justify-content: center;
		white-space: nowrap;
	}

	.desktop-nav a,
	.lp-footer a,
	.header-cta,
	.line-button,
	.submit-btn {
		transition:
			color 180ms ease,
			background-color 180ms ease,
			border-color 180ms ease,
			transform 180ms ease;
	}

	.desktop-nav a {
		color: var(--muted);
	}

	.desktop-nav a:hover,
	.lp-footer a:hover {
		color: var(--accent);
	}

	.header-cta,
	.line-button,
	.submit-btn {
		align-items: center;
		background: var(--accent);
		border: 0;
		border-radius: 999px;
		color: var(--dark-text);
		display: inline-flex;
		font-weight: 900;
		gap: 9px;
		justify-content: center;
		line-height: 1;
		white-space: nowrap;
	}

	.header-cta {
		font-size: 13px;
		padding: 14px 20px;
	}

	.line-button {
		font-size: 17px;
		min-width: 246px;
		padding: 18px 32px;
	}

	.header-cta:hover,
	.line-button:hover,
	.submit-btn:hover {
		background: var(--accent-hover);
		transform: translateY(-2px);
	}

	.hero {
		padding: 150px 32px 116px;
		position: relative;
	}

	.hero-inner {
		align-items: center;
		display: grid;
		gap: clamp(48px, 7vw, 104px);
		grid-template-columns: minmax(0, 0.9fr) minmax(420px, 1.1fr);
		margin: 0 auto;
		max-width: 1120px;
		min-height: 560px;
	}

	.hero-copy {
		position: relative;
		z-index: 2;
	}

	.hero-badges {
		display: flex;
		flex-wrap: wrap;
		gap: 9px;
		margin-bottom: 28px;
	}

	.hero-badges span {
		background: rgba(139, 230, 206, 0.08);
		border: 1px solid rgba(139, 230, 206, 0.45);
		border-radius: 999px;
		color: var(--accent);
		font-size: 12px;
		font-weight: 800;
		padding: 8px 13px;
	}

	.hero h1 {
		color: var(--text);
		font-size: clamp(3.4rem, 6.2vw, 5.8rem);
		font-weight: 900;
		letter-spacing: -0.07em;
		line-height: 1.04;
		margin-bottom: 26px;
	}

	.hero h1 span {
		color: var(--accent);
	}

	.hero-lead {
		color: var(--muted) !important;
		font-size: 17px;
		font-weight: 600;
		line-height: 1.8;
		margin-bottom: 30px;
	}

	.hero-visual {
		align-items: center;
		aspect-ratio: 424 / 342;
		background: var(--panel-strong);
		border: 1px solid var(--line);
		border-radius: 28px;
		box-shadow: 0 24px 60px rgba(0, 0, 0, 0.24);
		display: flex;
		justify-content: center;
		max-width: 560px;
		min-height: 0;
		padding: clamp(16px, 3vw, 30px);
		width: 100%;
	}

	.hero-visual :global(img) {
		display: block;
		height: auto;
		max-width: 424px;
		width: 100%;
	}

	.features {
		background: linear-gradient(var(--background) 0 130px, var(--panel) 130px);
		padding: 0 32px 128px;
	}

	.problem-card {
		align-items: center;
		background: var(--panel-strong);
		border: 1px solid var(--line);
		border-radius: 24px;
		display: grid;
		gap: clamp(36px, 7vw, 94px);
		grid-template-columns: minmax(260px, 0.75fr) minmax(0, 1.25fr);
		margin: 0 auto;
		max-width: 1120px;
		padding: 30px clamp(30px, 6vw, 78px);
		position: relative;
		z-index: 2;
	}

	.problem-visual {
		align-items: center;
		background: var(--panel);
		border: 1px solid var(--line);
		border-radius: 18px;
		display: flex;
		justify-content: center;
		min-height: 220px;
		padding: 22px;
	}

	.problem-visual :global(img) {
		display: block;
		max-width: 215px;
		width: 100%;
	}

	.problem-copy h2 {
		font-size: clamp(1.45rem, 2.4vw, 2rem);
		font-weight: 900;
		line-height: 1.4;
		margin-bottom: 24px;
	}

	.problem-copy h2::first-letter {
		color: var(--accent);
	}

	.problem-copy ul,
	.plan-card ul,
	.support-price ul {
		display: grid;
		gap: 12px;
		list-style: none;
		margin: 0;
		padding: 0;
	}

	.problem-copy li,
	.plan-card li,
	.support-price li {
		color: var(--muted);
		font-size: 14px;
		font-weight: 600;
		line-height: 1.6;
		padding-left: 30px;
		position: relative;
	}

	.problem-copy li::before,
	.plan-card li::before,
	.support-price li::before {
		align-items: center;
		background: var(--accent);
		border-radius: 50%;
		color: var(--dark-text);
		content: '✓';
		display: flex;
		font-size: 10px;
		font-weight: 900;
		height: 18px;
		justify-content: center;
		left: 0;
		position: absolute;
		top: 3px;
		width: 18px;
	}

	.solution-heading {
		margin: 106px auto 42px;
		max-width: 1120px;
		text-align: left;
	}

	.solution-heading p,
	.section-heading p,
	.support-label {
		color: var(--accent);
		font-size: 13px;
		font-weight: 900;
		letter-spacing: 0.12em;
		text-transform: uppercase;
	}

	.solution-heading p {
		margin-bottom: 12px;
	}

	.solution-heading h2 {
		font-size: clamp(2rem, 4vw, 3.5rem);
		font-weight: 900;
		letter-spacing: -0.05em;
		line-height: 1.15;
	}

	.benefit-grid {
		display: grid;
		gap: 18px;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		margin: 0 auto;
		max-width: 1120px;
	}

	.benefit-card {
		background: var(--panel-strong);
		border: 1px solid var(--line);
		border-radius: 18px;
		border-top: 2px solid var(--accent);
		min-height: 226px;
		padding: 28px 26px 26px;
		text-align: left;
	}

	.benefit-icon {
		align-items: center;
		color: var(--accent);
		display: flex;
		height: 44px;
		justify-content: flex-start;
		margin-bottom: 22px;
		width: 58px;
	}

	.benefit-icon :global(svg) {
		display: block;
	}

	.benefit-card h3 {
		font-size: 18px;
		font-weight: 900;
		line-height: 1.4;
		margin-bottom: 12px;
	}

	.benefit-card p {
		color: var(--muted) !important;
		font-size: 13px;
		font-weight: 500;
		line-height: 1.8;
	}

	.pricing {
		padding: 120px 32px 128px;
	}

	.section-heading {
		margin: 0 auto 48px;
		max-width: 1120px;
		text-align: left;
	}

	.section-heading p {
		margin-bottom: 14px;
	}

	.section-heading h2,
	.faq h2 {
		font-size: clamp(2rem, 4vw, 3.5rem);
		font-weight: 900;
		letter-spacing: -0.05em;
		line-height: 1.15;
	}

	.plan-list {
		align-items: stretch;
		display: grid;
		gap: 18px;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		margin: 0 auto;
		max-width: 1120px;
	}

	.plan-card {
		background: var(--panel);
		border: 1px solid var(--line);
		border-radius: 18px;
		display: flex;
		flex-direction: column;
		min-width: 0;
		padding: 30px 28px 28px;
		position: relative;
	}

	.plan-card.featured {
		border-color: rgba(139, 230, 206, 0.62);
	}

	.recommend {
		align-self: flex-start;
		background: var(--accent);
		border-radius: 999px;
		color: var(--dark-text);
		font-size: 11px;
		font-weight: 900;
		left: 28px;
		padding: 7px 12px;
		position: absolute;
		top: -14px;
	}

	.plan-catch {
		color: var(--muted) !important;
		font-size: 13px;
		font-weight: 600;
		line-height: 1.6;
		margin-bottom: 22px;
		min-height: 42px;
	}

	.plan-card h3 {
		color: var(--text);
		font-size: 24px;
		font-weight: 900;
		line-height: 1;
		margin-bottom: 14px;
	}

	.plan-card.featured h3 {
		color: var(--accent);
	}

	.price {
		align-items: baseline;
		border-bottom: 1px solid var(--line);
		display: flex;
		font-size: 14px;
		font-weight: 800;
		gap: 4px;
		margin-bottom: 24px;
		padding-bottom: 22px;
	}

	.price span {
		color: var(--text);
		font-size: clamp(2.4rem, 4vw, 3.5rem);
		letter-spacing: -0.06em;
		line-height: 1;
	}

	.plan-card li {
		font-size: 13px;
		font-weight: 600;
		line-height: 1.5;
	}

	.support-option {
		align-items: center;
		background: var(--panel-strong);
		border: 1px solid var(--line);
		border-radius: 18px;
		display: flex;
		gap: 28px;
		justify-content: space-between;
		margin: 28px auto 0;
		max-width: 1120px;
		padding: 28px 32px;
	}

	.support-label {
		display: inline-block;
		margin-bottom: 10px;
	}

	.support-option h3 {
		font-size: 20px;
		font-weight: 900;
		line-height: 1.35;
		margin-bottom: 8px;
	}

	.support-text {
		color: var(--muted) !important;
		font-size: 13px;
		line-height: 1.7;
	}

	.support-price {
		align-items: flex-end;
		display: flex;
		flex-direction: column;
		gap: 12px;
		min-width: 300px;
	}

	.support-price > p {
		align-items: baseline;
		color: var(--accent);
		display: flex;
		font-size: 13px;
		font-weight: 900;
		gap: 3px;
		white-space: nowrap;
	}

	.support-price span {
		font-size: 34px;
		letter-spacing: -0.05em;
		line-height: 1;
	}

	.support-price ul {
		align-items: center;
		display: flex;
		flex-wrap: wrap;
		gap: 8px 16px;
		justify-content: flex-end;
	}

	.support-price li {
		font-size: 11px;
		line-height: 1.4;
		padding-left: 22px;
		white-space: nowrap;
	}

	.support-price li::before {
		height: 14px;
		top: 2px;
		width: 14px;
	}

	.flow {
		background: var(--panel);
		padding: 120px 32px 128px;
	}

	.flow .section-heading {
		margin-bottom: 56px;
	}

	.flow-grid {
		display: grid;
		gap: 18px;
		grid-template-columns: repeat(5, minmax(0, 1fr));
		margin: 0 auto;
		max-width: 1120px;
		position: relative;
	}

	.flow-grid article {
		background: var(--panel-strong);
		border: 1px solid var(--line);
		border-radius: 18px;
		min-height: 210px;
		padding: 24px 18px 22px;
		position: relative;
		text-align: center;
	}

	.flow-grid article:not(:last-child)::after {
		border-right: 1px solid var(--accent);
		border-top: 1px solid var(--accent);
		content: '';
		height: 9px;
		position: absolute;
		right: -13px;
		top: 50%;
		transform: rotate(45deg);
		width: 9px;
	}

	.flow-grid article > span {
		align-items: center;
		background: var(--accent);
		border-radius: 50%;
		color: var(--dark-text);
		display: flex;
		font-size: 13px;
		font-weight: 900;
		height: 32px;
		justify-content: center;
		margin: 0 auto 20px;
		width: 32px;
	}

	.flow-icon {
		align-items: center;
		color: var(--accent);
		display: flex;
		height: 30px;
		justify-content: center;
		margin: 0 auto 16px;
		width: 36px;
	}

	.flow-icon :global(svg) {
		display: block;
	}

	.flow-grid h3 {
		font-size: 16px;
		font-weight: 900;
		margin-bottom: 10px;
	}

	.flow-grid p {
		color: var(--muted) !important;
		font-size: 12px;
		font-weight: 500;
		line-height: 1.7;
	}

	.faq {
		padding: 120px 32px 128px;
	}

	.faq h2 {
		margin: 0 auto 42px;
		max-width: 1120px;
		text-align: left;
	}

	.faq-list {
		background: var(--panel);
		border: 1px solid var(--line);
		border-radius: 18px;
		margin: 0 auto;
		max-width: 1120px;
		overflow: hidden;
	}

	.faq article + article {
		border-top: 1px solid var(--line);
	}

	.faq button {
		align-items: center;
		background: var(--panel);
		border: 0;
		color: var(--text);
		cursor: pointer;
		display: grid;
		font: inherit;
		font-size: 15px;
		font-weight: 800;
		grid-template-columns: 42px 1fr 24px;
		min-height: 76px;
		padding: 0 28px;
		text-align: left;
		width: 100%;
	}

	.faq button span,
	.faq-answer span {
		color: var(--accent);
		font-size: 20px;
		font-weight: 900;
	}

	.faq button i {
		border-bottom: 1px solid var(--accent);
		border-right: 1px solid var(--accent);
		display: block;
		height: 9px;
		justify-self: end;
		transform: rotate(45deg);
		transition: transform 180ms ease;
		width: 9px;
	}

	.faq article.open button i {
		transform: rotate(-135deg);
	}

	.faq-answer {
		align-items: start;
		background: var(--panel-strong);
		display: grid;
		gap: 12px;
		grid-template-columns: 42px 1fr;
		padding: 20px 28px 24px;
	}

	.faq-answer[hidden] {
		display: none;
	}

	.faq-answer p {
		color: var(--muted) !important;
		font-size: 13px;
		font-weight: 500;
		line-height: 1.8;
	}

	.contact-cta {
		align-items: stretch;
		background: var(--panel-strong);
		border: 1px solid var(--line);
		border-radius: 24px;
		display: grid;
		gap: clamp(34px, 6vw, 84px);
		grid-template-columns: minmax(240px, 0.72fr) minmax(0, 1.28fr);
		margin: 0 auto 128px;
		max-width: 1120px;
		padding: 56px clamp(26px, 5vw, 64px) 60px;
	}

	.cta-copy {
		padding-top: 10px;
	}

	.contact-cta h2 {
		color: var(--text);
		font-size: clamp(1.8rem, 3.4vw, 2.8rem);
		font-weight: 900;
		letter-spacing: -0.05em;
		line-height: 1.2;
		margin-bottom: 18px;
	}

	.contact-cta p {
		color: var(--muted) !important;
		font-size: 13px;
		font-weight: 500;
		line-height: 1.8;
	}

	.contact-form {
		background: var(--panel);
		border: 1px solid var(--line);
		border-radius: 18px;
		display: flex;
		flex-direction: column;
		gap: 18px;
		min-width: 0;
		padding: 26px 24px 28px;
	}

	.contact-form .hp-field {
		display: none;
	}

	.form-grid {
		display: grid;
		gap: 16px;
		grid-template-columns: repeat(2, minmax(0, 1fr));
	}

	.form-group {
		display: flex;
		flex-direction: column;
		gap: 7px;
		min-width: 0;
	}

	.form-group.full {
		grid-column: 1 / -1;
	}

	.form-group label {
		color: var(--text);
		font-size: 12px;
		font-weight: 700;
	}

	.form-group .required {
		color: var(--accent);
		margin-left: 4px;
	}

	.form-group input,
	.form-group textarea,
	.form-group select {
		appearance: none;
		background: var(--input);
		border: 1px solid var(--line);
		border-radius: 10px;
		color: var(--text);
		font-family: inherit;
		font-size: 13px;
		max-width: 100%;
		padding: 12px 13px;
		transition:
			border-color 180ms ease,
			background-color 180ms ease;
		width: 100%;
	}

	.form-group input::placeholder,
	.form-group textarea::placeholder {
		color: var(--muted);
		opacity: 0.8;
	}

	.form-group input:focus,
	.form-group textarea:focus,
	.form-group select:focus {
		background: var(--panel-strong);
		border-color: var(--accent);
		outline: none;
	}

	.form-group textarea {
		min-height: 88px;
		resize: vertical;
	}

	.form-group select {
		background-image:
			linear-gradient(45deg, transparent 50%, var(--accent) 50%),
			linear-gradient(135deg, var(--accent) 50%, transparent 50%);
		background-position:
			calc(100% - 17px) 50%,
			calc(100% - 12px) 50%;
		background-repeat: no-repeat;
		background-size:
			5px 5px,
			5px 5px;
		padding-right: 34px;
	}

	.contact-form .submit-btn {
		align-self: flex-start;
		cursor: pointer;
		font-size: 15px;
		min-width: 220px;
		padding: 15px 26px;
	}

	.lp-footer {
		align-items: center;
		background: var(--background);
		border-top: 1px solid var(--line);
		display: flex;
		flex-direction: column;
		gap: 14px;
		padding: 30px 32px 36px;
		text-align: center;
	}

	.lp-footer nav {
		display: flex;
		flex-wrap: wrap;
		font-size: 13px;
		font-weight: 700;
		gap: 20px 28px;
		justify-content: center;
	}

	.lp-footer a {
		color: var(--muted);
	}

	.lp-footer p {
		color: var(--muted) !important;
		font-size: 11px;
	}

	.lp-page :is(a, button, input, textarea, select):focus-visible {
		outline: 2px solid var(--accent);
		outline-offset: 4px;
	}

	@media (max-width: 900px) {
		.lp-header {
			max-width: calc(100vw - 32px);
			width: calc(100vw - 32px);
		}

		.desktop-nav {
			display: none;
		}

		.hero {
			padding: 124px 24px 88px;
		}

		.hero-inner {
			display: flex;
			flex-direction: column;
			gap: 50px;
			min-height: 0;
			text-align: center;
		}

		.hero-copy {
			align-items: center;
			display: flex;
			flex-direction: column;
		}

		.hero-badges {
			justify-content: center;
		}

		.hero h1 {
			font-size: clamp(3.4rem, 9vw, 5.2rem);
		}

		.hero-visual {
			max-width: 560px;
		}

		.features,
		.pricing,
		.flow,
		.faq {
			padding-left: 24px;
			padding-right: 24px;
		}

		.problem-card {
			gap: 30px;
			grid-template-columns: minmax(220px, 0.7fr) minmax(0, 1.3fr);
			padding-left: 32px;
			padding-right: 32px;
		}

		.problem-visual {
			min-height: 190px;
		}

		.benefit-card {
			padding: 24px 20px;
		}

		.plan-card {
			padding-left: 22px;
			padding-right: 22px;
		}

		.flow-grid {
			grid-template-columns: 1fr;
			max-width: 560px;
		}

		.flow-grid article {
			min-height: 0;
			padding: 24px 28px 26px;
		}

		.flow-grid article:not(:last-child)::after {
			bottom: -14px;
			left: 50%;
			right: auto;
			top: auto;
			transform: translateX(-50%) rotate(135deg);
		}

		.contact-cta {
			gap: 36px;
			grid-template-columns: 1fr;
			margin-left: 24px;
			margin-right: 24px;
		}

		.cta-copy {
			padding-top: 0;
			text-align: center;
		}
	}

	@media (max-width: 720px) {
		.hero {
			padding: 112px 18px 72px;
		}

		.hero h1 {
			font-size: clamp(2.9rem, 12vw, 4rem);
			letter-spacing: -0.08em;
		}

		.hero-lead {
			font-size: 15px;
		}

		.hero-visual {
			border-radius: 22px;
			padding: 16px;
		}

		.features {
			background: linear-gradient(var(--background) 0 92px, var(--panel) 92px);
			padding: 0 18px 88px;
		}

		.problem-card {
			display: flex;
			flex-direction: column;
			gap: 26px;
			padding: 22px;
		}

		.problem-visual {
			min-height: 0;
			padding: 18px;
			width: min(100%, 260px);
		}

		.problem-copy h2 {
			font-size: 1.45rem;
			text-align: center;
		}

		.problem-copy li {
			font-size: 13px;
		}

		.solution-heading {
			margin: 72px auto 32px;
		}

		.solution-heading h2 {
			font-size: clamp(1.9rem, 8vw, 2.6rem);
		}

		.benefit-grid,
		.plan-list {
			grid-template-columns: 1fr;
		}

		.benefit-card {
			min-height: 0;
		}

		.pricing,
		.flow,
		.faq {
			padding-bottom: 88px;
			padding-left: 18px;
			padding-right: 18px;
			padding-top: 88px;
		}

		.section-heading,
		.faq h2 {
			text-align: center;
		}

		.section-heading h2,
		.faq h2 {
			font-size: clamp(1.9rem, 8vw, 2.6rem);
		}

		.plan-card {
			padding: 28px 22px 24px;
		}

		.support-option {
			align-items: stretch;
			display: grid;
			gap: 22px;
			grid-template-columns: 1fr;
			padding: 24px 22px;
			text-align: center;
		}

		.support-price {
			align-items: center;
			min-width: 0;
		}

		.support-price ul {
			align-items: flex-start;
			display: grid;
			justify-content: center;
			text-align: left;
		}

		.support-price li {
			white-space: normal;
		}

		.faq-list {
			border-radius: 14px;
		}

		.faq button {
			font-size: 13px;
			grid-template-columns: 30px 1fr 18px;
			min-height: 68px;
			padding: 0 16px;
		}

		.faq-answer {
			grid-template-columns: 30px 1fr;
			padding: 18px 16px 22px;
		}

		.contact-cta {
			border-radius: 18px;
			margin: 0 18px 88px;
			padding: 34px 16px 18px;
		}

		.contact-form {
			padding: 20px 16px 22px;
		}

		.form-grid {
			grid-template-columns: 1fr;
		}

		.form-group.full {
			grid-column: auto;
		}

		.contact-form .submit-btn {
			align-self: stretch;
			min-width: 0;
		}

		.lp-footer {
			padding-left: 18px;
			padding-right: 18px;
		}
	}

	@media (max-width: 390px) {
		.lp-header {
			padding: 0 14px;
		}

		.brand span {
			font-size: 15px;
		}

		.brand strong {
			font-size: 27px;
		}

		.header-cta {
			font-size: 11px;
			padding: 11px 12px;
		}

		.hero h1 {
			font-size: 2.75rem;
		}

		.hero-badges span {
			font-size: 11px;
			padding: 7px 10px;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.lp-page *,
		.lp-page *::before,
		.lp-page *::after {
			animation-duration: 0.01ms !important;
			animation-iteration-count: 1 !important;
			scroll-behavior: auto !important;
			transition-duration: 0.01ms !important;
		}
	}
</style>
