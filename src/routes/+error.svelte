<script>
	import { page } from '$app/stores';
</script>

<section>
	<h2>{$page.status}</h2>
	<h1>{$page?.error?.message}</h1>
</section>
