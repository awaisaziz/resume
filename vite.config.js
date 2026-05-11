import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
// base is set to '/resume/' to match the GitHub Pages deployment URL:
// https://awaisaziz.github.io/resume/
export default defineConfig({
  base: '/resume/',
  plugins: [react()],
})
