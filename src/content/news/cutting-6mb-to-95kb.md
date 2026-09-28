---
title: "Why we cut our own homepage from 6.3 MB to 95 KB"
date: 2026-09-28
summary: "A performance pass that changed nothing visually, and the three decisions that mattered."
---

When we rebuilt this site we assumed the videos would be the problem. They were the *symptom*.

## The starting point

Our first Lighthouse run on a throttled mobile connection scored 93 and flagged 6.2 MB of transferred payload. The obvious culprit was the hero reel plus three offering videos — a 3.2 MB reel and three more behind it. So we made them lazy: `preload="none"`, and the bytes only requested when someone actually interacts.

That took the payload from 6,340 KB to roughly 225 KB. Worth doing. But we re-ran the audit and the score moved 93 → 92, which told us the video was never what the metric was punishing.

## What was actually happening

Three things, in order of impact.

**Render-blocking CSS.** Astro was emitting an external stylesheet. We set `inlineStylesheets: 'always'`, so the CSS ships inside the HTML. One round trip removed.

**A font CDN we didn't need.** The site was pulling Inter from Google Fonts — a DNS lookup, a TLS handshake, and two separate font files before a single word rendered. We self-hosted, and in the process discovered the exact character set the site uses is 81 characters. Google was shipping us Latin, Latin-Extended, Cyrillic and Greek.

**A poster image nobody had looked at.** A 2160×1215 JPEG at 104 KB. Converted to WebP at the same resolution: 9.8 KB. Not scaled down, not recompressed harder — just the right format. 58 dB PSNR against the original, which is visually lossless.

## The decision we nearly got wrong

Inter is a variable font with two axes: `wght` and `opsz`. Optical sizing changes advance widths — pinning `opsz` to a single value would have cut the file by another 20 KB, but it also shifted letter-spacing by up to 6.4% and would have changed where lines wrapped.

We measured the advance widths before committing, and threw away the extra 20 KB. The font renders pixel-identically to what Google served, and that's worth more than 20 KB.

Final numbers: 95 KB homepage payload, zero third-party requests, 100 on both mobile and desktop.

## Why this is a note and not a case study

There are no clients on this site yet. We're still landing them. So there's no project to show you, and we'd rather tell you that plainly than fill a portfolio page with placeholder work.

What we can tell you is how we think about the things that don't photograph well: restraint, and the discipline to measure before optimising.
