// Text is carried over from the previous site or the reviewed manuscripts; do not add facts here.
import caseData from './cases.json';
import projects from '$lib/corporate/projects.json';
import manifestSource from '$lib/corporate/generated/manifest.json?raw';

export const site = {
	name: '株式会社Lanespire',
	nameEn: 'Lanespire Inc.',
	url: 'https://lanespire.com/',
	email: 'info@lanespire.com',
	title: '株式会社Lanespire | AI導入・業務自動化・システム開発',
	description:
		'株式会社Lanespireは、AI導入・業務自動化・Web/SaaS開発を支援する技術パートナーです。要件整理から設計・開発、導入後の運用まで一貫して対応します。',
	ogTitle: '株式会社Lanespire | AIとシステム開発で、企業の変革を支える。',
	ogDescription:
		'AI導入・業務自動化・Web/SaaS開発。要件整理から導入後の運用まで一貫して支援します。',
	ogImage: 'https://lanespire.com/ogp/lanespire-og.png',
	tagline: 'AI・業務自動化・システム開発'
};

export const nav = [
	{ href: '/#cases', label: '開発事例' },
	{ href: '/#services', label: '任せられる仕事' },
	{ href: '/#process', label: '進め方' },
	{ href: '/#company', label: '会社概要' },
	{ href: '/#faq', label: 'よくある質問' }
];

export const hero = {
	eyebrow: 'AI & SOFTWARE DEVELOPMENT',
	lines: ['AIとシステム開発で、', '企業の変革を支える。'],
	lead: [
		'株式会社Lanespireは、AI導入・業務自動化・Web/SaaS開発を支援する技術パートナーです。',
		'要件整理から導入後の運用まで、一貫して対応します。'
	],
	primary: { href: '/#cases', label: '開発事例を見る' },
	secondary: { href: '/#contact', label: '開発を相談する' },
	scopeLabel: '任せられる工程',
	scope: [
		'実装',
		'外部サービス連携',
		'AWSの基盤・認証・自動デプロイ・監視',
		'Webシステムの設計と開発'
	]
};

export type CaseSection = { h: string; items: string[] };
export type CaseItem = {
	slug: string;
	title: string;
	label: string | null;
	featured: boolean;
	meta: { k: string; v: string }[];
	tech: string[];
	summary: string;
	sections: CaseSection[];
};

export const cases: CaseItem[] = caseData;

export const casesSection = {
	eyebrow: 'CASES',
	lines: ['代表が担当した', '開発事例'],
	lead: [
		'業務委託での開発から自社サービスまで。',
		'業務課題に応じたシステムの開発実績をご紹介します。'
	],
	note: '企業名は非公開で掲載しています。',
	more: 'ほかの事例',
	read: '事例を読む',
	consult: '案件の概要をメールでお知らせください。'
};

// Shown only on case pages, which are opened from sales emails. Answers are copied verbatim from the deck outline.
export const partnerNote = {
	title: '制作会社・広告代理店・開発会社の方へ',
	rows: [
		{ k: '窓口', v: '窓口は貴社のままです。貴社のお客様へ直接連絡しません。' },
		{ k: '見積りの単位', v: '案件ごとの見積りです。成果物単位で、時間売りや人月ではありません。' },
		{ k: '返信', v: '1営業日以内に返信します。' }
	]
};

type Asset = { card: ImageSize; detail: ImageSize };
type ImageSize = { src: string; width: number; height: number };
const manifest: Record<string, Asset> = JSON.parse(manifestSource);

export const products = projects
	.filter((project) => project.kind === 'owned' && project.url)
	.map((project) => {
		const asset = manifest[project.id];
		if (!asset) throw new Error(`Missing asset: ${project.id}. Run npm run prepare:corporate.`);
		return {
			id: project.id,
			name: project.name,
			tag: project.tag,
			description: project.description,
			url: project.url as string,
			color: project.color,
			image: asset.card
		};
	});

export const productsSection = { title: '自社サービス', link: '公開サイト' };

