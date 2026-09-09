import { defineConfig } from 'vite'
import solid from 'vite-plugin-solid'

// https://vite.dev/config/
export default defineConfig(({ isSsrBuild }) => ({
  plugins: [solid({ ssr: true })],
  build: {
    copyPublicDir: !isSsrBuild,
  },
}))
