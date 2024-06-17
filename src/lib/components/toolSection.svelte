<script lang="ts">
	import Tool from './tool.svelte';
	import toolsList from '$lib/tools';
</script>

<div class="flex flex-wrap justify-around space-x-4 p-4">
	{#each toolsList as tool}
		<Tool {...tool} />
	{/each}
</div>
