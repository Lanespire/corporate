<script lang="ts">
	import { onMount } from 'svelte';
	import {
		isMenuOpen,
		activeSection,
		navigationItems,
		navigationActions
	} from '$stores/navigation';

	// Component state
	let scrolled = false;
	let headerElement: HTMLElement;

	// Handle scroll events
	function handleScroll() {
		if (typeof window === 'undefined') return;
		scrolled = window.scrollY > 50;

		// Update active section based on scroll position
		updateActiveSection();
	}

	function updateActiveSection() {
		if (typeof window === 'undefined') return;

		const sections = ['home', 'about', 'services', 'philosophy', 'contact'];
		const scrollPosition = window.scrollY + 100; // Offset for header

		for (const sectionId of sections) {
			const element = document.getElementById(sectionId);
			if (element) {
				const { offsetTop, offsetHeight } = element;
				if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
					navigationActions.setActiveSection(sectionId);
					break;
				}
			}
		}
	}

	// Handle navigation click
	function handleNavClick(href: string) {
		navigationActions.scrollToSection(href);
	}

	// Handle mobile menu toggle
	function toggleMobileMenu() {
		navigationActions.toggleMenu();
	}

	// Close menu when clicking outside
	function handleClickOutside(event: MouseEvent) {
		if (!headerElement?.contains(event.target as Node)) {
			navigationActions.closeMenu();
		}
	}

	onMount(() => {
		// Add scroll listener
		window.addEventListener('scroll', handleScroll, { passive: true });

		// Add click outside listener
		document.addEventListener('click', handleClickOutside);

		// Initial scroll check
		handleScroll();

		return () => {
			window.removeEventListener('scroll', handleScroll);
			document.removeEventListener('click', handleClickOutside);
		};
	});
</script>

