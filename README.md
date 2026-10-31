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
- `/es/blog/<slug>` (only when a Spanish translation exists)
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

Local blog copies live in `content/articles/<slug>/en.md` and `es.md`. Each file uses JSON-compatible YAML frontmatter followed by article HTML. Topic metadata lives in `content/topics`.

**Production reads published articles from Sanity.** Vercel runs `npm run build:sanity`, which downloads the CMS content before exporting the site. Adding a local file alone does not publish an article to production. `npm test` checks the local file-backed build.

Run `npm run content:migrate` to re-import the Framer CSV backups. The importer preserves all 82 records, including drafts, normalizes slugs for static hosting, strips scripts and inline event handlers, and assigns `/images/blog/default-cover-1400.webp` as the temporary cover. Drafts remain on disk but are excluded from the index, sitemap, RSS, and generated public routes.

The canonical public content routes are `/blog/<slug>`. The corresponding
`/es/blog/<slug>` pages are generated only for real Spanish translations. The build's metadata step writes
the production `robots.txt`, `sitemap.xml`, and `rss.xml` files into
`dist/client` after vinext finishes exporting the HTML.


## Publishing selected local articles to Sanity

Authenticate with `npx sanity login`. Preview the selected English and Spanish
translations before publishing:

```bash
npx sanity exec scripts/publish-product-articles.mjs --with-user-token -- sitemap-explorer-visual-website-map ai-visibility-benchmark-brand-presence
```

Append `--commit` to publish those translations. The script checks for CMS drafts
and unexpected document IDs, and updates only the selected articles, preserving
other CMS fields. It writes both the editable Portable Text and legacy HTML bodies.
Do not run the full dataset import to publish a small selection.

After publishing, run `npm run build:sanity` and deploy the resulting site through
Vercel. Verify the article URLs in the deployed site; CMS publication alone does
not add routes to an existing static deployment.
