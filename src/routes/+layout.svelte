<script lang="ts">
	import { ModeWatcher } from 'mode-watcher';
	import '../app.css';
	import Aside from '../components/Aside/Aside.svelte';
	import Header from '../components/Header.svelte';
	import { Toaster } from '$lib/components/ui/sonner/index.js';
	import { browser } from '$app/environment';
	import { toast } from 'svelte-sonner';
	import { ScrollArea } from '$lib/components/ui/scroll-area/index.js';
	import Logo from '../components/Aside/Logo.svelte';
	import { Button, buttonVariants } from '$lib/components/ui/button';
	import { AlignJustify } from 'lucide-svelte';
	import * as Drawer from '$lib/components/ui/drawer/index.js';
	import Links from '../components/Aside/Links.svelte';
	import ModeToggler from '../components/ModeToggler.svelte';
	import SearchForm from '../components/SearchForm.svelte';

	let { children, data } = $props();
	const { img, name, nameFallback } = data.user;

	const isOnline = $state(browser ? navigator.onLine : false);

	$effect(() => {
		if (!isOnline) {
			toast('You are offline');
		}
	});

	let isLabelsMenuOpen = $derived(data.labels.length > 4 ? false : true);
	let isMobileDrawerOpen = $state(false);
	let closeMobileDrawer = () => {
		isMobileDrawerOpen = false;
	};
</script>

<svelte:head>
	<title>Adel Notes</title>
</svelte:head>

<section class="grid grid-cols-1 md:grid-cols-[250px_1fr]">
	<div class="md:h-dvh hidden md:block md:fixed md:w-[250px]">
		<ScrollArea class="h-full">
			<Aside labels={data.labels} {isLabelsMenuOpen} />
		</ScrollArea>
	</div>

	<div class="md:col-start-2">
		<div class="md:hidden flex items-center justify-between px-5 mt-5">
			<Logo />

			<Drawer.Root bind:open={isMobileDrawerOpen}>
				<Drawer.Trigger class={buttonVariants({ variant: 'secondary', size: 'icon' })}>
					<AlignJustify class="!size-5" />
				</Drawer.Trigger>
				<Drawer.Content>
					<Drawer.Header>
						<Drawer.Title>Adel Notes</Drawer.Title>
						<Drawer.Description>Save your next billion dollars idea</Drawer.Description>
					</Drawer.Header>

					<div class="mb-5">
						<Links labels={data.labels} {isLabelsMenuOpen} {closeMobileDrawer} />
					</div>

					<Drawer.Footer>
						<div class="flex items-center justify-between gap-4">
							<ModeToggler />

							<SearchForm onSearch={closeMobileDrawer} />
						</div>
					</Drawer.Footer>
				</Drawer.Content>
			</Drawer.Root>
		</div>

		<div class="hidden md:block">
			<Header img={img ?? ''} {name} {nameFallback} />
		</div>

		<main class="px-5 py-5">
			<ModeWatcher />
			{@render children?.()}
		</main>
	</div>
</section>

<Toaster />
