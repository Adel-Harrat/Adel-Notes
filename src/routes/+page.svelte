<script>
	import NoteCard from '../components/NoteCard.svelte';
	import NewNoteCard from '../components/NewNoteCard.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
</script>

<section>
	<h1 class="text-3xl text-gray-900 my-5">Our Notes</h1>
	<div class="grid grid-cols-4 gap-4">
		<NewNoteCard />
		<NoteCard />
		<NoteCard />
		<NoteCard />
		<NoteCard />
		<NoteCard />
		<NoteCard />
	</div>

	<div class="my-5 flex items-center justify-center">
		<Button variant="link">Load More Notes</Button>
	</div>
</section>
