<script lang="ts">
	import type { Picture } from 'vite-imagetools';
	import { fade } from 'svelte/transition';
	import {
		ArrowRight,
		Bot,
		BriefcaseBusiness,
		Building2,
		CalendarDays,
		CheckCircle2,
		ClipboardCheck,
		Clock,
		Code2,
		ExternalLink,
		FilePenLine,
		LineChart,
		Mail,
		MapPin,
		Monitor,
		Rocket,
		ShieldCheck,
		Sparkles,
		Star,
		UserRound,
		UsersRound,
		WandSparkles,
		Workflow,
		X
	} from 'lucide-svelte';
	import heroImage from '$lib/assets/images/lp-hero-generated-transparent-v2.png?enhanced';
	import ctaImage from '$lib/assets/images/lp-cta-generated-transparent-v2.png?enhanced';
	import nightTableImage from '$lib/assets/images/work-nighttable-og.png?enhanced';
	import sakuEditImage from '$lib/assets/images/work-sakuedit-og.png?enhanced';
	import styleFrameImage from '$lib/assets/images/work-styleframe-og.png?enhanced';
	import lashmieImage from '$lib/assets/images/work-lashmie-og.png?enhanced';
	import marubatsuImage from '$lib/assets/images/work-marubatsu-og.png?enhanced';
	import extensionImage from '$lib/assets/images/work-anon-extension.png?enhanced';
	import crmImage from '$lib/assets/images/work-anon-crm.png?enhanced';
	import schedulingImage from '$lib/assets/images/work-anon-scheduling.png?enhanced';
	import roleplayImage from '$lib/assets/images/work-anon-roleplay.png?enhanced';
	import launchLpImage from '$lib/assets/images/work-launch-lp-og.png?enhanced';
	import mvpServiceImage from '$lib/assets/images/work-mvp-og.png?enhanced';
	import serviceAiImage from '$lib/assets/images/service-ai.png?enhanced';
	import serviceAutomationImage from '$lib/assets/images/service-automation.png?enhanced';
	import serviceWebImage from '$lib/assets/images/service-web.png?enhanced';
	import serviceSaasImage from '$lib/assets/images/service-saas.png?enhanced';

	type Work = {
		image: Picture;
		title: string;
		tag: string;
		body: string;
		url?: string;
		featured?: boolean;
		role: string;
		summary: string;
		points: string[];
		result: string;
	};

	type Service = {
		icon: typeof Bot;
		title: string;
		desc: string;
		items: string[];
		color: 'cyan' | 'green' | 'blue' | 'orange' | 'purple';
		image?: Picture;
		tag: string;
		summary: string;
		problems: string[];
		approach: string[];
		result: string;
		url?: string;
	};

	const promises = [
		{ icon: CheckCircle2, title: '相談無料', text: '仕様未確定OK' },
		{ icon: UsersRound, title: '代表が直接対応', text: '現場目線でご提案' },
		{ icon: ShieldCheck, title: '無理な営業なし', text: '安心してご相談可能' }
	];

	const concepts = [
		{
			icon: Sparkles,
			title: 'むずかしいAIではなく、\nやさしい仕組みを。',
			body: '特別な知識がなくても使えるUIで、誰もが成果を出せる仕組みをつくります。'
		},
		{
			icon: ClipboardCheck,
			title: '小さく始めて、\n確かに効果を。',
			body: 'まずは一部の業務から。効果を見ながら少しずつ、確実に広げていきます。'
		},
		{
			icon: LineChart,
			title: '定着・運用まで、\nしっかり伴走。',
			body: '導入して終わりにしません。現場に根づき、成果が続くまで伴走します。'
		}
	];

	const services: Service[] = [
		{
			icon: Bot,
			title: 'AI導入支援',
			desc: 'ChatGPT / Claude などを活用した業務改善・AIエージェント開発',
			items: ['要件整理・PoC', 'AIエージェント開発', 'RAG・データ活用'],
			color: 'cyan',
			image: serviceAiImage,
			tag: 'AI / 業務改善',
			summary:
				'「AIで何ができるか分からない」「触ってはいるが業務に活かせていない」段階から、現場で実際に効果が出るところまで伴走します。',
			problems: [
				'問い合わせ対応や議事録、メール下書きに毎日時間が取られている',
				'社内ドキュメントが多すぎて、必要な情報を探すだけで時間がかかる',
				'AIを試してみたが、結局自社業務にどう組み込めばいいか分からない'
			],
			approach: [
				'業務フローを棚卸しし、AIで効果が出るユースケースを優先順位付け',
				'ChatGPT / Claude を業務ツール（Slack・Notion・Google Workspace 等）と連携',
				'社内データを活用したRAG構築でナレッジ検索を実現',
				'PoCで効果検証してから、本番AIエージェントとして実装・運用'
			],
			result:
				'「触っているだけのAI」から「日々の業務が変わるAI」へ。導入後の運用・改善も継続支援します。'
		},
		{
			icon: Workflow,
			title: '業務自動化',
			desc: 'n8n / Zapier / Make を用いた業務フローの自動化',
			items: ['ワークフロー設計', 'RPA・API連携', 'レポート自動化'],
			color: 'green',
			image: serviceAutomationImage,
			tag: 'Automation / RPA',
			summary:
				'手作業で繰り返している転記・通知・承認・集計を、ツール同士の連携で「ボタンも押さずに回る状態」に整えます。',
			problems: [
				'毎週・毎月の定型レポートを手作業でCSVから組み立てている',
				'SaaSが増えすぎて、データの転記とSlack通知だけで時間が消える',
				'承認や差し戻しが属人化していて、止まっていることに気づきにくい'
			],
			approach: [
				'n8n / Zapier / Make を中心に、SaaS間のフローを一筆書きで設計',
				'kintone・Google Sheets・Slack・Notion などを軸にトリガー&アクション化',
				'月次レポートやKPIダッシュボードを自動生成、メールやSlackへ自動配信',
				'例外処理・通知・ログ整備までセットで設計し、止まらないフローに'
			],
			result:
				'「人が回している作業」を「ツールが回す作業」に。空いた時間で本質的な仕事に集中できます。'
		},
		{
			icon: Monitor,
			title: 'Web制作',
			desc: 'コーポレートサイト・LP・サービスサイトを企画・設計・実装',
			items: ['コーポレートサイト', 'LP・サービスサイト', 'CMS・保守運用'],
			color: 'blue',
			image: serviceWebImage,
			tag: 'Web / コンバージョン',
			summary:
				'「とりあえずページを作る」のではなく、目的・ターゲット・導線を整理した上で、成果につながるサイトを作ります。',
			problems: [
				'今のサイトが古く、問い合わせや採用に繋がっていない',
				'LPを作ったが、CV率が伸びず、どこを直せばいいか分からない',
				'更新が止まっていて、情報がいつのものか自分でも分からない'
			],
			approach: [
				'目的・ターゲット・KPIを定義し、情報設計とコピーから整理',
				'SvelteKit / Next.js / WordPress を要件に応じて選定し、高速・SEO対応で実装',
				'リリース後のCVR改善、ABテスト、CMS化までセットで継続支援',
				'採用や事業フェーズの変化に合わせて、軽く回せる更新体制を構築'
			],
			result:
				'「作って終わり」ではなく「成果が出るサイトに育つ」状態へ。継続改善の伴走までセットでお渡しします。'
		},
		{
			icon: BriefcaseBusiness,
			title: 'SaaS開発',
			desc: '企画・設計から開発・運用まで一気通貫で支援',
			items: ['プロダクト設計', 'Web / API開発', '運用・グロース支援'],
			color: 'orange',
			image: serviceSaasImage,
			tag: 'SaaS / 0→1 開発',
			summary:
				'業務フローや市場の課題を起点に、プロダクト企画から開発・運用・グロースまで一気通貫で支援します。',
			problems: [
				'業界に課題は見えているが、SaaSとして形にする手前で止まっている',
				'外注で作ってもらったプロダクトが、改善も運用もできず止まっている',
				'機能はあるが、料金体系・導線・継続率まで設計できていない'
			],
			approach: [
				'業務ヒアリングと競合調査からプロダクト要件・MVPを定義',
				'フロントエンド・バックエンド・インフラまで自社で設計・実装',
				'料金プラン、CV導線、オンボーディング、解約防止まで含めてSaaSとして設計',
				'リリース後のKPI追跡・改善サイクル・カスタマーサクセス整備まで伴走'
			],
			result:
				'「アイデアはあるが形にできない」状態から、「市場で動き、伸びるプロダクト」まで一緒に立ち上げます。'
		},
		{
			icon: Rocket,
			title: 'MVP開発',
			desc: '最短1週間でMVPを形にするスクラム開発パッケージ',
			items: ['1週間でMVP公開', 'スクラム開発', '低価格・高品質'],
			color: 'purple',
			tag: 'MVP / スタートアップ',
			summary:
				'アイデア段階のスタートアップや新規事業向けに、最短1週間で「動くもの」を出し、検証しながら磨き込むスクラム開発パッケージです。',
			problems: [
				'MVPを発注したいが、見積が高すぎてスタートが切れない',
				'要件をきっちり固めてから発注したいが、固まる前に時間が過ぎる',
				'外注で作ったが、その後の改善やAI機能追加が止まっている'
			],
			approach: [
				'最短1週間で初期MVPを公開し、触れる状態をつくる',
				'スクラムで週次に機能を追加・改善し、ユーザー検証と並行して開発',
				'AI機能・自動化・SaaS化までシームレスに拡張可能',
				'プロダクトの成長フェーズに合わせて伴走スコープを調整'
			],
			result:
				'「作ってから考える」ではなく「動かしながら磨く」MVP開発で、限られた時間と予算でも市場検証まで届きます。',
			url: '/mvp'
		}
	];

	const works: Work[] = [
		{
			image: nightTableImage,
			title: 'NightTable',
			tag: 'SaaS / 店舗運営DX',
			body: 'ナイトワーク向けに予約・テーブル・POS・キャスト管理を一体化した業務SaaS。',
			url: 'https://night-table.com/',
			featured: true,
			role: 'プロダクト企画 / UI設計 / SaaS開発 / LP制作',
			summary:
				'紙台帳、口頭共有、手計算に分散しがちな店舗運営を、スマホとPCで扱える一つの業務基盤に整理。予約、卓状況、延長、会計、キャスト管理まで現場の流れに沿って設計しました。',
			points: [
				'予約・卓管理・POS・バック計算を一画面の業務導線に統合',
				'夜業態の料金体系、延長、指名、税サ、インボイスに合わせた計算ルールを設計',
				'30日無料トライアルや料金比較まで含むSaaS LPを構築'
			],
			result:
				'締め作業の短縮、会計ミス削減、スタッフ間のリアルタイム共有を訴求できるプロダクト体験に整備。'
		},
		{
			image: sakuEditImage,
			title: 'SakuEdit',
			tag: 'AI / 動画編集SaaS',
			body: '動画アップロード後に無音カット・字幕生成・サムネイル作成まで進めるAI編集ツール。',
			url: 'https://sakuedit.com/',
			featured: true,
			role: 'AI機能設計 / Webアプリ開発 / 料金導線設計',
			summary:
				'YouTube・SNS動画の編集負担を減らすため、アップロード後の自動処理から微調整、書き出しまでを一連の体験として設計しました。',
			points: [
				'日本語音声解析によるタイムコード付き字幕生成',
				'無音・フィラー区間の自動検出とカット編集導線',
				'無料プランとProプランの比較・登録導線を整備'
			],
			result:
				'編集作業を「動画を上げたら、編集は終わっている」と伝えられるプロダクトLPと体験に整理。'
		},
		{
			image: styleFrameImage,
			title: 'Style Frame',
			tag: 'AI / 美容・診断',
			body: '骨格・パーソナルカラー・顔タイプ・肌印象を横断し、似合う服やコスメを提案するAI診断アプリ。',
			url: 'https://styleframe.app/',
			featured: true,
			role: 'AI診断設計 / Webアプリ開発 / OGP・LP設計',
			summary:
				'骨格診断、パーソナルカラー診断、顔タイプ診断、肌印象を一つの体験にまとめ、利用者ごとのコーデ・アイテム提案へつなげるトータル診断サービスとして設計しました。',
			points: [
				'骨格・パーソナルカラー・顔タイプ・肌印象を横断する診断ロジック',
				'診断結果ごとのスタイル提案、コーデ・アイテム導線を設計',
				'スマホで診断開始から結果確認まで完結するUIを構築'
			],
			result:
				'複数の美容診断を一つの体験にまとめ、ユーザーが似合う方向性を直感的に把握できる診断サービスとして公開。'
		},
		{
			image: lashmieImage,
			title: 'Lashmie',
			tag: 'AI / Beauty SaaS',
			body: 'まつげサロン向けに写真1枚から仕上がりを可視化し、電子カルテに保存できるAIシミュレーションカルテ。',
			url: 'https://lashmie.com/',
			featured: true,
			role: 'AI機能設計 / SaaS開発 / LP制作',
			summary:
				'まつげ施術前の認識ずれを減らすため、顧客写真、デザイン設定、AI生成後のBefore/After、カルテ保存を一つの導線に整理しました。',
			points: [
				'写真アップロードからデザイン・カール・長さ・本数選択までの施術前フロー',
				'AIシミュレーション画像をBefore/Afterで確認するカウンセリング体験',
				'生成画像、施術設定、コメントを保存する電子カルテ機能'
			],
			result:
				'施術前に仕上がりイメージを共有し、カルテ管理までつながる美容サロン向けSaaSとして公開。'
		},
		{
			image: marubatsuImage,
			title: 'Marubatsu AI',
			tag: 'AI / EdTech・採点DX',
			body: '学校・塾向けにAI問題生成、Web配布、紙答案のOCR/OMR採点、分析レポートを統合するテスト運用基盤。',
			url: 'https://marubatsu.com/',
			featured: true,
			role: 'AI機能設計 / 教育SaaS開発 / 採点ワークフロー設計',
			summary:
				'教員や塾講師のテスト作成、配布、回収、採点、分析の負担を減らすため、Webテストと紙答案を同じ運用基盤で扱えるサービスとして設計しました。',
			points: [
				'単元・難易度・問題数をもとにしたAI問題案生成',
				'URL配布のWeb回答と紙答案のOCR/OMR採点を同じ画面で管理',
				'提出状況、平均点、設問別分析などを確認できるダッシュボード'
			],
			result:
				'作問から採点・集計までの作業を一気通貫にし、学校・塾の試験運用を効率化するプロダクトとして公開。'
		},
		{
			image: launchLpImage,
			title: 'Launch LP',
			tag: 'LP立ち上げサービス',
			body: '低価格・短納期でLPを立ち上げる制作サービス。料金プラン、FAQ、CTAまで一式を整備。',
			url: '/launch-lp',
			featured: true,
			role: 'サービス設計 / LP制作 / 価格設計 / CV導線設計',
			summary:
				'はじめてLPを発注する事業者でも依頼しやすいよう、制作範囲、料金、納期、運用サポートを明確にしたサービスページを構築しました。',
			points: [
				'Light / Standard / Pro の3プランを比較しやすく整理',
				'導入相談、制作フロー、FAQを1ページ内に集約',
				'スマホでも問い合わせまで迷わないCTA配置に調整'
			],
			result: 'サービス内容と価格の不安を減らし、導入相談へ進みやすいLPとして公開。'
		},
		{
			image: mvpServiceImage,
			title: 'Lanespire MVP',
			tag: 'MVP開発パッケージ',
			body: '最短1週間でMVPを公開するスクラム開発サービス。週次の中間デモで触りながら磨く。',
			url: 'https://mvp.lanespire.com/',
			featured: true,
			role: 'サービス設計 / 開発体制設計 / Webアプリ開発 / LP制作',
			summary:
				'スタートアップや新規事業の MVP 検証フェーズに合わせて、要件未確定でも着手できるスクラム型の固定価格パッケージを設計しました。',
			points: [
				'¥500,000〜の固定価格、3分割支払い（着手 / 中間 / 公開前）',
				'初回デモ最短7日 / 公開まで2-4週間のスケジュール設計',
				'認証・管理画面・DB設計・API連携・運用ドキュメントまで一括'
			],
			result:
				'「作ってから考える」ではなく「動かしながら磨く」開発で、限られた予算でも市場検証まで届けるサービスとして公開。'
		},
		{
			image: extensionImage,
			title: 'Chrome拡張',
			tag: 'Extension / 自動化',
			body: '日常的なブラウザ操作を効率化するChrome拡張機能。',
			role: '拡張機能開発 / UI実装',
			summary:
				'定型的な入力、確認、画面操作をブラウザ上で扱いやすくするための軽量な拡張機能を実装しました。',
			points: [
				'繰り返し操作のショートカット化',
				'既存Webサービスの操作導線に合わせたUI',
				'小さく導入できる業務補助ツールとして設計'
			],
			result: '日々の作業時間を削減し、属人的な操作手順を標準化。'
		},
		{
			image: crmImage,
			title: '営業CRM',
			tag: '業務システム / CRM',
			body: '営業活動、見積、顧客フォローを一元管理する社内CRM。',
			role: '業務設計 / Webアプリ開発',
			summary:
				'案件管理がスプレッドシートやチャットに分散している状態から、営業チームで同じ情報を見られるCRMへ整理しました。',
			points: [
				'顧客・案件・ステータスの一元管理',
				'見積とフォロー予定の可視化',
				'営業会議で使えるダッシュボード設計'
			],
			result: '抜け漏れを減らし、営業状況をチームで確認できる状態に改善。'
		},
		{
			image: schedulingImage,
			title: '日程調整SaaS',
			tag: 'SaaS / スケジューリング',
			body: '候補日提示から予約確定までを自動化する日程調整プロダクト。',
			role: 'SaaS設計 / フロントエンド開発',
			summary:
				'商談、面談、サポート予約など、複数人が関わる日程調整をスムーズにする予約導線を設計しました。',
			points: [
				'空き時間の提示と予約確定フロー',
				'ダブルブッキングを防ぐ状態管理',
				'通知やリマインドを想定した設計'
			],
			result: '調整の往復を減らし、予約完了までの摩擦を削減。'
		},
		{
			image: roleplayImage,
			title: 'AI営業ロープレ',
			tag: 'AI / 教育・トレーニング',
			body: 'AIが顧客役になり、営業トークを反復練習できるトレーニングツール。',
			role: 'AIプロトタイプ開発 / UX設計',
			summary:
				'新人教育や商談準備で使えるよう、AIとの対話を通じて営業トークを練習し、改善点を振り返れる体験を設計しました。',
			points: [
				'顧客役AIとのロープレ会話',
				'会話ログをもとにした振り返り',
				'業界・商材ごとのシナリオ展開を想定'
			],
			result: 'トレーニング機会を増やし、実商談前の準備品質を底上げ。'
		}
	];

	let selectedWork: Work | null = null;
	let selectedService: Service | null = null;
	let contactForm = {
		name: '',
		email: '',
		company: '',
		message: ''
	};
	let contactState: 'idle' | 'sending' | 'success' | 'error' = 'idle';
	let contactErrorMessage = '';

	function openWork(work: Work) {
		selectedWork = work;
	}

	function closeWork() {
		selectedWork = null;
	}

	function openService(service: Service) {
		selectedService = service;
	}

	function closeService() {
		selectedService = null;
	}

	function closeServiceAndGoToContact() {
		closeService();
		requestAnimationFrame(() => goToSection('contact'));
	}

	function openSelectedWorkUrl() {
		if (!selectedWork?.url || typeof window === 'undefined') return;

		if (selectedWork.url.startsWith('http')) {
			window.open(selectedWork.url, '_blank', 'noopener,noreferrer');
			return;
		}

		window.location.href = selectedWork.url;
	}

	const flow = [
		{
			icon: UsersRound,
			title: 'ヒアリング・要件整理',
			body: '課題やゴールを整理し、優先度の高いテーマを特定。'
		},
		{
			icon: FilePenLine,
			title: '設計・プロトタイプ',
			body: '使いやすいUI/UXと最小構成のプロトタイプを作成。'
		},
		{
			icon: Code2,
			title: '開発・テスト',
			body: '必要な機能を開発し、品質を担保してリリース準備。'
		},
		{ icon: Rocket, title: 'リリース・導入支援', body: 'スムーズな導入と現場トレーニングを実施。' },
		{
			icon: LineChart,
			title: '運用・改善',
			body: 'データを活用して改善を継続。成果を最大化します。'
		}
	];

	const reasons = [
		{ icon: WandSparkles, title: '現場目線の提案', body: 'ユーザー体験を重視した設計' },
		{ icon: FilePenLine, title: '小さく始める導入', body: 'スモールスタートでリスクを最小化' },
		{ icon: ClipboardCheck, title: '透明性のある開発', body: '進捗・見積・リスクをオープンに共有' },
		{ icon: ShieldCheck, title: '高い技術力', body: 'AI・自動化・Web・SaaSまで対応' },
		{ icon: Star, title: '伴走型サポート', body: '長く付き合えるパートナーとして支援' }
	];

	function goToSection(id: string) {
		if (typeof document === 'undefined') return;
		document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.key !== 'Escape') return;
		if (selectedService) closeService();
		else if (selectedWork) closeWork();
	}

	function handleModalBackdropClick(event: MouseEvent) {
		if (event.target !== event.currentTarget) return;
		if (selectedService) closeService();
		else if (selectedWork) closeWork();
	}

	function closeWorkAndGoToContact() {
		closeWork();
		requestAnimationFrame(() => goToSection('contact'));
	}

	async function submitContact() {
		if (typeof window === 'undefined') return;
		if (contactState === 'sending') return;

		contactState = 'sending';
		contactErrorMessage = '';

		const formData = new URLSearchParams();
		formData.append('form-name', 'contact');
		formData.append('name', contactForm.name);
		formData.append('email', contactForm.email);
		formData.append('company', contactForm.company);
		formData.append('message', contactForm.message);

		try {
			const res = await fetch('/', {
				method: 'POST',
				headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
				body: formData.toString()
			});
			if (!res.ok) throw new Error(`HTTP ${res.status}`);
			contactState = 'success';
			contactForm = { name: '', email: '', company: '', message: '' };
		} catch (err) {
			contactState = 'error';
			contactErrorMessage =
				'送信に失敗しました。お手数ですが info@lanespire.com まで直接ご連絡ください。';
		}
	}
