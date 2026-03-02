import type { ContentEntry, ContentEntryMeta } from '$lib/types/content';

function escapeHtml(value: string): string {
	return value
		.replaceAll('&', '&amp;')
		.replaceAll('<', '&lt;')
		.replaceAll('>', '&gt;')
		.replaceAll('"', '&quot;')
		.replaceAll("'", '&#39;');
}

function toInlineMarkdownHtml(value: string): string {
	const escaped = escapeHtml(value);

	return escaped
		.replace(/`([^`]+)`/g, '<code>$1</code>')
		.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
		.replace(/\*([^*]+)\*/g, '<em>$1</em>')
		.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_full, label: string, url: string) => {
			const safeLabel = label.trim();
			const safeUrl = escapeHtml(url.trim());
			return `<a href="${safeUrl}" target="_blank" rel="noreferrer">${safeLabel}</a>`;
		});
}

function markdownToHtml(markdown: string): string {
	const rows = markdown.replaceAll('\r\n', '\n').split('\n');
	const fragments: string[] = [];
	let inList = false;

	const closeList = () => {
		if (inList) {
			fragments.push('</ul>');
			inList = false;
		}
	};

	for (const row of rows) {
		const line = row.trim();

		if (!line) {
			closeList();
			continue;
		}

		if (line.startsWith('- ')) {
			if (!inList) {
				fragments.push('<ul>');
				inList = true;
			}
			fragments.push(`<li>${toInlineMarkdownHtml(line.slice(2).trim())}</li>`);
			continue;
		}

		closeList();

		if (line.startsWith('### ')) {
			fragments.push(`<h4>${toInlineMarkdownHtml(line.slice(4).trim())}</h4>`);
			continue;
		}

		if (line.startsWith('## ')) {
			fragments.push(`<h3>${toInlineMarkdownHtml(line.slice(3).trim())}</h3>`);
			continue;
		}

		if (line.startsWith('# ')) {
			fragments.push(`<h2>${toInlineMarkdownHtml(line.slice(2).trim())}</h2>`);
			continue;
		}

		if (line.startsWith('> ')) {
			fragments.push(`<blockquote>${toInlineMarkdownHtml(line.slice(2).trim())}</blockquote>`);
			continue;
		}

		fragments.push(`<p>${toInlineMarkdownHtml(line)}</p>`);
	}

	closeList();
	return fragments.join('');
}

function parseScalar(value: string): string | number | string[] {
	const trimmed = value.trim();

	if (!trimmed) {
		return '';
	}

	if (/^-?\d+(\.\d+)?$/.test(trimmed)) {
		return Number(trimmed);
	}

	if (
		(trimmed.startsWith('[') && trimmed.endsWith(']')) ||
		(trimmed.startsWith('{') && trimmed.endsWith('}'))
	) {
		try {
			const parsed = JSON.parse(trimmed) as unknown;
			if (Array.isArray(parsed)) {
				return parsed.map((item) => String(item).trim()).filter(Boolean);
			}
		} catch {
			// JSON format is optional. Fall through to string parsing.
		}
	}

	if (trimmed.includes(',')) {
		return trimmed
			.split(',')
			.map((item) => item.trim())
			.filter(Boolean);
	}

	return trimmed.replace(/^"(.*)"$/, '$1').replace(/^'(.*)'$/, '$1');
}

function parseFrontmatter(raw: string): { meta: ContentEntryMeta; body: string } {
	const normalized = raw.replaceAll('\r\n', '\n');
	const match = normalized.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);

	if (!match) {
		return {
			meta: {},
			body: normalized.trim()
		};
	}

	const [, frontmatterRaw, bodyRaw] = match;
	const meta: ContentEntryMeta = {};

	for (const row of frontmatterRaw.split('\n')) {
		const line = row.trim();
		if (!line || line.startsWith('#')) {
			continue;
		}

		const index = line.indexOf(':');
		if (index === -1) {
			continue;
		}

		const key = line.slice(0, index).trim();
		const value = line.slice(index + 1).trim();
		meta[key] = parseScalar(value);
	}

	return {
		meta,
		body: bodyRaw.trim()
	};
}

function asString(value: unknown, fallback = ''): string {
	if (typeof value === 'string') {
		return value;
	}

	if (typeof value === 'number') {
		return String(value);
	}

	return fallback;
}

function asNumber(value: unknown, fallback = 999): number {
	if (typeof value === 'number' && Number.isFinite(value)) {
		return value;
	}

	if (typeof value === 'string') {
		const parsed = Number(value);
		if (Number.isFinite(parsed)) {
			return parsed;
		}
	}

	return fallback;
}

function asStringArray(value: unknown): string[] {
	if (Array.isArray(value)) {
		return value.map((entry) => String(entry).trim()).filter(Boolean);
	}

	if (typeof value === 'string') {
		return value
			.split(',')
			.map((entry) => entry.trim())
			.filter(Boolean);
	}

	return [];
}

function pathToSlug(path: string): string {
	const filename = path.split('/').pop() ?? 'entry';
	return filename.replace(/\.md$/, '');
}

function slugToTitle(slug: string): string {
	return slug
		.split('-')
		.map((part) => part.charAt(0).toUpperCase() + part.slice(1))
		.join(' ');
}

export function parseMarkdownCollection(files: Record<string, string>): ContentEntry[] {
	const entries = Object.entries(files).map(([path, raw]) => {
		const slug = pathToSlug(path);
		const { meta, body } = parseFrontmatter(raw);

		const title = asString(meta.title, slugToTitle(slug));
		const summary = asString(meta.summary);
		const category = asString(meta.category);
		const order = asNumber(meta.order);
		const tags = asStringArray(meta.tags);
		const ctaLabel = asString(meta.cta_label);
		const ctaUrl = asString(meta.cta_url);

		return {
			slug,
			title,
			summary,
			category,
			order,
			tags,
			ctaLabel: ctaLabel || undefined,
			ctaUrl: ctaUrl || undefined,
			body,
			html: markdownToHtml(body),
			meta
		} satisfies ContentEntry;
	});

	return entries.sort((left, right) => {
		if (left.order !== right.order) {
			return left.order - right.order;
		}

		return left.title.localeCompare(right.title, 'ja');
	});
}
