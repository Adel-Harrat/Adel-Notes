<script lang="ts">
	import { enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Dialog from '$lib/components/ui/dialog';
	import { Input } from '$lib/components/ui/input';
	import { LoaderCircle } from 'lucide-svelte';
	import DeleteLabel from './DeleteLabel.svelte';
	import { toast } from 'svelte-sonner';
	import { Badge } from '$lib/components/ui/badge';

	let { id, name } = $props();
	let isLoading = $state(false);
	let dialogOpen = $state(false);
</script>

<div>
	<Dialog.Root bind:open={dialogOpen}>
		<Dialog.Trigger>
			<Badge variant="secondary">{name}</Badge>
		</Dialog.Trigger>
		<Dialog.Content>
			<Dialog.Header>
				<Dialog.Title class="text-left">Updating "{name}" Label</Dialog.Title>
				<Dialog.Description>
					<form
						class="mt-4 space-y-4"
						action="/labels?/update"
						method="POST"
						use:enhance={() => {
							isLoading = true;
							return async ({ result }) => {
								if ('data' in result && result?.data?.type === 'success') {
									toast(result?.data?.message as string);
									await invalidateAll();
									isLoading = false;
									dialogOpen = false;
								}
							};
						}}
					>
						<input type="hidden" name="id" value={id} />
						<div>
							<Input tabindex={1} name="name" id="name" placeholder="Name of label" value={name} />
						</div>

						<div class="flex items-center gap-4">
							<DeleteLabel {id} />

							<Dialog.Close class="ml-auto" tabindex={-1}>
								<Button variant="secondary" type="button" tabindex={4}>Cancel</Button>
							</Dialog.Close>

							<Button type="submit" tabindex={2} disabled={isLoading}>
								{#if isLoading}
									<LoaderCircle class="size-5 animate-spin" />
								{:else}
									<span>Update</span>
								{/if}
							</Button>
						</div>
					</form>
				</Dialog.Description>
			</Dialog.Header>
		</Dialog.Content>
	</Dialog.Root>
</div>
