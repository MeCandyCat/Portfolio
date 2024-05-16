export async function load({ params }) {
	const post = await import(`../posts/${params.slug}.md`);
	const { title, date, banner } = post.metadata;
	const content = post.default;

	return {
		content,
		title,
		date,
		banner
	};
}
