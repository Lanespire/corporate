export interface ContentEntryMeta {
	[key: string]: string | number | string[];
}

export interface ContentEntry {
	slug: string;
	title: string;
	summary: string;
	category: string;
	order: number;
	tags: string[];
	ctaLabel?: string;
	ctaUrl?: string;
	body: string;
	html: string;
	meta: ContentEntryMeta;
}
