<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import * as Tooltip from '$lib/components/ui/tooltip/index.js';
	import Profile from '$lib/components/pfp.svelte';

	import Copy from 'lucide-svelte/icons/copy';

	const copyDiscord = async () => {
		await navigator.clipboard.writeText(`mecandycat`);
	};
</script>

<div class="flex items-center justify-center">
	<Card.Root class="relative w-[350px] overflow-hidden">
		<img
			src="https://cdn.discordapp.com/assets/profile_effects/effects/2023-10-11/punk-girl/loop.png"
			alt="Discord Cosmetic"
			class="pointer-events-none absolute w-[350px] opacity-50"
			draggable="false"
		/>
		<img src="banners/Pixel-sky-discord.gif" class="w-full" alt="Discord Banner" />
		<img
			src="https://cdn.discordapp.com/assets/profile_effects/effects/2023-10-11/punk-girl/intro.png"
			alt="Esthetics"
			class="pointer-events-none absolute z-0 w-[350px] opacity-15 blur-xl dark:opacity-25"
			draggable="false"
		/>
		<div class="flex flex-col items-center py-5">
			<div class="relative">
				<img
					src="https://cdn.discordapp.com/avatar-decoration-presets/a_fed43ab12698df65902ba06727e20c0e.png"
					alt="Decoration"
					class="pointer-events-none absolute z-10 w-24"
					draggable="false"
				/>
				<span class="z-0">
					<Profile Image1="profile/discord.png" Image2="profile/discord.gif" />
				</span>
			</div>
			<div class="z-10 grid grid-cols-8 place-items-center">
				<h5 class="col-span-4 mb-1 text-xl font-bold text-gray-900 dark:text-white">Candy Cat</h5>
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
			<span class="z-10 text-sm text-gray-500 dark:text-gray-400">@mecandycat</span>

			<p class="z-10 px-1 pt-1 text-center">
				I was a just a dreamer, chasing stars and good vibes until I fell down my bed & broke my
				nose...
			</p>

			<div class="z-10 mt-4 flex md:mt-6">
				<Button on:click={copyDiscord} class="transition duration-300 ease-in-out hover:scale-95"
					><Copy class="mr-2 h-4 w-4" />Discord</Button
				>
			</div>
		</div>
		<div class="h-5 w-full animate-pulse bg-violet-600 opacity-20 blur-xl dark:opacity-50" />
	</Card.Root>
</div>
