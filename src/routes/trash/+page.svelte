<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import type { ActionData, PageData } from './$types';
	import NoNotes from '../../components/NoNotes.svelte';
	import NoteCard from '../../components/NoteCard.svelte';
	import { enhance } from '$app/forms';
	import { toast } from 'svelte-sonner';
	import { invalidateAll } from '$app/navigation';
	let { data, form }: { data: PageData; form: ActionData } = $props();

	async function showToast() {
		if (form?.type === 'success') {
			toast(form.message);
			await invalidateAll();
		}
	}

	$effect(() => {
		showToast();
	});
</script>

<svelte:head>
	<title>Trash</title>
</svelte:head>

<section class="my-10">
	<div class="flex items-center justify-between mb-5">
		<h1 class="text-3xl font-bold tracking-tight text-gray-900">Trash</h1>

		{#if data.notes.length > 0}
			<form
				method="POST"
				action="?/clearTrash"
				use:enhance
				class="flex items-center justify-between gap-2"
			>
				<Button variant="destructive" type="submit">Clear Trash</Button>
			</form>
		{/if}
	</div>

	{#if data.notes.length > 0}
		<div class="grid grid-cols-4 gap-4">
			{#each data.notes as note}
				<NoteCard {note} />
			{/each}
		</div>
	{:else}
		<NoNotes title="No notes in the trash!" />
	{/if}
</section>
