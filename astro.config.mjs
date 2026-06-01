// @ts-check
import { defineConfig } from 'astro/config';
import preact from '@astrojs/preact';

// https://astro.build/config
export default defineConfig({
  output: 'static',
  outDir: './dist',
  compressHTML: false,
  integrations: [preact()],
  vite: {
    build: {
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('/src/scripts/filters.ts')) {
              return 'filters';
            }
          },
        },
      },
    },
  },
});
