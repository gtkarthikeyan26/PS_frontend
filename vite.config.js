import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://ps-backend-oxic.onrender.com',
        changeOrigin: true,
        secure: false, // 👈 Bypasses SSL verification
      },
    },
  },
  base: '/',
  build: {
    outDir: 'dist', // Vite's default build folder
  },
})
