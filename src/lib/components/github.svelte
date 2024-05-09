<script lang="ts">
	import { onMount } from 'svelte';
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';

	import Profile from '$lib/components/pfp.svelte';
	import Open from 'lucide-svelte/icons/square-arrow-out-up-right';

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

	onMount(async () => {
		const username = 'mecandycat'; // GitHub username
		contributionsCount = await fetchContributionsCount(username);
		repoCount = await fetchRepoCount(username);
	});
</script>

<div class="flex justify-center items-center my-5">
	<Card.Root class="w-[350px] overflow-hidden relative">
		<img src="https://i.imgur.com/3Fz3FGO.png" class="w-full" alt="Github Banner" />
		<img
			src="https://cdn.discordapp.com/assets/profile_effects/effects/2024-1-18/cyberpunk-uplinkerror/idle.png"
			alt="Esthetics"
			class="absolute w-[350px] opacity-20 dark:opacity-50 blur-xl z-0 pointer-events-none"
			draggable="false"
		/>
		<div class="flex flex-col items-center py-5">
			<Profile
				Image1="https://avatars.githubusercontent.com/u/116643898?v=4"
				Image2="https://i.ibb.co/ByyS0hb/discord-avatar-512-J3-RAB.gif"
			/>
			<h5 class="mb-1 text-xl font-bold text-gray-900 dark:text-white col-span-4 z-10">
				Candy Cat
			</h5>
			<span class="text-sm text-gray-500 dark:text-gray-400 z-10">@mecandycat</span>

			<p class="px-1 text-center pt-1 z-10">
				I have contributed <span id="contributions-count" class="text-sky-500 font-semibold"
					>{contributionsCount}</span
				>
				commits and have been working on
				<span id="repo-count" class="text-sky-500 font-semibold">{repoCount}</span> repositories.<br
				/>
				<span class="text-slate-500">Ignore old bad-code projects.</span>
			</p>

			<div class="flex mt-4 md:mt-6 z-10">
				<Button
					href="https://github.com/MeCandyCat/"
					target="_blank"
					class="transition duration-300 ease-in-out hover:scale-95"
				>
					<Open class="mr-2 h-4 w-4" />Github
				</Button>
			</div>
		</div>
		<div class="bg-sky-600 w-full h-5 blur-xl opacity-20 dark:opacity-50 animate-pulse" />
	</Card.Root>
</div>
