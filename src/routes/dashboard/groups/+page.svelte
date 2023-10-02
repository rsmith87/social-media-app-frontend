<script>
	export let data;

	import AddGroup from '$lib/components/AddGroup.svelte';

	async function handleRequestJoinGroup(event) {
		let target = event.target;
		let groupSlug = target.getAttribute('data-group-slug');

		// Get logged in user and pass user and group slug through API
		// To add the user as a member of the group.
	}
</script>

<h1 class="mb-4">Groups</h1>
<div class="flex flex-nowrap gap-2">
	<div class="basis-3/4 w-3/4">

		{#each data.groups as group}
			<div class="group bg-white rounded-md px-4 py-2 mb-4 flex flex-nowrap items-center">
				<div class="basis-2/3">
					<a href="/dashboard/groups/{group.group.slug}/"><h2>{group.group.name}</h2></a>
					<p>Description: {group.group.description}</p>
					<p>Slug: {group.group.slug}</p>
				</div>
				<div class="basis-1/3">
					<button class="primary" data-group-slug={group.group.slug} on:click={handleRequestJoinGroup}>Request to join</button>
				</div>
			</div>
		{/each}
	</div>

	<div class="basis-1/4 w-1/4">
		<AddGroup />
	</div>
</div>