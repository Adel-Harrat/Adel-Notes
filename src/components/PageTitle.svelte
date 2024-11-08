<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		title: Snippet;
		subTitle?: Snippet;
	}

	let { title, subTitle }: Props = $props();
</script>

<div class="mb-5 flex flex-col gap-3">
	<h1 class="text-xl md:text-3xl font-extrabold text-foreground">
		{@render title()}
	</h1>

	{#if subTitle}
		<p class="flex items-center gap-2 text-sm text-muted-foreground">
			{@render subTitle?.()}
		</p>
	{/if}
</div>
