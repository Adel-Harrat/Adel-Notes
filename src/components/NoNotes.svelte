<script lang="ts">
	import { NotebookPen } from 'lucide-svelte';

	let { title = 'No Notes' } = $props();
</script>

<div
	class="flex flex-col items-center justify-center gap-2 border-2 rounded-lg py-8 border-dashed border-gray-300"
>
	<NotebookPen class="size-8 text-foreground" />
	<h2 class="text-base text-foreground font-semibold">{title}</h2>
</div>
