import { defineConfig } from 'npm:vite@^3.2.3'

import 'npm:lit@^2.4.1'

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
