<script lang="ts">
	import type { PageData } from './$types';
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import * as Tooltip from '$lib/components/ui/tooltip/index.js';
	import Search from '$lib/components/searchBar.svelte';
	import Arrow from 'lucide-svelte/icons/arrow-right';
	import Sparkles from 'lucide-svelte/icons/sparkles';

	export let data: PageData;

	let filteredPosts = data.posts;

	function handleSearch(query: string) {
		const lowercaseQuery = query.toLowerCase();
		filteredPosts = data.posts.filter(
			(post) =>
				post.title.toLowerCase().includes(lowercaseQuery) ||
				post.description.toLowerCase().includes(lowercaseQuery)
		);
	}
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
	<div class="mb-6">
		<Search onSearch={handleSearch} />
	</div>

	{#if filteredPosts.length === 0}
		<p class="pt-[20vh] text-center text-slate-500">No results found</p>
	{:else}
		<div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
			{#each filteredPosts as post}
				<Card.Root class="relative flex w-full flex-col overflow-hidden">
					<div class="relative">
						<img
							src={post.banner}
							alt="Banner"
							class="aspect-h-1 w-full bg-slate-300 object-cover dark:bg-slate-900"
						/>
						{#if post.interactive}
							<Tooltip.Root>
								<div class="absolute left-2 top-2">
									<Tooltip.Trigger>
										<div
											class="flex h-6 w-6 items-center justify-center rounded-full text-white opacity-50 backdrop-blur-3xl transition duration-300 ease-in-out hover:opacity-100"
										>
											<Sparkles class="h-4 w-4" />
										</div>
									</Tooltip.Trigger>
									<Tooltip.Content>
										<div>interactive</div>
									</Tooltip.Content>
								</div>
							</Tooltip.Root>
						{/if}
					</div>
					<Card.Header>
						<Card.Title>{post.title}</Card.Title>
						<Card.Description>{post.description}</Card.Description>
					</Card.Header>
					<Card.Content class="flex-grow" />
					<Card.Footer class="flex flex-col space-y-2">
						<Button
							href="blog/{post.slug}"
							class="transition duration-300 ease-in-out hover:scale-95"
						>
							Read <Arrow class="ml-2 h-4 w-4" />
						</Button>
						<p class="text-sm text-slate-500">{post.date}</p>
					</Card.Footer>
				</Card.Root>
			{/each}
		</div>
	{/if}
</div>
