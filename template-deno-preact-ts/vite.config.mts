import { defineConfig } from 'npm:vite@^4.0.0-beta.7'
import preact from 'npm:@preact/preset-vite@^2.4.0'

import 'npm:preact@^10.11.3'
import 'npm:preact@^10.11.3/hooks'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [preact()]
})
