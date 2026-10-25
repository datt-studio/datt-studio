#!/usr/bin/env node
/* Builds the JPEG share card for every news article from its WebP cover.
   LinkedIn will not render a WebP og:image, so each cover gets a JPEG twin used
   only by the link preview. Run this after adding an article or changing a
   cover:  npm run news:og */
import sharp from 'sharp';
import { readdir, readFile, mkdir } from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const newsDir = path.join(root, 'src/content/news');
const outDir = path.join(root, 'public/news/og');

await mkdir(outDir, { recursive: true });

const files = (await readdir(newsDir)).filter((file) => file.endsWith('.md'));

for (const file of files) {
  const slug = file.slice(0, -3);
  const source = await readFile(path.join(newsDir, file), 'utf8');
  const front = source.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  const cover = front?.[1].match(/^cover:\s*["']?([^"'\r\n]+?)["']?\s*$/m)?.[1];

  if (!cover) {
    console.log(`${slug}: no cover, skipped`);
    continue;
  }

  const input = path.join(root, 'public', cover.replace(/^\//, ''));
  const output = path.join(outDir, `${slug}.jpg`);

  try {
    const info = await sharp(input)
      .resize(1200, 675, { fit: 'cover' })
      .flatten({ background: '#000000' })
      .jpeg({ quality: 82, mozjpeg: true })
      .toFile(output);

    console.log(`${slug}.jpg  ${info.width}x${info.height}  ${info.size} B`);
  } catch (error) {
    console.log(`${slug}: ${cover} could not be read (${error.message})`);
  }
}
