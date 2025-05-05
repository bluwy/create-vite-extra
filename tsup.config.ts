import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm'],                 // Ensures proper ESM build
  target: 'es2020',
  dts: true,                       // Generates .d.ts files
  sourcemap: true,
  clean: true,
})
