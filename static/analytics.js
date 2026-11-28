// GA4 for lanespire.com and its LP subdomains; never sends form field values.
(() => {
	const host = location.hostname;
	if (host !== 'lanespire.com' && !host.endsWith('.lanespire.com')) return;
	const id = 'G-JZMQNH9G57';
	window.dataLayer = window.dataLayer || [];
	window.gtag = function () {
		window.dataLayer.push(arguments);
	};
	window.gtag('js', new Date());
	window.gtag('config', id);
	const script = document.createElement('script');
	script.async = true;
	script.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
	document.head.appendChild(script);
	const lead = (form) =>
		window.gtag('event', 'generate_lead', { form_name: form, transport_type: 'beacon' });
	window.addEventListener('lanespire:lead', (event) => lead(String(event.detail?.form || '')));
	document.addEventListener('submit', (event) => {
		const form = event.target;
		if (form instanceof HTMLFormElement && form.dataset.leadOnSubmit && !event.defaultPrevented)
			lead(form.dataset.leadOnSubmit);
	});
})();
