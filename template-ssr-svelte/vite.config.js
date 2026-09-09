import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

// https://vite.dev/config/
export default defineConfig(({ isSsrBuild }) => ({
  plugins: [svelte()],
  build: {
    copyPublicDir: !isSsrBuild,
  },
}))
