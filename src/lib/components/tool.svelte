<script>
	import * as Card from '$lib/components/ui/card';
	import { Badge } from '$lib/components/ui/badge';

	export let name;
	export let icon;
	export let description;
	export let badgeText;

	const getBadgeColor = (/** @type {string} */ text) => {
		switch (text.toLowerCase()) {
			case 'app':
				return 'bg-blue-500 hover:bg-blue-600';
			case 'library':
				return 'bg-green-500 hover:bg-green-600';
			default:
				return 'bg-slate-500 hover:bg-slate-600';
		}
	};
</script>

<Card.Root class="group relative m-2 flex items-center p-4 shadow-sm">
	<img
		class="mr-4 h-12 w-12 grayscale transition duration-300 ease-in-out group-hover:grayscale-0"
		src={icon}
		alt="{name} icon"
	/>
	<div>
		<div class="text-lg font-semibold">{name}</div>
		<div class="text-sm text-gray-600">{description}</div>
	</div>
	{#if badgeText}
		<Badge class={`absolute right-2 top-2 ${getBadgeColor(badgeText)}`}>
			{badgeText}
		</Badge>
	{/if}
</Card.Root>
