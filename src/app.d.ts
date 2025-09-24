// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

type OptimizedPicture = import('./lib/types/global').OptimizedPicture;
type OptimizedSrcset = import('./lib/types/global').OptimizedSrcset;

declare module '*?as=picture' {
	const metadata: OptimizedPicture;
	export default metadata;
}

declare module '*&as=picture' {
	const metadata: OptimizedPicture;
	export default metadata;
}

declare module '$assets/*?as=picture' {
	const metadata: OptimizedPicture;
	export default metadata;
}

declare module '$assets/*&as=picture' {
	const metadata: OptimizedPicture;
	export default metadata;
}

declare module '*?as=srcset' {
	const metadata: OptimizedSrcset;
	export default metadata;
}

declare module '*&as=srcset' {
	const metadata: OptimizedSrcset;
	export default metadata;
}

declare module '$assets/*?as=srcset' {
	const metadata: OptimizedSrcset;
	export default metadata;
}

declare module '$assets/*&as=srcset' {
	const metadata: OptimizedSrcset;
	export default metadata;
}

declare module '*?as=src' {
	const src: string;
	export default src;
}

declare module '*&as=src' {
	const src: string;
	export default src;
}

declare module '$assets/*?as=src' {
	const src: string;
	export default src;
}

declare module '$assets/*&as=src' {
        const src: string;
        export default src;
}

declare module '*?url' {
        const src: string;
        export default src;
}

declare module '$assets/*?url' {
        const src: string;
        export default src;
}

declare module '*?*' {
        const data:
                | OptimizedPicture
                | OptimizedSrcset
                | { src: string; width: number; height: number; srcset?: string; sizes?: string }
		| string;
	export default data;
}

declare module '$assets/*' {
	const src: string;
	export default src;
}

export {};
