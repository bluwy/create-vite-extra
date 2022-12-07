import { defineConfig } from 'npm:vite@^3.2.3'
import vue from 'npm:@vitejs/plugin-vue@^3.2.0'

import 'npm:vue@^3.2.45'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
})
