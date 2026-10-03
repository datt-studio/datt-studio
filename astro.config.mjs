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
      // Error pages, and the URLs that robots.txt Disallows, must not appear
      // in the sitemap: Google reports a sitemap that lists a disallowed URL
      // as an error. Keep the sitemap to canonical, indexable, crawlable
      // pages only.
      filter: (page) =>
        !/\/(?:404|500|502|503|504)\/?$/.test(page) &&
        !/\/(?:privacy-cookies-policy|terms-of-use)\/?$/.test(page) &&
        !/\/preview-reveal\/?$/.test(page),
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
