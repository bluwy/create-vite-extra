import { defineConfig } from 'npm:vite@^4.0.4'

import 'npm:lit@^2.5.0'

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
