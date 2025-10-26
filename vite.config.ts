import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/pausa-ihc/', // <= NOME EXATO DO REPO, com barras
})
