# DATT STUDIO

> **Nominated** — Awwwards · CSS Design Awards · CSS Winner
>
> The studio site for DATT STUDIO: identity, systems, and digital work made to hold.
> Built with a strict focus on clarity, architectural restraint, and raw performance.

[![Awwwards Nominee](https://img.shields.io/badge/Awwwards-Nominee-black?style=flat-square)](YOUR_AWWWARDS_URL)
[![CSSDA Nominee](https://img.shields.io/badge/CSSDA-Nominee-black?style=flat-square)](YOUR_CSSDA_URL)
[![CSS Winner](https://img.shields.io/badge/CSS%20Winner-Nominee-black?style=flat-square)](YOUR_CSS_WINNER_URL)

---

## Stack

- **Astro** — static output, zero client framework overhead
- **Tailwind CSS** — utility styling
- **Cloudflare Pages** — edge deployment (auto-build on push to `main`)

No CMS. Content lives in the repo (see `public/` assets + `src/pages/`).

## Quick start

```bash
# 1. Clone
git clone https://github.com/datt-studio/datt-studio.git
cd datt-studio

# 2. Install
npm install

# 3. Dev server
npm run dev
# → http://localhost:4321

# 4. Production build (outputs to dist/)
npm run build

# 5. Preview the build locally
npm run preview
```

## Deploy

Push to `main` → Cloudflare Pages builds and deploys automatically.

## Structure

```
public/assets/    # video, poster, logos
src/components/   # sections & UI components
src/pages/        # routes (/, /services, /contact, /info, /accessibility, /data-processing)
src/layouts/      # Layout.astro (SEO, schema, motion system)
```

## Notes

- Video assets are CRF 26 H.264 encodes for fast first paint.
- Reduced-motion is user-controllable on the Accessibility page.
