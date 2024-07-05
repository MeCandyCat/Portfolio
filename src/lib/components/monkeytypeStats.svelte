<script lang="ts">
	import { onMount } from 'svelte';
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import Keyboard from 'lucide-svelte/icons/keyboard';
	import Copy from 'lucide-svelte/icons/copy';
	import { toast } from 'svelte-sonner';
	import { animate } from 'motion';

	let stats = { averageWpm: 0, totalTimeMinutes: 0, accuracy: 0 };

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

	function animateCount(
		id: string,
		value: number,
		format: (value: number) => string = (v) => v.toFixed(2)
	): void {
		const element = document.getElementById(id);
		if (element) {
			animate(
				(progress) => {
					const animatedValue = progress * value;
					element.innerText = format(animatedValue);
				},
				{ duration: 2, easing: 'ease-out' }
			);
		}
	}

	function formatTime(minutes: number): string {
		const hours = Math.floor(minutes / 60);
		const mins = Math.round(minutes % 60);
		return `${hours}h ${mins}min`;
	}

	onMount(async () => {
		const data = await fetchData('/api/monkeytype');
		if (data) {
			stats = data;
			animateCount('averageWpm', stats.averageWpm);
			animateCount('totalTimeMinutes', stats.totalTimeMinutes, formatTime);
			animateCount('accuracy', stats.accuracy, (value) => `${value.toFixed(2)}%`);
		}
	});

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
	<Card.Root class="relative w-full overflow-hidden bg-slate-50 dark:bg-[#292b38]/50 sm:w-[500px]">
		<img
			src="https://cdn.discordapp.com/assets/profile_effects/effects/2024-04-04/watercolors/intro.png"
			alt="Esthetics"
			class="pointer-events-none absolute z-0 w-full opacity-20 blur-xl dark:opacity-10"
			draggable="false"
		/>
		<Card.Header class="items-center space-x-2">
			<img src="/icons/Monkeytype.svg" alt="Monkeytype logo" class="h-24 w-24 fill-violet-400" />
			<Card.Title class="text-xl font-bold text-violet-600 dark:text-violet-400"
				>Monkeytype</Card.Title
			>
			<Card.Description class="overflow-hidden text-center text-sm text-black dark:text-white">
				Statistics of my typing performance. Monkeytype is a minimalistic and customizable typing
				test.
			</Card.Description>
		</Card.Header>
		<Card.Content>
			<div class="grid grid-cols-3 gap-2 text-center">
				<div class="mb-2 text-lg text-cyan-400">
					<span class="text-sm text-gray-900 dark:text-gray-200">Average WPM:</span>
					<br />
					<span id="averageWpm" class="font-bold">0.00</span>
				</div>
				<div class="mb-2 text-lg text-cyan-400">
					<span class="text-sm text-gray-900 dark:text-gray-200">Total Time:</span>
					<br />
					<span id="totalTimeMinutes" class="font-bold">0h 0min</span>
				</div>
				<div class="mb-2 text-lg text-cyan-400">
					<span class="text-sm text-gray-900 dark:text-gray-200">Accuracy:</span>
					<br />
					<span id="accuracy" class="font-bold">0.00%</span>
				</div>
			</div>
		</Card.Content>
		<Card.Footer class="mt-2 flex flex-wrap items-center justify-center space-x-2">
			<Button
				href="https://monkeytype.com/profile/CandyCat"
				target="_blank"
				class="mb-2 transition duration-300 ease-in-out hover:scale-95"
			>
				<Keyboard class="mr-2 h-4 w-4" /> Profile
			</Button>
			<Button
				on:click={copyTheme}
				class="mb-2 transition duration-300 ease-in-out hover:scale-95"
				variant="outline"
			>
				<Copy class="mr-2 h-4 w-4" /> Monkeytype Theme
			</Button>
		</Card.Footer>
	</Card.Root>
</div>
