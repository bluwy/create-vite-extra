import { defineConfig } from 'vite'
import deno from '@deno/vite-plugin'
import solid from 'vite-plugin-solid'

// https://vite.dev/config/
export default defineConfig({
  plugins: [deno(), solid()],
})
