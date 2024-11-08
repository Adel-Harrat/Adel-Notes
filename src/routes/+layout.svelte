<script lang="ts">
	import { ModeWatcher } from 'mode-watcher';
	import '../app.css';
	import Aside from '../components/Aside/Aside.svelte';
	import Header from '../components/Header.svelte';
	import { Toaster } from '$lib/components/ui/sonner/index.js';
	import { browser } from '$app/environment';
	import { toast } from 'svelte-sonner';

	let { children, data } = $props();
	const { img, name, nameFallback } = data.user;

	const isOnline = $state(browser ? navigator.onLine : false);

	$effect(() => {
		if (!isOnline) {
			toast('You are offline');
		}
	});

	let isLabelsMenuOpen = $derived(data.labels.length > 4 ? false : true);
</script>

<svelte:head>
	<title>Adel Notes</title>
</svelte:head>

<section class="grid grid-cols-5 grid-rows-[50px_1fr]">
	<Aside labels={data.labels} {isLabelsMenuOpen} />

	<Header img={img ?? ''} {name} {nameFallback} />

	<main class="col-span-4 px-5 pt-14">
		<ModeWatcher />
		{@render children?.()}
	</main>
</section>

<Toaster />
