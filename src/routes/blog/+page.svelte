<script lang="ts">
	import { animate, stagger } from 'motion';
	import { onMount } from 'svelte';
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';

	import Arrow from 'lucide-svelte/icons/arrow-right';

	export let data;

	onMount(() => {
		animate('#posts', { opacity: 1, y: [-100, 0] }, { duration: 1, delay: stagger(0.1) });
	});
</script>

<svelte:head>
	<title>C@ Blog</title>

	<!-- Embed Card Details -->
	<meta property="og:type" content="article" />
	<meta content="C@ Blog" property="og:title" />
	<meta content="Candy Cat's blog." property="og:description" />
	<meta content="/banners/cat-blog.png" property="og:image" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:image" content="/banners/cat-blog.png" />
	<meta content="#6b30ff" data-react-helmet="true" name="theme-color" />
</svelte:head>

<div class="mx-auto max-w-screen-lg p-4 sm:p-8">
	<div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
		{#each data.posts as post}
			<Card.Root id="posts" class="w-full overflow-hidden opacity-0">
				<img
					src={post.banner}
					alt="Banner"
					class="aspect-w-3 aspect-h-1 w-full bg-slate-300 object-cover dark:bg-slate-900"
				/>
				<Card.Header>
					<Card.Title>{post.title}</Card.Title>
					<Card.Description>{post.description}</Card.Description>
				</Card.Header>
				<Card.Content>
					<Button href={post.slug} class="transition duration-300 ease-in-out hover:scale-95">
						Read <Arrow class="ml-2 h-4 w-4" />
					</Button>
				</Card.Content>
				<Card.Footer>
					<p class="text-slate-500">{post.date}</p>
				</Card.Footer>
			</Card.Root>
		{/each}
	</div>
</div>
