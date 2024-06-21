<script lang="ts">
	import { onMount } from 'svelte';
	import * as Card from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';
	import Crown from 'lucide-svelte/icons/crown';

	let chessStats = { rapid: { rating: 0 }, total: { wins: 0, losses: 0, draws: 0 } };
	let loading = true;

	onMount(async () => {
		try {
			const response = await fetch('/api/chess');
			const data = await response.json();
			chessStats = data;
		} catch (error) {
			console.error('Failed to fetch data', error);
		} finally {
			loading = false;
		}
	});
</script>

<div class="flex justify-center">
	<Card.Root class="relative w-[500px] overflow-hidden bg-slate-50 dark:bg-emerald-950/50 justify-center">
		<img
			src="https://cdn.discordapp.com/assets/profile_effects/effects/2024-05-13/haunted-man-o-war/idle.png"
			alt="Esthetics"
			class="pointer-events-none absolute z-0 w-full opacity-50 blur-xl dark:opacity-10"
			draggable="false"
		/>
		<Card.Header class="items-center space-x-2">
			<img src="/icons/chess.com.png" alt="Chess.com logo" class="h-14" />
			<Card.Title class="text-xl font-bold text-green-600 dark:text-green-400"
				>Chess.com</Card.Title
			>
			<Card.Description class="overflow-hidden text-center text-sm text-black dark:text-white">
				Statistics of my Chess performance from Chess.com. Chess.com is one of the most popular online chess site.
			</Card.Description>
		</Card.Header>
		<Card.Content>
			{#if loading}
				<p class="text-center">Loading...</p>
			{:else}
				<div class="grid grid-cols-2 text-center">
					<div class="mb-2 text-lg text-emerald-400">
						<span class="text-sm text-gray-900 dark:text-gray-200">Rapid Rating:</span>
                        <br />
						<span class="font-bold">{chessStats.rapid.rating}</span>
					</div>
					<div class="mb-2 text-lg text-emerald-400">
						<span class="text-sm text-gray-900 dark:text-gray-200">Total Wins:</span>
                        <br />
						<span class="font-bold">{chessStats.total.wins}</span>
					</div>
					<div class="mb-2 text-lg text-emerald-400">
						<span class="text-sm text-gray-900 dark:text-gray-200">Total Losses:</span>
                        <br />
						<span class="font-bold">{chessStats.total.losses}</span>
					</div>
					<div class="text-lg text-emerald-400">
						<span class="text-sm text-gray-900 dark:text-gray-200">Total Draws:</span>
                        <br />
						<span class="font-bold">{chessStats.total.draws}</span>
					</div>
				</div>
				<div class="mt-2 flex justify-center space-x-2">
					<Button
						href="https://www.chess.com/member/mecandycat"
						target="_blank"
						class="transition duration-300 ease-in-out hover:scale-95"
					>
						<Crown class="mr-2 h-4 w-4" />Friend Me
					</Button>
				</div>
			{/if}
		</Card.Content>
	</Card.Root>
</div>
