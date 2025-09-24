# @sveltejs/enhanced-img 調査結果

## 概要

- Viteの組み込みアセット処理の上に提供されるプラグイン
- avifやwebpなどの小さなファイル形式を自動提供
- レイアウトシフトを防ぐため、画像の幅と高さを自動設定
- 様々なデバイス向けに複数サイズの画像を作成
- プライバシーのためEXIFデータを削除

## インストール

```bash
npm i -D @sveltejs/enhanced-img
```

## vite.config.js設定

```javascript
import { sveltekit } from '@sveltejs/kit/vite';
import { enhancedImages } from '@sveltejs/enhanced-img';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [
		enhancedImages(), // SvelteKitプラグインより前に配置する必要がある
		sveltekit()
	]
});
```

## 基本的な使用方法

### 静的画像の使用

```svelte
<enhanced:img src="./path/to/your/image.jpg" alt="An alt text" />
```

### 動的画像の使用

```svelte
<script>
	import MyImage from './path/to/your/image.jpg?enhanced';
</script>

<enhanced:img src={MyImage} alt="some alt text" />
```

### import.meta.globを使用した複数画像の処理

```svelte
<script>
	const imageModules = import.meta.glob(
		'/path/to/assets/*.{avif,gif,heif,jpeg,jpg,png,tiff,webp,svg}',
		{
			eager: true,
			query: {
				enhanced: true
			}
		}
	);
</script>

{#each Object.entries(imageModules) as [_path, module]}
	<enhanced:img src={module.default} alt="some alt text" />
{/each}
```

## 重要なポイント

### ビルド時の処理

- 初回ビルドは画像変換の計算コストにより時間がかかる
- ビルド出力は `./node_modules/.cache/imagetools` にキャッシュされる
- 後続のビルドは高速になる

### 画像の解像度

- HiDPI/Retinaディスプレイ用に2x解像度の画像を提供すべき
- 小さいバージョンは自動的に小さなデバイス向けに生成される

### sizesとsrcsetの使用

大きな画像（ヒーロー画像など）の場合：

```svelte
<enhanced:img src="./image.png" sizes="min(1280px, 100vw)" />
```

カスタム幅の指定：

```svelte
<enhanced:img
	src="./image.png?w=1280;640;400"
	sizes="(min-width:1920px) 1280px, (min-width:1080px) 640px, (min-width:768px) 400px"
/>
```

### CSS セレクタ

スタイルブロックでタグ名セレクタを使用する場合：

```css
enhanced\:img {
	/* スタイル */
}
```

### 制限事項

- ビルドプラグインとして、ビルド時にマシン上にあるファイルのみ最適化可能
- データベースやCMSなど外部からの画像は対象外

## 画像変換オプション

クエリパラメータで画像ごとの変換を指定可能：

```svelte
<enhanced:img src="./path/to/your/image.jpg?blur=15" alt="An alt text" />
```

## Netlifyでの考慮事項

- 最適化された画像はビルド時に生成される
- 生成された画像ファイルはコミットに含めない（.gitignoreで除外）
- Netlifyのビルドプロセスで自動生成される
