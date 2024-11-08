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

<section class="mt-10 w-40 mx-auto overflow-hidden">
	<ul class="flex flex-col gap-6">
		<Link href="/">
			<Lightbulb class="size-5" />
			Home
		</Link>

		<Link href="/favorites">
			<Star class="size-5" />
			Favorites
		</Link>

		<div>
			<div class="flex items-center">
				<Link href="/labels">
					<Layers class="size-5" />
					Labels
				</Link>

				{#if labels.length}
					<button class="ml-4" onclick={() => (isLabelsMenuOpen = !isLabelsMenuOpen)}>
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
						class="flex flex-col mt-3 ml-3 items-start *:text-sm *:text-muted-foreground overflow-hidden relative"
						transition:slide
					>
						{#each labels as label (label.id)}
							<li>
								<a
									class="flex items-center gap-2 hover:text-primary transition-all ease-in-out duration-200 py-2 hover:pl-2 focus:text-primary focus:pl-2 outline-none truncate"
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
