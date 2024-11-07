<script lang="ts">
	import { enhance } from '$app/forms';
	import { Button, buttonVariants } from '$lib/components/ui/button';
	import * as Dialog from '$lib/components/ui/dialog';
	import { Input } from '$lib/components/ui/input';
	import { LoaderCircle } from 'lucide-svelte';
	import type { ActionData } from './$types';
	import { toast } from 'svelte-sonner';
	import { invalidateAll } from '$app/navigation';

	let { form }: { form: ActionData } = $props();

	let isLoading = $state(false),
		dialogOpen = $state(false);

	$effect(() => {
		if (form?.action === 'create' && form?.type === 'success') {
			dialogOpen = false;
			toast(form?.message);
			invalidateAll();
		}

		if (form?.type === 'error') {
			toast(form?.message);
		}

		isLoading = false;
	});

	$inspect(form);
</script>

<section>
	<Dialog.Root bind:open={dialogOpen}>
		<Dialog.Trigger class={buttonVariants({ variant: 'default' })}>Add Label</Dialog.Trigger>
		<Dialog.Content>
			<Dialog.Header>
				<Dialog.Title class="text-left">Add New Label</Dialog.Title>
				<Dialog.Description>
					<form
						class="mt-4 space-y-4"
						action="/labels?/create"
						method="POST"
						use:enhance={() => {
							isLoading = true;
						}}
					>
						<div>
							<Input
								tabindex={1}
								name="name"
								id="name"
								placeholder="Name of label"
								value={form?.data?.name ?? ''}
							/>
						</div>

						<div class="flex items-center justify-end gap-4">
							<Dialog.Close class={buttonVariants({ variant: 'secondary' })} tabindex={4}>
								Cancel
							</Dialog.Close>

							<Button type="submit" tabindex={2} disabled={isLoading}>
								{#if isLoading}
									<LoaderCircle class="size-5 animate-spin" />
								{:else}
									<span>Add</span>
								{/if}
							</Button>
						</div>
					</form>
				</Dialog.Description>
			</Dialog.Header>
		</Dialog.Content>
	</Dialog.Root>
</section>
