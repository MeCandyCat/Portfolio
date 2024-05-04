<script lang="ts">
	import { toggleMode } from 'mode-watcher';
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import Profile from './pfp.svelte';
	import Discord from './discord.svelte';
	import Github from './github.svelte';

	import Sun from 'lucide-svelte/icons/sun';
	import Moon from 'lucide-svelte/icons/moon';
</script>

<div class="overflow-x-hidden">
	<div class="w-full h-10 bg-gradient-to-br from-violet-600 to-indigo-600 blur-3xl static" />
	<div class="absolute top-0">
		<Button on:click={toggleMode} variant="outline" size="icon" class="m-5">
			<Sun
				class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
			/>
			<Moon
				class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
			/>
			<span class="sr-only">Toggle theme</span>
		</Button>
	</div>
	<h1
		class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-center pt-10 bg-gradient-to-br from-violet-600 to-indigo-600 bg-clip-text text-transparent"
	>
		Hello World
	</h1>
	<h1
		class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-center pt-10 pr-24 pb-4"
	>
		I am
	</h1>
	<div class="flex justify-center items-center">
		<Profile Image1="https://i.imgur.com/t55pTul.png" Image2="https://i.imgur.com/sNXB99e.gif" />
	</div>
	<h2
		class="-rotate-5 text-center text-8xl font-bold bg-gradient-to-b from-slate-900 dark:from-slate-50 to-violet-600 dark:to-violet-600 bg-clip-text text-transparent pb-24"
	>
		Candy Cat
	</h2>
	<p class="leading-7 mt-6 lg:px-28 sm:px-10 text-lg">
		I love creating random projects most importantly in dark mode. So me and my friend <a
			href="https://mud.fretro.com/"
			target="_blank"
			class="text-orange-500 underline decoration-dashed underline-offset-4 hover:opacity-75"
			>@mud</a
		> started Fretro. We decided to host our projects under a subdomain Fretro.com unlimited subdomains?
		hummm.. portfolio it is. I am not super talented but i wanted to make a website about my self. It's
		low key a flex. I am mostly active on Discord if you want to contact me for some reason details below.
	</p>

	<div class="grid lg:grid-cols-2 sm:grid-cols-1">
		<Discord />
		<Github />
	</div>
</div>
