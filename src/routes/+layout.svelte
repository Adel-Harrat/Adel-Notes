<script lang="ts">
	import '../app.css';
	import Aside from '../components/Aside/Aside.svelte';
	import Header from '../components/Header.svelte';
	import { Toaster } from '$lib/components/ui/sonner/index.js';

	let { children, data } = $props();
	const { img, name, nameFallback } = data.user;
</script>

<svelte:head>
	<title>Adel Notes</title>
</svelte:head>

<section class="grid grid-cols-5 grid-rows-[50px_1fr]">
	<Aside />

	<Header img={img ?? ''} {name} {nameFallback} />

	<main class="col-span-4 px-5">
		{@render children?.()}
	</main>
</section>

<Toaster />
