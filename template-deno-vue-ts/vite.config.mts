import { defineConfig } from 'npm:vite@^4.0.4'
import vue from 'npm:@vitejs/plugin-vue@^4.0.0'

import 'npm:vue@^3.2.45'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
})
