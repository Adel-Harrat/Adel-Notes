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
		labels,
		isLabelsMenuOpen
	}: {
		labels: { id: string; name: string }[];
		isLabelsMenuOpen: boolean;
	} = $props();
</script>

<section class="mt-12 flex items-center justify-center">
	<ul class="flex flex-col gap-6">
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
					<button onclick={() => (isLabelsMenuOpen = !isLabelsMenuOpen)} class="px-2 ml-3">
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
						class="flex flex-col mt-3 ml-3 items-start w-full *:text-sm *:text-muted-foreground"
						transition:slide
					>
						{#each labels as label (label.id)}
							<li>
								<a
									class="flex items-center gap-2 hover:text-primary transition-all ease-in-out duration-200 py-2 hover:ml-2 focus:text-primary focus:pl-2 outline-none"
									href="/labels/{label.id}"
								>
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
</section>
