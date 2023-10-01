
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from 'tailwindcss';

export default defineConfig({
  plugins: [react(),tailwindcss()],
  server: {
    host: true,
    port: 8000,
     watch: {
       usePolling: true
     }
  }
 })