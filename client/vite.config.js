import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    postcss: './postcss.config.js', // Path to your postcss.config.js
  },
  server:{
    host: 'localhost',
    port: 5173,
  },
  resolve: {
    alias: {
      'faker-js': '@faker-js/faker',
    },
  },
})
