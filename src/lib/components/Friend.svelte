<script>
	export let friend;
	export let user;
	import { format } from "date-fns";
	import { fly, fade } from 'svelte/transition';
	import { enhance } from '$app/forms';

	async function handleOverlayOpen(event) {
		let target = event.target;
		let post = target.parentElement.parentElement.parentElement
		post.querySelector('.deleteFriendOverlay').classList.remove('hidden');
		post.querySelector('.deleteFriendOverlay').classList.add('flex');
	}

	async function closePostOverlay(event) {
		let target = event.target;
		let post = target.parentElement.parentElement;
		post.querySelector('.deleteFriendOverlay').classList.remove('flex');
		post.querySelector('.deleteFriendOverlay').classList.add('hidden');
	}
</script>

<div class="friend">
	<div class="mb-4 items-start flex flex-nowrap justify-center">
		<div class="bg-white flex mb-4 rounded-md p-4 relative" in:fly={{ x:-600, duration:500 }} out:fly={{ x:600, duration:500 }}>
			<div class="deleteFriendOverlay absolute top-0 right-0 left-0 bottom-0 bg-slate-950/70 z-50 hidden items-center justify-center rounded-lg" transition:fade>
				<button on:click={closePostOverlay} class="absolute top-2 right-2 close-overlay">X</button>
				<p class="text-white text-2xl mr-4">Are you sure you want to remove this friend?</p>
				<form method="POST" use:enhance>
					<input type="hidden" name="user_id" value="{user.user.id}" />
					<input type="hidden" name="friend_id" value="{friend.friend_id}" />
					<button class="danger" data-friend-id={friend.friend_id} formaction="?/removeFriend">
						<i class="fa-solid fa-user-minus mr-2"></i>
						<span class="button-text">Remove friend</span>
					</button>
				</form>
			</div>

		<!--Display a trashcan absolutely positioned to delete the post and all comments on the post. -->
		<div class="delete-post absolute bottom-5 right-5">
			<button class="danger" on:click={handleOverlayOpen}>
				<i class="fa-solid fa-user-minus mr-2"></i>
				<span class="button-text">Remove friend</span>
			</button>
		</div>

		<div class="basis-1/4">
			<img src="{friend.friend_profile.image}" alt="{friend.friend.name}" class="mb-2" />
			<div class="flex flex-nowrap justify-between w-[100%]">
				<div class="basis-1/4 text-center">
					<a href="#"><i class="fa-solid fa-envelope"></i></a>
				</div>
				<div class="basis-1/4 text-center">
					<a href="#"><i class="fa-brands fa-facebook"></i></a>
				</div>
				<div class="basis-1/4 text-center">
					<a href="#"><i class="fa-brands fa-x-twitter"></i></a>
				</div>
				<div class="basis-1/4 text-center">
					<a href="#"><i class="fa-solid fa-money-bill"></i></a>
				</div>
			</div>
		</div>
	
		<div class="basis-3/4">
			<div class="pl-4">
				<p class="mb-2">User:
					<a href="/dashboard/users/{friend.friend.username}/profile">
						{friend.friend.name}
					</a>
				</p>
				<p class="mb-2">Username: {friend.friend.username}</p>
				<p class="mb-2">Date requested: {format(new Date(friend.created_at), 'MM-dd-yyyy HH:mm:ss').toLocaleString('en-US')}</p>
				<p class="mb-2">Bio: {friend.friend_profile.bio}</p>
			</div>
		</div>
		</div>
	</div>
</div>