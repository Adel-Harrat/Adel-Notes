<script lang="ts">
	let { children }: any = $props();
</script>

<h1 class="text-3xl font-bold tracking-tight text-foreground my-6">
	{@render children()}
</h1>
