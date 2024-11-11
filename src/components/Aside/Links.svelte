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
		isLabelsMenuOpen,
		closeMobileDrawer
	}: {
		labels: { id: string; name: string }[];
		isLabelsMenuOpen: boolean;
		closeMobileDrawer?: () => void;
	} = $props();
</script>

<section class="mt-10 px-10 md:w-40 mx-auto overflow-hidden">
	<ul class="flex flex-col gap-6">
		<Link onclick={closeMobileDrawer} href="/">
			<div>
				<Lightbulb class="size-5" />
			</div>

			Home
		</Link>

		<Link onclick={closeMobileDrawer} href="/favorites">
			<div>
				<Star class="size-5" />
			</div>

			Favorites
		</Link>

		<div>
			<div class="flex items-center">
				<Link onclick={closeMobileDrawer} href="/labels">
					<div>
						<Layers class="size-5" />
					</div>

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
									onclick={closeMobileDrawer}
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

		<Link onclick={closeMobileDrawer} href="/archive">
			<div>
				<Archive class="size-5" />
			</div>

			Archive
		</Link>

		<Link onclick={closeMobileDrawer} href="/trash">
			<div>
				<ArchiveX class="size-5" />
			</div>

			Trash
		</Link>
	</ul>
</section>
