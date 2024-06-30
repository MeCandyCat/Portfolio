<script lang="ts">
	import { onMount } from 'svelte';
	import Circle from 'lucide-svelte/icons/circle';
	import Star from 'lucide-svelte/icons/star';
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import { getRepositoryDetails } from '$lib/components/githubutils';
	import { animate } from 'motion';
	import colorsJSON from './colors.json';

	const getLangColor = (lang: string): string => {
		interface LanguageColors {
			[key: string]: {
				color: string | null;
				url: string | null;
			};
		}
		const colorsData: LanguageColors = colorsJSON;
		return colorsData[lang].color || '#38bdf8';
	};

	export let username: string;
	export let repositoryName: string;

	interface RepoDetails {
		name: string;
		description: string;
		language: string;
		stars: number | 0;
		lastUpdatedDate?: string | null;
		color?: string | null;
	}

	let repoDetails: RepoDetails = {
		name: '',
		description: '',
		language: '',
		stars: 0,
		lastUpdatedDate: null,
		color: null
	};

	function animateCount(id: string, value: number): void {
		const element = document.getElementById(id);
		if (element) {
			animate(
				(progress) => {
					const animatedValue = Math.round(progress * value);
					element.innerText = animatedValue.toString();
				},
				{ duration: 2, easing: 'ease-out' }
			);
		}
	}

	onMount(async () => {
		try {
			repoDetails = await getRepositoryDetails(username, repositoryName);

			// Format last updated date to "DD/MM/YYYY" if available
			if (repoDetails.lastUpdatedDate) {
				repoDetails.lastUpdatedDate = formatDateISO8601(repoDetails.lastUpdatedDate);
			}

			repoDetails.color = getLangColor(repoDetails.language);

			// Animate the stars count
			animateCount('starsCount', repoDetails.stars);
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
			<Card.Title>
				{#if repoDetails?.name}
					{repoDetails.name}
				{:else}
					<div class="h-3 w-32 animate-pulse rounded-full bg-gray-300 dark:bg-gray-600" />
				{/if}
			</Card.Title>
			<Card.Description>
				{#if repoDetails?.description}
					{repoDetails.description}
				{:else}
					<div role="status" class="max-w-lg animate-pulse space-y-3">
						<div class="flex w-full items-center">
							<div class="h-3 w-32 rounded-full bg-gray-200 dark:bg-gray-700"></div>
							<div class="ms-2 h-3 w-24 rounded-full bg-gray-300 dark:bg-gray-600"></div>
							<div class="ms-2 h-3 w-full rounded-full bg-gray-300 dark:bg-gray-600"></div>
						</div>
					</div>
				{/if}
			</Card.Description>
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
		<div class="flex items-center space-x-4 text-sm text-muted-foreground">
			<div class="flex items-center">
				<Circle class="mr-1 h-3 w-3" style="color:{repoDetails?.color}" />
				{#if repoDetails?.language}
					<p>{repoDetails.language}</p>
				{:else}
					<div class="h-3 w-24 animate-pulse rounded-full bg-gray-200 dark:bg-gray-700" />
				{/if}
			</div>
			<div class="flex items-center">
				<Star class="mr-1 h-3 w-3" />
				<p id="starsCount">{repoDetails.stars || 0}</p>
			</div>
			<div class="flex items-center">
				{#if repoDetails?.lastUpdatedDate}
					<p>Updated: {repoDetails.lastUpdatedDate}</p>
				{:else}
					<p>Updated: <span class="animate-pulse text-slate-500">Loading...</span></p>
				{/if}
			</div>
		</div>
	</Card.Content>
</Card.Root>
