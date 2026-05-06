const TARGETS = {
	'mvp.lanespire.com': '/mvp.html',
	'launch-lp.lanespire.com': '/launch-lp.html'
};

export default async (request, context) => {
	const url = new URL(request.url);
	if (url.pathname !== '/') return;

	const target = TARGETS[url.hostname];
	if (!target) return;

	return context.rewrite(target);
};

export const config = { path: '/' };
