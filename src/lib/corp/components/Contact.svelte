<script lang="ts">
	import { SvelteURLSearchParams } from 'svelte/reactivity';
	import { contact, site } from '$lib/corp/content';
	import { contactSubject, parallax, privacyOpen, reveal } from '$lib/corp/motion';
	import SectionHead from './SectionHead.svelte';

	const empty = { company: '', name: '', email: '', subject: '', message: '' };

	let form: HTMLFormElement | undefined = $state();
	let dialog: HTMLDialogElement | undefined = $state();
	let fallbackField: HTMLTextAreaElement | undefined = $state();
	let fields = $state({ ...empty });
	let pairs: [string, string][] = $state([]);
	let sending = $state(false);
	let sendState: '' | 'sending' | 'error' = $state('');
	let sendMessage = $state('');
	let formMessage = $state('');
	let copyMessage = $state('');
	let fallback = $state('');
	let submission: URLSearchParams | null = null;
	let mailSubject = '';
	let mailBody = '';

	$effect(() => {
		if ($contactSubject) fields.subject = $contactSubject;
	});

	function review(event: SubmitEvent) {
		event.preventDefault();
		if (sending || !form) return;
		const nameField = form.elements.namedItem('name') as HTMLInputElement;
		const messageField = form.elements.namedItem('message') as HTMLTextAreaElement;
		for (const field of [nameField, messageField]) {
			field.setCustomValidity(field.value.trim() ? '' : '空白以外の文字を入力してください。');
		}
		if (!form.reportValidity()) return;
		pairs = [
			['会社名', fields.company.trim() || '未入力'],
			['お名前', fields.name.trim()],
			['メールアドレス', fields.email.trim()],
			['ご相談分野', fields.subject],
			['ご相談内容', fields.message.trim()]
		];
		const params = new SvelteURLSearchParams();
		new FormData(form).forEach((value, key) => params.append(key, String(value)));
		submission = params;
		mailBody =
			'株式会社Lanespire ご担当者様\n\n以下の内容について相談を希望します。\n\n' +
			pairs.map(([key, value]) => `${key}\n${value}`).join('\n\n');
		mailSubject = `【開発・導入のご相談】${fields.subject} / ${fields.name.trim()}`;
		copyMessage = '';
		fallback = '';
		sendState = '';
		sendMessage = '';
		formMessage = '';
		dialog?.showModal();
	}

	async function send() {
		if (sending || !submission) return;
		sending = true;
		sendState = 'sending';
		sendMessage = 'お問い合わせを送信しています。';
		const controller = new AbortController();
		const timeout = setTimeout(() => controller.abort(), 15000);
		try {
			const response = await fetch('/', {
				method: 'POST',
				headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
				body: submission.toString(),
				signal: controller.signal
			});
			if (!response.ok) throw new Error(`HTTP ${response.status}`);
			window.dispatchEvent(new CustomEvent('lanespire:lead', { detail: { form: 'contact' } }));
			submission = null;
			fields = { ...empty };
			contactSubject.set('');
			pairs = [];
			fallback = '';
			mailBody = '';
			mailSubject = '';
			sendState = '';
			sendMessage = '';
			formMessage = 'お問い合わせを受け付けました。内容を確認のうえ、ご連絡いたします。';
			dialog?.close();
		} catch (error) {
			sendState = 'error';
			sendMessage =
				error instanceof Error && error.name === 'AbortError'
					? `送信結果を確認できませんでした。重複送信を避けるため、再送前に ${site.email} へお問い合わせください。`
					: `送信できませんでした。入力内容は保持しています。再度お試しいただくか、本文をコピーして ${site.email} へご連絡ください。`;
		} finally {
			clearTimeout(timeout);
			sending = false;
		}
	}

	async function copy() {
		const text = `宛先: ${site.email}\n件名: ${mailSubject}\n\n${mailBody}`;
		try {
			if (!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable');
			await navigator.clipboard.writeText(text);
			copyMessage = '宛先・件名・本文をコピーしました。';
		} catch {
			fallback = text;
			copyMessage = '下の欄を選択しています。コピーしてメールに貼り付けてください。';
			queueMicrotask(() => {
				fallbackField?.focus();
				fallbackField?.select();
			});
		}
	}

	function clearValidity(event: Event) {
		(event.currentTarget as HTMLInputElement | HTMLTextAreaElement).setCustomValidity('');
	}
</script>

<section class="section contact cv" id="contact" aria-labelledby="contact-title">
	<div class="glow" aria-hidden="true"></div>
	<div class="container grid">
		<div class="side">
			<SectionHead
				id="contact-title"
				eyebrow={contact.eyebrow}
				lines={contact.lines}
				lead={contact.lead}
				tone="dark"
			/>
			<a class="mail" href="mailto:{site.email}" data-reveal use:reveal>{site.email}</a>
			<dl data-reveal use:reveal>
				{#each contact.info as row (row.k)}
					<div>
						<dt>{row.k}</dt>
						<dd>
							{row.v}{#if row.sub}<small>{row.sub}</small>{/if}
						</dd>
					</div>
				{/each}
			</dl>
			<p class="small" data-reveal use:reveal>{contact.small}</p>
			<div class="art" use:parallax={36} aria-hidden="true">
				<img
					src="/corporate/sections/04-contact-navy.webp"
					width="1600"
					height="1067"
					alt=""
					loading="lazy"
					decoding="async"
				/>
			</div>
		</div>

		<div class="panel" data-reveal use:reveal>
			<form
				bind:this={form}
				id="contact-form"
				name="contact"
				method="POST"
				action="/"
				data-netlify="true"
				data-netlify-honeypot="bot-field"
				onsubmit={review}
			>
				<input type="hidden" name="form-name" value="contact" />
				<p hidden>
					<label>
						この欄は入力しないでください
						<input name="bot-field" tabindex="-1" autocomplete="off" />
					</label>
				</p>
				<div class="form-title">
					<h3>ご相談内容</h3>
					<span>必須項目をご入力ください</span>
				</div>
				<div class="row">
					<label>
						<span class="label">会社名<em class="optional">任意</em></span>
						<input
							name="company"
							autocomplete="organization"
							maxlength="120"
							placeholder="株式会社〇〇"
							bind:value={fields.company}
						/>
					</label>
					<label>
						<span class="label">お名前<em>必須</em></span>
						<input
							name="name"
							autocomplete="name"
							maxlength="80"
							required
							placeholder="山田 太郎"
							bind:value={fields.name}
							oninput={clearValidity}
						/>
					</label>
				</div>
				<label>
					<span class="label">メールアドレス<em>必須</em></span>
					<input
						name="email"
						type="email"
						autocomplete="email"
						maxlength="180"
						required
						placeholder="name@example.co.jp"
						bind:value={fields.email}
					/>
				</label>
				<label>
					<span class="label">ご相談分野<em>必須</em></span>
					<select name="subject" required bind:value={fields.subject}>
						<option value="">選択してください</option>
						{#each contact.subjects as subject (subject)}
							<option value={subject}>{subject}</option>
						{/each}
					</select>
				</label>
				<label>
					<span class="label">ご相談内容<em>必須</em></span>
					<textarea
						name="message"
						required
						maxlength="1200"
						rows="4"
						placeholder="現在の課題、実現したいこと、ご予算や希望時期などをご記入ください。"
						bind:value={fields.message}
						oninput={clearValidity}></textarea>
					<span class="help">
						<span>機密情報は記載しないでください。</span>
						<span id="message-count">{fields.message.length} / 1200</span>
					</span>
				</label>
				<p class="privacy-note">
					入力内容を確認してから送信します。
					<button type="button" class="inline" onclick={() => privacyOpen.set(true)}>
						入力情報の取り扱い
					</button>
				</p>
				<button class="btn btn-primary submit" type="submit">
					入力内容を確認する
					<svg class="arr" viewBox="0 0 24 24" aria-hidden="true"
						><path d="M4 12h15M13 6l6 6-6 6" /></svg
					>
				</button>
				<p id="form-status" class="status" role="status" aria-live="polite">{formMessage}</p>
			</form>
		</div>
	</div>
</section>

<dialog
	bind:this={dialog}
	id="contact-dialog"
	class="corp-dialog"
	aria-labelledby="contact-dialog-title"
	oncancel={(event) => {
		if (sending) event.preventDefault();
	}}
>
	<div class="dialog-top">
		<span>CONTACT</span>
		<button
			type="button"
			class="close"
			aria-label="確認画面を閉じる"
			disabled={sending}
			onclick={() => dialog?.close()}
		>
			<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18" /></svg>
		</button>
	</div>
	<div class="dialog-body">
		<h2 id="contact-dialog-title">お問い合わせ内容の確認</h2>
		<dl id="contact-summary">
			{#each pairs as [key, value] (key)}
				<div>
					<dt>{key}</dt>
					<dd>{value}</dd>
				</div>
			{/each}
		</dl>
		<div class="dialog-actions">
			<button
				class="btn btn-primary"
				id="send-contact"
				type="button"
				disabled={sending}
				onclick={send}
			>
				{sending ? '送信中…' : 'この内容で送信する'}
				<svg class="arr" viewBox="0 0 24 24" aria-hidden="true"
					><path d="M4 12h15M13 6l6 6-6 6" /></svg
				>
			</button>
			<button type="button" id="copy-contact" class="btn btn-ghost" onclick={copy}>
				本文をコピー
			</button>
		</div>
		<p class="dialog-note">「この内容で送信する」を押すと、お問い合わせ内容が送信されます。</p>
		<p id="send-status" data-state={sendState} role="status" aria-live="polite">{sendMessage}</p>
		<p class="copy-status" role="status" aria-live="polite">{copyMessage}</p>
		{#if fallback}
			<textarea
				bind:this={fallbackField}
				id="copy-fallback"
				readonly
				aria-label="コピー用メール本文"
				value={fallback}></textarea>
		{/if}
	</div>
</dialog>

<style>
	.contact {
		background: var(--navy);
		color: rgba(255, 255, 255, 0.78);
		overflow: hidden;
	}
	.glow {
		position: absolute;
		inset: -30% -10% auto 30%;
		height: 90%;
		background:
			radial-gradient(46% 56% at 62% 40%, rgba(50, 107, 227, 0.55), transparent 70%),
			radial-gradient(40% 44% at 28% 60%, rgba(127, 168, 255, 0.22), transparent 70%);
		filter: blur(20px);
		animation: glow-drift 14s var(--ease-io) infinite alternate;
		pointer-events: none;
	}
	.grid {
		position: relative;
		display: grid;
		grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr);
		gap: clamp(32px, 6vw, 96px);
		align-items: start;
	}
	.mail {
		display: inline-block;
		margin-top: 30px;
		font-size: clamp(20px, 2vw, 28px);
		font-weight: 800;
		color: #fff;
		border-bottom: 2px solid rgba(255, 255, 255, 0.35);
		transition: border-color 0.3s;
	}
	.mail:hover {
		border-color: #fff;
	}
	.side dl {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: 0;
		margin-top: 34px;
		border-top: 1px solid rgba(255, 255, 255, 0.18);
	}
	.side dl div {
		padding: 18px 12px 18px 0;
	}
	.side dt {
		font-size: 12px;
		font-weight: 700;
		letter-spacing: 0.1em;
		color: #8fb3ff;
	}
	.side dd {
		margin-top: 4px;
		font-size: 16px;
		font-weight: 700;
		line-height: 1.6;
		color: #fff;
	}
	.side dd small {
		display: block;
		font-size: 13px;
		font-weight: 500;
		color: rgba(255, 255, 255, 0.7);
	}
	.small {
		margin-top: 8px;
		font-size: 14px;
	}
	.art {
		margin: 12px -6% 0 -14%;
	}
	.art img {
		width: 100%;
		height: auto;
		transform: translate3d(0, var(--py, 0px), 0);
		animation: contact-drift 9s var(--ease-io) infinite alternate;
	}
	.panel {
		padding: clamp(22px, 3vw, 44px);
		border-radius: var(--r-lg);
		background: #fff;
		color: var(--text);
		box-shadow: 0 50px 90px -50px rgba(0, 0, 0, 0.8);
	}
	form {
		display: grid;
		gap: 18px;
	}
	.form-title {
		display: flex;
		align-items: baseline;
		justify-content: space-between;
		gap: 12px;
		padding-bottom: 14px;
		border-bottom: 1px solid var(--line);
	}
	.form-title h3 {
		font-size: 20px;
		font-weight: 800;
		color: var(--ink);
	}
	.form-title span {
		font-size: 13px;
		color: var(--muted);
	}
	.row {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 16px;
	}
	label {
		display: grid;
		gap: 8px;
	}
	.label {
		display: flex;
		align-items: center;
		gap: 8px;
		font-size: 14px;
		font-weight: 700;
		color: var(--ink);
	}
	.label em {
		padding: 1px 8px;
		border-radius: 5px;
		background: var(--blue-soft);
		font-size: 11px;
		font-style: normal;
		font-weight: 700;
		color: var(--blue-ink);
	}
	.label em.optional {
		background: var(--pale);
		color: var(--muted);
	}
	input,
	select,
	textarea {
		width: 100%;
		min-height: 52px;
		padding: 12px 14px;
		border: 1px solid var(--line);
		border-radius: 12px;
		background: #fff;
		font: inherit;
		font-size: 16px;
		line-height: 1.6;
		color: var(--ink);
		transition:
			border-color 0.3s,
			box-shadow 0.3s;
	}
	textarea {
		resize: vertical;
		min-height: 132px;
	}
	input::placeholder,
	textarea::placeholder {
		color: #9aa7b8;
	}
	input:focus,
	select:focus,
	textarea:focus {
		outline: none;
		border-color: var(--blue);
		box-shadow: 0 0 0 4px rgba(50, 107, 227, 0.16);
	}
	.help {
		display: flex;
		justify-content: space-between;
		gap: 12px;
		font-size: 13px;
		color: var(--muted);
	}
	.privacy-note {
		font-size: 14px;
	}
	.inline {
		padding: 0;
		border: 0;
		background: none;
		font-weight: 700;
		color: var(--blue-ink);
		text-decoration: underline;
		text-underline-offset: 3px;
		cursor: pointer;
	}
	.submit {
		justify-self: start;
	}
	.status {
		min-height: 1.9em;
		font-weight: 700;
		color: var(--blue-ink);
	}

	#contact-summary {
		border-top: 1px solid var(--line);
	}
	#contact-summary div {
		display: grid;
		grid-template-columns: 8em minmax(0, 1fr);
		gap: 12px;
		padding: 12px 0;
		border-bottom: 1px solid var(--line);
		font-size: 15px;
	}
	#contact-summary dt {
		font-weight: 700;
		color: var(--muted);
	}
	#contact-summary dd {
		color: var(--ink);
		white-space: pre-wrap;
		overflow-wrap: anywhere;
	}
	.dialog-actions {
		display: flex;
		flex-wrap: wrap;
		gap: 12px;
	}
	.dialog-note,
	.copy-status {
		font-size: 14px;
	}
	#send-status {
		font-size: 14px;
		font-weight: 700;
		color: var(--blue-ink);
	}
	#send-status[data-state='error'] {
		color: #b42318;
	}
	#copy-fallback {
		min-height: 160px;
		font-size: 14px;
	}
	button:disabled {
		opacity: 0.6;
		cursor: default;
	}
	@keyframes contact-drift {
		to {
			scale: 1.04;
			rotate: -1.2deg;
		}
	}
	@keyframes glow-drift {
		to {
			transform: translate3d(-8%, 10%, 0) scale(1.1);
		}
	}
	@media (max-width: 900px) {
		.grid {
			grid-template-columns: 1fr;
		}
		.art {
			display: none;
		}
	}
	@media (max-width: 560px) {
		.row,
		.side dl {
			grid-template-columns: 1fr;
		}
		.side dl div {
			display: flex;
			justify-content: space-between;
			align-items: baseline;
			gap: 12px;
			padding: 12px 0;
			border-bottom: 1px solid rgba(255, 255, 255, 0.14);
		}
		.side dd {
			margin: 0;
			text-align: right;
		}
		.submit {
			justify-self: stretch;
		}
		#contact-summary div {
			grid-template-columns: 1fr;
			gap: 2px;
		}
	}
</style>
