<script lang="ts">
	import { Archive, Star } from 'lucide-svelte';
	import Time from 'svelte-time';
	const props = $props();
</script>

<a href={`/notes/${props.note.id}`}>
	<article
		class="bg-white h-full rounded-md group shadow overflow-hidden cursor-pointer flex flex-col"
	>
		<div class="relative bg-yellow-50 overflow-hidden h-32">
			<img src={props.note.image} alt={props.note.title} class="h-full object-contain" />
			<div class="bg-black/50 absolute inset-0 invisible group-hover:visible"></div>
		</div>

		<div class="p-3 space-y-1 mt-auto">
			<div class="flex items-center justify-between">
				<h2 class="font-normal text-gray-900 text-sm line-clamp-1">{props.note.title}</h2>

				{#if props.note.status === 'FAVORITED'}
					<Star class="size-4 fill-current text-yellow-500" />
				{:else if props.note.status === 'ARCHIVED'}
					<Archive class="size-4" />
				{/if}
			</div>
			<p class="invisible group-hover:visible text-gray-500 text-xs">
				About
				<Time relative timestamp={props.note.createdAt} />
			</p>
		</div>
	</article>
</a>
