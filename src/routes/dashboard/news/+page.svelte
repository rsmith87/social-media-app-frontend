<script>
	import NewsArticle from '$lib/components/NewsArticle.svelte';
	export let data;
	console.log(data);
</script>

<div class="container mx-auto">
	<h1>News</h1>
	<div class="flex flex-nowrap">
		<div class="basis-full">
		{#each data.news as news}
			<NewsArticle
				article={news.article}
				organization={news.organization}
				editor={news.editor}
				writer={news.writer}
				reactionTypes={data.reactionTypes}
				reactions={news.reactions}
			/>
		{/each}
		</div>
	</div>
</div>