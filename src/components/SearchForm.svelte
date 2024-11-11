<script lang="ts">
	import { page } from '$app/stores';
	import Input from '$lib/components/ui/input/input.svelte';
	import { Search } from 'lucide-svelte';

	let { onSearch }: { onSearch?: () => void } = $props();
	let searchQuery = $state($page.url.searchParams.get('q'));

	$effect(() => {
		searchQuery = $page.url.searchParams.get('q');
	});
</script>

<form method="GET" action="/search" class="w-full relative">
	<Input
		placeholder="Search Notes"
		class="indent-6"
		type="search"
		name="q"
		bind:value={searchQuery}
		id="search-input"
		onchange={onSearch}
	/>

	<Search class="pointer-events-none size-5 text-foreground absolute top-2.5 left-2" />
</form>
