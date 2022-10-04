import { defineConfig } from 'npm:vite'
import vue from 'npm:@vitejs/plugin-vue'

import 'npm:vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()]
})
