<script lang="ts">
	import { toggleMode } from 'mode-watcher';
	import { Button } from '$lib/components/ui/button';

	import Sun from 'lucide-svelte/icons/sun';
	import Moon from 'lucide-svelte/icons/moon';
	import Home from 'lucide-svelte/icons/home';
</script>

<header>
	<div class="static h-10 w-full bg-gradient-to-br from-violet-600 to-purple-600 blur-3xl" />
	<div class="absolute top-0 m-5 flex items-center gap-3">
		<Button on:click={toggleMode} variant="outline" size="icon">
			<Sun
				class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
			/>
			<Moon
				class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
			/>
			<span class="sr-only">Toggle theme</span>
		</Button>
		<Button variant="outline" href="/" size="icon"><Home class="h-4 w-4" /></Button>
	</div>
	<h1
		class="mt-5 text-center text-4xl font-bold underline decoration-indigo-500 underline-offset-4"
	>
		C@ BLOG
	</h1>
</header>

<slot />

<!-- <footer>Hello, I'm the footer.</footer> -->
