import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ url }) => {
	const query = url.searchParams.get('q');

	if (!query) {
		throw error(400, 'Search query is required');
	}

	try {
		const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;

		if (!API_KEY) {
			throw error(500, 'YouTube API key is not configured');
		}

		const response = await fetch(
			`https://www.googleapis.com/youtube/v3/search?part=snippet&type=channel&q=${encodeURIComponent(query)}&key=${API_KEY}&maxResults=10`
		);

		if (!response.ok) {
			throw error(response.status, 'Failed to fetch YouTube channels');
		}

		const data = await response.json();

		const channels = data.items.map((item: any) => ({
			id: item.snippet.channelId,
			title: item.snippet.channelTitle,
			description: item.snippet.description,
			thumbnail: item.snippet.thumbnails.default.url
		}));

		return json(channels);
	} catch (err) {
		console.error('YouTube search error:', err);
		throw error(500, 'Internal server error during YouTube search');
	}
};
