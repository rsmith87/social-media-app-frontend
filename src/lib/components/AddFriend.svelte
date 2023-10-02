<script>
	export let data;
	console.log(data);
	import { alert } from '$lib/stores/alert.js';
	import Button from './forms/Button.svelte';
	import Input from './forms/Input.svelte';
	import SearchUser from './search/SearchUser.svelte';
	import { enhance } from '$app/forms';

	let user = data.user.user;

	export let form;


</script>

{#if form?.success}
	{form?.success}
{/if}

<div class="bg-white py-2 px-2 rounded-md mb-4 sticky">
	<form method="POST" use:enhance>
		<input type="hidden" name="user_id" value="{user.id}" />
		<SearchUser
			className={"caret-orange-600 focus:bg-green-200 mb-2"}
			apiToken={data.token}
			xsrfToken={data.xsrfToken}
			user={data.user}
			inputName={"userSearch"}
		/>
		<Button
			label={"Send friend request"}
			className={"bg-blue-500 hover:bg-blue-700 text-white font-bold "}
			formAction={"?/sendFriendRequest"}
		/>
	</form>
</div>