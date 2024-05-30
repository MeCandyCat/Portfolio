<script lang="ts">
    import { onMount } from 'svelte';
    import { Button } from '$lib/components/ui/button';
    import * as Card from '$lib/components/ui/card';
    import Profile from '$lib/components/pfp.svelte';
    import Play from 'lucide-svelte/icons/youtube';

    let subscriberCount: string | null = '0';
    let videoCount: string | null = '0';
    let totalViewCount: string | null = '0';

    const apiKey = process.env.VITE_YOUTUBE_API_KEY;
    const channelId = 'UC1kedgM-bFz56ph6J7GTkbA';

    async function fetchChannelData(): Promise<void> {
        const url = `https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics,brandingSettings&id=${channelId}&key=${apiKey}`;
        try {
            const response = await fetch(url);
            const data = await response.json();
            if (data.items && data.items.length > 0) {
                const statistics = data.items[0].statistics;

                subscriberCount = statistics.subscriberCount;
                videoCount = statistics.videoCount;
                totalViewCount = statistics.viewCount;
            }
        } catch (error) {
            console.error('Error fetching channel data:', error);
        }
    }

    onMount(() => {
        fetchChannelData();
    });
</script>

<div class="flex items-center justify-center">
    <Card.Root class="relative w-[350px] overflow-hidden">
        <div class="w-full bg-cover aspect-[2.5/1]">
            <img src="banners/youtube-channel-art.png" class="object-center object-cover w-full h-full" alt="YouTube Channel Art" />
        </div>
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
                I have posted <span class="font-semibold text-sky-500">{videoCount}</span> videos and gained 
                <span class="font-semibold text-sky-500">{subscriberCount}</span> subscribers. Total 
                <span class="font-semibold text-sky-500">{totalViewCount}</span> views.<br />
                <span class="text-slate-500">Currently inactive.</span>
            </p>

            <div class="z-10 mt-4 flex md:mt-6">
                <Button
                    href="https://www.youtube.com/@candycatmc"
                    target="_blank"
                    class="transition duration-300 ease-in-out hover:scale-95"
                >
                    <Play class="mr-2 h-4 w-4" /> YouTube
                </Button>
            </div>
        </div>
        <div class="h-5 w-full animate-pulse bg-red-600 opacity-10 blur-xl dark:opacity-50" />
    </Card.Root>
</div>