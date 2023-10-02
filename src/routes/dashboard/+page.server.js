import { postApi, deleteApi } from '$lib/utils';
import { fail } from '@sveltejs/kit';

/** @type {import('./$types').Actions} */
export const actions = {
	addComment: async ({cookies, request}) => {
		//console.log(event);
		const data = await request.formData();

		let postId = data.get('post_id');
		let userId = data.get('user_id');
		let slug = data.get('slug');
		let comment = data.get('comment');

		let xsrfToken = cookies.get('xsrfToken');
		let apiKey = cookies.get('token');

		let formData = {
			user_id: userId,
			post_id: postId,
			slug: slug,
			comment: comment
		}

		let response = await postApi('posts/' + slug +'/comments', formData, apiKey, xsrfToken);

		if (!response) {
			return fail(400, { comment, message: 'There was not a response from the server.  Please try again later.'})
		}

		if (response) {
			return { success: true }
		}
	},
	addPost: async ({cookies, request}) => {

		const data = await request.formData();
		let xsrfToken = cookies.get('xsrfToken');
		let apiKey = cookies.get('token');
		let tags = [];
		let postContent = data.get('post');
		let createSlug = postContent.split(' '); // Array of all words 
		let originalWordArray = postContent.split(' ');

		let type = 0;
		let privatePost = data.get('private') ?? 0;
		let sharedArticleId = data.get('sharedArticleId');


		let bangContent = createSlug.filter((word) => ! word.startsWith('!')); // Any word not prefixed with !
		let bangTags = createSlug.filter((word) => word.startsWith('!')); // Words prefixed with !

		//TODO: make createSlug into a sentence again with a space between the words.
		let newContent = bangContent.join(' ');
		let slug = createSlug.splice(0, 3).join('-').toLowerCase();

		let formData = {
			slug: slug,
			content: newContent,
			type: type,
			private: privatePost,
			shared_article_id: Number(sharedArticleId)
		}

		let response = await postApi('posts/post', formData, apiKey, xsrfToken);

		// This creates the array of words that are prefixed with !
		// We're using createSlug because it puts each word as an item in an array
		// We're building an stringified array of tags to send to the tagcontroller::post
		if (await response && bangTags.length > 0 ) {
			let stringifiedTags = JSON.stringify(bangTags);
			let tagFormData = {
				tags: stringifiedTags,
				post_id: response.id,
			}
			let tagResponse = await postApi('posts/post/tags', tagFormData, apiKey, xsrfToken);

			if ( tagResponse ) {
				return { success: true }
			}
		} else if (await response && tags.length === 0) {
			return { success: true }
		} else {
			return { success: false }
		}
	},
	removePost: async ({cookies, request}) => {

		const data = await request.formData();

		const post_slug = data.get('slug');
		const user_id = data.get('user_id');

		let postData = {
			slug: post_slug,
			user_id: user_id,
		}

		let token = cookies.get('token');

		const response = await fetch( 'http://0.0.0.0/api/v1/posts/' + post_slug + '/delete', {
			method: "DELETE",
			mode: 'cors',
			credentials: "include",
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json',
				'Authorization': 'Bearer ' + token ?? '',
				'X-XSRF-TOKEN': cookies.get('XSRF-TOKEN'),
			},
			body: JSON.stringify(postData)
		});

		let postDelete = await response.json();

	//	let postDelete = await deleteApi('posts/' + post_slug + '/delete', postData, cookies.get('token'), cookies.get('XSRF-TOKEN'));
		//console.log(postDelete);
		return { success: true };
	},
	addMedia: async ({cookies, request}) => {
		const data = await request.formData();

		let postData = {
			'name': 'name',
			'path': 'idk',
		};
		
		let mediaPost = await postApi('media/', postData, cookies.get('token'), cookies.get('XSRF-TOKEN'));

		return { success: true };
	},
	handleArticleReaction: async ({cookies, request}) => {
		let formData = await request.formData();
		let actualEntry;

		let entries = [...formData.entries()];

		let token = cookies.get('token');

		entries.forEach(function(entry) {
			if (entry[1] === '') {
				actualEntry = entry[0];
			}
		})

		let data = {
			'article_id': Number(formData.get('article_id')),
			'reactionType': actualEntry
		};

		const response = await fetch( 'http://0.0.0.0/api/v1/articles/' + formData.get('article_id') + '/react', {
			method: "POST",
			mode: 'cors',
			credentials: "include",
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json',
				'Authorization': 'Bearer ' + token ?? ''
			},
			body: JSON.stringify(data)
		});

		let reactionResponse = await response.json();

		return { success: true }
		
	},
	starArticle: async ({cookies, request}) => {
		let formData = await request.formData();
		let postId = formData.get('postId');
		let token = cookies.get('token');
		let data = {
			post_id: postId
		};

		const response = await fetch('http://0.0.0.0/api/v1/posts/post/favorite', {
			method: "POST",
			mode: "cors",
			credentials: "include",
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json',
				'Authorization': 'Bearer ' + token ?? ''	
			},
			body: JSON.stringify(data)
		});

		let favoritePostResponse = await response.json();

		return { success: true }
	}
}