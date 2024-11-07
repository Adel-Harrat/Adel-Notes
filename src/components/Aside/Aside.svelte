<script lang="ts">
	import Logo from './Logo.svelte';
	import Links from './Links.svelte';

	let { labels }: { labels: { id: string; name: string }[] } = $props();
</script>

<aside class="row-span-2 flex flex-col py-5">
	<Logo />

	<Links {labels} />
</aside>
