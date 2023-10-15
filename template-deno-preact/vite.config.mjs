import { defineConfig } from 'npm:vite@^4.4.11'
import preact from 'npm:@preact/preset-vite@^2.6.0'

import 'npm:preact@^10.18.1'
import 'npm:preact@^10.18.1'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [preact()]
})
