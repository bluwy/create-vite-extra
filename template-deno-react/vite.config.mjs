import { defineConfig } from 'npm:vite@^3.2.3'
import react from 'npm:@vitejs/plugin-react@^2.2.0'

import 'npm:react@^18.2.0'
import 'npm:react-dom/client@^18.2.0'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()]
})
