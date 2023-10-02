<script>
	export let user;
	import { slide } from 'svelte/transition';
	
	import Textarea from './forms/Textarea.svelte';
	import AddMedia from './AddMedia.svelte';
	import BangNewsArticle from './BangNewsArticle.svelte';
	import CheckboxSlider from './forms/CheckboxSlider.svelte';
	import { sharedArticle } from '$lib/stores/sharedArticle.js';
	import { enhance } from '$app/forms';

	$: sharedNewsArticle = $sharedArticle ? $sharedArticle : null;

	async function handleTabShow(event) {
		let target = event.target;
		// Find any other 'active' class and disable first
		let activeTabs = document.querySelector('a.tab.active');
		if ( activeTabs ) {
			activeTabs.classList.remove('active');
		}
		target.classList.add('active');

		let tabPane = target.getAttribute('data-tab-pane');
		let activeTabContent = document.querySelector('#'+tabPane);
		let allTabContent = document.querySelectorAll('.tab-content');

		allTabContent.forEach(function(tabContent){
			tabContent.classList.add('hide');
		});

		activeTabContent.classList.remove('hide');
	}

	async function handleTextHide(event) {
		let target = event.target;
		let article = target.querySelector('.shared-news-article');

		if ( article ) {
			article.classList.add('hidden');
			$sharedArticle = null;
		}
	}

	async function removeSharedNewsArticle(event) {
		let target = event.target;
		$sharedArticle = [];
	}
</script>

<div class="py-2 rounded-md mb-4">
	<ul class="flex w-fit">
		<li class="-mb-px mr-1">
		  	<a
			class="tab bg-white inline-block border-l border-t border-r rounded-t py-2 px-4 text-blue-700 font-semibold active"
			href="#"
			data-tab-pane="posts"
			on:click={handleTabShow}
			>Add post
			</a>
		</li>
		<li class="mr-1">
		  <a
			class="tab bg-white inline-block py-2 px-4 rounded-t text-blue-500 hover:text-blue-800 font-semibold"
			href="#"
			data-tab-pane="media"
			on:click={handleTabShow}
			>Add media
		  </a>
		</li>
	  </ul>
	  <div class="tab-content active bg-white px-4 py-4 rounded-b-lg rounded-tr-lg" id="posts">
		<form method="POST" use:enhance on:submit={handleTextHide}>
			<input type="hidden" name="user_id" value="{user.id}" />
			
			<p class="mb-1">Have something to say?</p>

			<Textarea
				name={"post"}
				label={""}
				className={"caret-orange-600 focus:bg-green-200 mb-4"}
			/>

			{#key sharedNewsArticle}
				{#if sharedNewsArticle && sharedNewsArticle.id}
				<div class="shared-news-article relative" in:slide={{axis: 'x', duration: 500}} out:slide={{axis: 'x', duration: 500}}>
				<input type="hidden" name="sharedArticleId" value="{sharedNewsArticle.id}" />
				<!--Show shared news article here-->
					<BangNewsArticle
						article={sharedNewsArticle}
					/>
					<button on:click|preventDefault={removeSharedNewsArticle} class="absolute pt-0 top-0 right-0 border-none bg-transparent remove-shared-article">X</button>
				</div>
				{/if}
			{/key}

			<div class="flex flex-wrap flex-row-reverse justify-between items-center">
			<label for="private" class="flex flex-nowrap items-center"> Private
				<CheckboxSlider
					name={"private"}
				/>
			</label>
			<button class="bg-blue-500 hover:bg-blue-700 text-white font-bold" formaction="?/addPost">Add post</button>
		</div>
		</form>
	</div>
	<div class="tab-content hide bg-white px-4 py-4" id="media">
		<AddMedia />
	</div>
</div>
