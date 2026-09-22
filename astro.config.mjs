import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sanity from '@sanity/astro';
import { loadEnv } from "vite";

const env = loadEnv(process.env.NODE_ENV || "development", process.cwd(), "");

export default defineConfig({
  site: 'https://dattstudio.com',
  server: {
    host: '0.0.0.0',
    port: 4321,
  },
  integrations: [
    tailwind(),
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
