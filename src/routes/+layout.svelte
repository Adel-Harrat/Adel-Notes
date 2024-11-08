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
	import { Button } from '$lib/components/ui/button';
	import { AlignJustify } from 'lucide-svelte';

	let { children, data } = $props();
	const { img, name, nameFallback } = data.user;

	const isOnline = $state(browser ? navigator.onLine : false);

	$effect(() => {
		if (!isOnline) {
			toast('You are offline');
		}
	});

	let isLabelsMenuOpen = $derived(data.labels.length > 4 ? false : true);
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

			<Button size="icon" variant="secondary">
				<AlignJustify class="!size-5" />
			</Button>
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
