import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
// base is '/' in dev (npm run dev) and '/resume/' in production (npm run deploy)
// import.meta.env.BASE_URL in App.jsx picks this up automatically in both cases
export default defineConfig(({ command }) => ({
  base: command === 'serve' ? '/' : '/portfolio/',
  plugins: [react()],
}))
