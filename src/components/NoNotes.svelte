<script lang="ts">
	import { Layers } from 'lucide-svelte';

	let { title = 'No Notes' } = $props();
</script>

<div
	class="mt-5 flex flex-col items-center justify-center gap-4 border-2 rounded-lg py-14 border-dashed dark:border-muted border-muted-foreground"
>
	<Layers class="size-12 dark:text-white text-muted-foreground" />
	<h2 class="text-lg dark:text-white text-muted-foreground font-semibold tracking-tight">
		{title}
	</h2>
</div>
