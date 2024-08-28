import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
	plugins: [sveltekit()],
	define: {
		'process.env': process.env
	},
	server: {
		fs: {
			allow: ['.']
		}
	},
	build: {
		chunkSizeWarningLimit: 1000
	}
});
