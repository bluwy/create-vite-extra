import { defineConfig } from 'npm:vite@^5.0.10'
import preact from 'npm:@preact/preset-vite@^2.7.0'

import 'npm:preact@^10.19.3'
import 'npm:preact@^10.19.3'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [preact()]
})
