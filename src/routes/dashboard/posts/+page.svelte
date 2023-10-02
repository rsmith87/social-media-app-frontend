<script>
	export let data;

	import SearchPost from '$lib/components/search/SearchPost.svelte';
	import Post from '$lib/components/Post.svelte';
	import AddPost from '$lib/components/AddPost.svelte';
	import { getContext } from 'svelte';

	let posts = data.posts;
</script>

<h1>Posts</h1>
<div class="basis-full">

</div>
<div class="flex flex-nowrap flex-row">

	<article class="basis-3/4 pr-10">
		<AddPost
			user={data.user}
		/>
		{#each posts as post}
			<Post
				post={post}
				xsrfToken={data.xsrfToken}
				user={data.user.user}
			/>
		{/each}
	</article>

	<aside class="basis-1/4">
		<h2>Search</h2>
		<SearchPost
			apiToken={data.token}
			xsrfToken={data.xsrfToken} 
		/>
	</aside>
</div>
