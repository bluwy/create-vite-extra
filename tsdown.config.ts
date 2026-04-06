import { defineConfig } from 'tsdown'

export default defineConfig({
  target: 'node20',
  fixedExtension: false,
  // TODO: Minify, bundle dependencies and licenses
})
