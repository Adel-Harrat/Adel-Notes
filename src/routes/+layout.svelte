<script>
	import '../app.css';
	import Aside from '../components/Aside/Aside.svelte';
	import Header from '../components/Header.svelte';

	let { children, data } = $props();
	const { img, name, nameFallback } = data.user;
</script>

<svelte:head>
	<title>Adel Notes</title>
</svelte:head>

<section class="grid grid-cols-5 grid-rows-[50px_1fr]">
	<Aside />

	<Header {img} {name} {nameFallback} />

	<main class="col-span-4 px-5">
		{@render children?.()}
	</main>
</section>
