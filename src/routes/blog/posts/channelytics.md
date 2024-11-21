---
title: Youtube Channel Anelytics Tool
date: '2024-11-21'
description: Introducing Channelytics — a free, simple YouTube analytics tool.
banner: /banners/channelytics-blog.png
published: true
interactive: true
---

# Breaking Free from Expensive YouTube Analytics

Let's be honest: YouTube analytics tools are ridiculously overpriced. As a content creator, I found myself frustrated by platforms charging hundreds of dollars per month for insights that should be accessible to everyone. So, I did what any self-respecting developer would do — I built my own solution.

## The Problem with Existing Tools

Most YouTube analytics platforms come with:

- Hefty monthly subscriptions
- Complex interfaces
- Features most creators never use
- Barriers to entry for small creators

My solution? [Channelytics](/channelytics) — a straightforward, user-friendly analytics tool that puts creators first.

## Key Features of Channelytics

- Free to use
- Clean, intuitive interface
- Essential metrics at your fingertips
- Direct YouTube API integration
- No complicated setup

## Interactive Channel Search

Want to explore channel analytics? Search for any YouTube channel below and get instant insights!

<script lang="ts">
  import { Button } from '$lib/components/ui/button';
  import { Input } from '$lib/components/ui/input';
  import { goto } from '$app/navigation';

  let searchQuery = '';
  let channels: Array<{
    id: string, 
    title: string, 
    description: string, 
    thumbnail: string
  }> = [];
  let loading = false;
  let error: string | null = null;

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
  }
</script>

<div class="space-y-3">
  <div class="flex items-center gap-2">
    <Input 
      type="text" 
      placeholder="Search YouTube Channels" 
      bind:value={searchQuery}
      class="flex-grow"
      on:keydown={(e) => e.key === 'Enter' && searchChannels()}
    />
    <Button 
      on:click={searchChannels} 
      disabled={loading}
      class="px-4 py-2"
    >
      {#if loading}
        Searching...
      {:else}
        Search
      {/if}
    </Button>
  </div>

{#if error}

<div class="text-red-500 text-sm">{error}</div>
{/if}

{#if channels.length > 0}

<div class="border rounded-lg overflow-y-auto max-h-72">
{#each channels as channel}
<div
class="flex items-center p-2 hover:bg-primary/10 cursor-pointer transition"
on:click={() => navigateToChannelAnalytics(channel.id)}
on:keydown={(e) => e.key === 'Enter' && navigateToChannelAnalytics(channel.id)}
tabindex="0"
role="button" >
<img 
            src={channel.thumbnail} 
            alt="{channel.title} profile" 
            class="w-10 h-10 rounded-full mr-3"
          />
<div class="truncate">
<h3 class="font-medium text-sm truncate">{channel.title}</h3>
<p class="text-xs text-gray-500 truncate">{channel.description}</p>
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

## Why I Built Channelytics

As a developer and content creator, I saw a gap in the market. Creators deserve accessible, straightforward analytics without breaking the bank. Channelytics is my contribution to leveling the playing field.

## Get Started

Ready to take control of your YouTube analytics?

- Visit [Channelytics](/channelytics)
- Input your channel
- Gain instant insights

Just data.

---

_Disclaimer: Channelytics is an independent project and is not officially affiliated with YouTube or Google._
