<script lang="ts">
	import { buttonVariants } from '$lib/components/ui/button';
	import Time from 'svelte-time';
	import { CalendarClock, CalendarCog } from 'lucide-svelte';
	import { invalidateAll } from '$app/navigation';
	import { toast } from 'svelte-sonner';
	import type { ActionData } from '../../$types';
	import { Badge } from '$lib/components/ui/badge';
	import type { PageServerData } from './$types';
	import { Label } from '$lib/components/ui/label';
	import PageTitle from '../../../components/PageTitle.svelte';
	import StatusBadge from '../../../components/StatusBadge.svelte';
	import PageTitleWithButtons from '../../../components/PageTitleWithButtons.svelte';

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

<section class="flex flex-col">
	<PageTitleWithButtons>
		<PageTitle>
			{#snippet title()}
				{data.note.title}
			{/snippet}
		</PageTitle>

		<a href="/notes/{data.note.id}/edit" class={'ml-auto ' + buttonVariants()}>Edit Note</a>
	</PageTitleWithButtons>

	<div class="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-6 mt-6">
		<div>
			{#if data.note?.content?.length}
				<div class="bg-muted min-h-52 shadow-inner rounded-lg p-5 text-base">
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

				<StatusBadge value={data.note.status} />
			</div>

			<div class="space-y-2">
				<Label>Created at</Label>

				<p class="flex items-center gap-1 text-xs text-muted-foreground">
					<CalendarClock class="size-4" />
					<Time timestamp={data.note.createdAt} format="MMMM D, YYYY &mdash; h:mm A" />
				</p>
			</div>

			{#if showLastUpdated}
				<div class="space-y-2">
					<Label>Updated at</Label>

					<p class="flex items-center gap-1 text-xs text-muted-foreground">
						<CalendarCog class="size-4" />
						<Time timestamp={data.note.updatedAt} format="MMMM D, YYYY &mdash; h:mm A" />
					</p>
				</div>
			{/if}

			{#if data.note.labels.length > 0}
				<div class="space-y-2">
					<Label>Labels</Label>

					<div class="flex flex-wrap items-center gap-2">
						{#each data.note.labels as label (label.id)}
							<Badge variant="default">{label.name}</Badge>
						{/each}
					</div>
				</div>
			{/if}
		</div>
	</div>
</section>
