<script lang="ts">
	import { company, site } from '$lib/corp/content';
	import { reveal } from '$lib/corp/motion';
	import SectionHead from './SectionHead.svelte';
</script>

<section class="section company cv" id="company" aria-labelledby="company-title">
	<div class="container grid">
		<SectionHead
			id="company-title"
			eyebrow={company.eyebrow}
			lines={company.lines}
			lead={company.lead}
		/>
		<dl>
			{#each company.rows as row, i (row.k)}
				<div data-reveal use:reveal style="--d:{i * 80}ms">
					<dt>{row.k}</dt>
					<dd>
						{#each row.v as line (line)}<span>{line}</span>{/each}
					</dd>
				</div>
			{/each}
			<div data-reveal use:reveal style="--d:{company.rows.length * 80}ms">
				<dt>お問い合わせ</dt>
				<dd><a href="mailto:{site.email}">{site.email}</a></dd>
			</div>
		</dl>
	</div>
</section>

<style>
	.company {
		background: var(--pale);
	}
	.grid {
		display: grid;
		grid-template-columns: minmax(0, 0.8fr) minmax(0, 1.2fr);
		gap: clamp(32px, 6vw, 96px);
		align-items: start;
	}
	dl {
		border-top: 2px solid var(--ink);
	}
	dl div {
		display: grid;
		grid-template-columns: 9em minmax(0, 1fr);
		gap: 16px;
		padding: 22px 4px;
		border-bottom: 1px solid var(--line);
	}
	dt {
		font-size: 14px;
		font-weight: 700;
		color: var(--muted);
	}
	dd {
		font-weight: 600;
		color: var(--ink);
	}
	dd span {
		display: block;
	}
	dd a {
		border-bottom: 1px solid currentColor;
	}
	@media (max-width: 900px) {
		.grid {
			grid-template-columns: 1fr;
		}
	}
	@media (max-width: 560px) {
		dl div {
			grid-template-columns: 1fr;
			gap: 4px;
			padding: 18px 2px;
		}
	}
</style>
