<script lang="ts">
	import { Button, buttonVariants } from '$lib/components/ui/button';
	import type { ActionData, PageData } from './$types';
	import NoNotes from '../../components/NoNotes.svelte';
	import NoteCard from '../../components/NoteCard.svelte';
	import { enhance } from '$app/forms';
	import { toast } from 'svelte-sonner';
	import { invalidateAll } from '$app/navigation';
	let { data, form }: { data: PageData; form: ActionData } = $props();
	import * as AlertDialog from '$lib/components/ui/alert-dialog';
	import { LoaderCircle } from 'lucide-svelte';
	import PageTitle from '../../components/PageTitle.svelte';

	let isLoading = $state(false);
	let dialogOpen = $state(false);

	async function showToast() {
		if (form?.type === 'success') {
			toast(form.message);
			await invalidateAll();
			dialogOpen = false;
		}

		isLoading = false;
	}

	$effect(() => {
		showToast();
	});
</script>

<svelte:head>
	<title>Trash</title>
</svelte:head>

<section class="my-4">
	<div class="flex items-center justify-between">
		<PageTitle title="Trash" />

		{#if data.notes.length > 0}
			<AlertDialog.Root bind:open={dialogOpen}>
				<AlertDialog.Trigger class={buttonVariants({ variant: 'destructive' })}>
					Clear Trash
				</AlertDialog.Trigger>
				<AlertDialog.Content>
					<AlertDialog.Header>
						<AlertDialog.Title>Are you absolutely sure?</AlertDialog.Title>
						<AlertDialog.Description>
							This action cannot be undone. This will permanently delete all your notes in the
							trash.
						</AlertDialog.Description>
					</AlertDialog.Header>
					<AlertDialog.Footer>
						<AlertDialog.Cancel>Cancel</AlertDialog.Cancel>

						<form
							method="POST"
							action="?/clearTrash"
							use:enhance={() => {
								isLoading = true;
							}}
							class="flex items-center justify-between gap-2"
						>
							<Button variant="destructive" class="w-[90px]" type="submit" disabled={isLoading}>
								{#if isLoading}
									<LoaderCircle class="size-5 animate-spin" />
								{:else}
									Proceed
								{/if}
							</Button>
						</form>
					</AlertDialog.Footer>
				</AlertDialog.Content>
			</AlertDialog.Root>
		{/if}
	</div>

	{#if data.notes.length > 0}
		<div class="grid grid-cols-4 gap-4">
			{#each data.notes as note}
				<NoteCard {note} />
			{/each}
		</div>
	{:else}
		<NoNotes title="Empty trash" />
	{/if}
</section>
