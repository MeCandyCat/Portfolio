<script lang="ts">
	import Marquee from './marquee.svelte';
	import Tool from './tool.svelte';
	import toolsList from '$lib/tools';
</script>

<Marquee fade={true} pauseOnHover={true}>
	{#each toolsList as tool}
		<Tool {...tool} />
	{/each}
</Marquee>
