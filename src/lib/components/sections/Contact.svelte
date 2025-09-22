<script lang="ts">
	import { onMount } from 'svelte';
	import { createScrollAnimation } from '$utils/animations';

	// Form state
	let formData = {
		name: '',
		email: '',
		company: '',
		message: ''
	};
	
	let isSubmitting = false;
	let submitStatus: 'idle' | 'success' | 'error' = 'idle';
	let statusMessage = '';

	// Component state
	let mounted = false;
	let sectionElement: HTMLElement;
	let formElement: HTMLFormElement;

	// Form validation
	function validateForm() {
		if (!formData.name.trim()) {
			statusMessage = 'お名前を入力してください。';
			return false;
		}
		if (!formData.email.trim()) {
			statusMessage = 'メールアドレスを入力してください。';
			return false;
		}
		if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
			statusMessage = '有効なメールアドレスを入力してください。';
			return false;
		}
		if (!formData.message.trim()) {
			statusMessage = 'メッセージを入力してください。';
			return false;
		}
		return true;
	}

	// Form submission for Netlify Forms
	async function handleSubmit(event: Event) {
		event.preventDefault();
		
		if (!validateForm()) {
			submitStatus = 'error';
			return;
		}

		isSubmitting = true;
		submitStatus = 'idle';

		try {
			// Netlify Forms submission
			const formBody = new FormData(formElement);
			
			const response = await fetch('/', {
				method: 'POST',
				headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
				body: new URLSearchParams(formBody as any).toString()
			});

			if (response.ok) {
				submitStatus = 'success';
				statusMessage = 'お問い合わせありがとうございます。24時間以内にご返信いたします。';
				
			// Reset form
			formData = {
				name: '',
				email: '',
				company: '',
				message: ''
			};
			} else {
				throw new Error('送信に失敗しました');
			}
		} catch (error) {
			submitStatus = 'error';
			statusMessage = '送信に失敗しました。しばらく時間をおいて再度お試しください。';
		} finally {
			isSubmitting = false;
		}
	}

	onMount(() => {
		mounted = true;

		// Initialize scroll animations
		if (sectionElement) {
			createScrollAnimation(sectionElement.querySelector('.section-header') as HTMLElement, {
				duration: 0.8,
				easing: 'power3.out'
			});

			createScrollAnimation(sectionElement.querySelector('.contact-content') as HTMLElement, {
				duration: 0.8,
				easing: 'power3.out',
				delay: 0.2
			});
		}
	});
</script>

