import { defineConfig } from 'npm:vite@^5.4.8'
import { svelte } from 'npm:@sveltejs/vite-plugin-svelte@^3.1.2'

import 'npm:svelte@^4.2.19'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte()]
})
