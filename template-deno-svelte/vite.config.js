import { defineConfig } from 'vite'
import deno from '@deno/vite-plugin'
import { svelte } from '@sveltejs/vite-plugin-svelte'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [deno(), svelte()]
})
