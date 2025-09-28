import { defineConfig } from 'astro/config';
import tailwind from '@tailwindcss/vite';
import vercel from '@astrojs/vercel';
import react from '@astrojs/react';
import keystatic from '@keystatic/astro';
import remarkGfm from 'remark-gfm';
import remarkSmartypants from 'remark-smartypants';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeExternalLinks from 'rehype-external-links';

// https://astro.build/config
const mdocAliasPlugin = {
  name: 'jm-mdoc-to-md-alias',
  enforce: 'pre',
  resolveId(source) {
    if (source.includes('.mdoc')) {
      return source.replace(/\.mdoc/g, '.md');
    }
    return null;
  },
};

export default defineConfig({
  output: 'static',
  adapter: vercel({ mode: 'static' }),
  integrations: [react(), keystatic()],
  markdown: {
    remarkPlugins: [remarkGfm, remarkSmartypants],
    rehypePlugins: [
      rehypeSlug,
      [
        rehypeAutolinkHeadings,
        {
          behavior: 'wrap',
          properties: {
            class: 'heading-anchor',
          },
        },
      ],
      [
        rehypeExternalLinks,
        {
          target: '_blank',
          rel: ['noopener', 'noreferrer'],
        },
      ],
    ],
  },
  vite: {
    plugins: [mdocAliasPlugin, tailwind()],
  },
});
