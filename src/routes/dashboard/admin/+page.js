export async function load({parent, fetch}) {

	let par = await parent();
	let token = par.token;

	// TODO: Get all users with roles and permissions
	const response = await fetch('http://0.0.0.0/api/v1/admin/users', {
		method: "GET",
		mode: 'cors',
		credentials: "include",
		headers: {
			'Content-Type': 'application/json',
			'Accept': 'application/json',
			'Authorization': 'Bearer ' + token ?? ''
		}
	});

	let users = await response.json();	


	return  {
		token,
		users
	}
}