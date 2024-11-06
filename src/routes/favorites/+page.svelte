<script lang="ts">
	import type { PageData } from '../$types';
	import NoNotes from '../../components/NoNotes.svelte';
	import NoteCard from '../../components/NoteCard.svelte';
	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>Favorites</title>
</svelte:head>

<section class="my-10">
	<h1 class="text-3xl font-bold tracking-tight text-gray-900 mb-5">Your Favorites</h1>

	{#if data.notes.length > 0}
		<div class="grid grid-cols-4 gap-4">
			{#each data.notes as note}
				<NoteCard {note} />
			{/each}
		</div>
	{:else}
		<NoNotes title="No favorited notes!" />
	{/if}
</section>
