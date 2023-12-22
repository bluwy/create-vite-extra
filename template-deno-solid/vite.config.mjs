import { defineConfig } from 'npm:vite@^5.0.10'
import solid from 'npm:vite-plugin-solid@^2.8.0'

import 'npm:solid-js@^1.8.7'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [solid()]
})
