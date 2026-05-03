<script lang="ts">
	const checks = [
		'平均返信スピード: 当日中',
		'相談からキックオフまで: 中央値5営業日',
		'NDA締結も初回相談時に対応可'
	];
</script>

<section id="cta" class="cta" aria-labelledby="cta-heading">
	<div class="container">
		<div class="banner">
			<div class="visual" aria-hidden="true">
				<div class="badge">
					<svg class="badge-ring" viewBox="0 0 220 220" fill="none">
						<circle cx="110" cy="110" r="104" stroke="rgba(255,255,255,0.35)" stroke-width="1.5" stroke-dasharray="4 6" />
						<circle cx="110" cy="110" r="92" stroke="rgba(255,255,255,0.55)" stroke-width="1.5" />
					</svg>
					<div class="badge-inner">
						<span class="badge-num">30</span>
						<span class="badge-unit">MIN</span>
						<span class="badge-label">FREE</span>
					</div>
					<svg class="badge-spark spark-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
						<path d="M12 2v4M12 18v4M2 12h4M18 12h4M4.9 4.9l2.8 2.8M16.3 16.3l2.8 2.8M4.9 19.1l2.8-2.8M16.3 7.7l2.8-2.8" />
					</svg>
					<svg class="badge-spark spark-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
						<path d="M12 3l2 5 5 2-5 2-2 5-2-5-5-2 5-2z" />
					</svg>
				</div>
			</div>

			<div class="copy">
				<span class="eyebrow">FREE 30-MIN CONSULTATION</span>
				<h2 id="cta-heading">まずは30分の無料相談から。</h2>
				<p class="lede">
					要件が固まっていなくて大丈夫です。「何を作るべきか」から一緒に決めます。<br />
					オンライン・初回無料・営業の押し売りはしません。
				</p>
				<div class="cta-actions">
					<a class="cta-btn primary" href="#cta">
						<span>無料相談を予約する</span>
						<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14" /><path d="M13 5l7 7-7 7" /></svg>
					</a>
					<a class="cta-btn secondary" href="#cta">
						<span>資料をダウンロード</span>
					</a>
				</div>
			</div>

			<ul class="checks">
				{#each checks as item}
					<li>
						<span class="tick" aria-hidden="true">
							<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12l5 5L20 7" /></svg>
						</span>
						<span>{item}</span>
					</li>
				{/each}
			</ul>
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
		background-image:
			radial-gradient(rgba(255, 255, 255, 0.18) 1px, transparent 1px);
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
		0%, 100% {
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
		transition: transform var(--mvp-transition), box-shadow var(--mvp-transition), background var(--mvp-transition), color var(--mvp-transition);
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

	.cta-btn.secondary {
		background: transparent;
		color: var(--mvp-white);
		border: 1.5px solid rgba(255, 255, 255, 0.7);
	}

	.cta-btn.secondary:hover {
		background: rgba(255, 255, 255, 0.12);
		border-color: var(--mvp-white);
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
</style>
