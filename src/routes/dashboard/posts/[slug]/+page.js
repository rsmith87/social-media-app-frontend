import { redirect } from '@sveltejs/kit';
import { getApi } from '$lib/utils';

export async function load({params, parent}) {

	if (!params.slug) {
		throw redirect(301, '/dashboard/posts');
	}

	let par = await parent();

	let posts = await getApi('posts/' + params.slug, par.token);

	return {
		posts
	};
}
