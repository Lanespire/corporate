// Global type definitions for Lanespire website

export interface Service {
	id: string;
	title: string;
	description: string;
	icon: string;
	technologies: string[];
}

export interface CompanyValue {
	id: string;
	title: string;
	description: string;
	icon: string;
}

export interface Philosophy {
	id: string;
	title: string;
	subtitle: string;
	description: string;
	icon: string;
}

export interface AnimationConfig {
	duration: number;
	easing: string;
	delay?: number;
	stagger?: number;
}

export interface ThreeSceneConfig {
	particles: {
		count: number;
		size: number;
		speed: number;
		color: string;
	};
	camera: {
		position: [number, number, number];
		fov: number;
	};
	renderer: {
		antialias: boolean;
		alpha: boolean;
	};
}

export interface ContactForm {
	name: string;
	email: string;
	company?: string;
	message: string;
}

export interface NavigationItem {
	label: string;
	href: string;
	external?: boolean;
}

export interface SiteMetadata {
	title: string;
	description: string;
	keywords: string[];
	author: string;
	url: string;
	image: string;
}

// Animation states
export interface AnimationState {
	heroLoaded: boolean;
	threeInitialized: boolean;
	typingComplete: boolean;
	sectionsVisible: Record<string, boolean>;
}

// Performance monitoring
export interface PerformanceMetrics {
	loadTime: number;
	renderTime: number;
	interactionTime: number;
	cumulativeLayoutShift: number;
}
