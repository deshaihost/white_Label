import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'build',
  },
  server: {
    port: 3000,
    open: true
  },
  esbuild: {
    loader: 'jsx',
    include: /src\/.*\.[jt]sx?$/,
    exclude: []
  },
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        '.js': 'jsx',
      },
    },
  },
  define: {
    // Only expose specific environment variables that start with REACT_APP_
    // This is safer than exposing the entire process.env object
    ...Object.keys(process.env).reduce((prev, key) => {
      if (key.startsWith('REACT_APP_')) {
        prev[`process.env.${key}`] = JSON.stringify(process.env[key]);
      }
      return prev;
    }, {})
  }
});