export const services = {
	eyebrow: 'SERVICES',
	lines: ['任せられる仕事'],
	lead: ['業務の改善から、新規サービスの開発まで。', '課題に応じた技術と進め方をご提案します。'],
	items: [
		{
			en: 'AI INTEGRATION',
			title: 'AI導入・活用支援',
			text: '社内情報の検索や問い合わせ対応など、業務の中で活用できるAIを設計・開発します。',
			points: ['AIエージェント開発', 'RAG・社内データ活用', '文章・画像・音声AIの活用'],
			cta: 'AI活用について相談する'
		},
		{
			en: 'AUTOMATION',
			title: '業務自動化・システム連携',
			text: '転記・通知・集計などの定型業務を整理し、既存のツールやシステムを連携します。',
			points: ['ワークフローの設計・構築', 'API連携・RPA', '集計・レポートの自動化'],
			cta: '業務改善について相談する'
		},
		{
			en: 'SOFTWARE DEVELOPMENT',
			title: 'Web・SaaS開発',
			text: '業務システムや新規プロダクトの企画・設計から、開発・公開・運用まで対応します。',
			points: ['業務システム・Webアプリ', 'SaaS・API開発', '新規事業のMVP開発'],
			cta: 'システム開発を相談する'
		},
		{
			en: 'WEB COMMUNICATION',
			title: 'Webサイト・LP制作',
			text: '企業・サービスの情報を整理し、閲覧者の理解とお問い合わせにつながるWebサイトを制作します。',
			points: ['コーポレートサイト', 'LP・サービスサイト', 'CMS導入・保守運用'],
			cta: 'Web制作について相談する'
		}
	],
	relatedLabel: '関連サービス',
	related: [
		{ name: 'Launch LP', text: 'LP制作サービス', href: 'https://launch-lp.lanespire.com/' },
		{ name: 'Lanespire MVP', text: 'MVP開発サービス', href: 'https://mvp.lanespire.com/' }
	]
};

export const approach = {
	eyebrow: 'OUR APPROACH',
	lines: ['進め方'],
	lead: ['技術の導入を目的にせず、', '業務で活用されることを重視します。'],
	principles: [
		{
			title: '業務要件を起点に設計',
			text: '現在の業務と利用者の課題を整理し、目的に合う機能・画面・システム構成を検討します。'
		},
		{
			title: '進捗・費用・リスクを共有',
			text: '開発状況と検討事項を共有し、認識を合わせながら進行。実際の画面や機能を確認できる進め方を重視します。'
		},
		{
			title: '導入後の運用まで考慮',
			text: '公開・納品で区切らず、利用環境への導入と運用を見据えて設計。稼働後の改善も支援します。'
		}
	],
	phasesTitle: 'ご相談から運用までの対応範囲',
	phasesLead: 'ご依頼内容に応じて、必要な工程をご提案します。',
	phases: [
		{ title: '要件整理', text: '現状・目的・優先度の確認' },
		{ title: '設計', text: '画面・機能・構成の検討' },
		{ title: '開発・検証', text: '実装・動作確認・テスト' },
		{ title: '導入', text: '公開・利用開始の支援' },
		{ title: '運用・改善', text: '運用支援・継続的な改善' }
	]
};

export const company = {
	eyebrow: 'COMPANY',
	lines: ['会社概要'],
	lead: ['AI・Web・業務システムを通じて、', '企業の事業推進を支援します。'],
	rows: [
		{ k: '商号', v: ['株式会社Lanespire', 'Lanespire Inc.'] },
		{ k: '代表取締役', v: ['高橋 元希'] },
		{ k: '所在地', v: ['〒104-0061', '東京都中央区銀座1丁目12番4号', 'N&E BLD. 6F'] },
		{
			k: '事業内容',
			v: [
				'AI導入支援・業務自動化',
				'Web制作・SaaS開発',
				'NoCode / LowCodeによるサービス開発',
				'モバイルアプリケーション開発・受託開発'
			]
		}
	]
};

