<script lang="ts">
	import { Card } from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Badge } from '$lib/components/ui/badge';
	import * as Dialog from '$lib/components/ui/dialog';
	import {
		Eye,
		ThumbsUp,
		Video,
		Users,
		Zap,
		ScrollText,
		Youtube,
		Share2,
		Search,
		Bell
	} from 'lucide-svelte';
	import { toast } from 'svelte-sonner';
	import { Skeleton } from '$lib/components/ui/skeleton';
	import { goto } from '$app/navigation';

	export let data;

	// Search functionality
	let searchQuery = '';
	let channels: Array<{
		id: string;
		title: string;
		description: string;
		thumbnail: string;
	}> = [];
	let loading = false;
	let error: string | null = null;
	let searchDialogOpen = false;

	async function searchChannels() {
		if (!searchQuery.trim()) return;

		loading = true;
		error = null;
		channels = [];

		try {
			const response = await fetch(`/api/youtube/search?q=${encodeURIComponent(searchQuery)}`);

			if (!response.ok) {
				throw new Error('Failed to fetch channels');
			}

			channels = await response.json();
		} catch (err) {
			error = err instanceof Error ? err.message : 'An unknown error occurred';
			console.error(error);
		} finally {
			loading = false;
		}
	}

	function navigateToChannelAnalytics(channelId: string) {
		goto(`/channelytics?channelId=${channelId}`);
		searchDialogOpen = false;
	}

	const copyYoutube = async () => {
		try {
			await navigator.clipboard.writeText(`https://www.youtube.com/${data.channelInfo.customUrl}`);
			toast.success('Youtube Channel URL Copied!', {
				description: `${data.channelInfo.customUrl}`
			});
		} catch (error) {
			console.error('Error copying to clipboard:', error);
			toast.error('Failed to copy to clipboard');
		}
	};

	function formatNumber(num: string): string {
		return parseInt(num).toLocaleString();
	}

	function getYoutubeVideoUrl(videoId: string): string {
		return `https://youtube.com/watch?v=${videoId}`;
	}

	function getChannelUrl(): string {
		return `https://youtube.com/${data.channelInfo.customUrl}`;
	}

	let isImageLoading = true;
	function handleImageLoad() {
		isImageLoading = false;
	}

	function openChannelCommunity() {
		window.open(`https://youtube.com/${data.channelInfo.customUrl}/community`, '_blank');
	}
</script>

