import { env } from '$env/dynamic/public';

interface ChannelInfo {
	title: string;
	description: string;
	profilePicture: string;
	bannerImage: string;
	customUrl: string;
}

interface VideoStats {
	id: string;
	title: string;
	thumbnail: string;
	viewCount: string;
	likeCount: string;
	publishedAt: string;
	duration: string;
	isShort: boolean;
}

interface PageData {
	channelInfo: ChannelInfo;
	channelStats: {
		subscriberCount: string;
		viewCount: string;
		videoCount: string;
	};
	regularVideos: VideoStats[];
	shorts: VideoStats[];
}

function formatDuration(isoDuration: string): string {
	try {
		// Remove PT from the start
		const duration = isoDuration.substring(2);

		let hours = 0;
		let minutes = 0;
		let seconds = 0;

		// Extract hours if present
		const hourIndex = duration.indexOf('H');
		if (hourIndex !== -1) {
			hours = parseInt(duration.substring(0, hourIndex));
		}

		// Extract minutes if present
		const minIndex = duration.indexOf('M');
		if (minIndex !== -1) {
			const startIndex = hourIndex !== -1 ? hourIndex + 1 : 0;
			minutes = parseInt(duration.substring(startIndex, minIndex));
		}

		// Extract seconds if present
		const secIndex = duration.indexOf('S');
		if (secIndex !== -1) {
			const startIndex = minIndex !== -1 ? minIndex + 1 : hourIndex !== -1 ? hourIndex + 1 : 0;
			seconds = parseInt(duration.substring(startIndex, secIndex));
		}

		// Format the duration string
		if (hours > 0) {
			return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
		} else {
			return `${minutes}:${seconds.toString().padStart(2, '0')}`;
		}
	} catch (error) {
		console.error('Error formatting duration:', error);
		return '0:00';
	}
}

function isShortVideo(duration: string, title: string, description: string): boolean {
	try {
		// Remove PT from the start of duration
		const durationStr = duration.substring(2);

		// Check if duration is less than or equal to 60 seconds
		let totalSeconds = 0;

		const hourIndex = durationStr.indexOf('H');
		const minIndex = durationStr.indexOf('M');
		const secIndex = durationStr.indexOf('S');

		if (hourIndex !== -1) {
			totalSeconds += parseInt(durationStr.substring(0, hourIndex)) * 3600;
		}

		if (minIndex !== -1) {
			const startIndex = hourIndex !== -1 ? hourIndex + 1 : 0;
			totalSeconds += parseInt(durationStr.substring(startIndex, minIndex)) * 60;
		}

		if (secIndex !== -1) {
			const startIndex = minIndex !== -1 ? minIndex + 1 : hourIndex !== -1 ? hourIndex + 1 : 0;
			totalSeconds += parseInt(durationStr.substring(startIndex, secIndex));
		}

		// Check if duration is less than or equal to 60 seconds
		const isDurationShort = totalSeconds <= 60;

		// Check if title or description contains #shorts
		const hasShortTag =
			title.toLowerCase().includes('#shorts') ||
			description.toLowerCase().includes('#shorts') ||
			title.toLowerCase().includes('#short') ||
			description.toLowerCase().includes('#short');

		return isDurationShort || hasShortTag;
	} catch (error) {
		console.error('Error checking if video is short:', error);
		return false;
	}
}

export const load = async ({ url }): Promise<PageData> => {
	try {
		const urlParams = new URLSearchParams(url.search);
		const channelId = urlParams.get('channelId') || 'UC1kedgM-bFz56ph6J7GTkbA';
		const API_KEY = process.env.VITE_YOUTUBE_API_KEY;

		// Fetch channel info
		const channelResponse = await fetch(
			`https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics,brandingSettings&id=${channelId}&key=${API_KEY}`
		);
		const channelData = await channelResponse.json();

		if (!channelData.items?.[0]) {
			throw new Error('No channel data found');
		}

		const channelInfo = {
			title: channelData.items[0].snippet.title,
			description: channelData.items[0].snippet.description,
			profilePicture: channelData.items[0].snippet.thumbnails.high.url,
			bannerImage: channelData.items[0].brandingSettings.image?.bannerExternalUrl || '',
			customUrl: channelData.items[0].snippet.customUrl || channelId
		};

		const channelStats = {
			subscriberCount: channelData.items[0].statistics.subscriberCount,
			viewCount: channelData.items[0].statistics.viewCount,
			videoCount: channelData.items[0].statistics.videoCount
		};

		// Fetch all recent videos
		const videosResponse = await fetch(
			`https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&order=date&maxResults=50&type=video&key=${API_KEY}`
		);
		const videosData = await videosResponse.json();

		if (!videosData.items?.length) {
			throw new Error('No videos found');
		}

		// Get detailed video information
		const videoIds = videosData.items.map((item: any) => item.id.videoId).join(',');
		const videoDetailsResponse = await fetch(
			`https://www.googleapis.com/youtube/v3/videos?part=contentDetails,statistics,snippet&id=${videoIds}&key=${API_KEY}`
		);
		const videoDetailsData = await videoDetailsResponse.json();

		if (!videoDetailsData.items?.length) {
			throw new Error('No video details found');
		}

		const allVideos = videoDetailsData.items.map((item: any) => ({
			id: item.id,
			title: item.snippet.title,
			thumbnail: item.snippet.thumbnails.high.url,
			viewCount: item.statistics.viewCount || '0',
			likeCount: item.statistics.likeCount || '0',
			publishedAt: new Date(item.snippet.publishedAt).toLocaleDateString(),
			duration: formatDuration(item.contentDetails.duration),
			isShort: isShortVideo(
				item.contentDetails.duration,
				item.snippet.title,
				item.snippet.description
			)
		}));

		const shorts = allVideos.filter((video) => video.isShort).slice(0, 4);
		const regularVideos = allVideos.filter((video) => !video.isShort).slice(0, 4);

		// For community posts, we'll return an empty array as YouTube API v3
		// doesn't provide direct access to community posts

		return {
			channelInfo,
			channelStats,
			regularVideos,
			shorts
		};
	} catch (error) {
		console.error('Error loading data:', error);
		return {
			channelInfo: {
				title: 'Channel unavailable',
				description: 'Could not load channel information',
				profilePicture: '',
				bannerImage: '',
				customUrl: ''
			},
			channelStats: {
				subscriberCount: '0',
				viewCount: '0',
				videoCount: '0'
			},
			regularVideos: [],
			shorts: []
		};
	}
};
