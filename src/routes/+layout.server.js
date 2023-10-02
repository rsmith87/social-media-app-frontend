import { getApi } from '$lib/utils/index.js';

export async function load({cookies}) {
	const xsrfToken = cookies.get('XSRF-TOKEN') ?? "";
	const apiKey = cookies.get('token') ?? "";
	// Get articles in the DB.
	let user = getApi('user', apiKey);
	if (!user) {
		user = '';
	}

	return {
		xsrfToken,
		user
	}
}