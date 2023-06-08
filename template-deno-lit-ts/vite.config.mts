import { defineConfig } from 'npm:vite@^4.3.9'

import 'npm:lit@^2.7.5'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: 'src/my-element.ts',
      formats: ['es']
    },
    rollupOptions: {
      external: /^lit/
    }
  }
})
