<script lang="ts">
	import { enhance } from '$app/forms';
	import { goto, invalidateAll } from '$app/navigation';
	import { Button, buttonVariants } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { Textarea } from '$lib/components/ui/textarea';
	import { LoaderCircle } from 'lucide-svelte';
	import type { ActionData, PageServerData } from './$types';
	import { toast } from 'svelte-sonner';

	let { data, form }: { data: PageServerData; form: ActionData } = $props();

	let { id, title, content, status } = data.note;

	let isLoading = $state(false);

	async function showFeedBack() {
		if (form?.type === 'success') {
			await invalidateAll();
			toast(form?.message);
			goto(`/notes/${id}`);
		}

		if (form?.type === 'error') {
			toast(form?.message);
		}

		isLoading = false;
	}

	$effect(() => {
		showFeedBack();
	});
</script>

<svelte:head>
	<title>Edit Note</title>
</svelte:head>

<section class="max-w-lg my-10">
	<form
		class="space-y-4"
		method="POST"
		use:enhance={() => {
			isLoading = true;
		}}
	>
		<div class="flex items-center justify-between">
			<h1 class="text-3xl font-bold tracking-tight text-gray-900">Edit Note</h1>

			<select
				class="appearance-none form-select border-none border border-neutral-950 rounded-lg *:text-neutral-700 *:font-display"
				name="status"
				id="status"
				value={status}
			>
				<option value="NORMAL">Default</option>
				<option value="FAVORITED">Favorited</option>
				<option value="ARCHIVED">Archived</option>
				<option value="DELETED">Deleted</option>
			</select>
		</div>

		<div class="space-y-2">
			<Label for="title">Note Title</Label>
			<Input
				placeholder="Please type your note's title here"
				name="title"
				id="title"
				value={title}
			/>
		</div>

		<div class="space-y-2">
			<Label for="content">Note Content</Label>
			<Textarea
				placeholder="Please type your note's content here"
				name="content"
				id="content"
				rows={10}
				value={content}
			/>
		</div>

		<div class="flex items-center gap-4">
			<Button class="w-full" type="submit" disabled={isLoading}>
				{#if isLoading}
					<LoaderCircle class="size-5 animate-spin" />
				{:else}
					<span>Save Note</span>
				{/if}
			</Button>

			<a class="w-full {buttonVariants({ variant: 'outline' })}" href="/notes/{id}">Go Back</a>
		</div>
	</form>
</section>
