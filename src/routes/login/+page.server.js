import { redirect } from '@sveltejs/kit';

export async function load({ cookies, fetch }) {
	/**
	 * Sets the cookies needed to handle further requests.
	 * This sets the 'XSRF-TOKEN' needed to pass with all requests.
	 */
	let csrf = await fetch('/sanctum/csrf-cookie').then(function(item) {
		return item;
	})

	// Getting cookie that was set by the sanctum call above and passing to the page.
	const visited = cookies.get('XSRF-TOKEN') ?? '';

	return {
		visited
	};
}

export const actions = {
	csrf: async ({fetch, cookies, request}) => {
		// Sets the XSRF-TOKEN in cookies when called.
		let csrf = await fetch('/sanctum/csrf-cookie').then(function(item) {
			return item;
		})

		const data = await request.formData();

		const email = data.get('email');
		const password = data.get('password')

		let postData = {
			email: email,
			password: password,
		}

		let xsrfToken = decodeURIComponent(cookies.get('XSRF-TOKEN'))

		let login = await fetch('http://0.0.0.0/api/login', {
			method: "POST",
			mode: 'cors',
			credentials: "include",
			headers: {
				'Accept': 'application/json',
				'X-XSRF-TOKEN': xsrfToken,
				'Content-Type': 'application/json'
			}, 
			body: JSON.stringify(postData),
		});

		let json = await login.json();
		cookies.set('token', json.token);
		throw redirect(302, '/dashboard');

	}
}