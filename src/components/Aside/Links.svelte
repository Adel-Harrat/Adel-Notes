<script>
	import Link from './Link.svelte';
	import { Lightbulb } from 'lucide-svelte';
	import { Star } from 'lucide-svelte';
	import { Tag } from 'lucide-svelte';
	import { Archive } from 'lucide-svelte';
	import { Trash } from 'lucide-svelte';
</script>

<ul class="flex flex-col items-center justify-center gap-6 mt-10 text-left px-5">
	<Link>
		<Lightbulb />
		Notes
	</Link>

	<Link>
		<Star />
		Favorite
	</Link>

	<Link>
		<Tag />
		Edit labels
	</Link>

	<Link>
		<Archive />
		Archive
	</Link>

	<Link>
		<Trash />
		Trash
	</Link>
</ul>
