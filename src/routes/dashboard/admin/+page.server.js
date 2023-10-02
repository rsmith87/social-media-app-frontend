import { getApi, postApi, deleteApi } from '$lib/utils';

/** @type {import('./$types').Actions} */
export const actions = {
	updateUserRole: async ({cookies, request}) => {
		const data = await request.formData();

		const user_id = data.get('user_id');
		const role = data.get('role');

		let postData = {
			'user_id':user_id,
			'role':role
		};

		let roleUpdate = await postApi('admin/users/roles/update', postData, cookies.get('token'), cookies.get('XSRF-TOKEN'));

		return { success: true };
	}
}

