<script>
	export let data;
	
	import { apiKey } from '$lib/stores/apiKey.js';
	import { onMount } from 'svelte';

	export let form;

onMount(() => {
	if ( $apiKey ) {
		//goto('/dashboard')
	}

	})

</script>

{#if form?.success}
<p>Logged in!</p>
{/if}

<div class="login-container flex flex-nowrap items-center justify-center h-[88vh]">
<form class="w-full max-w-sm bg-white p-[40px]" method="POST" action="/user/login">
	<input type="hidden" name="xsrf" value="{data.visited}" />

	<div class="md:flex md:items-center mb-6">
	  <div class="md:w-1/3">
		<label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-full-name">
		  Email
		</label>
	  </div>
	  <div class="md:w-2/3">
		<input name="email" class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-full-name" type="text" placeholder="email@email.com">
	  </div>
	</div>
	<div class="md:flex md:items-center mb-6">
	  <div class="md:w-1/3">
		<label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-password">
		  Password
		</label>
	  </div>
	  <div class="md:w-2/3">
		<input name="password" class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-password" type="password" placeholder="******************">
	  </div>
	</div>
	<div class="md:flex md:items-center">
	  <div class="md:w-1/3"></div>
	  <div class="md:w-2/3">
		<button class="primary-button bg-blue-500 hover:bg-blue-700 text-white font-bold" formaction="?/csrf" type="submit">
		  Login
		</button>
	  </div>
	</div>
  </form>
</div>