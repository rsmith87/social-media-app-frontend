<script>
	import "../app.css";
	import Header from "$lib/components/Header.svelte";
	import Footer from "$lib/components/Footer.svelte";
	import Alert from "$lib/components/Alert.svelte";
	import { Modals, closeModal } from 'svelte-modals';
	import { alert } from "$lib/stores/alert.js";
	import { user } from '$lib/stores/user.js';
	import '$lib/styles/style.scss';
	export let data;
</script>

<Header
	user={$user ?? ''}
/>
<Alert
      data={$alert}
/>

<Modals>
	<div
	  slot="backdrop"
	  class="backdrop"
	  on:click={closeModal}
	/>
</Modals>

<div class="container mx-auto">
	<slot />
</div>

<Footer />

<style lang="scss">
	.backdrop {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: rgba(0, 0, 0, 0.4);
		z-index: 998;
	}
</style>
