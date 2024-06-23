import type { RequestHandler } from '@sveltejs/kit';
import { error, json } from '@sveltejs/kit';

const CHESS_API_BASE_URL = 'https://api.chess.com/pub/player';

export const GET: RequestHandler = async () => {
	const username = 'mecandycat';

	const response = await fetch(`${CHESS_API_BASE_URL}/${username}/stats`);
	if (!response.ok) {
		throw error(response.status, `Failed to fetch stats`);
	}
	const data = await response.json();

	// Extract rapid stats
	const rapidStats = data.chess_rapid;
	const rating = rapidStats?.last?.rating || 0;
	const { win: rapidWin = 0, loss: rapidLoss = 0, draw: rapidDraw = 0 } = rapidStats?.record || {};

	// Sum wins, losses, and draws across all game types
	const gameTypes = ['chess_blitz', 'chess_bullet', 'chess_daily', 'chess_rapid'];
	let totalWins = 0;
	let totalLosses = 0;
	let totalDraws = 0;

	gameTypes.forEach((gameType) => {
		const gameStats = data[gameType];
		if (gameStats) {
			totalWins += gameStats.record?.win || 0;
			totalLosses += gameStats.record?.loss || 0;
			totalDraws += gameStats.record?.draw || 0;
		}
	});

	return json({
		rapid: { rating },
		total: { wins: totalWins, losses: totalLosses, draws: totalDraws }
	});
};
