import { defineConfig } from 'npm:vite@^3.2.3'
import { svelte } from 'npm:@sveltejs/vite-plugin-svelte@^1.1.1'

import 'npm:svelte@^3.53.1'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte()]
})
