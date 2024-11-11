<script lang="ts">
	import NoNotes from '../../components/NoNotes.svelte';
	import PageTitle from '../../components/PageTitle.svelte';
	import PageTitleWithButtons from '../../components/PageTitleWithButtons.svelte';
	import type { ActionData, PageServerData } from './$types';
	import AddLabelform from './AddLabelform.svelte';
	import Label from './Label.svelte';

	let { data, form }: { data: PageServerData; form: ActionData } = $props();
</script>

<svelte:head>
	<title>Labels</title>
</svelte:head>

<section>
	<PageTitleWithButtons withBorder={data?.labels?.length === 0 ? false : true}>
		<PageTitle>
			{#snippet title()}
				Manage Labels
			{/snippet}
		</PageTitle>

		<AddLabelform {form} />
	</PageTitleWithButtons>

	{#if data?.labels?.length === 0}
		<NoNotes title="No labels were found" />
	{:else}
		<div class="flex items-center gap-2 flex-wrap mt-5">
			{#each data?.labels ?? [] as label (label.id)}
				<Label {...label} />
			{/each}
		</div>
	{/if}
</section>
