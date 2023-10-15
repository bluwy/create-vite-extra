import { defineConfig } from 'npm:vite@^4.4.11'
import vue from 'npm:@vitejs/plugin-vue@^4.4.0'

import 'npm:vue@^3.3.4'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
})
