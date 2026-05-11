import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
// base is '/' because this is a GitHub username repo (awaisaziz.github.io),
// which is served from the root. For a project repo it would be '/repo-name/'.
export default defineConfig({
  base: '/',
  plugins: [react()],
})
