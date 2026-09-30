import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sanity from '@sanity/astro';
import { loadEnv } from "vite";
import sitemap from '@astrojs/sitemap';

const env = loadEnv(process.env.NODE_ENV || "development", process.cwd(), "");


export default defineConfig({
  site: 'https://dattstudio.com',
  server: {
    host: '0.0.0.0',
    port: 4321,
  },
  build: {
    inlineStylesheets: 'always'
  },
  integrations: [
    tailwind(),
    sitemap({
      filter: (page) => !/\/(?:404|500|502|503|504)\/?$/.test(page),
    }),
    sanity({
      projectId: env.PUBLIC_SANITY_PROJECT_ID,
      dataset: env.PUBLIC_SANITY_DATASET || 'production',
      useCdn: true,
      apiVersion: '2025-01-01',
    }),
  ],
  vite: {
    server: {
      allowedHosts: [
        'dattstudio.com',
        'dattstudio.co.uk',
        'datt-studio.com',
        'datt-studio.co.uk',
        '.cfargotunnel.com'
      ]
    }
  }
});
