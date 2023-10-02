<script>
	export let label;
	export let className;
	export let formAction;
	if (!className) {
		className = 'btn btn-blue';
	}
</script>


<!-- Extracting component classes: -->
<button class="btn btn-blue" formaction={formAction ?? ''}>
	{label}
</button>

<style lang="scss">
.btn {
	@apply font-bold py-2 px-4 rounded;
}
.btn-blue {
	@apply bg-blue-500 text-white;
}
.btn-blue:hover {
	@apply bg-blue-700;
}
</style>