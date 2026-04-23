<script lang="ts">
	import { onMount } from 'svelte';
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import * as Tooltip from '$lib/components/ui/tooltip/index.js';
	import * as Popover from '$lib/components/ui/popover/index.js';
	import { toast } from 'svelte-sonner';
	import Profile from '$lib/components/pfp.svelte';
	import Copy from 'lucide-svelte/icons/copy';

	let discordStatus = 'offline';
	let avatarUrl: string | null = null;
	let nameplateUrl: string | null = null;
	let avatarDecorationUrl: string | null = null;
	let nameplatePalette: string | null = null;
	let customStatus: {
		text: string | null;
		emojiName: string | null;
		emojiUrl: string | null;
	} | null = null;
	let activities: any[] = [];

	// Discord nameplate palette name → background color mapping
	// These match the actual colors Discord uses behind each nameplate theme
	const PALETTE_COLORS: Record<string, string> = {
		bubble_gum: '#f4a7c3',
		lemon_drop: '#f7e07a',
		cotton_candy: '#c9a7f4',
		crimson: '#3c181d',
		creamsicle: '#f4b07a',
		mint: '#7af4c3',
		sky: '#7ac3f4',
		rose: '#f47a7a',
		forest: '#7ab87a',
		twilight: '#7a7af4',
		midnight: '#3a3a6e',
		sunrise: '#f4c47a',
		ocean: '#7ab4d4',
		cherry_blossom: '#f4a0b8',
		lavender: '#b8a0f4',
		ember: '#f4803a',
		arctic: '#a0d4f4',
		violet: '#8F00FF',
		cobalt: '#0047AB'
		// fallback handled below
	};

	function getPaletteColor(palette: string | null): string {
		if (!palette) return '#3a3a5c';
		return PALETTE_COLORS[palette] ?? '#3a3a5c';
	}

	const copyDiscord = async () => {
		try {
			await navigator.clipboard.writeText(`mecandycat`);
			toast.success('Discord Username Copied!', { description: 'mecandycat' });
		} catch (error) {
			toast.error('Failed to copy to clipboard');
		}
	};

	async function fetchDiscordStatus() {
		try {
			const response = await fetch('/api/discord');
			const data = await response.json();
			discordStatus = data.status;
			avatarUrl = data.avatarUrl;
			nameplateUrl = data.nameplateUrl;
			avatarDecorationUrl = data.avatarDecorationUrl;
			nameplatePalette = data.nameplatePalette;
			customStatus = data.customStatus;
			activities = data.activities ?? [];
		} catch (error) {
			console.error('Error fetching Discord status:', error);
		}
	}

	onMount(() => fetchDiscordStatus());

	function getStatusColor(status: string) {
		switch (status) {
			case 'online':
				return '#22c55e';
			case 'idle':
				return '#eab308';
			case 'dnd':
				return '#ef4444';
			default:
				return '#6b7280';
		}
	}

	function getStatusBorderColor(status: string): string {
		switch (status) {
			case 'online':
				return 'border-green-500';
			case 'idle':
				return 'border-yellow-500';
			case 'dnd':
				return 'border-red-500';
			default:
				return 'border-gray-500';
		}
	}

	function getStatusLabel(status: string): string {
		switch (status) {
			case 'online':
				return 'Online';
			case 'idle':
				return 'Idle';
			case 'dnd':
				return 'Do Not Disturb';
			default:
				return 'Offline';
		}
	}

	$: accentColor = getPaletteColor(nameplatePalette);

	$: primaryActivity =
		activities.find((a) => a.type === 'listening') ??
		activities.find((a) => a.type === 'playing') ??
		activities[0] ??
		null;
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
			<div class="relative inline-block">
				<div class="relative">
					<Profile Image1="profile/discord.png" Image2="profile/discord.gif" customStyle="z-0" />
					<img
						src={avatarDecorationUrl}
						alt=""
						class="pointer-events-none absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2 scale-[112%] transform"
						draggable="false"
					/>
					<div
						class={`absolute inset-0 z-10 rounded-full border-[3px] ${getStatusBorderColor(discordStatus)}`}
					></div>
				</div>
			</div>

			<div class="z-10 grid grid-cols-10 place-items-center">
				<h5 class="col-span-5 mb-1 text-xl font-bold text-gray-900 dark:text-white">Candy Cat</h5>
				<Tooltip.Root>
					<Tooltip.Trigger>
						<img
							src="https://cdn.discordapp.com/badge-icons/8a88d63823d8a71cd5e390baa45efa02.png"
							class="w-5"
							alt="HyperSquad Bravary"
						/>
					</Tooltip.Trigger>
					<Tooltip.Content><p>HyperSquad Bravary</p></Tooltip.Content>
				</Tooltip.Root>
				<Tooltip.Root>
					<Tooltip.Trigger>
						<img
							src="https://cdn.discordapp.com/badge-icons/6de6d34650760ba5551a79732e98ed60.png"
							class="w-5"
							alt="Legacy Badge"
						/>
					</Tooltip.Trigger>
					<Tooltip.Content><p>Legacy Badge</p></Tooltip.Content>
				</Tooltip.Root>
				<Tooltip.Root>
					<Tooltip.Trigger>
						<img
							src="https://cdn.discordapp.com/badge-icons/7d9ae358c8c5e118768335dbe68b4fb8.png"
							class="w-5"
							alt="Completed a Quest"
						/>
					</Tooltip.Trigger>
					<Tooltip.Content><p>Completed a Quest</p></Tooltip.Content>
				</Tooltip.Root>
				<Tooltip.Root>
					<Tooltip.Trigger>
						<img
							src="https://cdn.discordapp.com/badge-icons/ca105ad9cfc8580c765101d17bbb2323.png"
							class="w-5"
							alt="Last Medows Online"
						/>
					</Tooltip.Trigger>
					<Tooltip.Content><p>Last Medows Online</p></Tooltip.Content>
				</Tooltip.Root>
				<Tooltip.Root>
					<Tooltip.Trigger>
						<img
							src="https://cdn.discordapp.com/badge-icons/83d8a1eb09a8d64e59233eec5d4d5c2d.png"
							class="w-5"
							alt="Apprentice"
						/>
					</Tooltip.Trigger>
					<Tooltip.Content><p>Apprentice</p></Tooltip.Content>
				</Tooltip.Root>
			</div>

			<!-- Username with Popover -->
			<Popover.Root>
				<Popover.Trigger
					class="z-10 cursor-pointer text-sm text-gray-500 transition-colors duration-200 hover:text-purple-500 dark:text-gray-400 hover:dark:text-purple-400"
				>
					@mecandycat
				</Popover.Trigger>

				<Popover.Content
					class="w-64 overflow-hidden rounded-2xl border border-white/10 bg-[#1e1f22] p-0 shadow-2xl shadow-black/60"
					side="top"
					align="center"
				>
					<!-- Determine compact mode: no activity AND no custom status -->
					{@const compact = !primaryActivity && !customStatus?.text}

					<div class="relative">
						<!-- Nameplate background color layer -->
						<div
							class="absolute inset-x-0 top-0"
							style="background-color: {accentColor}; opacity: 0.35; height: {compact
								? '100%'
								: '4rem'};"
						></div>

						{#if compact}
							<!-- COMPACT: avatar + names sit inside the nameplate area, no fade -->
							<div class="relative overflow-hidden" style="height: 4rem;">
								{#if nameplateUrl}
									<video
										src={nameplateUrl}
										autoplay
										loop
										muted
										playsinline
										class="absolute right-0 top-0 h-full"
										style="width: auto; max-width: none;"
									></video>
								{/if}

								<!-- Avatar + name overlaid directly on nameplate, vertically centered -->
								<div class="absolute inset-0 z-10 flex items-center gap-2.5 px-3">
									<div class="relative shrink-0">
										{#if avatarUrl}
											<img
												src={avatarUrl}
												alt="Avatar"
												class="h-10 w-10 rounded-full ring-2 ring-[#1e1f22]"
												style="outline: 2px solid {accentColor}; outline-offset: 1px;"
											/>
										{:else}
											<div
												class="h-10 w-10 rounded-full ring-2 ring-[#1e1f22]"
												style="background: {accentColor}33; outline: 2px solid {accentColor}; outline-offset: 1px;"
											></div>
										{/if}
										<!-- Avatar decoration -->
										{#if avatarDecorationUrl}
											<img
												src={avatarDecorationUrl}
												alt="Decoration"
												class="pointer-events-none absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2 scale-[140%]"
												draggable="false"
											/>
										{/if}
										<!-- Status dot -->
										<span
											class="absolute bottom-0 right-0 h-3 w-3 rounded-full ring-2 ring-[#1e1f22]"
											style="background-color: {getStatusColor(discordStatus)};"
										></span>
									</div>

									<div class="min-w-0 drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">
										<p class="truncate text-sm font-bold leading-tight text-white">Candy Cat</p>
										<p class="truncate text-xs leading-tight text-white/60">@mecandycat</p>
									</div>
								</div>
							</div>
						{:else}
							<!-- EXPANDED: nameplate strip + overlapping avatar below -->
							{#if nameplateUrl}
								<div class="relative h-16 w-full overflow-hidden">
									<video
										src={nameplateUrl}
										autoplay
										loop
										muted
										playsinline
										class="absolute right-0 top-0 h-full"
										style="width: auto; max-width: none;"
									></video>
									<div
										class="absolute inset-0 bg-gradient-to-r from-[#1e1f22] via-transparent to-transparent"
									></div>
									<div
										class="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#1e1f22]"
									></div>
								</div>
							{:else}
								<div class="relative h-8 w-full overflow-hidden">
									<div
										class="absolute inset-0 bg-gradient-to-b from-transparent to-[#1e1f22]"
									></div>
								</div>
							{/if}

							<!-- Avatar + name row overlapping the nameplate -->
							<div class="relative z-10 -mt-8 flex items-end gap-3 px-4 pb-1">
								<div class="relative shrink-0">
									{#if avatarUrl}
										<img
											src={avatarUrl}
											alt="Avatar"
											class="h-14 w-14 rounded-full ring-[3px] ring-[#1e1f22]"
											style="outline: 2px solid {accentColor}; outline-offset: 2px;"
										/>
									{:else}
										<div
											class="h-14 w-14 rounded-full ring-[3px] ring-[#1e1f22]"
											style="background: {accentColor}33; outline: 2px solid {accentColor}; outline-offset: 2px;"
										></div>
									{/if}
									<!-- Avatar decoration -->
									{#if avatarDecorationUrl}
										<img
											src={avatarDecorationUrl}
											alt="Decoration"
											class="pointer-events-none absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2 scale-[140%]"
											draggable="false"
										/>
									{/if}
									<!-- Status dot -->
									<span
										class="absolute bottom-0.5 right-0.5 h-3.5 w-3.5 rounded-full ring-2 ring-[#1e1f22]"
										style="background-color: {getStatusColor(discordStatus)};"
									></span>
								</div>

								<div class="mb-1 min-w-0">
									<p class="truncate text-sm font-semibold leading-tight text-white">Candy Cat</p>
									<p class="truncate text-xs leading-tight text-white/40">@mecandycat</p>
								</div>
							</div>
						{/if}
					</div>

					<!-- Body — only shown in expanded mode -->
					{#if !compact}
						<div class="px-4 pb-4 pt-2">
							<!-- Status row -->
							<div class="mb-3 flex items-center gap-1.5">
								<span
									class="inline-block h-2 w-2 rounded-full"
									style="background-color: {getStatusColor(discordStatus)};"
								></span>
								<span class="text-xs font-medium" style="color: {getStatusColor(discordStatus)};">
									{getStatusLabel(discordStatus)}
								</span>
							</div>

							<div class="mb-3 h-px w-full" style="background-color: {accentColor}22;"></div>

							<!-- Custom status -->
							{#if customStatus?.text}
								<div class="mb-3 flex items-center gap-2 rounded-xl bg-white/5 px-3 py-2">
									{#if customStatus.emojiUrl}
										<img src={customStatus.emojiUrl} alt="emoji" class="h-4 w-4 shrink-0" />
									{:else if customStatus.emojiName}
										<span class="text-sm leading-none">{customStatus.emojiName}</span>
									{/if}
									<span class="truncate text-xs text-white/70">{customStatus.text}</span>
								</div>
							{/if}

							<!-- Primary activity -->
							{#if primaryActivity}
								<div class="rounded-xl px-3 py-2.5" style="background-color: {accentColor}18;">
									{#if primaryActivity.type === 'listening' && primaryActivity.spotify}
										<div class="flex items-center gap-2.5">
											{#if primaryActivity.spotify.albumArtUrl}
												<img
													src={primaryActivity.spotify.albumArtUrl}
													alt="Album art"
													class="h-10 w-10 shrink-0 rounded-lg shadow-md"
												/>
											{/if}
											<div class="min-w-0">
												<p
													class="flex items-center gap-1 text-[10px] font-semibold uppercase tracking-widest text-[#1db954]"
												>
													<svg viewBox="0 0 24 24" class="h-3 w-3 fill-current"
														><path
															d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"
														/></svg
													>
													Listening
												</p>
												<p class="truncate text-xs font-semibold text-white">
													{primaryActivity.spotify.song}
												</p>
												<p class="truncate text-[11px] text-white/50">
													{primaryActivity.spotify.artist}
												</p>
											</div>
										</div>
									{:else if primaryActivity.type === 'playing' && primaryActivity.game}
										<div class="flex items-center gap-2.5">
											{#if primaryActivity.game.largeImageUrl}
												<img
													src={primaryActivity.game.largeImageUrl}
													alt="Game"
													class="h-10 w-10 shrink-0 rounded-lg shadow-md"
												/>
											{:else}
												<div
													class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg"
													style="background-color: {accentColor}40;"
												>
													<svg
														class="h-5 w-5"
														style="color: {accentColor};"
														fill="currentColor"
														viewBox="0 0 24 24"
														><path
															d="M17 4H7C4.24 4 2 6.24 2 9v6c0 2.76 2.24 5 5 5h10c2.76 0 5-2.24 5-5V9c0-2.76-2.24-5-5-5zm-7 9H8v2H6v-2H4V11h2V9h2v2h2v2zm4.5 1c-.83 0-1.5-.67-1.5-1.5S13.67 11 14.5 11s1.5.67 1.5 1.5S15.33 14 14.5 14zm2-3c-.83 0-1.5-.67-1.5-1.5S15.67 8 16.5 8s1.5.67 1.5 1.5S17.33 11 16.5 11z"
														/></svg
													>
												</div>
											{/if}
											<div class="min-w-0">
												<p
													class="text-[10px] font-semibold uppercase tracking-widest"
													style="color: {accentColor};"
												>
													Playing
												</p>
												<p class="truncate text-xs font-semibold text-white">
													{primaryActivity.game.name}
												</p>
												{#if primaryActivity.game.details}
													<p class="truncate text-[11px] text-white/50">
														{primaryActivity.game.details}
													</p>
												{/if}
											</div>
										</div>
									{:else}
										<p class="text-[10px] uppercase tracking-widest text-white/40">
											{primaryActivity.type}
										</p>
										<p class="truncate text-xs font-semibold text-white">{primaryActivity.name}</p>
									{/if}
								</div>
							{/if}
						</div>
					{/if}
				</Popover.Content>
			</Popover.Root>

			<p class="z-10 px-1 pt-1 text-center">
				I was a just a dreamer, chasing stars and good vibes until I fell down my bed & broke my
				nose...
			</p>

			<div class="z-10 mt-4 flex md:mt-6">
				<Button on:click={copyDiscord} class="transition duration-300 ease-in-out hover:scale-95">
					<Copy class="mr-2 h-4 w-4" />Discord
				</Button>
			</div>
		</div>
		<div class="h-3 w-full animate-pulse bg-violet-600 opacity-20 blur-xl dark:opacity-50" />
	</Card.Root>
</div>
