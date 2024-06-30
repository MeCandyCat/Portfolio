import { Client, GatewayIntentBits } from 'discord.js';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import fs from 'fs';
import 'dotenv/config';

const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildPresences,
		GatewayIntentBits.GuildMembers
	]
});
const userId = '806415408495460362';
const statusFilePath = 'src/routes/api/discord/status.json';

let isLoggedIn = false;

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

function readStatusFromFile(): string {
	try {
		const data = fs.readFileSync(statusFilePath, 'utf-8');
		const json = JSON.parse(data);
		return json.status || 'offline';
	} catch (error) {
		console.error('Error reading status from file:', error);
		return 'offline';
	}
}

function writeStatusToFile(status: string): void {
	try {
		const data = JSON.stringify({ status }, null, 2);
		fs.writeFileSync(statusFilePath, data, 'utf-8');
	} catch (error) {
		console.error('Error writing status to file:', error);
	}
}

async function updateStatus() {
	const status = await checkStatus();
	writeStatusToFile(status);
}

export const GET: RequestHandler = async () => {
	let status = readStatusFromFile();

	if (!isLoggedIn) {
		client.once('ready', () => {
			isLoggedIn = true;
			updateStatus();
		});
		await client.login(process.env.DISCORD_TOKEN);
	} else {
		updateStatus();
	}

	return json({ status });
};