<section id="contact" class="contact section" bind:this={sectionElement}>
	<div class="container">
		<div class="section-header">
			<h2 class="section-title">お問い合わせ</h2>
			<p class="section-subtitle">Contact</p>
		</div>

		<div class="contact-content">
			<div class="contact-info">
				<div class="company-info">
					<h3 class="company-name">株式会社Lanespire</h3>
					<div class="company-details">
						<div class="detail-item">
							<span class="material-icons">business</span>
							<div>
								<strong>資本金</strong><br>
								10万円
							</div>
						</div>
						<div class="detail-item">
							<span class="material-icons">location_on</span>
							<div>
								<strong>所在地</strong><br>
								〒104-0061<br>
								東京都中央区銀座１丁目１２番４号<br>
								Ｎ＆ＥＢＬＤ．６Ｆ
							</div>
						</div>
						<div class="detail-item">
							<span class="material-icons">work</span>
							<div>
								<strong>事業内容</strong><br>
								Web制作、ITコンサルタント・AI導入支援、<br>
								n8nによる業務効率支援、業務委託、<br>
								NoCode・LowCodeによるサービス開発、<br>
								モバイルアプリケーション開発、受託開発
							</div>
						</div>
					</div>
				</div>

				<div class="map-container">
					<iframe
						src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3241.0977!2d139.7677!3d35.6735!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x60188be701836fbb%3A0x3b7f8f5b5b5b5b5b!2z5p2x5Lqs6YO95Lit5aSu5Yy66ZO25bqn77yR5LiB55uu77yR77yS55Wq77yU5Y-3!5e0!3m2!1sja!2sjp!4v1234567890123"
						width="100%"
						height="300"
						style="border:0; border-radius: 12px; filter: invert(90%) hue-rotate(180deg);"
						allowfullscreen
						loading="lazy"
						referrerpolicy="no-referrer-when-downgrade"
						title="株式会社Lanespire所在地"
					></iframe>
				</div>
			</div>

			<div class="contact-form-container">
				<form 
					class="contact-form" 
					bind:this={formElement} 
					name="contact" 
					method="POST" 
					data-netlify="true"
					data-netlify-honeypot="bot-field"
					on:submit={handleSubmit}
				>
					<!-- Netlify form detection -->
					<input type="hidden" name="form-name" value="contact" />
					
					<!-- Honeypot field for spam protection -->
					<div style="display: none;">
						<label>Don't fill this out if you're human: <input name="bot-field" /></label>
					</div>
					<div class="form-group">
						<label for="name" class="form-label">お名前 <span class="required">*</span></label>
						<input
							type="text"
							id="name"
							name="name"
							class="form-input"
							bind:value={formData.name}
							required
						/>
					</div>

					<div class="form-group">
						<label for="email" class="form-label">メールアドレス <span class="required">*</span></label>
						<input
							type="email"
							id="email"
							name="email"
							class="form-input"
							bind:value={formData.email}
							required
						/>
					</div>

					<div class="form-group">
						<label for="company" class="form-label">会社名</label>
						<input
							type="text"
							id="company"
							name="company"
							class="form-input"
							bind:value={formData.company}
						/>
					</div>

					<div class="form-group">
						<label for="message" class="form-label">メッセージ <span class="required">*</span></label>
						<textarea
							id="message"
							name="message"
							class="form-textarea"
							rows="6"
							bind:value={formData.message}
							required
						></textarea>
					</div>

					{#if submitStatus !== 'idle'}
						<div class="status-message" class:success={submitStatus === 'success'} class:error={submitStatus === 'error'}>
							{statusMessage}
						</div>
					{/if}

					<button type="submit" class="submit-btn" disabled={isSubmitting}>
						{#if isSubmitting}
							<span class="material-icons spinning">refresh</span>
							送信中...
						{:else}
							<span class="material-icons">send</span>
							送信する
						{/if}
					</button>
				</form>
			</div>
		</div>
	</div>
</section>

<style>
	.contact {
		background: var(--color-background);
		position: relative;
		overflow: hidden;
	}

	.contact::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: 
			radial-gradient(circle at 20% 80%, rgba(0, 255, 255, 0.05) 0%, transparent 50%),
			radial-gradient(circle at 80% 20%, rgba(255, 0, 255, 0.05) 0%, transparent 50%);
		pointer-events: none;
	}

	.section-header {
		text-align: center;
		margin-bottom: var(--spacing-3xl);
	}

	.section-title {
		font-size: var(--font-size-4xl);
		font-weight: var(--font-weight-bold);
		margin-bottom: var(--spacing-sm);
		background: var(--gradient-primary);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}

	.section-subtitle {
		font-size: var(--font-size-lg);
		color: var(--color-text-muted);
		text-transform: uppercase;
		letter-spacing: 0.2em;
		margin: 0;
	}

	.contact-content {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: var(--spacing-3xl);
		max-width: 1200px;
		margin: 0 auto;
	}

	.contact-info {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-xl);
	}

	.company-info {
		background: var(--gradient-surface);
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: var(--radius-xl);
		padding: var(--spacing-xl);
		backdrop-filter: blur(10px);
	}

	.company-name {
		font-size: var(--font-size-2xl);
		font-weight: var(--font-weight-bold);
		margin-bottom: var(--spacing-lg);
		color: var(--color-text-primary);
		text-align: center;
	}

	.company-details {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-lg);
	}

	.detail-item {
		display: flex;
		align-items: flex-start;
		gap: var(--spacing-md);
	}

	.detail-item .material-icons {
		color: var(--color-primary);
		margin-top: 2px;
	}

	.detail-item div {
		color: var(--color-text-secondary);
		line-height: var(--line-height-relaxed);
	}

	.detail-item strong {
		color: var(--color-text-primary);
		display: block;
		margin-bottom: var(--spacing-xs);
	}

	.map-container {
		border-radius: var(--radius-xl);
		overflow: hidden;
		box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
	}

	.contact-form-container {
		background: var(--gradient-surface);
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: var(--radius-xl);
		padding: var(--spacing-xl);
		backdrop-filter: blur(10px);
	}

	.contact-form {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-lg);
	}

	.form-group {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-xs);
	}

	.form-label {
		font-weight: var(--font-weight-medium);
		color: var(--color-text-primary);
	}

	.required {
		color: var(--color-accent);
	}

	.form-input,
	.form-textarea {
		background: rgba(255, 255, 255, 0.05);
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: var(--radius-md);
		padding: var(--spacing-md);
		color: var(--color-text-primary);
		font-family: inherit;
		transition: all var(--transition-fast);
	}

	.form-input:focus,
	.form-textarea:focus {
		outline: none;
		border-color: var(--color-primary);
		box-shadow: 0 0 0 2px rgba(0, 255, 255, 0.2);
	}

	.form-textarea {
		resize: vertical;
		min-height: 120px;
	}

	.status-message {
		padding: var(--spacing-md);
		border-radius: var(--radius-md);
		text-align: center;
		font-weight: var(--font-weight-medium);
	}

	.status-message.success {
		background: rgba(0, 255, 0, 0.1);
		color: #00ff00;
		border: 1px solid rgba(0, 255, 0, 0.3);
	}

	.status-message.error {
		background: rgba(255, 0, 0, 0.1);
		color: #ff6b6b;
		border: 1px solid rgba(255, 0, 0, 0.3);
	}

	.submit-btn {
		background: var(--gradient-primary);
		border: none;
		border-radius: var(--radius-md);
		padding: var(--spacing-md) var(--spacing-lg);
		color: var(--color-background);
		font-weight: var(--font-weight-bold);
		font-size: var(--font-size-lg);
		cursor: pointer;
		transition: all var(--transition-fast);
		display: flex;
		align-items: center;
		justify-content: center;
		gap: var(--spacing-sm);
	}

	.submit-btn:hover:not(:disabled) {
		transform: translateY(-2px);
		box-shadow: 0 10px 20px rgba(0, 255, 255, 0.3);
	}

	.submit-btn:disabled {
		opacity: 0.6;
		cursor: not-allowed;
	}

	.spinning {
		animation: spin 1s linear infinite;
	}

	@keyframes spin {
		from { transform: rotate(0deg); }
		to { transform: rotate(360deg); }
	}

	/* Responsive Design */
	@media (max-width: 768px) {
		.contact-content {
			grid-template-columns: 1fr;
			gap: var(--spacing-xl);
		}

		.company-info,
		.contact-form-container {
			padding: var(--spacing-lg);
		}

		.section-title {
			font-size: var(--font-size-3xl);
		}
	}

	@media (max-width: 480px) {
		.company-info,
		.contact-form-container {
			padding: var(--spacing-md);
		}

		.detail-item {
			flex-direction: column;
			gap: var(--spacing-xs);
		}
	}
</style>

