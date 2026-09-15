/* Original progressive enhancement. No APIs, payment, storage or real user data. */
(() => {
	'use strict';
	const $ = (s, root = document) => root.querySelector(s);
	const $$ = (s, root = document) => [...root.querySelectorAll(s)];
	const media = matchMedia('(prefers-reduced-motion: reduce)');
	const pause = $('#motion-pause');
	const activeAnimations = new Set();
	const reduced = () => media.matches || Boolean(pause?.checked);
	function animate(node, keyframes, options = {}) {
		if (!node || reduced() || !node.animate) return;
		const animation = node.animate(keyframes, {
			duration: 380,
			easing: 'cubic-bezier(.22,1,.36,1)',
			...options
		});
		activeAnimations.add(animation);
		animation.finished.catch(() => {}).finally(() => activeAnimations.delete(animation));
	}
	function motionChanged() {
		if (reduced()) activeAnimations.forEach((animation) => animation.cancel());
		const scene = $('[data-tilt]');
		if (scene) {
			scene.style.setProperty('--scene-x', '0deg');
			scene.style.setProperty('--scene-y', '0deg');
		}
	}
	media.addEventListener('change', motionChanged);
	pause?.addEventListener('change', motionChanged);

	const stage = $('.package-stage');
	const descriptions = {
		all: '会員の体験と、運営の仕組みをひとつのパッケージに。',
		app: 'iOS・Androidの会員アプリ。発見、マッチング、会話の体験を設計。',
		api: '認証・関係管理・課金検証。API、DB、Workerまで納品対象に。',
		admin: '会員管理・確認・審査・通報。日々の運営業務を支える管理画面。'
	};
	if (stage)
		$$('.package-layer', stage).forEach((node, index) => {
			const destination = getComputedStyle(node).transform;
			animate(
				node,
				[
					{ transform: 'translateY(30px) scale(.94)', opacity: 0.15 },
					{ transform: destination, opacity: 1 }
				],
				{ duration: 800, delay: index * 100 }
			);
		});
	const moduleButtons = $$('[data-module-select]');
	function selectModule(button) {
		const value = button.dataset.moduleSelect;
		if (!stage || !Object.hasOwn(descriptions, value)) return;
		$$('.package-layer', stage).forEach((node) =>
			node.getAnimations().forEach((animation) => animation.cancel())
		);
		stage.dataset.module = value;
		moduleButtons.forEach((item) => item.setAttribute('aria-pressed', String(item === button)));
		$('.package-summary').textContent = descriptions[value];
	}
	moduleButtons.forEach((button, index) => {
		button.addEventListener('click', () => selectModule(button));
		button.addEventListener('keydown', (event) => {
			let destination;
			if (event.key === 'ArrowRight') destination = (index + 1) % moduleButtons.length;
			if (event.key === 'ArrowLeft')
				destination = (index - 1 + moduleButtons.length) % moduleButtons.length;
			if (event.key === 'Home') destination = 0;
			if (event.key === 'End') destination = moduleButtons.length - 1;
			if (destination === undefined) return;
			event.preventDefault();
			moduleButtons[destination].focus();
			selectModule(moduleButtons[destination]);
		});
	});

	// Pointer movement changes only a decorative scene, never the document scroll.
	const heroScene = $('[data-tilt]');
	if (heroScene) {
		let pending = 0,
			x = 0,
			y = 0;
		heroScene.addEventListener(
			'pointermove',
			(event) => {
				if (reduced() || event.pointerType !== 'mouse') return;
				const rect = heroScene.getBoundingClientRect();
				x = (event.clientX - rect.left) / rect.width - 0.5;
				y = (event.clientY - rect.top) / rect.height - 0.5;
				if (!pending)
					pending = requestAnimationFrame(() => {
						pending = 0;
						if (reduced()) return;
						heroScene.style.setProperty('--scene-y', `${x * 5}deg`);
						heroScene.style.setProperty('--scene-x', `${y * -4}deg`);
					});
			},
			{ passive: true }
		);
		heroScene.addEventListener('pointerleave', () => {
			heroScene.style.setProperty('--scene-y', '0deg');
			heroScene.style.setProperty('--scene-x', '0deg');
		});
	}
	// One-time reveals: content is never made dependent on JS or a successful observer.
	if ('IntersectionObserver' in window) {
		const reveal = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (!entry.isIntersecting) return;
					reveal.unobserve(entry.target);
					animate(
						entry.target,
						[
							{ transform: 'translateY(20px)', opacity: 0.5 },
							{ transform: 'translateY(0)', opacity: 1 }
						],
						{ duration: 650 }
					);
				});
			},
			{ threshold: 0.08 }
		);
		$$('.reveal').forEach((node) => {
			if (node.getBoundingClientRect().top > innerHeight) reveal.observe(node);
		});
	}

	// A frontend-only OEM preview. Input is not persisted and never sent anywhere.
	const lab = $('.lab');
	if (lab) {
		const nameInput = $('#brand-name');
		function brandChanged(event) {
			const marriage = $('#preset-marriage').checked;
			const userName = nameInput.value.trim();
			const socialName = userName || 'mingle.';
			const marriageName = userName || 'enishi.';
			$$('.social-name', lab).forEach((node) => (node.textContent = socialName));
			$$('.marriage-name', lab).forEach((node) => (node.textContent = marriageName));
			$('#code-brand-name').textContent = marriage ? marriageName : socialName;
			$('#code-preset').textContent = marriage ? 'marriage' : 'social';
			$('#code-layout').textContent = marriage ? 'list' : 'card';
			$('#code-theme').textContent = $('input[name="brand-color"]:checked', lab).id.replace(
				'color-',
				''
			);
			// The preview is deliberately not advertised as the native configuration engine.
			if (event?.target !== nameInput) {
				const visible = $('#view-admin').checked ? $('#admin-panel') : $('#demo-device');
				animate(visible, [
					{ opacity: 0.6, transform: 'translateY(7px)' },
					{ opacity: 1, transform: 'translateY(0)' }
				]);
			}
		}
		lab.addEventListener('change', brandChanged);
		nameInput.addEventListener('input', brandChanged);
		brandChanged();
	}

	const form = $('#cost-form');
	if (form) {
		form.inert = false;
		const inputs = {
			scratch: $('#scratch-input'),
			custom: $('#custom-input'),
			setup: $('#setup-input')
		};
		const prices = Object.freeze({ source: 98000, brand: 148000, launch: 198000 });
		const names = Object.freeze({ source: 'Source', brand: 'Brand', launch: 'Launch' });
		const yen = (value) => `¥${Math.round(value).toLocaleString('ja-JP')}`;
		const man = (value) => (value / 10000).toLocaleString('ja-JP', { maximumFractionDigits: 1 });
		let copyText = '',
			announcementTimer = 0;
		const output = $('#cost-output');
		const range = $('#scratch-range');
		form.addEventListener('submit', (event) => event.preventDefault());
		function calculate(shouldAnnounce = true) {
			clearTimeout(announcementTimer);
			$('#copy-result').textContent = '';
			$('.calc-copy-field')?.remove();
			const invalid = Object.values(inputs).some(
				(input) =>
					input.value.trim() === '' ||
					!input.checkValidity() ||
					!Number.isFinite(input.valueAsNumber)
			);
			output.classList.toggle('is-invalid', invalid);
			$('#copy-estimate').disabled = invalid;
			if (invalid) {
				$('#calc-error').textContent = '0〜10,000万円の金額を、0.1万円単位で入力してください。';
				['scratch-total', 'template-total', 'savings-total'].forEach(
					(id) => ($('#' + id).textContent = '—')
				);
				$('#saving-ratio').textContent = '入力を確認してください';
				$('#difference-label').textContent = '試算を更新できません';
				$('#calc-breakdown').textContent = '未入力・範囲外の金額を修正してください。';
				$('#cost-difference-copy').textContent = '無効な入力を0円として計算しません。';
				$('#scratch-bar').style.width = '0%';
				$('#template-bar').style.width = '0%';
				$('#calc-announcement').textContent = '金額に未入力または範囲外の値があります。';
				copyText = '';
				return;
			}
			$('#calc-error').textContent = '';
			const choice = $('input[name="calc-plan"]:checked', form).value;
			const scratch = Math.round(inputs.scratch.valueAsNumber * 10000);
			const custom = Math.round(inputs.custom.valueAsNumber * 10000);
			const setup = Math.round(inputs.setup.valueAsNumber * 10000);
			const total = prices[choice] + custom + setup;
			const difference = scratch - total;
			const largest = Math.max(scratch, total, 1);
			const negative = difference < 0;
			output.classList.toggle('is-negative', negative);
			$('#scratch-total').textContent = yen(scratch);
			$('#template-total').textContent = yen(total);
			$('#scratch-bar').style.width = `${(scratch / largest) * 100}%`;
			$('#template-bar').style.width = `${(total / largest) * 100}%`;
			const saving = $('#savings-total');
			const previous = saving.textContent;
			saving.replaceChildren(
				document.createTextNode((negative ? '−' : '') + man(Math.abs(difference)))
			);
			const unit = document.createElement('small');
			unit.textContent = '万円';
			saving.append(unit);
			if (shouldAnnounce && previous !== saving.textContent)
				animate(
					saving,
					[
						{ transform: 'translateY(6px)', opacity: 0.7 },
						{ transform: 'translateY(0)', opacity: 1 }
					],
					{ duration: 200 }
				);
			$('#difference-label').textContent = negative
				? 'この条件ではテンプレート側が高くなります'
				: difference === 0
					? 'この条件では初期費用が同額です'
					: 'この条件で、差額は';
			$('#saving-ratio').textContent =
				scratch === 0
					? '比較額が0円のため、割合は算出しません'
					: negative
						? `入力額より${((Math.abs(difference) / scratch) * 100).toLocaleString('ja-JP', { maximumFractionDigits: 1 })}%増`
						: `初期費用の${((difference / scratch) * 100).toLocaleString('ja-JP', { maximumFractionDigits: 1 })}%相当`;
			$('#calc-breakdown').textContent =
				`${names[choice]} ${man(prices[choice])}万円 ＋ 追加改修${man(custom)}万円 ＋ 導入等${man(setup)}万円`;
			$('#cost-difference-copy').textContent = negative
				? '価格だけでなく、再利用できる機能と必要な改修範囲を見直して比較してください。'
				: '共通機能を再利用し、独自の体験づくりに予算を回す選択肢です。';
			$$('.price-card').forEach((card) =>
				card.classList.toggle('is-comparing', card.dataset.plan === choice)
			);
			range.max = String(Math.max(1000, Math.ceil(inputs.scratch.valueAsNumber / 100) * 100));
			range.value = String(inputs.scratch.valueAsNumber);
			$('.range-labels>span:last-child').textContent =
				`${Number(range.max).toLocaleString('ja-JP')}万円`;
			const sentence = `スクラッチ ${yen(scratch)}、テンプレート利用 ${yen(total)}、差額 ${negative ? 'マイナス' : ''}${man(Math.abs(difference))}万円。いずれも税別・仮定の試算です。`;
			if (shouldAnnounce)
				announcementTimer = setTimeout(() => {
					$('#calc-announcement').textContent = sentence;
				}, 220);
			copyText = `Matching 初期費用の比較（税別・仮定）\nスクラッチ：${yen(scratch)}\n${names[choice]}ライセンス：${yen(prices[choice])}\n追加開発・改修：${yen(custom)}\nプラン外の導入・公開準備：${yen(setup)}\nテンプレート利用総額：${yen(total)}\n差額：${negative ? '−' : ''}${yen(Math.abs(difference))}\n\n市場相場・見積・削減保証ではありません。同じ機能・品質・公開範囲で比較し、支援作業の二重計上を除いてください。外部サービス料・ストア関連費・集客・有人運営・継続保守は双方に含みません。\nhttps://lanespire.com/templates/matching/`;
		}
		form.addEventListener('input', (event) => {
			if (event.target === range) inputs.scratch.value = range.value;
			calculate();
		});
		form.addEventListener('reset', () => setTimeout(() => calculate(), 0));
		$('#copy-estimate').addEventListener('click', async () => {
			if (!copyText) return;
			try {
				if (!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable');
				await navigator.clipboard.writeText(copyText);
				$('#copy-result').textContent = '試算条件と注意事項をコピーしました。';
			} catch {
				$('.calc-copy-field')?.remove();
				const field = document.createElement('textarea');
				field.className = 'calc-copy-field';
				field.readOnly = true;
				field.value = copyText;
				field.setAttribute('aria-label', 'コピーする試算結果と注意事項');
				output.append(field);
				field.focus();
				field.select();
				$('#copy-result').textContent = '下の欄を選択しています。コピーしてご利用ください。';
			}
		});
		calculate(false);
	}
	// Close native small-screen navigation after selecting a destination.
	$$('.mobile-nav a').forEach((link) =>
		link.addEventListener('click', () => {
			const menu = link.closest('details');
			if (menu) menu.open = false;
		})
	);

	const featureFilters = $$('[data-feature-filter]');
	featureFilters.forEach((button) =>
		button.addEventListener('click', () => {
			const category = button.dataset.featureFilter;
			featureFilters.forEach((item) => item.setAttribute('aria-pressed', String(item === button)));
			const groups = $$('.feature-group');
			groups.forEach((group) => {
				group.hidden = category !== 'all' && group.dataset.featureCategory !== category;
			});
			$('#feature-count').textContent =
				`${groups.filter((group) => !group.hidden).length}つの機能グループ`;
			animate(
				$('.features-grid'),
				[
					{ opacity: 0.6, transform: 'translateY(5px)' },
					{ opacity: 1, transform: 'translateY(0)' }
				],
				{ duration: 220 }
			);
		})
	);
})();
