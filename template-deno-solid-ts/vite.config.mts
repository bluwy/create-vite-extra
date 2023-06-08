import { defineConfig } from 'npm:vite@^4.3.9'
import solid from 'npm:vite-plugin-solid@^2.7.0'

import 'npm:solid-js@^1.7.2'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [solid()]
})
