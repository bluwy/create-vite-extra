import { defineConfig } from 'npm:vite@^4.3.9'
import preact from 'npm:@preact/preset-vite@^2.5.0'

import 'npm:preact@^10.15.1'
import 'npm:preact@^10.15.1/hooks'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [preact()]
})
