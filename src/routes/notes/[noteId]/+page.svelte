<script lang="ts">
	import { enhance } from '$app/forms';
	import { Button } from '$lib/components/ui/button';
	import Time from 'svelte-time';
	import { Archive, ArchiveX, Lightbulb, Star } from 'lucide-svelte';
	import { invalidateAll } from '$app/navigation';

	let { data } = $props();
	const showLastUpdated = data.note.createdAt.toString() !== data.note.updatedAt.toString();

	function handleSubmit() {
		return async ({ result }) => {
			if (result.type === 'success') {
				await invalidateAll();
			}
		};
	}
</script>

<svelte:head>
	<title>Note Details</title>
</svelte:head>

<section class="max-w-xl pt-8 flex flex-col">
	<div class="flex items-center justify-between">
		<h1 class="text-3xl font-bold tracking-tight flex-1 text-gray-900">{data.note.title}</h1>

		{#if data.note.status === 'DELETED'}
			<span class="bg-red-200 text-red-900 px-4 py-1.5 rounded-full font-normal text-base"
				>Deleted</span
			>
		{:else if data.note.status === 'ARCHIVED'}
			<span class="bg-gray-200 text-gray-900 px-4 py-1.5 rounded-full font-normal text-base"
				>Archived</span
			>
		{:else if data.note.status === 'FAVORITED'}
			<span class="bg-yellow-200 text-yellow-900 px-4 py-1.5 rounded-full font-normal text-base">
				Favorited
			</span>
		{/if}
	</div>

	<div class="flex items-center justify-start gap-2 *:text-sm *:text-gray-500 mt-2">
		<span
			>Created: <Time timestamp={data.note.createdAt} format="MMMM D, YYYY &mdash; h:mm A" /></span
		>
		{#if showLastUpdated}
			<span>•</span>
			<span>
				Last update:
				<Time timestamp={data.note.updatedAt} format="MMMM D, YYYY &mdash; h:mm A" />
			</span>
		{/if}
	</div>

	<div class="bg-gray-50 min-h-52 rounded-lg shadow-inner p-5 mt-4 text-lg">
		{#if data.note?.content?.length}
			{data.note.content}
		{:else}
			<span class="italic text-gray-400">Empty Note</span>
		{/if}
	</div>

	<div class="mt-4 flex items-center justify-between">
		<ul class="flex items-center gap-4">
			<li>
				<form action="?/setStatusToNormal" method="POST" use:enhance={handleSubmit}>
					<Button
						type="submit"
						variant={data.note.status === 'NORMAL' ? 'default' : 'outline'}
						size="icon"
					>
						<Lightbulb class="size-5" />
					</Button>
				</form>
			</li>
			<li>
				<form action="?/setStatusToFavorited" method="POST" use:enhance={handleSubmit}>
					<Button
						type="submit"
						variant={data.note.status === 'FAVORITED' ? 'default' : 'outline'}
						size="icon"
					>
						<Star class="size-5" />
					</Button>
				</form>
			</li>
			<li>
				<form action="?/setStatusToArchived" method="POST" use:enhance={handleSubmit}>
					<Button
						type="submit"
						variant={data.note.status === 'ARCHIVED' ? 'default' : 'outline'}
						size="icon"
					>
						<Archive class="size-5" /></Button
					>
				</form>
			</li>
			<li>
				<form action="?/setStatusToDeleted" method="POST" use:enhance={handleSubmit}>
					<Button
						type="submit"
						variant={data.note.status === 'DELETED' ? 'default' : 'outline'}
						size="icon"
					>
						<ArchiveX class="size-5" />
					</Button>
				</form>
			</li>
		</ul>

		<Button>Edit Note</Button>
	</div>
</section>
