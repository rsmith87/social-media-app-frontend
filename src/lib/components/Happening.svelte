<script>
	import { format } from "date-fns";
	import HappeningUser from "./HappeningUser.svelte";
	export let happening;

	async function isGoingHappening(event) {
		console.log("I am going");
	}

	async function isNotGoingHappening(event) {
		console.log("I am not going");
	}
</script>

<div class="happening flex flex-nowrap mb-4 bg-white rounded-md px-4 py-2">
	<div class="happening-map basis-1/3">
		<img src="{happening.image}" />
	</div>
	<div class="happening-details basis-2/3 pl-3">
		<h6>{format(new Date(happening.datetime), 'MMMM d y K:mm a')}</h6>
		<h2 class="text-lg">{happening.name}</h2>
		<p class="mb-5">{happening.details}</p>
		<p>{happening.location.address}</p>
		<p>{happening.location.city}, {happening.location.state}</p>
		<p>{happening.location.zip}</p>
		<div class="happening-actions">
			<div class="inline-flex">
				<button
					class="primary hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l"
					on:click={isGoingHappening}
				>
				  Going
				</button>
				<button
					class="warning hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r"
					on:click={isNotGoingHappening}
				>
				  Not going
				</button>
			</div>
		</div>
		{#if happening.attendees.length > 0}
		<div class="happening-attendees">
			<h6>Attendees</h6>
			{#each happening.attendees as attendee}
				<p><a href="#">{attendee.username}</a></p>
			{/each}
		</div>
		{/if}
	</div>
</div>