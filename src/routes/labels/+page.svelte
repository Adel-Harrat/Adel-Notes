<script lang="ts">
	import type { ActionData, PageServerData } from './$types';
	import AddLabelform from './AddLabelform.svelte';
	import Label from './Label.svelte';

	let { data, form }: { data: PageServerData; form: ActionData } = $props();
</script>

<svelte:head>
	<title>Labels</title>
</svelte:head>

<section class="my-10">
	<div class="flex items-center justify-between">
		<h1 class="text-3xl font-bold tracking-tight text-gray-900">Labels</h1>

		<AddLabelform {form} />
	</div>

	<section class="flex items-center gap-2 flex-wrap mt-4">
		{#if data?.labels?.length === 0}
			<p>No labels were found</p>
		{:else}
			{#each data?.labels ?? [] as label}
				<Label {...label} />
			{/each}
		{/if}
	</section>
</section>
