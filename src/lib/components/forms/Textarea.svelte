<script>
	export let label;
	export let name;
	export let value;
	export let className;
</script>

<label for={name}> {label ?? ''}
<textarea
	class={className}
	name={name}
	rows=3
>{value ?? ''}</textarea>
</label>