export const faq = {
	eyebrow: 'FAQ',
	lines: ['よくある質問'],
	items: [
		{
			q: '要件が固まっていない段階でも相談できますか。',
			a: 'はい。現在の課題や実現したいことを伺い、対応範囲・優先度・進め方を整理するところからご相談いただけます。'
		},
		{
			q: '既存のツールやシステムとの連携は可能ですか。',
			a: 'API連携やワークフローの構築に対応しています。連携先の仕様・権限・利用条件を確認したうえで、実現方法をご提案します。'
		},
		{
			q: '開発後の保守・運用も依頼できますか。',
			a: '導入後の運用・改善についてもご相談いただけます。対応範囲やサポート条件は、ご依頼内容に応じて事前に確認します。'
		},
		{
			q: '費用や開発期間はどのように決まりますか。',
			a: '必要な機能・連携先・開発範囲・運用要件を確認して個別にご提案します。ご予算や希望時期がある場合は、ご相談時にお知らせください。'
		}
	]
};

export const contact = {
	eyebrow: 'CONTACT',
	lines: ['開発・導入に関する', 'お問い合わせ'],
	lead: [
		'AI活用、業務改善、システム開発のご相談を承っております。',
		'要件整理の段階からご相談ください。'
	],
	info: [
		{ k: '相談方法', v: 'オンライン対応', sub: 'Google Meet' },
		{ k: '受付時間', v: '平日 10:00–19:00', sub: '' },
		{ k: '初回相談', v: '30分・無料', sub: '' }
	],
	small: '対応範囲・費用・スケジュールは、ご相談内容に応じてご提案いたします。',
	subjects: [
		'AI導入・活用支援',
		'業務自動化・システム連携',
		'Web・SaaS開発',
		'Webサイト・LP制作',
		'その他'
	],
	privacy: [
		'ご入力いただいた会社名・お名前・メールアドレス・ご相談内容は、お問い合わせへの回答およびご相談対応のために利用します。',
		'確認画面の「この内容で送信する」を押すと、当社が利用するNetlify Formsを通じて情報が送信されます。送信前の入力内容をブラウザーの永続ストレージに保存する処理は行っていません。機密情報や第三者の個人情報は記載しないでください。',
		'実績の紹介画像は本サイトから配信します。利用状況の把握のためにGoogle アナリティクスを利用しています。フォームの入力内容はGoogle アナリティクスに送信しません。お問い合わせ先：'
	]
};

export const structuredData = {
	'@context': 'https://schema.org',
	'@graph': [
		{
			'@type': 'Organization',
			'@id': 'https://lanespire.com/#organization',
			name: site.name,
			alternateName: site.nameEn,
			url: site.url,
			description: site.description,
			email: site.email,
			address: {
				'@type': 'PostalAddress',
				postalCode: '104-0061',
				addressRegion: '東京都',
				addressLocality: '中央区',
				streetAddress: '銀座1丁目12番4号 N&E BLD. 6F',
				addressCountry: 'JP'
			},
			contactPoint: {
				'@type': 'ContactPoint',
				contactType: 'お問い合わせ',
				email: site.email,
				url: 'https://lanespire.com/#contact',
				availableLanguage: 'ja'
			},
			hasOfferCatalog: {
				'@type': 'OfferCatalog',
				name: '事業内容',
				itemListElement: [
					...services.items.map((item) => ({
						'@type': 'Offer',
						itemOffered: { '@type': 'Service', name: item.title, description: item.text }
					})),
					{
						'@type': 'Offer',
						itemOffered: {
							'@type': 'Service',
							name: 'Lanespire MVP検証パッケージ',
							url: 'https://mvp.lanespire.com/'
						}
					},
					{
						'@type': 'Offer',
						itemOffered: {
							'@type': 'Service',
							name: 'Launch LP - LP制作サービス',
							url: 'https://launch-lp.lanespire.com/'
						}
					}
				]
			}
		},
		{
			'@type': 'WebSite',
			'@id': 'https://lanespire.com/#website',
			name: site.name,
			url: site.url,
			inLanguage: 'ja',
			publisher: { '@id': 'https://lanespire.com/#organization' }
		},
		{
			'@type': 'FAQPage',
			'@id': 'https://lanespire.com/#faq',
			mainEntity: faq.items.map((item) => ({
				'@type': 'Question',
				name: item.q,
				acceptedAnswer: { '@type': 'Answer', text: item.a }
			}))
		}
	]
};

export const jsonLd = (data: unknown) =>
	`<script type="application/ld+json">${JSON.stringify(data).replace(/</g, '\\u003c')}</${'script'}>`;
