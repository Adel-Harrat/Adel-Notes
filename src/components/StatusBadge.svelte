<script lang="ts">
	let { value } = $props();

	let className = $state('');
	let name = $state('');

	switch (value) {
		case 'NORMAL':
			className =
				'bg-primary text-primary-foreground text-sm px-2 py-0.5 rounded-full inline-block';
			name = 'Default';
			break;
		case 'FAVORITED':
			className = 'bg-yellow-300 text-yellow-950 text-sm px-2 py-0.5 rounded-full inline-block';
			name = 'Favorited';
			break;
		case 'ARCHIVED':
			className = 'bg-gray-300 text-gray-950 text-sm px-2 py-0.5 rounded-full inline-block';
			name = 'Archived';
			break;
		case 'DELETED':
			className = 'bg-red-300 text-red-950 text-sm px-2 py-0.5 rounded-full inline-block';
			name = 'Deleted';
			break;
	}
</script>

<section>
	<span class={className}>{name}</span>
</section>
