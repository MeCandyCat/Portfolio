<script lang="ts">
	import { onMount } from 'svelte';
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import Profile from '$lib/components/pfp.svelte';
	import Open from 'lucide-svelte/icons/square-arrow-out-up-right';
	import { animate } from 'motion';

	async function fetchData(url: string) {
		try {
			const response = await fetch(url);
			if (!response.ok) {
				throw new Error(`HTTP error! Status: ${response.status}`);
			}
			return await response.json();
		} catch (error) {
			console.error('Fetch error:', error);
			return null;
		}
	}

	async function fetchContributionsCount(username: string) {
		try {
			const events = await fetchData(`https://api.github.com/users/${username}/events`);
			if (!events) return 0;
			return events.length;
		} catch (error) {
			console.error('Error fetching contributions count:', error);
			return 0;
		}
	}

	async function fetchRepoCount(username: string) {
		try {
			const repos = await fetchData(`https://api.github.com/users/${username}/repos`);
			if (!repos) return 0;
			return repos.length;
		} catch (error) {
			console.error('Error fetching repository count:', error);
			return 0;
		}
	}

	let contributionsCount = '0';
	let repoCount = '0';

	function animateCount(id: string, value: string): void {
		const element = document.getElementById(id);
		if (element) {
			animate(
				progress => element.innerText = Math.round(progress * parseInt(value)).toLocaleString(),
				{ duration: 2, easing: 'ease-out' }
			);
		}
	}

	onMount(async () => {
		const username = 'mecandycat'; // GitHub username
		const contributions = await fetchContributionsCount(username);
		const repos = await fetchRepoCount(username);

		animateCount('contributions-count', contributions);
		animateCount('repo-count', repos);
	});
</script>

<div class="flex items-center justify-center">
	<Card.Root class="relative w-[350px] overflow-hidden">
		<img src="banners/github-banner.png" class="w-full" alt="Github Banner" />
		<img
			src="https://cdn.discordapp.com/assets/profile_effects/effects/2024-1-18/cyberpunk-uplinkerror/idle.png"
			alt="Esthetics"
			class="pointer-events-none absolute z-0 w-[350px] opacity-20 blur-xl dark:opacity-50"
			draggable="false"
		/>
		<div class="flex flex-col items-center py-5">
			<Profile Image1="profile/github.png" Image2="profile/github.gif" />
			<h5 class="z-10 col-span-4 mb-1 text-xl font-bold text-gray-900 dark:text-white">
				Candy Cat
			</h5>
			<span class="z-10 text-sm text-gray-500 dark:text-gray-400">@mecandycat</span>

			<p class="z-10 px-1 pt-1 text-center">
				I have contributed <span id="contributions-count" class="font-semibold text-sky-500"
					>{contributionsCount}</span
				>
				commits and have been working on
				<span id="repo-count" class="font-semibold text-sky-500">{repoCount}</span> repositories.<br
				/>
				<span class="text-slate-500">Ignore old bad-code projects.</span>
			</p>

			<div class="z-10 mt-4 flex md:mt-6">
				<Button
					href="https://github.com/MeCandyCat/"
					target="_blank"
					class="transition duration-300 ease-in-out hover:scale-95"
				>
					<Open class="mr-2 h-4 w-4" />Github
				</Button>
			</div>
		</div>
		<div class="h-5 w-full animate-pulse bg-sky-600 opacity-20 blur-xl dark:opacity-50" />
	</Card.Root>
</div>
