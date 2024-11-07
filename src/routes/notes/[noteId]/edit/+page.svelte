<script lang="ts">
	import { enhance } from '$app/forms';
	import { goto, invalidateAll } from '$app/navigation';
	import { Button, buttonVariants } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { Textarea } from '$lib/components/ui/textarea';
	import { LoaderCircle } from 'lucide-svelte';
	import type { ActionData, PageServerData } from './$types';
	import { toast } from 'svelte-sonner';
	import { Badge } from '$lib/components/ui/badge';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import { Checkbox } from '$lib/components/ui/checkbox';

	let { data, form }: { data: PageServerData; form: ActionData } = $props();

	let { id, title, content, status } = data.note;

	let isLoading = $state(false);

	$inspect(data);

	async function showFeedBack() {
		if (form?.type === 'success') {
			await invalidateAll();
			toast(form?.message);
			goto(`/notes/${id}`);
		}

		if (form?.type === 'error') {
			toast(form?.message);
		}

		isLoading = false;
	}

	$effect(() => {
		showFeedBack();
	});

	let selectedLabels: any = $state(data.note.labels);
</script>

<svelte:head>
	<title>Edit Note</title>
</svelte:head>

<section class="my-10">
	<form
		class="space-y-4"
		method="POST"
		use:enhance={() => {
			isLoading = true;
		}}
	>
		<div class="flex items-center justify-between border-b border-muted pb-4">
			<h1 class="text-3xl font-bold tracking-tight text-gray-900">Edit Note</h1>

			<div class="flex items-center justify-end gap-4">
				<a class={buttonVariants({ variant: 'outline' })} href="/notes/{id}">Cancel</a>

				<Button type="submit" disabled={isLoading}>
					{#if isLoading}
						<LoaderCircle class="size-5 animate-spin" />
					{:else}
						<span>Save Note</span>
					{/if}
				</Button>
			</div>
		</div>

		<div class="grid grid-cols-[2fr_1fr] gap-8">
			<div class="space-y-4">
				<div class="space-y-2">
					<Label for="title">Note Title</Label>
					<Input
						placeholder="Please type your note's title here"
						name="title"
						id="title"
						value={title}
						disabled={isLoading}
					/>
				</div>

				<div class="space-y-2">
					<Label for="content">Note Content</Label>
					<Textarea
						placeholder="Please type your note's content here"
						name="content"
						id="content"
						rows={5}
						value={content}
						disabled={isLoading}
					/>
				</div>
			</div>

			<div class="space-y-4">
				<div class="space-y-2 flex flex-col mt-4 gap-1">
					<Label for="status">Status</Label>

					<select
						class="border-input border rounded-lg text-sm *:text-gray-600 *:font-display focus:outline-none max-w-max disabled:opacity-70"
						name="status"
						id="status"
						value={status}
						disabled={isLoading}
					>
						<option value="NORMAL">Default</option>
						<option value="FAVORITED">Favorited</option>
						<option value="ARCHIVED">Archived</option>
						<option value="DELETED">Deleted</option>
					</select>
				</div>

				<div class="space-y-2">
					<Label for="content">Labels</Label>

					<input type="hidden" value={selectedLabels.map((i: any) => i.id)} name="selectedLabels" />

					<div class="flex items-center gap-2 flex-wrap">
						{#each selectedLabels as label (label.id)}
							<Badge variant="secondary">
								{label.name}
							</Badge>
						{/each}

						<Dialog.Root>
							<Dialog.Trigger>
								<Badge variant="default">Manage Labels</Badge>
							</Dialog.Trigger>
							<Dialog.Content class="max-w-lg">
								<Dialog.Header>
									<Dialog.Title class="mb-4">Add or Remove Labels</Dialog.Title>
									<Dialog.Description>
										<div class="grid grid-cols-3 gap-4">
											{#each data.availableLabels as label (label.id)}
												<div class="flex gap-1 items-center">
													<Checkbox
														id={label.id}
														value={label.id}
														checked={selectedLabels.some((i: any) => i.id === label.id)}
														onCheckedChange={(v: any) => {
															if (v) selectedLabels = [...selectedLabels, label];
															else
																selectedLabels = selectedLabels.filter(
																	(i: any) => i.id !== label.id
																);
														}}
													/>

													<div class="grid gap-1.5 leading-none">
														<Label
															for={label.id}
															class="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
														>
															{label.name}
														</Label>
													</div>
												</div>
											{/each}
										</div>

										<div class="mt-4 flex items-center justify-end">
											<Dialog.Close class={buttonVariants({ variant: 'default' })}
												>Okay</Dialog.Close
											>
										</div>
									</Dialog.Description>
								</Dialog.Header>
							</Dialog.Content>
						</Dialog.Root>
					</div>
				</div>
			</div>
		</div>
	</form>
</section>
