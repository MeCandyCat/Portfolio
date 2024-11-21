<script lang="ts">
	import { onMount } from 'svelte';
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import Profile from '$lib/components/pfp.svelte';
	import Play from 'lucide-svelte/icons/youtube';
	import { animate } from 'motion';

	let subscriberCount: string | null = '0';
	let videoCount: string | null = '0';
	let totalViewCount: string | null = '0';

	async function fetchChannelData(): Promise<void> {
		try {
			const response = await fetch('/api/youtube');
			const data = await response.json();
			if (response.ok) {
				animateCount('subscriberCount', data.subscriberCount);
				animateCount('videoCount', data.videoCount);
				animateCount('totalViewCount', data.totalViewCount);
			} else {
				console.error('Error fetching data:', data.error);
			}
		} catch (error) {
			console.error('Error fetching data:', error);
		}
	}

	function animateCount(id: string, value: string): void {
		const element = document.getElementById(id);
		if (element) {
			animate(
				(progress) => (element.innerText = Math.round(progress * parseInt(value)).toLocaleString()),
				{ duration: 2, easing: 'ease-out' }
			);
		}
	}

	onMount(() => {
		fetchChannelData();
	});
</script>

<div class="flex items-center justify-center">
	<Card.Root class="relative w-[350px] overflow-hidden">
		<img src="banners/youtube-channel-art.png" class="w-full" alt="YouTube Channel Art" />
		<img
			src="https://cdn.discordapp.com/assets/profile_effects/effects/2023-9-25/sayan/loop.png"
			alt="Esthetics"
			class="pointer-events-none absolute z-0 w-[350px] opacity-10 blur-xl dark:opacity-50"
			draggable="false"
		/>
		<div class="flex flex-col items-center py-5">
			<Profile Image1="profile/youtube.png" Image2="profile/youtube.gif" />
			<h5 class="z-10 col-span-4 mb-1 text-xl font-bold text-gray-900 dark:text-white">
				Candy Cat
			</h5>
			<span class="z-10 text-sm text-gray-500 dark:text-gray-400">@candycatmc</span>

			<p class="z-10 px-1 pt-1 text-center">
				I have posted <span id="videoCount" class="font-semibold text-sky-500">{videoCount}</span>
				videos and gained
				<span id="subscriberCount" class="font-semibold text-sky-500">{subscriberCount}</span>
				subscribers. Total
				<span id="totalViewCount" class="font-semibold text-sky-500">{totalViewCount}</span>
				views.<br />
				<span class="text-slate-500">Minecraft Youtuber.</span>
			</p>

			<div class="z-10 mt-4 flex md:mt-6">
				<Button href="/channelytics" class="transition duration-300 ease-in-out hover:scale-95">
					<Play class="mr-2 h-4 w-4" />Channelytics
				</Button>
			</div>
		</div>
		<div class="h-5 w-full animate-pulse bg-red-600 opacity-10 blur-xl dark:opacity-50" />
	</Card.Root>
</div>
