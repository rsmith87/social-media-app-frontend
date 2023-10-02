import { getApi } from '$lib/utils';

export async function load({parent, params, fetch}) {
	let par = await parent();

	let token = par.token;

	//let profile = 	let url = 'http://0.0.0.0/api/v1/' + endpoint;
	const profileApi = await fetch( 'http://0.0.0.0/api/v1/user/'+params.username+'/profile', {
		method: "GET",
		mode: 'cors',
		credentials: "include",
		headers: {
			'Content-Type': 'application/json',
			'Accept': 'application/json',
			'Authorization': 'Bearer ' + token ?? ''
		}
	});

	let profile = profileApi.json();
	//let profile = await getApi('user/'+params.username+'/profile', token);
	const postsApi = await fetch( 'http://0.0.0.0/api/v1/user/'+params.username+'/posts', {
		method: "GET",
		mode: 'cors',
		credentials: "include",
		headers: {
			'Content-Type': 'application/json',
			'Accept': 'application/json',
			'Authorization': 'Bearer ' + token ?? ''
		}
	});
	let posts = postsApi.json();
	//let posts = await getApi('user/'+params.username + '/posts', token);
	const mediaApi = await fetch( 'http://0.0.0.0/api/v1/user/'+params.username+'/media', {
		method: "GET",
		mode: 'cors',
		credentials: "include",
		headers: {
			'Content-Type': 'application/json',
			'Accept': 'application/json',
			'Authorization': 'Bearer ' + token ?? ''
		}
	});
	let media = mediaApi.json();
	//let media = await getApi('user/'+params.username+'/media', token);
	const commentsApi = await fetch( 'http://0.0.0.0/api/v1/comments/'+params.username, {
		method: "GET",
		mode: 'cors',
		credentials: "include",
		headers: {
			'Content-Type': 'application/json',
			'Accept': 'application/json',
			'Authorization': 'Bearer ' + token ?? ''
		}
	});
	let comments = commentsApi.json();
	//let comments = await getApi('comments/'+params.username, token);

	return {
		token,
		profile,
		posts,
		media,
		comments
	}
}