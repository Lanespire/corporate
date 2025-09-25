/// <reference types="@sveltejs/kit" />
/// <reference no-default-lib="true" />
/// <reference lib="esnext" />
/// <reference lib="webworker" />

import { build, files, version } from '$service-worker';

const CACHE = `cache-${version}`;

// Filter out any potentially problematic assets
const ASSETS = [
	...build, // the app itself
	...files.filter((file) => {
		// Skip files that might cause issues
		return !file.includes('.DS_Store') && !file.includes('Thumbs.db') && !file.endsWith('.map');
	})
];

self.addEventListener('install', (event) => {
	async function addFilesToCache() {
		const cache = await caches.open(CACHE);

		// Add files one by one with error handling
		const promises = ASSETS.map(async (asset) => {
			try {
				const response = await fetch(asset);
				if (response.ok) {
					await cache.put(asset, response);
				} else {
					console.warn(`Failed to cache asset: ${asset} - Status: ${response.status}`);
				}
			} catch (error) {
				console.warn(`Failed to fetch asset: ${asset}`, error);
			}
		});

		await Promise.allSettled(promises);
	}

	event.waitUntil(addFilesToCache());
});

self.addEventListener('activate', (event) => {
	async function deleteOldCaches() {
		for (const key of await caches.keys()) {
			if (key !== CACHE) {
				await caches.delete(key);
			}
		}
	}

	event.waitUntil(deleteOldCaches());
});

self.addEventListener('fetch', (event) => {
	if (event.request.method !== 'GET') return;

	async function respond() {
		const url = new URL(event.request.url);
		const cache = await caches.open(CACHE);

		// `build`/`files` can always be served from cache
		if (ASSETS.includes(url.pathname)) {
			const cached = await cache.match(event.request);
			if (cached) {
				return cached;
			}
		}

		// for everything else, try the network first, but
		// fall back to the cache if we're offline
		try {
			const response = await fetch(event.request);
			if (response.ok) {
				cache.put(event.request, response.clone());
			}
			return response;
		} catch (err) {
			const cached = await cache.match(event.request);
			if (cached) {
				return cached;
			}
			throw err;
		}
	}

	event.respondWith(respond());
});
