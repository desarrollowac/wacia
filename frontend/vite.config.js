import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'https://hqpdgd0r-8000.usw3.devtunnels.ms/',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
