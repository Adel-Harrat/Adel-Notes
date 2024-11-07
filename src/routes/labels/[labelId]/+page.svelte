<script lang="ts">
	import { CalendarClock } from 'lucide-svelte';
	import Time from 'svelte-time/Time.svelte';
	import type { PageServerData } from './$types';
	import NoteCard from '../../../components/NoteCard.svelte';
	import NoNotes from '../../../components/NoNotes.svelte';

	let { data }: { data: PageServerData } = $props();
</script>

<svelte:head>
	<title>{data.label.name}</title>
</svelte:head>

<section class="my-10">
	<h1 class="text-3xl font-bold tracking-tight text-gray-900 mb-2">
		{data.notes.length === 0
			? 0
			: data.notes.length >= 10
				? data.notes.length
				: `0${data.notes.length}`}
		{data.notes.length === 1 ? 'note' : 'notes'} that has "{data.label.name}" label
	</h1>

	<p class="flex items-center gap-2 text-sm text-gray-500">
		<CalendarClock class="size-5" />
		<Time timestamp={data.label.createdAt} format="MMMM D, YYYY &mdash; h:mm A" />
	</p>

	{#if data.notes.length !== 0}
		<div class="grid grid-cols-4 gap-4 mt-8">
			{#each data.notes as note (note.id)}
				<NoteCard {note} />
			{/each}
		</div>
	{/if}
</section>
