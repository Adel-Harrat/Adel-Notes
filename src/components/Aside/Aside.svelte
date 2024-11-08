<script lang="ts">
	import Logo from './Logo.svelte';
	import Links from './Links.svelte';

	let {
		labels,
		isLabelsMenuOpen
	}: { labels: { id: string; name: string }[]; isLabelsMenuOpen: boolean } = $props();
</script>

<aside class="flex flex-col py-5">
	<Logo />

	<Links {labels} {isLabelsMenuOpen} />
</aside>
