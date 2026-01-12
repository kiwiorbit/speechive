
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // IMPORTANT: This sets the base URL for your subdomain folder on Hostinger
  base: '/speechive/', 
  build: {
    outDir: 'dist',
  }
})
