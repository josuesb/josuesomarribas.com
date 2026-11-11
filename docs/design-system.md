# Shared interface system

The existing identity stays in place: Geist, Geist Mono, Georgia, the blue/red/cream palette and the original 3D artwork. Page composition and artwork can differ; navigation and controls come from shared components.

## Foundations

`components/ui/foundations.css` aliases the brand colors and defines control height, radius, font, content width, gutters and header height. It is imported once by `app/globals.css`. Font aliases resolve on `body`, where the localized layouts install the font variables.

## Atoms

Import from `components/ui/Action.tsx`:

- `ButtonLink` for navigation styled as an action. It renders an anchor; `href`, `download`, target, ARIA and analytics attributes are preserved.
- `Button` for actions. It renders a native button and defaults to `type="button"`.
- Both accept `variant="primary"` (red), `"secondary"` (transparent outline), or `"light"` (paper), and `size="regular"` or `"small"`.
- `TextLink` for standalone text actions. It has the common underline, font, hover and focus treatment.
- Filters use compact secondary buttons with `aria-pressed` to expose selection. Audio playback icons retain their specialized native controls.

Do not add decorative arrows to these labels. Functional icons and instructions inside artwork remain intact. Links wrapping a project title, image or editorial card retain that pattern's typography.

## Organisms and templates

`SiteHeader` reads the current path and supplies active section and locale destinations to `SiteNav`. The EN, ES and legal root layouts each mount it once, outside page content. Pages never instantiate their own global header. Product/campaign section navigation can remain below it.

`SiteNav` owns the responsive menu, résumé, contact action and language switch. The mobile menu closes after choosing a link or pressing Escape. Untranslated articles switch to the Spanish writing index instead of a missing translation.

`SiteFooter` is shared by all page families, including Now, privacy, 404 and the campaign. It spans its page width; the inner content uses the same gutters as the header.

Each component owns a CSS module. Page styles may arrange controls with flex/grid or margins, but must not override their colors, fonts, padding, radius or interaction states. Do not introduce new `.btn`, `.nav`, or `footer` overrides in page CSS. New templates should compose these components instead of copying their markup.

## Verification

`npm run lint` and `npm test`. The UI regression tests cover the shared header/footer across page families, localized destinations, legacy button removal, rendered link/button labels (including CMS content), and preservation of the three home artwork scenes. Visually check desktop/mobile, keyboard menu behavior and a product landing after changing shared components.

## Typography

The site uses a deliberately limited subset of the [USWDS system type scale](https://designsystem.digital.gov/design-tokens/typesetting/font-size/). This adopts its size tokens, not its font families or font normalization. The portfolio keeps its existing fonts and colors.

The single source is `components/ui/typography.css`. Its eight steps are **12, 14, 16, 20, 24, 32, 40 and 48 px** at the browser's default 16px root, implemented in `rem` so user font preferences and zoom still work. Do not fix `html` to a pixel font size.

| Role | Desktop | Mobile (≤760px) | Usage |
| --- | --- | --- | --- |
| `--type-title` | 48px | 40px | Page title (`h1`), including article and product pages |
| `--type-section` | 32px | 24px | Main section headings (`h2`), including contact sections |
| `--type-subheading` | 24px | 24px | Subsections (`h3`) |
| `--type-card-title` | 20px | 20px | Project, product and article cards |
| `--type-lead` | 20px | 20px | Introductory paragraphs |
| `--type-body` | 16px | 16px | Body copy, reading text and descriptions |
| `--type-ui` | 14px | 14px | Buttons, navigation, fields and code |
| `--type-caption` | 12px | 12px | Metadata, captions and small labels |

Line heights are unitless: 1.15 for page titles, 1.3 for headings/cards, 1.6 for reading copy, and 1.5 for UI/captions. Heading tracking is −0.025em. Inline emphasis inherits its heading size. Fonts and weights remain component choices; sizes must come from the shared roles. Existing `--text-*` names are compatibility aliases to these roles, not a second scale.

No component introduces its own numeric `font-size`, viewport-based title scale or font shorthand size. Responsive typography changes the shared role once, rather than redefining it on each page. Decorative textual marks (such as LAB and 404) also use the capped scale; actual image and 3D scene dimensions are independent and stay intact. Text baked into product screenshots is part of those source assets.

`tests/typography.test.mjs` enforces token usage across every application stylesheet to prevent new ad hoc sizes.
