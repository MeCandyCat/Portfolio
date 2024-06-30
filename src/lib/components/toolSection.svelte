<script lang="ts">
	import { onMount } from 'svelte';
	import { animate } from 'motion';
	import Tool from './tool.svelte';
	import toolsList from '$lib/tools';

	let tools: typeof toolsList = [...toolsList, ...toolsList];
	let toolsContainer: HTMLElement;

	let animation: any;
	onMount(() => {
		animation = animate(
			'.tools',
			{ translate: [0, -toolsContainer.scrollWidth / 2] },
			{ duration: 30, repeat: Infinity, easing: 'linear' }
		);
	});
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
	bind:this={toolsContainer}
	on:mouseenter={() => animation.pause()}
	on:mouseleave={() => animation.play()}
	class="overflow-clip px-4"
>
	<div class="tools flex flex-nowrap">
		{#each tools as tool}
			<Tool {...tool} />
		{/each}
	</div>
</div>
