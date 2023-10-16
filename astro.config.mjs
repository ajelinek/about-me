import { defineConfig } from 'astro/config'

import mdx from "@astrojs/mdx"
import { remarkReadingTime } from './plugins/remark-reading-time.mjs'


// https://astro.build/config
export default defineConfig({
  integrations: [ mdx() ],
  markdown: {
    remarkPlugins: [ remarkReadingTime ],
  },
  site: 'https://ajelinek.github.io',
  base: '/about-me',
})