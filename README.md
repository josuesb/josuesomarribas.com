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
- `/writing`
- `/es/writing`

## Useful Commands

- `npm run dev`: start local development
- `npm run build`: generate the static production site
- `npm test`: build and verify every exported route

## Vercel

Import the repository normally. The checked-in `vercel.json` selects the build
command and the static output directory, so no dashboard overrides are needed.
