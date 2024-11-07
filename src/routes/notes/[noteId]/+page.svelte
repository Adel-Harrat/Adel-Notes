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
	import { Label } from '$lib/components/ui/label';

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

<section class="pt-8 flex flex-col">
	<div class="flex items-center justify-between border-b border-muted pb-4">
		<h1 class="text-3xl font-bold tracking-tight flex-1 text-gray-900">{data.note.title}</h1>

		<a href="/notes/{data.note.id}/edit" class={buttonVariants()}>Edit Note</a>
	</div>

	<div class="grid grid-cols-[2fr_1fr] gap-6 mt-6">
		<div>
			{#if data.note?.content?.length}
				<div class="bg-gray-50 min-h-52 shadow-inner rounded-lg p-5 text-base">
					{data.note.content}
				</div>
			{:else}
				<div
					class="italic text-gray-400 border-2 border-dashed py-20 rounded-lg flex items-center justify-center"
				>
					Empty Note
				</div>
			{/if}
		</div>

		<div class="space-y-4">
			<div class="space-y-2">
				<Label>Status</Label>

				<p>
					{#if data.note.status === 'DELETED'}
						<span class="bg-red-200 text-red-900 px-4 py-1.5 rounded-full font-normal text-sm">
							{#if isLoading?.delete}
								<span>Loading</span>
							{:else}
								<span>Deleted</span>
							{/if}
						</span>
					{:else if data.note.status === 'ARCHIVED'}
						<span class="bg-gray-200 text-gray-900 px-4 py-1.5 rounded-full font-normal text-sm">
							Archived
						</span>
					{:else if data.note.status === 'FAVORITED'}
						<span
							class="bg-yellow-200 text-yellow-900 px-4 py-1.5 rounded-full font-normal text-sm"
						>
							Favorited
						</span>
					{:else if data.note.status === 'NORMAL'}
						<span class="bg-gray-50 text-gray-900 px-4 py-1.5 rounded-full font-normal text-sm">
							Default
						</span>
					{/if}
				</p>
			</div>

			<div class="space-y-2">
				<Label>Created at</Label>

				<p class="flex items-center gap-1 text-xs text-gray-600">
					<CalendarClock class="size-4" />
					<Time timestamp={data.note.createdAt} format="MMMM D, YYYY &mdash; h:mm A" />
				</p>
			</div>

			{#if showLastUpdated}
				<div class="space-y-2">
					<Label>Updated at</Label>

					<p class="flex items-center gap-1 text-xs text-gray-600">
						<CalendarCog class="size-4" />
						<Time timestamp={data.note.updatedAt} format="MMMM D, YYYY &mdash; h:mm A" />
					</p>
				</div>
			{/if}

			<div class="space-y-2">
				<Label>Labels</Label>
				{#if data.note.labels.length > 0}
					<div class="flex flex-wrap items-center gap-2">
						{#each data.note.labels as label (label.id)}
							<Badge variant="default">{label.name}</Badge>
						{/each}
					</div>
				{/if}
			</div>
		</div>
	</div>
</section>
