import { getApi } from '$lib/utils';

export async function load({parent, params, fetch}) {
	let par = await parent();
	let token = par.token;

	const response = await fetch( 'http://0.0.0.0/api/v1/articles/'+params.slug, {
		method: "GET",
		mode: 'cors',
		credentials: "include",
		headers: {
			'Content-Type': 'application/json',
			'Accept': 'application/json',
			'Authorization': 'Bearer ' + token ?? ''
		}
	});

	let news = response.json();

	return {
		news,
	}
}