</script>

<svelte:window on:keydown={handleKeydown} />

<svelte:head>
	<title>Lanespire - AIを、現場の人が使える形にする。</title>
	<meta
		name="description"
		content="LanespireはAI導入支援、業務自動化、Web制作、SaaS開発で、現場の業務をやさしく効率化する開発パートナーです。"
	/>
	<meta name="theme-color" content="#ffffff" />
	<link rel="canonical" href="https://lanespire.com/" />

	<!-- Open Graph -->
	<meta property="og:type" content="website" />
	<meta property="og:site_name" content="Lanespire" />
	<meta property="og:title" content="Lanespire - AIを、現場の人が使える形にする。" />
	<meta
		property="og:description"
		content="LanespireはAI導入支援、業務自動化、Web制作、SaaS開発で、現場の業務をやさしく効率化する開発パートナーです。"
	/>
	<meta property="og:url" content="https://lanespire.com/" />
	<meta property="og:image" content="https://lanespire.com/ogp/lanespire-og.png" />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta property="og:locale" content="ja_JP" />

	<!-- Twitter Card -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="Lanespire - AIを、現場の人が使える形にする。" />
	<meta
		name="twitter:description"
		content="LanespireはAI導入支援、業務自動化、Web制作、SaaS開発で、現場の業務をやさしく効率化する開発パートナーです。"
	/>
	<meta name="twitter:image" content="https://lanespire.com/ogp/lanespire-og.png" />

	<!-- JSON-LD: Organization + WebSite -->
	{@html `<script type="application/ld+json">${JSON.stringify({
		'@context': 'https://schema.org',
		'@graph': [
			{
				'@type': 'Organization',
				'@id': 'https://lanespire.com/#organization',
				name: '株式会社Lanespire',
				alternateName: 'Lanespire Inc.',
				url: 'https://lanespire.com/',
				logo: 'https://lanespire.com/ogp/lanespire-og.png',
				email: 'info@lanespire.com',
				sameAs: ['https://x.com/lanespire', 'https://github.com/lanespire']
			},
			{
				'@type': 'WebSite',
				'@id': 'https://lanespire.com/#website',
				url: 'https://lanespire.com/',
				name: 'Lanespire',
				publisher: { '@id': 'https://lanespire.com/#organization' },
				inLanguage: 'ja-JP'
			},
			{
				'@type': 'ItemList',
				name: 'Lanespireのサービス',
				itemListElement: [
					{
						'@type': 'Service',
						position: 1,
						name: 'AI導入支援',
						provider: { '@id': 'https://lanespire.com/#organization' }
					},
					{
						'@type': 'Service',
						position: 2,
						name: '業務自動化',
						provider: { '@id': 'https://lanespire.com/#organization' }
					},
					{
						'@type': 'Service',
						position: 3,
						name: 'Web制作',
						provider: { '@id': 'https://lanespire.com/#organization' }
					},
					{
						'@type': 'Service',
						position: 4,
						name: 'SaaS開発',
						provider: { '@id': 'https://lanespire.com/#organization' }
					},
					{
						'@type': 'Service',
						position: 5,
						name: 'MVP開発',
						url: 'https://mvp.lanespire.com/',
						provider: { '@id': 'https://lanespire.com/#organization' }
					}
				]
			}
		]
	})}</script>`}
