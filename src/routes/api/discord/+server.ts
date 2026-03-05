import { Client, GatewayIntentBits, ActivityType } from 'discord.js';
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
const CDN = 'https://cdn.discordapp.com';
let clientReady = false;

interface CustomStatus {
	text: string | null;
	emojiName: string | null;
	emojiUrl: string | null;
}

interface SpotifyActivity {
	song: string;
	artist: string;
	album: string;
	albumArtUrl: string | null;
	trackUrl: string | null;
	startedAt: number | null;
	endsAt: number | null;
}

interface GameActivity {
	name: string;
	details: string | null;
	state: string | null;
	largeImageUrl: string | null;
	smallImageUrl: string | null;
	largeImageText: string | null;
	smallImageText: string | null;
	startedAt: number | null;
}

interface Activity {
	type: 'playing' | 'streaming' | 'listening' | 'watching' | 'competing';
	name: string;
	spotify: SpotifyActivity | null;
	game: GameActivity | null;
}

interface Presence {
	status: string;
	customStatus: CustomStatus | null;
	activities: Activity[];
}

interface UserCosmetics {
	avatarUrl: string | null;
	avatarDecorationUrl: string | null;
	nameplateUrl: string | null;
	nameplatePalette: string | null;
}

async function checkPresence(): Promise<Presence> {
	try {
		for (const [, guild] of client.guilds.cache) {
			const member = await guild.members.fetch({ user: userId, withPresences: true });
			if (!member?.presence) continue;

			const { presence } = member;

			// Pull custom status out separately
			let customStatus: CustomStatus | null = null;
			const customAct = presence.activities.find((a) => a.type === ActivityType.Custom);
			if (customAct) {
				const emoji = customAct.emoji;
				customStatus = {
					text: customAct.state ?? null,
					emojiName: emoji?.name ?? null,
					emojiUrl: emoji?.id ? `${CDN}/emojis/${emoji.id}.${emoji.animated ? 'gif' : 'png'}` : null
				};
			}

			// All non-custom activities
			const activities: Activity[] = presence.activities
				.filter((a) => a.type !== ActivityType.Custom)
				.map((act) => {
					let spotify: SpotifyActivity | null = null;
					if (act.type === ActivityType.Listening && act.name === 'Spotify') {
						spotify = {
							song: act.details ?? 'Unknown',
							artist: act.state ?? 'Unknown',
							album: act.assets?.largeText ?? 'Unknown',
							albumArtUrl: act.assets?.largeImageURL() ?? null,
							trackUrl: act.syncId ? `https://open.spotify.com/track/${act.syncId}` : null,
							startedAt: act.timestamps?.start?.getTime() ?? null,
							endsAt: act.timestamps?.end?.getTime() ?? null
						};
					}

					let game: GameActivity | null = null;
					if (act.type === ActivityType.Playing) {
						game = {
							name: act.name,
							details: act.details ?? null,
							state: act.state ?? null,
							largeImageUrl: act.assets?.largeImageURL({ size: 512 }) ?? null,
							smallImageUrl: act.assets?.smallImageURL({ size: 512 }) ?? null,
							largeImageText: act.assets?.largeText ?? null,
							smallImageText: act.assets?.smallText ?? null,
							startedAt: act.timestamps?.start?.getTime() ?? null
						};
					}

					const typeMap: Record<number, Activity['type']> = {
						[ActivityType.Playing]: 'playing',
						[ActivityType.Streaming]: 'streaming',
						[ActivityType.Listening]: 'listening',
						[ActivityType.Watching]: 'watching',
						[ActivityType.Competing]: 'competing'
					};

					return {
						type: typeMap[act.type] ?? 'playing',
						name: act.name,
						spotify,
						game
					};
				});

			return { status: presence.status, customStatus, activities };
		}
		return { status: 'offline', customStatus: null, activities: [] };
	} catch (error) {
		console.error('Error fetching presence:', error);
		return { status: 'error', customStatus: null, activities: [] };
	}
}

async function fetchCosmetics(): Promise<UserCosmetics> {
	try {
		const res = await fetch(`https://discord.com/api/v10/users/${userId}`, {
			headers: { Authorization: `Bot ${process.env.DISCORD_TOKEN}` }
		});

		if (!res.ok) {
			console.error('Failed to fetch user:', res.status, await res.text());
			return { avatarUrl: null, avatarDecorationUrl: null, nameplateUrl: null };
		}

		const user = await res.json();

		const avatarHash: string | null = user.avatar ?? null;
		const avatarUrl = avatarHash
			? `${CDN}/avatars/${userId}/${avatarHash}.${avatarHash.startsWith('a_') ? 'gif' : 'png'}?size=1024`
			: `${CDN}/embed/avatars/${Number(BigInt(userId) >> 22n) % 6}.png`;

		const decorationAsset: string | null = user.avatar_decoration_data?.asset ?? null;
		const avatarDecorationUrl = decorationAsset
			? `${CDN}/avatar-decoration-presets/${decorationAsset}.png`
			: null;

		const nameplate = user.collectibles?.nameplate ?? null;
		const nameplateAsset: string | null = nameplate?.asset ?? null;
		const nameplatePalette: string | null = nameplate?.palette ?? null;
		const nameplateUrl = nameplateAsset
			? `${CDN}/assets/collectibles/${nameplateAsset}asset.webm`
			: null;

		return { avatarUrl, avatarDecorationUrl, nameplateUrl, nameplatePalette };
	} catch (error) {
		console.error('Error fetching cosmetics:', error);
		return { avatarUrl: null, avatarDecorationUrl: null, nameplateUrl: null };
	}
}

client.once('ready', () => {
	clientReady = true;
});

export const GET: RequestHandler = async () => {
	if (!clientReady) {
		try {
			await client.login(process.env.DISCORD_TOKEN);
			clientReady = true;
		} catch (error) {
			console.error('Error logging into Discord:', error);
			return json({ status: 'error', message: 'Failed to login to Discord' }, { status: 500 });
		}
	}

	const [presence, cosmetics] = await Promise.all([checkPresence(), fetchCosmetics()]);

	return json({
		status: presence.status,
		customStatus: presence.customStatus,
		activities: presence.activities,
		avatarUrl: cosmetics.avatarUrl,
		avatarDecorationUrl: cosmetics.avatarDecorationUrl,
		nameplateUrl: cosmetics.nameplateUrl,
		nameplatePalette: cosmetics.nameplatePalette
	});
};
