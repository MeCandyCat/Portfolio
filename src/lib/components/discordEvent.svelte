<script lang="ts">
	import { onMount } from 'svelte';
	import * as Card from '$lib/components/ui/card';
	import CalendarIcon from 'lucide-svelte/icons/calendar';
	import MapPinIcon from 'lucide-svelte/icons/map-pin';
	import EyeIcon from 'lucide-svelte/icons/eye';
	import { Button } from '$lib/components/ui/button';
	import * as Avatar from '$lib/components/ui/avatar';
	import { toast } from 'svelte-sonner';

	export let serverInvite = '';
	export let eventId = '';
	let data: any = null;
	let error: string | null = null;

	onMount(async () => {
		try {
			if (!serverInvite || !eventId) {
				throw new Error('Server invite code and event ID must be provided');
			}

			const response = await fetch(
				`https://discord.com/api/v9/invites/${serverInvite}?with_counts=true&with_expiration=true&guild_scheduled_event_id=${eventId}`
			);

			if (!response.ok) {
				throw new Error('Failed to fetch data');
			}

			data = await response.json();
		} catch (err: any) {
			error = err.message;
		}
	});

	function formatDate(dateString: string): string {
		return new Date(dateString).toLocaleString('en-US', {
			weekday: 'short',
			month: 'short',
			day: 'numeric',
			year: 'numeric',
			hour: 'numeric',
			minute: '2-digit',
			hour12: true
		});
	}

	function calculateDuration(startTime: string, endTime: string): string {
		const start = new Date(startTime);
		const end = new Date(endTime);
		const durationMs = end.getTime() - start.getTime();
		const hours = Math.floor(durationMs / (1000 * 60 * 60));
		const minutes = Math.floor((durationMs % (1000 * 60 * 60)) / (1000 * 60));
		return `${hours}h ${minutes}m`;
	}

	function showEventToast() {
		if (data && data.guild_scheduled_event) {
			const { name, scheduled_start_time, scheduled_end_time } = data.guild_scheduled_event;
			const duration = calculateDuration(scheduled_start_time, scheduled_end_time);
			const formattedStartTime = formatDate(scheduled_start_time);

			toast(`Event: ${name}`, {
				description: `Starts at ${formattedStartTime}. Duration: ${duration}`,
				duration: 5000
			});
		}
	}
</script>

{#if error}
	<p class="text-center text-red-500">{error}</p>
{:else if data}
	<Card.Root
		class="mx-auto max-w-md overflow-hidden rounded-lg bg-white text-gray-900 shadow-lg dark:bg-gray-800 dark:text-white"
	>
		{#if data.guild_scheduled_event?.image}
			<img
				src={`https://cdn.discordapp.com/guild-events/${data.guild_scheduled_event.id}/${data.guild_scheduled_event.image}?size=2048`}
				alt="Event banner"
				class="h-48 w-full object-cover"
			/>
		{/if}
		<div class="p-4">
			<div class="mb-2 flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
				<Button variant="ghost" class="p-0" on:click={showEventToast}>
					<CalendarIcon class="h-4 w-4" />
				</Button>
				<span>{formatDate(data.guild_scheduled_event?.scheduled_start_time)}</span>
			</div>
			<h2 class="mb-2 text-xl font-bold">{data.guild_scheduled_event?.name}</h2>
			<p class="mb-4 text-sm text-gray-700 dark:text-gray-300">
				{data.guild_scheduled_event?.description}
			</p>
			<div class="mb-4 flex items-center justify-between">
				<div class="flex items-center space-x-2">
					<Avatar.Root class="h-6 w-6">
						<Avatar.Image
							src={data.guild?.icon
								? `https://cdn.discordapp.com/icons/${data.guild.id}/${data.guild.icon}.png`
								: ''}
							alt={data.guild?.name}
						/>
						<Avatar.Fallback>{data.guild?.name.charAt(0)}</Avatar.Fallback>
					</Avatar.Root>
					<span class="text-sm font-medium">{data.guild?.name}</span>
				</div>
				<div class="flex items-center space-x-1">
					<MapPinIcon class="h-4 w-4 text-gray-600 dark:text-gray-400" />
					<span class="text-sm text-gray-600 dark:text-gray-400"
						>{data.guild_scheduled_event?.entity_metadata?.location || 'Online'}</span
					>
				</div>
			</div>
			<Button
				variant="outline"
				class="w-full justify-between bg-gray-100 text-left font-normal hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600"
				href={`https://discord.gg/${serverInvite}?event=${eventId}`}
				target="_blank"
			>
				<span>Check Event</span>
				<EyeIcon class="h-4 w-4" />
			</Button>
		</div>
		<div class="flex items-center justify-between bg-gray-100 px-4 py-3 dark:bg-gray-700">
			<div class="flex items-center space-x-2">
				<div class="h-2 w-2 rounded-full bg-purple-500"></div>
				<span class="text-sm text-gray-600 dark:text-gray-300"
					>{data.guild_scheduled_event?.user_count} interested</span
				>
			</div>
			<div class="flex items-center space-x-2">
				<div class="h-2 w-2 rounded-full bg-green-500"></div>
				<span class="text-sm text-gray-600 dark:text-gray-300"
					>{data.approximate_member_count} members</span
				>
			</div>
			<Avatar.Root class="h-6 w-6">
				<Avatar.Image
					src={data.inviter?.avatar
						? `https://cdn.discordapp.com/avatars/${data.inviter.id}/${data.inviter.avatar}.png`
						: ''}
					alt={data.inviter?.global_name || 'Event Creator'}
				/>
				<Avatar.Fallback>{(data.inviter?.global_name || 'EC').charAt(0)}</Avatar.Fallback>
			</Avatar.Root>
		</div>
	</Card.Root>
{:else}
	<p class="text-center text-gray-500 dark:text-gray-400">Loading...</p>
{/if}
