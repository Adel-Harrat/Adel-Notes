<script lang="ts">
	import { enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import { Plus } from 'lucide-svelte';

	function handleSubmit() {
		// TODO: Fix typescript error
		return async ({ result }) => {
			if (result.type === 'success') {
				await invalidateAll();
			} else if (result.type === 'error') {
				// TODO: Show error or something
			}
		};
	}
</script>

<form action="?/addNewNote" method="POST" use:enhance={handleSubmit}>
	<button type="submit" class="size-full">
		<article
			class="text-white flex items-center justify-center flex-col gap-5 rounded-md group shadow bg-blue-600 hover:bg-blue-800 cursor-pointer active:bg-blue-900 size-full"
		>
			<Plus class="size-10" />
			<span class="text-sm">New Note</span>
		</article>
	</button>
</form>
