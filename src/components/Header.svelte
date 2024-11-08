<script lang="ts">
	import Input from '$lib/components/ui/input/input.svelte';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import * as Avatar from '$lib/components/ui/avatar';
	import { Search } from 'lucide-svelte';
	import { page } from '$app/stores';

	import { toggleMode } from 'mode-watcher';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Moon, Sun } from 'lucide-svelte';

	const {
		name,
		nameFallback,
		img
	}: {
		name: string | undefined;
		nameFallback: string | undefined;
		img: string;
	} = $props();

	let searchQuery = $state($page.url.searchParams.get('q'));

	$effect(() => {
		searchQuery = $page.url.searchParams.get('q');
	});
</script>

<header class="col-span-4 px-5 mt-5 flex items-center justify-between gap-3 z-0">
	<form method="GET" action="/search" class="w-1/2 relative">
		<Input
			placeholder="Search Notes"
			class="indent-6"
			type="search"
			name="q"
			bind:value={searchQuery}
			id="search-input"
		/>

		<Search class="pointer-events-none size-5 text-foreground absolute top-2.5 left-2" />
	</form>

	<div class="ml-auto">
		<Button onclick={toggleMode} variant="secondary" size="icon" class="rounded-full">
			<Sun
				class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
			/>
			<Moon
				class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
			/>
			<span class="sr-only">Toggle theme</span>
		</Button>
	</div>

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
