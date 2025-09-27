import type { Config } from 'tailwindcss';

export default {
  darkMode: 'class',
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,mdoc,svelte,ts,tsx,vue}'],
  theme: {
    extend: {},
  },
  plugins: [],
} satisfies Config;