<header class="header" class:scrolled bind:this={headerElement}>
	<div class="container">
		<div class="header-content">
			<!-- Logo -->
			<div class="logo">
				<img src="/images/lanespire_logo.png" alt="Lanespire" class="logo-image" />
				<span class="logo-text">Lanespire</span>
			</div>

			<!-- Desktop Navigation -->
			<nav class="nav-desktop">
				<ul class="nav-list">
					{#each navigationItems as item}
						<li class="nav-item">
							<button
								class="nav-link"
								class:active={$activeSection === item.href.replace('#', '')}
								on:click={() => handleNavClick(item.href)}
							>
								{item.label}
							</button>
						</li>
					{/each}
				</ul>
			</nav>

			<!-- Mobile Menu Button -->
			<button
				class="mobile-menu-button"
				class:active={$isMenuOpen}
				on:click={toggleMobileMenu}
				aria-label="Toggle mobile menu"
			>
				<span class="hamburger-line"></span>
				<span class="hamburger-line"></span>
				<span class="hamburger-line"></span>
			</button>
		</div>

		<!-- Mobile Navigation -->
		<nav class="nav-mobile" class:open={$isMenuOpen}>
			<ul class="nav-mobile-list">
				{#each navigationItems as item}
					<li class="nav-mobile-item">
						<button
							class="nav-mobile-link"
							class:active={$activeSection === item.href.replace('#', '')}
							on:click={() => handleNavClick(item.href)}
						>
							{item.label}
						</button>
					</li>
				{/each}
			</ul>
		</nav>
	</div>
</header>

<style>
	.header {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: var(--z-fixed);
		background: rgba(10, 10, 10, 0.8);
		backdrop-filter: blur(10px);
		border-bottom: 1px solid rgba(255, 255, 255, 0.1);
		transition: all var(--transition-normal);
	}

	.header.scrolled {
		background: rgba(10, 10, 10, 0.95);
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
	}

	.header-content {
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 70px;
	}

	/* Logo */
	.logo {
		display: flex;
		align-items: center;
		gap: var(--spacing-sm);
		font-size: var(--font-size-xl);
		font-weight: var(--font-weight-bold);
		color: var(--color-text-primary);
		text-decoration: none;
	}

	.logo-image {
		width: 40px;
		height: 40px;
		object-fit: contain;
	}

	.logo-text {
		background: var(--gradient-primary);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}

	/* Desktop Navigation */
	.nav-desktop {
		display: flex;
		align-items: center;
	}

	.nav-list {
		display: flex;
		align-items: center;
		gap: var(--spacing-lg);
		list-style: none;
		margin: 0;
		padding: 0;
	}

	.nav-item {
		position: relative;
	}

	.nav-link {
		background: none;
		border: none;
		color: var(--color-text-secondary);
		font-size: var(--font-size-base);
		font-weight: var(--font-weight-medium);
		padding: var(--spacing-sm) 0;
		cursor: pointer;
		transition: color var(--transition-fast);
		position: relative;
	}

	.nav-link::after {
		content: '';
		position: absolute;
		bottom: -2px;
		left: 0;
		width: 0;
		height: 2px;
		background: var(--gradient-primary);
		transition: width var(--transition-normal);
	}

	.nav-link:hover,
	.nav-link.active {
		color: var(--color-text-primary);
	}

	.nav-link.active::after {
		width: 100%;
	}

	/* Mobile Menu Button */
	.mobile-menu-button {
		display: none;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 30px;
		height: 30px;
		background: none;
		border: none;
		cursor: pointer;
		padding: 0;
	}

	.hamburger-line {
		width: 25px;
		height: 2px;
		background: var(--color-text-primary);
		margin: 2px 0;
		transition: all var(--transition-normal);
		transform-origin: center;
	}

	.mobile-menu-button.active .hamburger-line:nth-child(1) {
		transform: rotate(45deg) translate(5px, 5px);
	}

	.mobile-menu-button.active .hamburger-line:nth-child(2) {
		opacity: 0;
	}

	.mobile-menu-button.active .hamburger-line:nth-child(3) {
		transform: rotate(-45deg) translate(7px, -6px);
	}

	/* Mobile Navigation */
	.nav-mobile {
		display: none;
		position: absolute;
		top: 100%;
		left: 0;
		right: 0;
		background: rgba(10, 10, 10, 0.98);
		backdrop-filter: blur(20px);
		border-bottom: 1px solid rgba(255, 255, 255, 0.1);
		transform: translateY(-100%);
		opacity: 0;
		transition: all var(--transition-normal);
		pointer-events: none;
	}

	.nav-mobile.open {
		transform: translateY(0);
		opacity: 1;
		pointer-events: auto;
	}

	.nav-mobile-list {
		list-style: none;
		margin: 0;
		padding: var(--spacing-md) 0;
	}

	.nav-mobile-item {
		border-bottom: 1px solid rgba(255, 255, 255, 0.05);
	}

	.nav-mobile-item:last-child {
		border-bottom: none;
	}

	.nav-mobile-link {
		display: block;
		width: 100%;
		background: none;
		border: none;
		color: var(--color-text-secondary);
		font-size: var(--font-size-lg);
		font-weight: var(--font-weight-medium);
		padding: var(--spacing-md) var(--spacing-md);
		text-align: left;
		cursor: pointer;
		transition: all var(--transition-fast);
	}

	.nav-mobile-link:hover,
	.nav-mobile-link.active {
		color: var(--color-text-primary);
		background: rgba(0, 255, 255, 0.05);
	}

	/* Responsive Design */
	@media (max-width: 768px) {
		.nav-desktop {
			display: none;
		}

		.mobile-menu-button {
			display: flex;
		}

		.nav-mobile {
			display: block;
		}

		.logo-text {
			display: none;
		}
	}

	@media (max-width: 480px) {
		.header-content {
			height: 60px;
		}

		.logo-image {
			width: 35px;
			height: 35px;
		}
	}
</style>
