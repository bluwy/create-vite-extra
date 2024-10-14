import { defineConfig } from 'npm:vite@^5.4.8'
import react from 'npm:@vitejs/plugin-react@^4.3.2'

import 'npm:react@^18.3.1'
import 'npm:react-dom@^18.3.1'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()]
})
