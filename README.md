# 株式会社Lanespire コーポレートウェブサイト

## 概要

株式会社Lanespireの公式コーポレートウェブサイトです。SvelteKitを使用して構築された高性能なWebアプリケーションで、サイバーパンク風のデザインとThree.jsによる3Dエフェクトが特徴です。

## 🚀 技術スタック

- **フレームワーク**: SvelteKit
- **言語**: TypeScript
- **スタイリング**: CSS Variables + Custom CSS
- **3Dグラフィックス**: Three.js
- **アニメーション**: GSAP (GreenSock Animation Platform)
- **フォーム**: Netlify Forms
- **デプロイ**: 静的サイト生成 (SSG)

## 🎨 デザイン特徴

- **サイバーパンクテーマ**: ダークネイビーベースにシアン・マゼンタのアクセント
- **マテリアルデザイン**: 洗練されたUI/UXコンポーネント
- **レスポンシブデザイン**: モバイルファースト設計
- **Three.js背景**: 幾何学パーティクルとワイヤーフレームオブジェクト
- **スクロールアニメーション**: GSAP ScrollTriggerによる滑らかなアニメーション

## 📁 プロジェクト構造

```
lanespire-sveltekit/
├── src/
│   ├── lib/
│   │   ├── components/
│   │   │   ├── layout/
│   │   │   │   └── Header.svelte          # ナビゲーションヘッダー
│   │   │   └── sections/
│   │   │       ├── Hero.svelte            # ヒーローセクション
│   │   │       ├── About.svelte           # 企業紹介セクション
│   │   │       ├── Services.svelte        # サービス紹介セクション
│   │   │       ├── Philosophy.svelte      # 企業哲学セクション
│   │   │       └── Contact.svelte         # お問い合わせセクション
│   │   ├── stores/
│   │   │   └── navigation.ts              # ナビゲーション状態管理
│   │   ├── styles/
│   │   │   └── global.css                 # グローバルスタイル
│   │   ├── types/
│   │   │   └── global.ts                  # TypeScript型定義
│   │   └── utils/
│   │       ├── animations.ts              # GSAPアニメーションユーティリティ
│   │       └── three-utils.ts             # Three.jsユーティリティ
│   ├── routes/
│   │   ├── +layout.svelte                 # メインレイアウト
│   │   ├── +layout.ts                     # プリレンダリング設定
│   │   └── +page.svelte                   # メインページ
│   └── app.html                           # HTMLテンプレート
├── static/
│   ├── icon_innovation.png                # 革新性アイコン
│   ├── icon_efficiency.png                # 効率性アイコン
│   ├── icon_collaboration.png             # 協働性アイコン
│   └── images/                            # その他の画像素材
├── svelte.config.js                       # SvelteKit設定
├── vite.config.ts                         # Vite設定
├── package.json                           # 依存関係
└── README.md                              # このファイル
```

## 🛠️ 開発環境のセットアップ

### 前提条件

- Node.js 18.0.0 以上
- npm または pnpm

### インストール

```bash
# リポジトリをクローン
git clone https://github.com/your-org/corporate.git
cd corporate

# 依存関係をインストール
npm install
# または
pnpm install
```

### 開発サーバーの起動

```bash
# 開発サーバーを起動
npm run dev

# または開発サーバーを起動してブラウザで開く
npm run dev -- --open
```

### ビルド

```bash
# 本番用ビルド
npm run build

# ビルド結果をプレビュー
npm run preview
```

## 📝 コンテンツ管理

### 企業情報の更新

企業情報は各コンポーネント内で直接管理されています：

- **基本情報**: `src/lib/components/sections/Contact.svelte`
- **サービス内容**: `src/lib/components/sections/Services.svelte`
- **企業価値観**: `src/lib/components/sections/About.svelte`
- **企業哲学**: `src/lib/components/sections/Philosophy.svelte`

### 画像の追加・更新

1. 画像ファイルを `static/` ディレクトリに配置
2. コンポーネント内で `/filename.ext` として参照

## 📧 お問い合わせフォーム (Netlify Forms)

Netlify Formsを使用した無料のフォーム処理が設定済みです：

1. Netlifyでサイトをデプロイ
2. フォームが自動的に有効化される
3. 送信されたメッセージはNetlifyダッシュボードで確認可能

## 🚀 デプロイ

### Netlify (推奨)

1. GitHubリポジトリをNetlifyに接続
2. ビルドコマンド: `npm run build`
3. 公開ディレクトリ: `build`
4. 自動デプロイが設定される

## 📞 サポート

技術的な質問やサポートが必要な場合：

**株式会社Lanespire**  
〒104-0061 東京都中央区銀座１丁目１２番４号Ｎ＆ＥＢＬＤ．６Ｆ
