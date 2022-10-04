import { defineConfig } from 'npm:vite'

import "npm:lit";

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
