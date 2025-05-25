import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  const url = env.VITE_API_BASE_URL;
  return {
    plugins: [react()],
    server: {
      port: 5173,
      proxy: {
        '/api': {
          target: url,
          changeOrigin: true,
          secure: true,
          rewrite: path => path.replace(/^\/api/, '/api'),
        },
      },
    },
  };
});
