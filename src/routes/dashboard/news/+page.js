import { getApi } from '$lib/utils';

export async function load({parent, fetch}) {
	console.log("HERE");
	let par = await parent();
	let token = par.token;
	console.log(par);

	const response = await fetch( 'http://0.0.0.0/api/v1/articles', {
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

	const reactionResponse = await fetch( 'http://0.0.0.0/api/v1/reactions', {
		method: "GET",
		mode: 'cors',
		credentials: "include",
		headers: {
			'Content-Type': 'application/json',
			'Accept': 'application/json',
			'Authorization': 'Bearer ' + token ?? ''
		}
	});

	let reactionTypes = reactionResponse.json();

	return {
		news,
		reactionTypes
	}
}