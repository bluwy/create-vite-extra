import { defineConfig } from 'npm:vite@^4.4.11'

import 'npm:lit@^2.7.5'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: 'src/my-element.js',
      formats: ['es']
    },
    rollupOptions: {
      external: /^lit/
    }
  }
})
