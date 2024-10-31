<script lang="ts">
	import NoteCard from '../components/NoteCard.svelte';
	import NewNoteCard from '../components/NewNoteCard.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import type { PageServerData } from './$types';

	let { data }: { data: PageServerData } = $props();
</script>

<svelte:head>
	<title>Our Notes</title>
</svelte:head>

<section>
	<h1 class="text-3xl font-bold tracking-tight text-gray-900 my-6">Our Notes</h1>
	<div class="grid grid-cols-4 gap-4">
		<NewNoteCard />
		{#each data.notes as note}
			<NoteCard {note} />
		{/each}
	</div>

	<div class="my-5 flex items-center justify-center">
		<Button variant="link">Load More Notes</Button>
	</div>
</section>
