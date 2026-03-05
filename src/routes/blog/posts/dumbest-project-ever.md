---
title: Functionally Dysfunctional
date: '2025-04-03'
description: A Hilarious Chat App Adventure.
banner: /banners/functionally-dysfunctional-blog.png
published: true
interactive: false
---

# Why Did I Do This to Myself?

One day, I decided to practice my coding skills by building a chat app. Now, most sensible developers would start with a traditional backend and database. But where's the fun in that? Clearly, I'm not most developers—I'm the kind of developer who looks at conventional wisdom and says, "Hold my energy drink."


> Very secure <br />
> — Sun Tzu

_definitely said this_

## V1: The Birth of a Questionable Idea 💡

I hatched a plan so brilliantly stupid, it could only come from a caffeine-fueled coding session: Why use a database when you can use Discord as your message storage? 🤯

Here's how my "genius" plan worked:

- Send a message? Straight to a Discord webhook!
- Load the chat? A bot retrieves messages from the channel
- Security? what's that?

### The Resulting Chaos

- No username verification (Enter as "Supreme Overlord" or "Potato Master")
- Loading times slower than a sloth doing yoga
- Bot retrieving messages like it's gathering berries one by one

## V2: Adding Some Semblance of Sanity 🔐

After my friends test-drove this digital disaster, I decided to add some basic security:

- Account system (Because why not complicate things further?)
- Login/signup via a single button (Minimalism meets chaos)
- Token-based authentication
- Bot checks an #accounts channel for credentials

The bot now loads messages more efficiently, proving that even a chaotic system can evolve... slightly.

## V3? More Like Fever Dreams 💭

While I have no immediate plans to continue this masterpiece of madness, here are features that could transform this from "what were you thinking?" to "wait, that's actually kind of cool":

### Potential Features

- **Message Edit & Delete**:

  - Use Discord Message ID for tracking (include it in /api/chat-log)
  - Show edit/delete buttons only to message owners
  - Verify user token before allowing modifications

- **Reactions**:
  - Track reactions in a separate Discord channel
    or
  - Simplified reaction tracking with count-based system
    This feature is very complecated to implement if a optimized product needs to be made.

## Test it your self!

Project hosted live at [NO-HOST](https://no-host.fretro.com/) :)

_Disclaimer: No databases were harmed in the making of this application. Several Discord webhooks, however, may need therapy._
