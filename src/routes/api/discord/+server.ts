import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ fetch }) => {
	try {
		const response = await fetch('https://candycat.fretro.com/.netlify/functions/discordActivity');

		if (!response.ok) {
			throw new Error(`Error fetching Discord status: ${response.status} ${response.statusText}`);
		}

		const data = await response.json();
		return json(data);
	} catch (error) {
		console.error('Error fetching Discord status:', error);
		return json({ status: 'error' }, { status: 500 });
	}
};
