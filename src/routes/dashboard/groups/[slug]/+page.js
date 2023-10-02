import { getApi } from '$lib/utils';

export async function load({parent, params}) {
	let par = await parent();

	let groups = await getApi('groups/'+params.slug, par.token);

	return {
		groups,
	}
}