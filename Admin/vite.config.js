import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    // 👇 This line fixes 404 on refresh or deep links like /add
    historyApiFallback: true
  }
})
