<script>
export let apiToken;
export let xsrfToken;
import { postApi } from '$lib/utils';
let searchItemsToShow;
$: searchReturn = searchItemsToShow;

async function handleSearchPost(event) {
	let target = event.target;

	// Send api request here?
	let data = {
		search: target.value
	};
	let searchItems = await postApi('search/posts', data, apiToken, xsrfToken);

	if(searchItems.length > 0) {
		searchItemsToShow = searchItems
	}

}
</script>

<form on:input={handleSearchPost}>
	<label for="search"> Search
		<input type="text" name="search" class="caret-orange-600 focus:bg-green-200" />
	</label>
</form>

{#if searchItemsToShow}
	<div class="bg-white">
		{#each searchReturn as search}
			<p><a href="/dashboard/posts/{search.slug}">{search.content}</a></p>
			<p>{search.slug}</p>
			<p>{search.private}</p>
		{/each}
	</div>
{/if}