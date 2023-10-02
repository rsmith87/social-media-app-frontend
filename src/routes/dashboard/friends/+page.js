import { getApi } from '$lib/utils';

export async function load({parent, fetch}) {

	let par = await parent();
	let token = par.token;

	const response = await fetch( 'http://0.0.0.0/api/v1/friends', {
		method: "GET",
		mode: 'cors',
		credentials: "include",
		headers: {
			'Content-Type': 'application/json',
			'Accept': 'application/json',
			'Authorization': 'Bearer ' + token ?? ''
		}
	});

	let friends = response.json();
	const requestsResponse = await fetch( 'http://0.0.0.0/api/v1/friends/requests', {
		method: "GET",
		mode: 'cors',
		credentials: "include",
		headers: {
			'Content-Type': 'application/json',
			'Accept': 'application/json',
			'Authorization': 'Bearer ' + token ?? ''
		}
	});

	let requests = requestsResponse.json();

	return {
		friends,
		requests
	}
}