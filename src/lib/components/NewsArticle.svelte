<script>
  	import { slide } from 'svelte/transition';
	import { colorSvgIcon, returnSvgIconColor } from '$lib/utils';
	import { format } from 'date-fns';
	import { user } from '$lib/stores/user.js';
	import { enhance } from '$app/forms';
	import RatingsScale from './RatingsScale.svelte';
	import { sharedArticle } from '$lib/stores/sharedArticle.js';
	export let article;
	export let organization;
	export let writer;
	export let editor;
	export let reactions;
	export let reactionTypes;

	async function handleBangingArticle(event) {
		let target = event.target;
		let reactionBar = target.parentNode.parentNode.parentNode;
		$sharedArticle = article;
	}

	async function handleSharingArticle(event) {
		let target = event.target;
		let overlay = target.parentNode.parentNode.parentNode.parentNode.parentNode.querySelector('.articleShareOverlay');
		overlay.classList.remove('hidden');
	}

	async function closeOverlay(event) {
		let target = event.target;
		let overlay = target.parentNode.parentNode.parentNode;
		overlay.classList.add('hidden');
	}

	/**
	 * Handles truncating content
	 * @param {String} str 
	 * @param {*} num 
	 * @returns String
	 */
	const truncateString = function(str, num) {
		if (str.length <= num) {
			return str
		}
		return str.slice(0, num) + '...'
	}
</script>

<div class="news-item flex flex-nowrap bg-slate-50 mb-5 relative article-{article.id}" in:slide={{ axis: 'x', duration: 250 }}>
	<div class="basis-1/3 news-item__image">
		<a href="/dashboard/news/{article.slug}">
			<img src="{article.featured_image}" class="articleFeaturedImage"
				alt="featured_image"
			/>
		</a>
	</div>
	<div class="basis-2/3 p-4 relative flex flex-col justify-between">
		<h5 class="news-title">{article.title}</h5>
		<h6>{format(new Date(article.created_at), 'MMMM d y K:mm a')}</h6>
		<p class="mb-2">{truncateString(article.content, 150)}</p>
		<p class="author text-sm"><strong class="font-bold">{writer.name}</strong>, Writer, <em>{organization.name}</em></p>
		{#if editor}
			<p class="editor text-sm"><strong class="font-bold">{editor.name}</strong>, Editor, <em>{organization.name}</em></p>
		{/if}
		<div class="flex flex-nowrap justify-between items-end mt-[25px]">
			<div class="reactions">
				<RatingsScale
					reactions={reactions}
					articleId={article.id}
					reactionTypes={reactionTypes}
				/>
			</div>

			<div class="share mr-5">
				<a
					href="#"
					class="mx-2"
					on:mouseover={colorSvgIcon}
					on:focus={colorSvgIcon}
					on:mouseleave={returnSvgIconColor}
					on:click={handleBangingArticle}
				>
					💥
				</a>
				<a
					href="#"
					class="mx-2"
					on:mouseover={colorSvgIcon}
					on:focus={colorSvgIcon}
					on:mouseleave={returnSvgIconColor}
					on:click={handleSharingArticle}
				>
					<i class="fa-regular fa-md fa-paper-plane"></i>
				</a>			
			</div>
		</div>
		<div class="articleShareOverlay flex flex-col absolute top-0 right-0 left-0 bottom-0 justify-center bg-slate-950/90 z-50 hidden rounded-sm text-white p-4"
			in:slide={{ duration: 500, axis: 'y'}}
			out:slide={{duration: 500, axis: 'y'}}
		>	
			<div class="overlayContainer text-center">
				<button on:click={closeOverlay} class="absolute top-4 right-2 close-overlay border-none bg-transparent"><i class="fa-solid fa-2xl fa-x"></i></button>
				<h3 class="mb-3 text-5xl">Share</h3>
				<h3 class="news-title mb-3">{article.title}</h3>
				<div>
					<a href="#"><i class="fa-brands fa-xl mx-2 fa-facebook"></i></a> | 
					<a href="#"><i class="fa-brands fa-xl mx-2 fa-x-twitter"></i></a> |
					<a href="#"><i class="fa-brands fa-xl mx-2 fa-linkedin"></i></a> |
					<a href="#"><i class="fa-solid fa-xl mx-2 fa-envelope"></i></a>
				</div>
			</div>
		</div>
	</div>
	{#if $user.id === article.writer_id}
	<div class="articleWriterActionOverlay absolute top-0 right-0 left-0 bottom-0 bg-slate-950/90 z-50 hidden items-center justify-between rounded-sm p-4 text-center">
		
	</div>
	{:else if $user.id === article.editor_id}
	<div class="articleEditorActionOverlay absolute top-0 right-0 left-0 bottom-0 bg-slate-950/90 z-50 hidden items-center justify-between rounded-sm p-4 text-center">
		
	</div>
	{:else if article.organization_id === $user.organization_id}
	<div class="articleOrganizationActionOverlay absolute top-0 right-0 left-0 bottom-0 bg-slate-950/90 z-50 hidden items-center justify-between rounded-sm p-4 text-center">
		
	</div>
	{/if}
</div>
<style>
	.news-item__image img {
		min-height: 100%;
		object-fit: cover;
	}
	.reactions a {
		position: relative;
	}
</style>