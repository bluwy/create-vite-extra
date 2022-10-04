import { defineConfig } from 'npm:vite'
import react from 'npm:@vitejs/plugin-react'

import 'npm:react'
import 'npm:react-dom/client'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()]
})
