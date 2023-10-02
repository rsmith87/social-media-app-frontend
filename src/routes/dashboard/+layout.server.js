export async function load({cookies, fetch}) {
	// The only thing we need to worry about getting from server side is the xsrf-token and apikey `token`
	// for use by the api calls throughout the app.  We are passing those to the front-end and calling
	// the APIs there so we can more easily incorporate reactivity.  This is the way.
	const xsrfToken = cookies.get('XSRF-TOKEN') ?? "";
	const token = cookies.get('token') ?? "";



	const response = await fetch( 'http://0.0.0.0/api/v1/user', {
		method: "GET",
		mode: 'cors',
		credentials: "include",
		headers: {
			'Content-Type': 'application/json',
			'Accept': 'application/json',
			'Authorization': 'Bearer ' + token ?? '',
			'X-XSRF-TOKEN': xsrfToken,
		}
	});

	let user = await response.json();

	return {
		xsrfToken,
		token,
		user
	}
}
