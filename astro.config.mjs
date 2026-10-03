import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sanity from '@sanity/astro';
import { loadEnv } from "vite";
import sitemap from '@astrojs/sitemap';

const env = loadEnv(process.env.NODE_ENV || "development", process.cwd(), "");

// A deploy is the moment the served page changes, so this is a verifiable
// lastmod for every canonical URL and never older than the content it stamps.
const buildTime = new Date().toISOString();


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
      // Error pages and the local-only preview page must not appear in the
      // sitemap. The legal pages (privacy, terms) are ordinary indexable pages,
      // so they stay in: blocking them in robots.txt while they declare
      // index,follow was contradictory. Keep the sitemap to canonical,
      // indexable, crawlable pages only.
      filter: (page) =>
        !/\/(?:404|500|502|503|504)\/?$/.test(page) &&
        !/\/preview-reveal\/?$/.test(page),
      // Give each canonical URL a lastmod so Google has a freshness signal to
      // guide recrawls. Without it the sitemap carries only bare <loc> entries.
      serialize(item) {
        item.lastmod = buildTime;
        return item;
      },
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
