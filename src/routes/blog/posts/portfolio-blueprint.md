---
title: Blueprint of Magic
date: '2024-06-23'
description: Behind the scenes of this site.
banner: /banners/blueprint-blog.png
published: true
---

<script lang="ts">
    import { onMount } from 'svelte';
    import { toggleMode } from 'mode-watcher';
	import { Button } from '$lib/components/ui/button';
    import { Input } from '$lib/components/ui/input';
    import { Label } from '$lib/components/ui/label/';
    import * as Popover from '$lib/components/ui/popover';
	import Profile from '$lib/components/pfp.svelte';
	import Project from '$lib/components/project.svelte';
	import Tool from '$lib/components/tool.svelte';
	import MonkeytypeStats from '$lib/components/monkeytypeStats.svelte';
	import ChessStats from '$lib/components/chessStats.svelte';
	import Blog from '$lib/components/blog.svelte';

	import Sun from 'lucide-svelte/icons/sun';
	import Moon from 'lucide-svelte/icons/moon';

    let Profile_Png = 'https://i.imgur.com/EXxRTLB.png';
    let Profile_Gif = 'https://i.imgur.com/L3iJIfj.gif';
    let discordStatus = 'offline';
    let username = 'MeCandyCat';
    let repoName = 'Portfolio';

    async function fetchDiscordStatus() {
        try {
            const response = await fetch('/api/discord');
            const data = await response.json();
            discordStatus = data.status;
        } catch (error) {
            console.error('Error fetching Discord status:', error);
        }
    }

    onMount(() => {
        fetchDiscordStatus();
    });

    function getStatusColor(status: string): string {
        switch (status) {
            case 'online':
                return 'text-green-500';
            case 'idle':
                return 'text-yellow-500';
            case 'dnd':
                return 'text-red-500';
            case 'offline':
            default:
                return 'text-gray-500';
        }
    }
</script>

### The Beginning

This site started as a way to challenge myself and see how far I could go with UI design. When I began this project, it was just a blank canvas, and my ideas were equally empty. I started with a simple "Hello, world" text, a profile picture, and some cringe-worthy text. Little by little I improved the site, transforming the canvas into something beautiful and cool. I'm surprised at how far I've come. Even though this site seems like a static site, almost all the components have secrets, easter eggs, and are reactive. I will show stuff included from the top to bottom of the site.

### Stuff Used

