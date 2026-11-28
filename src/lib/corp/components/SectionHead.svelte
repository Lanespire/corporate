<script lang="ts">
	import { reveal } from '$lib/corp/motion';

	type Props = {
		id: string;
		eyebrow: string;
		lines: string[];
		lead?: string[];
		tone?: 'light' | 'dark';
		level?: 'h2' | 'h1';
	};
	let { id, eyebrow, lines, lead = [], tone = 'light', level = 'h2' }: Props = $props();
</script>

<div class="head" class:dark={tone === 'dark'} data-lines use:reveal>
	<p class="eyebrow">{eyebrow}</p>
	<svelte:element this={level} class="display h2" {id}>
		{#each lines as line, i (line)}
			<span class="ln"><span class="ln-i" style="--i:{i}">{line}</span></span>
		{/each}
	</svelte:element>
	<span class="lane-rule" aria-hidden="true"></span>
	{#if lead.length}
		<p class="lead">
			{#each lead as part (part)}<span>{part}</span>{/each}
		</p>
	{/if}
</div>

<style>
	.head {
		max-width: 760px;
	}
	.display {
		margin-top: 18px;
	}
	.lane-rule {
		margin-top: 26px;
	}
	.lead {
		margin-top: 26px;
	}
	.lead span {
		display: block;
	}
	.dark .display {
		color: #fff;
	}
	.dark .lead {
		color: rgba(255, 255, 255, 0.78);
	}
	.dark .eyebrow {
		color: #8fb3ff;
	}
	:global(.js) .head .lane-rule {
		transform: scaleX(0);
		transition: transform 1.1s var(--ease-out) 0.35s;
	}
	:global(.js) .head .lead {
		opacity: 0;
		transform: translate3d(0, 18px, 0);
		transition:
			opacity 0.9s var(--ease-out) 0.3s,
			transform 1s var(--ease-out) 0.3s;
	}
	:global(.js) .head:global(.is-in) .lane-rule,
	:global(.js) .head:global(.is-in) .lead {
		opacity: 1;
		transform: none;
	}
	:global(.reveal-all) .head .lane-rule,
	:global(.reveal-all) .head .lead {
		opacity: 1;
		transform: none;
	}
	@media (max-width: 760px) {
		.lead span {
			display: inline;
		}
	}
	@media (prefers-reduced-motion: reduce) {
		:global(.js) .head .lane-rule,
		:global(.js) .head .lead {
			opacity: 1;
			transform: none;
			transition: none;
		}
	}
</style>
