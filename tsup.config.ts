import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm'],                 // Ensures proper ESM build
  target: 'es2020',
  clean: true,                    // Cleans the output directory before each build
})