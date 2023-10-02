<script>
	export let data;

	let groups = data.groups;
	let user = data.user;
	async function handleRequestJoinGroup(event) {
		let target = event.target;
		let groupSlug = target.getAttribute('data-group-slug');

		// Get logged in user and pass user and group slug through API
		// To add the user as a member of the group.
	}
</script>

<div class="flex flex-nowrap gap-2">
	<div class="basis-3/4 w-3/4">
		<h1>Group: {groups.group.name}</h1>
		<p>Description: {groups.group.description}</p>
		{#if groups.posts}
			{#each groups.posts as post}
				{JSON.stringify(post)}
			{/each}
		{/if}
	</div>
	<div class="basis-1/4 w-1/4">
		<button class="button" data-group-slug={groups.group.slug} style="margin-left: 0;" on:click={handleRequestJoinGroup}>Request to join</button>
		<p>Members:</p>
		{#each groups.members as member}
			<p>{member.name}</p>
		{/each}
	</div>
</div>