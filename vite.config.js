import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	server: {
		proxy: {
			"/sanctum/csrf-cookie": {
				target: "http://localhost",
				changeOrigin: true,
				secure: false,
				cookieDomainRewrite: "localhost",
			},
			"/user/login": {
				target: "http://localhost",
				changeOrigin: true,
				secure: false,
				cookieDomainRewrite: "localhost",
			},
			"/logged-in": {
				target: "http://localhost",
				changeOrigin: true,
				secure: false,
				cookieDomainRewrite: "localhost",
			},
		},
	},
	plugins: [sveltekit()]
});
