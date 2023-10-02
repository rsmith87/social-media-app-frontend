<script>
	export let post;
	export let user;
	import AddComment from "./AddComment.svelte";
	import BangNewsArticle from "./BangNewsArticle.svelte";
	import { format } from "date-fns";
	import { fade, slide } from 'svelte/transition';
	import { enhance } from '$app/forms';


	async function handleOverlayOpen(event) {
		let target = event.target;
		let post = target.parentElement.parentElement.parentElement
		post.querySelector('.deletePostOverlay').classList.remove('hidden');
		post.querySelector('.deletePostOverlay').classList.add('flex');
	}

	async function closePostOverlay(event) {
		let target = event.target;
		let post = target.parentElement.parentElement;
		post.querySelector('.deletePostOverlay').classList.remove('flex');
		post.querySelector('.deletePostOverlay').classList.add('hidden');
	}
</script>

<div class="post post-{post.posts.id} relative mb-5 bg-slate-50 py-4 px-4 rounded-lg" in:slide={{ axis: 'y', duration:250 }} out:slide={{ axis:'y', duration:250 }}>
	
	{#if user.id === post.user.id}
		<!--Display a trashcan absolutely positioned to delete the post and all comments on the post. -->
		<div class="delete-post absolute bottom-5 right-5">
			<button class="cta" on:click={handleOverlayOpen}>
				<i class="fa-solid fa-trash"></i>
				<span class="button-text">Delete post</span>
			</button>
		</div>
	{/if}

	<div class="deletePostOverlay absolute top-0 right-0 left-0 bottom-0 bg-slate-950/70 z-50 hidden items-center justify-center rounded-lg" transition:fade>
		<button on:click={closePostOverlay} class="absolute top-2 right-2 close-overlay">X</button>
		<p class="text-white text-2xl mr-4">Are you sure you want to delete this post?</p>
		<form method="POST" use:enhance>
			<input type="hidden" name="user_id" value="{post.user.id}" />
			<input type="hidden" name="slug" value="{post.posts.slug}" />
			<button class="cta" data-post-slug={post.posts.slug} data-user-id={post.user.id} formaction="?/removePost">
				<i class="fa-solid fa-trash"></i>
				<span class="button-text">Delete post</span>
			</button>
		</form>
	</div>

	{#if post.tags}
	<div class="tags flex flex-wrap">
		{#each post.tags as tag}
			<p class="mr-3 mb-2 w-auto border border-gray-300 text-xs rounded-md py-1 px-2 text-black inline">{tag.name}</p>
		{/each}
	</div>
	{/if}

	<div class="post__meta flex flex-nowrap justify-between mb-2">
		{#if post.posts.created_at}
			{@const dt = new Date(post.posts.created_at)}
			<p><strong>Added: {format(dt, 'MM-dd-yyyy HH:mm:ss').toLocaleString('en-US', {hour: 'numeric', minute: 'numberic', hour12: true})}</strong></p>
		{/if}

		<p>By: <a href="/dashboard/users/{post.user.username}/profile">{post.user.username}</a></p>
	</div>

	<p class="bg-white text-sm rounded-md py-1 px-2 mb-3 border border-gray-300">{post.posts.content}</p>

	{#if post.shared_article}
		<BangNewsArticle
			article={post.shared_article} 
		/>
	{/if}

	{#if post.media.length > 0 }
		<div class="media mb-2">
			<div class="flex gap-2 flex-wrap">
				{#each post.media as media}
					<div class="media__item p-2 bg-gray-400 rounded-md">
						<img src="{media.path}" alt="{media.name}" class="max-w-xs mb-1" />
						<p>{media.name}</p>
					</div>
				{/each}
			</div>
		</div>
	{/if}


	{#if post.comments}
	<p class="font-bold mb-1">Comments</p>
	<div class="post-comments">
		{#each post.comments as comment (comment.id)}
			<div class="bg-white border border-gray-300 rounded-md py-1 px-2 mb-2" in:slide={{ axis: 'y', duration:300 }} out:slide={{ axis: 'y', duration:300 }}>
				<p>{format(new Date(comment.created_at), 'MM-dd-yyyy HH:mm:ss')}</p>
				<p class="text-sm">{comment.comment}</p>
				<p class="text-sm font-bold"><a href="/dashboard/users/{comment.user.username}/profile">{comment.user.username}</a></p>
			</div>
		{/each}
	</div>
	{/if}

	<div class="star absolute top-2 right-2">
		<form method="POST" use:enhance>
			<input type="hidden" name="postId" value="{post.posts.id}" />
			<button formaction="?/starArticle" class="border-none bg-transparent">
				<i class="fa-regular fa-star"></i>
			</button>
		</form>
	</div>

	<AddComment
		postId={post.posts.id}
		slug={post.posts.slug}
		user={user}
	/>
</div>

<style lang="scss">
	.star i {
		display: block;
	}

	.hide {
		display: none;
	}

	.show {
		display: flex !important;
	}

	.close-overlay {
		border: 0;
		background-color: transparent;
		padding: none;
		font-size: 2em;
		font-weight: bold;
	}
	.post:nth-child(1) {
		border-top-left-radius: 0;
	}

	i.fa-regular:hover {
		color: green;
	}

	i.fa-star:hover {
		color: blue;
	}
</style>
