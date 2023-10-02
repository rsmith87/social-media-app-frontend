<script>
export let apiToken;
export let xsrfToken;
export let user;
export let inputName;
export let className;
import { postApi } from '$lib/utils';
let searchItemsToShow;
$: searchReturn = searchItemsToShow;

async function handleSearchUser(event) {
	let target = event.target;

	// Send api request here?
	let data = {
		search: target.value
	};
	let searchItems = await postApi('search/users', data, apiToken, xsrfToken);

	if(searchItems.length > 0) {
		searchItemsToShow = searchItems
	}
}

async function moveUsernameToField(event) {
	let target = event.target;
	let friendId = target.getAttribute('data-friend-id');
	let userId = target.getAttribute('data-user-id');
	let username = target.getAttribute('data-search-username');

	let field = document.getElementsByName(inputName);

	field[0].value = username;
	let dropdown = document.getElementsByClassName('user-search-return');
	if (dropdown) {
		dropdown[0].remove();
	}
}
</script>

<div class="search-user__container">

	<label for="search"> Search
		<input type="text" name={inputName} class="{className}" value="" on:input={handleSearchUser} />
	</label>


{#if searchItemsToShow}
	<div class="bg-white user-search-return">
		{#each searchReturn as search}
			<p>
				<a
					href="#"
					data-search-username={search.username}
					data-friend-id={search.id}
					data-user-id={user.user.id}
					on:click={moveUsernameToField}
				>
				{search.username}
				</a>
			</p>
		{/each}
	</div>
{/if}
</div>