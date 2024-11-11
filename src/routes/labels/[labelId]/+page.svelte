<script lang="ts">
	import { CalendarClock } from 'lucide-svelte';
	import Time from 'svelte-time/Time.svelte';
	import type { PageServerData } from './$types';
	import NoteCard from '../../../components/NoteCard.svelte';
	import PageTitle from '../../../components/PageTitle.svelte';
	import NoNotes from '../../../components/NoNotes.svelte';

	let { data }: { data: PageServerData } = $props();
</script>

<svelte:head>
	<title>{data.label.name}</title>
</svelte:head>

<section>
	<PageTitle>
		{#snippet title()}
			Notes with {data.label.name} label
		{/snippet}

		{#snippet subTitle()}
			<CalendarClock class="size-5" />
			<Time timestamp={data.label.createdAt} format="MMMM D, YYYY &mdash; h:mm A" />
		{/snippet}
	</PageTitle>

	{#if data.notes.length !== 0}
		<div class="grid grid-cols-4 gap-4 mt-5">
			{#each data.notes as note (note.id)}
				<NoteCard {note} />
			{/each}
		</div>
	{:else}
		<NoNotes title="0 notes here" />
	{/if}
</section>
