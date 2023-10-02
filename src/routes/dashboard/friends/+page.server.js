import { getApi, postApi, deleteApi } from '$lib/utils';

/** @type {import('./$types').Actions} */
export const actions = {
	removeFriend: async ({cookies, request}) => {
		const data = await request.formData();

		const user_id = data.get('user_id');
		const friend_id = data.get('friend_id');

		let postData = {
			friend_id: friend_id,
			user_id: user_id
		}

		let friendDelete = await deleteApi('friends', postData, cookies.get('token'), cookies.get('XSRF-TOKEN'));

		return { success: true };
	},

	acceptFriend: async ({fetch, cookies, request}) => {

		const data = await request.formData();

		let friend_id = data.get('friend_id');
		let user_id = data.get('user_id');

		let postData = {
			user_id: user_id,
			friend_id: friend_id,
			status_code: 'A'
		}

		let friendAccept = await postApi('friends/requests/accept', postData, cookies.get('token'), cookies.get('XSRF-TOKEN'));

		return { success: true };
	},

	rejectFriend: async ({fetch, cookies, request}) => {

		const data = await request.formData();

		let friend_id = data.get('friend_id');
		let user_id = data.get('user_id');

		let postData = {
			user_id: user_id,
			friend_id: friend_id,
			status_code: 'D'
		}

		let friendReject = await postApi('friends/requests/reject', postData, cookies.get('token'), cookies.get('XSRF-TOKEN'));

		return { success: true };
	},

	sendFriendRequest: async ({cookies, request, fetch}) => {
		const data = await request.formData();

		let friend = data.get('userSearch');
		let user_id = data.get('user_id');

		// Get friend requesting user_id
		//let getFriendUser = await getApi('user/'+friend, cookies.get('token'), cookies.get('XSRF-TOKEN'));

		let response = await fetch( 'http://0.0.0.0/api/v1/user/'+friend, {
			method: "GET",
			mode: 'cors',
			credentials: "include",
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json',
				'Authorization': 'Bearer ' + cookies.get('token') ?? '',
				'XSRF-TOKEN': cookies.get('XSRF-TOKEN')
			}
		}).then(function(item) {
			return item.json();
		});
		let postData = {
			user_id: user_id,
			friend_id: response.id,
			status_code: 'R'
		};

		let friendRequest = await postApi('friends', postData, cookies.get('token'), cookies.get('XSRF-TOKEN'));
		// TODO: handle errors
		return { success: true };
	},

	cancelSendFriendRequest: async ({request, cookies, fetch}) => {
		const data = await request.formData();

		let friend_id = data.get('friendId');

		let apiData = {
			'friend_id': friend_id,
		};

		let response = await fetch( 'http://0.0.0.0/api/v1/friends', {
			method: "DELETE",
			mode: 'cors',
			credentials: "include",
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json',
				'Authorization': 'Bearer ' + cookies.get('token') ?? '',
				'XSRF-TOKEN': cookies.get('XSRF-TOKEN')
			},
			body: JSON.stringify(apiData)
		}).then(function(item){
			return item.json();
		});

		return { success: true };
	}
}