import { writable } from 'svelte/store';

type FrameCallback = () => void;

const callbacks = new Set<FrameCallback>();
let ticking = false;
let bound = false;

function run() {
	ticking = false;
	callbacks.forEach((callback) => callback());
}

function request() {
	if (ticking) return;
	ticking = true;
	requestAnimationFrame(run);
}

/** Run a callback once per frame while the page scrolls or resizes. */
export function onFrame(callback: FrameCallback): () => void {
	if (!bound) {
		bound = true;
		addEventListener('scroll', request, { passive: true });
		addEventListener('resize', request, { passive: true });
	}
	callbacks.add(callback);
	request();
	return () => {
		callbacks.delete(callback);
	};
}

export const clamp = (value: number, min = 0, max = 1) => Math.min(max, Math.max(min, value));

export function reducedMotion(): boolean {
	return typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches;
}

let observer: IntersectionObserver | undefined;

/** Add `is-in` when the node enters the viewport. Pair with data-reveal or data-lines. */
export function reveal(node: HTMLElement) {
	if (typeof IntersectionObserver !== 'function') {
		node.classList.add('is-in');
		return {};
	}
	observer ??= new IntersectionObserver(
		(entries) => {
			for (const entry of entries) {
				if (!entry.isIntersecting) continue;
				entry.target.classList.add('is-in');
				observer?.unobserve(entry.target);
			}
		},
		{ rootMargin: '0px 0px -8% 0px', threshold: 0.06 }
	);
	observer.observe(node);
	return {
		destroy() {
			observer?.unobserve(node);
		}
	};
}

/** Expose scroll position through --py on the node; children apply the transform. */
export function parallax(node: HTMLElement, amount = 48) {
	if (reducedMotion()) return {};
	const stop = onFrame(() => {
		const rect = node.getBoundingClientRect();
		if (rect.bottom < -120 || rect.top > innerHeight + 120) return;
		const progress = clamp((innerHeight - rect.top) / (innerHeight + rect.height));
		node.style.setProperty('--py', `${((0.5 - progress) * amount).toFixed(1)}px`);
	});
	return { destroy: stop };
}

export const contactSubject = writable('');
export const privacyOpen = writable(false);
