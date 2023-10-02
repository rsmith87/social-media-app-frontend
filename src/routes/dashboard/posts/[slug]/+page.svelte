<script>
	export let data;
	let post = data.posts;
</script>

<div class="post">
	<p>{post.content}</p>
</div>

{JSON.stringify(post)}