import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import { visualizer } from 'rollup-plugin-visualizer';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),
    tailwindcss(),
    visualizer({ open: true }),
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes('@faker-js/faker')) {
            return 'faker';
          }
          /* else if (id.includes('scheduler')) {
            return 'scheduler';
          }
          else if (id.includes('react-dom')) {
            return 'react-dom';
          }
          else if (id.includes('react')) {
            return 'react';
          } */
        },
      },
    },
  },
})
