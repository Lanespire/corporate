import { writable } from 'svelte/store';
import type { NavigationItem } from '$types/global';

// Navigation state
export const isMenuOpen = writable(false);
export const activeSection = writable('home');

// Navigation items
export const navigationItems: NavigationItem[] = [
	{ label: 'Home', href: '#home' },
	{ label: 'About', href: '#about' },
	{ label: 'Services', href: '#services' },
	{ label: 'Philosophy', href: '#philosophy' },
	{ label: 'Contact', href: '#contact' }
];

// Navigation actions
export const navigationActions = {
	toggleMenu: () => {
		isMenuOpen.update(open => !open);
	},
	
	closeMenu: () => {
		isMenuOpen.set(false);
	},
	
	setActiveSection: (section: string) => {
		activeSection.set(section);
	},
	
	scrollToSection: (href: string) => {
		if (typeof window === 'undefined') return;
		
		const targetId = href.replace('#', '');
		const targetElement = document.getElementById(targetId);
		
		if (targetElement) {
			const headerHeight = 70; // Fixed header height
			const targetPosition = targetElement.offsetTop - headerHeight;
			
			window.scrollTo({
				top: targetPosition,
				behavior: 'smooth'
			});
		}
		
		// Close mobile menu after navigation
		navigationActions.closeMenu();
	}
};
