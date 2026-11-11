# Refined CRO scene assets

Seven independently animated UI layers replace the previous bold wireframe illustration. The original WebP files are retained; the section now uses the `*-refined.webp` siblings in `public/assets/cro-experience/`.

| Asset | Refinement |
| --- | --- |
| [browser-refined.webp](../../public/assets/cro-experience/browser-refined.webp) | Detailed experiment interface, fine chart grid, compact toolbar and controls |
| [mobile-refined.webp](../../public/assets/cro-experience/mobile-refined.webp) | Slim machined phone frame, responsive version of the same interface |
| [attention-refined.webp](../../public/assets/cro-experience/attention-refined.webp) | Glass analysis layer, restrained heat concentrations and a fine point path |
| [code-refined.webp](../../public/assets/cro-experience/code-refined.webp) | Regular-weight syntax, line-number gutter and small editor status bar |
| [ticket-refined.webp](../../public/assets/cro-experience/ticket-refined.webp) | Small task icon, checklist, status and understated collaborator marks |
| [live-refined.webp](../../public/assets/cro-experience/live-refined.webp) | Quiet deployment indicator and a small market-status sequence |
| [winner-refined.webp](../../public/assets/cro-experience/winner-refined.webp) | Light promotion notification with a fine outline check |

Created with the built-in `image_gen` tool in edit mode, with genuine alpha transparency. Each original layer was its edit target; the refined browser/editor supplied style references to keep the set coherent. The complete final prompt set is in [refined-prompts.json](refined-prompts.json).

`node scripts/prepare-cro-artwork.mjs /path/to/sources.json` exports the generated PNGs to WebP with alpha, preserving the original component canvas ratios. The input JSON maps the seven asset names to generated PNG paths. This performs output sizing/compression only; visual changes are produced by the image tool.

The existing CSS composition, independent float animations and reduced-motion behavior remain. A localized caption identifies the interface and its data as illustrative; the illustrated numbers do not represent client results.
