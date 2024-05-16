<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';

	import News from 'lucide-svelte/icons/newspaper';
</script>

<div class="mb-6 flex items-center justify-center">
	<Card.Root
		class="w-[450px] overflow-hidden bg-gradient-to-r from-indigo-500/50 text-center dark:from-indigo-500/20"
	>
		<Card.Header>
			<Card.Title>Check Out C@ BLOG</Card.Title>
			<Card.Description>take a look at my blog page.<br /> C@ stands for "cat".</Card.Description>
		</Card.Header>
		<Card.Content>
			<Button href="/blog"><News class="mr-2 h-4 w-4" />Blog</Button>
		</Card.Content>
	</Card.Root>
</div>
