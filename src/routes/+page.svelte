<script lang="ts">
	import { toggleMode, ModeWatcher } from 'mode-watcher';
	import { Button } from '$lib/components/ui/button';
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
	<p class="leading-7 mt-6 lg:px-28 sm:px-10 text-xl text-justify">
		Hello! I'm Candy Cat, a developer with a passion for creating efficient and user-friendly web
		solutions. With few years of experience in web development, I specialize in <span
			class="text-red-500 font-semibold">Svelte</span
		>
		& <span class="text-blue-500 font-semibold">Tailwind CSS</span>. My goal is to contribute
		valuable code and innovative ideas to projects that make a difference. I've worked on various
		projects, including Discord Bot and curruntly working on a sectrect project soon to be open
		sourse. These experiences have honed my problem-solving skills and taught me the importance of
		writing clean, maintainable code. I enjoy collaborating with teams to tackle challenges and
		deliver high-quality solutions. Outside of coding, I like to stay updated with the latest
		developments in technology and explore new tools that can enhance my productivity. I believe in
		continuous learning and enjoy experimenting with different technologies to expand my skill set.
		I mostly work with my friend
		<a
			href="https://mud.fretro.com/"
			target="_blank"
			class="text-orange-500 underline decoration-dashed underline-offset-4 hover:opacity-75"
			>@mud</a
		> to build websites. We started Fretro to share our work to the world.
	</p>

	<div class="grid lg:grid-cols-2 sm:grid-cols-1">
		<Discord />
		<Github />
	</div>

	<ModeWatcher />
</div>
