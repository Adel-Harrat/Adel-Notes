<script lang="ts">
	import type { PageData } from '../$types';
	import NoNotes from '../../components/NoNotes.svelte';
	import NoteCard from '../../components/NoteCard.svelte';
	import PageTitle from '../../components/PageTitle.svelte';
	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>Archive</title>
</svelte:head>

<section>
	<PageTitle>
		{#snippet title()}
			Your Archive
		{/snippet}
	</PageTitle>

	{#if data.notes.length > 0}
		<div class="grid grid-cols-4 gap-4 mt-5">
			{#each data.notes as note}
				<NoteCard {note} />
			{/each}
		</div>
	{:else}
		<NoNotes title="Empty archive" />
	{/if}
</section>
