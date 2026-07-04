import { defineConfig } from 'vite'

const packageJson = require('./package.json')

export default defineConfig({
  publicDir: 'public',
  root: '.',
  define: {
    APP_VERSION: JSON.stringify(packageJson.version)
  },

  build: {
    emptyOutDir: true,
    outDir: 'dist'
  },
  server: {
    open: true,
    port: 3000
  }
})
