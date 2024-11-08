<script lang="ts">
	let { children, withBorder = true }: { children: () => any; withBorder: boolean } = $props();
</script>

<div
	class="pb-5 flex items-center justify-between gap-4 {withBorder
		? 'border-b border-muted'
		: null} *:mb-0"
>
	{@render children()}
</div>
