/// <reference types="vite/client" />

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from 'tailwindcss';
import tsconfigPaths from "vite-tsconfig-paths"



export default defineConfig({
  plugins: [react(),tailwindcss(), tsconfigPaths()],
  server: {
    host: true,
    port: 8000,
     watch: {
       usePolling: true
     }
  }
 })