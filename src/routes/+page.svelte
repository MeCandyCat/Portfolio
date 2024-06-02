<script lang="ts">
	import { toggleMode } from 'mode-watcher';
	import { Button } from '$lib/components/ui/button';
	import Profile from '$lib/components/pfp.svelte';
	import Discord from '$lib/components/discord.svelte';
	import Github from '$lib/components/github.svelte';
	import Youtube from '$lib/components/youtube.svelte';
	import Project from '$lib/components/project.svelte';
	import Tool from '$lib/components/tool.svelte';
	import Blog from '$lib/components/blog.svelte';

	import Sun from 'lucide-svelte/icons/sun';
	import Moon from 'lucide-svelte/icons/moon';
	import News from 'lucide-svelte/icons/newspaper';
</script>

<!-- Embed Card Details -->
<svelte:head>
	<title>Candy Cat</title>

	<meta content="Candy Cat Portfolio" property="og:title" />
	<meta content="A website to show i exsist." property="og:description" />
	<meta content="/banners/hello-world-embed.png" property="og:image" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:image" content="/banners/hello-world-embed.png" />
	<meta content="#6141e8" data-react-helmet="true" name="theme-color" />
</svelte:head>

<div class="overflow-x-hidden">
	<div class="static h-10 w-full bg-gradient-to-br from-violet-600 to-indigo-600 blur-3xl" />
	<div class="absolute top-0 m-5 flex items-center gap-3">
		<Button on:click={toggleMode} variant="outline" size="icon">
			<Sun
				class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
			/>
			<Moon
				class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
			/>
			<span class="sr-only">Toggle theme</span>
		</Button>
		<Button variant="outline" href="/blog" size="icon"><News class="h-4 w-4" /></Button>
	</div>
	<h1
		class="scroll-m-20 bg-gradient-to-br from-violet-600 to-indigo-600 bg-clip-text pt-10 text-center text-4xl font-extrabold tracking-tight text-transparent lg:text-5xl"
	>
		Hello, World!
	</h1>
	<h1
		class="scroll-m-20 pb-4 pr-24 pt-10 text-center text-4xl font-extrabold tracking-tight lg:text-5xl"
	>
		I am
	</h1>
	<div class="flex items-center justify-center">
		<Profile Image1="profile/discord.png" Image2="profile/discord.gif" />
	</div>
	<h2
		class="-rotate-5 bg-gradient-to-b from-slate-900 to-violet-600 bg-clip-text pb-10 text-center text-8xl font-bold text-transparent dark:from-slate-50 dark:to-violet-600"
	>
		Candy Cat
	</h2>
	<p class="mx-auto max-w-screen-xl px-8 pb-10 text-justify text-xl leading-7">
		Hello! I'm Candy Cat, a developer with a passion for creating efficient and user-friendly web
		solutions. With few years of experience in web development, I specialize in
		<span class="font-semibold text-red-500">Svelte</span>
		& <span class="font-semibold text-blue-500">Tailwind CSS</span>. My goal is to contribute
		valuable code and innovative ideas to projects that make a difference. I've worked on various
		projects, including Discord Bot and currently working on a secret project soon to be open
		sourse. These experiences have honed my problem-solving skills and taught me the importance of
		writing clean, maintainable code. I enjoy collaborating with teams to tackle challenges and
		deliver high-quality solutions. Outside of coding, I like to stay updated with the latest
		developments in technology and explore new tools that can enhance my productivity. I believe in
		continuous learning and enjoy experimenting with different technologies to expand my skill set.
		I mostly work with my friend
		<a
			href="https://mud.fretro.com/"
			target="_blank"
			class="text-orange-500 underline decoration-dashed underline-offset-4 hover:opacity-75"
			>@mud</a
		> to build websites. We started Fretro to share our work to the world.
	</p>

	<div class="mx-auto grid max-w-screen-lg gap-4 sm:grid-cols-1 lg:grid-cols-3">
		<Discord />
		<Github />
		<Youtube />
	</div>

	<h1 class="py-10 text-center text-xl">— Projects I worked on —</h1>

	<div class="mx-auto flex max-w-screen-xl flex-wrap justify-center gap-4 pb-8">
		<Project username="MeCandyCat" repositoryName="Portfolio" />
		<Project username="MeCandyCat" repositoryName="LMS" />
		<Project username="MeCandyCat" repositoryName="LMS-Dash" />
		<Project username="MeCandyCat" repositoryName="beats-player" />
	</div>

	<h1 class="py-10 text-center text-xl">— Tools I have used —</h1>
	<div class="flex flex-wrap justify-around pb-8">
		<Tool
			name="Adobe Photoshop"
			icon="/icons/PhotoShop.svg"
			badgeText="App"
			description="A professional image editing software."
		/>
		<Tool
			name="Adobe Premire"
			icon="/icons/PremirePro.svg"
			badgeText="App"
			description="A professional video editing software."
		/>
		<Tool
			name="SvelteKit"
			icon="/icons/Svelte.svg"
			badgeText="Library"
			description="A JavaScript Framework."
		/>
		<Tool
			name="React"
			icon="/icons/React.svg"
			badgeText="Library"
			description="A JavaScript Framework."
		/>
		<div class="group">
		<div class="dark:prose-img:invert prose-img:opacity-85 dark:prose-img:opacity-75 group-hover:prose-img:opacity-100">
		<Tool
			name="NextJS"
			icon="/icons/NextJS.svg"
			badgeText="Library"
			description="A React Framework."
		/>
		</div>
		</div>
		<Tool
			name="Tailwind Css"
			icon="/icons/TailwindCss.svg"
			badgeText="Library"
			description="A utility-first CSS Framework."
		/>
		<Tool
			name="Discord JS"
			icon="/icons/DiscordJS.svg"
			badgeText="Library"
			description="Haddle Discord API to create Discord Bots."
		/>
		<Tool
			name="Git"
			icon="/icons/Git.svg"
			badgeText="Other"
			description="Version control system."
		/>
	</div>
	<Blog />
</div>
