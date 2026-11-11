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
