---
title: I hate Light mode
date: '2024-05-16'
description: you should too.
banner: /banners/light-mode-blog.png
published: true
interactive: false
---

<script lang="ts">
	import { setMode } from "mode-watcher";
	import { Button } from '$lib/components/ui/button';

	import Sun from 'lucide-svelte/icons/sun';
	import Moon from 'lucide-svelte/icons/moon';
</script>

As someone who spends a considerable amount of time on digital devices, I've developed a strong aversion to one particular setting: light mode. It's not just a personal preference; it's a choice rooted in practicality and consideration for my own well-being. Here’s why I can't stand light mode, and why I believe you might feel the same way once you consider the facts.

## Blinding Brightness

Firstly, let's talk about the blinding brightness. Light mode assaults my eyes with its stark, glaring white background. Whether I'm scrolling through a document, browsing the web, or checking my messages, that intense brightness feels like staring directly into a flashlight. It strains my eyes and leaves me feeling fatigued after only a short period. It's like subjecting yourself to an overly lit room where you can't escape the harsh glare.

## Contrast Issues

Then there's the issue of contrast. Light mode tends to feature black text on a white background. While this might seem like a classic combination, it's far from optimal for extended reading. The stark contrast can cause what's known as "halation," where the letters seem to bleed into the background, making it harder to focus and comprehend the text. It's like trying to read a book under a spotlight – uncomfortable and distracting.

## Sleep Hygiene

Furthermore, using light mode late into the evening isn't just annoying!! it can mess with our sleep. Studies have found that looking at bright screens, especially those emitting blue light like many devices do, can throw off my body's internal clock and mess with the hormone that helps me sleep, melatonin. It tricks my brain into thinking it's still daytime, which makes it tough to relax and get a good night's sleep.

## Battery Drain

On a practical level, light mode also drains my device's battery faster, especially if I'm using a device with an OLED or AMOLED display. White pixels consume significantly more power than darker ones, meaning I'm not just straining my eyes, but also burning through battery life unnecessarily.

## Embracing Dark Mode

In contrast, dark mode is a much more sensible choice. The dark background reduces eye strain by providing a softer, more comfortable viewing experience, especially in low-light environments. Text appears sharper and easier to read without the harsh contrast of light mode.

Furthermore, dark mode is energy-efficient, extending battery life and reducing the overall environmental impact of our digital habits. It's a win-win for both my eyes and the planet.

So, why do I hate light mode? It's simple: it's uncomfortable, it's impractical, and it disrupts my well-being. Dark mode, on the other hand, offers a more user-friendly experience that respects both my eyes and the technology I use. If you haven't already made the switch, I highly recommend giving dark mode a try. Your eyes – and your sleep schedule – will thank you for it.

So, **set** your mode to dark!
<Button on:click={() => setMode("dark")} variant="outline" size="icon">
<Sun
        class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
    />
<Moon
        class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
    />
</Button>
