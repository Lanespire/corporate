import { error } from '@sveltejs/kit';
import { cases } from '$lib/corp/content';
import type { EntryGenerator, PageLoad } from './$types';

export const entries: EntryGenerator = () => cases.map((item) => ({ slug: item.slug }));

export const load: PageLoad = ({ params }) => {
	const index = cases.findIndex((item) => item.slug === params.slug);
	if (index < 0) error(404, 'Not found');
	return {
		index,
		item: cases[index],
		prev: cases[index - 1] ?? null,
		next: cases[index + 1] ?? null
	};
};
