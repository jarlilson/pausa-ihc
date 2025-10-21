import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // GitHub Pages base path will be injected by Actions as VITE_BASE="/<repo>/"
  base: process.env.VITE_BASE ?? '/',
})
