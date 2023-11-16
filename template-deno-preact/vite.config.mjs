import { defineConfig } from 'npm:vite@^5.0.0'
import preact from 'npm:@preact/preset-vite@^2.6.0'

import 'npm:preact@^10.19.2'
import 'npm:preact@^10.19.2'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [preact()]
})
