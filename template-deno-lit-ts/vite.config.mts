import { defineConfig } from 'npm:vite@^4.0.0'

import 'npm:lit@^2.5.0'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: 'src/my-element.js',
      formats: ['es'],
      fileName: 'app'
    },
    rollupOptions: {
      external: /^lit/
    }
  }
})
