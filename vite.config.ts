import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import { defineConfig } from 'vite'
import tailwindcss from "@tailwindcss/vite"

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] }),
    tailwindcss()
  ],
  server: {
    host: true, // Permite que Vite escuche en 0.0.0.0 (no solo en localhost)
    allowedHosts: true, // Permite cualquier dominio/túnel de Cloudflare
  },
})
