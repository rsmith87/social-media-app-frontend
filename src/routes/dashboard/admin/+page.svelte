<script>
	import { slide } from 'svelte/transition';
	import { openModal } from 'svelte-modals'
	import Modal from '$lib/components/modals/Modal.svelte'

	function handleClick(event) {
		let target = event.target;
		let userId = target.getAttribute('data-user-id');
		openModal(Modal, { title: "Alert", message: "Update user role", actions: 'test', form: 'updateUserRole', userToUpdate: userId });
	}
	export let data;

	console.log(data);
	let allRoles = data.users.roles;
	let allPermissions = data.users.permissions;
	async function handleTabShow(event) {
		let target = event.target;
		// Find any other 'active' class and disable first
		let activeTabs = document.querySelector('a.tab.active');
		if ( activeTabs ) {
			activeTabs.classList.remove('active');
		}
		target.classList.add('active');

		let tabPane = target.getAttribute('data-tab-pane');
		let activeTabContent = document.querySelector('#'+tabPane);
		let allTabContent = document.querySelectorAll('.tab-content');

		allTabContent.forEach(function(tabContent){
			tabContent.classList.add('hide');
		});

		activeTabContent.classList.remove('hide');
	}

	async function handleUserContextMenu(event) {
		let target = event.target;
		let row = target.parentNode.parentNode;
		row.classList.toggle('contextMenuOpen');
		row.querySelector('.context-menu').classList.toggle('hide');
	}

	async function closeContextMenu(event) {
		let target = event.target;
		target.parentNode.parentNode.classList.add('hide');
		target.parentNode.parentNode.parentNode.classList.remove('contextMenuOpen');
	}

	async function roleModal(event) {
		console.log('in role modal');
	}

	async function deleteUserModal(event) {
		console.log('in delete modal');
	}

	async function updateUserModal(event) {
		console.log('in update user modal');
	}
</script>

<h1>Administrator</h1>
<ul class="flex w-fit">
	<li class="-mb-px mr-1">
		  <a
		class="tab bg-white inline-block border-l border-t border-r rounded-t py-2 px-4 text-blue-700 font-semibold active"
		href="#"
		data-tab-pane="users"
		on:click={handleTabShow}
		>Users
		</a>
	</li>
	<li class="mr-1">
	  <a
		class="tab bg-white inline-block py-2 px-4 rounded-t text-blue-500 hover:text-blue-800 font-semibold"
		href="#"
		data-tab-pane="roles"
		on:click={handleTabShow}
		>Roles
	  </a>
	</li>
	<li class="mr-1">
		<a
		  class="tab bg-white inline-block py-2 px-4 rounded-t text-blue-500 hover:text-blue-800 font-semibold"
		  href="#"
		  data-tab-pane="permissions"
		  on:click={handleTabShow}
		  >Permissions
		</a>
	  </li>
  </ul>
  <div class="tab-content active bg-white px-4 py-4 rounded-b-lg rounded-tr-lg" id="users">
	<table>
		<thead class="border-b border-black">
			<th>Name</th>
			<th>Email</th>
			<th>Role</th>
			<th>Join date</th>
			<th>Updated date</th>
			<th>Actions</th>
		</thead>
		<tbody>
		{#each data.users.users as user}
		<tr transition:slide={{ axis: 'x', duration: 500}} class="relative">
			<td>{user.name}</td>
			<td>{user.email}</td>
			{#if user.role}
				{#each user.role as role}
					<td>{role.name}</td>
				{/each}
			{:else}
				<td>No role set</td>
			{/if}
			<td>{user.created_at}</td>
			<td>{user.updated_at}</td>
			<td><button class="primary" on:click={handleUserContextMenu}>Actions</button></td>
			<div class="context-menu absolute top-0 left-0 right-0 bottom-0 w-full flex flex-nowrap hide justify-around items-center">
				<button on:click={updateUserModal} class="primary">Update user</button> |
				<button on:click={deleteUserModal} class="danger">Delete user</button> |
				<button on:click={handleClick} data-user-id={user.id} class="secondary">Change user role</button>
				<button class="close text-white text-xl font-bold" on:click={closeContextMenu}><i class="fa-solid fa-lg fa-x"></i></button>
			</div>
		</tr>
		{/each}
		</tbody>
	</table>
</div>
<div class="tab-content active bg-white px-4 py-4 rounded-b-lg rounded-tr-lg" id="roles">
	<table>
		<thead class="border-b border-black">
			<th>Name</th>
			<th>Created date</th>
			<th>Updated date</th>
			<th>Actions</th>
		</thead>
		<tbody>
		{#each allRoles as role}
			<tr>
				<td>{role.name}</td>
				<td>{role.created_at}</td>
				<td>{role.updated_at}</td>
				<td><button class="primary" on:click={handleUserContextMenu}>Actions</button></td>
				<div class="context-menu absolute top-0 left-0 right-0 bottom-0 w-full flex flex-nowrap hide justify-around items-center">
					<button class="primary">Update user</button> | <button class="danger">Delete user</button> | <button class="secondary">Change user role</button>
					<button class="close text-white text-xl font-bold" on:click={closeContextMenu}><i class="fa-solid fa-lg fa-x"></i></button>
				</div>
			</tr>
			<tr>
				<td>Permissions</td>
				<td></td>
				<td></td>
				<td>
			{#each role.permissions as permission}

				<p>{permission.name}</p>

			{/each}
		</td>
	</tr>
		{/each}
		</tbody>
	</table>
</div>

<div class="tab-content active bg-white px-4 py-4 rounded-b-lg rounded-tr-lg" id="permissions">
	<table>
		<thead class="border-b border-black">
			<th>Name</th>
			<th>Created date</th>
			<th>Updated date</th>
			<th>Actions</th>
		</thead>
		<tbody> 
		{#each data.users.permissions as permission}
			<tr>
				<td>{permission.name}</td>
				<td>{permission.created_at}</td>
				<td>{permission.updated_at}</td>
				<td><button class="primary" on:click={handleUserContextMenu}>Actions</button></td>
				<div class="context-menu absolute top-0 left-0 right-0 bottom-0 w-full flex flex-nowrap hide justify-around items-center">
					<button class="primary">Update user</button> | <button class="danger">Delete user</button> | <button class="secondary">Change user role</button>
					<button class="close text-white text-xl font-bold" on:click={closeContextMenu}><i class="fa-solid fa-lg fa-x"></i></button>
				</div>
			</tr>
		{/each}
		</tbody>
</div>

<style lang="scss">
	.context-menu {
		
	}
</style>