import { defineConfig } from 'npm:vite'
import preact from 'npm:@preact/preset-vite'

import "npm:preact";
import "npm:preact/hooks";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [preact()]
})
