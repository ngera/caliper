# Caliper

**A dark-first, dense CSS kit for data tools, admin panels and internal dashboards.**

Plain CSS and one 60-line script. No build step, no framework, no webfont, no network
request, no dependencies at all.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
![No dependencies](https://img.shields.io/badge/dependencies-0-brightgreen)
![25KB CSS](https://img.shields.io/badge/css-25KB-blue)

```html
<script src="caliper.js"></script>          <!-- first, and synchronous -->
<link rel="stylesheet" href="caliper.css">
<link rel="stylesheet" href="accents.css">  <!-- optional -->
```

That is the install. Open `gallery.html` to see everything, copy `starter.html` to begin.

![The Caliper component gallery in dark mode](https://raw.githubusercontent.com/ngera/caliper/main/docs/gallery-dark.png)

<sub>The gallery in dark mode — every value shown is a live token, not a swatch image.
[Light mode](https://raw.githubusercontent.com/ngera/caliper/main/docs/gallery-light.png).</sub>

---

## Why this exists

Most CSS frameworks are built for marketing sites and consumer apps: generous whitespace,
large type, a component for every occasion, and a build step to tree-shake what you didn't
use. Point one at an admin panel and you get a dashboard where four numbers fill a screen.

Caliper is built for the other kind of interface — the one an operator keeps open all day
and scans rather than reads. That means:

- **Dense by default.** 13px body text, 36px controls, tables without zebra stripes. A
  `comfortable` mode exists for when the audience is less technical.
- **Dark-first, with a real light theme.** The light palette is a stepped palette chosen for
  a light ground, not the dark one inverted — inverting produces muddy greys and accents
  that fail contrast.
- **Measured, not eyeballed.** Every ink/surface pair in both themes clears WCAG AA, and the
  checker that proves it ships in the repo and runs in CI.
- **Boring where it counts.** It styles `<button>`, `<input>`, `<table>`. It does not
  replace them, and nothing needs JavaScript to render.

If you are building a marketing page, use something else. This is for the console.

---

## Install

**Copy the files.** The honest default for a kit this size — drop `caliper.css`,
`accents.css`, `caliper.js` and `icons.svg` into wherever you serve static assets from, and
you are done. No lockfile, no supply chain, no version to keep current.

**Or from npm:**

```bash
npm install @ngera/caliper
```

```css
@import "@ngera/caliper";
@import "@ngera/caliper/accents.css";
```

Load `caliper.js` synchronously in `<head>`, **before** any stylesheet paints, or every
navigation flashes the wrong theme for a frame.

### Server-rendered apps

`caliper.js` writes a `caliper-theme` cookie alongside `localStorage`. Read it server-side
and stamp the root element yourself — this removes the flash entirely rather than merely
shortening it:

```jinja
<html lang="en" data-theme="{{ request.cookies.get('caliper-theme', '') }}">
```

An empty value means "follow the OS", which is the correct default; the CSS handles it.

---

## What's in the box

| File | What it is |
|---|---|
| `caliper.css` | **The kit.** Tokens (dark + light), density modes, component layer, responsive rules, accessibility and print. |
| `accents.css` | Four alternate accent hues — teal, blue, amber, violet — each validated in both modes. |
| `caliper.js` | Theme / density / accent switching. Writes `localStorage` *and* a cookie. ~60 lines, no dependencies. |
| `icons.svg` | 23 stroke icons as an inline sprite. `<use href="#i-plus">` |
| `starter.html` | A correct page skeleton — topbar, page head, banner, stat row, panel. Copy and fill. |
| `gallery.html` | Every component, live, with switchers and a token table. |
| `gallery.standalone.html` | The same gallery, everything inlined. One file, no dependencies — good for sharing. |
| `docs/THEME.md` | **The spec.** Read this before changing anything or building a new component. |
| `tools/check-contrast.mjs` | The contrast and palette checker. |
| `build.mjs` | Regenerates the inlined sprite and the standalone gallery. |

Components: button, status pill, tag, panel, stat tile, data table, field, switch, banner,
alert list, tabs, empty state, bar chart, and layout primitives.

---

## Making it yours

```html
<html data-accent="teal">    <!-- or blue, amber, violet -->
```

That is the five-minute rebrand, and it gets you most of the way. For a brand colour of your
own, edit the five `--accent-*` tokens — both modes need a value, because they are different
colours, not the same colour dimmed — then run the checker. `docs/THEME.md` § Rebranding has
the full procedure and the one trap worth knowing: don't pick an accent that reads as a
status colour in your product, or the reader can no longer tell "this is a link" from "this
needs attention".

---

## Verifying a change

```bash
node tools/check-contrast.mjs                        # every token pair, both themes
node tools/check-contrast.mjs "#3DDC97" "#131821"    # one pair
```

Exits non-zero on failure, so it drops into CI unchanged. A ready GitHub Actions workflow
ships in `docs/ci/contrast.yml` — copy it to `.github/workflows/contrast.yml` to run the
checker on every push, alongside a check that no raw hex has leaked outside the token layer.

`RELIEF` is not a failure. It marks the three light-mode chart hues that sit below 3:1 and
therefore require visible direct labels or a table view alongside. That is a documented
trade for a harmonious light palette, not an oversight — see `docs/THEME.md` § Charts.

---

## The five rules

These are what make a page built with Caliper look like it was designed rather than
assembled. The reasoning for each is in `docs/THEME.md`.

1. **No raw hex in application code.** Every colour, radius and spacing value comes from a
   token. That one rule is what makes the theme swap, the light mode and the rebrand free.
2. **One primary button per view.**
3. **Status always carries a word**, never colour alone. Assume a grayscale screenshot in a
   ticket, and assume a reader with a colour-vision deficiency.
4. **Every number carries a comparison.** `1,284` says nothing; `1,284, up 12% from 1,146`
   says something. The stat tile has nowhere to put a bare number, on purpose.
5. **State the consequence, not the error.** "HTTP 403" is a log line. "HTTP 403, so 118
   records are missing from this period" is a banner.

---

## Browser support

Every evergreen browser. The newest features used are `:where()` and `:focus-visible`, both
widely available since 2021–22 (Safari 15.4+). No `:has()`, no container queries, no
`color-mix()`, no CSS nesting — so no build step and no polyfill. Internet Explorer is not
supported and will not be.

---

## What this is not

- **Not a component framework.** Tabs, menus and toasts are markup patterns here, not
  behaviours. The only JavaScript is the theme switcher.
- **No RTL support.** Physical properties are used throughout. Converting to logical
  properties is mechanical but has not been done.
- **Not a React/Vue/Svelte library.** It is CSS. Use it from any of them, or from none.
- **Not for marketing sites.** See *Why this exists*.

---

## Contributing

Issues and PRs welcome. Two things to know before you open one:

- **Any colour change must pass `node tools/check-contrast.mjs`**, and a PR that adds a token
  adds it to the checker's suite in the same commit. The palette is the contract.
- **Token and class renames are breaking changes** even though nothing throws — downstream
  pages are compiled by the browser, so a renamed token fails silently and visually. See
  `CHANGELOG.md` for how that maps to versions.

---

## License

MIT — see [LICENSE](LICENSE). Use it, fork it, ship it in a product, rebrand it. Attribution
appreciated, not required.
