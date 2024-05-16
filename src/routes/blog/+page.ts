import type { Post } from '$lib/types';

export let load = async ({ fetch }) => {
	const response = await fetch('api/posts');
	const posts: Post[] = await response.json();
	return { posts };
};
