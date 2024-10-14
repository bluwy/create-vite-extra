import { defineConfig } from 'vite'
import deno from '@deno/vite-plugin'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [deno(), vue()],
})
