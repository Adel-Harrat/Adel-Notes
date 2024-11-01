<script lang="ts">
	import Time from 'svelte-time';
	import { Star } from 'lucide-svelte';
	let isStared = $state(false);
	const props = $props();
</script>

<a href={`/notes/${props.note.id}`}>
	<article class="bg-white rounded-md group shadow overflow-hidden cursor-pointer flex flex-col">
		<div class="relative bg-yellow-50 flex-1">
			<img src={props.note.image} alt="note pic" class="size-full" />
			<div class="bg-black/50 absolute inset-0 invisible group-hover:visible"></div>
		</div>

		<div class="p-4">
			<div class="flex items-start justify-between">
				<h2 class="font-normal text-gray-900 text-sm">{props.note.title}</h2>
				<Star
					onclick={() => (isStared = !isStared)}
					class={`size-5 text-gray-500 mt-1 invisible group-hover:visible cursor-pointer ${isStared ? 'fill-blue-600' : ''}`}
				/>
			</div>
			<p class="invisible group-hover:visible text-gray-500 text-xs">
				About
				<Time relative timestamp={props.note.createdAt} />
			</p>
		</div>
	</article>
</a>
