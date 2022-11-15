import { defineConfig } from 'npm:vite@^3.2.3'
import solid from 'npm:vite-plugin-solid@^2.4.0'

import 'npm:solid-js@^1.6.2'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [solid()]
})
