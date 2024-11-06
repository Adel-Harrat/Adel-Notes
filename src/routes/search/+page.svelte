<script lang="ts">
	import NoteCard from '../../components/NoteCard.svelte';
	import type { PageServerData } from './$types';

	let { data }: { data: PageServerData } = $props();
</script>

<section class="my-10">
	<h1 class="text-3xl font-bold tracking-tight text-gray-900 mb-5">
		Search results for "{data.searchQuery}"
	</h1>

	<div class="grid grid-cols-4 gap-4">
		{#if data.searchResults?.length === 0}
			<p>No results were found</p>
		{/if}

		{#if data.searchResults}
			{#each data.searchResults as note}
				<NoteCard {note} />
			{/each}
		{/if}
	</div>
</section>
