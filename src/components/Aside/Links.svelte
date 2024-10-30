<script>
	import Link from './Link.svelte';
	import { Lightbulb } from 'lucide-svelte';
	import { Star } from 'lucide-svelte';
	import { Tag } from 'lucide-svelte';
	import { Archive } from 'lucide-svelte';
	import { Trash } from 'lucide-svelte';
</script>

<ul class="flex flex-col items-center justify-center gap-6 mt-10 text-left px-5">
	<Link href="/">
		<Lightbulb />
		Our Notes
	</Link>

	<Link href="/favorites">
		<Star />
		Favorites
	</Link>

	<Link href="/labels">
		<Tag />
		Labels
	</Link>

	<Link href="/archive">
		<Archive />
		Archive
	</Link>

	<Link href="/trash">
		<Trash />
		Trash
	</Link>
</ul>
