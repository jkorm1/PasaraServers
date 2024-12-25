import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [react()],
  server: {
    host: '192.168.51.163',
    port: 5174,
    hmr: {
      protocol: 'ws',
      host: '1192.168.51.163',
      port: 5174,
      clientPort: 5174,
      timeout: 1000,
      overlay: true,
      poll: 1000,
    },
    watch: {
      usePolling: true,
      interval: 1000,
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
