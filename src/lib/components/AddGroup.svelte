<script>
	import { apiKey } from '$lib/stores/apiKey.js';
	import { postApi, handleFrontEndFormData  } from '$lib/utils';
	import Button from './forms/Button.svelte';
	import CheckboxSlider from './forms/CheckboxSlider.svelte';
	import Input from './forms/Input.svelte';
	import Textarea from './forms/Textarea.svelte';

	async function handleGroupAdd(event) {
		let formData = await handleFrontEndFormData(event.target);
		let data = {
			post: formData.post
		}
		//let response = await postApi('post/comments/add', data, $apiKey);
		//return response.json();
		return data;
	}

</script>

<div class="bg-white py-2 px-2 rounded-md mb-4 sticky">
	<form on:submit={handleGroupAdd}>
		<h2 class="text-sm">Add group</h2>
		<Input
			label={"Name"}
			type={"text"}
			name={"name"}
			value={""}
			className={"mb-2"}
		/>
		<Textarea
			label={"Description"}
			name={"description"}
			className={"caret-orange-600 focus:bg-green-200 mb-2"}
		/>
		<label for="private" class="block mb-3"> Private
		<CheckboxSlider
			name={"private"}
		/>
		</label>
		<Button
			label={"Add group"}
			className={"bg-blue-500 hover:bg-blue-700 text-white font-bold "}
		/>
	</form>
</div>