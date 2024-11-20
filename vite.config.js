import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  root: '.', // Set the root directory to the current folder
  build: {
    outDir: 'dist', // Ensure the build files go to `dist`
    rollupOptions: {
      input: './index.html', // Specify the correct location of index.html
    },
  },
});
