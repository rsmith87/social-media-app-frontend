<script>
	export let postId;
	export let slug;
	export let user;
	export let form;
	import { enhance } from '$app/forms';
	import { alert } from '$lib/stores/alert.js';

	if (form?.message) {
		$alert = form?.message;
	}
</script>

<form method="POST" use:enhance>
	<p>Have something to add?</p>
	<input type="hidden" name="post_id" value="{postId}" />
	<input type="hidden" name="user_id" value="{user.id}" />
	<input type="hidden" name="slug" value="{slug}" />
	<textarea name="comment" class="caret-orange-600 focus:bg-green-200 mb-2" ></textarea>
	{#if form?.message}<p class="error">{form?.message}</p>{/if}
	<button class="bg-blue-500 hover:bg-blue-700 text-white font-bold" formaction="?/addComment">
		Add comment
	</button>
</form>