import type { Post } from '$lib/types';
import { error } from '@sveltejs/kit';

export const prerender = true;

async function getPosts(): Promise<Post[]> {
	let posts: Post[] = [];
	const paths = import.meta.glob('/src/routes/blog/posts/*.md', { eager: true });

	for (const path in paths) {
		const file = paths[path];
		const slug = path.split('/').at(-1)?.replace('.md', '');

		if (file && typeof file === 'object' && 'metadata' in file && slug) {
			const metadata = file.metadata as Omit<Post, 'slug'>;
			const post: Post = { ...metadata, slug };

			if (post.published) {
				posts.push(post);
			}
		}
	}

	posts = posts.sort(
		(first, second) => new Date(second.date).getTime() - new Date(first.date).getTime()
	);

	return posts;
}

export async function load() {
	try {
		const posts = await getPosts();
		return { posts };
	} catch (e) {
		console.error('Error loading posts:', e);
		throw error(500, 'Error loading blog posts');
	}
}

export function entries() {
	const paths = import.meta.glob('/src/routes/blog/posts/*.md', { eager: true });
	return Object.keys(paths).map((path) => {
		const slug = path.split('/').at(-1)?.replace('.md', '');
		return { slug };
	});
}
