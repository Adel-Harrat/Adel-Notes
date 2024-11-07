<script lang="ts">
	import { enhance } from '$app/forms';
	import { Button, buttonVariants } from '$lib/components/ui/button';
	import Time from 'svelte-time';
	import {
		Archive,
		ArchiveX,
		Lightbulb,
		Star,
		CalendarClock,
		CalendarCog,
		LoaderCircle
	} from 'lucide-svelte';
	import { invalidateAll } from '$app/navigation';
	import { toast } from 'svelte-sonner';
	import type { ActionData } from '../../$types';
	import { Badge } from '$lib/components/ui/badge';
	import type { PageServerData } from './$types';

	let { data, form }: { data: PageServerData; form: ActionData } = $props();

	const showLastUpdated = $derived(
		data.note.createdAt.toString() !== data.note.updatedAt.toString()
	);

	let isLoading = $state({
		normal: false,
		favorite: false,
		archive: false,
		delete: false
	});

	async function showFeedBack() {
		if (form?.type === 'success') {
			toast(form?.message);
			await invalidateAll();
		} else if (form?.type === 'error') {
			toast(form?.message);
		}

		isLoading = {
			normal: false,
			favorite: false,
			archive: false,
			delete: false
		};
	}

	$effect(() => {
		showFeedBack();
	});
</script>

<svelte:head>
	<title>Note Details</title>
</svelte:head>

<section class="max-w-xl pt-8 flex flex-col">
	<div class="flex items-center justify-between">
		<h1 class="text-3xl font-bold tracking-tight flex-1 text-gray-900">{data.note.title}</h1>

		{#if data.note.status === 'DELETED'}
			<span class="bg-red-200 text-red-900 px-4 py-1.5 rounded-full font-normal text-sm">
				{#if isLoading?.delete}
					<span>Loading</span>
				{:else}
					<span>Deleted</span>
				{/if}
			</span>
		{:else if data.note.status === 'ARCHIVED'}
			<span class="bg-gray-200 text-gray-900 px-4 py-1.5 rounded-full font-normal text-sm"
				>Archived</span
			>
		{:else if data.note.status === 'FAVORITED'}
			<span class="bg-yellow-200 text-yellow-900 px-4 py-1.5 rounded-full font-normal text-sm">
				Favorited
			</span>
		{/if}
	</div>

	<div class="flex items-center justify-between gap-2 *:text-sm *:text-gray-500 mt-4">
		<span class="flex items-center justify-between gap-2">
			<CalendarClock class="size-5" />
			<Time timestamp={data.note.createdAt} format="MMMM D, YYYY &mdash; h:mm A" /></span
		>
		{#if showLastUpdated}
			<span class="flex items-center justify-between gap-2">
				Updated <Time
					relative
					timestamp={data.note.updatedAt}
					format="MMMM D, YYYY &mdash; h:mm A"
				/>
				<CalendarCog class="size-5" />
			</span>
		{/if}
	</div>

	<div class="bg-gray-50 min-h-52 rounded-lg p-5 mt-4 text-base">
		{#if data.note?.content?.length}
			{data.note.content}
		{:else}
			<div class="italic text-gray-400">Empty Note</div>
		{/if}
	</div>

	{#if data.note.labels.length > 0}
		<div class="flex flex-wrap items-center gap-2 mt-4">
			{#each data.note.labels as label (label.id)}
				<Badge variant="default">{label.name}</Badge>
			{/each}
		</div>
	{/if}

	<div class="mt-4 flex items-center justify-between">
		<ul class="flex items-center gap-4">
			<li>
				<form
					action="?/setStatusToNormal"
					method="POST"
					use:enhance={() => {
						isLoading.normal = true;
					}}
				>
					<Button
						type="submit"
						variant={data.note.status === 'NORMAL' ? 'default' : 'outline'}
						size="icon"
						disabled={isLoading.normal}
					>
						{#if isLoading.normal}
							<LoaderCircle class="size-5 animate-spin" />
						{:else}
							<Lightbulb class="size-5" />
						{/if}
					</Button>
				</form>
			</li>
			<li>
				<form
					action="?/setStatusToFavorited"
					method="POST"
					use:enhance={() => {
						isLoading.favorite = true;
					}}
				>
					<Button
						type="submit"
						variant={data.note.status === 'FAVORITED' ? 'default' : 'outline'}
						size="icon"
						disabled={isLoading.favorite}
					>
						{#if isLoading.favorite}
							<LoaderCircle class="size-5 animate-spin" />
						{:else}
							<Star class="size-5" />
						{/if}
					</Button>
				</form>
			</li>
			<li>
				<form
					action="?/setStatusToArchived"
					method="POST"
					use:enhance={() => {
						isLoading.archive = true;
					}}
				>
					<Button
						type="submit"
						variant={data.note.status === 'ARCHIVED' ? 'default' : 'outline'}
						size="icon"
						disabled={isLoading.archive}
					>
						{#if isLoading.archive}
							<LoaderCircle class="size-5 animate-spin" />
						{:else}
							<Archive class="size-5" />
						{/if}
					</Button>
				</form>
			</li>
			<li>
				<form
					action="?/setStatusToDeleted"
					method="POST"
					use:enhance={() => {
						isLoading.delete = true;
					}}
				>
					<Button
						type="submit"
						variant={data.note.status === 'DELETED' ? 'default' : 'outline'}
						size="icon"
						disabled={isLoading.delete}
					>
						{#if isLoading.delete}
							<LoaderCircle class="size-5 animate-spin" />
						{:else}
							<ArchiveX class="size-5" />
						{/if}
					</Button>
				</form>
			</li>
		</ul>

		<a href="/notes/{data.note.id}/edit" class={buttonVariants()}>Edit Note</a>
	</div>
</section>
