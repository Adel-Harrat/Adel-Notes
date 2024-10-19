<script>
	import '../app.css';
	import Aside from '../components/Aside/Aside.svelte';
	import Header from '../components/Header.svelte';
</script>

<section class="grid grid-cols-5 grid-rows-[50px_1fr]">
	<Aside />

	<Header />

	<main class="col-span-4 px-5">
		<slot />
	</main>
</section>
