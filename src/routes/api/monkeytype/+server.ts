import type { RequestHandler } from '@sveltejs/kit';
import { json, error } from '@sveltejs/kit';

const username = 'candycat';

export const GET: RequestHandler = async () => {
	const url = `https://api.monkeytype.com/users/${username}/profile`;
	const response = await fetch(url);

	if (!response.ok) {
		throw error(response.status, 'Failed to fetch profile data');
	}

	const data = await response.json();

	const averageWpm = roundToTwoDecimals(calculateAverageWpm(data));
	const totalTimeMinutes = calculateTotalTimeMinutes(data); // No need to round minutes
	const accuracy = roundToTwoDecimals(calculateAccuracy(data));

	return json({ averageWpm, totalTimeMinutes, accuracy });
};

const calculateAverageWpm = (data: any): number => {
	const personalBests = data.data.personalBests;
	const timeSegments = Object.values(personalBests.time).flat();
	const wordSegments = Object.values(personalBests.words).flat();

	const allSegments = [...timeSegments, ...wordSegments];
	const totalWpm: any = allSegments.reduce((sum, segment:any) => sum + segment.wpm, 0);
	const averageWpm = totalWpm / allSegments.length;

	return averageWpm;
};

const calculateTotalTimeMinutes = (data: any): number => {
	const timeTypingSeconds = data.data.typingStats.timeTyping;
	const timeTypingMinutes = timeTypingSeconds / 60;
	return timeTypingMinutes;
};

const calculateAccuracy = (data: any): number => {
	const personalBests = data.data.personalBests;
	const timeSegments = Object.values(personalBests.time).flat();
	const wordSegments = Object.values(personalBests.words).flat();

	const allSegments = [...timeSegments, ...wordSegments];
	const totalAccuracy: any = allSegments.reduce((sum, segment:any) => sum + segment.acc, 0);
	const averageAccuracy = totalAccuracy / allSegments.length;

	return averageAccuracy;
};

const roundToTwoDecimals = (num: number): number => {
	return Math.round(num * 100) / 100;
};
