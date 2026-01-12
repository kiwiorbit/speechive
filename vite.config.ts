
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Vercel deploys to the root domain by default
  base: '/', 
  build: {
    outDir: 'dist',
  }
})
