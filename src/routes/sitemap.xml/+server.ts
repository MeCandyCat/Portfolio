import type { Post } from '$lib/types';
import type { RequestHandler } from './$types';

export const prerender = true;

const site = 'https://candycat.fretro.com'; // change this to reflect your domain
const staticPages: string[] = ['/', '/blog']; // populate this with all the static slugs

async function getPosts() {
	let posts: Post[] = [];

	const paths = import.meta.glob('/src/routes/blog/posts/*.md', { eager: true });

	for (const path in paths) {
		const file = paths[path];
		const slug = '/blog/' + path.split('/').at(-1)?.replace('.md', '');
		console.log();
		if (file && typeof file === 'object' && 'metadata' in file && slug) {
			const metadata = file.metadata as Omit<Post, 'slug'>;
			const post = { ...metadata, slug } satisfies Post;
			post.published && posts.push(post);
		}
	}

	posts = posts.sort(
		(first, second) => new Date(second.date).getTime() - new Date(first.date).getTime()
	);

	return posts;
}
export const GET: RequestHandler = async () => {
	const blogPosts = await getPosts();

	// Extract slugs from blog posts
	const blogPages = blogPosts.map((post) => post.slug);
	const pages = [...staticPages, ...blogPages];

	const body = sitemap(pages);
	const res = new Response(body);
	res.headers.set('Cache-Control', 'max-age=0, s-maxage=3600');
	res.headers.set('Content-Type', 'application/xml');
	return res;
};

const sitemap = (pages: string[]) => `<?xml version="1.0" encoding="UTF-8" ?>
<urlset
  xmlns="https://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:news="https://www.google.com/schemas/sitemap-news/0.9"
  xmlns:xhtml="https://www.w3.org/1999/xhtml"
  xmlns:mobile="https://www.google.com/schemas/sitemap-mobile/1.0"
  xmlns:image="https://www.google.com/schemas/sitemap-image/1.1"
  xmlns:video="https://www.google.com/schemas/sitemap-video/1.1"
>
  ${pages
		.map((page) => {
			const priority = page === '/' || page === '/blog' ? '1.0' : '0.5';
			return `
  <url>
    <loc>${site}${page}</loc>
    <changefreq>monthly</changefreq>
    <priority>${priority}</priority>
  </url>
  `;
		})
		.join('')}
</urlset>`;
