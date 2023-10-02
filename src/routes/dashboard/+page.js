
export async function load({parent, fetch}) {

	let par = await parent();
	let token = par.token;

	const response = await fetch( 'http://0.0.0.0/api/v1/dashboard', {
		method: "GET",
		mode: 'cors',
		credentials: "include",
		headers: {
			'Content-Type': 'application/json',
			'Accept': 'application/json',
			'Authorization': 'Bearer ' + token ?? ''
		}
	});

	let dashboard = await response.json();
	
	const userResponse = await fetch( 'http://0.0.0.0/api/v1/user', {
		method: "GET",
		mode: 'cors',
		credentials: "include",
		headers: {
			'Content-Type': 'application/json',
			'Accept': 'application/json',
			'Authorization': 'Bearer ' + token ?? ''
		}
	});

	let user = await userResponse.json();

	return {
		dashboard,
		user
	}
}