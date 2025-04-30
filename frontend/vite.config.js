import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'https://s85-nikunj-capstone-queueaway.onrender.com/'
    }
  }
});