import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import fetch from 'node-fetch';

const cooldown = 5000;
let lastRequestTime = 0;
const maxNameLength = 32;
const maxDescriptionLength = 1000;

function rateLimit(): boolean {
	const now = Date.now();
	if (now - lastRequestTime < cooldown) {
		return false;
	}
	lastRequestTime = now;
	return true;
}

export const POST: RequestHandler = async ({ request }) => {
	if (!rateLimit()) {
		return json({ error: 'Too many requests' }, { status: 429 });
	}

	const { name, message } = await request.json();

	if (!name || name.length > maxNameLength) {
		return json(
			{ error: `Name is required and cannot exceed ${maxNameLength} characters` },
			{ status: 400 }
		);
	}

	if (!message || message.length > maxDescriptionLength) {
		return json(
			{ error: `Message is required and cannot exceed ${maxDescriptionLength} characters` },
			{ status: 400 }
		);
	}

	const discordWebhookUrl = process.env.DISCORD_WEBHOOK_URL;

	if (!discordWebhookUrl) {
		console.error('Discord webhook URL is not set in the environment variables');
		return json({ error: 'Internal server error' }, { status: 500 });
	}

	const timestamp = new Date().toISOString();

	try {
		const response = await fetch(discordWebhookUrl, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				content: `
{
  "name": "${name.substring(0, maxNameLength)}",
  "description": "${message}",
  "timestamp": "${timestamp}"
}
`
			})
		});

		if (!response.ok) {
			throw new Error(`Discord API responded with status ${response.status}`);
		}

		return json({ message: 'Message sent successfully', timestamp });
	} catch (error) {
		console.error('Error sending webhook to Discord:', error);
		return json({ error: 'Failed to send message' }, { status: 500 });
	}
};
