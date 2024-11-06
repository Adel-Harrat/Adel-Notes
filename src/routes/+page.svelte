<script lang="ts">
	import NoteCard from '../components/NoteCard.svelte';
	import NewNoteCard from '../components/NewNoteCard.svelte';
	import type { ActionData, PageServerData } from './$types';
	import { fade } from 'svelte/transition';

	let { data, form }: { data: PageServerData; form: ActionData } = $props();
</script>

<svelte:head>
	<title>Adel Notes</title>
</svelte:head>

<section class="my-10">
	<h1 class="text-3xl font-bold tracking-tight text-gray-900 my-6">Your Notes</h1>

	<div class="grid grid-cols-4 gap-4">
		<NewNoteCard {form} />
		{#each data.notes as note, _ (note.id)}
			<div transition:fade>
				<NoteCard {note} />
			</div>
		{/each}
	</div>
</section>

<!-- TODO:-->
<!-- 1. Add default Image when user has none -->
<!-- 3. Add custom error 500 and 404 pages  -->
<!-- 4. Disbale new note button after clicking once -->
<!-- 5. Redirect user to note details page -->
