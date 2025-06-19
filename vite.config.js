import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  // Fixed backend URL for proxy
  const url = 'https://cisksbackend1-0.onrender.com';

  return {
    plugins: [react()],
    server: {
      port: 5173,
      proxy: {
        '/api': {
          target: url,
          changeOrigin: true,
          secure: true,
        },
      },
    },
    build: {
      rollupOptions: {
        output: {
          entryFileNames: `[name].[hash].js`,
          chunkFileNames: `[name].[hash].js`,
          assetFileNames: `[name].[hash].[ext]`
        }
      }
    }
  };
});
