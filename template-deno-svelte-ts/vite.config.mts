import { defineConfig } from 'npm:vite@^4.3.9'
import { svelte } from 'npm:@sveltejs/vite-plugin-svelte@^2.4.1'

import 'npm:svelte@^3.54.0'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte()]
})
