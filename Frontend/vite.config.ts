import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    hmr: {
      host: 'g4hbc24m-3000.euw.devtunnels.ms',
      protocol: 'wss',
      clientPort: 443
    }
  }
})
