<script lang="ts">
	import Input from '$lib/components/ui/input/input.svelte';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import * as Avatar from '$lib/components/ui/avatar';
	import { Search } from 'lucide-svelte';
	import { page } from '$app/stores';

	const {
		name,
		nameFallback,
		img
	}: {
		name: string;
		nameFallback: string;
		img: string;
	} = $props();

	let searchQuery = $state($page.url.searchParams.get('q'));

	$effect(() => {
		searchQuery = $page.url.searchParams.get('q');
	});
</script>

<header class="col-span-4 px-5 flex items-center justify-between gap-5 mt-5">
	<form method="GET" action="/search" class="w-1/2 relative">
		<Input
			placeholder="Search Notes"
			class="indent-6"
			type="search"
			name="q"
			bind:value={searchQuery}
			id="search-input"
		/>

		<Search class="pointer-events-none size-5 text-gray-500 absolute top-2.5 left-2" />
	</form>

	<div class="mt-2">
		<DropdownMenu.Root>
			<DropdownMenu.Trigger>
				<Avatar.Root>
					<Avatar.Image src={img} alt={`${name}`} />
					<Avatar.Fallback>
						<img
							src="/placeholder/fallback.png"
							class="bg-background shadow-md size-full flex items-center justify-center"
							alt={nameFallback}
						/>
					</Avatar.Fallback>
				</Avatar.Root>
			</DropdownMenu.Trigger>
			<DropdownMenu.Content side="bottom">
				<DropdownMenu.Group>
					<DropdownMenu.Label>{name}</DropdownMenu.Label>
					<DropdownMenu.Separator />
					<a href="/api/auth/logout">
						<DropdownMenu.Item class="cursor-pointer">Log out</DropdownMenu.Item>
					</a>
				</DropdownMenu.Group>
			</DropdownMenu.Content>
		</DropdownMenu.Root>
	</div>
</header>
