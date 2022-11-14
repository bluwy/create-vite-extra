import { defineConfig } from 'npm:vite@^3.1.3'
import vue from 'npm:@vitejs/plugin-vue@^3.2.39'

import 'npm:vue@^3.2.39'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()]
})
