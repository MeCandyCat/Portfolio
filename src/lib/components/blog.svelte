<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import News from 'lucide-svelte/icons/newspaper';
</script>

<div class="relative flex items-center justify-center overflow-hidden">
	<Card.Root
		class="animate-fadeIn h-[300px] w-full transform rounded-none bg-gradient-to-r from-indigo-500/50 text-center transition-transform duration-500 ease-in-out hover:scale-105 dark:from-indigo-500/20"
	>
		<Card.Header class="absolute inset-0 flex flex-col items-center justify-center space-y-4">
			<Card.Title class="text-4xl font-bold">Check Out C@ BLOG</Card.Title>
			<Card.Description class="text-lg text-gray-800 dark:text-gray-200">
				Discover insightful articles and updates on my blog.<br />C@ stands for "cat".
			</Card.Description>
			<Button href="/blog" class="mt-4"><News class="mr-2 h-4 w-4" />Visit Blog</Button>
		</Card.Header>
	</Card.Root>
</div>
