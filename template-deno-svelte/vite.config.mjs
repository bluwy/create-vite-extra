import { defineConfig } from 'npm:vite@^3.1.3'
import { svelte } from 'npm:@sveltejs/vite-plugin-svelte@^1.0.8'

import 'npm:svelte@^3.50.1'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte()]
})
