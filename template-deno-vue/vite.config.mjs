import { defineConfig } from 'npm:vite@^5.4.8'
import vue from 'npm:@vitejs/plugin-vue@^5.1.4'

import 'npm:vue@^3.5.12'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()]
})
