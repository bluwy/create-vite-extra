import { defineConfig } from 'npm:vite@^5.0.0'
import solid from 'npm:vite-plugin-solid@^2.7.2'

import 'npm:solid-js@^1.8.5'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [solid()]
})
