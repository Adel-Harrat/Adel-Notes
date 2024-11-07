<script lang="ts">
	import NoNotes from '../../components/NoNotes.svelte';
	import NoteCard from '../../components/NoteCard.svelte';
	import PageTitle from '../../components/PageTitle.svelte';
	import type { PageServerData } from './$types';

	let { data }: { data: PageServerData } = $props();
</script>

<section class="my-10">
	<PageTitle>
		Search results for "{data.searchQuery}"
	</PageTitle>

	{#if data.searchResults?.length === 0}
		<NoNotes title="No results were found" />
	{/if}

	{#if data.searchResults}
		<div class="grid grid-cols-4 gap-4">
			{#each data.searchResults as note}
				<NoteCard {note} />
			{/each}
		</div>
	{/if}
</section>
