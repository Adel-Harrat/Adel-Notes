<script lang="ts">
	let { children, withBorder = true }: { children: () => any; withBorder?: boolean } = $props();
</script>

<div
	class="pb-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4 {withBorder
		? 'border-b border-muted'
		: null} *:mb-0"
>
	<div>
		{@render children()}
	</div>
</div>
