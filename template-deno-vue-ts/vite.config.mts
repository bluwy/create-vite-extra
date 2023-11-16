import { defineConfig } from 'npm:vite@^5.0.0'
import vue from 'npm:@vitejs/plugin-vue@^4.5.0'

import 'npm:vue@^3.3.8'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
})