<div class="min-h-screen bg-background">
	<!-- Navbar with Search -->
	<nav class="sticky top-0 z-50 bg-background/80 shadow-sm backdrop-blur-md">
		<div class="container mx-auto flex items-center justify-between px-6 py-3">
			<div class="flex items-center space-x-4">
				<img
					src={data.channelInfo.profilePicture}
					alt="Channel Logo"
					class="h-8 w-8 rounded-full"
				/>
				<h1 class="text-lg font-semibold">{data.channelInfo.title}</h1>
			</div>

			<div class="flex items-center space-x-2">
				<Dialog.Root bind:open={searchDialogOpen}>
					<Dialog.Trigger asChild let:builder>
						<Button
							builders={[builder]}
							variant="ghost"
							size="icon"
							class="text-muted-foreground hover:text-foreground"
						>
							<Search class="h-5 w-5" />
						</Button>
					</Dialog.Trigger>

					<Dialog.Content class="sm:max-w-[600px]">
						<Dialog.Header>
							<Dialog.Title>Search YouTube Channels</Dialog.Title>
							<Dialog.Description>Find and analyze YouTube channels</Dialog.Description>
						</Dialog.Header>

						<div class="space-y-4">
							<div class="flex items-center gap-2">
								<Input
									type="text"
									placeholder="Search YouTube Channels"
									bind:value={searchQuery}
									class="flex-grow"
									on:keydown={(e) => e.key === 'Enter' && searchChannels()}
								/>
								<Button on:click={searchChannels} disabled={loading} class="px-4 py-2">
									{#if loading}
										Searching...
									{:else}
										Search
									{/if}
								</Button>
							</div>

							{#if error}
								<div class="text-sm text-red-500">{error}</div>
							{/if}

							{#if channels.length > 0}
								<div class="max-h-72 max-w-lg overflow-y-auto rounded-lg border">
									{#each channels as channel}
										<div
											class="flex cursor-pointer items-center p-2 transition hover:bg-primary/10"
											on:click={() => navigateToChannelAnalytics(channel.id)}
											on:keydown={(e) =>
												e.key === 'Enter' && navigateToChannelAnalytics(channel.id)}
											tabindex="0"
											role="button"
										>
											<img
												src={channel.thumbnail}
												alt="{channel.title} profile"
												class="mr-3 h-10 w-10 rounded-full"
											/>
											<div class="truncate">
												<h3 class="truncate text-sm font-medium">{channel.title}</h3>
												<p class="truncate text-xs text-gray-500">{channel.description}</p>
											</div>
										</div>
									{/each}
								</div>
							{:else if searchQuery && !loading}
								<div class="text-center text-sm text-gray-500">
									No channels found. Try a different search term.
								</div>
							{/if}
						</div>
					</Dialog.Content>
				</Dialog.Root>

				<Button variant="outline" class="gap-2" on:click={copyYoutube}>
					<Share2 class="h-4 w-4" />
					Share
				</Button>
			</div>
		</div>
	</nav>

	<div class="relative mb-10 h-[50px] w-full overflow-hidden bg-muted blur-3xl">
		{#if isImageLoading}
			<Skeleton class="h-full w-full" />
		{/if}
		<img
			src={data.channelInfo.profilePicture}
			alt="Channel Profile Blur"
			class="h-full w-full object-cover"
			on:load={handleImageLoad}
			style={isImageLoading ? 'display: none;' : ''}
		/>
	</div>

	<!-- Channel Info Section -->
	<div class="container mx-auto px-6">
		<div class="-mt-12 mb-8 flex flex-col items-center gap-6 md:flex-row md:items-center">
			<!-- Profile Picture -->
			<div class="relative z-10 flex-shrink-0">
				<img
					src={data.channelInfo.profilePicture}
					alt="Channel Profile"
					class="h-24 w-24 rounded-full border-2 border-background shadow-lg md:h-32 md:w-32"
				/>
			</div>

			<!-- Channel Info -->
			<div class="mt-10 flex-grow text-center md:text-left">
				<h1 class="mb-2 text-3xl font-bold">{data.channelInfo.title}</h1>

				<!-- Channel Actions -->
				<div class="flex flex-wrap justify-center gap-3 md:justify-start">
					<Button
						variant="default"
						class="gap-2"
						on:click={() => window.open(getChannelUrl(), '_blank')}
					>
						<Youtube class="h-4 w-4" />
						Visit Channel
					</Button>

					<Dialog.Root>
						<Dialog.Trigger
							><Button variant="outline" class="gap-2">
								<ScrollText class="h-4 w-4" />
								Description
							</Button></Dialog.Trigger
						>
						<Dialog.Content class="sm:max-w-[50rem]">
							<Dialog.Header>
								<Dialog.Title>Description</Dialog.Title>
								<Dialog.Description>
									<p class="mb-4 max-w-2xl text-muted-foreground">{data.channelInfo.description}</p>
								</Dialog.Description>
							</Dialog.Header>
						</Dialog.Content>
					</Dialog.Root>

					<Button variant="outline" class="gap-2" on:click={copyYoutube}>
						<Share2 class="h-4 w-4" />
						Share
					</Button>
				</div>
			</div>
		</div>

		<!-- Stats Cards -->
		<div class="mb-12 grid grid-cols-1 gap-4 md:grid-cols-3">
			<Card class="border-primary/10 bg-primary/5 p-6 transition-colors hover:bg-primary/10">
				<div class="flex items-center space-x-4">
					<Users class="h-10 w-10 text-primary" />
					<div>
						<p class="text-sm text-muted-foreground">Subscribers</p>
						<h3 class="text-2xl font-bold">{formatNumber(data.channelStats.subscriberCount)}</h3>
					</div>
				</div>
			</Card>

			<Card class="border-primary/10 bg-primary/5 p-6 transition-colors hover:bg-primary/10">
				<div class="flex items-center space-x-4">
					<Eye class="h-10 w-10 text-primary" />
					<div>
						<p class="text-sm text-muted-foreground">Total Views</p>
						<h3 class="text-2xl font-bold">{formatNumber(data.channelStats.viewCount)}</h3>
					</div>
				</div>
			</Card>

			<Card class="border-primary/10 bg-primary/5 p-6 transition-colors hover:bg-primary/10">
				<div class="flex items-center space-x-4">
					<Video class="h-10 w-10 text-primary" />
					<div>
						<p class="text-sm text-muted-foreground">Videos</p>
						<h3 class="text-2xl font-bold">{formatNumber(data.channelStats.videoCount)}</h3>
					</div>
				</div>
			</Card>
		</div>

		<!-- Regular Videos Section -->
		{#if data.regularVideos && data.regularVideos.length > 0}
			<section class="mb-12">
				<h2 class="mb-6 flex items-center gap-2 text-2xl font-semibold">
					<Video class="h-6 w-6" />
					Latest Videos
				</h2>
				<div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
					{#each data.regularVideos as video}
						<Card class="group overflow-hidden transition-all duration-300 hover:shadow-lg">
							<a
								href={getYoutubeVideoUrl(video.id)}
								target="_blank"
								rel="noopener noreferrer"
								class="relative block"
							>
								<img
									src={video.thumbnail}
									alt={video.title}
									class="aspect-video w-full object-cover transition-transform duration-300 group-hover:scale-105"
								/>
								<Badge
									variant="secondary"
									class="absolute bottom-2 right-2 bg-black/30 text-white backdrop-blur-md transition duration-300 ease-in-out hover:bg-black/40"
								>
									{video.duration}
								</Badge>
							</a>
							<div class="p-4">
								<a
									href={getYoutubeVideoUrl(video.id)}
									target="_blank"
									rel="noopener noreferrer"
									class="transition-colors duration-200 hover:text-primary"
								>
									<h3 class="mb-2 line-clamp-2 font-semibold">{video.title}</h3>
								</a>
								<div class="flex items-center justify-between text-sm text-muted-foreground">
									<div class="flex items-center gap-4">
										<span class="flex items-center gap-1">
											<Eye class="h-4 w-4" />
											{formatNumber(video.viewCount)}
										</span>
										<span class="flex items-center gap-1">
											<ThumbsUp class="h-4 w-4" />
											{formatNumber(video.likeCount)}
										</span>
									</div>
									<span class="text-xs">
										{video.publishedAt}
									</span>
								</div>
							</div>
						</Card>
					{/each}
				</div>
			</section>
		{/if}

		<!-- Shorts Section -->
		{#if data.shorts && data.shorts.length > 0}
			<section class="mb-12">
				<h2 class="mb-6 flex items-center gap-2 text-2xl font-semibold">
					<Zap class="h-6 w-6" />
					Latest Shorts
				</h2>
				<div class="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-4">
					{#each data.shorts as video}
						<Card
							class="group w-[15rem] overflow-hidden transition-all duration-300 hover:shadow-lg"
						>
							<a
								href={getYoutubeVideoUrl(video.id)}
								target="_blank"
								rel="noopener noreferrer"
								class="relative block"
							>
								<img
									src={video.thumbnail}
									alt={video.title}
									class="aspect-[9/16] w-full object-cover transition-transform duration-300 group-hover:scale-105"
								/>
							</a>
							<div class="p-4">
								<a
									href={getYoutubeVideoUrl(video.id)}
									target="_blank"
									rel="noopener noreferrer"
									class="transition-colors duration-200 hover:text-primary"
								>
									<h3 class="mb-2 line-clamp-2 font-semibold">{video.title}</h3>
								</a>
								<div class="flex items-center justify-between text-sm text-muted-foreground">
									<span class="flex items-center gap-1">
										<Eye class="h-4 w-4" />
										{formatNumber(video.viewCount)}
									</span>
									<span class="text-xs">
										{video.publishedAt}
									</span>
								</div>
							</div>
						</Card>
					{/each}
				</div>
			</section>
		{/if}

		<Card
			class="group relative mb-12 cursor-pointer overflow-hidden transition-all duration-300 hover:shadow-lg"
			on:click={openChannelCommunity}
		>
			<!-- Channel Art Background -->
			<div class="absolute inset-0 z-0 overflow-hidden">
				<img
					src={data.channelInfo.bannerImage}
					alt="Channel Background"
					class="h-full w-full object-cover opacity-30 transition-all duration-300 group-hover:scale-105 group-hover:blur-sm"
				/>
			</div>

			<!-- Overlay Content -->
			<div class="relative z-10 flex flex-col items-center justify-center p-8 text-center">
				<h2 class="mb-2 text-2xl font-bold transition-transform duration-300 group-hover:scale-110">
					Channel Community
				</h2>
				<p class="mb-4 text-muted-foreground">
					Connect with other fans and engage with the channel
				</p>
				<Button variant="outline" class="">View Community</Button>
			</div>
		</Card>
	</div>
</div>

<p
	class="mb-4 text-center text-sm font-bold text-muted-foreground transition-colors duration-200 hover:text-primary"
>
	<a href="/blog/channelytics">Read blog. @Candy Cat</a>
</p>
