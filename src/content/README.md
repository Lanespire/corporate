# Content Authoring Guide

このサイトは `src/content` 配下の Markdown をビルド時に自動読み込みします。

## ディレクトリ

- `src/content/services/*.md`: サービス事例カード
- `src/content/case-studies/*.md`: 導入事例カード

## Frontmatter項目

最低限の推奨項目です。

```md
---
title: タイトル
category: カテゴリ
summary: 概要文
order: 1
tags: Tag1, Tag2
cta_label: ボタン文言
cta_url: #contact
---
```

導入事例では任意で以下も利用できます。

- `industry`
- `period`
- `result`
- `site_url`

## 本文記法

本文は以下の基本記法に対応しています。

- 見出し: `#`, `##`, `###`
- 箇条書き: `- item`
- リンク: `[text](url)`
- 強調: `**text**`
- インラインコード: `` `code` ``
