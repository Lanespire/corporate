# @sveltejs/enhanced-img 実装ガイド

## 概要

このプロジェクトでは`@sveltejs/enhanced-img`を使用して画像の最適化を行っています。

## 実装内容

### 1. パッケージのインストール

```bash
npm i -D @sveltejs/enhanced-img
```

### 2. Vite設定の更新

`vite.config.ts`にenhancedImagesプラグインを追加：

```typescript
import { enhancedImages } from '@sveltejs/enhanced-img';

export default defineConfig({
	plugins: [
		enhancedImages(), // SvelteKitプラグインより前に配置
		sveltekit()
	]
	// ...
});
```

### 3. 画像の使用方法

#### enhanced:imgタグの使用

```svelte
<enhanced:img src="$lib/assets/images/example.png" alt="説明文" class="image-class" />
```

#### 動的画像の使用

```svelte
<script>
	import MyImage from '$lib/assets/images/example.png?enhanced';
</script>

<enhanced:img src={MyImage} alt="説明文" />
```

### 4. 対象ファイル

以下のファイルでenhanced:imgを使用：

- `src/lib/components/layout/Header.svelte` - ロゴ画像
- `src/lib/components/sections/About.svelte` - イラスト画像

### 5. CSS背景画像について

CSS `background-image` プロパティで使用される画像は、enhanced:imgの処理対象外のため、`static/images/`ディレクトリに配置して従来通りのパスで参照：

- Services.svelte - サービスアイコン
- Philosophy.svelte - 哲学アイコン

## 生成される最適化画像

### フォーマット

- **AVIF**: 最新ブラウザ向け（最高圧縮率）
- **WebP**: モダンブラウザ向け（高圧縮率）
- **PNG**: フォールバック用（元フォーマット）

### サイズバリエーション

- 複数の幅でレスポンシブ対応
- HiDPI/Retinaディスプレイ対応

### 圧縮効果の例

- 元画像: `about_illustration.png` (1.59MB)
- AVIF: 13.8KB (99%圧縮)
- WebP: 26.7KB (98%圧縮)

## キャッシュ設定

### .gitignore

```
# Enhanced images cache
node_modules/.cache/imagetools
```

### Netlify設定 (netlify.toml)

```toml
[[headers]]
  for = "/_app/immutable/assets/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"
```

## 注意事項

1. **@ts-expect-errorの使用禁止**: TypeScriptエラーは適切に型定義で解決する
2. **生成画像のコミット禁止**: ビルド時に生成される最適化画像はコミットしない
3. **Netlifyビルド**: 最適化された画像はNetlify上のビルドプロセスで生成される

## トラブルシューティング

### 404エラーが発生する場合

- CSS `background-image` で使用する画像は `static/images/` に配置
- `enhanced:img` タグは `$lib/assets/images/` のパスを使用

### ビルドが遅い場合

- 初回ビルド時は画像処理のため時間がかかる
- キャッシュにより2回目以降は高速化される
