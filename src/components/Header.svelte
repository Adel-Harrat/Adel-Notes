<script lang="ts">
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import * as Avatar from '$lib/components/ui/avatar';
	import ModeToggler from './ModeToggler.svelte';
	import SearchForm from './SearchForm.svelte';
	const {
		name,
		nameFallback,
		img
	}: {
		name: string | undefined;
		nameFallback: string | undefined;
		img: string;
	} = $props();
</script>

<header class="col-span-4 px-5 mt-5 flex items-center justify-between gap-3 z-0">
	<div class="w-1/2">
		<SearchForm />
	</div>

	<div class="ml-auto">
		<ModeToggler />
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
