<script lang="ts">
	import { onMount } from 'svelte';
	import * as Card from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';
	import Crown from 'lucide-svelte/icons/crown';
	import { animate } from 'motion';

	let chessStats = { rapid: { rating: 0 }, total: { wins: 0, losses: 0, draws: 0 } };

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
		const data = await fetchData('/api/chess');
		if (data) {
			chessStats = data;
			animateCount('rapidRating', chessStats.rapid.rating);
			animateCount('totalWins', chessStats.total.wins);
			animateCount('totalLosses', chessStats.total.losses);
			animateCount('totalDraws', chessStats.total.draws);
		}
	});
</script>

<div class="flex justify-center">
	<Card.Root
		class="relative w-full justify-center overflow-hidden bg-slate-50 dark:bg-emerald-950/50 sm:w-[500px]"
	>
		<img
			src="https://cdn.discordapp.com/assets/profile_effects/effects/2024-05-13/haunted-man-o-war/idle.png"
			alt="Esthetics"
			class="pointer-events-none absolute z-0 w-full opacity-25 blur-xl dark:opacity-10"
			draggable="false"
		/>
		<Card.Header class="items-center space-x-2">
			<img src="/icons/chess.com.png" alt="Chess.com logo" class="h-14" />
			<Card.Title class="text-xl font-bold text-green-600 dark:text-green-400">Chess.com</Card.Title
			>
			<Card.Description class="overflow-hidden text-center text-sm text-black dark:text-white">
				Statistics of my Chess performance from Chess.com. Chess.com is one of the most popular
				online chess sites.
			</Card.Description>
		</Card.Header>
		<Card.Content>
			<div class="grid grid-cols-2 gap-2 text-center">
				<div class="mb-4 sm:mb-0">
					<p class="text-base text-emerald-400 sm:text-lg">
						<span class="text-sm text-gray-900 dark:text-gray-200 sm:text-base">Rapid Rating:</span>
						<br />
						<span id="rapidRating" class="font-bold">0</span>
					</p>
				</div>
				<div class="mb-4 sm:mb-0">
					<p class="text-base text-emerald-400 sm:text-lg">
						<span class="text-sm text-gray-900 dark:text-gray-200 sm:text-base">Total Wins:</span>
						<br />
						<span id="totalWins" class="font-bold">0</span>
					</p>
				</div>
				<div class="mb-4 sm:mb-0">
					<p class="text-base text-emerald-400 sm:text-lg">
						<span class="text-sm text-gray-900 dark:text-gray-200 sm:text-base">Total Losses:</span>
						<br />
						<span id="totalLosses" class="font-bold">0</span>
					</p>
				</div>
				<div>
					<p class="text-base text-emerald-400 sm:text-lg">
						<span class="text-sm text-gray-900 dark:text-gray-200 sm:text-base">Total Draws:</span>
						<br />
						<span id="totalDraws" class="font-bold">0</span>
					</p>
				</div>
			</div>
		</Card.Content>
		<Card.Footer class="mt-2 flex flex-wrap items-center justify-center space-x-2">
			<Button
				href="https://www.chess.com/member/candycat"
				target="_blank"
				class="transition duration-300 ease-in-out hover:scale-95"
			>
				<Crown class="mr-2 h-4 w-4" /> Profile
			</Button>
		</Card.Footer>
	</Card.Root>
</div>
