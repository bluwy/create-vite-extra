import { defineConfig } from 'npm:vite@^4.4.11'
import solid from 'npm:vite-plugin-solid@^2.7.1'

import 'npm:solid-js@^1.8.1'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [solid()]
})
