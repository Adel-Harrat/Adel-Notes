<script lang="ts">
	import PageTitle from '../../components/PageTitle.svelte';
	import type { ActionData, PageServerData } from './$types';
	import AddLabelform from './AddLabelform.svelte';
	import Label from './Label.svelte';

	let { data, form }: { data: PageServerData; form: ActionData } = $props();
</script>

<svelte:head>
	<title>Labels</title>
</svelte:head>

<section class="my-4">
	<div class="flex items-center justify-between">
		<PageTitle title="Manage Labels" />

		<AddLabelform {form} />
	</div>

	<section class="flex items-center gap-2 flex-wrap">
		{#if data?.labels?.length === 0}
			<p>No labels were found</p>
		{:else}
			{#each data?.labels ?? [] as label (label.id)}
				<Label {...label} />
			{/each}
		{/if}
	</section>
</section>
