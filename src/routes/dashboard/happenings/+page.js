export async function load({parent, fetch, cookies}) {

	let par = await parent();

	const happeningsResponse = await fetch( 'http://0.0.0.0/api/v1/happenings', {
		method: "GET",
		mode: 'cors',
		credentials: "include",
		headers: {
			'Content-Type': 'application/json',
			'Accept': 'application/json',
			'Authorization': 'Bearer ' + par.token ?? ''
		}
	});

	let happenings = await happeningsResponse.json();

	return {
		happenings
	}
}