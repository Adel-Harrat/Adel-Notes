<script lang="ts">
	import NoteCard from '../components/NoteCard.svelte';
	import NewNoteCard from '../components/NewNoteCard.svelte';
	import type { ActionData, PageServerData } from './$types';
	import { fade } from 'svelte/transition';
	import PageTitle from '../components/PageTitle.svelte';

	let { data, form }: { data: PageServerData; form: ActionData } = $props();
</script>

<svelte:head>
	<title>Adel Notes</title>
</svelte:head>

<section>
	<PageTitle>
		{#snippet title()}
			Your Notes
		{/snippet}
	</PageTitle>

	<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-5">
		<NewNoteCard {form} />

		{#each data.notes as note, _ (note.id)}
			<div transition:fade>
				<NoteCard {note} />
			</div>
		{/each}
	</div>
</section>

<!-- TODO:-->
<!-- 3. Add custom error 500 and 404 pages  -->
