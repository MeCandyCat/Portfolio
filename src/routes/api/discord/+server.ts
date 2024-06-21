import { Client, GatewayIntentBits } from 'discord.js';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import 'dotenv/config';

const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildPresences,
		GatewayIntentBits.GuildMembers
	]
});
const userId = '806415408495460362';

async function checkStatus(): Promise<string> {
	try {
		for (const [guildId, guild] of client.guilds.cache) {
			const member = await guild.members.fetch(userId);
			if (member) {
				return member.presence ? member.presence.status : 'offline';
			}
		}
		return 'offline';
	} catch (error) {
		console.error('Error fetching user status:', error);
		return 'error';
	}
}

export const GET: RequestHandler = async () => {
	let status = 'offline';

	if (client.isReady()) {
		status = await checkStatus();
	} else {
		client.once('ready', async () => {
			status = await checkStatus();
		});

		await client.login(process.env.DISCORD_TOKEN);
	}

	return json({ status });
};
