import type { RequestHandler } from '@sveltejs/kit';
import fetch from 'node-fetch';

const apiKey = process.env.VITE_YOUTUBE_API_KEY;
const channelId = 'UC1kedgM-bFz56ph6J7GTkbA';

export const GET: RequestHandler = async () => {
	try {
		const url = `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${channelId}&key=${apiKey}`;
		const response = await fetch(url);
		const data: any = await response.json();

		if (data.items && data.items.length > 0) {
			const statistics = data.items[0].statistics;
			return new Response(
				JSON.stringify({
					subscriberCount: statistics.subscriberCount,
					videoCount: statistics.videoCount,
					totalViewCount: statistics.viewCount
				}),
				{ status: 200 }
			);
		} else {
			return new Response(JSON.stringify({ error: 'Channel not found' }), { status: 404 });
		}
	} catch (error) {
		console.error('Error fetching channel data:', error);
		return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
	}
};
