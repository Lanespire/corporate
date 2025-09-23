import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import type { AnimationConfig } from '$types/global';

// Register GSAP plugins
if (typeof window !== 'undefined') {
	gsap.registerPlugin(ScrollTrigger);
}

export class TypingAnimation {
	private element: HTMLElement;
	private lines: string[];
	private currentLineIndex = 0;
	private currentCharIndex = 0;
	private isComplete = false;
	private speed: number;
	private onComplete?: () => void;

	constructor(element: HTMLElement, lines: string[], speed = 100, onComplete?: () => void) {
		this.element = element;
		this.lines = lines;
		this.speed = speed;
		this.onComplete = onComplete;
		this.init();
	}

	private init() {
		// Clear element and create line containers
		this.element.innerHTML = '';
		this.lines.forEach((_, index) => {
			const lineElement = document.createElement('div');
			lineElement.className = 'typing-line';
			lineElement.setAttribute('data-line', index.toString());
			this.element.appendChild(lineElement);
		});

		// Start typing animation
		this.typeNextChar();
	}

	private typeNextChar() {
		if (this.isComplete) return;

		const currentLine = this.lines[this.currentLineIndex];
		const lineElement = this.element.querySelector(
			`[data-line="${this.currentLineIndex}"]`
		) as HTMLElement;

		if (this.currentCharIndex < currentLine.length) {
			// Type next character
			lineElement.textContent = currentLine.substring(0, this.currentCharIndex + 1);
			this.currentCharIndex++;

			setTimeout(() => this.typeNextChar(), this.speed);
		} else {
			// Move to next line
			this.currentLineIndex++;
			this.currentCharIndex = 0;

			if (this.currentLineIndex < this.lines.length) {
				// Add glow effect to completed line (except last line)
				if (this.currentLineIndex < this.lines.length) {
					lineElement.style.textShadow = '0 0 20px rgba(0, 255, 255, 0.8)';
				}

				setTimeout(() => this.typeNextChar(), this.speed * 10); // Pause between lines
			} else {
				// Animation complete - handle last line specially
				this.isComplete = true;

				// Add highlight class for gradient effect (no text-shadow)
				lineElement.classList.add('highlight');
				lineElement.style.background = 'linear-gradient(45deg, #00ffff, #ff00ff)';
				lineElement.style.webkitBackgroundClip = 'text';
				lineElement.style.webkitTextFillColor = 'transparent';
				lineElement.style.backgroundClip = 'text';
				lineElement.style.textShadow = 'none'; // Remove any text shadow

				if (this.onComplete) {
					this.onComplete();
				}
			}
		}
	}

	public destroy() {
		this.isComplete = true;
	}
}

export function createScrollAnimation(element: HTMLElement | string, config: AnimationConfig) {
	if (typeof window === 'undefined') return;

	return gsap.fromTo(
		element,
		{
			opacity: 0,
			y: 50
		},
		{
			opacity: 1,
			y: 0,
			duration: config.duration,
			ease: config.easing,
			delay: config.delay || 0,
			scrollTrigger: {
				trigger: element,
				start: 'top 80%',
				end: 'bottom 20%',
				toggleActions: 'play none none reverse'
			}
		}
	);
}

export function createStaggerAnimation(elements: HTMLElement[] | string, config: AnimationConfig) {
	if (typeof window === 'undefined') return;

	return gsap.fromTo(
		elements,
		{
			opacity: 0,
			y: 30
		},
		{
			opacity: 1,
			y: 0,
			duration: config.duration,
			ease: config.easing,
			stagger: config.stagger || 0.1,
			scrollTrigger: {
				trigger: elements,
				start: 'top 80%',
				toggleActions: 'play none none reverse'
			}
		}
	);
}

export function createHoverAnimation(element: HTMLElement) {
	if (typeof window === 'undefined') return;

	const tl = gsap.timeline({ paused: true });

	tl.to(element, {
		scale: 1.05,
		y: -10,
		boxShadow: '0 20px 40px rgba(0, 255, 255, 0.3)',
		duration: 0.3,
		ease: 'power2.out'
	});

	element.addEventListener('mouseenter', () => tl.play());
	element.addEventListener('mouseleave', () => tl.reverse());

	return tl;
}

export function createFloatingAnimation(element: HTMLElement) {
	if (typeof window === 'undefined') return;

	return gsap.to(element, {
		y: -20,
		duration: 2,
		ease: 'power2.inOut',
		yoyo: true,
		repeat: -1
	});
}

export const defaultAnimationConfig: AnimationConfig = {
	duration: 0.8,
	easing: 'power3.out',
	delay: 0,
	stagger: 0.1
};
