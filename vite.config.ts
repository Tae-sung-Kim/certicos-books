import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

// https://vite.dev/config/
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react()],
    server: {
      proxy:
        env.VITE_ENV === 'development'
          ? {
              '/api': {
                target: 'https://dapi.kakao.com',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, ''),
              },
            }
          : undefined,
    },
    resolve: {
      alias: {
        '@': resolve(__dirname, './src'),
      },
    },
  };
});
