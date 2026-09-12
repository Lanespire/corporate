<script lang="ts">
	import { resolve } from '$app/paths';
	import Mail from 'lucide-svelte/icons/mail';
	import Menu from 'lucide-svelte/icons/menu';
	import X from 'lucide-svelte/icons/x';

	type NavItem = {
		label: string;
		href: string;
	};

	const navItems: NavItem[] = [
		{ label: '特徴', href: '#services' },
		{ label: 'パッケージ内容', href: '#services' },
		{ label: '開発の進め方', href: '#process' },
		{ label: 'FAQ', href: '#faq' }
	];

	let menuOpen = false;

	function toggleMenu() {
		menuOpen = !menuOpen;
	}

	function closeMenu() {
		menuOpen = false;
	}

	function mvpHref(hash: string) {
		return `${resolve('/mvp')}${hash}`;
	}
</script>

<!-- eslint-disable svelte/no-navigation-without-resolve -->
<header class="mvp-header" aria-label="グローバルヘッダー">
	<div class="mvp-header__inner">
		<a href={mvpHref('#top')} class="mvp-header__brand" aria-label="Lanespire MVP検証パッケージ">
			<span class="mvp-header__mark" aria-hidden="true">
				<svg viewBox="0 0 48 48" fill="none">
					<path d="M23.5 4 6 16.5l9.4 6.5 17.5-12.5L23.5 4Z" fill="currentColor" />
					<path d="M33.6 13.6 16.1 26.1l8.4 5.9 17.6-12.6-8.5-5.8Z" fill="currentColor" />
					<path d="M14.4 25.4 5.9 31.5 24.5 44l8.4-6-18.5-12.6Z" fill="currentColor" />
					<path d="M34.6 24.8 26 30.9l8.7 5.9 8.7-6-8.8-6Z" fill="currentColor" />
				</svg>
			</span>
			<span class="mvp-header__name">Lanespire</span>
			<span class="mvp-header__divider" aria-hidden="true"></span>
			<span class="mvp-header__service">MVP検証パッケージ</span>
		</a>

		<nav class="mvp-header__nav" aria-label="メインナビゲーション">
			<ul>
				{#each navItems as item}
					<li><a href={mvpHref(item.href)}>{item.label}</a></li>
				{/each}
			</ul>
		</nav>

		<div class="mvp-header__actions">
			<a href={mvpHref('#cta')} class="mvp-header__contact">
				<Mail size={20} aria-hidden="true" />
				<span>お問い合わせ</span>
			</a>
			<button
				type="button"
				class="mvp-header__burger"
				on:click={toggleMenu}
				aria-label={menuOpen ? 'メニューを閉じる' : 'メニューを開く'}
				aria-expanded={menuOpen}
			>
				{#if menuOpen}
					<X size={24} aria-hidden="true" />
				{:else}
					<Menu size={24} aria-hidden="true" />
				{/if}
			</button>
		</div>
	</div>

	{#if menuOpen}
		<div class="mvp-header__mobile" role="dialog" aria-label="モバイルメニュー">
			<ul>
				{#each navItems as item}
					<li><a href={mvpHref(item.href)} on:click={closeMenu}>{item.label}</a></li>
				{/each}
				<li>
					<a href={mvpHref('#cta')} class="mvp-header__mobile-contact" on:click={closeMenu}>
						<Mail size={18} aria-hidden="true" />
						お問い合わせ
					</a>
				</li>
			</ul>
		</div>
	{/if}
</header>

<style>
	.mvp-header {
		position: sticky;
		top: 0;
		z-index: var(--mvp-z-header);
		background: rgba(255, 255, 255, 0.96);
		backdrop-filter: saturate(180%) blur(14px);
		-webkit-backdrop-filter: saturate(180%) blur(14px);
	}

	.mvp-header__inner {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 32px;
		width: min(100%, 1560px);
		min-height: 104px;
		margin: 0 auto;
		padding: 0 36px;
	}

	.mvp-header__brand {
		display: inline-flex;
		align-items: center;
		gap: 12px;
		color: var(--mvp-text);
		white-space: nowrap;
	}

	.mvp-header__brand:hover {
		color: var(--mvp-text);
	}

	.mvp-header__mark {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 44px;
		height: 44px;
		color: #ff6b00;
	}

	.mvp-header__mark svg {
		width: 44px;
		height: 44px;
	}

	.mvp-header__name {
		font-size: 36px;
		font-weight: 800;
		letter-spacing: 0;
		line-height: 1;
	}

	.mvp-header__divider {
		width: 1px;
		height: 34px;
		margin: 0 6px;
		background: var(--mvp-border-strong);
	}

	.mvp-header__service {
		font-size: 20px;
		font-weight: 700;
		line-height: 1;
	}

	.mvp-header__nav ul {
		display: flex;
		align-items: center;
		gap: 40px;
	}

	.mvp-header__nav a {
		font-size: 16px;
		font-weight: 700;
		color: var(--mvp-text);
	}

	.mvp-header__nav a:hover {
		color: var(--mvp-accent);
	}

	.mvp-header__actions {
		display: flex;
		align-items: center;
		gap: var(--mvp-space-3);
	}

	.mvp-header__contact,
	.mvp-header__mobile-contact {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: 12px;
		min-height: 54px;
		padding: 0 20px;
		border: 2px solid var(--mvp-text);
		border-radius: 8px;
		color: var(--mvp-text);
		font-size: 17px;
		font-weight: 800;
		line-height: 1;
		background: var(--mvp-white);
	}

	.mvp-header__contact:hover,
	.mvp-header__mobile-contact:hover {
		color: var(--mvp-accent);
		border-color: var(--mvp-accent);
	}

	.mvp-header__burger {
		display: none;
		width: 44px;
		height: 44px;
		align-items: center;
		justify-content: center;
		border-radius: 8px;
		color: var(--mvp-text);
		background: var(--mvp-gray-50);
	}

	.mvp-header__mobile {
		display: none;
		border-top: 1px solid var(--mvp-border);
		background: var(--mvp-white);
		padding: var(--mvp-space-4) var(--mvp-container-pad);
	}

	.mvp-header__mobile ul {
		display: flex;
		flex-direction: column;
		gap: var(--mvp-space-3);
	}

	.mvp-header__mobile a:not(.mvp-header__mobile-contact) {
		display: block;
		padding: var(--mvp-space-3);
		font-size: var(--mvp-fs-body);
		font-weight: 700;
		color: var(--mvp-text);
		border-radius: var(--mvp-radius-md);
	}

	.mvp-header__mobile a:hover {
		background: var(--mvp-gray-50);
	}

	@media (max-width: 1280px) {
		.mvp-header__inner {
			gap: 20px;
			min-height: 88px;
			padding: 0 24px;
		}

		.mvp-header__nav ul {
			gap: 24px;
		}

		.mvp-header__name {
			font-size: 30px;
		}

		.mvp-header__service {
			font-size: 17px;
		}
	}

	@media (max-width: 1040px) {
		.mvp-header__nav,
		.mvp-header__contact,
		.mvp-header__divider,
		.mvp-header__service {
			display: none;
		}

		.mvp-header__burger {
			display: inline-flex;
		}

		.mvp-header__mobile {
			display: block;
		}
	}

	@media (max-width: 640px) {
		.mvp-header__inner {
			min-height: 72px;
			padding: 0 18px;
		}

		.mvp-header__mark {
			width: 36px;
			height: 36px;
		}

		.mvp-header__name {
			font-size: 26px;
		}
	}
</style>
