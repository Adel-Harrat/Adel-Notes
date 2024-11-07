<script lang="ts">
	import { CalendarClock } from 'lucide-svelte';
	import Time from 'svelte-time/Time.svelte';

	let { data } = $props();
</script>

<svelte:head>
	<title>{data.label.name}</title>
</svelte:head>

<section class="my-10">
	<h1 class="text-3xl font-bold tracking-tight text-gray-900 mb-2">{data.label.name}</h1>

	<p class="flex items-center gap-2 text-sm text-gray-500">
		<CalendarClock class="size-5" />
		<Time timestamp={data.label.createdAt} format="MMMM D, YYYY &mdash; h:mm A" />
	</p>
</section>
