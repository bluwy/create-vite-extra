import { defineConfig } from 'npm:vite@^5.0.10'
import { svelte } from 'npm:@sveltejs/vite-plugin-svelte@^3.0.1'

import 'npm:svelte@^4.2.8'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte()]
})
