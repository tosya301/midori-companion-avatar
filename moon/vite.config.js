import { defineConfig } from 'vite';
import { fileURLToPath } from 'node:url';

export default defineConfig({
  base: './',
  publicDir: false,
  build: {
    outDir: '../assets/moon-art/runtime',
    emptyOutDir: true,
    target: 'es2022',
    lib: { entry: fileURLToPath(new URL('./src/host.js', import.meta.url)), formats: ['es'], fileName: () => 'host.js' },
    rollupOptions: { output: { chunkFileNames: '[name]-[hash].js' } },
    sourcemap: false,
  },
});
