<script>
	import NewsArticle from '$lib/components/NewsArticle.svelte';
	export let data;
	console.log(data);
</script>

<div class="flex flex-wrap sticky top-0">
	<article class="basis-3/4">
		<img src={data.news.article.featured_image} />
		<div class="bg-white p-5 text-black">
			<h1 class="mb-2">{data.news.article.title}</h1>
			<div class="flex flex-nowrap justify-between byline mb-2">
				<p class="date">{data.news.article.created_at}</p>
				<p class="writer">
					Writer: {data.news.writer.name}
				</p>
			</div>

			<p>{data.news.article.content}</p>

			<p>{JSON.stringify(data.news.reactions)}</p>
		</div>
		
	</article>
</div>

<style lang="scss">
	h1 {
		color: black;
		font-size:2.5rem;
		line-height:1.1;
	}
</style>