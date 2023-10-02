<script>
	import { apiKey } from '$lib/stores/apiKey.js';
	import { postApi, handleFrontEndFormData  } from '$lib/utils';
	import Button from './forms/Button.svelte';
	import Input from './forms/Input.svelte';
	import Textarea from './forms/Textarea.svelte';
	import { enhance } from '$app/forms';

	async function handleMediaAdd(event) {
		let formData = await handleFrontEndFormData(event.target);
		let data = {
			post: formData.post
		}
		//let response = await postApi('post/comments/add', data, $apiKey);
		//return response.json();
		return data;
	}

</script>

<div class="bg-white py-2 px-2 rounded-md mb-4">
	<form method="POST" use:enhance>
		<Input
			label={"Name"}
			type={"file"}
			name={"file"}
			value={""}
			className={"mb-2"}
		/>
		<Textarea
			label={"Description"}
			name={"description"}
			className={"caret-orange-600 focus:bg-green-200"}
		/>
		<Button
			label={"Add media"}
			className={"bg-blue-500 hover:bg-blue-700 text-white font-bold"}
			formAction={'?/addMedia'}
		/>
	</form>
</div>