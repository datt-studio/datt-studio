// astro.config.mjs
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sanity from '@sanity/astro';

export default defineConfig({
  integrations: [
    tailwind(),
    sanity({
      projectId: 'd9mob5o5',
      dataset: 'production',
      useCdn: true,
    }),
  ],
});
