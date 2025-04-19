import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
  ],

  server: {
    host: '0.0.0.0', // This allows access from any device on the network
    port: 5174, // Optional, leave it as the default or set a different port if needed
  },
})
