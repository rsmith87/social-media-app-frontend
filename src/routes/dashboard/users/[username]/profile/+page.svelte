<script>
	export let data;
	import Post from '$lib/components/Post.svelte';
	import UserCard from '$lib/components/UserCard.svelte';


	let comments = data.comments;
	let commentsUser = comments.user;

	async function handleTabContentShow(event) {
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

</script>

<div class="container mx-auto">
	<h1>Profile</h1>

	<div class="flex flex-nowrap gap-2 relative">
		<div class="basis-3/4">
			<ul class="flex">
				<li class="-mb-px mr-1">
					<a 
					class="tab bg-white inline-block border-l border-t border-r rounded-t py-2 px-4 text-blue-700 font-semibold active"
					href="#"
					data-tab-pane="posts"
					on:click={handleTabContentShow}
					>
						Posts
					</a>
				</li>
				<li class="mr-1">
				<a
					href="#" 
					data-tab-pane="comments"
					class="tab bg-white inline-block border-l border-t border-r rounded-t py-2 px-4 text-blue-500 hover:text-blue-800 font-semibold"
					on:click={handleTabContentShow}
				>
			  		Comments
			  	</a>
				</li>
				<li class="mr-1">
				  	<a
						href="#"
						data-tab-pane="media"
						class="tab bg-white inline-block border-l border-t border-r rounded-t py-2 px-4 text-blue-500 hover:text-blue-800 font-semibold"
						on:click={handleTabContentShow}
					>
						Media
					</a>
				</li>
			</ul>
			
			<div id="posts" class="tab-content active">
				{#each data.posts as post}
					<Post
						post={post}
						user={data.user.user}
						xsrfToken={data.xsrfToken}
					/>
				{/each}
			</div>
			<div id="comments" class="tab-content bg-white rounded-b-lg hide">
				{#if comments}
					{@const comment = comments.comments}
					{#each comment as com}
					<div class="comment bg-white mb-4 p-4">
						<p>{com.comment}</p>
						<p>{commentsUser.username}</p>
						<p>{com.created_at}</p>
					</div>
					{/each}
				{/if}
			</div>
			<div id="media" class="tab-content bg-white rounded-b-lg hide">
				{#if data.media}
				<div class="flex flex-wrap">
					{#each data.media as media}
					<div class="media basis-1/3 p-4">
						<img src="{media.path}" />
						<p>{media.name}</p>
					</div>
					{/each}
				</div>
				{/if}
			</div>
		</div>
		<div class="basis-1/4">
			<div class="sticky top-0">
			<UserCard
				profile={data.profile}
			/>
		</div>
		</div>
		
	</div>	
</div>