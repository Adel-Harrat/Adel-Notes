<script lang="ts">
	import { Layers } from 'lucide-svelte';

	let { title = 'No Notes' } = $props();
</script>

<div
	class="flex flex-col items-center justify-center gap-4 border-2 rounded-lg py-14 border-dashed dark:border-muted border-muted-foreground"
>
	<Layers class="size-8 dark:text-muted text-muted-foreground" />
	<h2 class="text-sm dark:text-muted text-muted-foreground font-semibold tracking-tight">
		{title}
	</h2>
</div>
