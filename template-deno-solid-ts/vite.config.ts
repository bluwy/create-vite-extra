import { defineConfig } from 'vite'
import deno from '@deno/vite-plugin'
import solid from 'vite-plugin-solid'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [deno(), solid()],
})
