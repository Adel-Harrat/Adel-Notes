<script lang="ts">
	let { children, withBorder = true }: { children: () => any; withBorder?: boolean } = $props();
</script>

<div
	class="pb-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 {withBorder
		? 'border-b border-muted'
		: null} *:mb-0"
>
	<div class="w-full flex flex-col md:flex-row md:justify-between md:items-center">
		{@render children()}
	</div>
</div>
