import { defineConfig } from 'npm:vite@^4.0.4'
import solid from 'npm:vite-plugin-solid@^2.4.0'

import 'npm:solid-js@^1.6.3'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [solid()]
})
