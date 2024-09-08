import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v10';

const DISCORD_TOKEN = process.env.DISCORD_TOKEN;
const CHANNEL_ID = '1282357550242857020';

interface ParsedMessage {
	name: string;
	description: string;
	timestamp: string;
}

export const GET: RequestHandler = async () => {
	if (!DISCORD_TOKEN) {
		console.error('Discord bot token is not set in the environment variables');
		return json({ error: 'Internal server error' }, { status: 500 });
	}

	const rest = new REST({ version: '10' }).setToken(DISCORD_TOKEN);

	try {
		const messages: any[] = (await rest.get(Routes.channelMessages(CHANNEL_ID))) as any[];

		const parsedMessages: ParsedMessage[] = messages
			.reverse()
			.map((msg) => {
				try {
					const content = JSON.parse(msg.content.replace(/`json|\n|`/g, ''));

					const name = content.name.substring(0, 32);

					return {
						name,
						description: content.description.substring(0, 1000),
						timestamp: content.timestamp
					};
				} catch (error) {
					console.error('Error parsing message:', error);
					return null;
				}
			})
			.filter((msg) => msg !== null);

		return json({ messages: parsedMessages.filter(Boolean) });
	} catch (error) {
		console.error('Error fetching messages from Discord:', error);
		return json({ error: 'Failed to fetch messages' }, { status: 500 });
	}
};
