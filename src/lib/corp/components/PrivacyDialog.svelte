<script lang="ts">
	import { contact, site } from '$lib/corp/content';
	import { privacyOpen } from '$lib/corp/motion';

	let dialog: HTMLDialogElement | undefined = $state();

	$effect(() => {
		if ($privacyOpen && dialog && !dialog.open) dialog.showModal();
	});
</script>

<dialog
	bind:this={dialog}
	id="privacy-dialog"
	class="corp-dialog"
	aria-labelledby="privacy-title"
	onclose={() => privacyOpen.set(false)}
>
	<div class="dialog-top">
		<button type="button" class="close" aria-label="説明を閉じる" onclick={() => dialog?.close()}>
			<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18" /></svg>
		</button>
	</div>
	<div class="dialog-body">
		<h2 id="privacy-title">入力情報の取り扱い</h2>
		{#each contact.privacy as text, i (text)}
			<p>
				{text}{#if i === contact.privacy.length - 1}<a href="mailto:{site.email}">{site.email}</a
					>{/if}
			</p>
		{/each}
	</div>
</dialog>

<style>
	p {
		font-size: 15px;
		line-height: 1.9;
	}
	a {
		font-weight: 700;
		color: var(--blue-ink);
		text-decoration: underline;
		text-underline-offset: 3px;
	}
</style>
