<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		title: Snippet;
		subTitle?: Snippet;
	}

	let { title, subTitle }: Props = $props();
</script>

<h1 class="text-xl md:text-3xl font-extrabold text-foreground">
	{@render title()}
</h1>
