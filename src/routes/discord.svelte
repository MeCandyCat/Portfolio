<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import * as Tooltip from '$lib/components/ui/tooltip/index.js';
	import Profile from './pfp.svelte';

	import Copy from 'lucide-svelte/icons/copy';

	const copyDiscord = async () => {
		await navigator.clipboard.writeText(`mecandycat`);
	};
</script>

<div class="flex justify-center items-center my-5">
	<Card.Root class="w-[350px] overflow-hidden">
		<img src="https://i.imgur.com/mL661SE.gif" class="w-full" alt="Discord Banner" />
		<div class="flex flex-col items-center py-5">
			<Profile Image1="https://i.imgur.com/t55pTul.png" Image2="https://i.imgur.com/sNXB99e.gif" />
			<div class="grid grid-cols-8 place-items-center">
				<h5 class="mb-1 text-xl font-bold text-gray-900 dark:text-white col-span-4">Candy Cat</h5>
				<Tooltip.Root>
					<Tooltip.Trigger
						><img
							src="https://cdn.discordapp.com/badge-icons/8a88d63823d8a71cd5e390baa45efa02.png"
							class="w-5"
							alt="HyperSquad Bravary"
						/></Tooltip.Trigger
					>
					<Tooltip.Content>
						<p>HyperSquad Bravary</p>
					</Tooltip.Content>
				</Tooltip.Root>

				<Tooltip.Root>
					<Tooltip.Trigger
						><img
							src="https://cdn.discordapp.com/badge-icons/6bdc42827a38498929a4920da12695d9.png"
							class="w-5"
							alt="Active Developer"
						/></Tooltip.Trigger
					>
					<Tooltip.Content>
						<p>Active Developer</p>
					</Tooltip.Content>
				</Tooltip.Root>

				<Tooltip.Root>
					<Tooltip.Trigger
						><img
							src="https://cdn.discordapp.com/badge-icons/6de6d34650760ba5551a79732e98ed60.png"
							class="w-5"
							alt="Legacy Badge"
						/></Tooltip.Trigger
					>
					<Tooltip.Content>
						<p>Legacy Badge</p>
					</Tooltip.Content>
				</Tooltip.Root>

				<Tooltip.Root>
					<Tooltip.Trigger
						><img
							src="https://cdn.discordapp.com/badge-icons/7d9ae358c8c5e118768335dbe68b4fb8.png"
							class="w-5"
							alt="Completed a Quest"
						/></Tooltip.Trigger
					>
					<Tooltip.Content>
						<p>Completed a Quest</p>
					</Tooltip.Content>
				</Tooltip.Root>
			</div>
			<span class="text-sm text-gray-500 dark:text-gray-400">@mecandycat</span>

			<div class="flex mt-4 md:mt-6">
				<Button on:click={copyDiscord}><Copy class="mr-2 h-4 w-4" />Discord</Button>
			</div>
		</div>
		<div class="bg-violet-600 w-full h-5 blur-xl opacity-50" />
	</Card.Root>
</div>
