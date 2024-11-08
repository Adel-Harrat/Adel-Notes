<script lang="ts">
	import { Archive, Star, ArchiveX } from 'lucide-svelte';
	import Time from 'svelte-time';
	const props = $props();
</script>

<a href={`/notes/${props.note.id}`}>
	<article
		title={props.note.title}
		class="bg-muted h-full rounded-md group shadow overflow-hidden cursor-pointer flex flex-col"
	>
		<div class="relative bg-yellow-50 overflow-hidden h-32 group">
			<img
				src={props.note.image}
				alt={props.note.title}
				class="h-full object-contain group-hover:scale-125 group-hover:rotate-12 transition-all ease-in-out duration-300"
			/>
			<div class="bg-black/50 absolute inset-0 invisible group-hover:visible"></div>
		</div>

		<div class="p-3 space-y-1 mt-auto">
			<div class="flex items-center justify-between gap-2">
				<h2 class="font-normal text-card-foreground text-sm line-clamp-1">
					{props.note.title}
				</h2>

				{#if props.note.status === 'FAVORITED'}
					<div>
						<Star class="size-4 fill-current text-yellow-500 dark:text-yellow-400" />
					</div>
				{/if}
			</div>
			<p class="lg:invisible group-hover:visible text-muted-foreground text-xs">
				About
				<Time relative timestamp={props.note.createdAt} />
			</p>
		</div>
	</article>
</a>
