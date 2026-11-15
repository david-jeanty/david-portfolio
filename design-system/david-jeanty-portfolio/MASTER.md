# David Jeanty Portfolio — Master Design System

## Direction

Minimal editorial brutalism: calm, direct, slightly unconventional, and deliberately non-corporate. The interface should feel art-directed rather than decorated. Its personality comes from proportion, spacing, type, real work, and restrained ambient motion—not slogans or a dense component library.

## Structure

- One viewport is the primary canvas; avoid long homepage scrolling.
- The homepage is a centered introduction, not a content index: one greeting, one changing factual line, and one permanent identity line.
- Use a persistent navigation frame with About, Interndex, Experience, Résumé, and a quiet Archive exit.
- Desktop content follows an asymmetric two-column grid. Labels and context live on the left; the primary content lives on the right.
- On small screens the grid becomes one column and normal document scrolling is allowed for accessibility.
- Use thin rules, generous negative space, and off-white rather than pure white.

## Typography and colour

- Use the existing neutral sans-serif family and regular weights for most copy.
- Type hierarchy comes from scale, position, and spacing—not heavy bolding.
- Palette: warm off-white, near-black, and muted grey.
- Links use underlines or a precise directional cue; do not turn navigation into generic pill buttons.

## Motion

- Navigation and content transitions are short and quiet; no typing effect, elastic bounce, scroll-jacking, automatic carousel, or decorative particle field.
- The homepage’s one signature motion is a React-controlled vertical text reveal cycling through current role, incoming role, and active build. All three states remain manually selectable.
- Project imagery uses one restrained hover/focus response: a slight image scale and inset lift. There is no dragging interaction.
- Experience rows reveal a substantial selected-role panel on focus, hover, or tap without changing pages.
- The About page includes a React-driven personal index. Native buttons select Guitar, Running, Films, Training, or Baking and crossfade a shared data panel. External sources are displayed only after verified public links are provided.
- Respect `prefers-reduced-motion`; present the same readable final state without transforms.
- Ottawa appears as quiet contextual information through local time, not decorative graphics.

## Content rules

- Write in David's natural voice. Avoid invented positioning statements, target-role labels, and generic AI language.
- Use factual project and employment descriptions only.
- Never invent hobby totals, performance statistics, profile URLs, clips, ratings, or recipes. Empty data sources should remain clearly marked until connected.
- Interndex must use current, real product imagery rather than speculative mockups.
- Keep the original Windows XP portfolio intact under Archive.
- Do not put private work projects on the public homepage unless David explicitly approves them.

## Accessibility

- Maintain visible keyboard focus, semantic headings, and native links/buttons.
- Minimum target size is 44 × 44 px where practical.
- Keep text contrast at WCAG AA or better.
- Avoid relying on hover alone: interactive reveals also support touch and keyboard.
