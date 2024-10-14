import { defineConfig } from 'npm:vite@^5.4.8'
import solid from 'npm:vite-plugin-solid@^2.10.2'

import 'npm:solid-js@^1.9.2'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [solid()]
})
