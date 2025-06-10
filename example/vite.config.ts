import { resolve } from 'node:path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  base: process.env.VITE_BASE_PATH || '/',
  resolve: {
    alias: {
      'react-body-highlighter': resolve(__dirname, '../src'),
    },
  },
  server: {
    port: 3000,
    open: true,
  },
});
