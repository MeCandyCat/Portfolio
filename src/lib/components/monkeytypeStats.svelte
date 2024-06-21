<script lang="ts">
	import { onMount } from 'svelte';
	import * as Card from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';
	import Keyboard from 'lucide-svelte/icons/keyboard';
	import Copy from 'lucide-svelte/icons/copy';
	import { toast } from 'svelte-sonner';

	let stats = { averageWpm: 0, totalTimeMinutes: 0, accuracy: 0 };
	let loading = true;

	onMount(async () => {
		try {
			const response = await fetch('/api/monkeytype');
			const data = await response.json();
			stats = data;
		} catch (error) {
			console.error('Failed to fetch data', error);
		} finally {
			loading = false;
		}
	});

	function formatTime(minutes: number): string {
		const hours = Math.floor(minutes / 60);
		const mins = Math.round(minutes % 60);
		return `${hours}h ${mins}min`;
	}

	const copyTheme = async () => {
		try {
			await navigator.clipboard.writeText(
				`https://monkeytype.com?customTheme=eyJjIjpbIiMyOTJiMzgiLCIjYmQ5M2Y5IiwiI2JkOTNmOSIsIiM0N2RhZmYiLCIjMjAyMjJjIiwiI2Y4ZjhmMiIsIiNmZjU1NTUiLCIjZjFmYThjIiwiI2ZmNTU1NSIsIiNmMWZhOGMiXX0=`
			);
			toast.success('Monkeytype Theme Copied!', {
				description: 'enjoy a smooth ui.'
			});
		} catch (error) {
			console.error('Error copying to clipboard:', error);
			toast.error('Failed to copy to clipboard');
		}
	};
</script>

<div class="flex justify-center">
	<Card.Root class="relative w-[500px] overflow-hidden bg-slate-50 dark:bg-[#292b38]/50">
		<img
			src="https://cdn.discordapp.com/assets/profile_effects/effects/2024-04-04/watercolors/intro.png"
			alt="Esthetics"
			class="pointer-events-none absolute z-0 w-full opacity-20 blur-xl dark:opacity-10"
			draggable="false"
		/>
		<Card.Header class="items-center space-x-2">
			<img src="/icons/Monkeytype.svg" alt="Monkeytype logo" class="h-24 w-24 fill-violet-400" />
			<Card.Title class="text-xl font-bold text-violet-600 dark:text-violet-400"
				>Monkeytype Stats</Card.Title
			>
			<Card.Description class="overflow-hidden text-center text-sm text-black dark:text-white">
				Statistics of my typing performance. Monkeytype is a minimalistic and customizable typing
				test.
			</Card.Description>
		</Card.Header>
		<Card.Content>
			{#if loading}
				<p class="text-center">Loading...</p>
			{:else}
				<div class="grid grid-cols-3 text-center">
					<div class="mb-2 text-lg text-cyan-400">
						<span class="text-sm text-gray-900 dark:text-gray-200">Average WPM:</span>
						<span class="font-bold">{stats.averageWpm}</span>
					</div>
					<div class="mb-2 text-lg text-cyan-400">
						<span class="text-sm text-gray-900 dark:text-gray-200">Total Time:</span>
						<br />
						<span class="font-bold">{formatTime(stats.totalTimeMinutes)}</span>
					</div>
					<div class="text-lg text-cyan-400">
						<span class="text-sm text-gray-900 dark:text-gray-200">Accuracy:</span>
						<br />
						<span class="font-bold">{stats.accuracy}%</span>
					</div>
				</div>
				<div class="mt-2 flex justify-center space-x-2">
					<Button
						href="https://monkeytype.com/profile/CandyCat"
						target="_blank"
						class="transition duration-300 ease-in-out hover:scale-95"
					>
						<Keyboard class="mr-2 h-4 w-4" />Profile
					</Button>
					<Button
						on:click={copyTheme}
						class="transition duration-300 ease-in-out hover:scale-95"
						variant="outline"
					>
						<Copy class="mr-2 h-4 w-4" />Monkeytype Theme
					</Button>
				</div>
			{/if}
		</Card.Content>
	</Card.Root>
</div>
