import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// When deploying to GitHub Pages the repo name becomes the base path.
// Set VITE_BASE_URL env var in GitHub Actions to override (e.g. /apollo-tirupati/).
// For local dev, base is '/' so proxying still works.
const base = process.env.VITE_BASE_URL || '/'

export default defineConfig({
  base,
  plugins: [react()],
  server: {
    port: 5200,
    proxy: {
      '/api': {
        target: process.env.VITE_API_URL || 'http://localhost:4000',
        changeOrigin: true
      }
    }
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
  }
})
