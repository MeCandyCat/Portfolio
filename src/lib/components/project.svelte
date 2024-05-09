<script lang="ts">
	import { onMount } from 'svelte';
	import Circle from 'lucide-svelte/icons/circle';
	import Star from 'lucide-svelte/icons/star';
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import { getRepositoryDetails } from '$lib/components/githubutils';

	export let username: string;
	export let repositoryName: string;

	let repoDetails: {
		name: string;
		description: string;
		language: string;
		stars: number;
		lastUpdatedDate: string | null;
	} = {
		name: '',
		description: '',
		language: '',
		stars: 0,
		lastUpdatedDate: null
	};

	onMount(async () => {
		try {
			repoDetails = await getRepositoryDetails(username, repositoryName);

			// Format last updated date to "DD/MM/YYYY" if available
			if (repoDetails.lastUpdatedDate) {
				repoDetails.lastUpdatedDate = formatDateISO8601(repoDetails.lastUpdatedDate);
			}
		} catch (error) {
			console.error('Error fetching repository details:', error);
		}
	});

	function formatDateISO8601(isoDateString: string): string {
		const date = new Date(isoDateString);
		const day = date.getUTCDate().toString().padStart(2, '0');
		const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
		const year = date.getUTCFullYear().toString();
		return `${day}/${month}/${year}`;
	}
</script>

<Card.Root class="w-[500px]">
	<Card.Header class="grid grid-cols-[1fr_110px] items-start gap-4 space-y-0">
		<div class="space-y-1">
			<Card.Title>{repoDetails.name}</Card.Title>
			<Card.Description>{repoDetails.description}</Card.Description>
		</div>
		<Button
			variant="secondary"
			class="px-3 shadow-none transition duration-300 ease-in-out hover:scale-95"
			href={`https://github.com/${username}/${repositoryName}`}
			target="_blank"
		>
			<Star class="mr-2 h-4 w-4" />
			Star
		</Button>
	</Card.Header>
	<Card.Content>
		<div class="flex space-x-4 text-sm text-muted-foreground">
			<div class="flex items-center">
				<Circle class="mr-1 h-3 w-3 text-sky-400" />
				{repoDetails.language}
			</div>
			<div class="flex items-center">
				<Star class="mr-1 h-3 w-3" />
				{repoDetails.stars} stars
			</div>
			<div>
				{#if repoDetails.lastUpdatedDate}
					<p>Updated: {repoDetails.lastUpdatedDate}</p>
				{:else}
					<p>Updated: <span class="text-slate-500">Loading...</span></p>
				{/if}
			</div>
		</div>
	</Card.Content>
</Card.Root>
