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

	let isLabelsMenuOpen = $state(false);
</script>

<ul class="flex flex-col items-start gap-6 mt-10 text-left px-5">
	<Link href="/">
		<Lightbulb />
		Home
	</Link>

	<Link href="/favorites">
		<Star />
		Favorites
	</Link>

	<div class="w-full">
		<div class="flex items-center justify-between">
			<Link href="/labels">
				<Layers />
				Labels
			</Link>

			<button onclick={() => (isLabelsMenuOpen = !isLabelsMenuOpen)} class="px-2">
				{#if isLabelsMenuOpen}
					<ChevronUp class="size-6" />
				{:else}
					<ChevronDown class="size-6" />
				{/if}
			</button>
		</div>

		{#if isLabelsMenuOpen}
			<ul
				class="flex flex-col gap-3 mt-2 pl-8 items-start w-full *:text-sm *:text-neutral-600"
				transition:slide
			>
				{#each labels as label (label.id)}
					<li>
						<a class="flex items-center gap-2" href="/labels/{label.id}">
							<Tags class="size-4" />
							{label?.name}
						</a>
					</li>
				{/each}
			</ul>
		{/if}
	</div>

	<Link href="/archive">
		<Archive />
		Archive
	</Link>

	<Link href="/trash">
		<ArchiveX />
		Trash
	</Link>
</ul>
