<script>
	import { page } from '$app/stores';
</script>

<section class="py-10">
	<h2 class="text-primary font-bold text-2xl text-center">{$page.status}</h2>
	<h1 class="text-center text-3xl font-extrabold font-display-tight">{$page?.error?.message}</h1>
</section>
