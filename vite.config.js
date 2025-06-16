import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/portfolio-andre-2025/',
  css: {
    postcss: './postcss.config.js',
  },
  server: {
    port: 3000,
    open: true,
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: true,
    emptyOutDir: true,
    // Performance optimizations
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor chunks for better caching
          vendor: ['react', 'react-dom'],
          motion: ['framer-motion'],
          icons: ['react-icons'],
          router: ['react-router-dom'],
        },
      },
    },
    // Enable minification and compression
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    // Chunk size warning limit
    chunkSizeWarningLimit: 1000,
  },
});
