<script>
	import { animate, scroll, stagger } from 'motion';
	import { onMount } from 'svelte';

	import { Button } from '$lib/components/ui/button';
	import Arrow from 'lucide-svelte/icons/arrow-left';

	export let data;

	onMount(() => {
		scroll(animate('.progress', { scaleX: [0, 1] }));
	});

	// animate("li", { x: 100 }, { delay: stagger(0.1) })
</script>

<svelte:head>
	<title>{data.title}</title>

	<!-- Embed Card Details -->
	<meta property="og:type" content="article" />
	<meta content="C@ Blog" property="og:title" />
	<meta content="{data.title}" property="og:description" />
	<meta content={data.banner} property="og:image" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:image" content={data.banner} />
	<meta content="#6141e8" data-react-helmet="true" name="theme-color" />
</svelte:head>

<div class="progress fixed bottom-0 h-1 w-full scale-0 rounded-full bg-indigo-500" />
<div class="mx-auto max-w-screen-lg px-8">
	<Button variant="outline" href="/blog" class="my-4"><Arrow class="h-4 w-4" /></Button>
	<h1 class="text-6xl font-bold text-violet-500">{data.title}</h1>

	<p class="pb-4 text-slate-500">Published: {data.date}</p>
	<img src={data.banner} alt="Banner" class="rounded-3xl" />

	<article class="prose prose-lg min-w-full pb-4 dark:prose-invert dark:prose-pre:bg-slate-900">
		<svelte:component this={data.content} />
	</article>
</div>
