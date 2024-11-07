<script lang="ts">
	import { slide } from 'svelte/transition';
	import Link from './Link.svelte';
	import {
		Lightbulb,
		Star,
		Archive,
		Layers,
		ArchiveX,
		Tags,
		ChevronDown,
		ChevronUp
	} from 'lucide-svelte';

	let {
		labels
	}: {
		labels: { id: string; name: string }[];
	} = $props();

	let isLabelsMenuOpen = $state(labels.length > 4 ? false : true);
</script>

<ul class="flex flex-col items-start gap-6 mt-10 text-left px-5">
	<Link href="/">
		<Lightbulb class="size-5" />
		Home
	</Link>

	<Link href="/favorites">
		<Star class="size-5" />
		Favorites
	</Link>

	<div class="w-full">
		<div class="flex items-center justify-between">
			<Link href="/labels">
				<Layers class="size-5" />
				Labels
			</Link>

			{#if labels.length}
				<button onclick={() => (isLabelsMenuOpen = !isLabelsMenuOpen)} class="px-2">
					{#if isLabelsMenuOpen}
						<ChevronUp class="size-5" />
					{:else}
						<ChevronDown class="size-5" />
					{/if}
				</button>
			{/if}
		</div>

		{#if labels.length}
			{#if isLabelsMenuOpen}
				<ul
					class="flex flex-col gap-3 mt-3 pl-8 items-start w-full *:text-sm *:text-neutral-600"
					transition:slide
				>
					{#each labels as label (label.id)}
						<li>
							<a class="flex items-center gap-2" href="/labels/{label.id}">
								<Tags class="size-5" />
								{label?.name}
							</a>
						</li>
					{/each}
				</ul>
			{/if}
		{/if}
	</div>

	<Link href="/archive">
		<Archive class="size-5" />
		Archive
	</Link>

	<Link href="/trash">
		<ArchiveX class="size-5" />
		Trash
	</Link>
</ul>
