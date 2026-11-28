<script lang="ts">
	import { nav, site, hero } from '$lib/corp/content';
	import { privacyOpen } from '$lib/corp/motion';
</script>

<!-- eslint-disable svelte/no-navigation-without-resolve -- Served from the domain root; links are fixed paths. -->
<footer class="footer">
	<div class="container top">
		<div class="brand-block">
			<a class="brand" href="/" aria-label="株式会社Lanespire トップ">
				<span class="mark" aria-hidden="true"><i></i><i></i><i></i></span>
				<span class="name">Lanespire</span>
			</a>
			<p>{site.name}</p>
			<p>{site.tagline}</p>
		</div>
		<nav aria-label="フッターナビゲーション">
			{#each nav as item (item.href)}
				<a href={item.href}>{item.label}</a>
			{/each}
			<a href={hero.secondary.href}>お問い合わせ</a>
		</nav>
	</div>
	<div class="container bottom">
		<small>© 2026 {site.nameEn}</small>
		<button type="button" onclick={() => privacyOpen.set(true)}>入力情報の取り扱い</button>
		<a class="to-top" href="#top">
			PAGE TOP
			<svg class="arr" viewBox="0 0 24 24" aria-hidden="true"
				><path d="M12 20V5M6 11l6-6 6 6" /></svg
			>
		</a>
	</div>
</footer>

<style>
	.footer {
		position: relative;
		z-index: 1;
		padding: 56px 0 28px;
		background: #071321;
		color: rgba(255, 255, 255, 0.7);
		font-size: 14px;
	}
	.top {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		gap: 32px;
	}
	.brand {
		display: inline-flex;
		align-items: center;
		gap: 10px;
		margin-bottom: 14px;
		color: #fff;
	}
	.mark {
		width: 26px;
		height: 30px;
		display: flex;
		align-items: flex-end;
		gap: 4px;
		transform: skewY(-9deg);
	}
	.mark i {
		width: 6px;
		border-radius: 1px;
		background: #5b8dff;
	}
	.mark i:nth-child(1) {
		height: 20px;
	}
	.mark i:nth-child(2) {
		height: 25px;
	}
	.mark i:nth-child(3) {
		height: 30px;
	}
	.name {
		font-size: 24px;
		font-weight: 800;
		letter-spacing: -0.03em;
		line-height: 1;
	}
	nav {
		display: flex;
		flex-wrap: wrap;
		align-content: start;
		gap: 10px 28px;
		font-weight: 600;
		color: #fff;
	}
	nav a,
	.bottom button,
	.to-top {
		transition: color 0.3s;
	}
	nav a:hover,
	.bottom button:hover,
	.to-top:hover {
		color: #8fb3ff;
	}
	.bottom {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 12px 28px;
		margin-top: 44px;
		padding-top: 22px;
		border-top: 1px solid rgba(255, 255, 255, 0.14);
	}
	.bottom button {
		padding: 0;
		border: 0;
		background: none;
		cursor: pointer;
		text-decoration: underline;
		text-underline-offset: 3px;
	}
	.to-top {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		margin-left: auto;
		font-size: 12px;
		font-weight: 700;
		letter-spacing: 0.16em;
		color: #fff;
	}
	.arr {
		width: 16px;
		height: 16px;
	}
</style>
