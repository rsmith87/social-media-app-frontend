<script>
	export let reactions;
	export let articleId;
	export let reactionTypes;
	import { enhance } from '$app/forms';
	import { user } from '$lib/stores/user.js';

	let tdCount=0;
	let afCount=0;
	let puCount=0;
	let heartCount=0;
	let starCount=0;
	let sfCount=0;
	let moneyCount=0;

	$: tdReactive = tdCount;
	$: afReactive = afCount;
	$: puReactive = puCount;
	$: heartReactive = heartCount;
	$: starReactive = starCount;
	$: sfReactive = sfCount;
	$: moneyReactive = moneyCount;

	//we need to figure out if a user has already added a reaction to a article
	//if they have we need to make the icon fa-solid rather than fa-regular
	//Here we can call the ratings scale from the server and output it below or we can call it and pass it to this component.
	reactions.forEach(reaction => {
		let rt = reactionTypes.find((type) => type.id === reaction.reaction_id);
		switch (rt.name){
			case 'thumbsDown':
				tdCount++;
				break;
			case 'faceAngry':
				afCount++;
				break;
			case 'handPointUp':
				puCount++;
				break;
			case 'heart':
				heartCount++;
				break;
			case 'star':
				starCount++;
				break;
			case 'faceSmile':
				sfCount++;
				break;
			case 'money':
				moneyCount++;
				break;
			default:
				break;
		}
	});

	let activeUser = JSON.parse($user);

	async function hasUserReactedToArticle(event) {
		let target = event.target;

		let userId = activeUser.id
		let reaction = reactions.find((reaction) => reaction.user_id === userId);
		if (!reaction) {
	
			//TODO;
			// If no reaction go ahead and ++ the new user reaction
			let newIconClass;
			//TOOD: get icon class from `target`
			let classes = target.classList;
			let spreadClasses = [...classes];
			spreadClasses.forEach(function(cls) {
			if ( cls === 'fa-regular' ||
					cls === 'fa-lg' || 
					cls === 'fa-solid' ||
					cls.startsWith('s-')) {
					return;
				} else {
					newIconClass = cls.split('fa-').pop();
				}
			});

			let reactionType = reactionTypes.find((reactionType) => reactionType.icon === newIconClass);

			switch(reactionType.name) {
				case 'thumbsDown':
					tdReactive++
					break;
				case 'faceAngry':
					afReactive++
					break;
				case 'handPointUp':
					puReactive++;
					break;
				case 'faceSmile':
					sfReactive++;
					break;
				case 'star':
					starReactive++;
					break;
				case 'heart':
					heartReactive++;
					break;
				case 'money':
					moneyReactive++;
					break;
				default:
					break;
			}
		}

		if (reaction) {
			let rId = reaction.reaction_id;

			let reactionType = reactionTypes.find((reactionType) => reactionType.id === rId);

			let rtName = reactionType.name;
			switch(rtName) {
				case 'thumbsDown':
					tdReactive--
					break;
				case 'faceAngry':
					afReactive--
					break;
				case 'handPointUp':
					puReactive--;
					break;
				case 'faceSmile':
					sfReactive--;
					break;
				case 'star':
					starReactive--;
					break;
				case 'heart':
					heartReactive--;
					break;
				case 'money':
					moneyReactive--;
					break;
				default:
					break;
			}

			let newReactionClasses = target.classList;
			let nrc = [...newReactionClasses];
			let newIconClass = '';

			nrc.forEach(function(cls) {
				if ( cls === 'fa-regular' ||
					 cls === 'fa-lg' || 
					 cls === 'fa-solid' ||
					 cls.startsWith('s-')) {
						return;
					} else {
						newIconClass = cls.split('fa-').pop();
					}
			});

			let newReactionType = reactionTypes.find((reactionType) => reactionType.icon === newIconClass);

			switch(newReactionType.name) {
				case 'thumbsDown':
					tdReactive++
					break;
				case 'faceAngry':
					afReactive++
					break;
				case 'handPointUp':
					puReactive++;
					break;
				case 'faceSmile':
					sfReactive++;
					break;
				case 'star':
					starReactive++;
					break;
				case 'heart':
					heartReactive++;
					break;
				case 'money':
					moneyReactive++;
					break;
				default:
					break;
			}
		}
	}

</script>


	{#each reactionTypes as reactionType (reactionType.id)}
	<form method="POST" use:enhance class="inline">
		<input type="hidden" name="article_id" value="{articleId}" />
		<input type="hidden" name="reaction_id" value="{reactionType.id}" />
		<div class="reaction-button-group inline-block relative">
			<div class="count bg-black text-xs text-white">
				{#if reactionType.name === 'thumbsDown'}
					{tdReactive}
				{/if}

				{#if reactionType.name === 'faceAngry'}
					{afReactive}
				{/if}

				{#if reactionType.name === 'handPointUp'}
					{puReactive}
				{/if}
				
				{#if reactionType.name === 'faceSmile'}
					{sfReactive}
				{/if}

				{#if reactionType.name === 'star'}
					{starReactive}
				{/if}

				{#if reactionType.name === 'heart'}
					{heartReactive}
				{/if}

				{#if reactionType.name === 'money'}
					{moneyReactive}
				{/if}

			</div>

			{#if reactions.find((reaction) => reaction.reaction_id === reactionType.id && reaction.user_id === activeUser.id) !== undefined}
			<button
				class="mx-2 relative"
				formaction={'?/handleArticleReaction'}
				name={reactionType.name}
				on:click={hasUserReactedToArticle}
			>
				<i class="fa-solid fa-md fa-{reactionType.icon}"></i>
			</button>
			{:else}
			<button
				class="mx-2 relative"
				formaction={'?/handleArticleReaction'}
				name={reactionType.name}
				on:click={hasUserReactedToArticle}
			>
				<i class="fa-regular fa-md fa-{reactionType.icon}"></i>
			</button>
			{/if}
		</div>

</form>
{/each}
<style lang="scss">
	.reaction-count {
		position: absolute;
		top: -15px;
		right: -15px;
		background-color: #176087;
		color: white;
		border-radius: 50%;
		width: 20px;
		height: 20px;
		text-align: center;
	}
	button {
		border: 0;
		display: inline-block;
		padding: 0;
		margin-left: 5px;
		margin-right: 5px;
		color: black;

		&:hover {
			i {
				color:red;
			}
			i.fa-star {
				color: yellow;
			}
			i.fa-money-bill-1 {
				color: green;
			}
			i.fa-face-smile {
				color: blue;
			}
		}
	}
	.count {
		text-align: center;
		border-radius: 25%;
		width: 20px;
		height: 20px;
		margin: 0 auto;
		background-color: #176087;
	}

	.reaction-button-group i {
		color: #176087;
	}

	.fa-solid {
		&.fa-face-angry {
			color: black;
		}
		&.fa-thumbs-down {
			color: black;
		}
		&.fa-face-smile {
			color: blue;
		}

		&.fa-money-bill-1 {
			color: green;
		}
		&.fa-heart {
			color: red;
		}

		&.fa-star {
			color: yellowgreen;
			border-color: black;
		}
	}
</style>