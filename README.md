# Josue Somarribas portfolio

A statically exported portfolio built with React and
[vinext](https://github.com/cloudflare/vinext). Every public route is rendered
to HTML during the build and can be served directly by Vercel without a
server-side runtime.

## Prerequisites

- Node.js `>=22.13.0`

## Quick Start

```bash
npm install
npm run dev
npm run build
```

The production files are generated in `dist/client`. `vercel.json` configures
Vercel to publish that directory with clean URLs.

## Routes

- `/`
- `/es`
- `/about`
- `/blog`
- `/es/blog`
- `/blog/<slug>`
- `/es/blog/<slug>` (English-content fallback, `noindex`)
- `/robots.txt`, `/sitemap.xml`, `/rss.xml`

Legacy `/writing` URLs redirect permanently to their `/blog` equivalents on
Vercel.

## Useful Commands

- `npm run dev`: start local development
- `npm run build`: generate the static production site
- `npm test`: build and verify every exported route

## Vercel

Import the repository normally. The checked-in `vercel.json` selects the build
command and the static output directory, so no dashboard overrides are needed.
# Content

Blog articles are file-backed and live in `content/articles/<slug>/en.md`. Each file uses JSON-compatible YAML frontmatter followed by the original article HTML, which is valid inside Markdown. Topic metadata lives in `content/topics`.

Run `npm run content:migrate` to re-import the Framer CSV backups. The importer preserves all 82 records, including drafts, normalizes slugs for static hosting, strips scripts and inline event handlers, and assigns `/images/blog/default-cover.png` as the temporary cover. Drafts remain on disk but are excluded from the index, sitemap, RSS, and generated public routes.

The canonical public content routes are `/blog/<slug>`. The corresponding
`/es/blog/<slug>` pages are English-content fallbacks and remain `noindex`
until real `es.md` translations are added. The build's metadata step writes
the production `robots.txt`, `sitemap.xml`, and `rss.xml` files into
`dist/client` after vinext finishes exporting the HTML.
