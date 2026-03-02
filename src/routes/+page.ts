import { parseMarkdownCollection } from '$lib/utils/content';
import type { PageLoad } from './$types';

const serviceFiles = import.meta.glob('/src/content/services/*.md', {
	eager: true,
	import: 'default',
	query: '?raw'
}) as Record<string, string>;

const caseStudyFiles = import.meta.glob('/src/content/case-studies/*.md', {
	eager: true,
	import: 'default',
	query: '?raw'
}) as Record<string, string>;

const services = parseMarkdownCollection(serviceFiles);
const caseStudies = parseMarkdownCollection(caseStudyFiles);

export const load: PageLoad = () => {
	return {
		services,
		caseStudies
	};
};
