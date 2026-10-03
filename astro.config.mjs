import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sanity from '@sanity/astro';
import { loadEnv } from "vite";
import sitemap from '@astrojs/sitemap';
import { readdirSync, readFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const env = loadEnv(process.env.NODE_ENV || "development", process.cwd(), "");

const root = dirname(fileURLToPath(import.meta.url));

// --- Per-page lastmod --------------------------------------------------------
// Google only trusts <lastmod> when it reflects the page's own last change, not
// the deploy time. So each canonical URL gets its real date instead of one
// build timestamp shared by every URL:
//   * news articles: the `date` in their frontmatter
//   * static pages:  the last git commit that touched the source file
// A shallow CI clone would make every file report the same HEAD date, which is
// the very thing this avoids, so in that case static pages carry no lastmod
// rather than a misleading one. lastmod is optional, so the sitemap stays valid.
const dateByPath = new Map();

const newsDir = join(root, 'src/content/news');
for (const file of readdirSync(newsDir)) {
  if (!file.endsWith('.md')) continue;
  const front = readFileSync(join(newsDir, file), 'utf8').match(/^---\r?\n([\s\S]*?)\r?\n---/);
  const date = front?.[1].match(/^date:\s*["']?([^"'\r\n]+?)["']?\s*$/m)?.[1];
  if (date) dateByPath.set(`/news/${file.slice(0, -3)}/`, new Date(date).toISOString());
}

let fullHistory = false;
try {
  fullHistory = execFileSync('git', ['rev-parse', '--is-shallow-repository'], { cwd: root })
    .toString().trim() === 'false';
} catch { /* no git available, leave static pages without lastmod */ }

if (fullHistory) {
  const walk = (dir) =>
    readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
      const abs = join(dir, entry.name);
      if (entry.isDirectory()) return walk(abs);
      return entry.name.endsWith('.astro') ? [abs] : [];
    });

  for (const abs of walk(join(root, 'src/pages'))) {
    const rel = abs.slice(root.length + 1);
    let route = rel.replace(/^src\/pages\//, '').replace(/\.astro$/, '');
    if (route.endsWith('/index')) route = route.slice(0, -6);
    if (route === 'index') route = '';
    if (route.includes('[') || route.startsWith('_')) continue; // dynamic or private
    const pathname = `/${route}/`.replace('//', '/');
    try {
      const iso = execFileSync('git', ['log', '-1', '--format=%cI', '--', rel], { cwd: root })
        .toString().trim();
      if (iso) dateByPath.set(pathname, new Date(iso).toISOString());
    } catch { /* leave without lastmod */ }
  }
}


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
      // Emit each page's real lastmod, resolved above from article dates and
      // source-file history. Omitted when no trustworthy date is known.
      serialize(item) {
        const lastmod = dateByPath.get(new URL(item.url).pathname);
        if (lastmod) item.lastmod = lastmod;
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
