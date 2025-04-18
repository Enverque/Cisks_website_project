import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv';

export default defineConfig({
  plugins: [react()],
  define:{
    'process.env.VITE_KEY':JSON.stringify(process.env.VITE_KEY)
  },
  server: {
    port: 5174,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
