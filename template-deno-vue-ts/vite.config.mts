import { defineConfig } from 'npm:vite@^4.0.0-beta.7'
import vue from 'npm:@vitejs/plugin-vue@^4.0.0-beta.0'

import 'npm:vue@^3.2.45'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
})
