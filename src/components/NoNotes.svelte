<script lang="ts">
	import { Bird } from 'lucide-svelte';

	let { title = 'No Notes' } = $props();
</script>

<div class="flex flex-col items-center justify-center *:text-neutral-500">
	<Bird class="size-20" />
	<h2 class="text-2xl font-light">{title}</h2>
</div>
