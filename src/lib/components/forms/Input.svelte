<script>
	export let label;
	export let name;
	export let type;
	export let value;
	export let className;
</script>

<label for={name}> {label}
<input
	class={className}
	type={type}
	name={name}
	value={value ?? ''}
/>
</label>