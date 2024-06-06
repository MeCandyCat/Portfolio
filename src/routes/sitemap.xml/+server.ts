import type { RequestHandler } from './$types';

const site = 'https://candycat.fretro.com'; // change this to reflect your domain
const staticPages: string[] = ['/', '/blog']; // populate this with all the static slugs

const apiEndpoint = 'https://candycat.fretro.com/api/posts'; // API endpoint for blog posts

export const GET: RequestHandler = async ({ url }) => {
  const response = await fetch(apiEndpoint);
  const posts: { slug: string, published: boolean }[] = await response.json();

  // Extract slugs from posts
  const blogPages = posts
    .filter((post) => post.published) // only include published posts
    .map((post) => post.slug);

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
