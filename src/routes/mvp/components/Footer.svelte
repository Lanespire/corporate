<script lang="ts">
	const navLinks = [
		{ label: 'パッケージ', href: '#services' },
		{ label: '開発の進め方', href: '#process' },
		{ label: '対応領域', href: '#areas' },
		{ label: 'FAQ', href: '#faq' },
		{ label: 'お問い合わせ', href: '#cta' }
	];
</script>

<footer class="footer" aria-labelledby="footer-heading">
	<h2 id="footer-heading" class="visually-hidden">フッター</h2>

	<div class="container">
		<nav aria-label="フッターナビゲーション">
			{#each navLinks as link}
				<a href={link.href}>{link.label}</a>
			{/each}
			<a class="email" href="mailto:info@lanespire.com">info@lanespire.com</a>
		</nav>

		<p class="copyright">
			&copy; {new Date().getFullYear()} Lanespire Inc. All rights reserved.
		</p>
	</div>
</footer>

<style>
	.footer {
		background: var(--mvp-navy-900);
		color: rgba(255, 255, 255, 0.78);
		font-family: var(--mvp-font-body);
		padding: var(--mvp-space-10) 0 var(--mvp-space-8);
	}

	.container {
		max-width: var(--mvp-container-max);
		margin: 0 auto;
		padding: 0 var(--mvp-container-pad);
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: var(--mvp-space-6);
		text-align: center;
	}

	.visually-hidden {
		position: absolute;
		width: 1px;
		height: 1px;
		padding: 0;
		margin: -1px;
		overflow: hidden;
		clip: rect(0, 0, 0, 0);
		white-space: nowrap;
		border: 0;
	}

	nav {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: var(--mvp-space-3) var(--mvp-space-6);
	}

	nav a {
		color: rgba(255, 255, 255, 0.78);
		text-decoration: none;
		font-size: var(--mvp-fs-body-sm);
		transition: color var(--mvp-transition);
	}

	nav a:hover {
		color: var(--mvp-orange-300);
	}

	nav a.email {
		color: var(--mvp-orange-300);
		font-weight: var(--mvp-fw-semibold);
	}

	nav a.email:hover {
		color: var(--mvp-white);
	}

	.copyright {
		margin: 0;
		font-size: var(--mvp-fs-eyebrow);
		color: rgba(255, 255, 255, 0.55);
	}

	@media (max-width: 540px) {
		nav {
			gap: var(--mvp-space-2) var(--mvp-space-4);
		}
	}
</style>
