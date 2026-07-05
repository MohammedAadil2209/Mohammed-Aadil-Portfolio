import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    target: 'esnext',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('three')) return 'vendor-three';
            if (id.includes('framer-motion')) return 'vendor-framer-motion';
            if (id.includes('gsap')) return 'vendor-gsap';
            if (id.includes('react') || id.includes('react-dom')) return 'vendor-react';
            return 'vendor'; // all other node_modules
          }
        },
      },
    },
  },
})
