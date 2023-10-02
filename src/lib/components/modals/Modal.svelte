<script>
	import { closeModal } from 'svelte-modals'
	import { postApi } from '$lib/utils';
	import { enhance } from '$app/forms';
	import { user } from '$lib/stores/user.js';
	console.log($user);
	// provided by <Modals />
	export let isOpen
  
	export let title
	export let message
	export let actions;
	export let data;
	export let form;
	export let userToUpdate;

	const userRoles = [
		'super_admin',
		'organization',
		'editor',
		'writer',
		'user'
	];
</script>

{#if isOpen}
<div role="dialog" class="modal">
	<div class="contents">
		<h2>{title}</h2>
		<p>{message}</p>
		{#if actions}
			<div class="actions">
				{#if (actions !== '')}
					{#if form}
						{#if form === 'updateUserRole'}
							<form method="POST" use:enhance class="flex">
								<input type="hidden" name="user_id" value="{userToUpdate}" />
								<select name="role">
									{#each userRoles as role}
										<option value="{role}">{role}</option>
									{/each}
								</select>
								<button class="primary" formaction="?/updateUserRole">Update</button>
							</form>

						{/if}
					{:else}
						{@html data}
					{/if}
				{:else}
					<button on:click={closeModal}>OK</button>
				{/if}
			</div>
		{/if}
	</div>
</div>
{/if}

<style>
	.modal {
	  position: fixed;
	  top: 0;
	  bottom: 0;
	  right: 0;
	  left: 0;
	  display: flex;
	  justify-content: center;
	  align-items: center;
	  z-index: 999;
	  /* allow click-through to backdrop */
	  pointer-events: none;
	}
  
	.contents {
	  min-width: 240px;
	  border-radius: 6px;
	  padding: 16px;
	  background: white;
	  display: flex;
	  flex-direction: column;
	  justify-content: space-between;
	  pointer-events: auto;
	}
  
	h2 {
	  text-align: center;
	  font-size: 24px;
	}
  
	p {
	  text-align: center;
	  margin-top: 16px;
	}
  
	.actions {
	  margin-top: 32px;
	  display: flex;
	  justify-content: flex-end;
	}
  
</style>