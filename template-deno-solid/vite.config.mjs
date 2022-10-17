import { defineConfig } from 'npm:vite'
import solid from 'npm:vite-plugin-solid'

import 'npm:solid-js'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [solid()]
})
