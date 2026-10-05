# Changelog

All notable changes to Caliper are recorded here. The format follows
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and versions follow
[Semantic Versioning](https://semver.org/spec/v2.0.0.html).

Because this is a CSS kit, "breaking" has a specific meaning here: **any change to a token
name, a class name, or the published value of a colour token is a breaking change**, even
though nothing throws. Downstream pages are compiled by the browser, not by a build step,
so a renamed token fails silently and visually. Those changes wait for a major version.

Changing a colour's *value* within the same role (making `--warn` slightly darker to clear
contrast, say) is a patch, because the role is the contract, not the hex.

## [Unreleased]

Nothing yet.

## [0.1.0] — 2026-10-05

First public release. Extracted from a shipped monitoring UI and made product-agnostic.

### Added

- **Token layer** — surfaces, lines, ink, accent, status, chart hues, radius, spacing and
  type, in a dark and a light palette. Light is a stepped palette chosen for a light ground,
  not an inversion of the dark one.
- **Two density modes** — `compact` (default) and `comfortable`, switched with
  `<html data-density>`, affecting only control height, padding, gutter and two font sizes.
- **Component layer** — button, status pill, tag, panel, stat tile, data table, field,
  switch, banner, alert list, tabs, empty state, bar chart and layout primitives. Every one
  is styled on a real element and needs no JavaScript to render.
- **Four alternate accents** (`accents.css`): teal, blue, amber, violet, each validated in
  both modes.
- **`caliper.js`** — theme, density and accent switching in ~60 lines, no dependencies.
  Writes `localStorage` *and* a cookie, so a server-rendered app can stamp the first paint
  and skip the flash entirely.
- **`icons.svg`** — 23 stroke icons as an inline sprite, inheriting `currentColor`.
- **`tools/check-contrast.mjs`** — contrast and palette checker over every token pair in
  both themes, plus the accent presets and chart hues. Exits non-zero on a failure, so it
  drops into CI unchanged.
- **Responsive rules** at 900px and 600px: layouts stack, controls grow to 44px, wide tables
  become block lists via `.dt--stack`. Body text never shrinks.
- **Accessibility** — visible `:focus-visible` ring on every interactive element,
  `prefers-reduced-motion` honoured, a `forced-colors` block for Windows high contrast, and
  a print stylesheet that drops chrome and keeps data.
- **`docs/THEME.md`** — the spec: principles, token reference, component contracts,
  rebranding procedure, chart rules and a per-screen checklist.
- **`gallery.html`** and a dependency-free `gallery.standalone.html` showing every component
  live, with theme, density and accent switchers.

### Known gaps

Carried forward deliberately and tracked in `docs/THEME.md` § Known gaps: no RTL support
(physical properties used throughout), no component JavaScript beyond the theme switcher,
and three light-mode chart hues that sit below 3:1 and therefore require visible labels or
a table view alongside — reported as `RELIEF` by the checker rather than silently passed.

[Unreleased]: https://github.com/ngera/caliper/compare/v0.1.0...HEAD
[0.1.0]: https://github.com/ngera/caliper/releases/tag/v0.1.0
