import { defineConfig } from 'npm:vite@^5.0.0'
import { svelte } from 'npm:@sveltejs/vite-plugin-svelte@^3.0.0'

import 'npm:svelte@^4.2.3'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte()]
})
