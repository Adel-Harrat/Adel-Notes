<script>
	import { Star } from 'lucide-svelte';
	let isStared = false;
</script>

<article class="bg-white rounded-md group shadow overflow-hidden cursor-pointer">
	<div class="relative bg-yellow-50">
		<img src="/placeholder/1.svg" alt="" />
		<div class="bg-black/50 absolute inset-0 invisible group-hover:visible"></div>
	</div>
	<div class="p-4">
		<div class="flex items-start justify-between">
			<h2 class="font-normal text-gray-900 text-sm">Important things for Oran</h2>
			<Star
				onclick={() => (isStared = !isStared)}
				class={`size-5 text-gray-500 mt-1 invisible group-hover:visible text-blue-600 cursor-pointer ${isStared ? 'fill-blue-600' : ''}`}
			/>
		</div>
		<p class="invisible group-hover:visible text-gray-500 text-xs">You, about 02 weeks ago</p>
	</div>
</article>