I used Svelte, Tailwind CSS, and the Shad-cn UI library to make this site. I recommend everyone use a UI library because it makes the site consistent and efficient. Just add a <Button class="transition duration-300 ease-in-out hover:scale-95">component</Button> and not worry about styling. I used the font [Montserrat](https://fonts.google.com/specimen/Montserrat) throughout the site. Don't use more than two fonts as it slows down the site and adds a small time to render. Even on this site, it takes a noticeable time for the font to load, so don't use fonts unless it's required. In my case, I did it to make the text more appealing.

### Dark Mode and Light Mode

I've given many reasons why you should switch to dark mode in a different blog post. I myself am a dark mode enjoyer, so I added a theme switcher. The site looks way better in dark mode, but it is customized for both. A theme switcher like below is very easy to implement, and I recommend all developers do so.

<div class="flex justify-center">
    <Button on:click={toggleMode} variant="outline" size="icon">
        <Sun
                class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
            />
        <Moon
                class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
            />
        <span class="sr-only">Toggle theme</span>
    </Button>
</div>

### Profile

This is a pretty simple component. Try hovering over the profile picture below. The hovering triggers it to switch with another image. Just name the two images, and my component will switch between them. Pretty simple and pretty fun.
This is all I have to do to add the four profile pictures on the home site:

```html
<Profile Image1="static/profile/discord.png" Image2="static/profile/discord.gif" />
```

<div class="grid grid-cols-2 gap-4">
   <div>
   <Label for="png">PNG URL</Label>
    <Input
        type="text"
        placeholder="Enter PNG image URL"
        bind:value={Profile_Png}
        id="png"
    />
  </div>
  <div>
    <Label for="gif">GIF URL</Label>
    <Input
        type="text"
        placeholder="Enter GIF image URL"
        bind:value={Profile_Gif}
        id="gif"
    />
  </div>
</div>

<div class="grid grid-rows-1 justify-center">
    <Profile Image1={Profile_Png} Image2={Profile_Gif} />
    <span class="animate-bounce text-center">Hover me</span>
</div>

### Discord Card

<p class="inline">
In the Discord card, I wanted to show my Discord profile as it is, so I showed every public detail possible. Display name, username, avatar, banner, bio, badges, avatar decoration, profile effect, and even Discord availability. I am very active on Discord, so I had to make it special. I made a 
<Popover.Root>
  <Popover.Trigger>
  <span class="font-bold">Discord Bot</span>
  </Popover.Trigger>
  <Popover.Content class="flex w-auto">
    <img src="https://i.imgur.com/m7mb1VC.png" alt="Discord bot profile" class="rounded-md h-80 w-auto" />
  </Popover.Content>
</Popover.Root>
 {"(<-click)"} that checks my availability and displays it as the border color. In case you are wondering, I'm currently <span class={`uppercase font-bold ${getStatusColor(discordStatus)}`}>{discordStatus}</span>.
</p>

### GitHub Card

Originally, there was only the Discord card, which felt pretty empty, so I added a GitHub card. The problem I had was what to show in a GitHub card—just a button with a link? Then I checked my GitHub and thought, "What if I can show the stats I have here?" So, I used the GitHub API to pull data from my profile and show the number of contributions and commits. I made it so it gets my profile picture and displays it too, but it adds a slight delay and was unnecessary. GitHub is the first card that was dynamic, cutting down on changing the values manually. The numbers were later animated.

### YouTube Card

Using the Google API, it requests a JSON file and displays the shown data. To secure it from exposing the API token, I made a server-side function that visits `api/youtube`, and it provides the needed data for the stats card.

All of the social cards have a neat blur background animation. I used a cheat code for it—by getting the Discord profile effect URL, I made it the background of the card and gave it a blur, which came out nice.

### Repository Card

This is my most favorite card because of the amount of work that went into it. You might be surprised to know every detail you see is taken by an API. This only works for GitHub repositories. I made the component to be usable by anyone. Provide the username and the repo name, and it will render the card dynamically like magic. The biggest challenge I overcame in the component was, funnily enough, coloring the circle next to the language. I searched the web and found the [GitHub colors JSON by ohz](https://github.com/ozh/github-colors/blob/master/colors.json). Using it, I made a method to get the color and apply it as the circle color. Don't add many of these card because it will send a request to Github API for every card you have, And you might be rate-limited. Test the component yourself by entering the GitHub repo URL in the given text input.

```html
<Project username="MeCandyCat" repositoryName="Portfolio" />
```

<div class="grid grid-cols-2 gap-4 pb-4">
   <div>
   <Label for="git-username">GitHub Username</Label>
    <Input
        type="text"
        placeholder="Enter the GitHub username"
        bind:value={username}
        id="git-username"
    />
  </div>
  <div>
    <Label for="git-repo">Git Repo Name</Label>
    <Input
        type="text"
        placeholder="Enter the GitHub repo name"
        bind:value={repoName}
        id="git-repo"
    />
  </div>
</div>

{#key {username, repoName}}

<div class="flex justify-center not-prose">
    <Project username={username} repositoryName={repoName} />
</div>
{/key}

### Tool Component

This is the easiest and simplest component I have made. It shows tools I used when data is entered like below. The tools are entered into a TS file since pasting this block 10+ times looks bad.

```html
<Tool
	name="Adobe Photoshop"
	icon="/icons/PhotoShop.svg"
	badgeText="App"
	description="A professional image editing

 software"
	customStyle="w-[500px]"
/>
```

<div class="flex justify-center">
<Tool
    name="Adobe Photoshop"
    icon="/icons/PhotoShop.svg"
    badgeText="App"
    description="A professional image editing software"
    customStyle="not-prose w-[500px]"
/>
</div>

### Random Stats Section

The random stats section is made by the use of the API of the shown services, and the card body represents my appearance on the site. In Monkeytype, the card is similar to the theme I use on the site. If you are also using API(s) make sure to secure the tokens you are using.

### Conclusion

Building this site has been an incredible journey of learning and growth. From starting with a blank canvas to creating a dynamic and interactive portfolio, every step has been a new challenge and an opportunity to improve my skills.

I've used powerful tools like Svelte, Tailwind CSS, and the Shad-cn UI library to create a visually appealing design. Integrating APIs from platforms like GitHub, YouTube, MonkeyType and Chess.com has added a dynamic element, making the site more engaging and informative.

The experience has taught me the importance of consistency in design, the benefits of using a UI library, and the excitement of making something unique and functional. I hope this site not only showcases my skills but also inspires others to push their limits and explore the endless possibilities of web development.

If you are intrested in components used in the site feel free to get the [components from github](https://github.com/MeCandyCat/Portfolio/tree/main/src/lib/components). Thank you for taking the time to explore my site. Feel free to reach out if you have any questions or feedback. Keep coding and stay creative!
