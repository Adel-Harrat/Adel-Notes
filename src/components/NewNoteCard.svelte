<script lang="ts">
	import { enhance } from '$app/forms';
	import { Plus, LoaderCircle } from 'lucide-svelte';
	import type { ActionData } from '../routes/$types';
	import { toast } from 'svelte-sonner';
	let { form }: { form: ActionData } = $props();

	let isLoading = $state(false);

	$effect(() => {
		if (form?.type === 'success') {
			toast(form?.message);
		} else if (form?.type === 'error') {
			toast(form?.message);
		}

		isLoading = false;
	});
</script>

<form
	action="?/addNewNote"
	method="POST"
	use:enhance={() => {
		isLoading = true;
	}}
	class="relative h-48"
>
	<button disabled={isLoading} type="submit" class="size-full absolute inset-0 group">
		<article
			class="text-white flex items-center justify-center flex-col gap-5 rounded-md group shadow bg-gradient-to-br from-purple-700 to-purple-400 dark:from-purple-950 dark:to-purple-500 hover:brightness-125 cursor-pointer active:brightness-125 size-full group-disabled:brightness-95 group-disabled:cursor-wait"
		>
			{#if isLoading}
				<LoaderCircle class="size-10 animate-spin" />
				<span class="text-sm">Please wait</span>
			{:else}
				<Plus class="size-10" />
				<span class="text-sm">New Note</span>
			{/if}
		</article>
	</button>
</form>
