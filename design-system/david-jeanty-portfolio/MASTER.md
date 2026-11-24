# David Jeanty Portfolio — Master Design System

## Direction

Minimal editorial brutalism: calm, direct, slightly unconventional, and deliberately non-corporate. The interface should feel art-directed rather than decorated. Its personality comes from proportion, spacing, type, real work, and restrained ambient motion—not slogans or a dense component library.

## Structure

- Fit the homepage into a single viewport on standard phone and desktop screens. Use a Summary row and a Featured work row with a single Interndex screenshot.
- Use a persistent navigation frame with About, Work, Experience, Involvement, Résumé, and a quiet Archive exit. Keep Tinder TPM available by direct link only.
- Desktop content follows an asymmetric two-column grid. Labels and context live on the left; the primary content lives on the right.
- On small screens the grid becomes one column and normal document scrolling is allowed for accessibility.
- Use thin rules, generous negative space, and off-white rather than pure white.

## Typography and colour

- Use neutral sans-serif for headings, copy, and navigation. Use monospace for short contextual labels.
- Share page-title, label, and tab sizes across the modern portfolio. Use the same header layout on every page.
- Use scale, position, and spacing to establish type hierarchy.
- Pair off-white and near-black with muted section labels and blue text links.
- Links use underlines or a precise directional cue; do not turn navigation into generic pill buttons.

## Motion

- Render route content immediately when navigation completes. Keep the shared header and tab selection states static.
- Keep the homepage summary and screenshot static.
- Project imagery uses one restrained hover/focus response: a slight image scale and inset lift. There is no dragging interaction.
- Experience rows reveal a substantial selected-role panel on focus, hover, or tap without changing pages.
- The About page pairs the introduction with a personal photo. Native buttons select Guitar, Running, Films, Training, or Baking and update a shared data panel. External sources are displayed only after verified public links are provided.
- Respect `prefers-reduced-motion`; present the same readable final state without transforms.
- Interior pages show Ottawa local time in the footer. The homepage footer gives visitors direct contact links.

## Content rules

- Write in David's natural voice. Avoid invented positioning statements, target-role labels, and generic AI language.
- Use factual project and employment descriptions only.
- Never invent hobby totals, performance statistics, profile URLs, clips, ratings, or recipes. Empty data sources should remain clearly marked until connected.
- Use real Interndex product imagery on the homepage and detail page. Link the featured screenshot to the Interndex details.
- Show each project’s actual stack on Work. Use the Involvement page for volunteer and student leadership roles.
- Keep the original Windows XP portfolio intact under Archive.
- Do not put private work projects on the public homepage unless David explicitly approves them.

## Accessibility

- Maintain visible keyboard focus, semantic headings, and native links/buttons.
- Minimum target size is 44 × 44 px where practical.
- Keep text contrast at WCAG AA or better.
- Avoid relying on hover alone: interactive reveals also support touch and keyboard.
