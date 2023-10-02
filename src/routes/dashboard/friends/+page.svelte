<script>
	import Friend from '$lib/components/Friend.svelte';
	import AddFriend from '$lib/components/AddFriend.svelte';
	
	import { enhance } from '$app/forms';
	import { slide } from 'svelte/transition';

	export let data;

	async function handleFriendRequestDeleteOverlayOpen(event) {
		let target = event.target;
		let request = target.parentElement.parentElement;
		request.querySelector('.deleteSendRequestOverlay').classList.remove('hidden');
		request.querySelector('.deleteSendRequestOverlay').classList.add('flex');
	}

	async function closeFriendRequestDeleteOverlay(event) {
		setTimeout(function(e){
			let target = event.target;
			let request = target.parentElement.parentElement;
			request.querySelector('.deleteSendRequestOverlay').classList.remove('flex');
			request.querySelector('.deleteSendRequestOverlay').classList.add('hidden');
		}, 500)
	}
</script>

<div class="container mx-auto">
<h1>Friends</h1>
<div class="flex flex-nowrap">
	<div class="basis-4/5 flex flex-wrap flex-row gap-2 pr-4">
		{#each data.friends as friend}
			{#if friend.friend_status.status_code === 'A'}
				<Friend
					friend={friend}
					user={data.user}
				/>
			{/if}
		{/each}
	</div>
	<div class="basis-1/5">
		<h2>Requests</h2>
		<div class="friends">
			{#each data.requests.receivedRequests as friend}
				{#if friend.friend_status.status_code === 'R'}
					<div class="friend mb-4 bg-white rounded-md p-4">
						<img src="{friend.friend_profile.image}" alt="{friend.name}" class="mb-2" />
						<div class="user-info mb-4">
							<p>User: {friend.user.name}</p>
							<p>Username: {friend.user.username}</p>
							<p>Date requested: {friend.created_at}</p>
							<p>Status: {friend.friend_status.name}</p>
						</div>
						<div class="btn-group flex justify-between">
							<form method="POST" use:enhance>
								<input type="hidden" name="user_id" value="{data.user.user.id}" />
								<input type="hidden" name="friend_id" value="{friend.user.id}" />
								<input type="hidden" name="status_code" value="A" />
								<button formaction="?/acceptFriend">Accept</button>
							</form>
							<form method="POST" use:enhance>
								<input type="hidden" name="user_id" value="{data.user.user.id}" />
								<input type="hidden" name="friend_id" value="{friend.user.id}" />
								<input type="hidden" name="status_code" value="D" />
								<button formaction="?/rejectFriend">Reject</button>
							</form>
						</div>
					</div>
				{/if}
			{/each}
		</div>
		<AddFriend
			data={data}
		/>

		<h3>Sent requests</h3>
		{#each data.requests.sentRequests as request (request.id)}
			<div class="bg-white p-2 mb-2 flex flex-nowrap rounded-sm justify-between relative" in:slide={{ axis: 'x', duration: 500 }} out:slide={{ axis: 'x', duration: 500 }}>
				<p>{request.user_two.username}</p>
				<button on:click|preventDefault={handleFriendRequestDeleteOverlayOpen}><i class="fa-solid fa-trash"></i></button>
				<div class="deleteSendRequestOverlay absolute top-0 right-0 left-0 bottom-0 bg-slate-950/80 z-50 hidden items-center justify-between rounded-sm" on:mouseleave={closeFriendRequestDeleteOverlay} role="dialog">
					<p class="text-white text-sm pl-2">Are you sure?</p>
					<form method="POST" use:enhance>
						<input type="hidden" name="friendId" value="{request.user_two.id}" />
						<button class="btn-sm bg-transparent" formaction="?/cancelSendFriendRequest">
							<i class="fa-solid fa-trash"></i>
							<span class="button-text hide">Delete request</span>
						</button>
					</form>
				</div>
			</div>
		{/each}
	</div>
</div>
</div>
<style lang="scss">
	.action-buttons button {
		padding: 5px 10px;
	}

	i.fa-solid.fa-trash:hover {
		color: red;
	}

	button {
		border: 0;
	}
</style>