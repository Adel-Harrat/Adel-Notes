<script lang="ts">
	import Input from '$lib/components/ui/input/input.svelte';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import * as Avatar from '$lib/components/ui/avatar';
	import Button from '$lib/components/ui/button/button.svelte';
	import { Plus, Search } from 'lucide-svelte';

	const {
		name,
		img
	}: {
		name: string;
		img: string;
	} = $props();
</script>

<header class="mt-5 col-span-4 px-5 flex items-center justify-between gap-5">
	<div class="w-1/2 relative">
		<Input placeholder="Search Notes" class="indent-6" />

		<Search class="size-5 text-gray-500 absolute top-2.5 left-2" />
	</div>

	<div class="ml-auto">
		<Button variant="outline">
			<Plus />
			New Note
		</Button>
	</div>

	<div>
		<DropdownMenu.Root>
			<DropdownMenu.Trigger>
				<Avatar.Root>
					<Avatar.Image src={img} alt={`Image of ${name}`} />
					<Avatar.Fallback>{name.slice(0, 2).toUpperCase()}</Avatar.Fallback>
				</Avatar.Root>
			</DropdownMenu.Trigger>
			<DropdownMenu.Content>
				<DropdownMenu.Group>
					<DropdownMenu.Label>{name}</DropdownMenu.Label>
					<DropdownMenu.Separator />
					<DropdownMenu.Item href="/api/auth/logout" class="cursor-pointer">
						Log out
					</DropdownMenu.Item>
				</DropdownMenu.Group>
			</DropdownMenu.Content>
		</DropdownMenu.Root>
	</div>
</header>
