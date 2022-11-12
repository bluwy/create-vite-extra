import { defineConfig } from 'npm:vite@^3.1.3'
import preact from 'npm:@preact/preset-vite@2.4'

import 'npm:preact@10.11'
import 'npm:preact@10.11/hooks'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [preact()]
})
