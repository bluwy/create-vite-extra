import { defineConfig } from 'npm:vite@^5.0.10'
import react from 'npm:@vitejs/plugin-react@^4.2.1'

import 'npm:react@^18.2.0'
import 'npm:react-dom@^18.2.0'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()]
})
