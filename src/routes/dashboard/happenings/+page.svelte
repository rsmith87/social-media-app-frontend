<script>
	import Happening from "../../../lib/components/Happening.svelte";

	export let data;

	console.log(data);
</script>

<h1>Happenings</h1>
{#each data.happenings as happening}
	<Happening
		happening={happening}
	/>
{/each}