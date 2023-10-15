import { defineConfig } from 'npm:vite@^4.4.11'
import { svelte } from 'npm:@sveltejs/vite-plugin-svelte@^2.4.6'

import 'npm:svelte@^4.2.1'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte()]
})
