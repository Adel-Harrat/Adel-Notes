<script>
	let data = $props();
</script>

<li class="w-full">
	<a href={data.href} class=" flex items-center gap-2">
		<!-- {@render children?.()} -->
		<slot />
	</a>
</li>
