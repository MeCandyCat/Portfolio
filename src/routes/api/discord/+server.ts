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
let clientReady = false;

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

client.once('ready', async () => {
	clientReady = true;
});

export const GET: RequestHandler = async () => {
	let status = 'offline';

	if (!clientReady) {
		try {
			await client.login(process.env.DISCORD_TOKEN);
			clientReady = true;
		} catch (error) {
			console.error('Error logging into Discord:', error);
			return json({ status: 'error', message: 'Failed to login to Discord' }, { status: 500 });
		}
	}

	status = await checkStatus();
	return json({ status });
};
