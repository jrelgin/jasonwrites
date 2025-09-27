import { defineConfig } from 'astro/config';
import tailwind from '@tailwindcss/vite';
import vercel from '@astrojs/vercel';
import react from '@astrojs/react';
import markdoc from '@astrojs/markdoc';
import keystatic from '@keystatic/astro';

// https://astro.build/config
export default defineConfig({
  output: 'static',
  adapter: vercel({ mode: 'static' }),
  integrations: [react(), markdoc(), keystatic()],
  vite: {
    plugins: [tailwind()],
  },
});
