const { addDynamicIconSelectors } = require('@iconify/tailwind');

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {},
	plugins: [
		require('@tailwindcss/forms'),
		require('@tailwindcss/typography'),
		addDynamicIconSelectors()
	],
}

