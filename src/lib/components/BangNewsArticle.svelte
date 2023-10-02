<script>
	export let article;
	import { slide } from 'svelte/transition';
</script>

{#if article}
<div class="shared-article relative flex flex-nowrap mb-5" in:slide={{duration:500, axis: 'x'}} out:slide={{duration:500, axis: 'x'}}>
	<div class="basis-2/5">
		<img src="{article.featured_image}" alt="{article.title}" />
	</div>
	<div class="basis-3/5">
		<div class="shared-article__title pl-3">
			<p><strong>{article.title}</strong></p>
		</div>
		<div class="shared-article__content pl-3">
			<p>{article.content}</p>
		</div>
	</div>
</div>
{/if}

<style lang="scss">
.shared-article  {
	p {
		font-size:0.8em;
	}

	strong {
		font-weight: 600;
	}

	img {
		object-fit: cover;
		min-height: 100%;
	}

	.remove-shared-article {
		border: 0;
		padding: 0px;
		line-height: 1;
	}
}
</style>