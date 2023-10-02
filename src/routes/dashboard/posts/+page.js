import { redirect } from '@sveltejs/kit';
import { getApi } from '$lib/utils';

export async function load({ params, parent }) {


	let par = await parent();


	let posts = await getApi('posts', par.token);

	return {
		posts
	};
}
