import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    // Add this hmr block to handle dev tunnels
    hmr: {
      host: 'g4hbc24m-3000.euw.devtunnels.ms',
      protocol: 'wss', // Secure websockets are mandatory over dev tunnels
      clientPort: 443
    }
  }
})
