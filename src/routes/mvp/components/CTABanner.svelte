<script lang="ts">
	import { SvelteURLSearchParams } from 'svelte/reactivity';

	const checks = [
		'平均返信スピード: 当日中',
		'相談からキックオフまで: 中央値5営業日',
		'NDA締結も初回相談時に対応可'
	];

	let form = { name: '', email: '', company: '', message: '' };
	let state: 'idle' | 'sending' | 'success' | 'error' = 'idle';
	let errorMessage = '';

	async function submit() {
		if (typeof window === 'undefined') return;
		if (state === 'sending') return;

		state = 'sending';
		errorMessage = '';

		const body = new SvelteURLSearchParams();
		body.append('form-name', 'mvp-contact');
		body.append('name', form.name);
		body.append('email', form.email);
		body.append('company', form.company);
		body.append('message', form.message);

		try {
			const res = await fetch('/', {
				method: 'POST',
				headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
				body: body.toString()
			});
			if (!res.ok) throw new Error(`HTTP ${res.status}`);
			state = 'success';
			form = { name: '', email: '', company: '', message: '' };
		} catch (err) {
			state = 'error';
			errorMessage = '送信に失敗しました。お手数ですが info@lanespire.com まで直接ご連絡ください。';
		}
	}
</script>

<section id="cta" class="cta" aria-labelledby="cta-heading">
	<div class="container">
		<div class="banner">
			<div class="visual" aria-hidden="true">
				<div class="badge">
					<svg class="badge-ring" viewBox="0 0 220 220" fill="none">
						<circle
							cx="110"
							cy="110"
							r="104"
							stroke="rgba(255,255,255,0.35)"
							stroke-width="1.5"
							stroke-dasharray="4 6"
						/>
						<circle cx="110" cy="110" r="92" stroke="rgba(255,255,255,0.55)" stroke-width="1.5" />
					</svg>
					<div class="badge-inner">
						<span class="badge-num">30</span>
						<span class="badge-unit">MIN</span>
						<span class="badge-label">FREE</span>
					</div>
					<svg
						class="badge-spark spark-1"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
						aria-hidden="true"
					>
						<path
							d="M12 2v4M12 18v4M2 12h4M18 12h4M4.9 4.9l2.8 2.8M16.3 16.3l2.8 2.8M4.9 19.1l2.8-2.8M16.3 7.7l2.8-2.8"
						/>
					</svg>
					<svg
						class="badge-spark spark-2"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
						aria-hidden="true"
					>
						<path d="M12 3l2 5 5 2-5 2-2 5-2-5-5-2 5-2z" />
					</svg>
				</div>
			</div>

			<div class="copy">
				<span class="eyebrow">FREE 30-MIN CONSULTATION</span>
				<h2 id="cta-heading">まずは30分の無料相談から。</h2>
				<p class="lede">
					要件が固まっていなくて大丈夫です。「最短で見せる初回デモの範囲」から一緒に決めます。<br />
					オンライン・初回無料・営業の押し売りはしません。
				</p>
				<div class="cta-actions">
					<a class="cta-btn primary" href="#cta-form">
						<span>無料相談を予約する</span>
						<svg
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2.4"
							stroke-linecap="round"
							stroke-linejoin="round"
							aria-hidden="true"><path d="M5 12h14" /><path d="M13 5l7 7-7 7" /></svg
						>
					</a>
				</div>
			</div>

			<ul class="checks">
				{#each checks as item}
					<li>
						<span class="tick" aria-hidden="true">
							<svg
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="3"
								stroke-linecap="round"
								stroke-linejoin="round"><path d="M5 12l5 5L20 7" /></svg
							>
						</span>
						<span>{item}</span>
					</li>
				{/each}
			</ul>
		</div>

		<div id="cta-form" class="form-wrap">
			{#if state === 'success'}
				<div class="form-success" role="status">
					<svg
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2.6"
						stroke-linecap="round"
						stroke-linejoin="round"
						aria-hidden="true"
					>
						<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
						<polyline points="22 4 12 14.01 9 11.01" />
					</svg>
					<div>
						<strong>相談内容を受け付けました。</strong>
						<span>担当より平日10:00–19:00に折り返しご連絡いたします（通常当日中）。</span>
					</div>
				</div>
			{:else}
				<form
					class="cta-form"
					name="mvp-contact"
					method="POST"
					data-netlify="true"
					data-netlify-honeypot="bot-field"
					on:submit|preventDefault={submit}
				>
					<input type="hidden" name="form-name" value="mvp-contact" />
					<p class="visually-hidden">
						<label>Do not fill this out: <input name="bot-field" /></label>
					</p>

					<div class="form-head">
						<h3>無料相談を予約する</h3>
						<p>30分のオンライン相談（Google Meet）。営業の押し売りはしません。</p>
					</div>

					<div class="form-grid">
						<label>
							<span>お名前 <em>必須</em></span>
							<input bind:value={form.name} name="name" autocomplete="name" required />
						</label>
						<label>
							<span>メールアドレス <em>必須</em></span>
							<input
								bind:value={form.email}
								name="email"
								type="email"
								autocomplete="email"
								required
							/>
						</label>
						<label class="full">
							<span>会社名</span>
							<input bind:value={form.company} name="company" autocomplete="organization" />
						</label>
						<label class="full">
							<span>相談したい内容 <em>必須</em></span>
							<textarea
								bind:value={form.message}
								name="message"
								rows="5"
								placeholder="例: 新規事業のMVPで、最短で見せる初回デモを作りたい"
								required
							></textarea>
						</label>
					</div>

					<button class="form-submit" type="submit" disabled={state === 'sending'}>
						<span>{state === 'sending' ? '送信中…' : '相談内容を送る'}</span>
						<svg
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2.4"
							stroke-linecap="round"
							stroke-linejoin="round"
							aria-hidden="true"><path d="M5 12h14" /><path d="M13 5l7 7-7 7" /></svg
						>
					</button>

					{#if state === 'error'}
						<p class="form-error" role="alert">{errorMessage}</p>
					{/if}
				</form>
			{/if}
		</div>
	</div>
</section>

<style>
	.cta {
		padding: var(--mvp-section-pad-y) 0;
		background: var(--mvp-bg);
		font-family: var(--mvp-font-body);
	}

	.container {
		max-width: var(--mvp-container-max);
		margin: 0 auto;
		padding: 0 var(--mvp-container-pad);
	}

	.banner {
		position: relative;
		display: grid;
		grid-template-columns: 240px 1fr 240px;
		gap: var(--mvp-space-10);
		align-items: center;
		background: var(--mvp-gradient-cta);
		color: var(--mvp-text-on-orange);
		border-radius: var(--mvp-radius-lg);
		padding: var(--mvp-space-12);
		box-shadow: var(--mvp-shadow-cta);
		overflow: hidden;
	}

	.banner::before {
		content: '';
		position: absolute;
		inset: 0;
		background-image: radial-gradient(rgba(255, 255, 255, 0.18) 1px, transparent 1px);
		background-size: 14px 14px;
		opacity: 0.45;
		pointer-events: none;
	}

	.visual {
		position: relative;
		z-index: 1;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.badge {
		position: relative;
		width: 220px;
		height: 220px;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.badge-ring {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		animation: badge-spin 28s linear infinite;
	}

	.badge-inner {
		position: relative;
		width: 168px;
		height: 168px;
		border-radius: 50%;
		background: var(--mvp-white);
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 2px;
		box-shadow:
			0 12px 28px rgba(15, 27, 61, 0.22),
			inset 0 0 0 1px rgba(255, 255, 255, 0.6);
	}

	.badge-num {
		font-family: var(--mvp-font-heading);
		font-size: 64px;
		font-weight: var(--mvp-fw-bold);
		line-height: 1;
		color: var(--mvp-orange-600);
		letter-spacing: -0.03em;
	}

	.badge-unit {
		font-family: var(--mvp-font-heading);
		font-size: 14px;
		font-weight: var(--mvp-fw-bold);
		letter-spacing: 0.18em;
		color: var(--mvp-orange-700);
	}

	.badge-label {
		margin-top: 6px;
		font-size: 10px;
		font-weight: var(--mvp-fw-semibold);
		letter-spacing: 0.32em;
		color: var(--mvp-orange-500);
		padding: 4px 10px;
		border-radius: 999px;
		background: var(--mvp-orange-50);
	}

	.badge-spark {
		position: absolute;
		color: rgba(255, 255, 255, 0.85);
	}

	.spark-1 {
		width: 22px;
		height: 22px;
		top: 6px;
		right: 14px;
		animation: badge-pulse 2.6s ease-in-out infinite;
	}

	.spark-2 {
		width: 26px;
		height: 26px;
		bottom: 10px;
		left: 8px;
		animation: badge-pulse 2.6s ease-in-out infinite 1.3s;
	}

	@keyframes badge-spin {
		to {
			transform: rotate(360deg);
		}
	}

	@keyframes badge-pulse {
		0%,
		100% {
			opacity: 0.5;
			transform: scale(0.92);
		}
		50% {
			opacity: 1;
			transform: scale(1.08);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.badge-ring,
		.badge-spark {
			animation: none;
		}
	}

	.copy {
		position: relative;
		z-index: 1;
	}

	.eyebrow {
		display: inline-block;
		font-size: var(--mvp-fs-eyebrow);
		font-weight: var(--mvp-fw-semibold);
		letter-spacing: var(--mvp-ls-wide);
		color: rgba(255, 255, 255, 0.85);
		margin-bottom: var(--mvp-space-3);
		text-transform: uppercase;
	}

	h2 {
		font-family: var(--mvp-font-heading);
		font-size: var(--mvp-fs-h2);
		font-weight: var(--mvp-fw-bold);
		line-height: var(--mvp-lh-tight);
		letter-spacing: var(--mvp-ls-tight);
		margin: 0 0 var(--mvp-space-4);
		color: var(--mvp-white);
	}

	.lede {
		font-size: var(--mvp-fs-body);
		line-height: var(--mvp-lh-normal);
		color: rgba(255, 255, 255, 0.95);
		margin: 0 0 var(--mvp-space-6);
		max-width: 520px;
	}

	.cta-actions {
		display: flex;
		flex-wrap: wrap;
		gap: var(--mvp-space-3);
	}

	.cta-btn {
		display: inline-flex;
		align-items: center;
		gap: var(--mvp-space-3);
		font-weight: var(--mvp-fw-bold);
		font-size: var(--mvp-fs-body-lg);
		padding: 14px 28px;
		border-radius: var(--mvp-radius-pill);
		text-decoration: none;
		transition:
			transform var(--mvp-transition),
			box-shadow var(--mvp-transition),
			background var(--mvp-transition),
			color var(--mvp-transition);
	}

	.cta-btn.primary {
		background: var(--mvp-white);
		color: var(--mvp-orange-700);
		box-shadow: 0 6px 18px rgba(15, 27, 61, 0.18);
	}

	.cta-btn.primary:hover {
		transform: translateY(-2px);
		box-shadow: 0 12px 28px rgba(15, 27, 61, 0.22);
	}

	.cta-btn :global(svg) {
		width: 18px;
		height: 18px;
	}

	.checks {
		position: relative;
		z-index: 1;
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		flex-direction: column;
		gap: var(--mvp-space-3);
	}

	.checks li {
		display: flex;
		align-items: center;
		gap: var(--mvp-space-3);
		font-size: var(--mvp-fs-body);
		font-weight: var(--mvp-fw-medium);
	}

	.tick {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 24px;
		height: 24px;
		border-radius: 50%;
		background: var(--mvp-white);
		color: var(--mvp-orange-600);
		flex-shrink: 0;
	}

	.tick :global(svg) {
		width: 14px;
		height: 14px;
	}

	@media (max-width: 1024px) {
		.banner {
			grid-template-columns: 1fr;
			gap: var(--mvp-space-8);
			padding: var(--mvp-space-10);
			text-align: center;
		}
		.lede {
			margin-left: auto;
			margin-right: auto;
		}
		.checks {
			align-items: center;
		}
	}

	@media (max-width: 640px) {
		.banner {
			padding: var(--mvp-space-8) var(--mvp-space-5);
			border-radius: var(--mvp-radius-card);
		}
		.badge {
			width: 180px;
			height: 180px;
		}
		.badge-inner {
			width: 138px;
			height: 138px;
		}
		.badge-num {
			font-size: 52px;
		}
		.cta-actions {
			flex-direction: column;
			width: 100%;
		}
		.cta-btn {
			width: 100%;
			justify-content: center;
		}
	}

	/* ---------- Visually hidden (a11y / honeypot) ---------- */
	.visually-hidden {
		position: absolute !important;
		width: 1px;
		height: 1px;
		padding: 0;
		margin: -1px;
		overflow: hidden;
		clip: rect(0, 0, 0, 0);
		white-space: nowrap;
		border: 0;
	}

	/* ---------- Inline contact form ---------- */
	.form-wrap {
		margin-top: var(--mvp-space-10);
		max-width: 760px;
		margin-left: auto;
		margin-right: auto;
		scroll-margin-top: 80px;
	}

	.cta-form {
		background: var(--mvp-white);
		border-radius: var(--mvp-radius-lg);
		padding: var(--mvp-space-10);
		box-shadow: var(--mvp-shadow-cta);
		border: 1px solid var(--mvp-gray-200);
		display: flex;
		flex-direction: column;
		gap: var(--mvp-space-6);
	}

	.form-head h3 {
		font-family: var(--mvp-font-heading);
		font-size: 22px;
		font-weight: var(--mvp-fw-bold);
		color: var(--mvp-navy-900);
		margin: 0 0 6px;
	}
	.form-head p {
		font-size: 13.5px;
		color: var(--mvp-gray-600);
		margin: 0;
	}

	.form-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: var(--mvp-space-4) var(--mvp-space-6);
	}
	.form-grid label {
		display: flex;
		flex-direction: column;
		gap: 6px;
	}
	.form-grid label.full {
		grid-column: 1 / -1;
	}
	.form-grid label > span {
		font-size: 13px;
		font-weight: var(--mvp-fw-semibold);
		color: var(--mvp-navy-700);
		display: inline-flex;
		gap: 6px;
		align-items: center;
	}
	.form-grid em {
		font-size: 10px;
		font-style: normal;
		font-weight: var(--mvp-fw-bold);
		letter-spacing: 0.08em;
		color: var(--mvp-orange-600);
		background: var(--mvp-orange-50);
		padding: 2px 6px;
		border-radius: 4px;
	}

	.form-grid input,
	.form-grid textarea {
		font-family: var(--mvp-font-body);
		font-size: 14.5px;
		color: var(--mvp-navy-900);
		background: var(--mvp-gray-50);
		border: 1px solid var(--mvp-gray-200);
		border-radius: var(--mvp-radius-sm, 8px);
		padding: 12px 14px;
		transition:
			border-color 0.15s ease,
			background 0.15s ease;
	}
	.form-grid input:focus,
	.form-grid textarea:focus {
		outline: none;
		border-color: var(--mvp-orange-500);
		background: var(--mvp-white);
		box-shadow: 0 0 0 3px var(--mvp-orange-100);
	}
	.form-grid textarea {
		resize: vertical;
		min-height: 110px;
	}

	.form-submit {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: 10px;
		padding: 14px 28px;
		border-radius: 999px;
		background: var(--mvp-orange-500);
		color: var(--mvp-white);
		font-family: var(--mvp-font-body);
		font-size: 15px;
		font-weight: var(--mvp-fw-bold);
		border: none;
		cursor: pointer;
		box-shadow: 0 8px 22px rgba(255, 107, 26, 0.32);
		transition:
			transform 0.15s ease,
			box-shadow 0.2s ease,
			opacity 0.2s ease;
		align-self: flex-end;
	}
	.form-submit:hover:not(:disabled) {
		transform: translateY(-1px);
		box-shadow: 0 10px 26px rgba(255, 107, 26, 0.4);
	}
	.form-submit:disabled {
		opacity: 0.6;
		cursor: not-allowed;
	}
	.form-submit svg {
		width: 18px;
		height: 18px;
	}

	.form-error {
		margin: 0;
		padding: 12px 14px;
		border-radius: 10px;
		background: rgba(220, 38, 38, 0.08);
		border: 1px solid rgba(220, 38, 38, 0.35);
		color: #b91c1c;
		font-size: 13.5px;
	}

	.form-success {
		display: flex;
		align-items: flex-start;
		gap: 14px;
		padding: 24px;
		border-radius: var(--mvp-radius-lg);
		background: var(--mvp-white);
		border: 1px solid var(--mvp-gray-200);
		box-shadow: var(--mvp-shadow-cta);
	}
	.form-success svg {
		width: 28px;
		height: 28px;
		color: var(--mvp-orange-500);
		flex-shrink: 0;
		margin-top: 2px;
	}
	.form-success div {
		display: flex;
		flex-direction: column;
		gap: 4px;
	}
	.form-success strong {
		font-size: 16px;
		font-weight: var(--mvp-fw-bold);
		color: var(--mvp-navy-900);
	}
	.form-success span {
		font-size: 13.5px;
		color: var(--mvp-gray-600);
	}

	@media (max-width: 640px) {
		.form-grid {
			grid-template-columns: 1fr;
		}
		.form-submit {
			align-self: stretch;
		}
		.cta-form {
			padding: var(--mvp-space-6);
		}
	}
</style>
