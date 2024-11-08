<script lang="ts">
	let props = $props();
</script>

<li>
	<a href={props.href} class=" flex items-center gap-2">
		{@render props.children()}
	</a>
</li>
