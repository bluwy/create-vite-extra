import { defineConfig } from 'npm:vite@^3.1.3'
import solid from 'npm:vite-plugin-solid@^2.3.9'

import 'npm:solid-js@^1.5.9'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [solid()]
})