</svelte:head>

<div class="lp-shell">
	<header class="site-header">
		<button
			class="brand brand-button"
			type="button"
			aria-label="Lanespire トップ"
			on:click={() => goToSection('top')}
		>
			<span class="brand-mark" aria-hidden="true"></span>
			<span>Lanespire</span>
		</button>

		<nav class="desktop-nav" aria-label="メインナビゲーション">
			<button type="button" on:click={() => goToSection('services')}>サービス</button>
			<button type="button" on:click={() => goToSection('works')}>実績</button>
			<button type="button" on:click={() => goToSection('concept')}>私たちについて</button>
			<button type="button" on:click={() => goToSection('flow')}>導入の流れ</button>
		</nav>

		<div class="header-actions">
			<a class="mail" href="mailto:info@lanespire.com">
				<Mail size={16} />
				<span><strong>info@lanespire.com</strong><small>メールでのご連絡</small></span>
			</a>
			<a class="primary small" href="#contact"><CalendarDays size={17} />AI導入を相談する</a>
		</div>
	</header>

	<main id="top">
		<section class="hero-section">
			<div class="hero-copy">
				<p class="eyebrow">AI・業務自動化の開発パートナー</p>
				<h1>
					<span class="line"><strong>AI</strong>を、現場の人が</span>
					<span class="line">使える形にする。</span>
				</h1>
				<p class="lead">
					難しいAI用語より、毎日の業務がどう楽になるか。<br
					/>私たちは、AI・Web・業務自動化・SaaSで、現場の「困っている」に寄り添い、使いやすく、続く仕組みをつくります。
				</p>
				<div class="hero-buttons">
					<a class="primary" href="#contact"
						><CalendarDays size={19} />AI導入を相談する<ArrowRight size={18} /></a
					>
					<a class="secondary" href="#works">実績を見る<ArrowRight size={18} /></a>
				</div>
				<div class="trust-row">
					{#each promises as promise}
						{@const Icon = promise.icon}
						<div class="trust-card">
							<Icon size={30} />
							<p><strong>{promise.title}</strong><span>{promise.text}</span></p>
						</div>
					{/each}
				</div>
			</div>

			<div class="hero-art">
				<div class="soft-blob"></div>
				<enhanced:img src={heroImage} alt="AI導入を相談するチームのイラスト" />
				<div class="floating-card assistant-card">
					<strong>AIアシスタント</strong>
					<span>議事録を生成しました</span>
					<i></i><i></i><i></i>
				</div>
				<div class="floating-card chart-card">
					<span>今月の削減時間</span>
					<strong>32.5<small>時間</small></strong>
					<em>▲ 81%</em>
					<div class="chart-line"></div>
				</div>
				<div class="floating-card flow-card">
					<strong>自動化フロー</strong>
					<div class="mini-flow">
						<span>入力</span><b></b><span>処理</span><b></b><span>出力</span>
					</div>
				</div>
			</div>
		</section>

		<section class="concept-section" id="concept">
			<h2>私たちの考え方 <span>| AIを、やさしく、わかりやすく。</span></h2>
			<div class="concept-grid">
				{#each concepts as concept, index}
					{@const Icon = concept.icon}
					<article class="concept-card">
						<Icon size={42} />
						<h3>{concept.title}</h3>
						<p>{concept.body}</p>
					</article>
					{#if index < concepts.length - 1}<span class="concept-arrow">→</span>{/if}
				{/each}
			</div>
		</section>

		<section class="services-section" id="services">
			<h2 class="section-title">サービス <span>✦</span></h2>
			<div class="service-grid">
				{#each services as service}
					{@const Icon = service.icon}
					<button
						type="button"
						class={`service-card ${service.color}`}
						on:click={() => openService(service)}
						aria-label={`${service.title} の詳細を見る`}
					>
						<Icon size={44} />
						<h3>{service.title}</h3>
						<p>{service.desc}</p>
						<ul>
							{#each service.items as item}<li>{item}</li>{/each}
						</ul>
						<span class="service-more">詳しく見る <ArrowRight size={15} /></span>
					</button>
				{/each}
			</div>
		</section>

		<section class="works-section" id="works">
			<h2 class="section-title">実績・プロダクト事例 <span>⌄</span></h2>
			<p class="section-lead">公開できるプロダクトと、近い支援領域の一部をご紹介します。</p>
			<div class="works-row">
				{#each works as work}
					<button
						type="button"
						class:featured={work.featured}
						class="work-card"
						on:click={() => openWork(work)}
						aria-label={`${work.title} の詳細を見る`}
					>
						<enhanced:img src={work.image} alt={work.title} loading="lazy" />
						<div>
							<span class="work-kicker">{work.role}</span>
							<h3>{work.title}</h3>
							<strong>{work.tag}</strong>
							<p>{work.body}</p>
							<span class="work-more">詳細を見る <ArrowRight size={13} /></span>
						</div>
					</button>
				{/each}
			</div>
		</section>

		{#if selectedWork}
			<div
				class="modal-backdrop"
				role="presentation"
				on:click={handleModalBackdropClick}
				transition:fade={{ duration: 120 }}
			>
				<div
					class="work-modal"
					role="dialog"
					aria-modal="true"
					aria-labelledby="work-modal-title"
					tabindex="-1"
				>
					<button class="modal-close" type="button" aria-label="閉じる" on:click={closeWork}>
						<X size={20} />
					</button>
					<div class="modal-visual">
						<enhanced:img src={selectedWork.image} alt={selectedWork.title} />
					</div>
					<div class="modal-copy">
						<p class="modal-tag">{selectedWork.tag}</p>
						<h3 id="work-modal-title">{selectedWork.title}</h3>
						<p class="modal-role">{selectedWork.role}</p>
						<p class="modal-summary">{selectedWork.summary}</p>
						<div class="modal-detail-grid">
							<div>
								<h4>支援内容</h4>
								<ul>
									{#each selectedWork.points as point}
										<li>{point}</li>
									{/each}
								</ul>
							</div>
							<div>
								<h4>ポイント</h4>
								<p>{selectedWork.result}</p>
							</div>
						</div>
						<div class="modal-actions">
							{#if selectedWork.url}
								<button type="button" class="primary" on:click={openSelectedWorkUrl}>
									サイトを見る <ExternalLink size={17} />
								</button>
							{/if}
							<button class="secondary" type="button" on:click={closeWorkAndGoToContact}
								>相談する <ArrowRight size={17} /></button
							>
						</div>
					</div>
				</div>
			</div>
		{/if}

		{#if selectedService}
			{@const ServiceIcon = selectedService.icon}
			<div
				class="modal-backdrop"
				role="presentation"
				on:click={handleModalBackdropClick}
				transition:fade={{ duration: 120 }}
			>
				<div
					class="work-modal service-modal"
					role="dialog"
					aria-modal="true"
					aria-labelledby="service-modal-title"
					tabindex="-1"
				>
					<button class="modal-close" type="button" aria-label="閉じる" on:click={closeService}>
						<X size={20} />
					</button>
					<div class={`modal-visual service-visual ${selectedService.color}`}>
						{#if selectedService.image}
							<enhanced:img src={selectedService.image} alt={selectedService.title} />
						{:else}
							<div class="service-visual-icon" aria-hidden="true">
								<ServiceIcon size={120} strokeWidth={1.4} />
							</div>
						{/if}
					</div>
					<div class="modal-copy">
						<p class="modal-tag">{selectedService.tag}</p>
						<h3 id="service-modal-title">{selectedService.title}</h3>
						<div class="modal-detail-grid service-detail-grid">
							<div class="service-problem-card">
								<h4>こんな課題に</h4>
								<ul>
									{#each selectedService.problems as problem}
										<li>{problem}</li>
									{/each}
								</ul>
							</div>
							<div class="service-approach-card">
								<h4>私たちのアプローチ</h4>
								<ul>
									{#each selectedService.approach as step}
										<li>{step}</li>
									{/each}
								</ul>
							</div>
						</div>
						<div class="modal-result-band">
							<strong>支援後のイメージ</strong>
							<p>{selectedService.result}</p>
						</div>
						<div class="modal-actions">
							{#if selectedService.url}
								<a class="primary" href={selectedService.url}
									>サービスページを見る <ArrowRight size={17} /></a
								>
							{:else}
								<button class="primary" type="button" on:click={closeServiceAndGoToContact}
									>このサービスを相談する <ArrowRight size={17} /></button
								>
							{/if}
						</div>
					</div>
				</div>
			</div>
		{/if}

		<section class="flow-section" id="flow">
			<h2 class="section-title">導入・開発の進め方 <span>⌄</span></h2>
			<p class="section-lead">最短で価値を届け、現場に定着するまで伴走します。</p>
			<div class="flow-grid">
				{#each flow as step, index}
					{@const Icon = step.icon}
					<article class="flow-step">
						<span>{String(index + 1).padStart(2, '0')}</span>
						<Icon size={34} />
						<h3>{step.title}</h3>
						<p>{step.body}</p>
					</article>
				{/each}
			</div>
		</section>

		<section class="reason-section">
			<h2 class="section-title">Lanespireが選ばれる理由</h2>
			<div class="reason-grid">
				{#each reasons as reason}
					{@const Icon = reason.icon}
					<article>
						<Icon size={28} />
						<div>
							<h3>{reason.title}</h3>
							<p>{reason.body}</p>
						</div>
					</article>
				{/each}
			</div>
		</section>

		<section class="contact-section" id="contact">
			<div class="contact-hero">
				<div class="contact-visual">
					<enhanced:img src={ctaImage} alt="相談中のイラスト" loading="lazy" />
				</div>
				<div class="contact-copy">
					<p class="contact-eyebrow">導入相談</p>
					<h2>まずは30分、課題の整理から。</h2>
					<p>
						AI導入、業務自動化、Web/SaaS開発のどこから始めるべきかを一緒に整理します。
						仕様が固まっていない段階でも問題ありません。
					</p>
					<div class="contact-points">
						<span><CheckCircle2 size={18} />オンライン対応</span>
						<span><CheckCircle2 size={18} />無理な営業なし</span>
						<span><CheckCircle2 size={18} />平日 10:00 - 19:00</span>
					</div>
				</div>
			</div>

			<div class="contact-panel">
				<div class="contact-methods">
					<a href="mailto:info@lanespire.com">
						<Mail size={22} />
						<strong>info@lanespire.com</strong>
						<span>メールで相談する</span>
					</a>
					<div>
						<CalendarDays size={22} />
						<strong>Google Meet対応</strong>
						<span>初回30分のオンライン相談</span>
					</div>
					<div>
						<Clock size={22} />
						<strong>平日 10:00 - 19:00</strong>
						<span>受付時間</span>
					</div>
				</div>

				{#if contactState === 'success'}
					<div class="contact-success" role="status">
						<CheckCircle2 size={28} />
						<div>
							<strong>相談内容を受け付けました。</strong>
							<span>担当より平日10:00–19:00に折り返しご連絡いたします（通常当日中）。</span>
						</div>
					</div>
				{:else}
					<form
						class="contact-form"
						name="contact"
						method="POST"
						data-netlify="true"
						data-netlify-honeypot="bot-field"
						on:submit|preventDefault={submitContact}
					>
						<input type="hidden" name="form-name" value="contact" />
						<p class="visually-hidden">
							<label>Do not fill this out: <input name="bot-field" /></label>
						</p>
						<div class="form-row">
							<label>
								<span>お名前</span>
								<input bind:value={contactForm.name} name="name" autocomplete="name" required />
							</label>
							<label>
								<span>メールアドレス</span>
								<input
									bind:value={contactForm.email}
									name="email"
									type="email"
									autocomplete="email"
									required
								/>
							</label>
						</div>
						<label>
							<span>会社名</span>
							<input bind:value={contactForm.company} name="company" autocomplete="organization" />
						</label>
						<label>
							<span>相談したい内容</span>
							<textarea
								bind:value={contactForm.message}
								name="message"
								rows="5"
								placeholder="例: 営業日報の自動化、社内ChatGPT活用、LP制作、SaaS開発の相談など"
								required
							></textarea>
						</label>
						<button class="primary cta-button" type="submit" disabled={contactState === 'sending'}>
							<CalendarDays size={22} />
							{contactState === 'sending' ? '送信中…' : '相談内容を送る'}
							<ArrowRight size={20} />
						</button>
						{#if contactState === 'error'}
							<p class="contact-error" role="alert">{contactErrorMessage}</p>
						{/if}
					</form>
				{/if}
			</div>
		</section>

		<section class="company-section" id="company" aria-labelledby="company-heading">
			<div class="company-head">
				<p class="eyebrow">Company</p>
				<h2 id="company-heading">会社情報</h2>
				<p class="company-lead">株式会社レーンスパイア（Lanespire Inc.）の会社概要です。</p>
			</div>

			<div class="company-grid">
				<dl class="company-table">
					<div>
						<dt><Building2 size={18} />商号</dt>
						<dd>株式会社レーンスパイア / Lanespire Inc.</dd>
					</div>
					<div>
						<dt><MapPin size={18} />所在地</dt>
						<dd>
							<address>
								〒104-0061<br />
								東京都中央区銀座１丁目１２番４号<br />
								Ｎ＆ＥＢＬＤ．６Ｆ
							</address>
						</dd>
					</div>
					<div>
						<dt><UserRound size={18} />代表取締役</dt>
						<dd>高橋 元希</dd>
					</div>
					<div>
						<dt><Mail size={18} />メール</dt>
						<dd><a href="mailto:info@lanespire.com">info@lanespire.com</a></dd>
					</div>
					<div>
						<dt><BriefcaseBusiness size={18} />事業内容</dt>
						<dd>
							AI導入支援・業務自動化、Web制作、SaaS開発、<br />
							NoCode/LowCodeによるサービス開発、<br />
							モバイルアプリケーション開発、受託開発
						</dd>
					</div>
				</dl>
			</div>
		</section>
	</main>

	<footer class="footer">
		<div class="footer-brand">
			<button class="brand brand-button" type="button" on:click={() => goToSection('top')}
				><span class="brand-mark" aria-hidden="true"></span><span>Lanespire</span></button
			>
			<p>AI・Web・業務自動化・SaaS開発で、事業の成長に伴走する開発パートナー。</p>
			<small>© 2024 Lanespire Inc.</small>
		</div>
		<nav>
			<strong>サービス</strong>
			<a href="#services">AI導入支援</a><a href="#services">業務自動化</a><a href="#services"
				>Web制作</a
			><a href="#services">SaaS開発</a><a href="/mvp">MVP開発</a>
		</nav>
		<nav>
			<strong>実績</strong>
			<a href="#works">プロダクト一覧</a>
		</nav>
		<nav>
			<strong>私たちについて</strong>
			<a href="#concept">ミッション</a><a href="#company">会社概要</a>
		</nav>
		<div class="footer-contact">
			<a class="mail-card" href="mailto:info@lanespire.com"
				><Mail size={19} /><strong>info@lanespire.com</strong><span>メールでのご連絡</span></a
			>
			<a class="form-link" href="#contact">お問い合わせフォーム <ArrowRight size={16} /></a>
		</div>
	</footer>
</div>

<style>
	:global(body) {
		background: #fbfaf7;
		color: #14223a;
		font-family:
			Inter,
			'Noto Sans JP',
			system-ui,
			-apple-system,
			BlinkMacSystemFont,
			'Segoe UI',
			sans-serif;
	}

	:global(html) {
		scroll-behavior: smooth;
	}

	.lp-shell {
		--ink: #14223a;
		--muted: #5e6b79;
		--teal: #1c9a91;
		--teal-2: #4dc5bd;
		--orange: #ff7a35;
		--line: #dce8e6;
		--panel: #ffffff;
		background:
			radial-gradient(circle at 78% 4%, rgba(79, 197, 189, 0.2), transparent 24%),
			linear-gradient(180deg, #fffefa 0%, #fbfaf7 70%, #ffffff 100%);
		color: var(--ink);
		min-height: 100vh;
	}

	.lp-shell :global(a) {
		color: inherit;
		text-decoration: none;
	}
	.lp-shell :global(p),
	.lp-shell :global(h1),
	.lp-shell :global(h2),
	.lp-shell :global(h3) {
		margin: 0;
	}

	.site-header {
		align-items: center;
		background: rgba(255, 255, 255, 0.88);
		border-bottom: 1px solid rgba(220, 232, 230, 0.86);
		backdrop-filter: blur(18px);
		display: flex;
		gap: 28px;
		height: 86px;
		justify-content: space-between;
		padding: 0 48px;
		position: sticky;
		top: 0;
		z-index: 30;
	}

	.brand {
		align-items: center;
		background: transparent;
		border: 0;
		color: inherit;
		cursor: pointer;
		display: inline-flex;
		gap: 12px;
		font-size: 34px;
		font-weight: 850;
		letter-spacing: -0.01em;
		white-space: nowrap;
	}
	.brand-mark {
		background: conic-gradient(
			from 40deg,
			var(--teal) 0 68%,
			transparent 68% 82%,
			#76d5cd 82% 100%
		);
		border-radius: 50%;
		display: block;
		height: 32px;
		position: relative;
		width: 32px;
	}
	.brand-mark::after {
		background: #fbfaf7;
		border-radius: 50%;
		content: '';
		height: 14px;
		position: absolute;
		right: 0;
		top: 9px;
		width: 14px;
	}

	.desktop-nav {
		align-items: center;
		display: flex;
		gap: 34px;
		font-size: 15px;
		font-weight: 800;
	}
	.desktop-nav button {
		background: transparent;
		border: 0;
		color: inherit;
		cursor: pointer;
		font: inherit;
		font-weight: inherit;
		transition: color 160ms ease;
	}
	.desktop-nav button:hover {
		color: var(--teal);
	}

	.header-actions {
		align-items: center;
		display: flex;
		gap: 18px;
	}
	.mail {
		align-items: center;
		color: var(--ink);
		display: flex;
		gap: 8px;
		font-size: 14px;
		font-weight: 800;
	}
	.mail span {
		display: grid;
		gap: 1px;
	}
	.mail small {
		color: var(--muted);
		font-size: 11px;
		font-weight: 700;
	}

	.primary,
	.secondary {
		align-items: center;
		border: 0;
		border-radius: 8px;
		cursor: pointer;
		display: inline-flex;
		font: inherit;
		font-weight: 850;
		gap: 10px;
		justify-content: center;
		line-height: 1;
		min-height: 54px;
		padding: 0 22px;
		transition:
			transform 160ms ease,
			box-shadow 160ms ease;
	}
	.primary {
		background: linear-gradient(135deg, #ff893f, var(--orange));
		color: #fff;
		box-shadow: 0 12px 24px rgba(255, 122, 53, 0.22);
	}
	.secondary {
		background: #fff;
		border: 1px solid #b9c8c8;
		color: var(--ink);
	}
	.primary:hover,
	.secondary:hover {
		transform: translateY(-2px);
	}
	.primary.small {
		min-height: 48px;
		padding: 0 18px;
	}

	main {
		margin: 0 auto;
		max-width: 1400px;
		padding: 0 40px 48px;
	}

	.hero-section {
		align-items: center;
		display: grid;
		gap: 38px;
		grid-template-columns: minmax(560px, 0.94fr) minmax(600px, 1.06fr);
		min-height: 610px;
		padding: 36px 0 28px;
	}
	.eyebrow {
		color: var(--teal);
		font-size: 20px;
		font-weight: 850;
		margin-bottom: 20px;
	}
	.hero-copy h1 {
		color: var(--ink);
		font-size: clamp(50px, 5.1vw, 70px);
		font-weight: 900;
		letter-spacing: 0;
		line-height: 1.28;
		margin-bottom: 26px;
	}

	.hero-copy h1 .line {
		display: block;
		white-space: nowrap;
	}

	.hero-copy h1 strong {
		color: var(--teal);
		font-size: 1.12em;
	}
	.lead {
		color: #314156;
		font-size: 18px;
		font-weight: 650;
		line-height: 2;
		margin-bottom: 28px;
		max-width: 610px;
	}
	.hero-buttons {
		display: flex;
		flex-wrap: wrap;
		gap: 16px;
		margin-bottom: 28px;
	}
	.trust-row {
		display: grid;
		gap: 16px;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		max-width: 650px;
	}
	.trust-card {
		align-items: center;
		background: rgba(255, 255, 255, 0.88);
		border: 1px solid var(--line);
		border-radius: 8px;
		box-shadow: 0 12px 30px rgba(23, 40, 48, 0.06);
		color: var(--ink);
		display: flex;
		gap: 14px;
		min-height: 78px;
		padding: 14px 16px;
	}
	.trust-card :global(svg) {
		color: var(--teal);
		flex: 0 0 auto;
	}
	.trust-card p {
		color: var(--ink);
		display: grid;
		gap: 3px;
	}
	.trust-card strong {
		color: var(--ink);
		font-size: 15px;
	}
	.trust-card span {
		color: var(--muted);
		font-size: 12px;
		font-weight: 700;
	}

	.hero-art {
		min-height: 560px;
		position: relative;
	}
	.soft-blob {
		display: none;
	}
	.hero-art > img {
		bottom: 0;
		display: block;
		position: absolute;
		right: -8px;
		width: min(760px, 108%);
		z-index: 2;
	}
	.floating-card {
		background: rgba(255, 255, 255, 0.9);
		border: 1px solid #cfdfdd;
		border-radius: 10px;
		box-shadow: 0 16px 38px rgba(35, 62, 70, 0.1);
		display: none;
		position: absolute;
		z-index: 3;
	}
	.assistant-card {
		display: grid;
		gap: 8px;
		left: 12px;
		padding: 18px 22px;
		top: 70px;
		width: 190px;
	}
	.assistant-card strong,
	.flow-card strong {
		font-size: 14px;
	}
	.assistant-card span {
		color: var(--muted);
		font-size: 12px;
		font-weight: 700;
	}
	.assistant-card i {
		background: #dfe9e9;
		border-radius: 999px;
		display: block;
		height: 7px;
		width: 84%;
	}
	.chart-card {
		padding: 18px 20px;
		right: 2px;
		top: 26px;
		width: 255px;
	}
	.chart-card span {
		color: var(--muted);
		font-size: 12px;
		font-weight: 800;
	}
	.chart-card strong {
		display: block;
		font-size: 34px;
		margin-top: 9px;
	}
	.chart-card small {
		font-size: 15px;
		margin-left: 3px;
	}
	.chart-card em {
		color: #1aa97f;
		display: block;
		font-size: 13px;
		font-style: normal;
		font-weight: 800;
		margin-top: 4px;
	}
	.chart-line {
		border-bottom: 3px solid var(--teal);
		border-right: 3px solid var(--teal);
		height: 42px;
		margin-top: 14px;
		transform: skew(-28deg);
		width: 170px;
	}
	.flow-card {
		bottom: 170px;
		padding: 18px 22px;
		right: 4px;
		width: 210px;
	}
	.mini-flow {
		align-items: center;
		color: #178e86;
		display: flex;
		font-size: 12px;
		font-weight: 800;
		gap: 9px;
		margin-top: 13px;
	}
	.mini-flow b {
		background: #9ecfca;
		height: 2px;
		width: 24px;
	}

	.concept-section,
	.services-section,
	.works-section,
	.flow-section,
	.reason-section {
		padding: 34px 0;
	}
	.concept-section h2,
	.section-title {
		color: var(--ink);
		font-size: 26px;
		font-weight: 900;
		letter-spacing: 0;
		text-align: center;
	}
	.concept-section h2 span,
	.section-title span {
		color: var(--teal);
		font-size: 18px;
	}
	.concept-grid {
		align-items: center;
		display: grid;
		gap: 24px;
		grid-template-columns: 1fr 24px 1fr 24px 1fr;
		margin: 28px auto 0;
		max-width: 1240px;
	}
	.concept-card,
	.service-card,
	.work-card,
	.flow-step {
		background: rgba(255, 255, 255, 0.86);
		border: 1px solid var(--line);
		border-radius: 8px;
		box-shadow: 0 18px 42px rgba(31, 50, 58, 0.05);
	}
	.concept-card {
		min-height: 178px;
		padding: 28px 30px;
	}
	.concept-card :global(svg) {
		color: var(--teal);
		margin-bottom: 12px;
	}
	.concept-card h3 {
		font-size: 20px;
		line-height: 1.6;
		white-space: pre-line;
	}
	.concept-card p {
		color: var(--muted);
		font-size: 13px;
		font-weight: 650;
		line-height: 1.9;
		margin-top: 8px;
	}
	.concept-arrow {
		color: var(--teal);
		font-size: 28px;
		font-weight: 900;
		text-align: center;
	}

	.service-grid {
		display: grid;
		gap: 22px;
		grid-template-columns: repeat(5, minmax(0, 1fr));
		margin-top: 26px;
	}
	.service-card {
		appearance: none;
		color: inherit;
		cursor: pointer;
		display: flex;
		flex-direction: column;
		font: inherit;
		padding: 28px 28px 26px;
		text-align: left;
		transition:
			border-color 180ms ease,
			box-shadow 180ms ease,
			transform 180ms ease;
		width: 100%;
	}
	.service-card:hover,
	.service-card:focus-visible {
		box-shadow: 0 26px 56px rgba(31, 50, 58, 0.12);
		outline: none;
		transform: translateY(-3px);
	}
	.service-card.cyan :global(svg),
	.service-card.cyan .service-more,
	.service-card.cyan li::marker {
		color: #14b8c5;
	}
	.service-card.cyan:hover,
	.service-card.cyan:focus-visible {
		border-color: rgba(20, 184, 197, 0.45);
	}
	.service-card.green :global(svg),
	.service-card.green .service-more {
		color: #35a853;
	}
	.service-card.green:hover,
	.service-card.green:focus-visible {
		border-color: rgba(53, 168, 83, 0.45);
	}
	.service-card.blue :global(svg),
	.service-card.blue .service-more {
		color: #1e8ce3;
	}
	.service-card.blue:hover,
	.service-card.blue:focus-visible {
		border-color: rgba(30, 140, 227, 0.45);
	}
	.service-card.orange :global(svg),
	.service-card.orange .service-more {
		color: #f27622;
	}
	.service-card.orange:hover,
	.service-card.orange:focus-visible {
		border-color: rgba(242, 118, 34, 0.45);
	}
	.service-card.purple :global(svg),
	.service-card.purple .service-more,
	.service-card.purple li::marker {
		color: #8b5cf6;
	}
	.service-card.purple:hover,
	.service-card.purple:focus-visible {
		border-color: rgba(139, 92, 246, 0.45);
	}
	.service-card h3 {
		font-size: 23px;
		margin: 16px 0 12px;
	}
	.service-card p {
		color: #4e5f70;
		font-size: 14px;
		font-weight: 650;
		line-height: 1.75;
		min-height: 74px;
	}
	.service-card ul {
		display: grid;
		gap: 8px;
		margin: 18px 0 24px;
		padding-left: 18px;
	}
	.service-card li {
		color: #26384d;
		font-size: 13px;
		font-weight: 750;
	}
	.service-card .service-more {
		align-items: center;
		display: inline-flex;
		font-size: 13px;
		font-weight: 850;
		gap: 5px;
		margin-top: auto;
	}

	.section-lead {
		color: var(--muted);
		font-size: 15px;
		font-weight: 750;
		margin-top: 8px;
		text-align: center;
	}
	.works-row {
		display: grid;
		gap: 18px;
		grid-template-columns: repeat(4, minmax(0, 1fr));
		margin: 28px auto 0;
		max-width: 1320px;
	}
	.work-card {
		background: #fff;
		border: 1px solid var(--line);
		border-radius: 10px;
		box-shadow: 0 18px 42px rgba(31, 50, 58, 0.05);
		color: inherit;
		cursor: pointer;
		font: inherit;
		min-width: 0;
		overflow: hidden;
		padding: 0;
		text-align: left;
		transition:
			border-color 160ms ease,
			box-shadow 160ms ease,
			transform 160ms ease;
	}
	.work-card.featured {
		border-color: rgba(28, 154, 145, 0.24);
	}
	.work-card:hover {
		border-color: rgba(28, 154, 145, 0.38);
		box-shadow: 0 24px 50px rgba(31, 50, 58, 0.09);
		transform: translateY(-3px);
	}
	.work-card img {
		aspect-ratio: 1.74 / 1;
		display: block;
		height: auto;
		object-fit: cover;
		width: 100%;
	}
	.work-card div {
		padding: 18px 18px 20px;
	}
	.work-kicker {
		color: var(--teal);
		display: block;
		font-size: 11px;
		font-weight: 850;
		line-height: 1.5;
		margin-bottom: 7px;
	}
	.work-card h3 {
		font-size: 19px;
		margin-bottom: 7px;
	}
	.work-card.featured h3 {
		font-size: 19px;
	}
	.work-card strong {
		color: #277ec4;
		display: block;
		font-size: 12px;
		margin-bottom: 9px;
	}
	.work-card p {
		color: #5a6878;
		font-size: 12px;
		font-weight: 650;
		line-height: 1.75;
		min-height: 62px;
	}
	.work-more {
		align-items: center;
		color: var(--teal);
		display: inline-flex;
		font-size: 13px;
		font-weight: 850;
		gap: 5px;
		margin-top: 12px;
	}

	.modal-backdrop {
		align-items: center;
		background: rgba(10, 24, 35, 0.42);
		display: flex;
		inset: 0;
		justify-content: center;
		padding: 28px;
		position: fixed;
		z-index: 80;
	}

	.work-modal {
		background: #fff;
		border: 1px solid rgba(220, 232, 230, 0.9);
		border-radius: 14px;
		box-shadow: 0 30px 90px rgba(10, 24, 35, 0.28);
		display: flex;
		flex-direction: column;
		max-height: min(880px, calc(100vh - 56px));
		max-width: 720px;
		overflow: auto;
		position: relative;
		width: min(100%, 720px);
	}

	.modal-close {
		align-items: center;
		background: #fff;
		border: 1px solid var(--line);
		border-radius: 999px;
		color: var(--ink);
		cursor: pointer;
		display: flex;
		height: 38px;
		justify-content: center;
		position: absolute;
		right: 16px;
		top: 16px;
		width: 38px;
		z-index: 2;
	}

	.modal-visual {
		align-items: center;
		background:
			radial-gradient(circle at 28% 22%, rgba(28, 154, 145, 0.14), transparent 32%), #f5faf8;
		display: flex;
		justify-content: center;
		padding: 28px 28px 24px;
	}

	.modal-visual img {
		border: 1px solid var(--line);
		border-radius: 10px;
		display: block;
		max-height: 260px;
		max-width: 100%;
		object-fit: contain;
		width: auto;
	}

	.modal-copy {
		padding: 44px 42px 38px;
	}

	.modal-tag {
		color: var(--teal);
		font-size: 13px;
		font-weight: 900;
		margin-bottom: 10px;
	}

	.modal-copy h3 {
		font-size: 34px;
		line-height: 1.2;
		margin-bottom: 12px;
	}

	.modal-role {
		color: #277ec4;
		font-size: 14px;
		font-weight: 850;
		margin-bottom: 18px;
	}

	.modal-summary {
		color: #415264;
		font-size: 15px;
		font-weight: 650;
		line-height: 1.9;
		margin-bottom: 24px;
	}

	.modal-detail-grid {
		display: grid;
		gap: 18px;
		grid-template-columns: 1fr;
		margin-bottom: 28px;
	}

	.modal-detail-grid h4 {
		font-size: 14px;
		margin-bottom: 10px;
	}

	.modal-detail-grid ul {
		display: grid;
		gap: 9px;
		margin: 0;
		padding-left: 18px;
	}

	.modal-detail-grid li,
	.modal-detail-grid p {
		color: #526374;
		font-size: 13px;
		font-weight: 650;
		line-height: 1.75;
	}

	.modal-actions {
		display: flex;
		flex-wrap: wrap;
		gap: 12px;
	}

	.service-visual {
		align-items: center;
		display: flex;
		justify-content: center;
	}
	.service-visual.cyan {
		background:
			radial-gradient(circle at 30% 25%, rgba(20, 184, 197, 0.22), transparent 55%), #f1fbfb;
	}
	.service-visual.green {
		background:
			radial-gradient(circle at 30% 25%, rgba(53, 168, 83, 0.22), transparent 55%), #f3fbf3;
	}
	.service-visual.blue {
		background:
			radial-gradient(circle at 30% 25%, rgba(30, 140, 227, 0.22), transparent 55%), #f1f7fd;
	}
	.service-visual.orange {
		background:
			radial-gradient(circle at 30% 25%, rgba(242, 118, 34, 0.22), transparent 55%), #fef5ef;
	}
	.service-visual.purple {
		background:
			radial-gradient(circle at 30% 25%, rgba(139, 92, 246, 0.22), transparent 55%), #f5f3fe;
	}
	.service-visual-icon {
		align-items: center;
		background: #fff;
		border: 1px solid var(--line);
		border-radius: 18px;
		box-shadow: 0 22px 48px rgba(31, 50, 58, 0.08);
		display: flex;
		height: 220px;
		justify-content: center;
		width: 220px;
	}
	.service-visual.cyan .service-visual-icon :global(svg) {
		color: #14b8c5;
	}
	.service-visual.green .service-visual-icon :global(svg) {
		color: #35a853;
	}
	.service-visual.blue .service-visual-icon :global(svg) {
		color: #1e8ce3;
	}
	.service-visual.orange .service-visual-icon :global(svg) {
		color: #f27622;
	}
	.service-visual.purple .service-visual-icon :global(svg) {
		color: #8b5cf6;
	}

	.service-detail-grid {
		align-items: stretch;
		gap: 14px;
		grid-template-columns: 1fr;
		margin-top: 24px;
		position: relative;
	}
	.service-problem-card,
	.service-approach-card {
		border-radius: 12px;
		padding: 22px 24px;
	}
	.service-problem-card {
		background: #f3f4f6;
		border: 1px solid #e2e5ea;
	}
	.service-problem-card h4 {
		color: #6b7280;
		font-size: 12px;
		font-weight: 900;
		letter-spacing: 0.04em;
		margin-bottom: 12px;
		text-transform: uppercase;
	}
	.service-problem-card ul {
		display: grid;
		gap: 10px;
		margin: 0;
		padding-left: 18px;
	}
	.service-problem-card li {
		color: #475160;
		font-size: 13px;
		font-weight: 650;
		line-height: 1.75;
	}
	.service-problem-card li::marker {
		color: #98a3b1;
	}
	.service-approach-card {
		background: #ecf7ed;
		border: 1px solid #c8e4c9;
	}
	.service-approach-card h4 {
		color: #2c8c41;
		font-size: 12px;
		font-weight: 900;
		letter-spacing: 0.04em;
		margin-bottom: 12px;
		text-transform: uppercase;
	}
	.service-approach-card ul {
		display: grid;
		gap: 10px;
		margin: 0;
		padding-left: 18px;
	}
	.service-approach-card li {
		color: #234d32;
		font-size: 13px;
		font-weight: 650;
		line-height: 1.75;
	}
	.service-approach-card li::marker {
		color: #35a853;
	}
	.service-detail-grid::before {
		align-items: center;
		background: #fff;
		border: 1px solid #c8e4c9;
		border-radius: 999px;
		box-shadow: 0 4px 10px rgba(53, 168, 83, 0.18);
		color: #35a853;
		content: '↓';
		display: flex;
		font-size: 18px;
		font-weight: 900;
		height: 30px;
		justify-content: center;
		left: 50%;
		position: absolute;
		top: 50%;
		transform: translate(-50%, -50%);
		width: 30px;
		z-index: 1;
	}

	.modal-result-band {
		background: #f4f8f7;
		border: 1px solid var(--line);
		border-radius: 12px;
		margin-bottom: 24px;
		padding: 18px 22px;
	}
	.modal-result-band strong {
		color: var(--teal);
		display: block;
		font-size: 12px;
		font-weight: 900;
		letter-spacing: 0.04em;
		margin-bottom: 6px;
		text-transform: uppercase;
	}
	.modal-result-band p {
		color: #2c3a4a;
		font-size: 14px;
		font-weight: 650;
		line-height: 1.85;
	}

	.flow-grid {
		display: grid;
		gap: 28px;
		grid-template-columns: repeat(5, minmax(0, 1fr));
		margin-top: 34px;
		position: relative;
	}
	.flow-step {
		min-height: 168px;
		padding: 28px 22px 20px;
		position: relative;
	}
	.flow-step:not(:last-child)::after {
		color: #8ca9a6;
		content: '→';
		font-size: 25px;
		font-weight: 700;
		position: absolute;
		right: -23px;
		top: 72px;
	}
	.flow-step > span {
		align-items: center;
		background: var(--teal);
		border-radius: 999px;
		color: #fff;
		display: flex;
		font-size: 13px;
		font-weight: 900;
		height: 34px;
		justify-content: center;
		left: 20px;
		position: absolute;
		top: -17px;
		width: 34px;
	}
	.flow-step:nth-child(2) > span,
	.flow-step:nth-child(5) > span {
		background: #75bc45;
	}
	.flow-step:nth-child(3) > span {
		background: #16b6cf;
	}
	.flow-step:nth-child(4) > span {
		background: #ffa33c;
	}
	.flow-step :global(svg) {
		color: var(--teal);
		margin-bottom: 18px;
	}
	.flow-step h3 {
		font-size: 16px;
		margin-bottom: 12px;
	}
	.flow-step p {
		color: #596a79;
		font-size: 12px;
		font-weight: 650;
		line-height: 1.8;
	}

	.reason-grid {
		align-items: stretch;
		display: grid;
		gap: 22px;
		grid-template-columns: repeat(5, minmax(0, 1fr));
		margin-top: 28px;
	}
	.reason-grid article {
		align-items: center;
		display: flex;
		gap: 12px;
		min-width: 0;
	}
	.reason-grid :global(svg) {
		background: #fff;
		border: 1px solid var(--line);
		border-radius: 999px;
		color: var(--ink);
		flex: 0 0 auto;
		height: 48px;
		padding: 10px;
		width: 48px;
	}
	.reason-grid h3 {
		font-size: 15px;
		margin-bottom: 4px;
	}
	.reason-grid p {
		color: var(--muted);
		font-size: 11px;
		font-weight: 650;
		line-height: 1.5;
	}

	.contact-section {
		margin-top: 42px;
	}

	.contact-hero {
		align-items: center;
		background:
			radial-gradient(circle at 90% 20%, rgba(255, 255, 255, 0.22), transparent 28%),
			linear-gradient(135deg, #61c9bd, #149c91);
		border-radius: 18px;
		color: #fff;
		display: grid;
		gap: 24px;
		grid-template-columns: 270px 1fr;
		min-height: 210px;
		overflow: hidden;
		padding: 0 36px;
		position: relative;
	}

	.contact-visual img {
		align-self: end;
		display: block;
		max-height: 210px;
		object-fit: contain;
		width: 270px;
	}

	.contact-eyebrow {
		color: rgba(255, 255, 255, 0.88);
		font-size: 14px;
		font-weight: 900;
		margin-bottom: 8px;
	}

	.contact-copy h2 {
		font-size: 34px;
		font-weight: 900;
		margin-bottom: 14px;
	}

	.contact-copy p {
		color: rgba(255, 255, 255, 0.9);
		font-size: 15px;
		font-weight: 750;
		line-height: 1.8;
		max-width: 720px;
	}

	.contact-points {
		display: flex;
		flex-wrap: wrap;
		gap: 12px;
		margin-top: 18px;
	}

	.contact-points span {
		align-items: center;
		background: rgba(255, 255, 255, 0.14);
		border: 1px solid rgba(255, 255, 255, 0.2);
		border-radius: 999px;
		display: inline-flex;
		font-size: 13px;
		font-weight: 850;
		gap: 7px;
		padding: 8px 12px;
	}

	.contact-panel {
		display: grid;
		gap: 22px;
		grid-template-columns: 0.74fr 1.26fr;
		margin-top: 22px;
	}

	.contact-methods {
		display: grid;
		gap: 14px;
	}

	.contact-methods a,
	.contact-methods div {
		background: #fff;
		border: 1px solid var(--line);
		border-radius: 10px;
		box-shadow: 0 18px 42px rgba(31, 50, 58, 0.05);
		color: var(--ink);
		display: grid;
		gap: 5px 12px;
		grid-template-columns: 28px 1fr;
		padding: 22px;
	}

	.contact-methods :global(svg) {
		color: var(--teal);
		grid-row: span 2;
		margin-top: 2px;
	}

	.contact-methods strong {
		font-size: 17px;
	}

	.contact-methods span {
		color: var(--muted);
		font-size: 13px;
		font-weight: 700;
	}

	.contact-form {
		background: #fff;
		border: 1px solid var(--line);
		border-radius: 10px;
		box-shadow: 0 18px 42px rgba(31, 50, 58, 0.05);
		display: grid;
		gap: 16px;
		padding: 24px;
	}

	.form-row {
		display: grid;
		gap: 16px;
		grid-template-columns: 1fr 1fr;
	}

	.contact-form label {
		display: grid;
		gap: 8px;
	}

	.contact-form label span {
		color: var(--ink);
		font-size: 13px;
		font-weight: 850;
	}

	.contact-form input,
	.contact-form textarea {
		background: #fbfefd;
		border: 1px solid #cddfdd;
		border-radius: 8px;
		color: var(--ink);
		font: inherit;
		font-size: 15px;
		font-weight: 650;
		line-height: 1.5;
		outline: none;
		padding: 13px 14px;
		transition:
			border-color 160ms ease,
			box-shadow 160ms ease;
		width: 100%;
	}

	.contact-form textarea {
		resize: vertical;
	}

	.contact-form input:focus,
	.contact-form textarea:focus {
		border-color: var(--teal);
		box-shadow: 0 0 0 4px rgba(28, 154, 145, 0.12);
	}

	.cta-button {
		font-size: 22px;
		min-height: 64px;
		padding: 0 32px;
	}

	.footer {
		align-items: start;
		display: grid;
		gap: 54px;
		grid-template-columns: 1.5fr 0.65fr 0.7fr 0.8fr 1fr;
		margin: 0 auto;
		max-width: 1400px;
		padding: 44px 48px 54px;
	}
	.footer .brand {
		font-size: 30px;
		margin-bottom: 18px;
	}
	.footer-brand p {
		color: var(--muted);
		font-size: 13px;
		font-weight: 650;
		line-height: 1.8;
		max-width: 300px;
	}
	.footer-brand small {
		color: #97a2ad;
		display: block;
		font-size: 12px;
		margin-top: 24px;
	}
	.footer nav {
		display: grid;
		gap: 12px;
	}
	.footer nav strong {
		font-size: 14px;
		margin-bottom: 6px;
	}
	.footer nav a {
		color: #536273;
		font-size: 13px;
		font-weight: 700;
	}
	.footer-contact {
		background: #fff;
		border: 1px solid var(--line);
		border-radius: 12px;
		box-shadow: 0 14px 30px rgba(31, 50, 58, 0.06);
		padding: 20px;
	}
	.mail-card {
		align-items: center;
		color: var(--ink);
		display: grid;
		gap: 4px 8px;
		grid-template-columns: 22px 1fr;
		margin-bottom: 14px;
	}
	.mail-card span {
		color: var(--muted);
		font-size: 11px;
		grid-column: 2;
	}
	.form-link {
		align-items: center;
		border: 1px solid #b8c7c6;
		border-radius: 7px;
		display: flex;
		font-size: 13px;
		font-weight: 850;
		gap: 8px;
		justify-content: center;
		min-height: 42px;
	}
	.company-section {
		background: #fff;
		border: 1px solid var(--line);
		border-radius: 16px;
		box-shadow: 0 18px 42px rgba(31, 50, 58, 0.05);
		margin: 64px 0;
		padding: 48px;
	}
	.company-head {
		display: grid;
		gap: 8px;
		margin-bottom: 28px;
	}
	.company-head h2 {
		font-size: 28px;
		font-weight: 900;
		letter-spacing: -0.01em;
		margin: 0;
	}
	.company-head .eyebrow {
		color: var(--teal);
		font-size: 13px;
		font-weight: 800;
		letter-spacing: 0.08em;
		text-transform: uppercase;
	}
	.company-lead {
		color: var(--muted);
		font-size: 14px;
		font-weight: 700;
		margin: 0;
	}
	.company-grid {
		display: grid;
	}
	.company-table {
		display: grid;
		gap: 0;
		margin: 0;
	}
	.company-table > div {
		border-top: 1px solid var(--line);
		display: grid;
		gap: 8px 18px;
		grid-template-columns: 200px 1fr;
		padding: 18px 0;
	}
	.company-table > div:last-child {
		border-bottom: 1px solid var(--line);
	}
	.company-table dt {
		align-items: center;
		color: var(--ink);
		display: flex;
		font-size: 14px;
		font-weight: 850;
		gap: 10px;
	}
	.company-table :global(svg) {
		color: var(--teal);
	}
	.company-table dd {
		color: var(--ink);
		font-size: 15px;
		font-weight: 700;
		line-height: 1.7;
		margin: 0;
	}
	.company-table dd address {
		font-style: normal;
	}
	.company-table dd a {
		color: var(--teal);
		text-decoration: underline;
		text-underline-offset: 3px;
	}

	@media (max-width: 1120px) {
		.site-header {
			padding: 0 24px;
		}
		.desktop-nav,
		.mail {
			display: none;
		}
		main {
			padding: 0 24px 42px;
		}
		.hero-section {
			grid-template-columns: 1fr;
		}
		.hero-art {
			min-height: 500px;
		}
		.service-grid,
		.concept-grid {
			grid-template-columns: 1fr 1fr;
		}
		.concept-arrow {
			display: none;
		}
		.works-row {
			grid-template-columns: repeat(2, minmax(0, 1fr));
			margin: 26px 0 0;
		}
		.flow-grid,
		.reason-grid {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}
		.flow-step::after {
			display: none;
		}
		.contact-hero {
			grid-template-columns: 180px 1fr;
			padding: 20px 24px;
		}
		.contact-visual img {
			width: 180px;
		}
		.contact-panel {
			grid-template-columns: 1fr;
		}
		.cta-button {
			grid-column: 1 / -1;
			min-height: 64px;
		}
		.footer {
			grid-template-columns: 1fr 1fr;
		}
	}

	@media (max-width: 720px) {
		.site-header {
			height: 70px;
		}
		.brand {
			font-size: 25px;
		}
		.brand-mark {
			height: 26px;
			width: 26px;
		}
		.primary.small {
			display: none;
		}
		main {
			padding: 0 18px 34px;
		}
		.hero-section {
			min-height: 0;
			padding-top: 34px;
		}
		.hero-copy h1 {
			font-size: 41px;
		}
		.hero-copy h1 .line {
			white-space: normal;
		}
		.lead {
			font-size: 15px;
			line-height: 1.8;
		}
		.hero-buttons,
		.trust-row,
		.service-grid,
		.concept-grid,
		.flow-grid,
		.reason-grid,
		.footer {
			grid-template-columns: 1fr;
		}
		.hero-buttons {
			display: grid;
		}
		.hero-art {
			min-height: 350px;
		}
		.soft-blob {
			height: 330px;
			right: -30px;
			width: 370px;
		}
		.hero-art > img {
			width: 440px;
		}
		.floating-card {
			display: none;
		}
		.works-row {
			grid-template-columns: 1fr;
		}
		.work-card.featured {
			border-color: rgba(28, 154, 145, 0.24);
		}
		.modal-backdrop {
			align-items: stretch;
			padding: 14px;
		}
		.work-modal {
			max-height: calc(100vh - 28px);
		}
		.modal-copy {
			padding: 26px 22px 24px;
		}
		.modal-copy h3 {
			font-size: 27px;
		}
		.modal-actions {
			display: grid;
		}
		.contact-hero {
			grid-template-columns: 1fr;
			text-align: center;
		}
		.contact-visual img {
			justify-self: center;
		}
		.contact-copy h2 {
			font-size: 26px;
		}
		.contact-points {
			justify-content: center;
		}
		.form-row {
			grid-template-columns: 1fr;
		}
		.cta-button {
			font-size: 17px;
			padding: 0 18px;
		}
		.company-section {
			margin: 40px 0;
			padding: 28px 22px;
		}
		.company-head h2 {
			font-size: 22px;
		}
		.company-table > div {
			grid-template-columns: 1fr;
			gap: 6px;
			padding: 14px 0;
		}
	}

	/* ---------- visually-hidden (a11y / Netlify Forms honeypot) ---------- */
	.visually-hidden {
		position: absolute !important;
		width: 1px;
		height: 1px;
		padding: 0;
		margin: -1px;
		overflow: hidden;
		clip: rect(0, 0, 0, 0);
		white-space: nowrap;
		border: 0;
	}

	/* ---------- contact form success / error ---------- */
	.contact-success {
		display: flex;
		align-items: flex-start;
		gap: 14px;
		padding: 22px 24px;
		border-radius: 14px;
		background: rgba(0, 168, 150, 0.08);
		border: 1px solid rgba(0, 168, 150, 0.35);
		color: var(--ink);
	}
	.contact-success :global(svg) {
		color: var(--teal);
		flex-shrink: 0;
		margin-top: 2px;
	}
	.contact-success div {
		display: flex;
		flex-direction: column;
		gap: 4px;
	}
	.contact-success strong {
		font-size: 16px;
		font-weight: 800;
	}
	.contact-success span {
		font-size: 14px;
		color: var(--ink-soft, #555);
	}
	.contact-error {
		margin: 8px 0 0;
		padding: 12px 14px;
		border-radius: 10px;
		background: rgba(220, 38, 38, 0.08);
		border: 1px solid rgba(220, 38, 38, 0.35);
		color: #b91c1c;
		font-size: 14px;
	}
	.cta-button:disabled {
		opacity: 0.6;
		cursor: not-allowed;
	}
</style>
