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
		background: #ffffff;
		color: #111;
		font-family:
			'IBM Plex Sans',
			'Noto Sans JP',
			Inter,
			system-ui,
			-apple-system,
			BlinkMacSystemFont,
			'Segoe UI',
			sans-serif;
	}

	:global(body:has(.lp-page)) {
		background: #ffffff !important;
		color: #111 !important;
	}

	:global(body:has(.lp-page) main) {
		background: transparent;
	}

	.lp-page {
		--blue: #1678dc;
		--blue-dark: #0959c8;
		--green: #54c82d;
		--ink: #111;
		--soft: #f5f8fb;
		--line: #dbe5ed;
		background: #fff;
		color: var(--ink);
		min-height: 100vh;
		overflow: hidden;
	}

	@media (min-width: 821px) {
		.lp-page {
			zoom: 0.931;
		}
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

	.dot-bg {
		background:
			radial-gradient(circle, rgba(22, 120, 220, 0.22) 1px, transparent 1px) 0 0 / 24px 24px,
			#fff;
	}

	.lp-header {
		align-items: center;
		background: rgba(255, 255, 255, 0.97);
		border: 1px solid rgba(17, 17, 17, 0.08);
		border-radius: 999px;
		box-shadow: 0 8px 24px rgba(17, 17, 17, 0.16);
		display: flex;
		gap: 24px;
		height: 62px;
		justify-content: space-between;
		left: 50%;
		max-width: calc(100vw - 72px);
		padding: 0 28px;
		position: fixed;
		top: 22px;
		transform: translateX(-50%);
		width: min(760px, calc(100vw - 72px));
		z-index: 20;
	}

	.brand {
		align-items: baseline;
		display: flex;
		gap: 5px;
		white-space: nowrap;
	}

	.brand span {
		font-size: 18px;
		font-weight: 900;
	}

	.brand strong {
		font-family: Georgia, serif;
		font-size: 32px;
		font-style: italic;
		line-height: 1;
	}

	.desktop-nav {
		align-items: center;
		display: flex;
		font-size: 14px;
		font-weight: 800;
		gap: 24px;
		justify-content: center;
		white-space: nowrap;
	}

	.desktop-nav a,
	.lp-footer a {
		transition:
			color 180ms ease,
			transform 180ms ease;
	}

	.desktop-nav a:hover,
	.lp-footer a:hover {
		color: var(--blue);
		transform: translateY(-1px);
	}

	.header-cta,
	.line-button {
		align-items: center;
		background: var(--green);
		border: 0;
		border-radius: 999px;
		box-shadow: inset 0 -2px 0 rgba(17, 17, 17, 0.12);
		color: #fff;
		display: inline-flex;
		font-weight: 900;
		gap: 9px;
		justify-content: center;
		line-height: 1;
		transition:
			box-shadow 180ms ease,
			transform 180ms ease;
		white-space: nowrap;
	}

	.header-cta {
		font-size: 13px;
		padding: 14px 20px;
	}

	.line-button {
		font-size: 18px;
		min-width: 260px;
		padding: 18px 34px;
	}

	.header-cta:hover,
	.line-button:hover {
		box-shadow:
			inset 0 -2px 0 rgba(17, 17, 17, 0.12),
			5px 5px 0 #111;
		transform: translate(-2px, -2px);
	}

	.hero {
		min-height: 0;
		padding: 96px 24px 0;
		position: relative;
	}

	.hero-inner {
		align-items: center;
		display: grid;
		gap: 20px;
		grid-template-columns: 380px 424px;
		margin: 0 auto;
		max-width: 826px;
		min-height: 338px;
	}

	.hero-copy {
		position: relative;
		z-index: 2;
	}

	.hero-badges {
		display: flex;
		flex-wrap: wrap;
		gap: 9px;
		margin-bottom: 18px;
	}

	.hero-badges span {
		background: #111;
		border-radius: 999px;
		color: #fff;
		font-size: 13px;
		font-weight: 900;
		padding: 9px 15px;
	}

	.hero h1 {
		color: #111;
		font-size: 52px;
		font-weight: 900;
		letter-spacing: 0;
		line-height: 1.1;
		margin-bottom: 18px;
	}

	.hero h1 span {
		color: var(--blue);
	}

	.hero-lead {
		font-size: 16px;
		font-weight: 800;
		line-height: 1.55;
		margin-bottom: 20px;
	}

	.hero-visual {
		min-height: 320px;
	}

	.hero-visual img {
		display: block;
		width: 424px;
	}

	.features {
		background:
			radial-gradient(circle, rgba(255, 255, 255, 0.2) 1.5px, transparent 1.5px) right 50px top
				264px / 18px 18px,
			linear-gradient(#fff 0 86px, var(--blue) 86px);
		padding: 24px 24px 26px;
	}

	.problem-card {
		align-items: center;
		background: #fff;
		border: 1px solid rgba(17, 17, 17, 0.1);
		border-radius: 22px;
		box-shadow: 0 12px 30px rgba(17, 17, 17, 0.12);
		display: grid;
		gap: 34px;
		grid-template-columns: 230px 1fr;
		margin: 0 auto;
		max-width: 740px;
		min-height: 170px;
		padding: 12px 42px;
		position: relative;
		z-index: 2;
	}

	.problem-visual img {
		display: block;
		width: 190px;
	}

	.problem-copy h2 {
		font-size: 24px;
		font-weight: 900;
		line-height: 1.35;
		margin-bottom: 13px;
		text-align: center;
	}

	.problem-copy h2::first-letter {
		color: var(--blue);
	}

	.problem-copy ul,
	.plan-card ul,
	.support-price ul {
		display: grid;
		gap: 7px;
		list-style: none;
		margin: 0;
		padding: 0;
	}

	.problem-copy li,
	.plan-card li,
	.support-price li {
		font-size: 13px;
		font-weight: 800;
		line-height: 1.55;
		padding-left: 30px;
		position: relative;
	}

	.problem-copy li::before,
	.plan-card li::before,
	.support-price li::before {
		align-items: center;
		background: var(--blue);
		border-radius: 50%;
		color: #fff;
		content: '✓';
		display: flex;
		font-size: 11px;
		font-weight: 900;
		height: 18px;
		justify-content: center;
		left: 0;
		position: absolute;
		top: 2px;
		width: 18px;
	}

	.solution-heading {
		color: #fff;
		margin: 16px auto 14px;
		text-align: center;
	}

	.solution-heading p {
		font-size: 24px;
		font-weight: 900;
		line-height: 1.35;
	}

	.solution-heading h2 {
		font-size: 16px;
		font-weight: 900;
		line-height: 1.6;
		margin-top: 6px;
	}

	.benefit-grid {
		display: grid;
		gap: 16px;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		margin: 0 auto;
		max-width: 700px;
	}

	.benefit-card {
		background: #fff;
		border: 3px solid #111;
		border-radius: 9px;
		box-shadow: 7px 7px 0 #111;
		min-height: 132px;
		padding: 12px 14px 11px;
		text-align: center;
	}

	.benefit-icon {
		align-items: center;
		color: var(--blue);
		display: flex;
		height: 44px;
		justify-content: center;
		margin: 0 auto 8px;
		width: 58px;
	}

	.benefit-icon :global(svg) {
		display: block;
	}

	.benefit-card h3 {
		font-size: 15px;
		font-weight: 900;
		line-height: 1.4;
		margin-bottom: 8px;
	}

	.benefit-card p {
		font-size: 10px;
		font-weight: 700;
		line-height: 1.5;
	}

	.pricing {
		padding: 22px 24px 24px;
	}

	.section-heading {
		margin: 0 auto 26px;
		max-width: 760px;
		text-align: center;
	}

	.pricing .section-heading {
		margin-bottom: 42px;
	}

	.section-heading p {
		color: var(--blue);
		font-size: 16px;
		font-weight: 900;
		margin-bottom: 8px;
	}

	.section-heading h2,
	.faq h2 {
		font-size: 27px;
		font-weight: 900;
		letter-spacing: 0;
		line-height: 1.3;
	}

	.plan-list {
		align-items: stretch;
		display: grid;
		gap: 20px;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		margin: 0 auto;
		max-width: 700px;
	}

	.plan-card {
		background: #fff;
		border: 3px solid #111;
		border-radius: 9px;
		box-shadow: 7px 7px 0 #111;
		display: flex;
		flex-direction: column;
		min-height: 174px;
		padding: 16px 16px 12px;
		position: relative;
	}

	.plan-card.featured {
		border-color: var(--blue-dark);
		transform: translateY(-10px);
	}

	.recommend {
		background: var(--blue-dark);
		border-radius: 6px 6px 0 0;
		color: #fff;
		font-size: 11px;
		font-weight: 900;
		left: -3px;
		padding: 5px 16px;
		position: absolute;
		right: -3px;
		text-align: center;
		top: -25px;
	}

	.plan-catch {
		display: none;
	}

	.plan-card h3 {
		color: #111;
		font-size: 20px;
		font-weight: 900;
		line-height: 1;
		margin-bottom: 8px;
		text-align: center;
	}

	.plan-card.featured h3 {
		color: var(--blue-dark);
	}

	.price {
		align-items: baseline;
		display: flex;
		font-size: 14px;
		font-weight: 900;
		justify-content: center;
		margin-bottom: 10px;
	}

	.price span {
		font-size: 28px;
		line-height: 1;
	}

	.plan-card li {
		font-size: 10px;
		font-weight: 800;
		line-height: 1.35;
		padding-left: 24px;
	}

	.plan-card li::before {
		height: 15px;
		top: 3px;
		width: 15px;
	}

	.support-option {
		align-items: center;
		background: #fff;
		border: 1px solid #111;
		border-radius: 8px;
		box-shadow: 3px 3px 0 rgba(17, 17, 17, 0.96);
		display: flex;
		gap: 18px;
		justify-content: space-between;
		margin: 20px auto 0;
		max-width: 700px;
		padding: 6px 14px;
	}

	.support-label {
		background: #111;
		border-radius: 999px;
		color: #fff;
		display: none;
		font-size: 11px;
		font-weight: 900;
		margin-bottom: 8px;
		padding: 7px 12px;
	}

	.support-option h3 {
		font-size: 14px;
		font-weight: 900;
		line-height: 1.35;
		margin-bottom: 0;
		white-space: nowrap;
	}

	.support-text {
		display: none;
	}

	.support-price > p {
		align-items: baseline;
		color: var(--blue-dark);
		display: flex;
		font-size: 10px;
		font-weight: 900;
		gap: 2px;
		margin-bottom: 0;
		white-space: nowrap;
	}

	.support-price span {
		font-size: 22px;
		line-height: 1;
	}

	.support-price,
	.support-price ul {
		align-items: center;
		display: flex;
		gap: 9px;
	}

	.support-price li {
		font-size: 8px;
		line-height: 1.35;
		padding-left: 17px;
		white-space: nowrap;
	}

	.support-price li::before {
		font-size: 8px;
		height: 13px;
		line-height: 1;
		top: 50%;
		transform: translateY(-50%);
		width: 13px;
	}

	.support-price li:nth-child(n + 2) {
		display: none;
	}

	.flow {
		background: #fff;
		padding: 10px 24px 12px;
	}

	.flow-grid {
		display: grid;
		gap: 18px;
		grid-template-columns: repeat(5, minmax(0, 1fr));
		margin: 0 auto;
		max-width: 700px;
		position: relative;
	}

	.flow-grid article {
		background: #fff;
		border: 1px solid var(--line);
		border-radius: 10px;
		min-height: 78px;
		padding: 0 7px 6px;
		position: relative;
		text-align: center;
	}

	.flow-grid article:not(:last-child)::after {
		border-right: 2px solid var(--blue);
		border-top: 2px solid var(--blue);
		content: '';
		height: 8px;
		position: absolute;
		right: -16px;
		top: 39px;
		transform: rotate(45deg);
		width: 8px;
	}

	.flow-grid article > span {
		align-items: center;
		background: var(--blue);
		border-radius: 50%;
		color: #fff;
		display: flex;
		font-size: 14px;
		font-weight: 900;
		height: 28px;
		justify-content: center;
		margin: -13px auto 4px;
		width: 28px;
	}

	.flow-icon {
		align-items: center;
		color: var(--blue);
		display: flex;
		height: 30px;
		justify-content: center;
		margin: 0 auto 4px;
		width: 36px;
	}

	.flow-icon :global(svg) {
		display: block;
	}

	.flow-grid h3 {
		font-size: 11px;
		font-weight: 900;
		margin-bottom: 3px;
	}

	.flow-grid p {
		font-size: 7px;
		font-weight: 700;
		line-height: 1.6;
	}

	.faq {
		padding: 8px 24px 10px;
	}

	.faq h2 {
		margin-bottom: 8px;
		text-align: center;
	}

	.faq-list {
		background: #fff;
		border: 1px solid var(--line);
		border-radius: 12px;
		margin: 0 auto;
		max-width: 760px;
		overflow: hidden;
	}

	.faq article + article {
		border-top: 1px solid var(--line);
	}

	.faq button {
		align-items: center;
		background: #fff;
		border: 0;
		color: #111;
		cursor: pointer;
		display: grid;
		font: inherit;
		font-size: 13px;
		font-weight: 900;
		grid-template-columns: 34px 1fr 20px;
		min-height: 32px;
		padding: 0 18px;
		text-align: left;
		width: 100%;
	}

	.faq button span,
	.faq-answer span {
		color: var(--blue);
		font-size: 20px;
		font-weight: 900;
	}

	.faq button i {
		border-bottom: 2px solid #111;
		border-right: 2px solid #111;
		display: block;
		height: 7px;
		justify-self: end;
		transform: rotate(45deg);
		transition: transform 180ms ease;
		width: 7px;
	}

	.faq article.open button i {
		transform: rotate(-135deg);
	}

	.faq-answer {
		align-items: start;
		background: #fbfdff;
		display: grid;
		gap: 12px;
		grid-template-columns: 36px 1fr;
		padding: 12px 18px 16px;
	}

	.faq-answer[hidden] {
		display: none;
	}

	.faq-answer p {
		font-size: 12px;
		font-weight: 700;
		line-height: 1.75;
	}

	.contact-cta {
		align-items: stretch;
		background: #fff;
		border: 1px solid rgba(17, 17, 17, 0.08);
		border-radius: 14px;
		box-shadow: 0 8px 28px rgba(13, 60, 110, 0.06);
		color: #111;
		display: flex;
		flex-direction: column;
		gap: 18px;
		margin: 24px auto 28px;
		max-width: 812px;
		overflow: hidden;
		padding: 32px 40px 36px;
	}

	.cta-copy {
		text-align: center;
	}

	.contact-cta h2 {
		color: #111;
		font-size: 24px;
		font-weight: 900;
		line-height: 1.35;
		margin-bottom: 6px;
	}

	.contact-cta p {
		color: #4a5563;
		font-size: 13px;
		font-weight: 800;
		line-height: 1.7;
		margin-bottom: 0;
	}

	.contact-form {
		background: #fbfdff;
		border: 1px solid rgba(17, 17, 17, 0.08);
		border-radius: 12px;
		display: flex;
		flex-direction: column;
		gap: 16px;
		padding: 22px 22px 24px;
	}

	.contact-form .hp-field {
		display: none;
	}

	.form-grid {
		display: grid;
		gap: 14px;
		grid-template-columns: repeat(2, minmax(0, 1fr));
	}

	.form-group {
		display: flex;
		flex-direction: column;
		gap: 6px;
	}

	.form-group.full {
		grid-column: 1 / -1;
	}

	.form-group label {
		color: #1a3450;
		font-size: 12px;
		font-weight: 800;
	}

	.form-group .required {
		color: #e34c4c;
		margin-left: 4px;
	}

	.form-group input,
	.form-group textarea,
	.form-group select {
		background: #fff;
		border: 1px solid rgba(17, 17, 17, 0.14);
		border-radius: 8px;
		color: #111;
		font-family: inherit;
		font-size: 13px;
		padding: 10px 12px;
		transition: border-color 180ms ease;
	}

	.form-group input:focus,
	.form-group textarea:focus,
	.form-group select:focus {
		border-color: var(--blue);
		outline: none;
	}

	.form-group textarea {
		min-height: 72px;
		resize: vertical;
	}

	.contact-form .submit-btn {
		align-self: center;
		background: var(--green);
		border: 0;
		border-radius: 999px;
		box-shadow: inset 0 -2px 0 rgba(17, 17, 17, 0.18);
		color: #fff;
		cursor: pointer;
		font-size: 16px;
		font-weight: 900;
		min-width: 240px;
		padding: 14px 28px;
		transition:
			box-shadow 180ms ease,
			transform 180ms ease;
	}

	.contact-form .submit-btn:hover {
		box-shadow:
			inset 0 -2px 0 rgba(17, 17, 17, 0.18),
			5px 5px 0 #111;
		transform: translate(-2px, -2px);
	}

	.lp-footer {
		align-items: center;
		background: #fff;
		display: flex;
		flex-direction: column;
		gap: 8px;
		padding: 6px 24px 12px;
		text-align: center;
	}

	.lp-footer nav {
		display: flex;
		flex-wrap: wrap;
		font-size: 13px;
		font-weight: 800;
		gap: 20px;
		justify-content: center;
	}

	.lp-footer p {
		color: #666;
		font-size: 12px;
	}

	@media (max-width: 820px) {
		.lp-header {
			height: 58px;
			max-width: calc(100vw - 32px);
			padding: 0 18px;
			top: 14px;
			width: calc(100vw - 32px);
		}

		.desktop-nav {
			display: none;
		}

		.brand span {
			font-size: 16px;
		}

		.brand strong {
			font-size: 29px;
		}

		.header-cta {
			font-size: 12px;
			padding: 12px 14px;
		}

		.hero {
			padding: 94px 18px 58px;
		}

		.hero-inner {
			display: flex;
			flex-direction: column;
			gap: 28px;
			min-height: 0;
			text-align: center;
		}

		.hero-badges {
			justify-content: center;
		}

		.hero h1 {
			font-size: 45px;
		}

		.hero-lead {
			font-size: 16px;
		}

		.hero-visual {
			min-height: 310px;
			width: min(100%, 430px);
		}

		.hero-visual img {
			margin: 0 auto;
			max-width: 360px;
			transform: none;
			width: 100%;
		}

		.features {
			background:
				radial-gradient(circle, rgba(255, 255, 255, 0.2) 1.5px, transparent 1.5px) right 40px top
					284px / 18px 18px,
				linear-gradient(#fff 0 94px, var(--blue) 94px);
			padding: 24px 18px 62px;
		}

		.problem-card {
			display: flex;
			flex-direction: column;
			gap: 10px;
			padding: 24px 22px 28px;
		}

		.problem-visual {
			max-width: 210px;
			width: min(100%, 210px);
		}

		.problem-copy h2 {
			font-size: 23px;
		}

		.benefit-grid,
		.plan-list,
		.flow-grid {
			grid-template-columns: 1fr;
		}

		.benefit-card {
			min-height: 0;
		}

		.plan-card.featured {
			transform: none;
		}

		.recommend {
			position: static;
			margin: -24px -22px 18px;
		}

		.support-option {
			display: grid;
			gap: 10px;
			grid-template-columns: 1fr;
			padding: 22px 24px;
			text-align: center;
		}

		.support-label,
		.support-price > p {
			justify-content: center;
		}

		.support-price,
		.support-price ul {
			display: grid;
			gap: 10px;
			justify-content: center;
			text-align: left;
		}

		.support-price li {
			display: block;
			font-size: 12px;
			white-space: normal;
		}

		.flow-grid {
			max-width: 440px;
		}

		.flow-grid article {
			min-height: 0;
			padding: 0 22px 24px;
		}

		.flow-grid article:not(:last-child)::after {
			bottom: -18px;
			left: 50%;
			right: auto;
			top: auto;
			transform: translateX(-50%) rotate(135deg);
		}

		.contact-cta {
			border-radius: 0;
			margin: 24px 0 20px;
			padding: 28px 18px 32px;
		}

		.contact-form {
			padding: 18px 16px 22px;
		}

		.form-grid {
			grid-template-columns: 1fr;
		}
	}

	@media (max-width: 540px) {
		.hero-badges {
			gap: 7px;
			margin-bottom: 18px;
		}

		.hero-badges span {
			font-size: 11px;
			padding: 8px 11px;
		}

		.hero h1 {
			font-size: 39px;
		}

		.line-button {
			font-size: 16px;
			min-width: min(100%, 292px);
			padding: 17px 26px;
		}

		.hero-visual {
			min-height: 260px;
		}

		.solution-heading p {
			font-size: 23px;
		}

		.section-heading h2,
		.faq h2 {
			font-size: 27px;
		}

		.pricing .section-heading h2 {
			font-size: 24px;
		}

		.price span,
		.support-price span {
			font-size: 36px;
		}

		.faq button {
			font-size: 13px;
			grid-template-columns: 28px 1fr 18px;
			padding: 0 14px;
		}

		.faq-answer {
			grid-template-columns: 28px 1fr;
			padding: 16px 14px 20px;
		}
	}
</style>
