<script lang="ts">
	import { faq } from '$lib/corp/content';
	import { reveal } from '$lib/corp/motion';
	import SectionHead from './SectionHead.svelte';
</script>

<section class="section faq cv" id="faq" aria-labelledby="faq-title">
	<div class="container grid">
		<SectionHead id="faq-title" eyebrow={faq.eyebrow} lines={faq.lines} />
		<div class="list">
			{#each faq.items as item, i (item.q)}
				<details data-reveal use:reveal style="--d:{i * 80}ms">
					<summary>
						<span class="q" aria-hidden="true">Q</span>
						<span class="question">{item.q}</span>
						<span class="mark" aria-hidden="true"></span>
					</summary>
					<p>{item.a}</p>
				</details>
			{/each}
		</div>
	</div>
</section>

<style>
	.grid {
		display: grid;
		grid-template-columns: minmax(0, 0.8fr) minmax(0, 1.2fr);
		gap: clamp(32px, 6vw, 96px);
		align-items: start;
	}
	.list {
		border-top: 2px solid var(--ink);
	}
	details {
		border-bottom: 1px solid var(--line);
	}
	details::details-content {
		height: 0;
		overflow: clip;
		transition:
			height 0.55s var(--ease-out),
			content-visibility 0.55s allow-discrete;
	}
	details[open]::details-content {
		height: auto;
	}
	summary {
		display: grid;
		grid-template-columns: auto minmax(0, 1fr) auto;
		align-items: center;
		gap: 18px;
		padding: 24px 4px;
		cursor: pointer;
		list-style: none;
		font-size: clamp(16px, 1.4vw, 19px);
		font-weight: 700;
		line-height: 1.6;
		color: var(--ink);
		transition: color 0.3s;
	}
	summary::-webkit-details-marker {
		display: none;
	}
	summary:hover {
		color: var(--blue-ink);
	}
	.q {
		font-family: var(--font-display);
		font-size: 20px;
		font-weight: 800;
		color: var(--blue);
	}
	.mark {
		position: relative;
		width: 36px;
		height: 36px;
		border: 1px solid var(--line);
		border-radius: 50%;
		transition:
			background-color 0.4s,
			border-color 0.4s,
			transform 0.6s var(--ease-out);
	}
	.mark::before,
	.mark::after {
		content: '';
		position: absolute;
		left: 11px;
		right: 11px;
		top: 50%;
		height: 2px;
		margin-top: -1px;
		border-radius: 2px;
		background: var(--ink);
		transition:
			transform 0.6s var(--ease-out),
			background-color 0.4s;
	}
	.mark::after {
		transform: rotate(90deg);
	}
	details[open] .mark {
		background: var(--ink);
		border-color: var(--ink);
		transform: rotate(180deg);
	}
	details[open] .mark::before,
	details[open] .mark::after {
		background: #fff;
	}
	details[open] .mark::after {
		transform: none;
	}
	details p {
		padding: 0 60px 26px 42px;
	}
	@media (max-width: 900px) {
		.grid {
			grid-template-columns: 1fr;
		}
	}
	@media (max-width: 560px) {
		details p {
			padding: 0 4px 22px;
		}
		summary {
			gap: 12px;
		}
	}
</style>
