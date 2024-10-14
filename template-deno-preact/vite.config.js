import { defineConfig } from 'vite'
import deno from '@deno/vite-plugin'
import preact from '@preact/preset-vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [deno(), preact()],
})
