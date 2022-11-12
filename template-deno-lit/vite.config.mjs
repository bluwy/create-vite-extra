import { defineConfig } from 'npm:vite@^3.1.3'

import 'npm:lit@2.4'

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
