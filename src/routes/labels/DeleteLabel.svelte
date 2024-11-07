<script lang="ts">
	import { enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import { Button, buttonVariants } from '$lib/components/ui/button';
	import { LoaderCircle } from 'lucide-svelte';
	import { toast } from 'svelte-sonner';
	import * as AlertDialog from '$lib/components/ui/alert-dialog';

	let { id }: { id: unknown } = $props();
	let isLoading = $state(false);
	let dialogOpen = $state(false);
</script>

<form
	action="/labels?/delete"
	method="POST"
	use:enhance={() => {
		isLoading = true;

		return async ({ result }) => {
			if ('data' in result && result.data?.type === 'success') {
				isLoading = false;
				await invalidateAll();
				toast(result.data?.message as string);
				dialogOpen = false;
			}
		};
	}}
>
	<input type="hidden" name="id" value={id} />

	<AlertDialog.Root bind:open={dialogOpen}>
		<AlertDialog.Trigger class={buttonVariants({ variant: 'destructive' })}
			>Delete</AlertDialog.Trigger
		>
		<AlertDialog.Content>
			<AlertDialog.Header>
				<AlertDialog.Title>Are you absolutely sure?</AlertDialog.Title>
				<AlertDialog.Description>
					This action cannot be undone. This will permanently delete your label forever.
				</AlertDialog.Description>
			</AlertDialog.Header>
			<AlertDialog.Footer>
				<AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
				<AlertDialog.Action asChild>
					<Button variant="destructive" type="submit" tabindex={3} disabled={isLoading}>
						{#if isLoading}
							<LoaderCircle class="size-5 animate-spin" />
						{:else}
							<span>Delete</span>
						{/if}
					</Button>
				</AlertDialog.Action>
			</AlertDialog.Footer>
		</AlertDialog.Content>
	</AlertDialog.Root>
</form>
