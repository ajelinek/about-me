import { defineConfig } from 'astro/config';
import mdx from "@astrojs/mdx";
import { remarkReadingTime } from './plugins/remark-reading-time.mjs';

import solidJs from "@astrojs/solid-js";

// https://astro.build/config
export default defineConfig({
  integrations: [mdx(), solidJs()],
  markdown: {
    remarkPlugins: [remarkReadingTime]
  },
  site: 'https://ajelinek.github.io',
  base: '/about-me'
});