---
title: Blueprint of Magic
date: '2024-06-27'
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

    import Sun from 'lucide-svelte/icons/sun';
    import Moon from 'lucide-svelte/icons/moon';
    import Eye from 'lucide-svelte/icons/eye';

    let Profile_Png = 'https://i.imgur.com/EXxRTLB.png';
    let Profile_Gif = 'https://i.imgur.com/L3iJIfj.gif';
    let discordStatus = 'offline';
    let tempUsername = 'MeCandyCat';
    let tempRepoName = 'Portfolio';
    let username = 'MeCandyCat';
    let repoName = 'Portfolio';

    function handleClick() {
        username = tempUsername;
        repoName = tempRepoName;
    }

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
                return ' font-bold uppercase text-green-500';
            case 'idle':
                return ' font-bold uppercase text-yellow-500';
            case 'dnd':
                return ' font-bold uppercase text-red-500';
            case 'offline':
            default:
                return ' font-bold uppercase text-gray-500';
        }
    }
</script>

### The Beginning

This site started as a personal challenge to see how far I could push my UI design skills. Initially, it was just a blank canvas with a simple "Hello, world" text, a profile picture, and some cringe-worthy content. Over time, I transformed this bare-bones setup into something much more polished and interactive. I’m genuinely surprised at how far I’ve come. Despite the site appearing static, almost all components are interactive, featuring secrets and Easter eggs. Here, I'll walk you through the various components from top to bottom.

### Technologies Used

