# DATT STUDIO

> **Nominated** — Awwwards · CSS Design Awards · CSS Winner
>
> The studio site for DATT STUDIO: identity, systems, and digital work made to hold.
> Built with a strict focus on clarity, architectural restraint, and raw performance.

[![CSSDA Nominee](https://img.shields.io/badge/CSSDA-Nominee-black?style=flat-square)](https://www.cssdesignawards.com/sites/datt-studio/50228/)
[![CSS Winner Nominee](https://img.shields.io/badge/CSS%20Winner-Nominee-black?style=flat-square)](https://www.csswinner.com/details/datt-studio/19434)

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
