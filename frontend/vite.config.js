import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const isProd = process.env.NODE_ENV === 'production'
// GitHub Pages serves from /apollo-tirupati/ — must match repo name exactly
const base = isProd ? '/apollo-tirupati/' : '/'

export default defineConfig({
  base,
  define: {
    // Expose base to the app so BrowserRouter can use it as basename
    'import.meta.env.VITE_BASE_URL': JSON.stringify(isProd ? '/apollo-tirupati/' : '/'),
  },
  plugins: [react()],
  server: {
    port: 5200,
    proxy: {
      '/api': {
        target: 'http://localhost:4000',
        changeOrigin: true
      }
    }
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
  }
})
