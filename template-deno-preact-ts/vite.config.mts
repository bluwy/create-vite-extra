import { defineConfig } from 'npm:vite@^5.2.10'
import preact from 'npm:@preact/preset-vite@^2.8.2'

import 'npm:preact@^10.20.2'

// Workaround Preact babel plugin issue in Deno: https://github.com/bluwy/create-vite-extra/issues/34
import 'npm:@babel/plugin-transform-react-jsx-development@^7.22.5'
import 'npm:@babel/plugin-transform-react-jsx@^7.22.5'
import 'npm:babel-plugin-transform-hook-names@^1.0.2'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [preact()]
})
