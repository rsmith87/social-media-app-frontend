<script>
	import { apiKey } from '$lib/stores/apiKey.js';
	import { user } from '$lib/stores/user.js';
	import AddPost from '$lib/components/AddPost.svelte';
	import Post from '$lib/components/Post.svelte';
	import NewsArticle from '$lib/components/NewsArticle.svelte';
	import { browser } from '$app/environment';
	import { sharedArticle } from '$lib/stores/sharedArticle.js';
	import { getContext } from 'svelte';

	export let data;
	console.log(data);
	//export let sharedArticle;

	if ( data.user.user ) {
		$user = JSON.stringify(data.user.user);
	}
	if (browser){
		window.localStorage.setItem('user', $user);
	}
	let testUser = getContext('user');
	console.log("TEST USER");
	console.log(testUser);
	$apiKey = data.token;

</script>


<div class="content">
	<div class="flex flex-nowrap flex-row gap-2">
		<section class="basis-1/2 w-[50%] pr-4 overflow-y-scroll h-[87vh]">
			<AddPost
				user={$user}
				sharedArticle={$sharedArticle ? $sharedArticle: ''}
			/>
			{#each data.dashboard.posts as post (post.posts.id)}
				<Post
					post={post}
					user={data.user.user}
				/>
			{/each}
		</section>

		<aside class="basis-1/2 pr-4 news overflow-y-scroll h-[87vh]">
			{#each data.dashboard.articles as article (article.article.id)}
				<NewsArticle
					article={article.article}
					organization={article.organization}
					editor={article.editor}
					writer={article.writer}
					reactionTypes={data.dashboard.reactionTypes}
					reactions={article.reactions}
				/>
			{/each}
		</aside>

		<!-- Advertisements? -->
	</div>
</div>

<style lang="scss">

		/* width */
::-webkit-scrollbar {
  width: 10px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #888;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555;
}

.news-item__image img {
	min-height: 100%;
	object-fit: cover;
}

	
</style>