I built this site using Svelte, Tailwind CSS, and the Shad-cn UI library. I highly recommend using a UI library for consistency and efficiency. For example, you can add a <Button class="transition duration-300 ease-in-out hover:scale-95">component</Button> without worrying about styling. I used the [Montserrat](https://fonts.google.com/specimen/Montserrat) font throughout the site. Avoid using more than two fonts, as it can slow down your site and increase rendering time. Although I used a custom font for aesthetics, it does add a noticeable load time. And smooth animations are made using [Motion One](https://motion.dev/).

### Dark Mode and Light Mode

I’m a big fan of dark mode and have written about its benefits in another blog post. This site features a theme switcher, making it easy to switch between dark and light modes. Implementing a theme switcher is straightforward, and I recommend all developers include one.

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

This was made possible by [Mode Watcher](https://mode-watcher.svecosystem.com/), a simple theme handling library for Svelte.

### Profile

The profile component is simple yet fun. Hover over the profile picture below to see it switch between two images. Here’s how I set it up:

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

The implementation uses Svelte’s reactivity:

```html
<script>
    export let Image1: string;
    export let Image2: string;
    export let customStyle: string = '';

    let isHovered = false;

    function handleMouseEnter() {
        isHovered = true;
    }

    function handleMouseLeave() {
        isHovered = false;
    }
</script>

<img
    src={isHovered ? Image2 : Image1}
    on:mouseenter={handleMouseEnter}
    on:mouseleave={handleMouseLeave}
    class={`z-10 h-24 w-24 rounded-full ${customStyle}`}
    alt="Profile"
/>
```

### Discord Card

The Discord card displays my Discord profile details, including display name, username, avatar, banner, bio, badges, avatar decoration, and status. I’m very active on Discord, so I made this card special. I took it a bit further by making a Discord Bot that tracks my status and porvides the needed data to change the border color to showcase my status.
<Popover.Root>
<Popover.Trigger>
<span class="font-bold">Discord Bot</span>
</Popover.Trigger>
<Popover.Content class="flex w-auto">
<img src="https://i.imgur.com/m7mb1VC.png" alt="Discord bot profile" class="rounded-md h-80 w-auto" />
</Popover.Content>
</Popover.Root> ({"<-click"})

In case you are wondering I'm curruntly <span class=${getStatusColor(discordStatus)}>{discordStatus}</span>.

### GitHub Card

Originally, there was only the Discord card, which felt pretty empty, so I added a GitHub card. The problem I had was what to show in a GitHub card—just a button with a link? Then I checked my GitHub and thought, “What if I can show the stats I have here?” So, I used the GitHub API to pull data from my profile and show the number of contributions and commits. I made it so it gets my profile picture and displays it too, but it adds a slight delay and was unnecessary. GitHub is the first card that was dynamic, cutting down on changing the values manually. The numbers were later animated.

### Git Repository Card

This is my most favorite card because of the amount of work that went into it. You might be surprised to know every detail you see is taken by an API. This only works for GitHub repositories. I made the component to be usable by anyone. Provide the username and the repo name, and it will render the card dynamically like magic. The biggest challenge I overcame in the component was, funnily enough, coloring the circle next to the language. I searched the web and found the [GitHub colors JSON by ohz](https://github.com/ozh/github-colors/blob/master/colors.json). Using it, I made a method to get the color and apply it as the circle color. Don’t add many of these card because it will send a request to Github API for every card you have, And you might be rate-limited. Test the component yourself by entering the GitHub repo URL in the given text input.

```html
<Project username="MeCandyCat" repositoryName="Portfolio" />
```

<div class="grid grid-cols-2 gap-4 pb-4">
  <div>
    <Label for="git-username">GitHub Username</Label>
    <Input
      type="text"
      placeholder="Enter the GitHub username"
      bind:value={tempUsername}
      id="git-username"
    />
  </div>
  <div>
    <Label for="git-repo">Git Repo Name</Label>
    <Input
      type="text"
      placeholder="Enter the GitHub repo name"
      bind:value={tempRepoName}
      id="git-repo"
    />
  </div>
</div>
<div class="flex justify-center pb-4">
    <Button on:click={handleClick}>
        <Eye class="w-4 h-4 mr-2" /> Update
    </Button>
</div>

{#key {username, repoName}}

  <div class="flex justify-center not-prose">
    <Project username={username} repositoryName={repoName} />
  </div>
{/key}

To implement this card, I created a `github-utils` function that requests data from GitHub. You can access it [here](https://github.com/MeCandyCat/Portfolio/blob/main/src/lib/components/githubutils/index.ts), and the Project Card implementation can be found [here](https://github.com/MeCandyCat/Portfolio/blob/main/src/lib/components/project.svelte).

### Tool Component

The Tool component is straightforward. It displays tools I’ve used with the provided data. Here’s an example:

```html
<Tool
	name="Adobe Photoshop"
	icon="/icons/PhotoShop.svg"
	badgeText="App"
	description="A professional image editing software."
	customStyle="w-[500px]"
/>
```

### Random Stats Section

The Random Stats section displays stats using APIs from various services. Each card represents my activity on the respective site, like Monkeytype, with a similar theme to the site. Ensure you secure any API tokens used.

### Blog Page

There is few ways on creating a static blog page.

- Static HTML/CSS/JS
- Content Management Systems (CMS)
- Custom Backend
- Using Markdown

These options have pros and cons but the best method is using **Markdown** structure. For the blog page, I chose Markdown with [Mdsvex](https://mdsvex.pngwn.io/), a powerful tool that combines .md and Svelte, allowing for dynamic content and allows me to work with .md and svelte together! I can use script tags and dynamic stuff with in the markdown file. It takes quite time to setup but the end result is worth it.

And I made a API to give the blog page details. The details are added in the top of the blog as a comment and being extracted by the API and given to display it on `/blog` page.

### SEO Friendly

Additionally I have made this site to be able to be searchable. This process is called Site mapping. By providing the search engines the map of the page [(example here)](/sitemap.xml).

Site mapping is essential for SEO as it creates a structured outline of the website's content and hierarchy. This helps search engines crawl and index the site efficiently, leading to improved visibility and organic search rankings.

### Conclusion

Building this site has been an incredible journey of learning and growth. From starting with a blank canvas to creating a dynamic and interactive portfolio, every step has been a new challenge and an opportunity to improve my skills.

I've used powerful tools like Svelte, Tailwind CSS, and the Shad-cn UI library to create a visually appealing design. Integrating APIs from platforms like GitHub, YouTube, MonkeyType and Chess.com has added a dynamic element, making the site more engaging and informative.

The experience has taught me the importance of consistency in design, the benefits of using a UI library, and the excitement of making something unique and functional. I hope this site not only showcases my skills but also inspires others to push their limits and explore the endless possibilities of web development.

If you are interested in components used in the site feel free to get the [components from github](https://github.com/MeCandyCat/Portfolio/tree/main/src/lib/components). Thank you for taking the time to explore my site. Feel free to reach out if you have any questions or feedback. Keep coding and stay creative!
